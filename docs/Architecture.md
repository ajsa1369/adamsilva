# Architecture

Tags: #architecture #infrastructure

## Stack
| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 14 App Router | SSR, deployed on Vercel |
| Styling | Tailwind v4 | Light mode default, dark mode toggle |
| CMS | Strapi v5 | Headless, on Hostinger VPS |
| Database | Supabase (PostgreSQL) | Contacts, leads, newsletter, orders |
| Payments | Stripe | Live mode — see [[Stripe Setup]] |
| Video | Remotion | Blog video summaries (excluded from tsconfig) |
| Config | next.config.mjs | Must be .mjs not .ts |

## Infrastructure
```
User → Vercel (Next.js) → Strapi API (VPS)
                        → Supabase (DB)
                        → Stripe (Payments)
```

## Key Directories
```
app/                    # Next.js App Router pages + API routes
  api/
    checkout/           # create-session, stripe webhook
    contact/            # contact form → Supabase
    newsletter/         # newsletter signup → Supabase
    stripe/webhook/     # Stripe event handler
  components/
    cart/               # AddToCartButton, BuyNowButton, CheckoutForm, OrderSummary
    checkout/           # PaymentMethodSelector, NoRefundsDisclaimer
    layout/             # Header, Footer (Terms + Privacy links)
    sections/           # ContactForm, ServiceCTASection
    services/           # Sandler selling components (see below)
  checkout/             # /checkout and /checkout/success pages
  services/[slug]/      # Dynamic service detail pages
  terms/                # Terms of Service
  privacy/              # Privacy Policy (GDPR/CCPA)

lib/
  cart/                 # types.ts (PaymentMethod, CARD_CONVENIENCE_FEE_RATE)
  stripe/
    checkout.ts         # createOneTimePayment, createSubscription
    products.ts         # Package → Stripe price ID map (lazy proxy)
    services.ts         # Service → Stripe price ID map (lazy proxy)
    client.ts           # Stripe singleton
  supabase/             # server.ts, service.ts clients
  schemas/              # JSON-LD schema library
  data/                 # services.ts data file

supabase/migrations/    # SQL migration files
public/                 # Static assets, AI discovery files
remotion/               # Blog video components (excluded from TS build)
  ServicesOverview/     # 5-slide Sandler services video (30s, Deepgram TTS)
scripts/                # One-off scripts (gitignored)
  generate-services-audio.mjs  # Deepgram TTS generation
```

## Services Page Components (Sandler Methodology)
The `/services` page uses animated infographic components following the Sandler selling system:

| Component | Purpose |
|-----------|---------|
| `SandlerPainHero` | Pain-first hero with animated counters (69%, $67B, 61%, 83%) |
| `MarketShiftInfographic` | Before/After comparison + market growth bars |
| `ServicesVideoShowcase` | Lazy-loaded Remotion Player with Deepgram TTS audio |
| `ProtocolStackInfographic` | 6-layer protocol visualization (UCP, ACP, AP2, Schema, MCP, AEO/GEO) |
| `RoadmapInfographic` | Animated 16-week timeline with 5 phases |
| `SandlerNegativeReverse` | "This Is Not for Everyone" negative reverse CTA |

All components use `IntersectionObserver` for scroll-triggered animations with staggered CSS transitions.

Per-service Sandler components (used on `/services/[slug]` pages):
| Component | Purpose |
|-----------|---------|
| `PainHero` | Per-service pain points (takes `SandlerPain` prop) |
| `CostOfInaction` | Per-service cost stat (takes stat/context/source props) |
| `NegativeReverseCTA` | Per-service negative reverse with cart integration |

## Deployment
- **Branch:** `ASCv2` on GitHub → Vercel auto-deploys
- **Merge to main** after QA is complete
- **Vercel env vars:** All Stripe, Supabase, Strapi keys set via API

## TypeScript Gotchas Fixed
- `next.config.ts` → `next.config.mjs` (Next.js 14 doesn't support .ts config)
- `remotion/` excluded from `tsconfig.json`
- `Set<string>` iteration fixed with manual dedup loop
- Supabase server.ts explicit cookie type annotation

## Related
- [[Environment Variables]]
- [[Stripe Setup]]
- [[Supabase]]
