/**
 * lib/pricing/types.ts
 *
 * Shared TypeScript contracts for the Adam Silva Consulting pricing system.
 * All pricing engine files (calculator.ts, tier-selector.ts, catalog.ts) import from here.
 * No implementation logic — types only.
 */

// The three integration tiers
export type IntegrationTier = 1 | 2 | 3

// A single entry in the integration catalog
export interface CatalogEntry {
  name: string
  tier: IntegrationTier
  category: string
  setupCost: number    // 750 | 1500 | 4000
  monthlyCost: number  // 150 | 250 | 500
}

// An integration the prospect has selected (name + resolved tier)
export interface IntegrationSelection {
  name: string
  tier: IntegrationTier
}

// A package definition (Genesis/Essentials/Prime/Scale/Legacy)
export interface PackageDefinition {
  slug: string
  name: string
  baseSetup: number
  baseMonthly: number
  tier1Slots: number
  tier2Slots: number
  tier3Slots: number
  isLegacyOnly: boolean
}

// Output of the pricing calculator
export interface PricingResult {
  packageSlug: string
  baseSetup: number
  baseMonthly: number
  overageSetup: number
  overageMonthly: number
  setupTotal: number
  monthlyTotal: number
  includedIntegrations: IntegrationSelection[]
  overageIntegrations: IntegrationSelection[]
}

// Input to the tier recommendation engine
export interface TierSelectorInput {
  integrations: IntegrationSelection[]
  monthlyLeads: number
  goals: string[]         // e.g. ['ucp', 'acp', 'blog']
  platform: string        // e.g. 'shopify', 'next.js', 'wix'
  locationCount: number
}

// Output of the tier recommendation engine
export interface TierRecommendation {
  recommendedSlug: string       // e.g. 'gold', 'core', 'shopify-starter'
  isLegacyPath: boolean
  reasoning: string             // human-readable explanation (e.g. 'UCP goal requires minimum Gold')
}
