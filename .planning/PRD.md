# ASC Commercial Platform — Product Requirements Document
**Version:** 1.0
**Date:** March 2026
**Project:** Adam Silva Consulting — ASCv2 Commercial Platform
**Stack:** Next.js 14 App Router · Vercel Edge SSR · Supabase · Strapi v5 · Remotion · Vercel AI SDK · Tailwind v4
**Repository:** https://github.com/ajsa1369/adamsilva (branch: ASCv2)

---

## 1. Executive Summary

ASC is building the commercial layer on top of its existing ASCv2 site. The platform sells Agentic Commerce readiness services — packaged as Bronze, Silver, Gold, and Core tiers — to businesses that need to survive and dominate the shift from SEO (human-centric web) to AEO/GEO (agent-centric web).

The core insight driving the product: **AI agents are the new buyers.** Businesses on legacy site builders (Shopify, Wix, Squarespace, WordPress heavy themes) cannot achieve full protocol compliance. ASC is honest about this ceiling and positions itself as the architect of the Gold Standard stack: `SPA + SSR + Heavy Schema + UCP + ACP + AP2`.

The commercial platform consists of five integrated product modules:

1. **Agentic Intake Agent** — conversational chatbot that audits the prospect's existing stack, selects the right tier, and generates a live custom proposal
2. **Auto-Blog Engine** — fully automated content pipeline producing AEO/GEO-optimized posts with images (PNG + JSON-LD), summary videos (Remotion + VideoObject JSON-LD), heavy schema, and topical authority mapping
3. **Press Release Engine** — entity-building press release production and wire distribution workflow
4. **Site Chatbot Module** — deployable chatbot for ASC clients with appointment booking, job cost calculator, CSR, and CRM integration
5. **Protocol Stack Implementation** — UCP/ACP/AP2 compliance services for Gold and Core clients

---

## 2. Strategic Context

### The Protocol Stack (from Architecture Document)

| Layer | Protocol | Owner | Purpose |
|---|---|---|---|
| Discovery | UCP (Universal Commerce Protocol) | Google | How agents find and understand a business |
| Execution | ACP (Agentic Commerce Protocol) | OpenAI + Stripe | How agents execute purchases |
| Trust | AP2 (Agent Payments Protocol) | Google | Cryptographic proof of consent |

### The Gold Standard Architecture

```
SPA (React) + Edge Streaming SSR + Heavy JSON-LD Schema
+ UCP Manifest (/.well-known/ucp)
+ ACP Checkout API (standardized REST)
+ AP2 Mandate Service (verifiable credentials + audit trail)
= Full Agentic Commerce Compliance
```

### The Legacy Penalty (Why Legacy Builders Fail)

| Issue | Impact |
|---|---|
| Hydration Tax (2MB+ JS) | -40% agent crawl frequency |
| Token Inefficiency | AI economically deprioritizes the site |
| Root-Level Restriction | 0% UCP capability discovery |
| Proprietary Checkout | Cannot implement ACP |
| No Custom Security Headers | 0% AP2 cryptographic trust score |

**Affected platforms:** Shopify, Wix, Squarespace, GoDaddy Website Builder, WordPress (heavy theme)

ASC offers a **Legacy Add-On package** for these platforms (best effort) and a **Migration + Full Package** pathway to achieve Gold Standard.

---

## 3. Product Vision

> "Every business deserves to know exactly where they stand in the Agentic Commerce era — and exactly what it will take to dominate it. ASC builds the infrastructure, automates the content, and tells the truth about the technology."

---

## 4. Target Users / Personas

### Persona 1: The Growth SMB ($500K–$5M revenue)
- On Shopify or WordPress
- Has HubSpot or Pipedrive
- Knows they're losing organic traffic but doesn't know why
- Entry point: Agentic Intake Agent → Bronze or Shopify Add-On

### Persona 2: The Scaling Regional Business ($5M–$50M)
- Multiple locations, complex service catalog
- Uses Salesforce or GoHighLevel
- Wants to be cited by ChatGPT and Google AI Mode
- Entry point: Protocol Readiness Audit → Silver or Gold

