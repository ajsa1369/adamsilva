# Stack Research

**Domain:** Stripe Payment Integration — Next.js 14 App Router on Vercel
**Researched:** 2026-03-03
**Confidence:** HIGH (versions verified via npm registry; stripe workerd export confirmed via package inspection)

---

## What This Covers

New packages and patterns needed to add Stripe payment processing to the existing ASC platform. The existing stack (Next.js 14, Supabase, Tailwind v4, Zod, Vercel AI SDK) is validated and not re-researched here.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `stripe` | `^20.4.0` | Server-side Stripe API (Products, Prices, PaymentIntents, Subscriptions, Webhooks) | Only official Stripe server SDK for Node.js. v20 ships native Edge Runtime exports (workerd/bun/deno) so it runs in Vercel Edge functions without the `next.config.mjs` serverComponentsExternalPackages workaround. Zero dependencies. |
| `@stripe/stripe-js` | `^8.9.0` | Client-side Stripe.js loader — lazy-loads stripe.com/v3 from CDN, returns typed Stripe instance | Stripe requires Stripe.js loaded from stripe.com (not bundled) for PCI compliance. This package handles the async load, TypeScript types, and prevents double-loading. |
| `@stripe/react-stripe-js` | `^5.6.1` | React hooks and Elements components (PaymentElement, AddressElement) | Wraps Stripe.js with React context. Needed for the checkout UI that collects card/ACH details with Stripe Elements (fully PCI-compliant, Stripe-hosted input iframes). |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `zod` | `^4.3.6` (already installed) | Validate webhook payloads and API route inputs | Already in project. Use for every new `/api/stripe/*` route. No new install. |
| Stripe Dashboard — Radar | N/A (no SDK) | Rule-based fraud scoring, 3DS enforcement, chargeback protection | Configured in Stripe Dashboard, not in code. Enable "Stripe Chargeback Protection" add-on and set Radar rules for high-value ACH transactions. No npm package. |
| Stripe Dashboard — Financial Connections | N/A (no SDK) | Instant bank verification for ACH Direct Debit | Invoked via `stripe.financialConnections.sessions.create()` using the existing `stripe` package — not a separate install. Required to verify bank accounts before ACH debit. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Stripe CLI | Local webhook forwarding (`stripe listen --forward-to localhost:3000/api/stripe/webhook`) | Install globally: `npm install -g stripe` or use `npx stripe`. Creates a webhook signing secret for local dev that differs from production. |
| Stripe Dashboard test mode | Create test Products/Prices, simulate payments, replay webhook events | Use test API keys in `.env.local`. Test ACH with `pm_us_bank_account_*` test payment methods. |

---

## Installation

```bash
# Core — new packages only
npm install stripe @stripe/stripe-js @stripe/react-stripe-js

# No new dev dependencies needed
# Zod, TypeScript, and Vitest are already installed
```

