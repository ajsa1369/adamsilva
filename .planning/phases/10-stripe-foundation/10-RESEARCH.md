# Phase 10: Stripe Foundation - Research

**Researched:** 2026-03-03
**Domain:** Stripe SDK integration, webhook infrastructure, Supabase service client, env var validation
**Confidence:** HIGH

## Summary

Phase 10 establishes all Stripe infrastructure that downstream phases (11-13) depend on. The scope is deliberately narrow: SDK singleton with API version pinning, env var validation at import time, a cookie-free Supabase service-role client for webhook handlers, Stripe Products/Prices created in Dashboard with a typed TypeScript map, and a webhook endpoint with signature verification and idempotency table. No checkout flows, no payment processing, no UI -- those come in Phases 11-13.

The technical patterns are well-documented and stable. The Stripe Node.js SDK (`stripe@20.4.0`) pins to API version `2026-02-25.clover`. The webhook signature verification pattern using `request.text()` in Next.js 14 App Router is the standard approach. The Supabase service-role client uses `@supabase/supabase-js` (not `@supabase/ssr`) with `persistSession: false`. The `stripe_events` idempotency table is a standard Stripe best practice to handle at-least-once webhook delivery.

**Primary recommendation:** Install `stripe@20.4.0`, pin `apiVersion: '2026-02-25.clover'`, validate all 3 Stripe env vars at import time in `lib/stripe/client.ts`, create the service Supabase client as a separate file using `@supabase/supabase-js` directly, create Products/Prices in Stripe Dashboard (not via API), and build the webhook endpoint with `request.text()` + `constructEvent()` + idempotency check against `stripe_events` Supabase table.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| STRIPE-01 | Stripe SDK singleton with API version pinning and env var validation at import time | Stripe SDK v20.4.0 pins `2026-02-25.clover`; singleton pattern with module-level initialization; Zod validation for env vars; `runtime = 'nodejs'` required for all routes importing stripe |
| STRIPE-02 | Stripe Products and Prices for all 6 package tiers (one-time setup + recurring monthly per tier) | Create in Dashboard (not API) for 5 fixed-price tiers; Core tier is custom-quoted (no fixed Price); total: 10 Prices across 5 Products; store IDs in env vars |
| STRIPE-03 | Typed map in `lib/stripe/products.ts` keyed by package slug | Maps `PackagePageData['slug']` to `{ productId, setupPriceId, monthlyPriceId }` with null for Core tier; reads from env vars; type-safe with discriminated union for custom vs fixed |
| STRIPE-04 | Cookie-free Supabase service-role client for webhooks/background processes | Use `@supabase/supabase-js` `createClient()` (not `@supabase/ssr`); `auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }`; `SUPABASE_SERVICE_ROLE_KEY` already in `.env.local` |
| HOOK-01 | Webhook at `/api/stripe/webhook` using `request.text()` and `constructEvent()` | `const rawBody = await request.text()`; never `request.json()`; `stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)` for signature verification; return 400 on invalid signature |
| HOOK-02 | `stripe_events` Supabase table for idempotency; duplicate IDs silently skipped | Migration 015; `event_id TEXT PRIMARY KEY`; `INSERT ... ON CONFLICT (event_id) DO NOTHING`; check affected rows to determine if event is new or duplicate |
| HOOK-04 | Webhook route uses `runtime = 'nodejs'` and never parses body as JSON | `export const runtime = 'nodejs'` at top of route file; raw body via `request.text()`; Stripe SDK uses `crypto` which requires Node.js runtime |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `stripe` | `20.4.0` | Server-side Stripe API calls | Latest stable; pins API version `2026-02-25.clover`; zero runtime dependencies; native TypeScript types |
| `@supabase/supabase-js` | `2.49.1` (already installed) | Service-role client for webhook handlers | Already in project; used directly (not through `@supabase/ssr`) for cookie-free server-side access |
| `zod` | `4.3.6` (already installed) | Env var validation schemas | Already in project; used for runtime validation of Stripe config at import time |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Stripe CLI | Latest | Local webhook forwarding during development | `stripe listen --forward-to localhost:3000/api/stripe/webhook`; generates local webhook signing secret |

