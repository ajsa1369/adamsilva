/**
 * lib/pricing/__tests__/calculator.test.ts
 *
 * Unit tests for calculatePricing() — slot logic, overage calculation, mixed tiers.
 *
 * Package definitions:
 *   bronze: baseSetup=16000, baseMonthly=3500, t1Slots=3, t2Slots=0, t3Slots=0
 *   silver: baseSetup=28000, baseMonthly=6500, t1Slots=6, t2Slots=1, t3Slots=0
 *   gold:   baseSetup=48000, baseMonthly=12000, t1Slots=12, t2Slots=3, t3Slots=1
 *   core:   baseSetup=75000, baseMonthly=0, t1Slots=99, t2Slots=99, t3Slots=99
 *
 * Tier unit costs: T1 setup=750/mo=150, T2 setup=1500/mo=250, T3 setup=4000/mo=500
 */

import { describe, it, expect } from 'vitest'
import { calculatePricing } from '@/lib/pricing/calculator'
import type { IntegrationSelection } from '@/lib/pricing/types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const t1 = (name: string): IntegrationSelection => ({ name, tier: 1 })
const t2 = (name: string): IntegrationSelection => ({ name, tier: 2 })
const t3 = (name: string): IntegrationSelection => ({ name, tier: 3 })

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------

describe('calculatePricing', () => {
  // Case 1: Slot logic — all slots used exactly (Bronze + 3 T1 → 0 overages)
  it('Bronze + 3 T1 integrations fills all T1 slots with zero overages', () => {
    const result = calculatePricing('bronze', [t1('Stripe'), t1('HubSpot'), t1('Calendly')])
    expect(result.packageSlug).toBe('bronze')
    expect(result.baseSetup).toBe(16000)
    expect(result.baseMonthly).toBe(3500)
    expect(result.overageSetup).toBe(0)
    expect(result.overageMonthly).toBe(0)
    expect(result.setupTotal).toBe(16000)
    expect(result.monthlyTotal).toBe(3500)
    expect(result.includedIntegrations).toHaveLength(3)
    expect(result.overageIntegrations).toHaveLength(0)
  })

  // Case 2: Overage T1 — Bronze + 4 T1 → 1 overage
  it('Bronze + 4 T1 integrations produces 1 T1 overage ($750 setup, $150/mo)', () => {
    const result = calculatePricing('bronze', [
      t1('Stripe'),
      t1('HubSpot'),
      t1('Calendly'),
      t1('Mailchimp'),
    ])
    expect(result.overageSetup).toBe(750)
    expect(result.overageMonthly).toBe(150)
    expect(result.setupTotal).toBe(16750)
    expect(result.monthlyTotal).toBe(3650)
    expect(result.includedIntegrations).toHaveLength(3)
    expect(result.overageIntegrations).toHaveLength(1)
    expect(result.overageIntegrations[0].name).toBe('Mailchimp')
  })

  // Case 3: Overage T2 — Silver + 2 T2 integrations → 1 overage (Silver has 1 T2 slot)
  it('Silver + 2 T2 integrations produces 1 T2 overage ($1500 setup, $250/mo)', () => {
    const result = calculatePricing('silver', [t2('Brevo'), t2('Drip')])
    expect(result.overageSetup).toBe(1500)
    expect(result.overageMonthly).toBe(250)
    expect(result.setupTotal).toBe(28000 + 1500)
    expect(result.monthlyTotal).toBe(6500 + 250)
    expect(result.includedIntegrations).toHaveLength(1)
    expect(result.overageIntegrations).toHaveLength(1)
  })

  // Case 4: Mixed tier — Silver + 3 T1 + 2 T2 → T2 overage only
  it('Silver + 3 T1 + 2 T2: T1 fits in 6 slots, T2 slot=1 so 2nd T2 is overage', () => {
    const result = calculatePricing('silver', [
      t1('Stripe'),
      t1('HubSpot'),
      t1('Calendly'),
      t2('Brevo'),
      t2('Drip'),
    ])
    // 3 T1 = included (6 slots available, 3 used — fine)
    // 1st T2 = included (1 slot), 2nd T2 = overage
    expect(result.includedIntegrations).toHaveLength(4)
    expect(result.overageIntegrations).toHaveLength(1)
    expect(result.overageSetup).toBe(1500)
    expect(result.overageMonthly).toBe(250)
    expect(result.overageIntegrations[0].name).toBe('Drip')
  })

  // Case 5: Core unlimited — Core + 15 T1 → no overages
  it('Core + 15 T1 integrations produces zero overages (99 unlimited slots)', () => {
    const integrations = Array.from({ length: 15 }, (_, i) => t1(`Tool${i + 1}`))
    const result = calculatePricing('core', integrations)
    expect(result.overageIntegrations).toHaveLength(0)
    expect(result.setupTotal).toBe(75000)
    expect(result.overageSetup).toBe(0)
    expect(result.overageMonthly).toBe(0)
    expect(result.includedIntegrations).toHaveLength(15)
  })

  // Case 6: Empty integrations — Bronze + [] → setupTotal=16000
  it('Bronze with empty integration list returns base costs with no overages', () => {
    const result = calculatePricing('bronze', [])
    expect(result.setupTotal).toBe(16000)
    expect(result.monthlyTotal).toBe(3500)
    expect(result.overageIntegrations).toHaveLength(0)
    expect(result.includedIntegrations).toHaveLength(0)
  })

  // Case 7: Unknown package slug — throws Error
  it('Throws an Error for an unknown package slug', () => {
    expect(() => calculatePricing('platinum', [t1('Stripe')])).toThrow(
      'Unknown package slug: platinum',
    )
  })

  // Bonus: Gold T3 slot — Gold + 1 T3 included, 2nd T3 is overage
  it('Gold + 2 T3 integrations: 1st T3 included, 2nd T3 is overage ($4000 setup, $500/mo)', () => {
    const result = calculatePricing('gold', [t3('Mindbody'), t3('Vagaro')])
    expect(result.includedIntegrations).toHaveLength(1)
    expect(result.overageIntegrations).toHaveLength(1)
    expect(result.overageSetup).toBe(4000)
    expect(result.overageMonthly).toBe(500)
    expect(result.setupTotal).toBe(48000 + 4000)
    expect(result.monthlyTotal).toBe(12000 + 500)
  })

  // Bonus: Silver + 6 T1 → all 6 T1 slots filled, no overages
  it('Silver + 6 T1 integrations fills all T1 slots exactly with zero overages', () => {
    const integrations = [
      t1('Stripe'), t1('HubSpot'), t1('Calendly'),
      t1('Mailchimp'), t1('Pipedrive'), t1('Xero'),
    ]
    const result = calculatePricing('silver', integrations)
    expect(result.overageIntegrations).toHaveLength(0)
    expect(result.includedIntegrations).toHaveLength(6)
    expect(result.setupTotal).toBe(28000)
    expect(result.monthlyTotal).toBe(6500)
  })
})
