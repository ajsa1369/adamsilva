# Pitfalls Research

**Domain:** Stripe Payment Integration — Next.js 14 App Router + Vercel + Supabase, high-ticket B2B
**Researched:** 2026-03-03
**Confidence:** HIGH (webhook/raw body, idempotency, ACH timing — Stripe core patterns, well-documented and stable); MEDIUM (Stripe Radar thresholds for B2B amounts, ACH return code handling nuances); LOW (ACP protocol + Stripe session bridging — novel combination with no prior art)

---

## Critical Pitfalls

### Pitfall 1: Webhook Raw Body Destroyed by Next.js JSON Parsing

**What goes wrong:**
The existing API routes call `await request.json()` at the top of every handler. If you copy this pattern into `/api/stripe/webhook`, Stripe's signature verification will fail with a 400 error on every single webhook event. `stripe.webhooks.constructEvent()` requires the raw byte buffer — once `request.json()` has parsed it, the signature hash will not match and every event will be rejected.

**Why it happens:**
Developers see that every other route uses `request.json()` and copy the pattern without realizing the Stripe webhook handler is the one route in the entire codebase where this is explicitly wrong. The error message ("No signatures found matching the expected signature for payload") is cryptic and does not explain the real cause.

**How to avoid:**
In `/api/stripe/webhook/route.ts`, use `request.arrayBuffer()` then convert to a Node.js Buffer, or use `request.text()` and pass the raw string. Never call `request.json()` in this route. Do not add Zod validation on the raw body — validate only after constructing the event.

```typescript
// CORRECT
export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const sig = request.headers.get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }
  // handle event.type below...
}

// WRONG — copied from other routes
const body = await request.json()  // destroys raw body, signature will never match
```

**Warning signs:**
- Every webhook event returns 400 with a signature error in Stripe Dashboard
- Local `stripe listen --forward-to` works but production webhooks all fail
- The handler works in test with `stripe trigger` but not with real events

**Phase to address:**
Phase 1 (Stripe Foundation) — before any other Stripe work. This is the root of the entire payment system. Getting it wrong here breaks everything downstream.

---

### Pitfall 2: Vercel Serverless Timeout on ACH/Wire Confirmation Polling

**What goes wrong:**
ACH Direct Debit payments are not synchronous. After a customer authorizes an ACH debit, the payment status is `processing` for 4–7 business days before it becomes `succeeded` or `failed`. If the `/api/stripe/webhook` handler tries to do heavy processing (send proposal confirmation email, update Supabase proposal status, trigger onboarding flow) synchronously within the webhook response window, Vercel's 10-second serverless timeout will kill the function and Stripe will retry — causing duplicate processing.

For high-ticket wire transfers ($25K+), the "intent confirmed" webhook arrives but the actual funds clear days later. Building UI or business logic that treats `payment_intent.created` as payment-confirmed is a catastrophic mistake.

**Why it happens:**
Developers build the happy path against card payments (which settle in seconds) then bolt on ACH/wire without redesigning the state machine. The Stripe event names (`payment_intent.succeeded`) sound final but for ACH they fire 4+ days after authorization.

**How to avoid:**
Design the payment state machine from day one to have explicit states:
- `authorized` — customer has agreed to pay (ACH mandate created, checkout complete)
- `processing` — funds in transit (ACH 4–7 days, wire 1–3 days)
- `confirmed` — funds cleared, `payment_intent.succeeded` fired
- `failed` — ACH returned (R01, R02, R03, etc.) or wire rejected

Only trigger onboarding, contract delivery, and SOW signing after `confirmed`. Store all intermediate states in the Supabase `proposals` table. Webhook handler should only update the state and enqueue async work (Supabase edge function or background job) — not execute it inline.

**Warning signs:**
- Supabase `proposals` table has no `payment_status` column — only a boolean `paid`
- Proposal confirmation email fires immediately on checkout session creation
- No handling for `payment_intent.payment_failed` or ACH return codes

**Phase to address:**
Phase 2 (Payment State Machine) — design the Supabase schema for payment states before writing any payment processing code.

---

### Pitfall 3: Missing Idempotency on Webhook Handler Causes Duplicate Onboarding

