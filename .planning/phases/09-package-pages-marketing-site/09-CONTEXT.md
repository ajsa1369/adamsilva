# Phase 9: Package Pages & Marketing Site — Context

**Gathered:** 2026-03-03
**Status:** Ready for planning
**Source:** PRD Express Path (.planning/PRD.md) + codebase deep research

<domain>
## Phase Boundary

Phase 9 turns the ASC site into a self-service sales machine. A prospect can arrive, compare all tiers, check their platform's compliance ceiling, calculate their ROI, and reach the intake agent — all without talking to a human.

Four deliverables:
1. `/packages` — full tier comparison page with side-by-side table (PKG-01)
2. `/packages/[tier]` — individual tier detail pages with CTA to `/get-started` (PKG-02)
3. `/platform-check` — platform compatibility checker: tells prospect what their ceiling is based on their platform type (PKG-03)
4. `components/ROICalculator.tsx` — interactive ROI calculator embedded in package pages (PKG-04)
5. Heavy JSON-LD (Service, FAQPage, HowTo) on all new pages (PKG-05)

**Depends on:** Phase 4 (`/get-started` live), Phase 8 (chatbot embed available)

</domain>

<decisions>
## Implementation Decisions

### Page Architecture
- All pages use Next.js 14 App Router under `app/(marketing)/`
- `/packages/page.tsx` — server component with static pricing data
- `/packages/[tier]/page.tsx` — dynamic segment, one page per tier slug (bronze, silver, gold, core, shopify-starter, shopify-growth)
- `/platform-check/page.tsx` — client component (interactive platform selection → compliance output)
- No new API routes needed for Phase 9 — all data is static (pricing from PRD) or client-side (ROI calculator math)

### Pricing Data Source (USER DECISION: from PRD)
Pricing is static from PRD Section 5 — no Supabase query needed on these pages:
- **Bronze**: Setup $16,000 / Monthly $3,500 / Tier1 slots: 3 / Tier2: 0 / Tier3: 0
- **Silver**: Setup $28,000 / Monthly $6,500 / Tier1: 6 / Tier2: 1 / Tier3: 0
- **Gold**: Setup $48,000 / Monthly $12,000 / Tier1: 12 / Tier2: 3 / Tier3: 1
- **Core**: Custom from $75K setup / Unlimited slots
- **Shopify Starter**: Setup $8,500 / Monthly $2,000 / Tier1: 2 slots
- **Shopify Growth**: Setup $16,000 / Monthly $4,000 / Tier1: 4, Tier2: 1
All pricing in `lib/data/packages.ts` as typed const — single source of truth for pages + JSON-LD

### Existing Components to Reuse (from codebase research)
These components already exist in `components/ui/` — Phase 9 MUST use them, not reinvent:
- `PricingTable.tsx` — already has TierData interface, renders 5-column grid with pricing
- `ComparisonTable.tsx` — already has ComparisonRow/ComparisonTableProps, renders feature comparison
- `Button.tsx`, `Card.tsx`, `Badge.tsx` — all available
- `PlatformWarning.tsx` — existing platform warning component (for Shopify/Wix/etc)
- Design tokens: `lib/design-tokens.ts` — use `--color-accent`, `--color-navy`, `--color-text`, `--color-muted` CSS vars

### /packages Page (PKG-01)
- Hero section: headline + subheadline + CTA to `/get-started`
- `PricingTable` component with all 5 tiers (Bronze, Silver, Gold, Core, Legacy)
- Full `ComparisonTable` with feature rows: blog posts/mo, images/post, press releases/mo, chatbot channels, protocol stack, architecture, support
- Toggle: Setup Price / Monthly — controlled state in a thin `'use client'` wrapper around the server component
- Sticky CTA bar on mobile: "Get your custom proposal →"
- `ROICalculator` component embedded below the comparison table
- Link to each tier's detail page (`/packages/bronze`, etc.)

