# Requirements: Adam Silva Consulting — ASC Commercial Platform

**Defined:** 2026-03-02
**Core Value:** Every prospect gets an instant, accurate, branded proposal — no sales calls required to qualify.

## v1.0 Requirements

Requirements for ASC Commercial Platform v1.0. Each maps to roadmap phases.

### Design System (DS)

- [x] **DS-01**: Developer can use shared design tokens (color, typography, spacing) from `lib/design-tokens.ts` to ensure visual consistency across all new components
- [x] **DS-02**: Developer can import and compose 9 reusable components: Button, Card, Badge, ChatBubble, ProposalCard, PricingTable, ComparisonTable, IntakeStep, PlatformWarning
- [x] **DS-03**: All components are light-mode-only and mobile-first at 375px (Tailwind v4, no dark mode)

### Data Layer (DATA)

- [x] **DATA-01**: System can store and query integration catalog (name, tier, setup cost, monthly cost, category) in Supabase
- [x] **DATA-02**: System can store package definitions (Bronze/Silver/Gold/Core/Legacy) with all slot counts and pricing in Supabase
- [x] **DATA-03**: System can persist generated proposals (tier, pricing breakdown, integration list, PDF URL, prospect email) in Supabase with RLS
- [x] **DATA-04**: System can store blog post metadata and authority map results per client in Supabase
- [x] **DATA-05**: System can store chatbot session history per client and visitor in Supabase
- [x] **DATA-06**: System can store press release drafts and distribution records in Supabase
- [x] **DATA-07**: All new tables have Row Level Security enabled

### Pricing Engine (PRICE)

- [x] **PRICE-01**: System can classify any integration as Tier 1 ($750 setup / $150/mo), Tier 2 ($1,500 / $250/mo), or Tier 3 ($3,000–5,000 / $400–600/mo)
- [x] **PRICE-02**: System can calculate total setup + monthly cost given a list of integrations against any package tier (slot logic + overage math)
- [x] **PRICE-03**: System can recommend the optimal tier given: integration count, monthly lead volume, goals selected, platform type, and location count
- [x] **PRICE-04**: Pricing engine is covered by unit tests (slot logic, overage, tier recommendation)

### Intake Agent (INTAKE)

- [ ] **INTAKE-01**: Prospect can start a conversational intake flow at `/get-started` and answer questions about their business, stack, and goals
- [x] **INTAKE-02**: Agent detects the prospect's website platform and routes to legacy warning path (Shopify/Wix/Squarespace/WordPress) or full package path (headless/custom)
- [x] **INTAKE-03**: Agent looks up each named tool against the integration catalog and classifies it (Tier 1/2/3)
- [x] **INTAKE-04**: Agent generates a complete proposal (tier recommendation, setup total, monthly total, integration line items) at end of conversation
- [x] **INTAKE-05**: Generated proposal is stored in Supabase proposals table
- [x] **INTAKE-06**: Prospect receives a PDF proposal via email automatically (Resend or existing email-service edge function)
- [x] **INTAKE-07**: A contact + deal is created in ASC's CRM via configurable webhook upon proposal generation
- [ ] **INTAKE-08**: A 48-hour follow-up sequence is triggered if no strategy call is booked after proposal delivery
- [x] **INTAKE-09**: LLM provider is never hardcoded — all AI calls use MODEL_PROVIDER environment variable

### Authority Map Agent (AUTHMAP)

- [ ] **AUTHMAP-01**: System can generate a monthly topical authority map per client — research pipeline identifies content gaps and ranks topics by citation opportunity
- [ ] **AUTHMAP-02**: Authority map output (JSON) is stored in Supabase authority_maps table
- [ ] **AUTHMAP-03**: Authority map generation is triggered on the first Monday of each month via Vercel Cron
- [ ] **AUTHMAP-04**: Client receives an approval email with approve/modify link before content calendar is locked

### Blog Pipeline (BLOG)

- [ ] **BLOG-01**: System can generate N blog post images per post with descriptive filenames and companion ImageObject JSON-LD for each
- [ ] **BLOG-02**: System can trigger a Remotion render for BlogSummaryVideo.tsx and generate VideoObject JSON-LD with full transcript
- [ ] **BLOG-03**: System can assemble interlinked JSON-LD schema for a post (Article + Person + FAQPage + HowTo + ImageObject[] + VideoObject, all linked via @id)
- [ ] **BLOG-04**: System can orchestrate the full blog pipeline (research → draft → images → video → schema → publish) via a single API route
- [ ] **BLOG-05**: Completed posts are published to Strapi v5 via REST API
- [ ] **BLOG-06**: Blog generation schedule per client is managed via Vercel Cron

### Press Release Engine (PR)

- [ ] **PR-01**: System can generate a 300–500 word press release draft in inverted pyramid format from a topic or news event input
- [ ] **PR-02**: NewsArticle schema is applied at origin publication; AI transparency label (AB 2013 / SB 942) is included
- [ ] **PR-03**: A 60-second Remotion video sidecar with VideoObject JSON-LD is generated alongside each press release
- [ ] **PR-04**: Press release is distributed via configurable wire service (Business Wire, PR Newswire, EIN Presswire, or AccessWire)

### Chatbot Module (CHAT)

