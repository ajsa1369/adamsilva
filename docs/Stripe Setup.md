# Stripe Setup

Tags: #stripe #payments

## Account
- Account ID: `acct_1SjiNA0PvN2Y81MB`
- Mode: **LIVE** (switched from test March 2026)
- Dashboard: https://dashboard.stripe.com

## API Keys (Live)
| Key | Location |
|-----|----------|
| Secret key `sk_live_...` | `.env.local` + Vercel |
| Publishable key `pk_live_...` | `.env.local` + Vercel |
| Webhook secret `whsec_...` | `.env.local` + Vercel |

Test keys kept commented out in `.env.local` for reference.

## Webhook
- **Endpoint ID:** `we_1T7OC50PvN2Y81MBVfDFmPuO`
- **URL:** `https://www.adamsilvaconsulting.com/api/stripe/webhook`
- **Events:** `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- **Handler:** `app/api/stripe/webhook/route.ts`
- **Idempotency:** `stripe_events` table in [[Supabase]]

## Payment Methods
- **Preferred:** ACH / US Bank Account (`us_bank_account`)
- **Fallback:** Card (credit/debit)
- **Card fee:** 4% convenience fee added at checkout
- **ACH status:** Enabled in dashboard but `available=false` until Stripe account fully verified (complete sandbox onboarding)
- **Code:** Both `us_bank_account` and `card` included in `payment_method_types` as fallback

## Products & Prices (Live)

### Packages
| Package | Env Var | Setup | Monthly |
|---------|---------|-------|---------|
| Bronze | `STRIPE_PRODUCT_BRONZE` | $16,000 | $3,500/mo |
| Silver | `STRIPE_PRODUCT_SILVER` | $28,000 | $6,500/mo |
| Gold | `STRIPE_PRODUCT_GOLD` | $48,000 | $12,000/mo |
| Shopify Starter | `STRIPE_PRODUCT_SHOPIFY_STARTER` | $8,500 | $2,000/mo |
| Shopify Growth | `STRIPE_PRODUCT_SHOPIFY_GROWTH` | $16,000 | $4,000/mo |

### Services (Individual)
| Service | Setup | Monthly |
|---------|-------|---------|
| AEO Audit | $5,000 | — |
| GEO Implementation | $7,500 | — |
| Authority Building | $15,000 | — |
| Quoting Agent | $8,500 | $1,200/mo |
| Off-Hours Voice Agent | $6,500 | $950/mo |
| Lead Enrichment | $5,500 | $1,500/mo |
| Lead Scraping | $9,500 | $2,200/mo |
| Auto-Appointment Setter | $8,500 | $1,800/mo |
| Blog Creator Engine | $4,500 | $2,500/mo |
| Press Syndicator | $6,500 | $3,000/mo |
| UCP Implementation | $15,000 | — |
| ACP Integration | $25,000 | — |
| AP2 Trust Layer | $35,000 | — |
| Unified Sales Agent | $45,000 | $5,000/mo |
| Social Media Manager | $6,500 | $1,500/mo |
| Social Media Poster | $4,500 | $950/mo |
| RAG Message Replier | $7,500 | $1,800/mo |

All product/price IDs stored in `.env.local` as `STRIPE_SVC_*` and `STRIPE_PRICE_*`.

## Key Files
- `lib/stripe/checkout.ts` — createOneTimePayment, createSubscription
- `lib/stripe/products.ts` — Package → Stripe IDs (lazy proxy pattern)
- `lib/stripe/services.ts` — Service → Stripe IDs (lazy proxy pattern)
- `lib/stripe/client.ts` — Stripe singleton + getWebhookSecret()
- `lib/cart/types.ts` — PaymentMethod type, CARD_CONVENIENCE_FEE_RATE = 0.04

## Checkout Flow
1. User selects service → Add to Cart or Buy Now
2. Buy Now → adds to cart + redirects `/checkout`
3. User fills name/email/company + selects ACH or Card
4. User accepts Terms of Service (required, timestamp stored)
5. POST `/api/checkout/create-session` → creates Stripe PaymentIntent or Subscription
6. Stripe Elements form → payment
7. On success → `/checkout/success` + order stored in Supabase

## Related
- [[Supabase]] — orders table, stripe_events table
- [[Environment Variables]]
- [[Architecture]]
