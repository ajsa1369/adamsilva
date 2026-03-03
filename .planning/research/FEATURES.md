# Feature Research

**Domain:** High-ticket B2B service payments — Stripe integration for consulting/infrastructure firm
**Researched:** 2026-03-03
**Confidence:** MEDIUM (training data through Aug 2025; WebFetch/WebSearch unavailable — all Stripe claims should be verified against stripe.com/docs before implementation)

---

## Context: What Already Exists

This is a SUBSEQUENT MILESTONE. The following are already built and must not be re-built:

- `/packages` and `/packages/[tier]` — 6-tier comparison pages
- `/get-started` — agentic intake chatbot + proposal generation
- ROI calculator component
- `/api/acp/checkout` and `/api/acp/negotiate` — stub endpoints (real Checkout Sessions is the goal)
- `/.well-known/ucp`, `acp`, `ap2` — static protocol discovery files
- Supabase `proposals` table with tier, pricing, prospect info
- Supabase schema (7 tables, RLS in place)

New features ONLY target what Stripe integration adds.

---

## Feature Landscape

### Table Stakes (Users/Buyers Expect These)

Features that B2B buyers at the $8.5K–$125K+ price point assume exist. Missing these = deal-blocking.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Stripe Products + Prices for all 6 tiers | Every payment must anchor to a catalog object; Checkout Sessions require a Price ID | LOW | Create 12 Price objects: 1 one-time (setup) + 1 recurring (retainer) per tier. Shopify tiers get their own Price IDs. Core tier uses custom-amount flow (no fixed Price). |
| Stripe Checkout Session for card/ACH | Buyers expect a hosted, secure payment page — not a raw card form | LOW | Use `payment_method_types: ['card', 'us_bank_account']` on Session creation. Stripe handles PCI compliance. |
| ACH Direct Debit for setup fees | High-ticket B2B buyers expect bank transfer as a lower-cost option | MEDIUM | ACH via `us_bank_account` Payment Method. Requires microdeposit or instant bank verification (Plaid). Funds settle T+5 business days. |
| Stripe Subscriptions for monthly retainers | Recurring billing is the assumed mechanism for any monthly retainer | MEDIUM | Use `Subscription` with `billing_cycle_anchor` set to contract start date. Setup fee handled as a separate one-time charge or `add_invoice_item` before first invoice. |
| Webhook handler at `/api/stripe/webhook` | Payment lifecycle events (success, failure, dispute) must be captured server-side | MEDIUM | Handle: `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `charge.dispute.created`. Verify `stripe-signature` header on every request. |
| Email confirmation on payment | Buyer expects immediate email receipt after successful payment | LOW | Stripe sends automatic receipts if configured in Dashboard. Supplement with Resend for branded SOW-attached confirmation. |
| Signed SOW gate before payment | No payment should be collectible without a signed Statement of Work | HIGH | This is a legal + chargeback protection requirement. Gate the Checkout Session creation behind a SOW signature confirmation stored in Supabase. |
| All-sales-final ToS acknowledgement | Without this, chargebacks citing "not as described" are nearly unwinnable | MEDIUM | Require checkbox on payment page linking to ToS. Record timestamp + IP in Supabase `payment_authorizations` table. Pass `metadata.tos_accepted_at` to Stripe PaymentIntent. |
| Test mode / sandbox environment | Dev and QA require a non-production Stripe environment | LOW | Use Stripe test mode keys in `.env.local`. Separate webhook endpoints for test vs live. |

### Differentiators (Competitive Advantage)

Features that set ASC apart from typical consulting firms' payment flows.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| ACP Protocol real Checkout Sessions | AI agents (buyer-side or third-party) can initiate a real Stripe payment on behalf of a buyer — not a stub response | HIGH | `/api/acp/checkout` becomes a real Stripe Checkout Session creation endpoint. Must accept ACP-formatted payload, map to Stripe Price ID, return `session.url` in ACP response envelope. Must validate agent identity (bearer token or signed ACP credential) before creating session. |
| AP2 Wire Transfer Mandate for large amounts | For deals above a configurable threshold (e.g., $25K+), force wire transfer instead of card/ACH — eliminates chargeback risk entirely | HIGH | Stripe does NOT handle wire transfers natively. AP2 mandate = detect amount > threshold in `/api/acp/checkout`, return structured AP2 `payment_instruction` with wire details (bank name, routing, account, reference number) instead of Checkout Session URL. Store pending `wire_expected` record in Supabase. Separate webhook/webhook alternative needed for wire confirmation (manual reconciliation or bank webhook). |
| UCP discovery update for real payment methods | `/.well-known/ucp` advertises actual supported payment methods — AI agents read this to know what ASC accepts before initiating a transaction | LOW | Update static JSON to include `payment_methods: ["stripe_checkout", "ach_direct_debit", "wire_transfer"]` and payment endpoint URLs. This makes ASC machine-readable for agentic commerce tooling. |
| Stripe Radar + Chargeback Protection | Automated fraud signals + Stripe's chargeback liability coverage for eligible transactions | MEDIUM | Stripe Chargeback Protection is a paid add-on (currently ~0.4% per transaction). Eligible: card transactions processed through Stripe with Radar. ACH and wire are inherently lower-risk (ACH disputes exist but timeline is different). Enable Radar rules to block suspicious card activity. |
| Instant bank verification (Plaid) for ACH | Skip 1–3 day microdeposit wait for ACH setup — buyer verifies bank instantly | MEDIUM | Stripe's `us_bank_account` supports Financial Connections (Stripe's Plaid integration) for instant verification. Must be enabled per Stripe account. Requires `financial_connections: {permissions: ['payment_method']}` on PaymentIntent. Significantly improves ACH conversion for large setup fees. |
| SOW PDF attached to payment confirmation | Buyer receives their signed SOW as PDF attachment in payment confirmation email | MEDIUM | Integrate with existing proposal PDF generation. After `payment_intent.succeeded` webhook, fetch proposal from Supabase, generate PDF via existing PDFKit/React-PDF pipeline, email via Resend with PDF attachment. |
| Supabase payment state machine | Full payment lifecycle tracked in Supabase alongside proposal/lead records — not just Stripe Dashboard | MEDIUM | Add `payments` table to Supabase: `stripe_payment_intent_id`, `stripe_subscription_id`, `status` (pending/processing/succeeded/failed/disputed), `payment_method_type`, `amount`, `proposal_id`, `tos_accepted_at`, `sow_signed_at`. Webhook handler updates this table on every event. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem helpful but create risk, complexity, or legal exposure for high-ticket B2B.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Credit card as primary payment for large setup fees | Buyers may prefer card rewards points | Cards are fully reversible for 60–120 days. A $48K chargeback with "services not rendered" will be lost even with good documentation. Card networks favor buyers. | ACH as default for anything over $5K setup fee. Present card as secondary option with explicit disclosure that SOW signature is non-refundable. |
| Refund capability in admin UI | Seems like good customer service | Any refund mechanism invites abuse and signals to card networks that refunds are available, making chargebacks easier to win. Undercuts all-sales-final positioning. | No refund UI. If a refund is ever required, it is a manual, legal-review decision processed directly in Stripe Dashboard by account owner — not through the application. |
| PayPal as payment option | Some buyers have PayPal preferences | PayPal Buyer Protection overrides all-sales-final terms. Disputes heavily favor buyers. PayPal can freeze funds for months during disputes. | Stripe only. If a buyer insists on PayPal, treat as a disqualifying signal. |
| Stripe Payment Links (no-code) | Quick to set up | No programmatic control over metadata, no SOW gate, no ToS capture, no Supabase record creation. Creates compliance and chargeback defense gaps. | Always create Checkout Sessions programmatically via API so metadata, ToS timestamp, and proposal ID can be attached. |
| Save card for future charges without explicit consent | Convenient for repeat billing | Violates Stripe's card-on-file rules and potentially Regulation E. Creates fraud liability. | For subscriptions: Stripe handles the card-on-file relationship automatically within the Subscription object with proper mandate. Do not store card data outside of Stripe. |
| Immediate revenue recognition on ACH | ACH looks like it settled immediately in the UI | ACH has a 60-day dispute window (NACHA rules), during which the debit can be reversed even after funds appear. | Mark ACH setup fees as "funds available" only after T+5 settlement. Delay SOW countersignature delivery until bank confirms settlement. Track ACH status via `payment_intent.succeeded` (does not fire until ACH settles). |
| Wire transfer through Stripe | Seems simpler | Stripe does not natively process wires. You cannot create a Stripe PaymentIntent for a wire. | Wire transfers are handled bank-to-bank. ASC's AP2 mandate service returns wire instructions (routing number, account number, memo/reference). Confirmation is manual or via bank webhook. This is correct for AP2 — it is the point. |

---

## Feature Dependencies

```
[Stripe Products + Prices]
    └──required by──> [Checkout Session creation]
                          └──required by──> [ACP real Checkout Sessions]
                          └──required by──> [Subscription creation]

