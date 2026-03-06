/**
 * lib/pricing/__tests__/tier-selector.test.ts
 *
 * Unit tests for selectTier() — all LOCKED edge cases + standard trigger conditions.
 *
 * LOCKED edge cases (must all pass):
 *   selectTier({ integrations:[], ... }) → 'starter'
 *   selectTier({ integrations:[10+], ... }) → 'elite'
 *   selectTier({ integrations:[{name:'SAP',tier:3}], ... }) → 'elite'
 *   selectTier({ integrations:[{name:'HubSpot',tier:1}], goals:['ucp'], ... }) → 'max'
 *
 * Priority order:
 *   1. Legacy platform (shopify/wix/squarespace/wordpress)
 *   2. Enterprise ERP (SAP/NetSuite/Oracle ERP/Microsoft Dynamics)
 *   3. 10+ integrations → elite
 *   4. Zero integrations → starter
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
  // LOCKED 1: No tools → 'starter'
  it('LOCKED: No integrations selected → starter', () => {
    const result = selectTier(input({ integrations: [] }))
    expect(result.recommendedSlug).toBe('starter')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED 2: 10+ integrations (any mix) → 'elite'
  it('LOCKED: 10 or more integrations → elite', () => {
    const integrations = Array.from({ length: 10 }, (_, i) => t1(`Tool${i + 1}`))
    const result = selectTier(input({ integrations }))
    expect(result.recommendedSlug).toBe('elite')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED 3: SAP present → 'elite' (enterprise ERP)
  it('LOCKED: SAP integration → elite (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'SAP', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('elite')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED 4: HubSpot + UCP goal → 'max' (protocol goal overrides starter slot-fit)
  it('LOCKED: HubSpot (T1) + ucp goal → max', () => {
    const result = selectTier(input({
      integrations: [t1('HubSpot')],
      goals: ['ucp'],
    }))
    expect(result.recommendedSlug).toBe('max')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Enterprise ERP checks (Step 2)
// ---------------------------------------------------------------------------

describe('selectTier — enterprise ERP checks', () => {
  // LOCKED: NetSuite → elite
  it('LOCKED: NetSuite integration → elite (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'NetSuite', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('elite')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED: Oracle ERP → elite
  it('LOCKED: Oracle ERP integration → elite (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'Oracle ERP', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('elite')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED: Microsoft Dynamics → elite
  it('LOCKED: Microsoft Dynamics integration → elite (enterprise ERP)', () => {
    const result = selectTier(input({ integrations: [{ name: 'Microsoft Dynamics', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('elite')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Protocol goal overrides (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — protocol goal overrides', () => {
  // LOCKED: UCP goal → minimum 'max'
  it('LOCKED: ucp goal → minimum max', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], goals: ['ucp'] }))
    expect(result.recommendedSlug).toBe('max')
    expect(result.isLegacyPath).toBe(false)
  })

  // LOCKED: ACP goal → minimum 'max'
  it('LOCKED: acp goal → minimum max', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], goals: ['acp'] }))
    expect(result.recommendedSlug).toBe('max')
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
  // Case 13: monthlyLeads=200 → minimum pro
  it('200 monthly leads → minimum pro', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], monthlyLeads: 200 }))
    expect(result.recommendedSlug).toBe('pro')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 14: monthlyLeads=500 → minimum max
  it('500 monthly leads → minimum max', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], monthlyLeads: 500 }))
    expect(result.recommendedSlug).toBe('max')
    expect(result.isLegacyPath).toBe(false)
  })

  // 499 leads → pro (just below max threshold)
  it('499 monthly leads → pro (below 500 threshold)', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], monthlyLeads: 499 }))
    expect(result.recommendedSlug).toBe('pro')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Location count trigger (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — location count trigger', () => {
  // Case 15: locationCount=6 → minimum pro
  it('6 locations → minimum pro', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], locationCount: 6 }))
    expect(result.recommendedSlug).toBe('pro')
    expect(result.isLegacyPath).toBe(false)
  })

  // 5 locations → no pro trigger
  it('5 locations does not trigger pro minimum', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')], locationCount: 5 }))
    // Should be starter (1 T1, no other triggers)
    expect(result.recommendedSlug).toBe('starter')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Integration tier triggers (Step 5)
// ---------------------------------------------------------------------------

describe('selectTier — integration tier triggers', () => {
  // Case 16: T2 integration present → minimum pro
  it('T2 integration present → minimum pro', () => {
    const result = selectTier(input({ integrations: [t2('Brevo')] }))
    expect(result.recommendedSlug).toBe('pro')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 17: T3 integration (non-enterprise) → minimum max (e.g. Mindbody, Vagaro)
  it('Mindbody (T3, non-enterprise) → minimum max', () => {
    const result = selectTier(input({ integrations: [{ name: 'Mindbody', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('max')
    expect(result.isLegacyPath).toBe(false)
  })

  it('Vagaro (T3, non-enterprise) → minimum max', () => {
    const result = selectTier(input({ integrations: [{ name: 'Vagaro', tier: 3 }] }))
    expect(result.recommendedSlug).toBe('max')
    expect(result.isLegacyPath).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Slot-fit upgrades (Step 6)
// ---------------------------------------------------------------------------

describe('selectTier — slot-fit upgrades', () => {
  // Case 18: 1 T1 integration, no triggers → 'starter' (fits in starter T1 slots)
  it('1 T1 integration with no other triggers → starter', () => {
    const result = selectTier(input({ integrations: [t1('Stripe')] }))
    expect(result.recommendedSlug).toBe('starter')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 19: 4 T1 integrations → 'pro' (Starter only has 3 T1 slots)
  it('4 T1 integrations → pro (slot-fit upgrade from starter)', () => {
    const result = selectTier(input({
      integrations: [t1('Stripe'), t1('HubSpot'), t1('Calendly'), t1('Mailchimp')],
    }))
    expect(result.recommendedSlug).toBe('pro')
    expect(result.isLegacyPath).toBe(false)
  })

  // Case 20: 7 T1 integrations → 'max' (Pro has 6 T1 slots)
  it('7 T1 integrations → max (slot-fit upgrade from pro)', () => {
    const result = selectTier(input({
      integrations: [
        t1('Stripe'), t1('HubSpot'), t1('Calendly'), t1('Mailchimp'),
        t1('Pipedrive'), t1('Xero'), t1('Salesforce'),
      ],
    }))
    expect(result.recommendedSlug).toBe('max')
    expect(result.isLegacyPath).toBe(false)
  })

  // 3 T1 integrations → starter (fits exactly in Starter's 3 T1 slots)
  it('3 T1 integrations → starter (fits exactly in starter T1 slots)', () => {
    const result = selectTier(input({
      integrations: [t1('Stripe'), t1('HubSpot'), t1('Calendly')],
    }))
    expect(result.recommendedSlug).toBe('starter')
    expect(result.isLegacyPath).toBe(false)
  })

  // 13 T1 integrations → elite (Max has 12 T1 slots — overflow to elite)
  it('13 T1 integrations → elite (slot-fit overflow: Max has 12 T1 slots)', () => {
    const integrations = Array.from({ length: 13 }, (_, i) => t1(`Tool${i + 1}`))
    const result = selectTier(input({ integrations }))
    expect(result.recommendedSlug).toBe('elite')
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
