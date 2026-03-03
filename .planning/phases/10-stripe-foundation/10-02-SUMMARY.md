---
phase: 10-stripe-foundation
plan: 02
subsystem: payments
tags: [stripe, typescript, env-vars, product-catalog]

# Dependency graph
requires:
  - phase: 10-stripe-foundation/10-01
    provides: "StripeProductPricing, StripePriceMap, PackageSlug types from lib/stripe/types.ts"
provides:
  - "lib/stripe/products.ts — typed map from PackageSlug to Stripe Product/Price IDs"
  - "STRIPE_PRODUCTS constant (StripePriceMap) for all 6 package slugs"
  - "getStripePricing() helper for slug-to-IDs lookup used by Phases 12 and 13"
affects:
  - phase-12 (PaymentIntents)
  - phase-13 (Checkout Sessions / ACP bridge)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "getEnv() at module level — all env vars validated at import time, not at checkout time"
    - "Null for custom-quoted Core tier — type system enforces callers handle null case"

key-files:
  created:
    - lib/stripe/products.ts
  modified: []

key-decisions:
  - "All 15 env vars read at module level with getEnv() — fail at import time not checkout time"
  - "Core tier is explicitly null in StripePriceMap — type system forces callers to handle custom-quote flow"
  - "getEnv() duplicated from client.ts pattern (not shared) — each module is independently importable without pulling in the full Stripe SDK"

patterns-established:
  - "Module-level env var validation: read all secrets at top of file so import failure = misconfiguration, not runtime surprise"

requirements-completed:
  - STRIPE-02
  - STRIPE-03

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 10 Plan 02: Stripe Products Map Summary

**Typed Stripe Product/Price ID map at lib/stripe/products.ts — reads 15 env vars at module level, maps 5 fixed-price package slugs to productId/setupPriceId/monthlyPriceId, Core tier null**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-03T19:51:19Z
- **Completed:** 2026-03-03T19:54:00Z (paused at checkpoint Task 2)
- **Tasks:** 1/2 complete (paused at human checkpoint)
- **Files modified:** 1

## Accomplishments
- `lib/stripe/products.ts` created with full StripePriceMap covering all 6 package slugs
- All 15 Stripe env vars validated at module level via getEnv() — build fails fast if any are missing
- `getStripePricing()` helper exported for Phase 12/13 PaymentIntent and Checkout Session lookups
- TypeScript: zero errors (`npx tsc --noEmit` passes)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create typed Stripe Products/Prices map** - `63c5485` (feat)

**Plan metadata:** pending (will commit after checkpoint resolution)

## Files Created/Modified
- `lib/stripe/products.ts` — StripePriceMap constant + getStripePricing() helper, reads 15 Stripe env vars at module level

## Decisions Made
- `getEnv()` helper duplicated from client.ts pattern instead of shared — each module remains independently importable without pulling in the full Stripe SDK singleton
- Core tier is `null` at type level — callers in Phase 12/13 must explicitly handle the null case, which forces the custom-quote flow to be intentional

## Deviations from Plan
None - plan executed exactly as written.

## User Setup Required

**External service requires manual configuration before this file can be imported.**

The user must create 5 Products and 10 Prices in Stripe Dashboard (test mode) and add 15 env vars to `.env.local`:

### Step 1: Go to Stripe Dashboard (test mode)
https://dashboard.stripe.com/test/products

### Step 2: Create 5 Products with 2 Prices each

**Bronze Package** (name: "ASC Bronze Package")
- One-time price: $16,000.00 (setup fee)
- Recurring price: $3,500.00/month (retainer)

**Silver Package** (name: "ASC Silver Package")
- One-time price: $28,000.00 (setup fee)
- Recurring price: $6,500.00/month (retainer)

**Gold Package** (name: "ASC Gold Package")
- One-time price: $48,000.00 (setup fee)
- Recurring price: $12,000.00/month (retainer)

**Shopify Starter Package** (name: "ASC Shopify Starter Package")
- One-time price: $8,500.00 (setup fee)
- Recurring price: $2,000.00/month (retainer)

**Shopify Growth Package** (name: "ASC Shopify Growth Package")
- One-time price: $16,000.00 (setup fee)
- Recurring price: $4,000.00/month (retainer)

### Step 3: Add all 15 IDs to `.env.local`

```
STRIPE_PRODUCT_BRONZE=prod_...
STRIPE_PRICE_BRONZE_SETUP=price_...
STRIPE_PRICE_BRONZE_MONTHLY=price_...
STRIPE_PRODUCT_SILVER=prod_...
STRIPE_PRICE_SILVER_SETUP=price_...
STRIPE_PRICE_SILVER_MONTHLY=price_...
STRIPE_PRODUCT_GOLD=prod_...
STRIPE_PRICE_GOLD_SETUP=price_...
STRIPE_PRICE_GOLD_MONTHLY=price_...
STRIPE_PRODUCT_SHOPIFY_STARTER=prod_...
STRIPE_PRICE_SHOPIFY_STARTER_SETUP=price_...
STRIPE_PRICE_SHOPIFY_STARTER_MONTHLY=price_...
STRIPE_PRODUCT_SHOPIFY_GROWTH=prod_...
STRIPE_PRICE_SHOPIFY_GROWTH_SETUP=price_...
STRIPE_PRICE_SHOPIFY_GROWTH_MONTHLY=price_...
```

**Total:** 5 Products, 10 Prices, 15 env vars. Core tier intentionally omitted (custom-quoted).

## Next Phase Readiness
- `lib/stripe/products.ts` is ready — gated on 15 env vars being populated
- `lib/stripe/client.ts` + `lib/stripe/types.ts` + `lib/supabase/service.ts` are all available
- Once checkpoint resolved, Phase 10-03 (webhook handler) and Phases 12-13 can proceed

---
*Phase: 10-stripe-foundation*
*Completed: 2026-03-03 (partial — paused at checkpoint)*
