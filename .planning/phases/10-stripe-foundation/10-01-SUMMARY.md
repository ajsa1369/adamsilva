---
phase: 10-stripe-foundation
plan: 01
subsystem: payments
tags: [stripe, supabase, typescript, sdk, singleton, env-validation]

# Dependency graph
requires: []
provides:
  - "lib/stripe/client.ts — Stripe SDK singleton with API version pinning and fail-fast env validation"
  - "lib/stripe/types.ts — shared Stripe TypeScript types (PackageSlug, StripeProductPricing, StripePriceMap, StripeEventRow)"
  - "lib/supabase/service.ts — cookie-free Supabase service-role client for webhook handlers"
affects: [10-02, 10-03, 11-checkout-flow, 12-proposal-automation, 13-acp-bridging]

# Tech tracking
tech-stack:
  added: ["stripe@20.4.0 (exact version pinning)"]
  patterns:
    - "getRequiredEnv() fail-fast pattern — throws at import time if env var missing"
    - "Module-level singleton instantiation — fail-fast on import, not on first call"
    - "API version pinning — stripe apiVersion: 2026-02-25.clover, never latest"

key-files:
  created:
    - lib/stripe/client.ts
    - lib/stripe/types.ts
    - lib/supabase/service.ts
  modified:
    - package.json (stripe@20.4.0 added)

key-decisions:
  - "getRequiredEnv() helper instead of Zod — Zod is overkill for 3 string env var checks"
  - "Stripe singleton at module level — fails at import time, not silently at first API call"
  - "service.ts uses @supabase/supabase-js directly (not @supabase/ssr) — webhook handlers have no cookie context"
  - "getWebhookSecret() is a function not a constant — webhook secret only needed in one route, not all Stripe operations"
  - "stripe@20.4.0 pinned exactly — prevents accidental drift to API-incompatible SDK version"

patterns-established:
  - "Pattern 1: getRequiredEnv() — use this pattern for all env var validation throughout Phase 10-13"
  - "Pattern 2: Module-level singleton — both stripe and supabaseService instantiated at module level for fail-fast behavior"
  - "Pattern 3: Import from lib/stripe/client.ts everywhere — never instantiate Stripe directly in route handlers"

requirements-completed: [STRIPE-01, STRIPE-04]

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 10 Plan 01: Stripe Foundation — Client, Types, and Service Client Summary

**Stripe SDK singleton pinned to API version 2026-02-25.clover with fail-fast env validation, shared TypeScript types covering all 6 package tiers, and a cookie-free Supabase service-role client for webhook handlers**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T19:45:01Z
- **Completed:** 2026-03-03T19:47:51Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Stripe SDK installed at exactly v20.4.0 (exact pinning prevents accidental drift)
- `lib/stripe/client.ts` exports `stripe` singleton and `getWebhookSecret()` with fail-fast env validation at import time
- `lib/stripe/types.ts` provides `PackageSlug`, `StripeProductPricing`, `StripePriceMap`, and `StripeEventRow` — the shared type contract for all Phase 10-13 plans
- `lib/supabase/service.ts` exports `supabaseService` using `@supabase/supabase-js` (not `@supabase/ssr`) with `persistSession: false` for webhook handler use
- Full project build still passes with zero TypeScript errors (52+ routes)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Stripe SDK and create Stripe client singleton + types** - `10645fa` (feat)
2. **Task 2: Create cookie-free Supabase service-role client** - `3008e5a` (feat)

**Plan metadata:** (see final commit below)

## Files Created/Modified
- `lib/stripe/client.ts` — Stripe SDK singleton with getRequiredEnv() validation, apiVersion pinned to 2026-02-25.clover, maxNetworkRetries: 2, timeout: 30000
- `lib/stripe/types.ts` — PackageSlug (from PackagePageData), StripeProductPricing, StripePriceMap (excludes core→null), StripeEventRow
- `lib/supabase/service.ts` — Cookie-free Supabase client using @supabase/supabase-js directly, SUPABASE_SERVICE_ROLE_KEY, persistSession: false
- `package.json` — stripe@20.4.0 added (exact version)

## Decisions Made
- Used `getRequiredEnv()` helper instead of Zod — plan explicitly called this out as overkill for 3 string checks; kept the implementation simple and obvious
- `getWebhookSecret()` is a function not a module-level constant — webhook secret is only needed in the webhook route, not in all Stripe operations; lazy access reduces unnecessary env var requirements for non-webhook code paths
- `@supabase/supabase-js` import in service.ts (not `@supabase/ssr`) — SSR package requires cookie context which webhook handlers don't have; using the base package directly is the correct pattern for server-side service-role clients

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript passed clean on first run. Full project build passed with zero errors.

## User Setup Required

The new files require environment variables that do not yet exist in `.env.local`:
- `STRIPE_SECRET_KEY` — Stripe secret key (from Stripe Dashboard → Developers → API Keys)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret (needed for 10-03 webhook handler)
- `SUPABASE_SERVICE_ROLE_KEY` — already documented in CLAUDE.md, needed for service.ts

These throw at import time when the files are actually imported by route handlers. Since no pages import these files yet, the build continues to pass. Env vars will be needed before 10-02 or 10-03 route handlers are deployed.

## Next Phase Readiness
- `lib/stripe/client.ts` and `lib/stripe/types.ts` ready for import in 10-02 (Stripe product catalog setup)
- `lib/supabase/service.ts` ready for import in 10-03 (webhook handler)
- All 3 files pass TypeScript strict mode with zero errors
- No blockers for 10-02

---
*Phase: 10-stripe-foundation*
*Completed: 2026-03-03*