### Not Needed (Phase 10)
| Library | Why Not |
|---------|---------|
| `@stripe/stripe-js` | Client-side only; needed in Phase 12 for checkout UI, not Phase 10 |
| `@stripe/react-stripe-js` | React components for Stripe Elements; needed in Phase 12, not Phase 10 |

**Installation:**
```bash
npm install --save-exact stripe@20.4.0
```

Use `--save-exact` per Stripe's recommendation to prevent unintended API version drift from minor updates.

## Architecture Patterns

### Recommended Project Structure
```
lib/
  stripe/
    client.ts          # SDK singleton + env var validation (STRIPE-01)
    products.ts        # Typed Product/Price ID map (STRIPE-02, STRIPE-03)
    types.ts           # Shared Stripe-related TypeScript types
  supabase/
    client.ts          # Existing browser client (unchanged)
    server.ts          # Existing SSR client with cookies (unchanged)
    service.ts         # NEW: cookie-free service-role client (STRIPE-04)
app/
  api/
    stripe/
      webhook/
        route.ts       # Webhook endpoint (HOOK-01, HOOK-02, HOOK-04)
supabase/
  migrations/
    015_stripe_events.sql  # Idempotency table (HOOK-02)
```

### Pattern 1: Stripe SDK Singleton with Env Validation
**What:** Module-level Stripe instantiation that validates env vars at import time and fails loudly if any are missing.
**When to use:** Every server-side file that needs Stripe access imports from `lib/stripe/client.ts`.
**Example:**
```typescript
// lib/stripe/client.ts
// Source: stripe-node README + Stripe docs best practices
import Stripe from 'stripe'

// Validate at import time — fail loudly, not silently
function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Add it to .env.local and Vercel Dashboard.`
    )
  }
  return value
}

export const stripe = new Stripe(getRequiredEnv('STRIPE_SECRET_KEY'), {
  apiVersion: '2026-02-25.clover',
  maxNetworkRetries: 2,
  timeout: 30000,
  telemetry: true,
})

// Also export the webhook secret getter (validated separately since
// it is only needed in the webhook route, not all Stripe operations)
export function getWebhookSecret(): string {
  return getRequiredEnv('STRIPE_WEBHOOK_SECRET')
}
```

### Pattern 2: Cookie-Free Supabase Service Client
**What:** A Supabase client using the service-role key that bypasses RLS and does not depend on cookies or user sessions.
**When to use:** Webhook handlers, background jobs, and any server context without a user session.
**Example:**
```typescript
// lib/supabase/service.ts
// Source: Supabase docs — service role client pattern
import { createClient } from '@supabase/supabase-js'

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const supabaseService = createClient(
  getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
  getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
)
```

### Pattern 3: Webhook Raw Body + Signature Verification
**What:** Next.js 14 App Router webhook route that reads raw body as text and verifies the Stripe signature before processing.
**When to use:** The single `/api/stripe/webhook` route.
**Example:**
```typescript
// app/api/stripe/webhook/route.ts
// Source: Stripe docs + Next.js App Router pattern
import { NextRequest, NextResponse } from 'next/server'
import { stripe, getWebhookSecret } from '@/lib/stripe/client'
import { supabaseService } from '@/lib/supabase/service'

