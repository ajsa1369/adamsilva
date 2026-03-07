/**
 * lib/pricing/tier-selector.ts
 *
 * Tier recommendation engine for the Adam Silva Consulting pricing system.
 * Given prospect inputs (integrations, leads, goals, platform, locations), returns
 * the optimal package slug with a human-readable reasoning string.
 *
 * LOCKED priority order:
 *   1. Legacy platform check (shopify/wix/squarespace/wordpress)
 *   2. Enterprise ERP check (SAP/NetSuite/Oracle ERP/Microsoft Dynamics)
 *   3. 10+ integrations → scale
 *   4. Zero integrations → genesis
 *   5. Goal/lead/location overrides → compute minimum tier
 *   6. Slot-fit check → upgrade until no overages
 */

import type { TierSelectorInput, TierRecommendation, IntegrationSelection } from '@/lib/pricing/types'
import { ENTERPRISE_TOOLS, LEGACY_PLATFORMS } from '@/lib/integrations/catalog'
import { calculatePricing } from '@/lib/pricing/calculator'

// ---------------------------------------------------------------------------
// Tier ordering helpers
// ---------------------------------------------------------------------------

/** Canonical order from lowest to highest */
const TIER_ORDER: readonly string[] = ['genesis', 'essentials', 'prime', 'scale']

/** Returns the index of a slug in TIER_ORDER. Returns -1 for unknown slugs. */
function tierIndex(slug: string): number {
  return TIER_ORDER.indexOf(slug)
}

/**
 * Returns the higher of two package slugs in the genesis→essentials→prime→scale ordering.
 * If either slug is unknown, the known one wins. If both unknown, returns current.
 */
function upgradeTier(current: string, candidate: string): string {
  const ci = tierIndex(current)
  const candi = tierIndex(candidate)
  if (candi === -1) return current
  if (ci === -1) return candidate
  return candi > ci ? candidate : current
}

// ---------------------------------------------------------------------------
// selectTier
// ---------------------------------------------------------------------------

/**
 * Recommend the optimal package for a prospect based on their inputs.
 *
 * @param input - TierSelectorInput from intake form
 * @returns TierRecommendation with recommendedSlug, isLegacyPath, and human reasoning
 */
export function selectTier(input: TierSelectorInput): TierRecommendation {
  const { integrations, monthlyLeads, goals, platform, locationCount } = input
  const normalizedPlatform = platform.toLowerCase().trim()
  const normalizedGoals = goals.map((g) => g.toLowerCase().trim())

  // -----------------------------------------------------------------------
  // Step 1 — Legacy platform check (FIRST, before any other logic)
  // -----------------------------------------------------------------------
  if (LEGACY_PLATFORMS.includes(normalizedPlatform)) {
    const t1Count = integrations.filter((i) => i.tier === 1).length
    const t2Count = integrations.filter((i) => i.tier === 2).length
    const needsGrowth = t1Count >= 3 || t2Count >= 1
    const legacySlug = needsGrowth ? 'shopify-growth' : 'shopify-starter'
    return {
      recommendedSlug: legacySlug,
      isLegacyPath: true,
      reasoning: 'Legacy platform detected — routing to legacy package path',
    }
  }

  // -----------------------------------------------------------------------
  // Step 2 — Enterprise ERP check
  // -----------------------------------------------------------------------
  for (const integration of integrations) {
    const normalizedName = integration.name.toLowerCase().trim()
    if (ENTERPRISE_TOOLS.includes(normalizedName)) {
      return {
        recommendedSlug: 'scale',
        isLegacyPath: false,
        reasoning: `Enterprise ERP detected (${integration.name}) — Scale tier required`,
      }
    }
  }

  // -----------------------------------------------------------------------
  // Step 3 — 10+ integrations check
  // -----------------------------------------------------------------------
  if (integrations.length >= 10) {
    return {
      recommendedSlug: 'scale',
      isLegacyPath: false,
      reasoning: `${integrations.length} integrations selected — Scale tier required (10+ threshold)`,
    }
  }

  // -----------------------------------------------------------------------
  // Step 4 — Zero integrations check
  // -----------------------------------------------------------------------
  if (integrations.length === 0) {
    return {
      recommendedSlug: 'genesis',
      isLegacyPath: false,
      reasoning: 'No integrations selected — Genesis is the starting tier',
    }
  }

  // -----------------------------------------------------------------------
  // Step 5 — Goal/lead/location overrides (compute minimum tier)
  // -----------------------------------------------------------------------
  let minSlug = 'genesis'
  const appliedRules: string[] = []

  // T3 integration present → minimum prime
  const hasT3 = integrations.some((i) => i.tier === 3)
  if (hasT3) {
    minSlug = upgradeTier(minSlug, 'prime')
    appliedRules.push('Tier 3 integration requires minimum Prime')
  }

  // UCP or ACP in goals → minimum prime
  if (normalizedGoals.includes('ucp') || normalizedGoals.includes('acp')) {
    minSlug = upgradeTier(minSlug, 'prime')
    const protocolGoals = normalizedGoals
      .filter((g) => g === 'ucp' || g === 'acp')
      .map((g) => g.toUpperCase())
      .join('/')
    appliedRules.push(`${protocolGoals} goal requires minimum Prime`)
  }

  // 500+ monthly leads → minimum prime
  if (monthlyLeads >= 500) {
    minSlug = upgradeTier(minSlug, 'prime')
    appliedRules.push(`${monthlyLeads} monthly leads requires minimum Prime`)
  } else if (monthlyLeads >= 200) {
    // 200–499 monthly leads → minimum essentials
    minSlug = upgradeTier(minSlug, 'essentials')
    appliedRules.push(`${monthlyLeads} monthly leads requires minimum Essentials`)
  }

  // 6+ locations → minimum essentials
  if (locationCount >= 6) {
    minSlug = upgradeTier(minSlug, 'essentials')
    appliedRules.push(`${locationCount} locations requires minimum Essentials`)
  }

  // T2 integration present → minimum essentials
  const hasT2 = integrations.some((i) => i.tier === 2)
  if (hasT2) {
    minSlug = upgradeTier(minSlug, 'essentials')
    appliedRules.push('Tier 2 integration requires minimum Essentials')
  }

  // -----------------------------------------------------------------------
  // Step 6 — Slot-fit check (upgrade until no overages)
  // -----------------------------------------------------------------------
  let finalSlug = minSlug
  const slotsChecked: string[] = []

  for (let i = tierIndex(finalSlug); i < TIER_ORDER.length; i++) {
    const candidateSlug = TIER_ORDER[i]
    const result = calculatePricing(candidateSlug, integrations as IntegrationSelection[])
    slotsChecked.push(candidateSlug)
    if (result.overageIntegrations.length === 0) {
      finalSlug = candidateSlug
      break
    }
    // If we reach scale, it always fits (99 slots)
    if (i === TIER_ORDER.length - 1) {
      finalSlug = 'scale'
    }
  }

  // Build reasoning string
  const rulesText = appliedRules.length > 0 ? appliedRules.join('; ') : 'standard tier selection'
  const slotText =
    finalSlug === minSlug
      ? `slot-fit check confirms ${finalSlug.charAt(0).toUpperCase() + finalSlug.slice(1)} accommodates all integrations`
      : `slot-fit check upgraded from ${minSlug} to ${finalSlug} to accommodate all integrations`

  return {
    recommendedSlug: finalSlug,
    isLegacyPath: false,
    reasoning: `${rulesText}; ${slotText}`,
  }
}