[SOW signature confirmation in Supabase]
    └──gates──> [Checkout Session creation]
    └──gates──> [ACP real Checkout Sessions]

[Webhook handler]
    └──required by──> [Supabase payment state machine]
    └──required by──> [SOW PDF email on payment success]
    └──required by──> [Subscription lifecycle management]

[AP2 mandate amount threshold logic]
    └──required by──> [Wire transfer instructions response]
    └──required by──> [ACP Checkout — large-deal path]
    └──depends on──> [Supabase wire_expected records]

[Stripe Chargeback Protection]
    └──enhances──> [ToS acknowledgement capture]
    └──enhances──> [SOW gate before payment]
    └──requires──> [Stripe Radar enabled]

[Financial Connections (instant bank verify)]
    └──enhances──> [ACH Direct Debit]
    └──requires──> [Stripe account setting enabled]
    └──NOT required for──> [Wire transfer path]

[UCP discovery update]
    └──depends on──> [Checkout Session endpoint live]
    └──depends on──> [Wire instruction endpoint live]
```

### Dependency Notes

- **Stripe Products + Prices required before everything:** No Checkout Session, Subscription, or ACP integration can be tested without Price IDs in Stripe. This must be the first implementation task.
- **SOW gate required before payment:** This is a chargeback defense requirement, not a nice-to-have. If Checkout Sessions can be created without SOW confirmation, the all-sales-final policy is unenforceable.
- **Webhook handler required before subscription management:** Subscription lifecycle (renewal, failure, cancellation) is entirely event-driven. Without the webhook handler, subscription state is invisible to the application.
- **AP2 mandate is a routing decision, not a Stripe feature:** For amounts above threshold, the system returns wire instructions INSTEAD of a Checkout Session URL. These are two different code paths in `/api/acp/checkout`.
- **Stripe Chargeback Protection is not a complete defense:** It covers Stripe's liability for certain card disputes. It does NOT prevent disputes from being filed. SOW signature + ToS acceptance + metadata on PaymentIntent are the primary defense layer.

---

## MVP Definition

### Launch With (v2.0)

Minimum needed to collect real money and honor the all-sales-final policy.

- [ ] Stripe Products + Prices for all 6 tiers (setup one-time + retainer recurring) — without this nothing works
- [ ] Checkout Session creation endpoint (`/api/stripe/create-session`) with SOW gate, ToS metadata, proposal ID — core payment flow
- [ ] ACH (`us_bank_account`) + card on Checkout Session — ACH for B2B preferred, card available
- [ ] Stripe Subscription creation for monthly retainers with setup fee as first invoice item — recurring billing
- [ ] Webhook handler at `/api/stripe/webhook` handling: `payment_intent.succeeded`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.deleted`, `charge.dispute.created` — lifecycle management
- [ ] Supabase `payments` table updated by webhook — application-level payment state
- [ ] ToS acknowledgement capture (timestamp + IP) stored in Supabase + passed as Stripe metadata — chargeback defense
- [ ] Stripe environment variable setup (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) — infrastructure

