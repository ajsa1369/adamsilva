/**
 * lib/pricing/__tests__/tier-selector.test.ts
 *
 * Unit tests for selectTier() — all LOCKED edge cases + standard trigger conditions.
 *
 * LOCKED edge cases (must all pass):
 *   selectTier({ integrations:[], ... }) → 'bronze'
 *   selectTier({ integrations:[10+], ... }) → 'core'
 *   selectTier({ integrations:[{name:'SAP',tier:3}], ... }) → 'core'
 *   selectTier({ integrations:[{name:'HubSpot',tier:1}], goals:['ucp'], ... }) → 'gold'
 *
 * Priority order:
 *   1. Legacy platform (shopify/wix/squarespace/wordpress)
 *   2. Enterprise ERP (SAP/NetSuite/Oracle ERP/Microsoft Dynamics)
 *   3. 10+ integrations → core
 *   4. Zero integrations → bronze
 *   5. Goal/lead/location overrides
 *   6. Slot-fit check
 */

import { describe, it, expect } from 'vitest'
import { selectTier } from '@/lib/pricing/tier-selector'
import type { TierSelectorInput, IntegrationSelection } from '@/lib/pricing/types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const t1 = (name: string): IntegrationSelection => ({ name, tier: 1 })
const t2 = (name: string): IntegrationSelection => ({ name, tier: 2 })
const t3 = (name: string): IntegrationSelection => ({ name, tier: 3 })