**Verify no peer dependency conflicts:**
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js --dry-run
```

`@stripe/react-stripe-js@5.6.1` requires `@stripe/stripe-js >=8.0.0 <9.0.0` — satisfied by `^8.9.0`.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Stripe Subscriptions (Billing) | Manual recurring invoice logic | Never for ASC — Stripe Billing handles dunning, failed payment retries, proration, and subscription lifecycle automatically. Manual is weeks of work for features Stripe provides free. |
| ACH Direct Debit via `us_bank_account` | Wire transfer mandate | Use wire ($0 Stripe fee) only for setup fees above $25K where the wire surcharge trade-off makes sense. ACH is simpler (Stripe-managed), wire requires out-of-band bank transfer coordination. |
| Stripe PaymentElement | Individual card/bank Elements | PaymentElement is the current Stripe recommendation — single component handles cards, ACH, and future payment methods. Individual Elements (CardElement) are legacy. |
| Stripe-hosted webhook body via `request.text()` | `micro` package for raw body | Next.js 14 App Router provides `request.text()` natively. `micro` is unnecessary and incompatible with App Router (it was a pages-era workaround). |
| Stripe Radar + Chargeback Protection | Manual chargeback dispute handling | ASC deals with high-value B2B transactions. Stripe Radar + Chargeback Protection add-on shifts liability to Stripe for eligible disputes. Worth the fee for $8.5K–$75K+ transactions. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `micro` for body parsing | Pages-era workaround. App Router `request.text()` gives the raw string directly — no library needed. `micro` would conflict with the App Router request model. | `const rawBody = await request.text()` in the webhook route |
| `stripe@18` or earlier | API shape changed significantly in v19-v20. Types for `PaymentIntent`, `Subscription`, and `Checkout.Session` are different. v20 adds Edge Runtime exports. | `stripe@^20.4.0` |
| Bundling `stripe` in Edge middleware | `stripe` server SDK uses Node.js crypto internally for non-workerd environments. For Edge routes, import from `stripe/src/stripe.node.esm.js` or confirm route runs in Node.js runtime (not Edge). The webhook route MUST use Node.js runtime (raw body access, crypto). | Mark webhook route with `export const runtime = 'nodejs'` explicitly |
| Stripe.js self-hosted | PCI DSS requires Stripe.js loaded from stripe.com. Self-hosting breaks compliance. | `@stripe/stripe-js` (CDN-hosted loader) |
| Storing raw card data in Supabase | PCI violation. Stripe stores card data — ASC stores only the `stripe_customer_id`, `stripe_subscription_id`, and `payment_method_id` (token reference). | Store Stripe IDs only in Supabase `payments` table |
| Stripe Checkout hosted page for ACP agent flows | ACP agents cannot complete Stripe-hosted redirect checkout. Agent flows require PaymentIntents API directly (server-side payment confirmation). | `stripe.paymentIntents.create()` + `stripe.paymentIntents.confirm()` in `/api/acp/checkout` |

---

## Stack Patterns by Variant

**For setup fee payments (one-time, $8,500–$75,000+):**
- Create a `PaymentIntent` with `payment_method_types: ['us_bank_account']` (ACH) for amounts under ~$25K
- For amounts $25K+, enforce wire transfer via AP2 mandate: create a `PaymentIntent` with `payment_method_types: ['customer_balance']` and instructions in confirmation email
- Gate payment behind signed SOW — store SOW signature timestamp in Supabase before creating PaymentIntent
- Use `stripe.paymentIntents.create({ metadata: { package_slug, prospect_id, sow_signed_at } })`

**For monthly retainers ($2,000–$12,000/mo):**
- Create a `Subscription` with a `Price` object (recurring, `interval: 'month'`)
- Use `collection_method: 'charge_automatically'` with ACH as default payment method
- Set `trial_period_days: 0` (no trial — clients pay after SOW signed)
- Store `stripe_subscription_id` in Supabase `subscriptions` table

**For ACP agent-initiated checkout:**
- `/api/acp/checkout` already accepts `session_id`, `cart`, `buyer` — wire it to `stripe.paymentIntents.create()`
- Validate `buyer.spt_token` first, then create PaymentIntent with `amount` in cents, `currency: 'usd'`
- Return `client_secret` in response for agent confirmation (agents do not use browser redirect)

**For AP2 wire transfer mandate enforcement:**
- Wire transfers above $25K: respond from `/api/acp/checkout` with `payment_method: 'wire'`, include bank routing/account numbers from Stripe's `customer_balance` funding instructions
- Log mandate in Supabase `wire_mandates` table with amount, currency, payment reference
- Webhook confirms when Stripe receives the wire (event: `payment_intent.succeeded`)

**For webhook handling:**
- Route: `POST /api/stripe/webhook`
- Runtime: `export const runtime = 'nodejs'` (REQUIRED — Edge runtime cannot verify Stripe webhook signatures reliably with crypto)
- Body: `const rawBody = await request.text()` — do NOT call `request.json()`
- Verify: `stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)`
- Handle: `payment_intent.succeeded`, `payment_intent.payment_failed`, `customer.subscription.created`, `customer.subscription.deleted`, `invoice.payment_failed`
- Respond: always `{ status: 200 }` immediately, do work async (or Stripe retries)

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `stripe@^20.4.0` | Node.js >=16, Next.js 14 App Router | workerd export for Edge; use `runtime = 'nodejs'` for webhook route specifically |
| `@stripe/react-stripe-js@^5.6.1` | `@stripe/stripe-js >=8.0.0 <9.0.0`, React 16.8–19 | Requires `@stripe/stripe-js@^8.9.0` — do not install `@stripe/stripe-js@9.x` |
| `stripe@^20.4.0` | `zod@^4.3.6` | No conflict — stripe has zero runtime dependencies |
| `@stripe/stripe-js@^8.9.0` | `next@14.2.29` | Client-side only — import in `'use client'` components |

---

## New Environment Variables Required

```bash
# Stripe — add to .env.local and Vercel project settings
STRIPE_SECRET_KEY=sk_live_...           # Server-side only (never NEXT_PUBLIC_)
STRIPE_PUBLISHABLE_KEY=pk_live_...      # Safe for client (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
STRIPE_WEBHOOK_SECRET=whsec_...         # From Stripe Dashboard → Webhooks → signing secret