**What goes wrong:**
Stripe retries webhooks when your endpoint returns a non-2xx response or times out. If your handler processes `payment_intent.succeeded` and sends a contract, updates Supabase, and emails the client — and then Stripe retries because of a 500 error in email sending — the client receives two contracts, two emails, and Supabase has two conflicting records for the same payment.

At $48K (Gold package), duplicate contract generation is a legal and billing nightmare.

**Why it happens:**
Developers handle the event, then fail at the last step (email), return 500, and Stripe retries. Or the Vercel function times out mid-processing. Either way, the handler is not idempotent.

**How to avoid:**
Use `event.id` as an idempotency key. Before processing any event, check Supabase for a `stripe_events` table record with that `event_id`. If found, return 200 immediately (acknowledge the event without re-processing). Only write the record after successfully completing all side effects.

```typescript
// Check idempotency FIRST
const { data: existing } = await supabase
  .from('stripe_events')
  .select('id')
  .eq('event_id', event.id)
  .single()

if (existing) {
  return NextResponse.json({ received: true, skipped: 'duplicate' })
}

// Process the event...

// Record AFTER success
await supabase.from('stripe_events').insert({ event_id: event.id, processed_at: new Date().toISOString() })
```

**Warning signs:**
- No `stripe_events` table in the Supabase schema
- Webhook handler does side effects (email, DB writes) before acknowledging
- No try/catch structure that separates the Stripe event parsing from the side effects

**Phase to address:**
Phase 1 (Stripe Foundation) — the `stripe_events` idempotency table must be in the initial Supabase migration, not added later.

---

### Pitfall 4: Stripe SDK Initialized in Serverless Function Body (New Instance Per Request)

**What goes wrong:**
Calling `new Stripe(process.env.STRIPE_SECRET_KEY!)` inside the route handler function body creates a new Stripe SDK instance on every request. This is wasteful but not immediately broken. The real problem is that Stripe's Node.js SDK includes retry logic, connection pooling, and telemetry — all of which are reset per request when initialized inline. Under concurrent webhook delivery, this can cause connection exhaustion on Vercel's serverless runtime.

**Why it happens:**
Copy-paste from Stripe quickstart examples that are designed for scripts, not serverless functions. The Vercel cold-start pattern makes developers think initialization must be local.

**How to avoid:**
Initialize the Stripe client once at module level in `lib/stripe/client.ts` and import it:

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',  // pin to a specific version
  typescript: true,
})
```

**Warning signs:**
- `new Stripe(...)` appears inside a route handler function body
- No `lib/stripe/` directory (no centralized Stripe utilities)
- API version not pinned (no `apiVersion` argument)

**Phase to address:**
Phase 1 (Stripe Foundation) — create `lib/stripe/client.ts` as the first file before any route handlers.

---

### Pitfall 5: ACH Chargeback Window Is 60 Days — Not Zero Like Wire

**What goes wrong:**
ACH Direct Debit has a 60-day dispute window for consumers (slightly shorter for business ACH but still 30–60 days depending on the return code). For a $48K Gold package paid via ACH, a fraudulent dispute filed 45 days after authorization results in an immediate debit from your Stripe account — which may be the full $48K plus a $15 dispute fee — before you can submit evidence.

Many B2B payment strategies recommend ACH as "chargeback-proof" compared to cards. This is wrong. ACH disputes can result in funds reversal. Wire transfers are the only truly non-reversible payment method (once received at the beneficiary bank, the sender cannot recall without beneficiary consent).

**Why it happens:**
Conflating "lower dispute rate than credit cards" with "no disputes possible." ACH return codes R07 (authorization revoked) and R10 (customer advises not authorized) are specifically designed for consumer protection and can be used for up to 60 days.

**How to avoid:**
- For payments above $25K: require wire transfer (enforce via AP2 mandate service). Wire is the only legally non-reversible instrument.
- For ACH payments $8.5K–$25K: require signed SOW with clear authorization language before initiating the debit. This is the evidence you submit if disputed.
- Enroll in Stripe's Chargeback Protection for ACH where available (this transfers dispute liability to Stripe for a fee).
- Store the signed SOW PDF in Supabase with the payment record before any debit is initiated.

**Warning signs:**
- No wire transfer enforcement threshold in the codebase
- SOW signing and payment initiation are decoupled (payment can happen before SOW is signed)
- No stored evidence artifacts (signed PDFs) linked to payment records

**Phase to address:**
Phase 3 (Chargeback Protection & Policy Enforcement) — after core payment flows are built, add the policy enforcement layer that gates payments behind signed SOW.

---

### Pitfall 6: Stripe Checkout Session Amount Mismatch With Proposal Engine

**What goes wrong:**
The proposal engine generates a custom price for each client based on their stack audit. If the checkout session is created with a different amount than what was quoted in the proposal PDF, you have a billing discrepancy. Worse, if the amount is constructed from client-supplied input (even from the proposal page URL parameters), a client could manipulate the checkout amount.

**Why it happens:**
The ACP checkout route currently creates a `checkoutId` from `body.cart.total` — a client-supplied value. When wiring up real Stripe, developers often pass the price through the URL or request body from the frontend, trusting it as the source of truth.

**How to avoid:**
Never create a Stripe Checkout Session or PaymentIntent with a price derived from client input. The canonical price must come from Supabase (the `proposals` table, which stores the server-calculated price) — looked up by `proposal_id` using the server-side Supabase client. The checkout endpoint should be: receive `proposal_id` → look up price in Supabase → create Stripe session with that amount.

```typescript
// CORRECT
const { data: proposal } = await supabase
  .from('proposals')
  .select('total_amount, stripe_price_id, client_email')
  .eq('id', proposalId)
  .single()