### Persona 3: The Enterprise / Multi-Location Brand ($50M+)
- Custom stack or Magento
- Has SAP, NetSuite, or custom ERP
- Needs cryptographic trust for agent-initiated B2B transactions
- Entry point: Core package, custom scoping

### Persona 4: The "No Website Yet" Founder
- Starting fresh
- Can be built right from day one
- Entry point: Migration-first, then Silver or Gold

---

## 5. Package Definitions

### Integration Complexity Tiers

| Tier | Description | Setup Cost | Monthly |
|---|---|---|---|
| Tier 1 | Pre-built connector, rapid deploy | $750 | $150 |
| Tier 2 | REST API, custom config + data mapping | $1,500 | $250 |
| Tier 3 | Legacy/custom build, no public API | $3,000–$5,000 | $400–$600 |

### Package Tiers

| | Bronze | Silver | Gold | Core |
|---|---|---|---|---|
| **Setup** | $16,000 | $28,000 | $48,000 | Custom (from $75K) |
| **Monthly** | $3,500 | $6,500 | $12,000 | Custom |
| **Tier 1 slots** | 3 | 6 | 12 | Unlimited |
| **Tier 2 slots** | 0 | 1 | 3 | Unlimited |
| **Tier 3 slots** | 0 | 0 | 1 | Unlimited |
| **Blog posts/mo** | 4 | 8 | 16 | Custom |
| **Images/post** | 3 | 5 | 8 | Custom |
| **Press releases/mo** | 1 | 2 | 4 | Custom |
| **Chatbot channels** | Web | Web + SMS | Web + SMS + Voice + WhatsApp | All |
| **Protocol stack** | None | None | UCP manifest | UCP + ACP + AP2 |
| **Architecture** | Client stack | Client stack | Agent artifacts + full schema | Full Gold Standard |

### Legacy Add-On Packages

| | Shopify Starter | Shopify Growth |
|---|---|---|
| **Setup** | $8,500 | $16,000 |
| **Monthly** | $2,000 | $4,000 |
| **Includes** | Chatbot, 2 Tier 1 integrations, 2 posts/mo, 1 PR/mo | Chatbot + SMS, 4 Tier 1 + 1 Tier 2, 4 posts/mo, 2 PR/mo |
| **Protocol compliance** | None (architectural blocker) | None (architectural blocker) |

---

## 6. Module Specifications

---

### MODULE 1: Agentic Intake Agent

**Purpose:** Conversational chatbot on `/get-started` that qualifies prospects, detects their stack, selects the optimal package, calculates a custom price with integration overages, and generates a branded proposal — without any human involvement.

**Technology:** Vercel AI SDK (`streamText`, `useChat`), Next.js API route, Supabase (proposal storage), AI provider (customer-selectable at runtime)

**Conversation Flow:**

