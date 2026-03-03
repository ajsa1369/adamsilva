# Project Research Summary

**Project:** Adam Silva Consulting — Stripe Payment Integration (ASCv2 Milestone v2.0)
**Domain:** High-ticket B2B service payments on a Next.js 14 / Supabase / Vercel platform
**Researched:** 2026-03-03
**Confidence:** HIGH

---

## Executive Summary

This milestone adds real Stripe payment processing to an existing ASC platform that already has package pages, an agentic intake chatbot, proposal generation, ACP/AP2 protocol endpoints (currently stubs), and a Supabase schema. The core challenge is not "add Stripe" — it is building a payment system that is safe for high-ticket B2B transactions ($8,500–$125,000+) where chargebacks are catastrophic and ACH settlement timelines require an async state machine rather than synchronous payment confirmation.

The recommended approach: establish a solid foundation first (Stripe SDK singleton, webhook handler with raw body, idempotency table, all env vars validated at import time), then build the payment state machine (Supabase schema with six payment states, price sourced only from the proposals table, SOW gate enforced before any Stripe session is created), then layer in subscription billing and chargeback protection policy, and finally wire up the ACP/AP2 protocol endpoints to real Stripe sessions. Deferring ACP integration to Phase 4 is intentional — it depends on the base checkout flow being stable and the wire-versus-ACH threshold routing logic being proven.

The biggest risks are technical traps that cause silent failures: using `request.json()` in the webhook handler (destroys signature verification), missing the idempotency table (causes duplicate contracts on Stripe retries), trusting client-supplied amounts (price manipulation), and conflating ACH's 60-day dispute window with "non-reversible" (it is not). None of these risks are exotic — all have clear prevention patterns documented in the research. The ACP-to-Stripe bridging is the only area with low confidence because it is novel territory with no prior art.

---

## Key Findings

### Recommended Stack

The existing Next.js 14 / Supabase / Vercel / Zod stack requires only three new npm packages. All three versions have been verified against the npm registry as of 2026-03-03.

**Core technologies:**

- `stripe@^20.4.0`: Server-side Stripe API — recommended because v20 ships native Edge Runtime exports (`workerd`) AND has zero runtime dependencies; however, the webhook route and checkout routes must still use Node.js runtime (not Edge) due to crypto usage in signature verification
- `@stripe/stripe-js@^8.9.0`: Client-side Stripe.js loader — required for PCI compliance (Stripe mandates loading from stripe.com CDN, not self-hosting)
- `@stripe/react-stripe-js@^5.6.1`: React hooks and Elements components — peer dependency requires `@stripe/stripe-js >=8.0.0 <9.0.0`, satisfied by the above; do NOT install `@stripe/stripe-js@9.x`

No additional dev dependencies. Zod (already installed at `^4.3.6`) handles validation for all new API routes. Stripe CLI used locally for webhook forwarding (`stripe listen --forward-to localhost:3000/api/stripe/webhook`) — the local signing secret it generates is different from the Stripe Dashboard production secret.

**Critical version constraint:** `stripe@18` or earlier has different types for `PaymentIntent`, `Subscription`, and `Checkout.Session`. Use only `stripe@^20.4.0`.

