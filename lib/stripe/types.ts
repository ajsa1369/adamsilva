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

// Stripe Product/Price IDs for an individual service
// Some services are one-time only (no monthly), some have setup + monthly
export interface StripeServicePricing {
  productId: string
  setupPriceId: string        // one-time Price for setup/delivery fee
  monthlyPriceId?: string     // optional recurring Price (agents have this, audits don't)
}

// Service IDs matching lib/data/services.ts
export type ServiceSlug =
  | 'acra'
  | 'aeo-audit'
  | 'geo-implementation'
  | 'authority-building'
  | 'quoting-agent'
  | 'off-hours-voice-agent'
  | 'lead-enrichment'
  | 'lead-scraping'
  | 'auto-appointment-setter'
  | 'agent-ready-blog-creator'
  | 'press-syndicator'
  | 'ucp-implementation'
  | 'acp-integration'
  | 'ap2-trust-layer'
  | 'unified-sales-agent'
  | 'social-media-manager'
  | 'social-media-poster'
  | 'rag-message-replier'

// Map from service slug to Stripe pricing
export type StripeServiceMap = Record<ServiceSlug, StripeServicePricing>

// Row shape for the stripe_events idempotency table
export interface StripeEventRow {
  event_id: string
  event_type: string
  payload: Record<string, unknown>
  created_at: string
}