```
Step 1: Business Context
  - Industry (dropdown: 10 categories)
  - Number of locations (1 / 2-5 / 6-20 / 20+)
  - Monthly leads (under 50 / 50-200 / 200-500 / 500+)

Step 2: Stack Discovery (sequential, one category at a time)
  - CRM: HubSpot | Salesforce | Pipedrive | Zoho | GoHighLevel |
          Monday Sales | Freshsales | Close | Keap | ActiveCampaign |
          None | Other (free text)
  - Booking: Calendly | Acuity | Google Calendar | Outlook | SimplyBook |
             ServiceTitan | Mindbody | Vagaro | Jobber | Housecall Pro |
             Phone only | Other
  - Website Platform: Next.js/Custom | Shopify | WooCommerce | WordPress |
                      Webflow | Wix | Squarespace | Magento | Other
  - Email Marketing: Klaviyo | Mailchimp | HubSpot | ActiveCampaign |
                     Brevo | ConvertKit | Drip | Beehiiv | None | Other
  - Payment Processor: Stripe | Square | PayPal | Adyen | Authorize.net |
                       QuickBooks Payments | Invoice manually | Other
  - Helpdesk: Zendesk | Freshdesk | HubSpot Service | Intercom | None | Other
  - Accounting: QuickBooks | Xero | FreshBooks | Wave | None | Other
  - Other tools: Free text field

Step 3: Goal Selection (multi-select, up to 3)
  - More booked appointments automatically
  - Qualify and capture leads 24/7
  - Automate blog content for AI search
  - Get cited by ChatGPT / Gemini / Perplexity
  - Syndicate press releases for brand authority
  - Automate lead follow-up
  - Connect all tools (nothing falls through cracks)
  - Make site discoverable to AI shopping agents (UCP/ACP)
  - Replace phone reception with AI

Step 4: Platform Branch Logic
  IF platform = Shopify | Wix | Squarespace | WordPress (heavy):
    → Show legacy platform warning
    → Offer PATH A (Legacy Add-On) or PATH B (Migration)
  IF platform = Next.js | Custom | Webflow | Headless:
    → Full package flow
  IF platform = "No website yet":
    → Migration-first recommendation

Step 5: Proposal Generation
  - Count total integrations detected
  - Classify each against integration database (Tier 1/2/3)
  - Select recommended tier based on:
    * Integration count vs. package slots
    * Monthly lead volume
    * Goals selected (UCP/ACP goals → Gold or Core)
    * Location count (multi-location → Silver minimum)
  - Calculate: Base setup + integration overages
  - Calculate: Monthly retainer + integration maintenance fees
  - Generate formatted proposal with line-item breakdown

Step 6: Proposal Delivery
  - Display in-chat as formatted card
  - Store in Supabase (proposals table)
  - Send PDF to prospect email (auto-generated)
  - Create contact + deal in ASC's CRM via webhook
  - Trigger 48-hour follow-up sequence if no call booked
  - Show [Book Strategy Call] + [Download PDF Proposal] CTAs
```

**Proposal Output Fields:**
- recommended_tier
- setup_total
- monthly_total
- integrations_list (name, tier, included/overage, cost)
- included_features
- platform_compliance_status
- proposal_pdf_url
- created_at

**Edge Cases:**
- 10+ integrations → route to Core, alert sales team
- No existing tools → Bronze with CRM selection guidance
- Unknown tool → flag for technical review, book discovery call
- Enterprise stack (SAP/NetSuite/Oracle) → Core auto-route

---

### MODULE 2: Auto-Blog Engine

**Purpose:** Fully automated monthly content pipeline producing AEO/GEO-optimized posts with all media and schema artifacts.

**Technology:** NotebookLM MCP (research), image generation skill, Remotion (video), Strapi v5 (CMS), Vercel Edge (schema injection), Supabase (content tracking)

#### Sub-module 2a: Topical Authority Map Agent

Runs once per month per client. Output is a 30-day content plan.

**Process:**
1. Pull client's existing published URLs from their CMS
2. Query NotebookLM MCP with client's industry, service areas, and existing content to identify citation gaps
3. Cross-reference with competitor content to find uncovered authority gaps
4. Rank topics by: agent citation opportunity + search intent + authority gap size
5. Generate content calendar: topic, target query clusters, recommended schema types, FAQ clusters
6. Output: `authority-map-[clientId]-[YYYY-MM].json`

**Output Schema:**
```json
{
  "clientId": "string",
  "month": "YYYY-MM",
  "topics": [
    {
      "rank": 1,
      "title": "string",
      "targetQueries": ["string"],
      "authorityGapScore": 0-100,
      "recommendedSchemaTypes": ["Article", "FAQPage", "HowTo"],
      "faqClusters": ["string"],
      "estimatedCitationLift": "string"
    }
  ]
}
```

#### Sub-module 2b: Blog Post Production Pipeline

For each approved topic from the authority map:

**Step 1: Research**
- NotebookLM MCP: deep research on topic, pull authoritative sources, identify expert claims and statistics