const session = await stripe.checkout.sessions.create({
  amount: proposal.total_amount,  // from server, not client
  ...
})

// WRONG
const session = await stripe.checkout.sessions.create({
  amount: body.cart.total,  // client-supplied — never trust this
  ...
})
```

**Warning signs:**
- Checkout endpoint accepts `amount` or `price` as a parameter from the request body
- No server-side lookup against a proposals table before creating the Stripe session
- Proposal prices are calculated client-side (in React state, not in an API route)

**Phase to address:**
Phase 2 (Payment State Machine) — the Supabase proposals table must be the canonical price source before checkout is wired up.

---

### Pitfall 7: Edge Runtime Incompatibility With Stripe Node.js SDK

**What goes wrong:**
The project constraint says "Vercel Edge Runtime where compatible — verify before adding." The Stripe Node.js SDK uses Node.js built-in APIs (`crypto`, `http`, `https`, `buffer`) that are not available in the Vercel Edge Runtime. If `/api/stripe/webhook` or `/api/stripe/checkout` is configured with `export const runtime = 'edge'`, the build will succeed but the route will fail at runtime with a module resolution error.

**Why it happens:**
Developers add `export const runtime = 'edge'` to all API routes as a performance optimization without checking which routes use Node.js-only libraries.

**How to avoid:**
Any route that imports from `stripe` must NOT have `export const runtime = 'edge'`. These routes must use the default Node.js runtime. Add an explicit comment:

```typescript
// DO NOT add `export const runtime = 'edge'` — Stripe SDK requires Node.js runtime
export const dynamic = 'force-dynamic'
```

Alternatively, use `stripe-js` on the client side for redirect-based checkout flows — but the webhook handler always needs Node.js.

**Warning signs:**
- Any Stripe route file contains `export const runtime = 'edge'`
- Build passes but runtime errors appear in Vercel function logs
- `crypto` or `buffer` module not found errors in production

**Phase to address:**
Phase 1 (Stripe Foundation) — document the runtime constraint as a code comment in `lib/stripe/client.ts` so every developer who imports it sees the warning.

---

### Pitfall 8: ACP Checkout Route Exposes Wildcard CORS — Unsafe for Payment Endpoints

**What goes wrong:**
The existing `/api/acp/checkout/route.ts` has `'Access-Control-Allow-Origin': '*'`. When this route is wired to real Stripe Checkout Sessions, the wildcard CORS allows any website to POST a checkout initiation request. For ACP (AI agent initiated payments), the authenticated agents use `spt_token` or `delegation_token` — but the wildcard CORS means a malicious script from any origin can also attempt checkout initiation.

**Why it happens:**
The ACP spec requires broad accessibility for AI agents (they don't have a fixed origin). Developers copy the wildcard CORS headers from the mock implementation into the real payment handler without considering the security implications.

**How to avoid:**
Split the route behavior. ACP agent endpoints that only need authentication can keep wildcard CORS because token validation is the real gate. But add strict rate limiting (Vercel's built-in rate limiting or a middleware layer) and ensure that checkout creation always requires a valid `proposal_id` that exists in Supabase. The wildcard CORS is acceptable IF the business logic gate (valid proposal ID + valid token) is airtight.

For human-facing checkout (direct browser), restrict CORS to `https://www.adamsilvaconsulting.com`.