### Add After Validation (v2.1)

Features to add once the core payment flow is confirmed working end-to-end.

- [ ] ACP real Checkout Sessions — activate after base flow is stable; agents can then initiate real payments via `/api/acp/checkout`
- [ ] AP2 wire mandate routing — add threshold detection and wire instruction response to ACP checkout endpoint
- [ ] UCP discovery update — publish actual payment method capabilities after endpoints are live
- [ ] SOW PDF email on payment success — connect webhook handler to existing PDF pipeline
- [ ] Financial Connections (instant bank verification) for ACH — reduces friction for large setup fees

### Future Consideration (v2.2+)

- [ ] Stripe Chargeback Protection enrollment — evaluate cost vs. benefit once real transaction volume exists; at 0.4% per transaction, assess whether chargeback rate justifies fee
- [ ] Bank webhook for wire confirmation — automate wire reconciliation if wire volume is significant; otherwise manual reconciliation is acceptable
- [ ] Stripe Customer Portal for subscription management — allow clients to update payment method for recurring retainer; not critical until churn risk emerges
- [ ] Multi-currency support — if international clients emerge; default USD is correct for launch

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Stripe Products + Prices (6 tiers) | HIGH | LOW | P1 |
| Checkout Session creation with SOW gate | HIGH | MEDIUM | P1 |
| ACH direct debit on Checkout | HIGH | LOW (enabled on Session) | P1 |
| Stripe Subscriptions for retainers | HIGH | MEDIUM | P1 |
| Webhook handler | HIGH | MEDIUM | P1 |
| Supabase payments table + state updates | HIGH | MEDIUM | P1 |
| ToS capture (metadata + Supabase) | HIGH | LOW | P1 |
| ACP real Checkout Sessions | HIGH (protocol integrity) | HIGH | P2 |
| AP2 wire mandate routing | HIGH (large deals) | HIGH | P2 |
| UCP discovery update | MEDIUM | LOW | P2 |
| SOW PDF email on payment | MEDIUM | MEDIUM | P2 |
| Financial Connections instant ACH verify | MEDIUM | MEDIUM | P2 |
| Stripe Chargeback Protection | MEDIUM | LOW (enrollment only) | P3 |
| Wire confirmation webhook/reconciliation | MEDIUM | HIGH | P3 |
| Stripe Customer Portal | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch (v2.0) — without these, no real payments can be collected
- P2: Should have, add after core flow validates (v2.1)
- P3: Nice to have, future when volume justifies (v2.2+)