**Step 2: Draft**
- 2,000+ words
- Answer-First format: 40–60 word summary paragraph at top (featured snippet target)
- FAQ section (minimum 5 questions derived from target query clusters)
- HowTo section where applicable
- Expert author attribution

**Step 3: HITL Review**
- Human editor review pass
- Fact verification
- Brand voice alignment

**Step 4: Image Generation** (3–8 images per post, per tier)

For each image:
- AI-generated from content-derived prompt
- Descriptive filename: `[topic-slug]-[scene-description]-[number].png`
- Companion `ImageObject` JSON-LD generated:
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "Descriptive image title",
  "contentUrl": "https://domain.com/images/filename.png",
  "description": "Full description for LLM ingestion",
  "author": { "@type": "Organization", "name": "Client Name" },
  "about": { "@type": "Article", "name": "Post Title", "url": "post-url" },
  "license": "https://domain.com/image-license"
}
```

**Step 5: Summary Video** (Remotion)

Using the existing `remotion/BlogSummaryVideo.tsx`:
- 90–120 second video generated from key post points
- Voiceover script auto-generated from Answer-First summary + FAQ
- Thumbnail generated
- Companion `VideoObject` JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Post Title — Video Summary",
  "description": "60-word post summary",
  "thumbnailUrl": "https://domain.com/images/thumb-slug.png",
  "uploadDate": "YYYY-MM-DD",
  "duration": "PT1M45S",
  "transcript": "Full verbatim transcript",
  "contentUrl": "https://domain.com/videos/slug.mp4",
  "embedUrl": "https://youtube.com/watch?v=...",
  "author": { "@type": "Organization", "name": "Client Name" },
  "about": { "@type": "Article", "url": "post-url" }
}
```

**Step 6: Heavy Schema Assembly**

Schema types applied per post:
- `Article` + `Person` (Author)
- `FAQPage` (from FAQ section, minimum 5 Q&A pairs)
- `HowTo` (where applicable)
- `ImageObject` (one per image, all interlinked)
- `VideoObject` (the summary video)
- `BreadcrumbList`

All schema interlinked via `@id` references.

**Step 7: Publish**
- Post data → Strapi v5 via REST API
- Images → client's asset storage (Cloudinary, Imgix, S3, or WordPress media — configurable)
- Video → YouTube + client video host
- JSON-LD injected into `<head>` via Next.js metadata API on the blog post template
- RSS feed updated (`/feed.xml`)

---

### MODULE 3: Press Release Engine

**Process:**
1. Topic selection (from authority map or client news event)
2. Draft: 300–500 words, inverted pyramid format
3. `NewsArticle` schema applied at origin publication
4. 60-second summary video (Remotion) + `VideoObject` JSON-LD sidecar
5. AB 2013 / SB 942 AI transparency compliance labeling
6. Distribution via configured wire service (Business Wire, PR Newswire, EIN Presswire, AccessWire)
7. Monitoring: AI mention tracking, Knowledge Panel updates, Google News appearances

---

### MODULE 4: Site Chatbot Module

**Purpose:** The deployable chatbot ASC builds for clients as part of Bronze/Silver/Gold packages.

**Technology:** Vercel AI SDK, `useChat`, `streamText`, tool-calling for appointment/calculator/CSR actions, Supabase (session storage), client-configured CRM webhook

**Tools (Vercel AI SDK tool definitions):**