**Warning signs:**
- A single route handler serves both ACP agent requests and human browser requests with the same CORS policy
- No rate limiting on the checkout initiation endpoint
- Checkout can be created without a corresponding proposal record in Supabase

**Phase to address:**
Phase 4 (ACP Protocol Integration) — when the ACP checkout route is wired to real Stripe, add rate limiting middleware before deploying.

---

### Pitfall 9: Missing `STRIPE_WEBHOOK_SECRET` in Vercel Environment Causes Silent Pass-Through

**What goes wrong:**
If `process.env.STRIPE_WEBHOOK_SECRET` is undefined, `stripe.webhooks.constructEvent()` throws. If the webhook handler wraps this in a try/catch that returns 200, the endpoint will accept ALL webhook payloads without signature verification — including forged ones. A bad actor who discovers your webhook URL can forge `payment_intent.succeeded` events and trigger onboarding for unpaid proposals.

**Why it happens:**
Developers configure `STRIPE_WEBHOOK_SECRET` locally via `stripe listen` (which provides a local webhook secret), then forget to add the production webhook secret to Vercel environment variables. The local CLI secret and the Stripe Dashboard webhook signing secret are DIFFERENT values.

**How to avoid:**
Fail explicitly if the env var is missing. In `lib/stripe/client.ts`, validate all required env vars at import time (not at request time). Use Vercel's environment variable UI to set `STRIPE_WEBHOOK_SECRET` for production, preview, and development environments separately. The production secret comes from the Stripe Dashboard → Developers → Webhooks → endpoint detail page.

```typescript
// lib/stripe/config.ts
export function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required')
  }
  return secret
}
```

**Warning signs:**
- `STRIPE_WEBHOOK_SECRET` is in `.env.local` but not in Vercel Dashboard environment variables
- The webhook handler has a catch block that returns 200 on any signature error
- No startup validation of required Stripe env vars

**Phase to address:**
Phase 1 (Stripe Foundation) — env var validation must be the first thing built. Document all required Stripe env vars in `.env.local.example`.

---

### Pitfall 10: Subscription Trial Periods Conflict With "All Sales Final" Policy

**What goes wrong:**
Stripe Subscriptions support trial periods natively. If a developer enables `trial_period_days` on the subscription (even just to test the flow), clients who receive a subscription with a trial get a grace window where they have not technically paid. If the SOW delivery or onboarding begins during trial, and the client cancels before the trial ends, ASC has delivered services with no payment and no recourse — especially if the "all sales final" policy was not enforced before trial started.

**Why it happens:**
Trial periods are tempting for UX testing and developer demos. They get left in production or get proposed as a client-friendly option without understanding the legal and financial implications for a no-refund service business.

**How to avoid:**
Never use `trial_period_days` on ASC subscriptions. Monthly retainers start billing immediately on subscription creation. The "trial" equivalent for ASC is the proposal and SOW review period — during which no payment is collected. Once signed, billing starts immediately. If Stripe asks about this during account review, describe it as "no trial, immediate billing for contracted services."

**Warning signs:**
- `trial_period_days` appears anywhere in Stripe product/price configuration
- Subscription creation code passes a `trial_end` timestamp
- Onboarding begins before subscription `status === 'active'`