// CRITICAL: Must be Node.js runtime (not Edge) — Stripe SDK uses crypto
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  // 1. Read raw body as text — NEVER request.json()
  const rawBody = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  // 2. Verify signature
  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, getWebhookSecret())
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    )
  }

  // 3. Idempotency check — skip duplicate events
  const { data: existing, error: lookupError } = await supabaseService
    .from('stripe_events')
    .select('event_id')
    .eq('event_id', event.id)
    .maybeSingle()

  if (lookupError) {
    console.error('Idempotency lookup failed:', lookupError)
    // Return 500 so Stripe retries
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }

  if (existing) {
    // Duplicate — skip silently with 200
    return NextResponse.json({ received: true, duplicate: true })
  }

  // 4. Log event for idempotency (before processing)
  const { error: insertError } = await supabaseService
    .from('stripe_events')
    .insert({
      event_id: event.id,
      event_type: event.type,
      payload: event,
    })

  if (insertError) {
    console.error('Failed to log event:', insertError)
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }

  // 5. Route to handlers (skeleton — Phase 11 fills these in)
  switch (event.type) {
    // Phase 11 will add: payment_intent.succeeded, etc.
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  // 6. Return 200 quickly
  return NextResponse.json({ received: true })
}
```

### Pattern 4: Typed Product/Price Map
**What:** A strongly-typed map from ASC package slugs to Stripe Product and Price IDs.
**When to use:** Checkout routes (Phase 12), ACP endpoint (Phase 13) — but defined here for catalog completeness.
**Example:**
```typescript
// lib/stripe/products.ts
import type { PackagePageData } from '@/lib/data/packages'

type PackageSlug = PackagePageData['slug']

interface StripeProductPricing {
  productId: string
  setupPriceId: string      // one-time Price for setup fee
  monthlyPriceId: string    // recurring Price for monthly retainer
}

// Core tier is custom-quoted — no fixed Stripe Price
type StripePriceMap = {
  [K in Exclude<PackageSlug, 'core'>]: StripeProductPricing
} & {
  core: null  // Custom-quoted; no pre-created Price
}

function getEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export const STRIPE_PRODUCTS: StripePriceMap = {
  bronze: {
    productId: getEnv('STRIPE_PRODUCT_BRONZE'),
    setupPriceId: getEnv('STRIPE_PRICE_BRONZE_SETUP'),
    monthlyPriceId: getEnv('STRIPE_PRICE_BRONZE_MONTHLY'),
  },
  silver: {
    productId: getEnv('STRIPE_PRODUCT_SILVER'),
    setupPriceId: getEnv('STRIPE_PRICE_SILVER_SETUP'),
    monthlyPriceId: getEnv('STRIPE_PRICE_SILVER_MONTHLY'),
  },
  gold: {
    productId: getEnv('STRIPE_PRODUCT_GOLD'),
    setupPriceId: getEnv('STRIPE_PRICE_GOLD_SETUP'),
    monthlyPriceId: getEnv('STRIPE_PRICE_GOLD_MONTHLY'),
  },
  'shopify-starter': {
    productId: getEnv('STRIPE_PRODUCT_SHOPIFY_STARTER'),
    setupPriceId: getEnv('STRIPE_PRICE_SHOPIFY_STARTER_SETUP'),
    monthlyPriceId: getEnv('STRIPE_PRICE_SHOPIFY_STARTER_MONTHLY'),
  },
  'shopify-growth': {
    productId: getEnv('STRIPE_PRODUCT_SHOPIFY_GROWTH'),
    setupPriceId: getEnv('STRIPE_PRICE_SHOPIFY_GROWTH_SETUP'),
    monthlyPriceId: getEnv('STRIPE_PRICE_SHOPIFY_GROWTH_MONTHLY'),
  },
  core: null,
}

