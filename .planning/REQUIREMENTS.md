# Requirements: Adam Silva Consulting — v2.0 Stripe Payment Integration

**Defined:** 2026-03-03
**Core Value:** Every prospect gets an instant, accurate, branded proposal — no sales calls required to qualify.

## v2.0 Requirements

Requirements for Stripe Payment Integration milestone. Each maps to roadmap phases.

### Stripe Foundation (STRIPE)

- [ ] **STRIPE-01**: System initializes a Stripe SDK singleton (`lib/stripe/client.ts`) with API version pinning and env var validation at import time
- [ ] **STRIPE-02**: System has Stripe Products and Prices created for all 6 package tiers — each tier has a one-time setup Price and a recurring monthly Price
- [ ] **STRIPE-03**: System stores Stripe Product/Price IDs in `lib/stripe/products.ts` as a typed map keyed by package slug (bronze, silver, gold, core, shopify-starter, shopify-growth)
- [ ] **STRIPE-04**: System has a cookie-free Supabase service-role client (`lib/supabase/service.ts`) for use in webhook handlers and background processes

### Payment Processing (PAY)

- [ ] **PAY-01**: Prospect can pay setup fees via ACH bank transfer for amounts $8.5K–$48K using Stripe PaymentIntents with `us_bank_account` payment method
- [ ] **PAY-02**: Prospect paying setup fees $25K+ is routed to wire transfer instructions instead of Stripe checkout — wire is non-reversible (AP2 mandate enforcement)
- [ ] **PAY-03**: Prospect can start a Stripe Subscription for their monthly retainer ($2K–$12K/mo) after setup fee is confirmed
- [ ] **PAY-04**: Card payments for any amount over $75 incur a 4% convenience fee surcharge — displayed clearly before checkout and itemized on the receipt
- [ ] **PAY-05**: System creates a Stripe Customer record linked to the Supabase proposal when prospect accepts a proposal, storing `stripe_customer_id` in Supabase
- [ ] **PAY-06**: System enforces payment method routing: ACH preferred for all amounts, wire required above $25K threshold, card accepted with 4% surcharge

### Webhook Infrastructure (HOOK)

- [ ] **HOOK-01**: System handles Stripe webhooks at `/api/stripe/webhook` using `request.text()` for raw body and `stripe.webhooks.constructEvent()` for signature verification
- [ ] **HOOK-02**: System logs every webhook event in a `stripe_events` Supabase table for idempotency — duplicate event IDs are silently skipped
- [ ] **HOOK-03**: Webhook handler updates Supabase order/subscription status on key events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] **HOOK-04**: Webhook route uses `runtime = 'nodejs'` (not Edge) and does not parse request body as JSON

### Payment State Machine (STATE)

- [ ] **STATE-01**: System tracks payment lifecycle in Supabase `orders` table with status enum: `pending`, `processing`, `confirmed`, `failed`, `refunded`, `wire_pending`
- [ ] **STATE-02**: System tracks subscription lifecycle in Supabase `subscriptions` table with status enum: `active`, `past_due`, `canceled`, `paused`
- [ ] **STATE-03**: Supabase `proposals` table gains `payment_status`, `stripe_customer_id`, and `stripe_payment_intent_id` columns — proposals are the canonical price source for checkout
- [ ] **STATE-04**: System never triggers client onboarding until payment status reaches `confirmed` (ACH takes 4–7 business days to settle)

### Chargeback Defense (DEFEND)

- [ ] **DEFEND-01**: Prospect must digitally sign a Statement of Work (SOW) before any payment session is created — SOW acceptance timestamp stored in Supabase
- [ ] **DEFEND-02**: Prospect must acknowledge "All Sales Final — No Refunds for Services Rendered" Terms of Service at checkout — ToS acceptance stored with payment record
- [ ] **DEFEND-03**: System enables Stripe Chargeback Protection on the Stripe account (dashboard configuration, documented in setup guide)
- [ ] **DEFEND-04**: System enables Stripe Radar enhanced fraud detection (dashboard configuration, documented in setup guide)

### Protocol Integration (PROTO)