**Phase to address:**
Phase 3 (Subscription Billing) — establish the billing lifecycle policy in the Supabase schema and enforce it in code before creating any subscriptions.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using one Stripe product for all packages and setting price dynamically | Avoids creating 6 Products in Stripe Dashboard | No per-product analytics, no Stripe-side revenue breakdowns, customer portal shows wrong product | Never — create separate Products/Prices for each of the 6 tiers from day 1 |
| Storing Stripe price IDs hardcoded in source | Fast to implement | Must redeploy to change pricing, breaks if Stripe price is archived | Only in env vars — never in source code |
| Skipping `stripe_events` idempotency table in MVP | Faster initial build | Duplicate onboarding triggers on Stripe retries | Never — add before first webhook goes live |
| Using Payment Links instead of Checkout Sessions for high-ticket | Zero code to implement | No server-side price validation, no proposal linkage, no state machine integration | Only for ad-hoc one-off payments under $5K |
| Relying on Stripe Dashboard notifications instead of webhook handler | No webhook code to write | Misses automation, state machine never updates, manual work scales badly | Never for amounts above $1K |
| Using Stripe's test mode webhook endpoint in production | Easier to test | Test events never fire in production, real payments never processed | Never — use separate endpoints per environment |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Stripe + Next.js 14 App Router | Calling `request.json()` in webhook handler | Use `request.text()` and pass raw string to `constructEvent()` |
| Stripe + Vercel | Adding `export const runtime = 'edge'` to Stripe routes | Stripe routes must use Node.js runtime; document this in `lib/stripe/client.ts` |
| Stripe + Supabase | Storing payment status as a boolean `paid` field | Use a `payment_status` enum: `pending`, `authorized`, `processing`, `confirmed`, `failed`, `refunded` |
| Stripe Subscriptions + ACH | Expecting immediate payment on ACH subscription creation | ACH subscription first payment takes 4–7 days; use `collection_method: 'charge_automatically'` with `payment_method_types: ['us_bank_account']` and handle the async confirmation |
| Stripe Checkout + ACP | Trusting `cart.total` from ACP request body | Look up canonical price in Supabase by `proposal_id`; never trust client-supplied amounts |
| Stripe Webhooks + Vercel | Webhook handler processing heavy work inline | Return 200 immediately; enqueue async work to Supabase edge function or background job |
| Stripe + `stripe-js` client | Importing `stripe` (server SDK) in client components | `stripe` (Node.js SDK) is server-only; `@stripe/stripe-js` is the client package |
| Stripe ACH + Chargeback | Treating ACH as non-reversible | ACH has 60-day dispute window; only wire transfer is truly non-reversible |
| Stripe Radar + High Ticket B2B | Radar default rules block large B2B transactions as fraud | Add Radar rules to allow verified customers; use manual review for first-time high-ticket payments |
| Stripe Customer Portal + B2B subscriptions | Enabling full self-service cancellation | B2B contracts have minimum terms; disable cancel-at-period-end in customer portal or handle cancellation only via admin |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Inline Stripe API calls in Server Components | Page renders wait for Stripe API (200–500ms latency) | Never call Stripe in Server Component render path; use API routes only | Every page load for any page that shows payment status |
| Webhook handler doing synchronous DB writes + email in one function | Vercel function timeout on slow email provider | Separate webhook acknowledgment (return 200) from side effect processing (background job) | At ~3 seconds of combined latency |
| No connection reuse for Stripe client | New HTTP connection per request | Initialize `stripe` at module level, not inside handler | Under concurrent webhook load (Stripe can send bursts) |
| Fetching all Stripe subscriptions on every request | Slow API responses if customer has many subscriptions | Cache subscription status in Supabase; only fetch from Stripe on webhook events | With 10+ subscriptions per customer |
| Supabase query without index on `stripe_customer_id` | Slow proposal lookups during webhook processing | Add index: `CREATE INDEX ON proposals(stripe_customer_id)` | When proposals table exceeds ~1,000 rows |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Not verifying Stripe webhook signature | Any HTTP client can forge payment events; fake `payment_intent.succeeded` triggers unauthorized onboarding | Always call `stripe.webhooks.constructEvent()` with the raw body; return 400 on any failure |
| Exposing `STRIPE_SECRET_KEY` in client-side code | Secret key exposed in browser; attacker can create charges, read all customer data, issue refunds | Never use `NEXT_PUBLIC_STRIPE_SECRET_KEY`; only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe for the browser |
| Building ACP checkout with CORS `*` and no rate limiting | Automated bots enumerate proposal IDs and trigger checkout sessions | Add rate limiting middleware (5 req/min per IP) to ACP checkout endpoint |
| Storing raw bank account numbers in Supabase | PCI/banking compliance violation; data breach liability | Never store bank details; Stripe tokenizes all payment methods — only store the `pm_xxx` token and last 4 digits |
| Trusting `metadata` on incoming Stripe events without verification | Attacker can forge metadata in events (though signature protects the event itself) | Always look up canonical data in Supabase using the metadata ID — never trust the metadata values themselves as authoritative |
| Enabling refunds in Stripe Dashboard without business logic gate | Any Stripe admin can issue refund for services already delivered | Disable automatic refunds; all refunds require manual approval with documented business justification |
| Using the same Stripe webhook endpoint for test and production | Test events pollute production data | Register separate webhook endpoints: `/api/stripe/webhook` for production, different URL (or localhost tunnel) for development |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Showing "Payment Successful" immediately after ACH authorization | Client expects service to start; ACH takes 4–7 days to confirm; client feels deceived when onboarding doesn't begin | Show "Payment Authorized — We will begin onboarding within 1 business day of payment confirmation (4–7 business days)" |
| Wire transfer instructions buried in email | Client doesn't see wire instructions; payment delayed by weeks | Show wire transfer details prominently on a dedicated `/checkout/wire-instructions/[proposal_id]` page, also sent via email |
| No payment status page | Client has no way to check if their ACH payment cleared without emailing ASC | Build `/dashboard/payment-status/[proposal_id]` that shows live payment state from Supabase |
| Stripe Checkout Session expiry not communicated | Session expires after 24 hours; client returns to a dead link | Set `expires_after` to 48 hours for B2B (clients need time to get wire approval); show countdown and "request new payment link" option |
| Forcing Stripe card payment UI for ACH/wire | Card form appears; client types card details for a $48K invoice; card gets declined due to credit limit | Surface ACH and wire options prominently as the primary payment methods; card should be secondary or removed entirely for high-ticket |
| No receipt/invoice after payment | Client's accounts payable needs an invoice for processing; they email asking for one | Configure Stripe to auto-send receipts; also generate a Supabase-backed invoice document at `/invoices/[payment_id]` |

