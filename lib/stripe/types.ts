import type { PackagePageData } from '@/lib/data/packages'

// Package slugs from the canonical source
export type PackageSlug = PackagePageData['slug']

// Stripe Product/Price IDs for a fixed-price tier
export interface StripeProductPricing {
  productId: string
  setupPriceId: string      // one-time Price for setup fee
  monthlyPriceId: string    // recurring Price for monthly retainer
}

// Map from package slug to Stripe pricing (null for custom-quoted Core tier)
export type StripePriceMap = {
  [K in Exclude<PackageSlug, 'core'>]: StripeProductPricing
} & {
  core: null
}

// Row shape for the stripe_events idempotency table
export interface StripeEventRow {
  event_id: string
  event_type: string
  payload: Record<string, unknown>
  created_at: string
}
