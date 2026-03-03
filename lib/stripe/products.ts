// Package tier -> Stripe pricing mapping
// Bronze:          setup $16,000  | monthly $3,500
// Silver:          setup $28,000  | monthly $6,500
// Gold:            setup $48,000  | monthly $12,000
// Shopify Starter: setup $8,500   | monthly $2,000
// Shopify Growth:  setup $16,000  | monthly $4,000
// Core:            custom-quoted  (no Stripe Price -- null)
//
// Products and Prices are created in Stripe Dashboard (test mode).
// Copy IDs to .env.local. See RESEARCH.md "Dashboard Product Creation Guide".

import type { StripeProductPricing, StripePriceMap, PackageSlug } from '@/lib/stripe/types'

/**
 * Validates that a required environment variable is set and non-empty.
 * Called at module level so that missing vars throw at import time,
 * not at checkout time when it's too late to recover gracefully.
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
// Module-level env var reads — all 15 IDs are validated at import time
// ---------------------------------------------------------------------------

// Bronze
const BRONZE_PRODUCT_ID = getEnv('STRIPE_PRODUCT_BRONZE')
const BRONZE_SETUP_PRICE_ID = getEnv('STRIPE_PRICE_BRONZE_SETUP')
const BRONZE_MONTHLY_PRICE_ID = getEnv('STRIPE_PRICE_BRONZE_MONTHLY')

// Silver
const SILVER_PRODUCT_ID = getEnv('STRIPE_PRODUCT_SILVER')
const SILVER_SETUP_PRICE_ID = getEnv('STRIPE_PRICE_SILVER_SETUP')
const SILVER_MONTHLY_PRICE_ID = getEnv('STRIPE_PRICE_SILVER_MONTHLY')

// Gold
const GOLD_PRODUCT_ID = getEnv('STRIPE_PRODUCT_GOLD')
const GOLD_SETUP_PRICE_ID = getEnv('STRIPE_PRICE_GOLD_SETUP')
const GOLD_MONTHLY_PRICE_ID = getEnv('STRIPE_PRICE_GOLD_MONTHLY')

// Shopify Starter
const SHOPIFY_STARTER_PRODUCT_ID = getEnv('STRIPE_PRODUCT_SHOPIFY_STARTER')
const SHOPIFY_STARTER_SETUP_PRICE_ID = getEnv('STRIPE_PRICE_SHOPIFY_STARTER_SETUP')
const SHOPIFY_STARTER_MONTHLY_PRICE_ID = getEnv('STRIPE_PRICE_SHOPIFY_STARTER_MONTHLY')

// Shopify Growth
const SHOPIFY_GROWTH_PRODUCT_ID = getEnv('STRIPE_PRODUCT_SHOPIFY_GROWTH')
const SHOPIFY_GROWTH_SETUP_PRICE_ID = getEnv('STRIPE_PRICE_SHOPIFY_GROWTH_SETUP')
const SHOPIFY_GROWTH_MONTHLY_PRICE_ID = getEnv('STRIPE_PRICE_SHOPIFY_GROWTH_MONTHLY')

// ---------------------------------------------------------------------------
// Typed map from package slug to Stripe Product/Price IDs
// ---------------------------------------------------------------------------

/**
 * STRIPE_PRODUCTS maps every fixed-price package slug to its Stripe Product ID
 * and two Price IDs (one-time setup fee + recurring monthly retainer).
 *
 * Core tier is null because it is custom-quoted — no fixed Stripe Price exists.
 *
 * Usage: import { STRIPE_PRODUCTS } from '@/lib/stripe/products'
 *        const pricing = STRIPE_PRODUCTS['bronze']  // StripeProductPricing
 *        const corePricing = STRIPE_PRODUCTS['core'] // null
 */
export const STRIPE_PRODUCTS: StripePriceMap = {
  bronze: {
    productId: BRONZE_PRODUCT_ID,
    setupPriceId: BRONZE_SETUP_PRICE_ID,
    monthlyPriceId: BRONZE_MONTHLY_PRICE_ID,
  },
  silver: {
    productId: SILVER_PRODUCT_ID,
    setupPriceId: SILVER_SETUP_PRICE_ID,
    monthlyPriceId: SILVER_MONTHLY_PRICE_ID,
  },
  gold: {
    productId: GOLD_PRODUCT_ID,
    setupPriceId: GOLD_SETUP_PRICE_ID,
    monthlyPriceId: GOLD_MONTHLY_PRICE_ID,
  },
  'shopify-starter': {
    productId: SHOPIFY_STARTER_PRODUCT_ID,
    setupPriceId: SHOPIFY_STARTER_SETUP_PRICE_ID,
    monthlyPriceId: SHOPIFY_STARTER_MONTHLY_PRICE_ID,
  },
  'shopify-growth': {
    productId: SHOPIFY_GROWTH_PRODUCT_ID,
    setupPriceId: SHOPIFY_GROWTH_SETUP_PRICE_ID,
    monthlyPriceId: SHOPIFY_GROWTH_MONTHLY_PRICE_ID,
  },
  core: null,
}

// ---------------------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------------------

/**
 * Returns the Stripe Product/Price IDs for a given package slug,
 * or null for the custom-quoted Core tier.
 *
 * Used by Phases 12 and 13 to look up Price IDs when creating
 * PaymentIntents and Checkout Sessions.
 *
 * @example
 *   const pricing = getStripePricing('bronze')
 *   // pricing.productId, pricing.setupPriceId, pricing.monthlyPriceId
 *
 *   const corePricing = getStripePricing('core')
 *   // null — handle with custom quote flow
 */
export function getStripePricing(slug: PackageSlug): StripeProductPricing | null {
  return STRIPE_PRODUCTS[slug]
}