---

## "Looks Done But Isn't" Checklist

- [ ] **Webhook handler:** Verify it uses `request.text()` not `request.json()` — test by checking Stripe Dashboard webhook logs for successful deliveries with 200 responses
- [ ] **Idempotency table:** Verify `stripe_events` table exists in Supabase with `event_id` unique constraint — check migration files
- [ ] **Signature verification:** Verify `STRIPE_WEBHOOK_SECRET` is set in Vercel Dashboard (not just `.env.local`) — test by triggering a real webhook in Stripe Dashboard after deployment
- [ ] **Payment state machine:** Verify `proposals` table has `payment_status` enum column (not just a boolean `paid`) — check that all 6 states are represented
- [ ] **ACH timing communication:** Verify the post-checkout page shows "4–7 business days" language, not "payment successful" — check the checkout success page copy
- [ ] **Wire threshold enforcement:** Verify that proposals above $25K are served wire transfer instructions, not a Stripe Checkout Session — test with a Gold ($48K) proposal
- [ ] **SOW gate:** Verify that Stripe Checkout Session creation is blocked if `proposal.sow_signed_at` is null — check the checkout API route logic
- [ ] **Node.js runtime:** Verify no Stripe route files have `export const runtime = 'edge'` — grep the codebase
- [ ] **Price source:** Verify the checkout API route looks up price from Supabase `proposals` table, not from request body — review the checkout route handler
- [ ] **ACP checkout:** Verify the ACP checkout route validates `proposal_id` against Supabase before creating a Stripe session — the current mock does not do this
- [ ] **Stripe client initialization:** Verify `new Stripe(...)` is called only once at module level in `lib/stripe/client.ts` — grep for `new Stripe(`
- [ ] **Subscription trial periods:** Verify no Stripe Price or Subscription creation code uses `trial_period_days` — search the codebase and Stripe Dashboard

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Raw body webhook failure (signatures never verify) | LOW | Fix the handler to use `request.text()`, redeploy, re-register webhook endpoint in Stripe Dashboard |
| Duplicate onboarding from missing idempotency | HIGH | Audit Supabase for duplicate proposal records; manually cancel duplicates; add `stripe_events` table; implement idempotency before next payment |
| ACH dispute on high-ticket amount | HIGH | Submit evidence to Stripe (signed SOW PDF, communication records, proof of service delivery) within the dispute response window (typically 7 days) |
| Forged webhook events processed without signature verification | CRITICAL | Immediately rotate the webhook signing secret in Stripe Dashboard; audit Supabase for any fraudulent `payment_status: confirmed` records; revert any onboarding triggered by forged events |
| Price manipulation via client-supplied amount | HIGH | Audit all recent checkout sessions in Stripe Dashboard for amount discrepancies; fix the checkout handler to use Supabase as price source; contact affected clients |
| Edge Runtime crash on Stripe route | LOW | Remove `export const runtime = 'edge'` from the affected route file; redeploy |
| Missing `STRIPE_WEBHOOK_SECRET` in production | MEDIUM | Add to Vercel Dashboard environment variables; re-register the webhook endpoint to get the correct signing secret; redeploy |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Raw body destroyed by `request.json()` | Phase 1 — Stripe Foundation | Stripe Dashboard shows 200 on all test webhook deliveries |
| Missing idempotency table | Phase 1 — Stripe Foundation | `stripe_events` table exists with unique constraint on `event_id` |
| Stripe client not module-level | Phase 1 — Stripe Foundation | Grep for `new Stripe(` — should only appear in `lib/stripe/client.ts` |
| Edge Runtime incompatibility | Phase 1 — Stripe Foundation | No `runtime = 'edge'` in any Stripe route file |
| `STRIPE_WEBHOOK_SECRET` missing from Vercel | Phase 1 — Stripe Foundation | Vercel Dashboard shows env var in all environments |
| Payment state machine missing ACH timing | Phase 2 — Payment State Machine | `proposals.payment_status` has all 6 states; no onboarding before `confirmed` |
| Price source from client request body | Phase 2 — Payment State Machine | Checkout route code review: price comes from Supabase, not body |
| Subscription trial period | Phase 3 — Subscription Billing | No `trial_period_days` in any subscription code or Stripe Dashboard prices |
| ACH chargeback window misunderstood | Phase 3 — Chargeback Protection | Wire threshold enforced for amounts above $25K; SOW signed before any debit |
| SOW gate not enforced before payment | Phase 3 — Chargeback Protection | Checkout endpoint checks `sow_signed_at` before creating Stripe session |
| ACP checkout CORS + rate limiting | Phase 4 — ACP Protocol Integration | Rate limiting middleware active on `/api/acp/checkout`; no wildcard CORS on human checkout |
| ACH UX timing mismatch | Phase 4 or 5 — Checkout UX | Post-checkout page shows 4–7 day processing language; no "success" shown immediately |
| Stripe Radar blocking high-ticket | Phase 3 — Chargeback Protection | Test a $48K checkout in test mode and verify it passes Radar without manual review flag |

