---
phase: 10-stripe-foundation
plan: 03
subsystem: payments
tags: [stripe, webhooks, supabase, idempotency, postgresql, nextjs]

# Dependency graph
requires:
  - phase: 10-01
    provides: stripe singleton (lib/stripe/client.ts), supabaseService (lib/supabase/service.ts), StripeEventRow type
provides:
  - POST /api/stripe/webhook — signature-verified, idempotent webhook endpoint
  - supabase/migrations/015_stripe_events.sql — idempotency table for duplicate event detection
affects:
  - 10-02 (price sync will share the webhook infrastructure)
  - 11-payment-handlers (Phase 11 fills in the switch statement placeholders)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Webhook route always sets runtime = 'nodejs' — Stripe SDK requires Node.js crypto"
    - "Raw body via request.text() — never request.json() — required for constructEvent"
    - "Log-before-process: insert stripe_events row BEFORE running handler, not after"
    - "Idempotency via INSERT PRIMARY KEY conflict detection (maybeSingle() pre-check)"

key-files:
  created:
    - supabase/migrations/015_stripe_events.sql
    - app/api/stripe/webhook/route.ts
  modified: []

key-decisions:
  - "Log event to stripe_events BEFORE processing (not after) — ensures every attempted event is auditable even if handler crashes"
  - "Return 200 with duplicate: true for already-seen event IDs — prevents Stripe infinite retry loop"
  - "Phase 11 handler cases are commented-out stubs in the switch — keeps phase boundary clean"
  - "500 on DB errors (lookup or insert) — instructs Stripe to retry rather than silently dropping"

patterns-established:
  - "Webhook idempotency pattern: SELECT maybeSingle() check → INSERT → process → respond 200"
  - "Node.js runtime declaration always first export after imports in webhook routes"

requirements-completed: [HOOK-01, HOOK-02, HOOK-04]

# Metrics
duration: 8min
completed: 2026-03-03
---

# Phase 10 Plan 03: Stripe Webhook Summary

**Idempotent Stripe webhook endpoint at /api/stripe/webhook with signature verification, 400 rejection on bad/missing signatures, duplicate-event skipping via stripe_events Supabase table, and Node.js runtime enforcement**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-03T19:51:17Z
- **Completed:** 2026-03-03T19:59:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Migration 015_stripe_events.sql creates idempotency table with RLS (service role only)
- POST /api/stripe/webhook verifies Stripe signatures via constructEvent with raw body
- Invalid or missing signature returns 400 immediately; valid duplicate events return 200 silently
- Every new event is logged to stripe_events BEFORE handler execution (audit guarantee)
- Phase 11 handler stubs are commented in the switch so the placeholder boundary is explicit

## Task Commits

Each task was committed atomically:

1. **Task 1: Create stripe_events idempotency migration** - `99b74ad` (feat)
2. **Task 2: Create webhook endpoint with signature verification and idempotency** - `4a780e8` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `supabase/migrations/015_stripe_events.sql` — stripe_events table with PRIMARY KEY event_id, JSONB payload, RLS service_role_all policy, created_at index
- `app/api/stripe/webhook/route.ts` — POST handler: raw body read, sig verify, idempotency check, event log, switch skeleton

## Decisions Made
- Log event to stripe_events BEFORE processing, not after — ensures every attempted event is auditable even if handler crashes mid-flight
- Return 200 with `{ duplicate: true }` for already-seen event IDs — prevents Stripe from infinite retry on events that were already processed
- 500 on DB errors (lookup or insert) — instructs Stripe to retry delivery rather than dropping the event silently
- Phase 11 handler cases are commented stubs in the switch — keeps a clean phase boundary without dead code

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Build produced a pre-existing error on `/chatbot-widget` (Phase 8, commit ee0d87e) — unrelated to this plan's changes. The webhook route at `/api/stripe/webhook` compiled and appeared in the route manifest as a dynamic route (`ƒ`). Out-of-scope issue logged; not fixed per deviation scope boundary rules.

## User Setup Required

Before this endpoint can be tested:
- `STRIPE_WEBHOOK_SECRET` must be set in `.env.local`
  - Local: run `stripe listen --forward-to localhost:3000/api/stripe/webhook` and copy the `whsec_...` secret
  - Production: Stripe Dashboard > Developers > Webhooks > Add endpoint > copy Signing secret
- `STRIPE_SECRET_KEY` — already required from Plan 10-01
- `SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_SUPABASE_URL` — already required from Plan 10-01

## Next Phase Readiness

- Webhook infrastructure complete — Phase 11 can implement event handlers by filling in the switch statement cases
- stripe_events migration is ready to apply to Supabase (supabase db push or dashboard SQL editor)
- No architectural changes needed before Phase 11; the endpoint contract is stable

---
*Phase: 10-stripe-foundation*
*Completed: 2026-03-03*

## Self-Check: PASSED

- FOUND: supabase/migrations/015_stripe_events.sql
- FOUND: app/api/stripe/webhook/route.ts
- FOUND: .planning/phases/10-stripe-foundation/10-03-SUMMARY.md
- FOUND: commit 99b74ad (feat(10-03): create stripe_events idempotency migration)
- FOUND: commit 4a780e8 (feat(10-03): create Stripe webhook endpoint with signature verification and idempotency)