// Helper: get pricing for a slug, returns null for custom-quoted tiers
export function getStripePricing(slug: PackageSlug): StripeProductPricing | null {
  return STRIPE_PRODUCTS[slug]
}
```

### Anti-Patterns to Avoid
- **Importing `stripe` directly in route files:** Always import from `lib/stripe/client.ts`. Never `new Stripe()` in a route.
- **Using `request.json()` in webhook route:** Destroys the raw body; signature verification fails silently.
- **Using `@supabase/ssr` for service client:** SSR client requires cookies; webhook handlers have no user session.
- **Storing Price IDs as hardcoded strings:** They change between test/live mode and if recreated. Use env vars.
- **Using `export const runtime = 'edge'` with Stripe:** SDK requires Node.js `crypto` module.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Webhook signature verification | Custom HMAC comparison | `stripe.webhooks.constructEvent()` | Handles timing-safe comparison, multi-signature headers, and version-specific payload formatting |
| Idempotency for webhooks | In-memory Set or cache | Supabase `stripe_events` table with `ON CONFLICT DO NOTHING` | Survives server restarts, works across multiple Vercel function instances, provides audit trail |
| Test webhook payloads | Manually crafted JSON | `stripe.webhooks.generateTestHeaderString()` | Generates correctly signed test headers that pass `constructEvent()` verification |
| Env var validation | Manual `if (!process.env.X)` | Zod schema or centralized `getRequiredEnv()` helper | Consistent error messages, validates at import time, catches missing vars in CI before deploy |

**Key insight:** Stripe's SDK already solves every infrastructure problem in Phase 10. The only custom code is the glue between Stripe SDK calls and Supabase persistence.

## Common Pitfalls

### Pitfall 1: Webhook Body Parsed as JSON
**What goes wrong:** Using `await request.json()` instead of `await request.text()` in the webhook route. The signature verification silently fails with a 400 error because `constructEvent()` compares the signature against the raw string body, not a re-serialized JSON object.
**Why it happens:** Every other API route in the project uses `request.json()`. Copy-paste reflex.
**How to avoid:** The webhook route must use `request.text()` and ONLY `request.text()`. Add a code comment: `// CRITICAL: raw body required for signature verification — never request.json()`.
**Warning signs:** 400 errors from `constructEvent()` with message "No signatures found matching the expected signature for payload."

### Pitfall 2: Missing Idempotency Check
**What goes wrong:** Stripe guarantees at-least-once delivery. Without checking the `stripe_events` table before processing, a network timeout mid-processing + Stripe retry = double-processing the same event (e.g., creating two order records for one payment).
**Why it happens:** Developer assumes Stripe sends each event exactly once.
**How to avoid:** Insert into `stripe_events` BEFORE processing. Use `ON CONFLICT (event_id) DO NOTHING` and check affected rows.
**Warning signs:** Duplicate rows in orders/subscriptions tables with the same Stripe IDs.

### Pitfall 3: Webhook Secret Mismatch (Local vs Production)
**What goes wrong:** The Stripe CLI generates a local webhook signing secret (`whsec_...`) that is different from the Dashboard-configured endpoint secret. Using the wrong one causes all signature verifications to fail.
**Why it happens:** Developer copies the local CLI secret to Vercel env vars (or vice versa).
**How to avoid:** Document clearly: `STRIPE_WEBHOOK_SECRET` in `.env.local` comes from `stripe listen` output; the Vercel Dashboard value comes from Stripe Dashboard > Webhooks > Endpoint > Signing Secret.
**Warning signs:** Webhooks work locally but fail in production (or vice versa).

### Pitfall 4: Edge Runtime with Stripe SDK
**What goes wrong:** Adding `export const runtime = 'edge'` (or omitting `runtime` on Vercel which may default to Edge for some routes) causes the Stripe SDK to fail because it requires Node.js `crypto`, `http`, and `buffer` modules.
**Why it happens:** Vercel documentation encourages Edge Runtime for performance. Developer adds it without testing.
**How to avoid:** Explicitly set `export const runtime = 'nodejs'` in the webhook route file. Add a comment explaining why.
**Warning signs:** Runtime errors like "Module not found: Can't resolve 'crypto'" or "TypeError: globalThis.crypto.subtle is not a function."

### Pitfall 5: Products/Prices Created via API Without Dashboard Visibility
**What goes wrong:** Creating Products/Prices programmatically via API means they exist in Stripe but are not easily visible or manageable in the Dashboard without searching. For a small catalog (5 products), Dashboard creation is simpler and more transparent.
**Why it happens:** Developer defaults to "automate everything."
**How to avoid:** For 5 fixed-price tiers, create Products and Prices in the Stripe Dashboard manually. Copy the IDs to env vars. Document the step-by-step process.
**Warning signs:** Orphaned test-mode Products from failed API creation scripts.