/** Default neutral input — no triggers beyond the provided fields */
function input(overrides: Partial<TierSelectorInput>): TierSelectorInput {
  return {
    integrations: [],
    monthlyLeads: 50,
    goals: [],
    platform: 'custom',
    locationCount: 1,
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// LOCKED edge cases (from ROADMAP — all must pass)
// ---------------------------------------------------------------------------

describe('selectTier — LOCKED edge cases', () => {
  // LOCKED 1: No tools → 'bronze'
  it('LOCKED: No integrations selected → bronze', () => {
    const result = selectTier(input({ integrations: [] }))
    expect(result.recommendedSlug).toBe('bronze')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED 2: 10+ integrations (any mix) → 'core'
  it('LOCKED: 10 or more integrations → core', () => {
    const integrations = Array.from({ length: 10 }, (_, i) => t1(`Tool${i + 1}`))
    const result = selectTier(input({ integrations }))
    expect(result.recommendedSlug).toBe('core')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED 3: SAP present → 'core' (enterprise ERP)
  it('LOCKED: SAP integration → core (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'SAP', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('core')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED 4: HubSpot + UCP goal → 'gold' (protocol goal overrides bronze slot-fit)
  it('LOCKED: HubSpot (T1) + ucp goal → gold', () => {
    const result = selectTier(input({
      integrations: [t1('HubSpot')],
      goals: ['ucp'],
    }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Enterprise ERP checks (Step 2)
// ---------------------------------------------------------------------------

describe('selectTier — enterprise ERP checks', () => {
  // LOCKED: NetSuite → core
  it('LOCKED: NetSuite integration → core (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'NetSuite', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('core')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED: Oracle ERP → core
  it('LOCKED: Oracle ERP integration → core (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'Oracle ERP', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('core')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED: Microsoft Dynamics → core
  it('LOCKED: Microsoft Dynamics integration → core (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'Microsoft Dynamics', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('core')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Protocol goal overrides (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — protocol goal overrides', () => {
  // LOCKED: UCP goal → minimum 'gold'
  it('LOCKED: ucp goal → minimum gold', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], goals: ['ucp'] }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED: ACP goal → minimum 'gold'
  it('LOCKED: acp goal → minimum gold', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], goals: ['acp'] }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Legacy platform routing (Step 1 — always first)
// ---------------------------------------------------------------------------

describe('selectTier — legacy platform routing', () => {
  // Case 9: Shopify platform → isLegacyPath=true
  it('Shopify platform → isLegacyPath true', () => {
    const result = selectTier(input({ platform: 'shopify' }))
    expect(result.isLegacyPath).toBe(true)
  })

  // Case 10: Wix platform → isLegacyPath=true
  it('Wix platform → isLegacyPath true', () => {
    const result = selectTier(input({ platform: 'wix' }))
    expect(result.isLegacyPath).toBe(true)
  })

  // Case 11: Squarespace platform → isLegacyPath=true
  it('Squarespace platform → isLegacyPath true', () => {
    const result = selectTier(input({ platform: 'squarespace' }))
    expect(result.isLegacyPath).toBe(true)
  })

  // Case 12: WordPress platform → isLegacyPath=true
  it('WordPress platform → isLegacyPath true', () => {
    const result = selectTier(input({ platform: 'wordpress' }))
    expect(result.isLegacyPath).toBe(true)
  })

  // Legacy platform is checked BEFORE ERP — even SAP on Shopify goes legacy
  it('Shopify platform with SAP still routes to legacy path (legacy check is first)', () => {
    const result = selectTier(input({
      platform: 'shopify',
      integrations: [{ name: 'SAP', tier: 3 }],
    }))
    expect(result.isLegacyPath).toBe(true)
  })

  // Shopify with few integrations → shopify-starter
  it('Shopify with 1 T1 integration → shopify-starter', () => {
    const result = selectTier(input({
      platform: 'shopify',
      integrations: [t1('Stripe')],
    }))
    expect(result.recommendedSlug).toBe('shopify-starter')
    expect(result.isLegacyPath).toBe(true)
  })

  // Shopify with 3+ T1 integrations → shopify-growth
  it('Shopify with 3 T1 integrations → shopify-growth', () => {
    const result = selectTier(input({
      platform: 'shopify',
      integrations: [t1('Stripe'), t1('HubSpot'), t1('Calendly')],
    }))
    expect(result.recommendedSlug).toBe('shopify-growth')
    expect(result.isLegacyPath).toBe(true)
  })

  // Shopify with 1 T2 integration → shopify-growth
  it('Shopify with 1 T2 integration → shopify-growth', () => {
    const result = selectTier(input({
      platform: 'shopify',
      integrations: [t2('Brevo')],
    }))
    expect(result.recommendedSlug).toBe('shopify-growth')
    expect(result.isLegacyPath).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Lead volume triggers (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — lead volume triggers', () => {
  // Case 13: monthlyLeads=200 → minimum silver
  it('200 monthly leads → minimum silver', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], monthlyLeads: 200 }))
    expect(result.recommendedSlug).toBe('silver')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 14: monthlyLeads=500 → minimum gold
  it('500 monthly leads → minimum gold', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], monthlyLeads: 500 }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })

  // 499 leads → silver (just below gold threshold)
  it('499 monthly leads → silver (below 500 threshold)', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], monthlyLeads: 499 }))
    expect(result.recommendedSlug).toBe('silver')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Location count trigger (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — location count trigger', () => {
  // Case 15: locationCount=6 → minimum silver
  it('6 locations → minimum silver', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], locationCount: 6 }))
    expect(result.recommendedSlug).toBe('silver')
    expect(result.isLegacyPath).toBe(false)
  })

  // 5 locations → no silver trigger
  it('5 locations does not trigger silver minimum', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], locationCount: 5 }))
    // Should be bronze (1 T1, no other triggers)
    expect(result.recommendedSlug).toBe('bronze')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Integration tier triggers (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — integration tier triggers', () => {
  // Case 16: T2 integration present → minimum silver
  it('T2 integration present → minimum silver', () => {
    const result = selectTier(input({ integrations: [t2('Brevo')] }))
    expect(result.recommendedSlug).toBe('silver')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 17: T3 integration (non-enterprise) → minimum gold (e.g. Mindbody, Vagaro)
  it('Mindbody (T3, non-enterprise) → minimum gold', () => {
    const result = selectTier(input({ integrations: [{ name: 'Mindbody', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })

  it('Vagaro (T3, non-enterprise) → minimum gold', () => {
    const result = selectTier(input({ integrations: [{ name: 'Vagaro', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Slot-fit upgrades (Step 6)
// ---------------------------------------------------------------------------

describe('selectTier — slot-fit upgrades', () => {
  // Case 18: 1 T1 integration, no triggers → 'bronze' (fits in bronze T1 slots)
  it('1 T1 integration with no other triggers → bronze', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')] }))
    expect(result.recommendedSlug).toBe('bronze')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 19: 4 T1 integrations → 'silver' (Bronze only has 3 T1 slots)
  it('4 T1 integrations → silver (slot-fit upgrade from bronze)', () => {
    const result = selectTier(input({
      integrations: [t1('Stripe'), t1('HubSpot'), t1('Calendly'), t1('Mailchimp')],
    }))
    expect(result.recommendedSlug).toBe('silver')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 20: 7 T1 integrations → 'gold' (Silver has 6 T1 slots)
  it('7 T1 integrations → gold (slot-fit upgrade from silver)', () => {
    const result = selectTier(input({
      integrations: [
        t1('Stripe'), t1('HubSpot'), t1('Calendly'), t1('Mailchimp'),
        t1('Pipedrive'), t1('Xero'), t1('Salesforce'),
      ],
    }))
    expect(result.recommendedSlug).toBe('gold')
    expect(result.isLegacyPath).toBe(false)
  })

  // 3 T1 integrations → bronze (fits exactly in Bronze's 3 T1 slots)
  it('3 T1 integrations → bronze (fits exactly in bronze T1 slots)', () => {
    const result = selectTier(input({
      integrations: [t1('Stripe'), t1('HubSpot'), t1('Calendly')],
    }))
    expect(result.recommendedSlug).toBe('bronze')
    expect(result.isLegacyPath).toBe(false)
  })

  // 13 T1 integrations → core (Gold has 12 T1 slots — overflow to core)
  it('13 T1 integrations → core (slot-fit overflow: Gold has 12 T1 slots)', () => {
    const integrations = Array.from({ length: 13 }, (_, i) => t1(`Tool${i + 1}`))
    const result = selectTier(input({ integrations }))
    expect(result.recommendedSlug).toBe('core')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Reasoning string sanity checks
// ---------------------------------------------------------------------------

describe('selectTier — reasoning strings', () => {
  it('Returns a non-empty reasoning string for all cases', () => {
    const cases = [
      input({ integrations: [] }),
      input({ integrations: [t1('Stripe')] }),
      input({ integrations: [t1('Stripe')], goals: ['ucp'] }),
      input({ platform: 'shopify' }),
    ]
    for (const c of cases) {
      const result = selectTier(c)
      expect(result.reasoning).toBeTruthy()
      expect(result.reasoning.length).toBeGreaterThan(0)
    }
  })
})