- [ ] **CHAT-01**: Developer can deploy an embeddable chatbot widget (`ChatWidget.tsx`) on any client site via a script tag (`public/chatbot-embed.js`)
- [ ] **CHAT-02**: Chatbot supports 5 tool actions: bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus
- [ ] **CHAT-03**: Chatbot connects to any of 10 Tier 1 CRMs via adapter pattern (HubSpot, Salesforce, Pipedrive, Zoho, GoHighLevel, Monday Sales, Freshsales, Close, Keap, ActiveCampaign)
- [ ] **CHAT-04**: Chatbot session history is stored in Supabase chatbot_sessions table
- [ ] **CHAT-05**: Chatbot supports multi-channel delivery: Web (all tiers), SMS via Twilio/Vonage (Silver+), Voice via Bland.ai/Vapi (Gold+), WhatsApp via 360dialog (Gold+)

### Package Pages (PKG)

- [ ] **PKG-01**: Prospect can compare all package tiers side-by-side at `/packages`
- [ ] **PKG-02**: Prospect can view full details for each individual tier at `/packages/[tier]`
- [ ] **PKG-03**: Prospect can check their platform's protocol compliance at `/platform-check`
- [ ] **PKG-04**: Prospect can estimate ROI from a package via an interactive calculator component
- [ ] **PKG-05**: All new pages include heavy JSON-LD (Service, FAQPage, HowTo schema)

### Protocol MCP Server (MCP)

- [ ] **MCP-01**: AI agents can call ASC's MCP server at `app/api/asc/[transport]` to access 6 tools: generateAuthorityMap, createBlogPost, generateSchemaMarkup, runProtocolCheck, calculateProposal, generatePressRelease
- [ ] **MCP-02**: `/.well-known/ucp`, `/.well-known/acp`, `/.well-known/ap2` routes are dynamically generated by an artifact generator (replacing static files)
- [ ] **MCP-03**: ACP checkout adapter framework is scaffolded in `lib/protocols/acp-adapter.ts`
- [ ] **MCP-04**: AP2 mandate service is scaffolded in `lib/protocols/ap2-mandate.ts`

## v2 Requirements

Deferred to future release.

### Monitoring & Analytics
- **MON-01**: Real-time dashboard showing proposal conversion rate, chatbot engagement, content performance
- **MON-02**: AI mention tracking (ChatGPT, Gemini, Perplexity citations)
- **MON-03**: Knowledge Panel update monitoring

### Client Portal
- **CLIENT-01**: Client can log in to view their authority maps, blog schedule, and proposal history
- **CLIENT-02**: Client can approve/reject individual blog post drafts before publish
- **CLIENT-03**: Client can configure their chatbot tools (pricing, services) without a developer

### Multi-tenant
- **MULTI-01**: Full multi-tenant data isolation for white-label reseller scenario

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time multi-user proposal collaboration | One-to-one flow, not needed |
| On-site e-commerce checkout | Proposals close via Stripe invoicing — v2+ |
| Native mobile app | Web-first priority |
| WordPress/Shopify theme generator | Not an ASC service |
| Full Strapi admin customization | VPS CMS operational as-is |
| Video hosting infrastructure | Use YouTube + client's existing host |

## Traceability

Which phases cover which requirements. Populated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Complete |
| DS-02 | Phase 1 | Complete |
| DS-03 | Phase 1 | Complete |
| DATA-01 | Phase 2 | Complete |
| DATA-02 | Phase 2 | Complete |
| DATA-03 | Phase 2 | Complete |
| DATA-04 | Phase 2 | Complete |
| DATA-05 | Phase 2 | Complete |
| DATA-06 | Phase 2 | Complete |
| DATA-07 | Phase 2 | Complete |
| PRICE-01 | Phase 3 | Complete |
| PRICE-02 | Phase 3 | Complete |
| PRICE-03 | Phase 3 | Complete |
| PRICE-04 | Phase 3 | Complete |
| INTAKE-01 | Phase 4 | Pending |
| INTAKE-02 | Phase 4 | Complete |
| INTAKE-03 | Phase 4 | Complete |
| INTAKE-04 | Phase 4 | Complete |
| INTAKE-05 | Phase 4 | Complete |
| INTAKE-06 | Phase 4 | Complete |
| INTAKE-07 | Phase 4 | Complete |
| INTAKE-08 | Phase 4 | Pending |
| INTAKE-09 | Phase 4 | Complete |
| AUTHMAP-01 | Phase 5 | Pending |
| AUTHMAP-02 | Phase 5 | Pending |
| AUTHMAP-03 | Phase 5 | Pending |
| AUTHMAP-04 | Phase 5 | Pending |
| BLOG-01 | Phase 6 | Pending |
| BLOG-02 | Phase 6 | Pending |
| BLOG-03 | Phase 6 | Pending |
| BLOG-04 | Phase 6 | Pending |
| BLOG-05 | Phase 6 | Pending |
| BLOG-06 | Phase 6 | Pending |
| PR-01 | Phase 7 | Pending |
| PR-02 | Phase 7 | Pending |
| PR-03 | Phase 7 | Pending |
| PR-04 | Phase 7 | Pending |
| CHAT-01 | Phase 8 | Pending |
| CHAT-02 | Phase 8 | Pending |
| CHAT-03 | Phase 8 | Pending |
| CHAT-04 | Phase 8 | Pending |
| CHAT-05 | Phase 8 | Pending |
| PKG-01 | Phase 9 | Pending |
| PKG-02 | Phase 9 | Pending |
| PKG-03 | Phase 9 | Pending |
| PKG-04 | Phase 9 | Pending |
| PKG-05 | Phase 9 | Pending |
| MCP-01 | Phase 10 | Pending |
| MCP-02 | Phase 10 | Pending |
| MCP-03 | Phase 10 | Pending |
| MCP-04 | Phase 10 | Pending |

**Coverage:**
- v1.0 requirements: 42 total
- Mapped to phases: 42
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-02*
*Last updated: 2026-03-02 after initial definition*