- [ ] **PROTO-01**: `/api/acp/checkout` creates real Stripe Checkout Sessions (or PaymentIntents for ACH) when called — replacing the current stub mock response
- [ ] **PROTO-02**: ACP checkout endpoint validates agent bearer tokens before creating payment sessions — unauthenticated requests are rejected
- [ ] **PROTO-03**: `/.well-known/ucp` is updated to advertise real payment methods (ACH, wire, card+surcharge) and supported currencies
- [ ] **PROTO-04**: `/.well-known/ap2` returns wire transfer instructions (bank name, routing number, account number, reference format) for amounts above $25K threshold — enforcing AP2 mandate
- [ ] **PROTO-05**: ACP checkout endpoint includes rate limiting middleware to prevent abuse by AI agents

### Checkout UI (UI)

- [ ] **UI-01**: Package detail pages (`/packages/[tier]`) gain a "Start Payment" CTA that initiates the SOW → checkout flow
- [ ] **UI-02**: Checkout flow displays payment method options with clear pricing: ACH (standard price), card (+4% surcharge), or wire instructions (for $25K+)
- [ ] **UI-03**: Payment success page (`/payment/success`) confirms payment receipt and displays next steps
- [ ] **UI-04**: Payment canceled/failed page (`/payment/canceled`) offers retry options
- [ ] **UI-05**: Stripe Customer Portal link for subscription management (update payment method, view invoices)

## v2.1 Requirements

Deferred to next minor release.

### Advanced Wire Automation
- **WIRE-01**: Automated wire confirmation via banking API webhook (currently manual reconciliation)
- **WIRE-02**: Wire payment reminder emails for pending wire transfers

### Subscription Enhancements
- **SUB-01**: Subscription pause/resume capability from customer portal
- **SUB-02**: Annual billing discount option (pay 10 months, get 12)

### Reporting
- **RPT-01**: Revenue dashboard showing MRR, setup fee pipeline, payment method breakdown
- **RPT-02**: Chargeback/dispute tracking and alerting

## Out of Scope

| Feature | Reason |
|---------|--------|
| Shopping cart / multi-item checkout | ASC sells service packages, not individual items |
| Stripe Treasury for wire processing | Wire instructions are manual for v2.0; automate in v2.1+ |
| Crypto / Bitcoin payments | Not needed for B2B consulting services |
| Stripe Connect / marketplace | ASC is a single-vendor business |
| Multi-currency support | USD only for v2.0 |
| Free trials on subscriptions | All sales final policy — no trials |
| Refund automation | No refunds for services rendered — manual exception only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRIPE-01 | Phase 10 | Pending |
| STRIPE-02 | Phase 10 | Pending |
| STRIPE-03 | Phase 10 | Pending |
| STRIPE-04 | Phase 10 | Pending |
| HOOK-01 | Phase 10 | Pending |
| HOOK-02 | Phase 10 | Pending |
| HOOK-04 | Phase 10 | Pending |
| STATE-01 | Phase 11 | Pending |
| STATE-02 | Phase 11 | Pending |
| STATE-03 | Phase 11 | Pending |
| STATE-04 | Phase 11 | Pending |
| PAY-05 | Phase 11 | Pending |
| HOOK-03 | Phase 11 | Pending |
| PAY-01 | Phase 12 | Pending |
| PAY-02 | Phase 12 | Pending |
| PAY-03 | Phase 12 | Pending |
| PAY-04 | Phase 12 | Pending |
| PAY-06 | Phase 12 | Pending |
| DEFEND-01 | Phase 12 | Pending |
| DEFEND-02 | Phase 12 | Pending |
| DEFEND-03 | Phase 12 | Pending |
| DEFEND-04 | Phase 12 | Pending |
| UI-01 | Phase 12 | Pending |
| UI-02 | Phase 12 | Pending |
| UI-03 | Phase 12 | Pending |
| UI-04 | Phase 12 | Pending |
| UI-05 | Phase 12 | Pending |
| PROTO-01 | Phase 13 | Pending |
| PROTO-02 | Phase 13 | Pending |
| PROTO-03 | Phase 13 | Pending |
| PROTO-04 | Phase 13 | Pending |
| PROTO-05 | Phase 13 | Pending |

**Coverage:**
- v2.0 requirements: 32 total
- Mapped to phases: 32
- Unmapped: 0

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-03 — traceability updated after roadmap creation*