### Pitfall 6: Lazy-Loading Products Map at Request Time
**What goes wrong:** If `lib/stripe/products.ts` reads env vars lazily (inside a function called per-request), missing env vars are discovered at runtime during a checkout request instead of at deploy time.
**Why it happens:** Developer wraps env reads in a function for "flexibility."
**How to avoid:** Read env vars at module level (top-level `getEnv()` calls). The module will throw at import time during the first request that touches any Stripe functionality, which surfaces the error immediately.
**Warning signs:** Intermittent errors in production that only appear when a specific package tier is requested.

## Code Examples

### Stripe Events Migration (015)
```sql
-- supabase/migrations/015_stripe_events.sql
-- Idempotency table for Stripe webhook events
-- Prevents duplicate processing when Stripe retries webhook delivery

CREATE TABLE IF NOT EXISTS stripe_events (
  event_id    TEXT         PRIMARY KEY,  -- Stripe event ID (evt_...)
  event_type  TEXT         NOT NULL,     -- e.g., 'payment_intent.succeeded'
  payload     JSONB        NOT NULL,     -- Full event payload for debugging
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Index for cleanup queries (optional: prune events older than 90 days)
CREATE INDEX IF NOT EXISTS idx_stripe_events_created_at
  ON stripe_events(created_at);

-- RLS: service role only (webhook handler writes; never public)
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON stripe_events
  FOR ALL USING (auth.role() = 'service_role');
```

### Env Var Validation Pattern
```typescript
// Alternative: Zod-based validation (if you prefer structured validation)
import { z } from 'zod'

const StripeEnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
})

// Validate at import time
export const stripeEnv = StripeEnvSchema.parse({
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
})
```

Note on Zod: The project uses `zod@4.3.6` (Zod v4). The `z.object().parse()` API is the same in v4 as v3 for this use case.

### Test Webhook with generateTestHeaderString
```typescript
// Example: testing webhook endpoint in Vitest
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_fake', {
  apiVersion: '2026-02-25.clover',
})

const testSecret = 'whsec_test_secret'

function createTestEvent(type: string, data: Record<string, unknown>) {
  const payload = JSON.stringify({
    id: `evt_test_${Date.now()}`,
    type,
    data: { object: data },
    created: Math.floor(Date.now() / 1000),
    api_version: '2026-02-25.clover',
    object: 'event',
  })

  const header = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: testSecret,
  })

  return { payload, header }
}
```

### Dashboard Product Creation Guide (Step-by-Step)
```
1. Go to https://dashboard.stripe.com/test/products
2. Click "+ Add product"
3. For each tier (Bronze, Silver, Gold, Shopify Starter, Shopify Growth):
   a. Name: "ASC [Tier] Package"
   b. Description: "[Tier] — setup fee + monthly retainer"
   c. Create TWO prices per product:
      - One-time price: Setup fee amount (e.g., $16,000 for Bronze)
      - Recurring price: Monthly retainer (e.g., $3,500/mo for Bronze)
   d. Copy Product ID (prod_...) and both Price IDs (price_...)
   e. Add to .env.local as STRIPE_PRODUCT_BRONZE, STRIPE_PRICE_BRONZE_SETUP, etc.
4. Core tier: Skip — custom-quoted, no fixed Price in Stripe
5. Total: 5 Products, 10 Prices
```

### Package Tier to Stripe Price Mapping
```
Bronze:          setup $16,000  | monthly $3,500
Silver:          setup $28,000  | monthly $6,500
Gold:            setup $48,000  | monthly $12,000
Shopify Starter: setup $8,500   | monthly $2,000
Shopify Growth:  setup $16,000  | monthly $4,000
Core:            custom-quoted  | custom-quoted (no Stripe Price)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `stripe@18.x` with `apiVersion: '2024-06-20'` | `stripe@20.4.0` with `apiVersion: '2026-02-25.clover'` | Feb 2026 | New API version naming: `YYYY-MM-DD.codename`; TypeScript types match pinned version |
| Pages Router `config = { api: { bodyParser: false } }` | App Router `request.text()` | Next.js 13+ | No config needed; raw body is native in App Router |
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` (already in project) | 2024 | Service client still uses `@supabase/supabase-js` directly |
| Stripe API version `2024-12-18.acacia` | `2026-02-25.clover` | Feb 2026 | Pin to SDK default; do NOT use the older version from initial research |