### /packages/[tier] Page (PKG-02)
- `generateStaticParams()` from `PACKAGES` data — pre-renders all tier slugs at build
- Hero: tier name + tagline + pricing
- "What's included" list: integration slots, blog posts/mo, channels, protocol features
- `ComparisonTable` showing this tier vs. next tier up (upgrade nudge)
- CTA: "Start with [Tier] — Get Your Custom Proposal" → links to `/get-started`
- "Not sure?" → links back to `/packages` and `/platform-check`
- FAQ section (minimum 3 Q&A pairs per tier — feeds FAQPage JSON-LD)
- Related: if `tier === 'shopify-starter' || 'shopify-growth'`, show `PlatformWarning` above CTA

### /platform-check Page (PKG-03)
- **Purpose**: Prospect selects their platform → sees compliance ceiling + recommended path
- **Platform options** (from PRD Section 9 Platform Compatibility Matrix):
  - Next.js / Custom SPA → Gold Standard: Full compliance (UCP ✓ ACP ✓ AP2 ✓)
  - Webflow (headless) → Partial: UCP partial, no ACP/AP2
  - WordPress (light theme) → Partial: UCP partial, no ACP/AP2
  - Shopify → Limited: No UCP/ACP/AP2 (architectural blocker)
  - Wix → Limited: No UCP/ACP/AP2 (architectural blocker)
  - Squarespace → Limited: No UCP/ACP/AP2 (architectural blocker)
  - WordPress (heavy theme) → Limited: No UCP/ACP/AP2
  - No website yet → Migration path recommended
- **UX flow**: Platform dropdown → instant results panel (no page load, client-side)
- Results show: compliance matrix table (Chatbot / Blog / Press Release / UCP / ACP / AP2 / Gold Standard) colored green/yellow/red, recommended package, CTA
- **Integration with existing `/tools/protocol-checker`**: Add a link "Check your domain's live protocol endpoints →" pointing to the existing tool — they're complementary (this page = platform type compliance ceiling; that tool = live domain endpoint check)
- Client component: `'use client'` with `useState` for platform selection
- `PlatformWarning` component used for legacy platforms

### ROI Calculator (PKG-04)
- File: `components/ROICalculator.tsx`
- Inputs: package (Bronze/Silver/Gold), leads/month (slider or number), close rate % (slider), average deal size ($)
- Calculation: `projectedNewLeads = leads * (agentCaptureRate) * closeRate * dealSize` where `agentCaptureRate` = Bronze 0.15 / Silver 0.25 / Gold 0.40 (baseline lift from 24/7 AI capture)
- Outputs: Monthly revenue lift ($), Annual ROI (%), Payback period (months)
- Formula: `ROI = (annualRevenueLift - annualCost) / setupCost * 100`
- All math client-side — no API calls
- Visual: number cards for 3 outputs + a simple bar or progress indicator
- Embedded in `/packages` page below comparison table and also in each `/packages/[tier]` page (pre-selected to that tier)

