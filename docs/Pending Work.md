# Pending Work

Tags: #todo #roadmap

## 🔴 Blocking / High Priority

### Stripe Live Activation
- Complete Stripe sandbox/live account onboarding (business verification)
- Once done, `us_bank_account` `available` will change from `false` → `true`
- Currently ACH shows in UI but card is the functional fallback
- See [[Stripe Setup]]

### Strapi Blog Content
- Log into https://cms.adamsilvaconsulting.com/admin
- Create admin account (first time setup)
- Create content type: **Article** with fields:
  - `title` (Text), `slug` (UID), `content` (Rich Text), `excerpt` (Text)
  - `author` (Text), `category` (Text), `schema_json` (JSON), `images` (JSON)
  - `publishedAt` (DateTime)
- Generate API token → add to `.env.local` as `STRIPE_API_TOKEN`
- Write 10 articles at 2,000+ words each
- See [[Strapi CMS]]

## 🟡 Medium Priority

### Images
- Create descriptive-filename images for `/public/images/`
- Service hero images, team photos, protocol diagrams

### Supabase Edge Functions
Deploy these (written but not yet deployed):
- `email-service` — transactional emails on order/contact
- `team-notifications` — internal alerts on new orders
- `generate-guide` — AI-generated lead magnet PDFs

### DNS
- Point `www.adamsilvaconsulting.com` to Vercel production deployment
- Confirm SSL certificate active on production domain

### Vercel ASCv2 → Main Merge
- After QA on ASCv2 preview URL, merge to `main`

## 🟢 Nice to Have

### About Page
- Currently has solo-consultant language ("Adam Silva is the founder and principal consultant")
- Should reflect enterprise firm scale — "our leadership team", "our partners"

### Analytics
- Add PostHog or similar for conversion tracking on checkout funnel

### Stripe Webhook Testing
- Use Stripe CLI to test webhook locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## ✅ Recently Completed
- **Services page Sandler redesign** — Full page rewrite with pain-first messaging, 5 animated infographic components, negative reverse CTA, objection-handling FAQ
- **Services overview video** — Remotion 5-slide composition with Deepgram TTS narration (aura-orion-en voice, 30s)
- **6 new components** — SandlerPainHero, MarketShiftInfographic, ProtocolStackInfographic, RoadmapInfographic, SandlerNegativeReverse, ServicesVideoShowcase
- Live Stripe mode (all 22 products, 52 prices, webhook)
- No refunds policy + 4% card convenience fee
- ACH/wire preferred payment method
- Terms of Service page + required acceptance checkbox
- Privacy Policy page (GDPR, CCPA)
- Buy Now button on service pages
- Enterprise firm copy (no "Adam will reach out")
- `legal@adamsilvaconsulting.com` on legal pages
- Footer Terms + Privacy links

## Related
- [[Architecture]]
- [[Strapi CMS]]
- [[Stripe Setup]]
