# Architecture Research

**Domain:** Stripe payment integration — B2B high-ticket service platform
**Researched:** 2026-03-03
**Confidence:** HIGH (based on direct codebase inspection + Stripe Node.js SDK knowledge through Aug 2025)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Client Layer (Vercel Edge)                       │
├──────────────────┬──────────────────────────────────────────────────┤
│  Browser User    │  AI Agent (ACP/AP2)                              │
│  /packages/[t]  │  POST /api/acp/negotiate                         │
│  /checkout/*    │  POST /api/acp/checkout                           │
└────────┬─────────┴────────────────────┬────────────────────────────┘
         │                              │
┌────────▼──────────────────────────────▼────────────────────────────┐
│                    Next.js 14 App Router (Vercel)                    │
├─────────────────────────────────────────────────────────────────────┤
│  NEW API Routes:                                                      │
│  ┌──────────────────────┐  ┌──────────────────────────────────────┐ │
│  │ /api/stripe/checkout  │  │ /api/stripe/webhook                  │ │
│  │  - Creates Session   │  │  - Verifies stripe-signature header  │ │
│  │  - Subscription or   │  │  - Handles lifecycle events          │ │
│  │    Payment Intent    │  │  - Updates Supabase                  │ │
│  └──────────┬───────────┘  └──────────────────┬───────────────────┘ │
│             │                                  │                     │
│  MODIFIED API Routes:                          │                     │
│  ┌──────────────────────────────────────────┐  │                     │
│  │ /api/acp/checkout (stub → real)          │  │                     │
│  │  - Validates ACP request                 │  │                     │
│  │  - Calls /api/stripe/checkout internally │  │                     │
│  │  - Returns ACP-formatted response        │  │                     │
│  └──────────────────────────────────────────┘  │                     │
├─────────────────────────────────────────────────────────────────────┤
│  NEW lib/stripe/ modules:                                            │
│  ┌───────────────┐ ┌───────────────┐ ┌────────────────────────────┐ │
│  │ client.ts     │ │ products.ts   │ │ webhook-handlers.ts        │ │
│  │ Stripe SDK    │ │ Price catalog │ │ Event → Supabase updaters  │ │
│  │ singleton     │ │ mapping       │ │                            │ │
│  └───────────────┘ └───────────────┘ └────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  NEW app/checkout/ pages:                                            │
│  ┌────────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ /checkout/[id]     │  │ /checkout/   │  │ /checkout/          │ │
│  │  - Payment intent  │  │  success     │  │  cancel             │ │
│  │  - ACH/wire form   │  │              │  │                     │ │
│  └────────────────────┘  └──────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  MODIFIED static files:                                              │
│  /.well-known/ucp → add real payment_methods: ['ach', 'wire', 'card']│
│  /api/ucp route.ts → add stripe_customer_portal link                │
└──────────┬──────────────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────────────┐
│                         External Services                            │
├──────────────────┬──────────────────────┬───────────────────────────┤
│   Stripe API     │   Supabase           │   Resend (email)          │
│  - Products      │  - orders table      │  - Payment receipt        │
│  - Prices        │  - subscriptions t.  │  - SOW delivery           │
│  - Customers     │  - proposals table   │  - Internal alert         │
│  - Subscriptions │    (status updated)  │                           │
│  - Payment Intents│                     │                           │
│  - Webhooks      │                     │                           │
└──────────────────┴──────────────────────┴───────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Status |
|-----------|----------------|--------|
| `/api/stripe/checkout` | Creates Stripe Checkout Session or Payment Intent; handles both subscription (monthly) and one-time (setup fee) payment types | NEW |
| `/api/stripe/webhook` | Receives all Stripe lifecycle events; verifies signature; routes to handlers | NEW |
| `/api/stripe/portal` | Creates Stripe Customer Portal session for subscription management | NEW |
| `lib/stripe/client.ts` | Stripe SDK singleton initialized with `STRIPE_SECRET_KEY`; shared across all server-side code | NEW |
| `lib/stripe/products.ts` | Maps ASC package slugs to Stripe Price IDs; source of truth for Stripe catalog | NEW |
| `lib/stripe/webhook-handlers.ts` | Pure functions — one per event type — that update Supabase tables | NEW |
| `/api/acp/checkout` | ACP protocol endpoint; currently stub; modified to call `lib/stripe/` and return ACP-formatted checkout URL | MODIFIED |
| `/api/ucp` (route.ts) | UCP manifest; updated to advertise real `payment_methods` and `checkout_endpoint` | MODIFIED |
| `/.well-known/ucp` | Static UCP config file; updated with real Stripe payment method tokens | MODIFIED |
| `app/checkout/[id]/page.tsx` | Human-facing checkout page; renders Stripe Elements or redirects to Stripe-hosted checkout | NEW |
| `app/checkout/success/page.tsx` | Post-payment landing; reads Stripe session status from searchParams | NEW |
| `app/checkout/cancel/page.tsx` | Abandoned checkout landing; re-entry CTA | NEW |
| `supabase/migrations/015_orders.sql` | Orders table: one row per setup fee payment | NEW |
| `supabase/migrations/016_subscriptions.sql` | Subscriptions table: one row per recurring retainer | NEW |
| `supabase/migrations/017_stripe_events.sql` | Idempotency log for processed webhook events | NEW |

---

## Recommended Project Structure

```
app/
├── api/
│   ├── stripe/
│   │   ├── checkout/
│   │   │   └── route.ts          # POST: create Stripe session
│   │   ├── webhook/
│   │   │   └── route.ts          # POST: receive Stripe events
│   │   └── portal/
│   │       └── route.ts          # POST: create customer portal URL
│   ├── acp/
│   │   ├── checkout/
│   │   │   └── route.ts          # MODIFIED: now calls lib/stripe/
│   │   └── negotiate/
│   │       └── route.ts          # MODIFIED: adds real payment_methods
│   └── ucp/
│       └── route.ts              # MODIFIED: advertises real methods
├── checkout/
│   ├── [id]/
│   │   └── page.tsx              # Human payment page (server component)
│   ├── success/
│   │   └── page.tsx              # Confirmation page
│   └── cancel/
│       └── page.tsx              # Cancellation/retry page
lib/
├── stripe/
│   ├── client.ts                 # Stripe SDK singleton
│   ├── products.ts               # Package slug → Price ID mapping
│   ├── webhook-handlers.ts       # Event handlers (pure functions)
│   └── types.ts                  # Stripe-specific TypeScript types
supabase/
└── migrations/
    ├── 015_orders.sql            # Setup fee payment records
    ├── 016_subscriptions.sql     # Monthly retainer records
    └── 017_stripe_events.sql     # Webhook idempotency log
```

### Structure Rationale

- **`lib/stripe/` isolated:** Keeps all Stripe logic out of API route files; allows unit testing webhook handlers without mocking HTTP; mirrors existing pattern of `lib/supabase/`, `lib/pricing/`
- **`app/checkout/` route group:** Separate from `(marketing)` group because checkout pages need different layout (minimal, no nav distractions); not statically rendered
- **`/api/stripe/` prefix:** Namespaced separately from `/api/acp/` to maintain clean protocol separation; ACP endpoint calls Stripe internally but is not a Stripe endpoint
- **`017_stripe_events.sql`:** Webhook idempotency is critical — Stripe guarantees at-least-once delivery, meaning the same event can arrive twice; this table prevents double-processing

---

## Architectural Patterns

### Pattern 1: Stripe SDK Singleton

**What:** Initialize Stripe once in `lib/stripe/client.ts` and import it everywhere. Never call `new Stripe()` in route files.
**When to use:** All server-side Stripe calls — checkout creation, webhook verification, customer portal.
**Trade-offs:** Simple and prevents accidental multiple SDK instances with different API versions.

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia', // pin the API version — never use 'latest'
  typescript: true,
})
```

### Pattern 2: Raw Body Preservation for Webhook Verification

**What:** Stripe webhook signature verification requires the raw request body bytes, not a parsed JSON object. Next.js 14 App Router provides `request.text()` — use that, not `request.json()`.
**When to use:** `/api/stripe/webhook/route.ts` only.
**Trade-offs:** Must be done correctly or every webhook call fails with 400. Cannot use `export const config = { api: { bodyParser: false } }` — that is Pages Router syntax and does not exist in App Router.

```typescript
// app/api/stripe/webhook/route.ts
import { stripe } from '@/lib/stripe/client'

export async function POST(request: NextRequest) {
  const body = await request.text()   // raw string, not parsed JSON
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Route to handlers
  await handleStripeEvent(event)
  return NextResponse.json({ received: true })
}
```

### Pattern 3: Idempotent Webhook Handlers

**What:** Before processing any webhook event, check if it has already been processed. Stripe delivers events at least once — never exactly once.
**When to use:** Every webhook event type.
**Trade-offs:** Adds one Supabase round-trip per webhook but prevents double-billing, double-email, and race conditions.

```typescript
// lib/stripe/webhook-handlers.ts
import { createServiceClient } from '@/lib/supabase/service'

export async function handleStripeEvent(event: Stripe.Event) {
  const supabase = createServiceClient()

  // Idempotency check
  const { data: existing } = await supabase
    .from('stripe_events')
    .select('id')
    .eq('event_id', event.id)
    .single()

  if (existing) return // already processed

  // Log first, then process
  await supabase.from('stripe_events').insert({ event_id: event.id, event_type: event.type })

  switch (event.type) {
    case 'payment_intent.succeeded':
      await onPaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
      break
    case 'checkout.session.completed':
      await onCheckoutSessionCompleted(event.data.object as Stripe.CheckoutSession)
      break
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await onSubscriptionChanged(event.data.object as Stripe.Subscription)
      break
    case 'customer.subscription.deleted':
      await onSubscriptionCancelled(event.data.object as Stripe.Subscription)
      break
    case 'invoice.payment_failed':
      await onInvoicePaymentFailed(event.data.object as Stripe.Invoice)
      break
  }
}
```

### Pattern 4: Dual Payment Mode — Setup Fee vs. Monthly

**What:** ASC has two distinct payment types that map to different Stripe objects. Setup fees are large one-time payments (ACH/wire preferred); monthly retainers are recurring subscriptions (card or ACH).
**When to use:** `/api/stripe/checkout` decides which path based on `payment_type` field in request body.
**Trade-offs:** Two separate flows adds complexity but is necessary — conflating them into one Checkout Session causes Stripe to require card for the subscription (which is fine) but gives no wire option for setup fees.

```typescript
// Conceptual split in /api/stripe/checkout/route.ts:

if (paymentType === 'setup_fee') {
  // ACH or wire — use Payment Intent with manual capture option
  // Amount: $8,500 to $125,000+
  // Stripe ACH: stripe.paymentIntents.create({ payment_method_types: ['us_bank_account'] })
  // Wire: customer sends wire, we confirm via webhook or manual verification
} else if (paymentType === 'subscription') {
  // Recurring monthly — use Subscription with Price ID
  // Stripe Checkout Session with mode: 'subscription'
  // ACH allowed via customer.invoice_settings.default_payment_method
}
```

### Pattern 5: ACP Checkout Wrapper Pattern

**What:** The existing `/api/acp/checkout` endpoint is modified to be a thin wrapper that calls the internal Stripe checkout creation logic and then formats the response per ACP protocol spec.
**When to use:** Any AI agent that POSTs to `/api/acp/checkout`.
**Trade-offs:** ACP endpoint should not contain Stripe business logic — it delegates to `lib/stripe/` and translates the result. This keeps the ACP protocol layer clean and independently testable.

```typescript
// app/api/acp/checkout/route.ts (modified)
export async function POST(request: NextRequest) {
  // ... existing ACP validation (session_id, cart, buyer) ...

  // Call the internal Stripe checkout function
  const { checkoutUrl, sessionId } = await createStripeCheckoutSession({
    packageSlug: resolvedPackageSlug,
    paymentType: amountRequiresWire ? 'setup_fee' : 'subscription',
    metadata: { acp_session_id: body.session_id, agent_id: body.buyer.agent_id }
  })

  // Return ACP-formatted response with real Stripe URL
  return NextResponse.json({
    checkout_id: sessionId,
    session_id: body.session_id,
    status: 'redirect_required',
    confirmation_url: checkoutUrl,      // real Stripe Checkout URL
    webhook_url: 'https://www.adamsilvaconsulting.com/api/stripe/webhook',
    acp_version: '2026-01',
    ap2_mandate_verified: !!body.intent_mandate_id,
    next_step: 'complete_payment',
  }, { status: 201 })
}
```

### Pattern 6: Service Role Supabase Client for Webhooks

**What:** Webhook handlers run outside any user session — they must use the Supabase service role key, not the anon key, to bypass RLS.
**When to use:** All `lib/stripe/webhook-handlers.ts` functions.
**Trade-offs:** Service role bypasses RLS entirely. Only use server-side in trusted code paths; never expose to browser.

```typescript
// lib/supabase/service.ts  (NEW — does not use cookies())
import { createClient } from '@supabase/supabase-js'

export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

---

## Data Flow

### Human Checkout Flow (Setup Fee — ACH)

```
/packages/[tier] page
    ↓ "Get Started" CTA → /get-started intake
    ↓ Proposal generated → proposal.status = 'sent'
    ↓ Prospect accepts proposal → clicks "Pay Setup Fee"
    ↓
POST /api/stripe/checkout
    { packageSlug, paymentType: 'setup_fee', proposalId, email }
    ↓
lib/stripe/client.ts → stripe.paymentIntents.create()
    payment_method_types: ['us_bank_account']  (ACH)
    OR for >$50K: instructions for wire transfer
    ↓
Returns { clientSecret } or { wireInstructions }
    ↓
app/checkout/[id]/page.tsx renders:
    - Stripe Elements (ACH bank account flow)
    - OR wire transfer instructions page
    ↓
Payment submitted
    ↓
Stripe sends event → POST /api/stripe/webhook
    payment_intent.succeeded  (ACH)
    OR  payment_intent.processing (wire — async)
    ↓
lib/stripe/webhook-handlers.ts:
    - Insert into orders table
    - Update proposals.status = 'paid'
    - Send receipt email via Resend
    - Trigger SOW delivery
    ↓
Redirect: /checkout/success
```

### Human Checkout Flow (Monthly Subscription)

```
Proposal accepted → clicks "Start Subscription"
    ↓
POST /api/stripe/checkout
    { packageSlug, paymentType: 'subscription', proposalId, email }
    ↓
stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PRICE_IDS[packageSlug].monthly, quantity: 1 }],
    success_url, cancel_url
})
    ↓
Returns { url: stripeCheckoutUrl }
    ↓
Redirect → Stripe-hosted Checkout page (handles card + ACH)
    ↓
checkout.session.completed webhook
    ↓
lib/stripe/webhook-handlers.ts:
    - Insert into subscriptions table
    - Set subscriptions.status = 'active'
    - Send welcome email
    ↓
Redirect: /checkout/success?session_id={CHECKOUT_SESSION_ID}
```

### AI Agent ACP Checkout Flow

```
AI Agent → POST /api/acp/negotiate
    { service_id: 'gold', agent_id: 'agent_xyz' }
    ↓
Returns { negotiation_id, checkout_endpoint, payment_methods: ['stripe_spt', 'ach'] }
    ↓
AI Agent → POST /api/acp/checkout
    { session_id, cart, buyer: { agent_id, spt_token } }
    ↓
/api/acp/checkout validates ACP request
    ↓ calls
lib/stripe/createCheckoutSession()
    ↓
Returns ACP response with real { confirmation_url: 'https://checkout.stripe.com/...' }
    ↓
Agent redirects human or completes payment
    ↓
Stripe webhook → same flow as human checkout
```

### Webhook Event Routing

```
Stripe → POST /api/stripe/webhook
    ↓ stripe.webhooks.constructEvent() — signature verification
    ↓ Check stripe_events for event_id (idempotency)
    ↓
    ├── checkout.session.completed
    │       ↓ onCheckoutSessionCompleted()
    │       ↓ Insert order or activate subscription in Supabase
    │       ↓ Send receipt via Resend
    │
    ├── payment_intent.succeeded
    │       ↓ onPaymentIntentSucceeded()
    │       ↓ Mark order as paid, update proposal status
    │
    ├── payment_intent.processing
    │       ↓ onPaymentIntentProcessing()
    │       ↓ Mark order as 'pending_ach' (ACH takes 3-5 days)
    │       ↓ Send "payment processing" email
    │
    ├── customer.subscription.created
    ├── customer.subscription.updated
    │       ↓ onSubscriptionChanged()
    │       ↓ Upsert subscriptions table row
    │
    ├── customer.subscription.deleted
    │       ↓ onSubscriptionCancelled()
    │       ↓ Set subscription.status = 'cancelled'
    │       ↓ Send cancellation email + internal alert
    │
    └── invoice.payment_failed
            ↓ onInvoicePaymentFailed()
            ↓ Set subscription.status = 'past_due'
            ↓ Send dunning email
```

---

## New Supabase Tables

### orders (migration 015)

```sql
CREATE TABLE orders (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  proposal_id          UUID        REFERENCES proposals(id),
  stripe_payment_intent_id TEXT    UNIQUE,
  stripe_customer_id   TEXT,
  package_slug         TEXT        NOT NULL,
  amount_cents         INTEGER     NOT NULL,
  currency             TEXT        NOT NULL DEFAULT 'usd',
  payment_method_type  TEXT        NOT NULL  -- 'us_bank_account' | 'wire' | 'card'
    CHECK (payment_method_type IN ('us_bank_account', 'wire', 'card')),
  status               TEXT        NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'pending_ach', 'paid', 'failed', 'refunded')),
  paid_at              TIMESTAMPTZ,
  metadata             JSONB       NOT NULL DEFAULT '{}'
);
```

### subscriptions (migration 016)

```sql
CREATE TABLE subscriptions (
  id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  proposal_id             UUID        REFERENCES proposals(id),
  stripe_subscription_id  TEXT        UNIQUE NOT NULL,
  stripe_customer_id      TEXT        NOT NULL,
  package_slug            TEXT        NOT NULL,
  monthly_amount_cents    INTEGER     NOT NULL,
  status                  TEXT        NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'past_due', 'cancelled', 'paused', 'trialing')),
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  cancel_at_period_end    BOOLEAN     NOT NULL DEFAULT false,
  cancelled_at            TIMESTAMPTZ,
  metadata                JSONB       NOT NULL DEFAULT '{}'
);
```

### stripe_events (migration 017)

```sql
CREATE TABLE stripe_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id    TEXT        UNIQUE NOT NULL,  -- Stripe's event.id
  event_type  TEXT        NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  error       TEXT
);
```

---

## Integration Points

### New vs. Modified Components Summary

| Component | New or Modified | What Changes |
|-----------|-----------------|--------------|
| `app/api/stripe/checkout/route.ts` | NEW | Creates Stripe sessions/intents |
| `app/api/stripe/webhook/route.ts` | NEW | Handles all Stripe lifecycle events |
| `app/api/stripe/portal/route.ts` | NEW | Customer subscription portal |
| `lib/stripe/client.ts` | NEW | Stripe SDK singleton |
| `lib/stripe/products.ts` | NEW | Package slug → Stripe Price ID map |
| `lib/stripe/webhook-handlers.ts` | NEW | Event handler functions |
| `lib/stripe/types.ts` | NEW | TypeScript types for checkout requests |
| `lib/supabase/service.ts` | NEW | Service-role client (no cookies) |
| `app/checkout/[id]/page.tsx` | NEW | Human payment UI |
| `app/checkout/success/page.tsx` | NEW | Post-payment page |
| `app/checkout/cancel/page.tsx` | NEW | Abandoned checkout |
| `app/api/acp/checkout/route.ts` | MODIFIED | Calls lib/stripe instead of stub |
| `app/api/acp/negotiate/route.ts` | MODIFIED | Adds real payment methods |
| `app/api/ucp/route.ts` | MODIFIED | Advertises ACH/wire/card |
| `supabase/migrations/015_orders.sql` | NEW | Setup fee payment records |
| `supabase/migrations/016_subscriptions.sql` | NEW | Monthly retainer records |
| `supabase/migrations/017_stripe_events.sql` | NEW | Idempotency log |
| `.env.local` | MODIFIED | Add 4 Stripe env vars |

### External Service Integration

| Service | Integration Pattern | Key Notes |
|---------|---------------------|-----------|
| Stripe API | Server-side SDK calls from API routes | Never call Stripe from browser; use server actions or API routes only |
| Stripe Webhooks | POST to `/api/stripe/webhook`; verify `stripe-signature` header | Register endpoint in Stripe Dashboard; use `stripe listen` locally |
| Stripe Checkout | Hosted page for subscriptions; Stripe Elements for ACH setup fees | Hosted checkout simplest; Elements needed for ACH financial institution selector |
| Stripe Customer Portal | Create portal session server-side; redirect client | Lets clients manage subscriptions without building your own UI |
| Supabase | Service role client in webhook handlers | Never use anon key in webhook handlers — no user session context |
| Resend | Called from webhook handlers after payment confirmed | Add `RESEND_API_KEY` (already in env); send via `lib/email/` which already exists |

### New Environment Variables Required

```bash
# .env.local additions

STRIPE_SECRET_KEY=sk_live_...         # Stripe secret key (use sk_test_ in dev)
STRIPE_WEBHOOK_SECRET=whsec_...       # From Stripe Dashboard → Webhooks
STRIPE_PUBLISHABLE_KEY=pk_live_...    # For Stripe.js / Elements (client-side)

# Stripe Price IDs — created once in Stripe Dashboard, then hardcoded here
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
```

### Internal Boundary: Proposal → Payment

The existing `proposals` table already has `status` field with values: `draft | sent | viewed | accepted | declined | expired`. Payment integration adds `paid` as a downstream status — the proposal row is the anchor that connects to `orders` and `subscriptions` via `proposal_id` foreign key.

```
proposals.status flow:
  draft → sent → viewed → accepted → [payment initiated] → paid
                                   ↓
                             orders.proposal_id = proposals.id
                             subscriptions.proposal_id = proposals.id
```

**The `proposals` table SQL needs one constraint addition:** the `status` CHECK constraint must include `'paid'`.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-50 clients/yr | Current Vercel + Supabase + Stripe handles this trivially. No changes needed. |
| 50-500 clients/yr | Stripe webhook delivery is the only real bottleneck. Add webhook retry logging. Consider Supabase Edge Function as webhook receiver if Vercel cold starts cause timeouts. |
| 500+ clients/yr | Move to Stripe's recommended customer portal + billing portal; add webhook queuing via Supabase pg_net for async processing. |

### Scaling Priorities

1. **First bottleneck:** Webhook timeout. Vercel serverless functions have a 10s default timeout. Stripe expects a 200 response quickly, then you process asynchronously. If `onCheckoutSessionCompleted` makes multiple Supabase writes + email sends, it may exceed 10s. **Fix:** Respond 200 immediately, then do processing; or use `waitUntil()` if available in Edge Runtime.

2. **Second bottleneck:** Stripe rate limits. Stripe's API limit is 100 requests/second in test mode, 100/second in live mode per key. At ASC's expected volume (B2B, low transaction count), this is not a concern.

---

## Anti-Patterns

### Anti-Pattern 1: Using `request.json()` in the Webhook Handler

**What people do:** Parse the body as JSON before calling `stripe.webhooks.constructEvent()`.
**Why it's wrong:** `constructEvent()` needs the raw bytes to verify the HMAC signature. Once you parse to JSON and re-serialize, byte-perfect reproduction is not guaranteed. Every webhook will fail with a signature mismatch error.
**Do this instead:** `const body = await request.text()` — then pass `body` (string) directly to `constructEvent()`.

### Anti-Pattern 2: Creating Stripe Clients in Route Handlers

**What people do:** `const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)` at the top of each route file.
**Why it's wrong:** Creates a new SDK instance per request, which warms up the Node.js HTTP agent each time and pins the Stripe API version per-file (drift risk).
**Do this instead:** Import the singleton from `lib/stripe/client.ts` everywhere.

### Anti-Pattern 3: No Idempotency on Webhook Handlers

**What people do:** Process the event immediately without checking if it was already handled.
**Why it's wrong:** Stripe guarantees at-least-once delivery. Network retries mean `checkout.session.completed` can fire twice within seconds. Without the `stripe_events` idempotency table, this creates duplicate orders, duplicate receipt emails, and double-subscription activation.
**Do this instead:** The `stripe_events` table check-before-process pattern (Pattern 3 above).

### Anti-Pattern 4: Storing Stripe Secret Key Client-Side

**What people do:** Use `NEXT_PUBLIC_STRIPE_SECRET_KEY` so it's available in browser components.
**Why it's wrong:** `NEXT_PUBLIC_` prefixed env vars are bundled into client JS and visible to anyone. The Stripe secret key allows creating charges, issuing refunds, and accessing all customer data.
**Do this instead:** `STRIPE_SECRET_KEY` (no `NEXT_PUBLIC_` prefix) stays server-only. Only `STRIPE_PUBLISHABLE_KEY` (which is already public by design) gets the `NEXT_PUBLIC_` prefix.

### Anti-Pattern 5: Skipping the `proposals.status = 'paid'` Update

**What people do:** Mark the order as paid but leave the proposal at `accepted` status.
**Why it's wrong:** The proposal record is the source of truth for sales reporting. Downstream logic (SOW delivery, onboarding triggers, CRM sync) reads proposal status. A paid order with no status update creates reporting gaps.
**Do this instead:** Webhook handler `onCheckoutSessionCompleted()` updates both `orders.status = 'paid'` AND `proposals.status = 'paid'` in a single transaction (or two sequential writes if Supabase transactions are not used).

### Anti-Pattern 6: ACH for All Payment Amounts

**What people do:** Offer ACH as the only non-card option regardless of amount.
**Why it's wrong:** ACH has a $250K per-transaction cap in Stripe and, more importantly, has a 5-business-day settlement window plus 60-day dispute window. For setup fees above ~$50K, wire transfer is non-reversible and settles same-day or next-day.
**Do this instead:** Use amount thresholds:
  - Under $25K: ACH or card
  - $25K–$50K: ACH preferred (card discouraged due to chargeback risk on services)
  - Over $50K: Wire transfer required (AP2 mandate enforcement applies)

---

## Build Order (Dependency Graph)

The following order respects code dependencies. Each step is unblockable before its predecessors.

```
Step 1: Foundation
  - Add stripe package to package.json
  - Create lib/stripe/client.ts (Stripe singleton)
  - Create lib/stripe/types.ts (TypeScript contracts)
  - Add all STRIPE_* env vars to .env.local
  - Create lib/supabase/service.ts (service role client)

Step 2: Stripe Catalog Setup (manual + code)
  - Create Products + Prices in Stripe Dashboard for all 5 fixed packages
  - Create lib/stripe/products.ts mapping slugs → Price IDs
  - Verify Price IDs by calling stripe.prices.retrieve() in a test script

Step 3: Supabase Schema
  - Write 015_orders.sql
  - Write 016_subscriptions.sql
  - Write 017_stripe_events.sql
  - Add 'paid' to proposals.status CHECK constraint (ALTER TABLE)
  - Run migrations

Step 4: Webhook Infrastructure
  - Create app/api/stripe/webhook/route.ts (signature verification + routing)
  - Create lib/stripe/webhook-handlers.ts (all event handlers)
  - Register webhook endpoint in Stripe Dashboard
  - Test with stripe CLI: stripe listen --forward-to localhost:3000/api/stripe/webhook

Step 5: Checkout API
  - Create app/api/stripe/checkout/route.ts (session creation)
  - Implement setup_fee path (Payment Intent + ACH)
  - Implement subscription path (Checkout Session)
  - Wire up to lib/stripe/products.ts price IDs

Step 6: Checkout Pages
  - Create app/checkout/[id]/page.tsx (renders ACH form or wire instructions)
  - Create app/checkout/success/page.tsx
  - Create app/checkout/cancel/page.tsx

Step 7: ACP + UCP Updates
  - Modify app/api/acp/checkout/route.ts to call lib/stripe/
  - Modify app/api/acp/negotiate/route.ts to add real payment_methods
  - Modify app/api/ucp/route.ts to advertise payment capabilities
  - Update /.well-known/ucp static file

Step 8: Customer Portal
  - Create app/api/stripe/portal/route.ts
  - Add portal link to client dashboard or confirmation emails

Step 9: Integration Testing
  - Test ACH flow end-to-end with Stripe test bank accounts
  - Test subscription creation + cancellation
  - Test webhook idempotency (send same event twice, verify single row)
  - Test ACP agent checkout flow
```

---

## Sources

- Codebase inspection: `app/api/acp/checkout/route.ts`, `app/api/acp/negotiate/route.ts`, `app/api/ucp/route.ts` — confirmed stub status of ACP checkout
- Codebase inspection: `lib/pricing/types.ts`, `lib/data/packages.ts` — confirmed 6 package tiers with exact pricing
- Codebase inspection: `supabase/migrations/006_proposals.sql` — confirmed proposals table schema and status enum
- Codebase inspection: `package.json` — confirmed `stripe` SDK not yet installed; `zod` available for validation
- Codebase inspection: `lib/supabase/server.ts` — confirmed cookie-based client pattern; service client does NOT exist yet
- Stripe Node.js SDK docs (knowledge through Aug 2025): webhook signature verification requires raw body; `stripe.webhooks.constructEvent(body, sig, secret)`
- Stripe docs: ACH via `us_bank_account` payment method type; 3-5 day settlement; 60-day dispute window
- Stripe docs: Subscriptions via `checkout.session.create({ mode: 'subscription' })`
- Next.js 14 App Router: no `bodyParser: false` config export; use `request.text()` for raw body in route handlers

---

*Architecture research for: Stripe Payment Integration — ASC Commercial Platform*
*Researched: 2026-03-03*
