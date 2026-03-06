// Package tier -> Stripe pricing mapping
// Starter:         setup $16,000  | monthly $3,500
// Pro:             setup $28,000  | monthly $6,500
// Max:             setup $48,000  | monthly $12,000
// Shopify Starter: setup $8,500   | monthly $2,000
// Shopify Growth:  setup $16,000  | monthly $4,000
// Elite:           custom-quoted  (no Stripe Price -- null)
//
// Products and Prices are created in Stripe Dashboard (test mode).
// Copy IDs to .env.local. See RESEARCH.md "Dashboard Product Creation Guide".

import type { StripeProductPricing, StripePriceMap, PackageSlug } from '@/lib/stripe/types'

/**
 * Validates that a required environment variable is set and non-empty.
 */
function getEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Create the product in Stripe Dashboard (test mode), copy the ID, ` +
      `and add it to .env.local. See .planning/phases/10-stripe-foundation/10-RESEARCH.md.`
    )
  }
  return value
}

// ---------------------------------------------------------------------------
// Lazy-initialized map — built on first access so `next build` doesn't crash
// when Stripe env vars aren't set in the build environment.
// ---------------------------------------------------------------------------

let _products: StripePriceMap | null = null

function getProducts(): StripePriceMap {
  if (!_products) {
    _products = {
      starter: {
        productId: getEnv('STRIPE_PRODUCT_STARTER'),
        setupPriceId: getEnv('STRIPE_PRICE_STARTER_SETUP'),
        monthlyPriceId: getEnv('STRIPE_PRICE_STARTER_MONTHLY'),
      },
      pro: {
        productId: getEnv('STRIPE_PRODUCT_PRO'),
        setupPriceId: getEnv('STRIPE_PRICE_PRO_SETUP'),
        monthlyPriceId: getEnv('STRIPE_PRICE_PRO_MONTHLY'),
      },
      max: {
        productId: getEnv('STRIPE_PRODUCT_MAX'),
        setupPriceId: getEnv('STRIPE_PRICE_MAX_SETUP'),
        monthlyPriceId: getEnv('STRIPE_PRICE_MAX_MONTHLY'),
      },
      'shopify-starter': {
        productId: getEnv('STRIPE_PRODUCT_SHOPIFY_STARTER'),
        setupPriceId: getEnv('STRIPE_PRICE_SHOPIFY_STARTER_SETUP'),
        monthlyPriceId: getEnv('STRIPE_PRICE_SHOPIFY_STARTER_MONTHLY'),
      },
      'shopify-growth': {
        productId: getEnv('STRIPE_PRODUCT_SHOPIFY_GROWTH'),
        setupPriceId: getEnv('STRIPE_PRICE_SHOPIFY_GROWTH_SETUP'),
        monthlyPriceId: getEnv('STRIPE_PRICE_SHOPIFY_GROWTH_MONTHLY'),
      },
      elite: null,
    }
  }
  return _products
}

/**
 * STRIPE_PRODUCTS — lazy proxy so imports don't crash at build time.
 * Usage: import { STRIPE_PRODUCTS } from '@/lib/stripe/products'
 */
export const STRIPE_PRODUCTS: StripePriceMap = new Proxy({} as StripePriceMap, {
  get(_target, prop, receiver) {
    return Reflect.get(getProducts(), prop, receiver)
  },
})

// ---------------------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------------------

/**
 * Returns the Stripe Product/Price IDs for a given package slug,
 * or null for the custom-quoted Core tier.
 */
export function getStripePricing(slug: PackageSlug): StripeProductPricing | null {
  return getProducts()[slug]
}