---

## Sources

- Stripe Webhooks documentation (best practices): https://stripe.com/docs/webhooks/best-practices — HIGH confidence (stable, well-documented)
- Stripe ACH Direct Debit guide: https://stripe.com/docs/payments/ach-direct-debit — HIGH confidence on timing and dispute windows
- Stripe Subscriptions guide: https://stripe.com/docs/billing/subscriptions/overview — HIGH confidence
- Next.js 14 App Router Route Handlers: https://nextjs.org/docs/app/api-reference/file-conventions/route — HIGH confidence on raw body handling
- Vercel Serverless Function limits (10s default timeout): https://vercel.com/docs/functions/runtimes — HIGH confidence
- Stripe Radar for fraud prevention: https://stripe.com/docs/radar — MEDIUM confidence on specific threshold behavior
- ACH return codes (R07, R10, etc.): NACHA operating rules — HIGH confidence, these are standardized
- Stripe API versioning: https://stripe.com/docs/upgrades — HIGH confidence on pinning strategy
- ACP Protocol + Stripe bridge patterns: LOW confidence — novel combination, no prior art found; recommendations based on first-principles security analysis

---
*Pitfalls research for: Stripe Payment Integration — Next.js 14 App Router + Vercel + Supabase, high-ticket B2B*
*Researched: 2026-03-03*