---

## Stripe-Specific Behavior: Key Facts for Implementation

### ACH Direct Debit via `us_bank_account`

- **Settlement time:** T+5 business days (funds not available immediately). `payment_intent.succeeded` fires after settlement, not after initiation.
- **Dispute window:** 60 days under NACHA rules. Unlike card chargebacks, ACH disputes ("returns") have specific reason codes (R01–R10). R10 (unauthorized) is the one to guard against — SOW signature is the defense.
- **Verification options:** Microdeposit (1–3 days, buyer verifies two small amounts) or Financial Connections (instant, requires Stripe account opt-in). Financial Connections preferred for B2B conversion.
- **No inherent "chargeback protection":** ACH is lower risk than cards but not risk-free. Wire is the truly non-reversible option.
- **Transaction limits:** Stripe ACH has no hard limit per transaction, but Stripe may apply account-level limits for new accounts. High-value ACH ($25K+) may trigger Stripe's risk review.

### Wire Transfers

- **Not a Stripe feature.** Stripe cannot initiate or track wires. ASC's `/api/acp/checkout` endpoint, when amount exceeds AP2 threshold, should return:
  ```json
  {
    "payment_method": "wire_transfer",
    "instructions": {
      "bank_name": "...",
      "routing_number": "...",
      "account_number": "...",
      "reference": "ASC-[proposal_id]",
      "amount": 48000,
      "currency": "USD",
      "payee": "Adam Silva Consulting LLC"
    }
  }
  ```
- **Non-reversible once settled.** Wires can theoretically be recalled within 24 hours (Fedwire) but are practically irreversible. This is why they are preferred for large setup fees.
- **Manual reconciliation:** Match incoming wire references against Supabase `wire_expected` records. Update status to `wire_received` on manual confirmation or bank notification.

### Stripe Subscriptions for Retainers

- **Setup fee pattern:** Use `add_invoice_item` before calling `subscriptions.create` to attach the one-time setup fee to the first invoice. Alternatively, use `subscription_data.add_invoice_items` in Checkout Session.
- **Billing anchor:** Set `billing_cycle_anchor` to the contract start date so billing aligns with service delivery, not signup date.
- **Failed payment handling:** Stripe retries failed subscription invoices on a configurable schedule (Smart Retries or custom). After max retries, subscription moves to `past_due` then `canceled`. Webhook `invoice.payment_failed` triggers application logic to notify account manager.
- **Cancellation:** Subscriptions should only be cancellable by the account owner (not through the application), except for `cancel_at_period_end: true` which stops renewal without immediate cancellation.

### Stripe Chargeback Protection

- **What it covers:** Stripe reimburses the merchant for the disputed amount + dispute fee for eligible transactions. Eliminates financial loss on covered disputes.
- **Eligibility requirements (MEDIUM confidence — verify):** Card transactions processed through Stripe with Radar enabled. Does NOT cover ACH disputes. Does NOT cover wire transfers. May not cover transactions flagged by Radar.
- **Cost (MEDIUM confidence — verify):** Approximately 0.4% per transaction on top of standard processing fees. Must be enrolled per Stripe account — not automatic.
- **Not a substitute for documentation:** Even with protection, dispute volume can trigger Stripe account review. High dispute rates can result in account termination regardless of Chargeback Protection enrollment.

### ACP Protocol Integration