```typescript
tools: {
  bookAppointment: {
    description: "Book an appointment in the client booking system",
    inputSchema: z.object({
      service: z.string(),
      preferredDate: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string()
    }),
    execute: async (input) => { /* Calendly/Acuity/etc API call */ }
  },

  calculateJobCost: {
    description: "Calculate the estimated cost for a job based on scope",
    inputSchema: z.object({
      serviceType: z.string(),
      squareFootage: z.number().optional(),
      addOns: z.array(z.string()).optional(),
      urgency: z.enum(['standard', 'priority', 'emergency'])
    }),
    execute: async (input) => { /* Client-configured pricing logic */ }
  },

  createCRMLead: {
    description: "Save lead information to the CRM",
    inputSchema: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string().optional(),
      serviceInterest: z.string(),
      estimatedValue: z.number().optional(),
      source: z.string()
    }),
    execute: async (input) => { /* CRM API call (HubSpot/Pipedrive/etc) */ }
  },

  escalateToHuman: {
    description: "Create a support ticket and notify a human agent",
    inputSchema: z.object({
      issue: z.string(),
      urgency: z.enum(['low', 'medium', 'high']),
      conversationSummary: z.string()
    }),
    execute: async (input) => { /* Zendesk/Freshdesk/HubSpot ticket creation */ }
  },

  lookupOrderStatus: {
    description: "Look up order or job status",
    inputSchema: z.object({
      identifier: z.string()
    }),
    execute: async (input) => { /* E-commerce or job management API */ }
  }
}
```