**API version decision:** Use `2026-02-25.clover` (the default for `stripe@20.4.0`). The earlier research mentioned `2025-01-27.acacia` and `2024-06-20` — both are outdated. Pinning to the SDK's default version ensures TypeScript types match API behavior.

## Open Questions

1. **Stripe Account Test Mode vs Live Mode**
   - What we know: `.env.local` already has `sk_live_...` and `pk_live_...` keys. `STRIPE_WEBHOOK_SECRET` is empty.
   - What's unclear: Whether to develop against test mode keys (safer) or live keys. Test mode keys start with `sk_test_` and `pk_test_`.
   - Recommendation: Create Products/Prices in **test mode** first. Add `STRIPE_SECRET_KEY_TEST` and use test keys during development. Switch to live keys only for production deployment on Vercel. The plan should include a step to obtain test-mode keys from the Stripe Dashboard.

2. **Vercel Function Timeout for Webhook Processing**
   - What we know: Vercel free tier has 10s function timeout; Pro tier has 60s. Webhook processing (signature verify + Supabase insert) is fast (<1s).
   - What's unclear: Whether the project is on Vercel free or Pro tier.
   - Recommendation: Not a concern for Phase 10. The webhook handler in this phase only does signature verification + idempotency insert, well under 10s. Heavier processing (Phase 11 handlers) should still be fast but could use background processing if needed.

3. **Stripe CLI Installation for Local Webhook Testing**
   - What we know: Stripe CLI is needed for `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
   - What's unclear: Whether Stripe CLI is installed on the development machine.
   - Recommendation: Document the installation step. On Windows: `scoop install stripe` or download from https://stripe.com/docs/stripe-cli.

## Sources

### Primary (HIGH confidence)
- [stripe-node GitHub releases](https://github.com/stripe/stripe-node/releases) — v20.4.0 confirmed, API version `2026-02-25.clover`
- [stripe-node GitHub README](https://github.com/stripe/stripe-node) — Constructor options, TypeScript usage
- [Stripe Webhooks Quickstart](https://docs.stripe.com/webhooks/quickstart) — Signature verification pattern
- [Stripe Webhooks Best Practices](https://docs.stripe.com/webhooks/best-practices) — Idempotency, retry behavior, async processing
- [Supabase service role docs](https://supabase.com/docs/guides/troubleshooting/performing-administration-tasks-on-the-server-side-with-the-servicerole-secret-BYM4Fa) — `createClient` with `persistSession: false`
- [Next.js App Router Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route) — `request.text()` for raw body
- Codebase inspection: `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/data/packages.ts`, `app/api/acp/checkout/route.ts`, `package.json`, `.env.local`, `supabase/migrations/014_chatbot_knowledge.sql`

### Secondary (MEDIUM confidence)
- [Stripe Products and Prices docs](https://docs.stripe.com/products-prices/manage-prices) — Dashboard vs API creation guidance
- [Stripe API Versioning](https://docs.stripe.com/api/versioning) — Version pinning best practices
- [Next.js Stripe webhook Medium article](https://kitson-broadhurst.medium.com/next-js-app-router-stripe-webhook-signature-verification-ea9d59f3593f) — Community verification of `request.text()` pattern

### Tertiary (LOW confidence)
- `appInfo` constructor option — Referenced in additional_context but NOT confirmed in official stripe-node README; omit from implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — `stripe@20.4.0` version and API version `2026-02-25.clover` confirmed from GitHub releases page; `@supabase/supabase-js` already installed
- Architecture: HIGH — All patterns verified against official Stripe docs and existing project structure; migration numbering confirmed (next is 015)
- Pitfalls: HIGH — All pitfalls are well-documented Stripe integration issues with known prevention patterns
- Products/Prices map: HIGH — Package slugs and pricing confirmed from `lib/data/packages.ts`; 5 fixed-price tiers + 1 custom-quoted

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (stable domain, Stripe SDK releases monthly but API patterns are backward-compatible)
