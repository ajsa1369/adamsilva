/**
 * lib/pricing/calculator.ts
 *
 * Pricing calculator for the Adam Silva Consulting pricing engine.
 * Given a package slug and a list of selected integrations, returns a full
 * PricingResult including base costs, overage costs, and bucketed integration lists.
 *
 * Core (tier1Slots/tier2Slots/tier3Slots = 99) never generates overages.
 */

import type { PricingResult, IntegrationSelection } from '@/lib/pricing/types'
import { PACKAGES } from '@/lib/integrations/catalog'

// ---------------------------------------------------------------------------
// TIER_UNIT_COSTS — per-integration overage pricing
// ---------------------------------------------------------------------------

export const TIER_UNIT_COSTS = {
  1: { setup: 750,  monthly: 150 },
  2: { setup: 1500, monthly: 250 },
  3: { setup: 4000, monthly: 500 },
} as const

// ---------------------------------------------------------------------------
// calculatePricing
// ---------------------------------------------------------------------------

/**
 * Calculate the full pricing breakdown for a package + integration selection.
 *
 * @param packageSlug - e.g. 'bronze', 'silver', 'gold', 'core', 'shopify-starter', 'shopify-growth'
 * @param integrations - list of integrations the prospect selected (each with name + tier)
 * @returns PricingResult with base costs, overage costs, totals, and bucketed integration lists
 * @throws Error if the package slug is not found in PACKAGES
 */
export function calculatePricing(
  packageSlug: string,
  integrations: IntegrationSelection[],
): PricingResult {
  const pkg = PACKAGES[packageSlug]
  if (!pkg) {
    throw new Error(`Unknown package slug: ${packageSlug}`)
  }

  // Initialize slot buckets from the package definition
  let t1Remaining = pkg.tier1Slots
  let t2Remaining = pkg.tier2Slots
  let t3Remaining = pkg.tier3Slots

  const includedIntegrations: IntegrationSelection[] = []
  const overageIntegrations: IntegrationSelection[] = []
  let overageSetup = 0
  let overageMonthly = 0

  for (const integration of integrations) {
    const tier = integration.tier

    // Determine the remaining slot count for this tier
    const slotsForTier = tier === 1 ? t1Remaining : tier === 2 ? t2Remaining : t3Remaining

    // Unlimited slots (99 = Core) or slots still available
    if (slotsForTier === 99 || slotsForTier > 0) {
      // Consume a slot (only if not unlimited)
      if (slotsForTier !== 99) {
        if (tier === 1) t1Remaining -= 1
        else if (tier === 2) t2Remaining -= 1
        else t3Remaining -= 1
      }
      includedIntegrations.push(integration)
    } else {
      // No slots remain and not unlimited — overage
      overageIntegrations.push(integration)
      overageSetup += TIER_UNIT_COSTS[tier].setup
      overageMonthly += TIER_UNIT_COSTS[tier].monthly
    }
  }

  return {
    packageSlug,
    baseSetup: pkg.baseSetup,
    baseMonthly: pkg.baseMonthly,
    overageSetup,
    overageMonthly,
    setupTotal: pkg.baseSetup + overageSetup,
    monthlyTotal: pkg.baseMonthly + overageMonthly,
    includedIntegrations,
    overageIntegrations,
  }
}