**New environment variables required:** `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and one `STRIPE_PRICE_*` env var per tier per payment type (10 Price IDs total; Core tier is custom-quoted, no fixed Price ID).

---

### Expected Features

**Must have (table stakes — without these no real money can be collected):**

- Stripe Products + Prices for all 6 tiers (setup one-time + retainer recurring) — required before any Checkout Session or Subscription can be created
- Checkout Session creation endpoint with SOW gate, ToS metadata, and proposal ID lookup from Supabase — the core payment flow
- ACH Direct Debit (`us_bank_account`) + card on Checkout Session — ACH is the preferred B2B payment method for high-ticket amounts
- Stripe Subscriptions for monthly retainers — with `billing_cycle_anchor` aligned to contract start date; no trial periods
- Webhook handler at `/api/stripe/webhook` handling: `payment_intent.succeeded`, `payment_intent.processing`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `checkout.session.completed`, `charge.dispute.created`
- Supabase `payments` state machine updated by webhook — required for async ACH tracking
- ToS acknowledgement capture (timestamp + IP in Supabase + `metadata.tos_accepted_at` on PaymentIntent) — chargeback defense layer
- Three new Supabase migrations: `orders`, `subscriptions`, `stripe_events` (idempotency log)

**Should have (add after core flow validates — v2.1):**

- ACP real Checkout Sessions — upgrade `/api/acp/checkout` stub to call `lib/stripe/` and return ACP-formatted response with real Stripe session URL
- AP2 wire mandate routing — amount-threshold detection in ACP checkout: above $25K returns structured wire instructions instead of Checkout Session URL
- UCP discovery update — `/.well-known/ucp` advertises real `payment_methods: ["stripe_checkout", "ach_direct_debit", "wire_transfer"]`
- SOW PDF attached to payment confirmation email (webhook-triggered, via existing Resend + PDF pipeline)
- Financial Connections (instant bank verification) for ACH — eliminates 1-3 day microdeposit wait

**Defer to v2.2+:**

- Stripe Chargeback Protection enrollment (0.4% fee — evaluate when real transaction volume exists)
- Bank webhook for automated wire reconciliation (manual reconciliation acceptable at low wire volume)
- Stripe Customer Portal (not critical until churn risk emerges)
- Multi-currency support

**Anti-features — do not build:**

- Refund capability in any application UI (manual Stripe Dashboard only, by account owner)
- PayPal as a payment option (Buyer Protection overrides all-sales-final; treat as disqualifying signal)
- Stripe Payment Links (no server-side price validation, no SOW gate, no Supabase record creation)
- Credit card as primary payment for large setup fees (60–120 day chargeback window on $48K is untenable)
- Immediate revenue recognition on ACH payments (funds are not cleared until `payment_intent.succeeded` fires 4-7 business days after authorization)

---

### Architecture Approach

The architecture isolates all Stripe business logic in a new `lib/stripe/` module (mirroring the existing `lib/supabase/` and `lib/pricing/` pattern), exposes new API routes under `/api/stripe/`, modifies the existing `/api/acp/` endpoints to call `lib/stripe/` internally, and adds three new checkout pages at `app/checkout/`. The ACP endpoint remains the protocol-facing surface; it delegates to `lib/stripe/` and translates the result into ACP response format. Wire transfer path and Stripe Checkout Session path are two separate code paths in `/api/acp/checkout` (AP2 amount threshold routing decision).

**Major components:**

1. `lib/stripe/client.ts` — Stripe SDK singleton; initialized once at module level with pinned API version; all server-side Stripe calls import from here; never call `new Stripe()` in route files
2. `lib/stripe/products.ts` — Maps ASC package slugs to Stripe Price IDs from environment variables; source of truth for catalog
3. `lib/stripe/webhook-handlers.ts` — Pure functions, one per event type, that update Supabase via service-role client; includes idempotency check against `stripe_events` table
4. `lib/supabase/service.ts` (new) — Service-role Supabase client without cookies; required for webhook handlers which have no user session context
5. `app/api/stripe/webhook/route.ts` — Signature verification using `request.text()` (raw body); routes to handlers; must have `export const runtime = 'nodejs'` (not Edge)
6. `app/api/stripe/checkout/route.ts` — Creates PaymentIntent (setup fee, ACH path) or Checkout Session (subscription path) based on `payment_type` field; always looks up price from Supabase proposals table, never from request body
7. `app/checkout/[id]/page.tsx` — Human-facing checkout UI (Stripe Elements for ACH or wire instructions page)
8. `app/api/acp/checkout/route.ts` (modified) — ACP wrapper that calls `lib/stripe/` and returns ACP-formatted response; wire mandate routing at amount threshold

**Build dependency order that must be respected:** Foundation (SDK singleton, types, env vars, service Supabase client) → Stripe catalog setup in Dashboard + `products.ts` → Supabase migrations (orders, subscriptions, stripe_events) → Webhook infrastructure → Checkout API → Checkout pages → ACP/UCP updates → Customer portal.

---

### Critical Pitfalls

1. **Webhook raw body destroyed by `request.json()`** — The one route where `request.json()` is fatal is `/api/stripe/webhook`. Every other route uses it; copying the pattern here breaks signature verification on every event with a cryptic 400 error. Fix: `const rawBody = await request.text()` and pass it directly to `stripe.webhooks.constructEvent()`. Prevention phase: Phase 1 (Stripe Foundation).

2. **Missing idempotency table causes duplicate onboarding** — Stripe guarantees at-least-once webhook delivery. Without a `stripe_events` table check on `event.id`, a transient error mid-processing + Stripe retry = two contracts sent, two Supabase rows, two emails for a $48K engagement. Prevention phase: Phase 1 — `stripe_events` migration must exist before any webhook goes live.

3. **ACH misunderstood as non-reversible** — ACH has a 60-day dispute window (NACHA R07/R10 codes). A disputed $48K ACH payment results in an immediate debit from the Stripe account. Wire transfer is the only truly non-reversible instrument. Enforce AP2 wire mandate for amounts above $25K. Prevention phase: Phase 3 (Chargeback Protection).

4. **Price sourced from client request body** — The existing ACP checkout stub trusts `body.cart.total`. When wired to real Stripe, a client could manipulate the checkout amount. The canonical price must always come from a Supabase `proposals` table lookup using `proposal_id`. Prevention phase: Phase 2 (Payment State Machine).

5. **`STRIPE_WEBHOOK_SECRET` missing from Vercel Dashboard** — The local Stripe CLI provides a local webhook secret that is different from the production signing secret. If the env var is undefined in Vercel, a catch block returning 200 means the endpoint accepts all payloads without verification — including forged `payment_intent.succeeded` events. Prevention phase: Phase 1 — validate all Stripe env vars at import time in `lib/stripe/client.ts`; fail loudly if missing.

6. **Edge Runtime incompatibility** — `stripe` (Node.js SDK) uses `crypto`, `http`, `https`, and `buffer`. Any route importing from `stripe` must not have `export const runtime = 'edge'`. The webhook route must explicitly set `export const runtime = 'nodejs'`. Prevention phase: Phase 1 — document as a code comment in `lib/stripe/client.ts`.

---

## Implications for Roadmap

Based on the combined research, a four-phase structure (plus a v2.1 follow-on phase) is recommended.

### Phase 1: Stripe Foundation

**Rationale:** Every other piece of Stripe work depends on the SDK singleton, webhook handler, env var validation, and idempotency table. Getting the webhook handler wrong breaks everything downstream. These components have no external dependencies — they can be built before Products exist in Stripe Dashboard.

**Delivers:** Working Stripe SDK infrastructure; webhook endpoint that verifies signatures correctly and handles events idempotently; all required env vars documented and validated; `lib/supabase/service.ts` for server-side Supabase access without user session; foundation files (`lib/stripe/client.ts`, `lib/stripe/types.ts`, `lib/stripe/webhook-handlers.ts` skeleton).

**Addresses:** Table stakes — Stripe environment variable setup, webhook handler, test mode infrastructure.

**Avoids:** Pitfall 1 (raw body), Pitfall 3 (idempotency), Pitfall 5 (missing webhook secret), Pitfall 7 (Edge Runtime), Pitfall 4 (SDK not singleton).

---

### Phase 2: Payment State Machine + Supabase Schema

**Rationale:** The Supabase schema must be locked before checkout logic is built. Price lookup must come from the proposals table — not from client input. The `orders`, `subscriptions`, and `stripe_events` migrations need to be applied before any route can write payment data.

**Delivers:** Three new Supabase migrations (015_orders, 016_subscriptions, 017_stripe_events); `proposals.status` updated to include `paid`; `lib/stripe/products.ts` with all 10 Price IDs from Stripe Dashboard; Stripe Products and Prices created in Dashboard for all 5 fixed-price tiers; payment state machine design with six states (pending, authorized, processing, confirmed, failed, refunded).

**Addresses:** Table stakes — Stripe Products + Prices catalog, Supabase payment state.

**Avoids:** Pitfall 6 (price from client request body), Pitfall 2 (ACH timing state machine), Pitfall 3 (subscription trial period).

---

### Phase 3: Checkout API + Chargeback Defense Policy

**Rationale:** The checkout API is the central integration point — it ties the Supabase proposals table to Stripe session creation. Chargeback defense policy (SOW gate, ToS capture, wire threshold enforcement) must be built into the checkout route from day one, not retrofitted.

**Delivers:** `/api/stripe/checkout/route.ts` with dual payment mode (setup fee via PaymentIntent + ACH, subscription via Checkout Session); SOW gate (`sow_signed_at` not null before session creation); ToS acknowledgement capture (timestamp + IP → Supabase + Stripe metadata); ACH/wire threshold routing (under $25K: ACH or card; $25K+: wire instructions); webhook handlers fully implemented for all six event types; `app/checkout/[id]/page.tsx`, `/success`, `/cancel` pages; Stripe Radar configuration.

**Addresses:** Table stakes — Checkout Session creation, ACH, Subscriptions, ToS capture, email confirmation; differentiators — SOW PDF delivery, Supabase payment state machine updates.

**Avoids:** Pitfall 5 (ACH chargeback window — wire mandate enforced), Pitfall 6 (checkout amount from Supabase), Pitfall 10 (no trial periods on subscriptions), Pitfall 8 (ACP CORS — deferred to Phase 4).

---

### Phase 4: ACP + UCP Protocol Integration

**Rationale:** The ACP checkout stub becomes a real payment initiator only after the base Stripe checkout flow is proven stable. Wiring ACP to Stripe before the core flow is validated risks compounding bugs. Rate limiting and CORS hardening must be added at this phase because the ACP endpoint now initiates real Stripe charges.

**Delivers:** `/api/acp/checkout/route.ts` upgraded from stub to real Stripe Checkout Session creator; AP2 wire mandate routing (amount > threshold → return wire instruction JSON instead of session URL); `/api/acp/negotiate/route.ts` updated with real `payment_methods`; `/.well-known/ucp` and `/api/ucp/route.ts` updated to advertise `["stripe_checkout", "ach_direct_debit", "wire_transfer"]`; rate limiting middleware on ACP checkout endpoint; Supabase `wire_expected` records for pending wires.

**Addresses:** Differentiators — ACP real Checkout Sessions, AP2 wire mandate, UCP discovery update; table stakes — agent authentication validation before any session creation.

**Avoids:** Pitfall 8 (CORS wildcard on payment endpoint without rate limiting), Pitfall 6 (ACP checkout still must look up price from Supabase, not from `body.cart.total`).

---

### Phase Ordering Rationale

- Foundation must precede everything because the webhook handler and Stripe SDK singleton are used by all downstream code. Building checkout routes before the webhook handler is tested is building on sand.
- State machine (Supabase schema + Stripe catalog) must precede checkout API because the checkout route looks up prices from the proposals table. Migrations that do not exist yet cannot be queried.
- Chargeback defense must be built into Phase 3 (not retrofitted later) because the SOW gate and ToS capture are legal and financial requirements, not UX polish. Adding them after the first real payment is too late.
- ACP integration is last because it wraps the core checkout flow. An unstable core makes the ACP layer unreliable, and ACP is where AI agents will spend real money.

### Research Flags

Phases that likely need `/gsd:research-phase` during planning:

- **Phase 4 (ACP + UCP):** Novel territory. ACP-to-Stripe bridging has no prior art. Rate limiting strategy for ACP endpoints, AP2 wire instruction format, and agent authentication validation patterns need deeper research before implementation. LOW confidence in current research for this specific integration.

Phases with standard patterns (skip research-phase):

- **Phase 1 (Stripe Foundation):** Highly documented. Stripe SDK singleton and webhook raw body patterns are covered in official Stripe docs. No ambiguity.
- **Phase 2 (Payment State Machine):** Supabase schema design and Stripe Products/Prices creation are straightforward. Standard patterns apply.
- **Phase 3 (Checkout API):** Stripe Checkout Sessions, Subscriptions, and PaymentIntents are core Stripe features with extensive documentation and stable APIs since Stripe v14+.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All three new package versions verified against npm registry on 2026-03-03. Peer dependency compatibility confirmed. Edge Runtime limitation verified via SDK inspection. |
| Features | MEDIUM | Feature categorization, dependency mapping, and implementation patterns are HIGH confidence. Stripe-specific pricing (0.4% Chargeback Protection fee) and ACH limit details are MEDIUM — WebFetch was unavailable during research; verify against stripe.com/docs before implementation. |
| Architecture | HIGH | Based on direct codebase inspection of existing routes + Stripe Node.js SDK knowledge. Component boundaries, data flow, and build order are all internally consistent with the existing project structure. |
| Pitfalls | HIGH (core) / LOW (ACP) | Webhook raw body, idempotency, singleton, Edge Runtime, and ACH timing pitfalls are well-documented Stripe patterns — HIGH confidence. ACP-to-Stripe session bridging is novel with no prior art — LOW confidence on edge cases and failure modes. |

**Overall confidence:** HIGH for v2.0 core payment flow. MEDIUM for v2.1 ACP/AP2 integration.

### Gaps to Address

- **Stripe Chargeback Protection eligibility and pricing:** Must be verified against https://stripe.com/docs/radar/chargeback-protection before enrollment decision. The 0.4% figure is training-data-era and may have changed.
- **ACH transaction limits for new Stripe accounts:** Stripe may apply account-level review for first high-value ACH ($25K+). Verify with Stripe support before processing large ACH payments on a new account.
- **ACP agent authentication mechanism:** The research recommends validating `spt_token` or bearer token before Checkout Session creation, but the specific token validation logic against `supabase.api_keys` has not been designed. Needs a dedicated design decision before Phase 4.
- **AP2 wire instruction format:** The wire instruction JSON structure in FEATURES.md is a proposal, not a ratified AP2 spec. Confirm the format against any existing AP2 protocol documentation before implementation.
- **Stripe API version pin:** ARCHITECTURE.md uses `apiVersion: '2025-01-27.acacia'` while PITFALLS.md shows `2024-06-20`. Align on a single pinned version before starting Phase 1.

---

## Sources

### Primary (HIGH confidence)

- npm registry: `stripe@20.4.0`, `@stripe/stripe-js@8.9.0`, `@stripe/react-stripe-js@5.6.1` — versions and peer dependencies verified 2026-03-03
- Codebase inspection: `app/api/acp/checkout/route.ts`, `lib/pricing/types.ts`, `lib/data/packages.ts`, `supabase/migrations/006_proposals.sql`, `package.json`, `lib/supabase/server.ts` — existing code state confirmed
- Stripe Webhooks best practices: https://stripe.com/docs/webhooks/best-practices — raw body requirement, idempotency patterns
- Stripe ACH Direct Debit: https://stripe.com/docs/payments/ach-direct-debit — settlement timing, dispute window
- Stripe Subscriptions: https://stripe.com/docs/billing/subscriptions/overview — billing lifecycle
- Next.js 14 App Router Route Handlers: https://nextjs.org/docs/app/api-reference/file-conventions/route — `request.text()` for raw body
- Vercel Serverless Function limits: https://vercel.com/docs/functions/runtimes — 10s default timeout
- NACHA operating rules: ACH return codes R07, R10, 60-day dispute window

### Secondary (MEDIUM confidence)

- Stripe Radar: https://stripe.com/docs/radar — high-ticket threshold behavior for Radar rules
- Stripe Chargeback Protection: https://stripe.com/docs/radar/chargeback-protection — eligibility and pricing (verify before enrollment)
- Stripe Financial Connections: ACH instant bank verification behavior

### Tertiary (LOW confidence)

- ACP Protocol + Stripe bridge patterns — no prior art found; recommendations based on first-principles security analysis of the existing ACP stub code
- AP2 wire instruction response format — proposed structure, not verified against AP2 spec

---

*Research completed: 2026-03-03*
*Ready for roadmap: yes*