### JSON-LD Schema (PKG-05)
All new pages use heavy JSON-LD:
- `/packages`: `ItemList` @graph containing `Offer` nodes for each tier + `FAQPage` (common questions: What is the difference between Bronze and Gold? What platforms are compatible? How long until ROI?)
- `/packages/[tier]`: `Service` schema (name, description, offers, provider) + `FAQPage` (per-tier questions) + `BreadcrumbList`
- `/platform-check`: `SoftwareApplication` (like existing protocol-checker tool) + `FAQPage` (What platforms work with ASC? Why can't Shopify achieve full compliance?)
- All pages: `BreadcrumbList` from home → packages → [tier]
- JSON-LD injected via `generateMetadata()` with script tag in layout (same pattern as existing pages)
- Schema validation: must pass schema.org standards

### Metadata / SEO
- Each page has `generateMetadata()` with title, description, openGraph, twitter cards
- `/packages` title: "Agentic Commerce Packages — Bronze, Silver, Gold, Core | Adam Silva Consulting"
- `/packages/[tier]` title: `[Tier] Package — [price] Setup | Adam Silva Consulting`
- `/platform-check` title: "Platform Compliance Checker — Is Your Site AI-Ready? | Adam Silva Consulting"
- Canonical URLs set to NEXT_PUBLIC_SITE_URL

### Data File (lib/data/packages.ts)
- New file: typed const `PACKAGES` array with all tier data (pricing, slots, features, FAQs)
- Also exports `PLATFORM_MATRIX` — compliance data for all 8 platform types
- Replaces any hardcoded strings in pages — single source of truth

### Claude's Discretion
- ROI lift rates (Bronze 15%, Silver 25%, Gold 40%): reasonable marketing estimates — Claude may adjust if they seem off
- Whether to use a slider component or number input for ROI calculator — use whichever renders cleanly with existing design tokens
- FAQ question text for each tier — generate from PRD content, keep business-focused
- Whether `/platform-check` is at `app/(marketing)/platform-check/` or `app/platform-check/` — use marketing group for consistency
- The 8-Track blog post mentioned in PRD Phase 9 section is a Strapi content piece, not a Next.js page — defer it (blog pipeline is Phase 6, Strapi content is live work)

</decisions>

<specifics>
## Specific Requirements from PRD

- PKG-01: Prospect can compare all package tiers side-by-side at `/packages` — Bronze, Silver, Gold, Core, Legacy rows
- PKG-02: Prospect can view full details for each individual tier at `/packages/[tier]` with working CTA to `/get-started`
- PKG-03: `/platform-check` tells prospect whether their current platform can achieve full protocol compliance and what their ceiling is — must use the Platform Compatibility Matrix from PRD Section 9
- PKG-04: ROI calculator returns projected return based on: package selection + leads/month + close rate + average deal size
- PKG-05: All new pages include valid JSON-LD (Service, FAQPage, and/or HowTo schema) passing schema.org validation

### Platform Compatibility Matrix (from PRD Section 9 — exact data for PKG-03)
| Platform | Chatbot | Blog | Press Release | UCP | ACP | AP2 | Gold Standard |
|---|---|---|---|---|---|---|---|
| Next.js / Custom | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Webflow (headless) | ✓ | ✓ | ✓ | Partial | ✗ | ✗ | ✗ |
| WordPress (light) | ✓ | ✓ | ✓ | Partial | ✗ | ✗ | ✗ |
| Shopify | ✓ | Subdomain | ✓ | ✗ | ✗ | ✗ | ✗ |
| Wix | ✓ | Subdomain | ✓ | ✗ | ✗ | ✗ | ✗ |
| Squarespace | ✓ | Subdomain | ✓ | ✗ | ✗ | ✗ | ✗ |
| WordPress (heavy) | ✓ | Partial | ✓ | ✗ | ✗ | ✗ | ✗ |
| No website yet | N/A | N/A | N/A | ✓* | ✓* | ✓* | ✓* (with migration) |

### Legacy Penalty (why legacy builders fail — use in `/platform-check` results)
- Hydration Tax (2MB+ JS) → -40% agent crawl frequency
- Token Inefficiency → AI deprioritizes the site
- Root-Level Restriction → 0% UCP capability discovery
- Proprietary Checkout → Cannot implement ACP
- No Custom Security Headers → 0% AP2 cryptographic trust score

### Key Architecture Principle
These pages are the conversion layer — every page must have a clear path to `/get-started`. The intake agent (Phase 4) and chatbot embed (Phase 8) are available; reference them in CTAs and embed the chatbot widget where appropriate.

</specifics>

<deferred>
## Deferred Ideas

- The 8-Track blog post (`/blog/why-we-dont-build-on-legacy-site-builders`) — deferred to live Strapi content creation (not a Next.js page)
- `/get-started` page changes — already built in Phase 4, no modifications in Phase 9
- Stripe checkout integration on package pages — v2 (manual invoicing for now per PRD Section 12)
- Client portal login from package pages — deferred to Phase 9 concept in PRD (out of v1 scope)
- A/B testing of pricing page layouts — deferred to v2 analytics phase

</deferred>

---

*Phase: 09-package-pages-marketing-site*
*Context gathered: 2026-03-03 via PRD Express Path + codebase deep research*