# Stripe Product/Price IDs (created in Stripe Dashboard or via API during setup)
STRIPE_PRICE_BRONZE_SETUP=price_...
STRIPE_PRICE_BRONZE_MONTHLY=price_...
STRIPE_PRICE_SILVER_SETUP=price_...
STRIPE_PRICE_SILVER_MONTHLY=price_...
STRIPE_PRICE_GOLD_SETUP=price_...
STRIPE_PRICE_GOLD_MONTHLY=price_...
STRIPE_PRICE_SHOPIFY_STARTER_SETUP=price_...
STRIPE_PRICE_SHOPIFY_STARTER_MONTHLY=price_...
STRIPE_PRICE_SHOPIFY_GROWTH_SETUP=price_...
STRIPE_PRICE_SHOPIFY_GROWTH_MONTHLY=price_...
# Core is custom-quoted — no fixed Price ID

# For development: use test keys (sk_test_..., pk_test_...)
# Stripe CLI generates a local webhook signing secret: stripe listen --print-secret
```

---

## New File Structure

```
app/
  api/
    stripe/
      webhook/
        route.ts          ← POST handler; export const runtime = 'nodejs'
      create-payment-intent/
        route.ts          ← POST; creates PaymentIntent for setup fees
      create-subscription/
        route.ts          ← POST; creates Stripe Subscription for retainers
      cancel-subscription/
        route.ts          ← POST; cancels subscription (all-sales-final gate)

lib/
  stripe/
    client.ts             ← Stripe server instance (singleton pattern)
    prices.ts             ← Maps package slugs to Stripe Price IDs from env vars
    webhooks.ts           ← Event handler map (payment_intent.succeeded → update Supabase)
    types.ts              ← StripePaymentRecord, StripeSubscriptionRecord
```

---

## Sources

- `npm show stripe version` → `20.4.0` (published 2026-02-25) — HIGH confidence
- `npm show stripe exports` → `workerd` export confirmed for Edge Runtime — HIGH confidence
- `npm show @stripe/stripe-js version` → `8.9.0` (published 2026-03-02) — HIGH confidence
- `npm show @stripe/react-stripe-js version` → `5.6.1` (published 2026-03-02) — HIGH confidence
- `npm show @stripe/react-stripe-js peerDependencies` → `@stripe/stripe-js >=8.0.0 <9.0.0` confirmed — HIGH confidence
- Stripe ACH (`us_bank_account`), wire via `customer_balance`, and Subscriptions API — MEDIUM confidence (training data, not re-verified against live docs due to WebSearch/WebFetch restriction in this session; these APIs have been stable since Stripe v14+)
- Next.js 14 App Router `request.text()` for raw body in webhook routes — HIGH confidence (standard App Router pattern, confirmed in project's existing API routes)

---

*Stack research for: Stripe Payment Integration — ASC Commercial Platform*
*Researched: 2026-03-03*