- **What changes:** `/api/acp/checkout` stub becomes a real Stripe Checkout Session creator. ACP request payload maps to: Price ID (from tier), Customer object (from prospect email), metadata (proposal_id, tos_accepted_at, sow_signed_at).
- **Agent authentication:** AI agents calling ACP endpoints must present a valid bearer token. Validate against Supabase `api_keys` or a shared secret before creating any Checkout Session — unauthenticated ACP calls must be rejected.
- **Response format:** ACP response should wrap Stripe's `session.url` in the ACP envelope format. For AP2 wire path, return wire instructions instead.
- **Idempotency:** Use Stripe idempotency keys (`Idempotency-Key` header) keyed on proposal ID to prevent duplicate charges if ACP agent retries.

### All-Sales-Final Enforcement — Chargeback Defense Stack

Winning a card chargeback ("not as described" or "services not rendered") requires documentation. Build this stack:

1. **ToS at payment time** — checkbox with timestamp + IP stored in Supabase, passed as `metadata.tos_accepted_at` to Stripe PaymentIntent
2. **SOW signature before Checkout** — Supabase record of signed SOW (`sow_signed_at`, `sow_version`) gating session creation
3. **Stripe metadata** — attach `proposal_id`, `tier`, `sow_signed_at`, `tos_accepted_at` to every PaymentIntent and Subscription
4. **Email trail** — send branded confirmation with SOW PDF attached immediately after `payment_intent.succeeded`
5. **Stripe Radar** — Fraud signals present = chargeback defense evidence that Stripe's systems flagged nothing suspicious
6. **Stripe Chargeback Protection** — Financial backstop for eligible transactions (enrollment required)

With all six layers, a "services not rendered" chargeback is defensible. Without SOW signature and ToS capture, it is very difficult to win regardless of what was actually delivered.

---

## Competitor Feature Analysis

| Feature | Typical Agency/Consultancy | High-Ticket SaaS | ASC Approach |
|---------|---------------------------|------------------|--------------|
| Setup fee collection | Invoice via Stripe, PayPal, or bank transfer (manual) | Checkout Session with card | Stripe Checkout with ACH preferred; wire for AP2-threshold amounts |
| Monthly retainer billing | Manual invoice every month or Stripe Subscription | Stripe Subscription (standard) | Stripe Subscription with billing anchor aligned to contract |
| Chargeback defense | Minimal — generic ToS, no metadata | Contract PDF in file | ToS capture + SOW gate + Stripe metadata + Chargeback Protection |
| AI agent payment initiation | None | None | ACP protocol integration — Stripe Checkout Sessions initiatable by AI agents |
| Wire enforcement | Optional, ad hoc | Not offered | AP2 mandate — forced for amounts above threshold, returned as structured AP2 response |
| Payment discovery | None — buyers ask sales | None | `/.well-known/ucp` advertises accepted payment methods to AI agents |

---

## Dependency on Existing Platform

| New Feature | Depends On (Already Built) |
|-------------|---------------------------|
| Checkout Session creation | Supabase `proposals` table (for proposal_id + tier + pricing) |
| SOW gate | Supabase proposal status field (needs `sow_signed_at` column added) |
| Webhook → Supabase update | Existing Supabase client in `lib/supabase/` |
| ACP Checkout Sessions | `/api/acp/checkout` route (currently stub — to be upgraded) |
| AP2 wire mandate | `/api/acp/checkout` route (same endpoint, amount-based routing) |
| UCP discovery | `/.well-known/ucp` static file (update JSON content) |
| SOW PDF email | Existing PDFKit/React-PDF pipeline + Resend `RESEND_API_KEY` |

---

## Sources

- Stripe documentation (training data through Aug 2025): ACH Direct Debit, Stripe Subscriptions, Stripe Radar, Stripe Chargeback Protection, Stripe Checkout Sessions, Financial Connections
- NACHA rules for ACH dispute windows (60-day return period for R10 unauthorized returns)
- Stripe Chargeback Protection product page (pricing and eligibility — verify current terms at stripe.com/docs/radar/chargeback-protection before enrollment)
- ACP/AP2 protocol endpoints from existing codebase (`/api/acp/checkout`, `/api/acp/negotiate`)
- PROJECT.md milestone v2.0 requirements

**Confidence note:** WebFetch and WebSearch were unavailable during this research session. All Stripe-specific claims (fee percentages, settlement timelines, Chargeback Protection eligibility) should be verified against https://stripe.com/docs before implementation. The feature categorization, dependency mapping, and implementation patterns are HIGH confidence based on Stripe's stable API surface. Specific Stripe pricing (0.4% Chargeback Protection) is MEDIUM confidence.

---

*Feature research for: Stripe Payment Integration — Adam Silva Consulting*
*Researched: 2026-03-03*