**Channels (Bronze = web only, Silver adds SMS, Gold adds Voice + WhatsApp):**
- Web widget (embedded JS — works on any platform including Shopify)
- SMS via Twilio / Vonage / Bandwidth (customer's choice)
- Voice via Bland.ai / Vapi (customer's choice)
- WhatsApp via 360dialog / Meta Cloud API (customer's choice)

**CRM Integration Framework:**
- Tier 1 CRMs: direct API connectors (HubSpot, Pipedrive, Salesforce, Zoho, GoHighLevel, etc.)
- Tier 2 CRMs: webhook-based + custom field mapping
- Tier 3: custom middleware build
- Every interaction: contact upsert + activity note + deal create/update

---

### MODULE 5: Protocol Stack (Gold + Core)

**UCP Manifest Generator**
- Generates and serves `/.well-known/ucp` via Next.js API route
- Dynamic manifest updated when capabilities change
- Capability declarations: checkout, discounts, fulfillment, loyalty
- Transport bindings: REST, MCP, A2A

**ACP Checkout Adapter**
- Standardized REST checkout API: cart create, line-item update, finalize
- Real-time JSON-LD product feed
- Delegated payment token support (Stripe SPT, Adyen, Braintree)
- Rich state responses for agent memory

**AP2 Mandate Service**
- Intent Mandate service (spend limits, TTL, conditions)
- Cart Mandate signing
- Verifiable Credentials setup
- Cryptographic audit trail
- Payment-agnostic: Cards, Bank Transfers, Stablecoins, x402 Crypto Extension

**Agent Artifact Kit**
- `llms.txt` + `llms-full.txt`
- `ai-context.json`
- `agent.json`
- `ai-plugin.json`
- `/.well-known/ucp`, `acp`, `ap2`
- RSS feed at `/feed.xml`

---

## 7. Technical Architecture

### Stack

```
Frontend:        Next.js 14 App Router, React, Tailwind v4
Rendering:       Vercel Edge SSR, Streaming HTML, <300ms TTFF target
AI Layer:        Vercel AI SDK (streamText, useChat, tool-calling)
MCP Integration: @vercel/mcp-adapter (createMcpHandler in API routes)
Database:        Supabase (PostgreSQL, RLS, Edge Functions)
CMS:             Strapi v5 (blog posts, authors, categories)
Video:           Remotion (BlogSummaryVideo.tsx)
Image Gen:       Image creator skill (via API)
Research:        NotebookLM MCP server
Version Control: GitHub MCP (github.com/ajsa1369/adamsilva)
Deployment:      Vercel (ASCv2 branch → production)
Storage:         Vercel Blob (generated images/videos) or Cloudinary
```

### Supabase Tables

```sql
-- Integration catalog (all known tools with tier classification)
integrations_catalog (
  id, name, category, tier, setup_cost, monthly_cost,
  api_available, connector_type, notes
)

-- Package definitions
packages (
  id, name, slug, base_setup, base_monthly,
  tier1_slots, tier2_slots, tier3_slots,
  features_json, is_legacy_only
)

-- Intake proposals
proposals (
  id, created_at, prospect_name, prospect_email,
  industry, locations, monthly_leads,
  platform, platform_tier,
  integrations_detected jsonb,
  recommended_package, setup_total, monthly_total,
  goals jsonb, proposal_pdf_url, status,
  crm_deal_id
)

-- Blog posts (client content tracking)
blog_posts (
  id, client_id, title, slug, status,
  authority_map_id, published_at,
  schema_json jsonb, images jsonb, video_url,
  strapi_id
)

-- Authority maps
authority_maps (
  id, client_id, month, topics_json jsonb,
  created_at, approved_at
)

-- Chatbot sessions
chatbot_sessions (
  id, client_id, channel, session_start,
  messages jsonb, outcome, crm_contact_id,
  appointment_booked, lead_value_estimate
)

-- Press releases
press_releases (
  id, client_id, title, draft_text,
  schema_json jsonb, video_url,
  wire_service, distributed_at, status
)
```

### Vercel MCP Server

ASC exposes its own tools as an MCP server via `@vercel/mcp-adapter`:

```typescript
// app/api/asc/[transport]/route.ts
createMcpHandler((server) => {
  server.tool('generateAuthorityMap', ...);
  server.tool('createBlogPost', ...);
  server.tool('generateSchemaMarkup', ...);
  server.tool('runProtocolCheck', ...);
  server.tool('calculateProposal', ...);
  server.tool('generatePressRelease', ...);
})
```

This makes ASC's own automation tools consumable by Claude, other AI agents, and future A2A integrations.

---

## 8. Content Engine — Blog Post JSON-LD Interlink Map

```
Article
  ├── author → Person
  ├── publisher → Organization
  ├── image → ImageObject (×3-8)
  │     └── about → Article
  ├── video → VideoObject
  │     ├── about → Article
  │     └── transcript (full text)
  ├── mainEntity → FAQPage
  │     └── mainEntity → Question[]
  │           └── acceptedAnswer → Answer[]
  └── step[] → HowToStep[] (where applicable)
```

---

## 9. Platform Compatibility Matrix

| Platform | Chatbot | Blog | Press Release | UCP | ACP | AP2 | Gold Standard |
|---|---|---|---|---|---|---|---|
| Next.js / Custom | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Webflow (headless) | ✓ | ✓ | ✓ | Partial | ✗ | ✗ | ✗ |
| WordPress (light) | ✓ | ✓ | ✓ | Partial | ✗ | ✗ | ✗ |
| Shopify | ✓ | Subdomain | ✓ | ✗ | ✗ | ✗ | ✗ |
| Wix | ✓ | Subdomain | ✓ | ✗ | ✗ | ✗ | ✗ |
| Squarespace | ✓ | Subdomain | ✓ | ✗ | ✗ | ✗ | ✗ |
| WordPress (heavy) | ✓ | Partial | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## 10. Success Metrics (from Architecture Deck KPI Framework)

| Category | KPI | Target |
|---|---|---|
| Discovery | Agent citation share | 3× lift vs. pre-implementation |
| Efficiency | Render-to-first-fact | <300ms |
| Efficiency | Tokens per critical fact | Low (ASC stack vs. $0.05 legacy) |
| Execution | ChatGPT Instant Checkout conversion | Measurable lift |
| Trust | AP2 mandate success rate | 99.9% |
| Business | Incremental revenue from agentic surfaces | +25% |
| Content | AI engine citations per published post | Tracked per client |
| Sales | Proposals generated per month | Tracked by intake agent |
| Sales | Proposal-to-call conversion | >30% |

---

## 11. Phase Breakdown (GSD-Compatible)

### Milestone: ASC Commercial Platform v1

**Phase 1: Design System & UI Foundation**
- Run ui-ux-pro-max skill: design tokens, color palette, typography, spacing
- Run frontend-design skill: component library (Button, Card, Badge, ChatBubble, ProposalCard, PricingTable, ComparisonTable)
- Design intake chatbot conversation UI
- Design package comparison page layouts
- Design proposal output card
- All designs pushed to GitHub via GitHub MCP

**Phase 2: Supabase Schema & Data Architecture**
- Use Supabase MCP to create all tables from schema above
- RLS policies for each table
- Edge functions: `generate-proposal`, `send-proposal-email`, `create-crm-deal`
- Integration catalog seeded with all known tools (Tier 1/2/3 classification)

**Phase 3: Integration Catalog & Pricing Engine**
- Build `lib/integrations/catalog.ts` — full integration database
- Build `lib/pricing/calculator.ts` — slot logic + overage calculation
- Build `lib/pricing/tier-selector.ts` — recommendation engine
- Unit tests for pricing logic

**Phase 4: Agentic Intake Agent**
- `/get-started` page with conversational UI (frontend-design skill)
- `/api/intake/chat` — Vercel AI SDK `streamText` route with full tool set
- Platform detection logic + branch routing
- Proposal generation and Supabase storage
- PDF proposal generation (PDFKit or React-PDF)
- CRM webhook (configurable per ASC's own CRM)
- Email delivery via existing email-service edge function

**Phase 5: Topical Authority Map Agent**
- `/api/authority-map/generate` — NotebookLM MCP integration
- Authority map Supabase storage + client portal view
- Monthly cron trigger (Vercel Cron)
- Client approval workflow (email link → approve/modify)

**Phase 6: Blog Post Production Pipeline**
- Image generation API integration (image creator skill)
- `lib/blog/image-pipeline.ts` — generate + name + ImageObject JSON-LD
- Remotion render trigger for `BlogSummaryVideo.tsx` → `VideoObject` JSON-LD
- `lib/blog/schema-assembler.ts` — full schema interlink builder
- Strapi v5 publish integration
- `/api/blog/generate` — full pipeline orchestration endpoint
- Vercel Cron for monthly post schedule

**Phase 7: Press Release Engine**
- `/api/press-release/generate` — draft + schema + video pipeline
- Wire service integration (configurable)
- AB 2013 compliance label injection
- Monitoring webhook (track Google News + AI mentions)

**Phase 8: Site Chatbot Module**
- Chatbot widget component (embeddable JS)
- Vercel AI SDK tool definitions (bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus)
- CRM integration framework — adapter pattern for all Tier 1 CRMs
- Multi-channel connector interfaces (SMS, Voice, WhatsApp)
- Session storage in Supabase

**Phase 9: Package Pages & Marketing Site**
- `/packages` — full tier comparison with interactive toggle
- `/get-started` — intake agent live
- `/platform-check` — platform compatibility checker (integrates with existing `/tools/protocol-checker`)
- `/blog/why-we-dont-build-on-legacy-site-builders` — the 8-Track blog post (Module 2 pipeline)
- ROI calculator component
- `/packages/[tier]` — individual tier detail pages

**Phase 10: Protocol Stack & MCP Server**
- UCP manifest generator API
- ACP checkout adapter framework
- AP2 mandate service scaffolding
- Agent artifact auto-generator
- Vercel MCP server (`/api/asc/[transport]/route.ts`) using `@vercel/mcp-adapter`

---

## 12. Out of Scope (v1)

- Multi-language content support (v2)
- White-label reseller portal (v2)
- Native mobile app (v2)
- Stripe billing integration for ASC's own subscriptions (v2 — manual invoicing for now)
- Full A2A inter-agent communication (v2)
- Real-time competitive pricing scraping (v2)

---

## 13. Environment Variables Required

```
# AI (customer-selectable — use Vercel AI SDK model routing)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cdifobufvgfpbcbvicjs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Strapi
STRAPI_API_TOKEN=
STRAPI_URL=http://72.60.127.124:1337

# Remotion
REMOTION_SERVE_URL=

# NotebookLM MCP (when configured)
NOTEBOOKLM_API_KEY=

# CRM (ASC's own)
ASC_CRM_WEBHOOK_URL=
ASC_CRM_API_KEY=

# Email
RESEND_API_KEY= (or existing email-service config)

# Vercel
VERCEL_BLOB_READ_WRITE_TOKEN=
```

---

*Document version: 1.0 — March 2026*
*Next review: After Phase 4 completion*
