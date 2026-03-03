# Roadmap: ASC Commercial Platform — Milestone v1.0

## Overview

This roadmap builds the full commercial layer on top of the existing ASCv2 site. Starting from a shared design system and database foundation, it progresses through the pricing engine and agentic intake agent (critical path), then constructs the automated content pipelines (authority mapping, blog production, press releases), the deployable chatbot module, the package marketing pages, and finally the protocol MCP server — delivering a complete, self-operating commercial platform that qualifies prospects, generates proposals, produces content, and exposes ASC's capabilities to AI agents.

## Phases

**Phase Numbering:**
- Integer phases (1–10): Planned milestone v1.0 work
- Decimal phases (e.g., 4.1): Urgent insertions only

- [x] **Phase 1: Design System & UI Foundation** - Shared tokens + 9 reusable components (dark/light, mobile-first)
- [ ] **Phase 2: Supabase Schema & Data Architecture** - 7 new tables with RLS + seeded integration catalog + edge function scaffolding
- [x] **Phase 3: Integration Catalog & Pricing Engine** - TypeScript catalog lib + slot/overage calculator + tier recommender + unit tests (completed 2026-03-02)
- [x] **Phase 4: Agentic Intake Agent** - Conversational /get-started flow → proposal generation → PDF → email → CRM → follow-up (completed 2026-03-02)
- [x] **Phase 5: Topical Authority Map Agent** - Monthly research pipeline → content calendar → client approval email (Vercel Cron) (completed 2026-03-03)
- [ ] **Phase 6: Blog Post Production Pipeline** - Image gen → Remotion video → heavy schema → Strapi publish → Vercel Cron schedule
- [x] **Phase 7: Press Release Engine** - Draft generation → NewsArticle schema → 60s video sidecar → wire service distribution (completed 2026-03-03)
- [x] **Phase 8: Site Chatbot Module** - Embeddable widget + 5 tools + 10 CRM adapters + multi-channel + Supabase sessions (completed 2026-03-03)
- [ ] **Phase 9: Package Pages & Marketing Site** - /packages, /packages/[tier], /platform-check, ROI calculator, JSON-LD
- [ ] **Phase 10: Vercel MCP Server & Protocol Stack** - MCP server (6 tools) + dynamic /.well-known/* + ACP adapter + AP2 mandate

## Phase Details

### Phase 1: Design System & UI Foundation
**Goal**: Every developer (Claude) building subsequent phases has a consistent, tested component library to draw from — no one-off styling decisions, no visual inconsistency
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03
**Success Criteria** (what must be TRUE):
  1. Developer can import design tokens from `lib/design-tokens.ts` and apply color, typography, and spacing values without hardcoding hex or pixel values anywhere
  2. All 9 components (Button, Card, Badge, ChatBubble, ProposalCard, PricingTable, ComparisonTable, IntakeStep, PlatformWarning) render correctly in isolation with no TypeScript errors
  3. All components render correctly in light mode with no dark mode styles or selectors present
  4. All components display correctly on a 375px mobile viewport (no overflow, no broken grid)
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Design tokens (lib/design-tokens.ts) + primitive components: Button, Card, Badge
- [x] 01-02-PLAN.md — Composite components: ChatBubble, ProposalCard, PricingTable, ComparisonTable, IntakeStep, PlatformWarning + barrel export

### Phase 2: Supabase Schema & Data Architecture
**Goal**: The database is the source of truth for all commercial operations — every downstream phase can read and write its data without schema changes
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07
**Success Criteria** (what must be TRUE):
  1. All 7 tables (integrations_catalog, packages, proposals, blog_posts, authority_maps, chatbot_sessions, press_releases) exist in Supabase with correct columns and types
  2. Row Level Security is enabled on every new table — a request without a valid service-role key cannot read or write any row
  3. The integrations_catalog table is seeded with all known Tier 1, Tier 2, and Tier 3 tools so that a lookup by tool name returns tier classification and pricing
  4. The packages table is seeded with Bronze, Silver, Gold, Core, and Legacy Add-On definitions including all slot counts and pricing
  5. Edge function scaffolds (generate-proposal, send-proposal-email, create-crm-deal) are deployed and return a non-error response when invoked
**Plans**: 6 plans

Plans:
- [ ] 02-01-PLAN.md — Migration files 004–007: integrations_catalog, packages, proposals, blog_posts tables + RLS
- [ ] 02-02-PLAN.md — Migration files 008–010: authority_maps, chatbot_sessions, press_releases tables + RLS + FK patch
- [ ] 02-03-PLAN.md — Seed migration files 011–012: 40+ integrations catalog rows + 6 package definitions
- [ ] 02-04-PLAN.md — Edge function scaffolds: generate-proposal, send-proposal-email, create-crm-deal (Deno TS)
- [ ] 02-05-PLAN.md — Apply all migrations to live Supabase + verify tables, RLS, seed data, FK constraint
- [ ] 02-06-PLAN.md — Deploy edge functions to Supabase + verify 200 responses + human dashboard confirmation

### Phase 3: Integration Catalog & Pricing Engine
**Goal**: The pricing engine is a reliable, tested TypeScript library that can classify any tool and calculate an accurate proposal cost without human input
**Depends on**: Phase 2
**Requirements**: PRICE-01, PRICE-02, PRICE-03, PRICE-04
**Success Criteria** (what must be TRUE):
  1. `lib/integrations/catalog.ts` classifies any named tool as Tier 1, Tier 2, or Tier 3 and returns its setup and monthly cost
  2. `lib/pricing/calculator.ts` returns a correct setup total and monthly total given any combination of integrations and package tier, including overage math when integration count exceeds slot count
  3. `lib/pricing/tier-selector.ts` returns the optimal tier recommendation given integration count, monthly lead volume, selected goals, platform type, and location count
  4. All unit tests pass: slot logic, overage calculation, tier recommendation edge cases (10+ integrations → Core, no tools → Bronze, enterprise stack → Core)
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md — Types + Integration catalog: lib/pricing/types.ts + lib/integrations/catalog.ts (53-entry static catalog)
- [ ] 03-02-PLAN.md — Pricing calculator + tier selector: lib/pricing/calculator.ts + lib/pricing/tier-selector.ts
- [ ] 03-03-PLAN.md — Vitest setup + unit tests: vitest.config.ts + calculator.test.ts + tier-selector.test.ts (20+ test cases)

### Phase 4: Agentic Intake Agent
**Goal**: A prospect who visits /get-started can complete the entire qualification and receive a personalized proposal — with no human involvement from ASC
**Depends on**: Phase 3
**Requirements**: INTAKE-01, INTAKE-02, INTAKE-03, INTAKE-04, INTAKE-05, INTAKE-06, INTAKE-07, INTAKE-08, INTAKE-09
**Success Criteria** (what must be TRUE):
  1. Prospect can complete the multi-step conversational intake at `/get-started` from business context through stack discovery to goal selection without any page reloads
  2. A prospect on Shopify, Wix, Squarespace, or WordPress receives the legacy platform warning and is offered the Legacy Add-On path or Migration path before seeing pricing
  3. The agent detects each named tool, classifies it against the integration catalog, and presents the classification as part of the proposal
  4. A complete proposal (tier, setup total, monthly total, integration line items) is generated and displayed in-chat as a formatted card at the end of the conversation
  5. The proposal is stored in the Supabase proposals table, a PDF is delivered to the prospect's email via Resend, and a CRM webhook fires to create a contact and deal
  6. The 48-hour follow-up sequence is triggered if no strategy call is booked after proposal delivery
  7. No LLM provider is hardcoded — all AI calls resolve the provider from the MODEL_PROVIDER environment variable
**Plans**: 5 plans

Plans:
- [x] 04-01-PLAN.md — Install packages (ai, @ai-sdk/anthropic, @ai-sdk/openai, zod, @react-pdf/renderer) + lib/intake/types.ts + lib/intake/model.ts + lib/intake/tools.ts
- [x] 04-02-PLAN.md — app/api/intake/chat/route.ts — streaming intake agent API route with 6-step system prompt + 5 tools
- [x] 04-03-PLAN.md — app/(marketing)/get-started/page.tsx — conversational intake UI using useChat + Phase 1 components
- [x] 04-04-PLAN.md — Supabase edge functions: implement generate-proposal + send-proposal-email (Phase 2 scaffolds)
- [x] 04-05-PLAN.md — app/api/intake/pdf/route.ts + app/api/intake/followup/route.ts + vercel.json cron + .env.local.example

### Phase 5: Topical Authority Map Agent
**Goal**: ASC can automatically deliver a monthly content calendar per client without manual research — clients approve before any content is produced
**Depends on**: Phase 4
**Requirements**: AUTHMAP-01, AUTHMAP-02, AUTHMAP-03, AUTHMAP-04
**Success Criteria** (what must be TRUE):
  1. Calling `POST /api/authority-map/generate` with a clientId and industry produces a ranked JSON authority map identifying content gaps and citation opportunities
  2. The authority map JSON is persisted in the Supabase authority_maps table with correct client_id and month fields
  3. The generation job fires automatically on the first Monday of each month via a Vercel Cron configuration with no manual trigger required
  4. The client receives an email with an approve/modify link and the content calendar is not locked until the link is actioned
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — TypeScript contracts + Gemini research pipeline: lib/authority-map/types.ts + lib/authority-map/researcher.ts
- [x] 05-02-PLAN.md — API routes + cron + config: generate, approve, cron routes + vercel.json + .env.example

### Phase 6: Insight Post Production Pipeline
**Goal**: A single API call can orchestrate the full insight post production cycle — AI-generated 2000-word article, images with embedded JSON-LD metadata, Remotion video + WebVTT CC, interlinked schema, Strapi CMS publish, and video sitemap — with a 1.5-day automated publishing cadence to maintain SEO/AEO/GEO health
**Depends on**: Phase 5
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06
**Success Criteria** (what must be TRUE):
  1. `lib/insights/image-pipeline.ts` generates N images per post: Image 1 = Remotion still frame with XMP JSON-LD metadata embedded in the PNG; Images 2–N are 1200×630 brand PNGs also with XMP metadata
  2. `lib/insights/video-pipeline.ts` triggers a Remotion render of BlogSummaryVideo.tsx and produces a VideoObject JSON-LD block with full transcript + WebVTT closed caption track
  3. `lib/insights/schema-assembler.ts` produces a single interlinked JSON-LD graph (Article + Person + FAQPage + HowTo + ImageObject[] + VideoObject) with all nodes linked via @id and minimum 3 peer paper citations
  4. `lib/insights/draft-generator.ts` uses getIntakeModel() to generate ≥ 2000-word Answer-First articles with contextually relevant CTA to one ASC service
  5. `POST /api/insights/generate` orchestrates the full pipeline end-to-end and publishes the completed post to Strapi v5 via REST API
  6. `GET /api/insights/publish` runs on a daily Vercel Cron (6 AM UTC) with a 36-hour throttle — ensures one new post every 1.5 days without over-publishing penalties
  7. `GET /video-sitemap.xml` exposes all insight post videos to Google Video Search with full transcript in video:transcript
**Plans**: 4 plans

Plans:
- [x] 06-01-PLAN.md — TypeScript contracts + image pipeline (sharp+XMP) + video pipeline (Remotion still+WebVTT): lib/insights/types.ts, lib/insights/image-pipeline.ts, lib/insights/video-pipeline.ts
- [x] 06-02-PLAN.md — Schema assembler + orchestration route + monthly batch cron: lib/insights/schema-assembler.ts, app/api/insights/generate/route.ts, app/api/insights/cron/route.ts, vercel.json, .env.example
- [x] 06-03-PLAN.md — Google video sitemap + robots.txt: app/video-sitemap.xml/route.ts
- [x] 06-04-PLAN.md — AI draft generator + 1.5-day publishing cron: lib/insights/draft-generator.ts, app/api/insights/publish/route.ts, vercel.json update

### Phase 7: Press Release Engine
**Goal**: ASC can produce a complete, compliant, wire-ready press release with video sidecar from a single topic input — meeting AI transparency law requirements automatically
**Depends on**: Phase 6
**Requirements**: PR-01, PR-02, PR-03, PR-04
**Success Criteria** (what must be TRUE):
  1. `POST /api/press-release/generate` returns a 300–500 word draft in inverted pyramid format from a topic or news event input
  2. Every generated press release includes a NewsArticle schema block and an AB 2013 / SB 942 AI transparency label — both present without manual addition
  3. A 60-second Remotion video sidecar with VideoObject JSON-LD is generated alongside the press release draft
  4. The press release can be submitted to at least one configured wire service (Business Wire, PR Newswire, EIN Presswire, or AccessWire) via the distribution integration
**Plans**: 5 plans

Plans:
- [ ] 07-01-PLAN.md — TypeScript contracts + Supabase migration 011: lib/press-release/types.ts, supabase/migrations/011_press_releases.sql
- [ ] 07-02-PLAN.md — Draft generator + compliance module: lib/press-release/draft-generator.ts, lib/press-release/compliance.ts
- [ ] 07-03-PLAN.md — Schema builder + media pipeline: lib/press-release/schema-builder.ts, lib/press-release/media-pipeline.ts
- [ ] 07-04-PLAN.md — Researcher + 4 wire adapters + distributor: lib/press-release/researcher.ts, lib/press-release/wire-adapters/*.ts, lib/press-release/distributor.ts
- [ ] 07-05-PLAN.md — API route orchestration + env vars: app/api/press-release/generate/route.ts, .env.example

### Phase 8: Site Chatbot Module
**Goal**: ASC can deploy a fully functional, CRM-connected chatbot on any client site — including Shopify — via a single script tag, with multi-channel delivery tied to package tier
**Depends on**: Phase 3
**Requirements**: CHAT-01, CHAT-02, CHAT-03, CHAT-04, CHAT-05
**Success Criteria** (what must be TRUE):
  1. Adding `<script src="/chatbot-embed.js" data-client-id="[id]">` to any HTML page loads and activates the ChatWidget without additional configuration
  2. The chatbot executes all 5 tool actions (bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus) without error when triggered in conversation
  3. A chatbot connected to any of the 10 supported CRMs creates a contact and logs the interaction via the adapter pattern without code changes to the core widget
  4. Every chatbot session is persisted in the Supabase chatbot_sessions table with messages, channel, and outcome recorded
  5. A Gold-tier client's chatbot operates across Web, SMS (Twilio/Vonage), Voice (Bland.ai/Vapi), and WhatsApp (360dialog) — channel availability enforced by package tier
**Plans**: 6 plans

Plans:
- [ ] 08-01-PLAN.md — TypeScript contracts + getChatModel() + embedder + RAG retriever: lib/chatbot/types.ts, lib/chatbot/model.ts, lib/chatbot/embedder.ts, lib/chatbot/retriever.ts
- [ ] 08-02-PLAN.md — Supabase pgvector migration + knowledge seeder: supabase/migrations/014_chatbot_knowledge.sql, app/api/chatbot/[clientId]/seed/route.ts
- [ ] 08-03-PLAN.md — 5 tool definitions + 10 CRM adapters: lib/chatbot/tools.ts, lib/chatbot/crm-adapters/ (11 files)
- [ ] 08-04-PLAN.md — Streaming chatbot API route + session persistence: app/api/chatbot/[clientId]/route.ts
- [ ] 08-05-PLAN.md — Multi-channel delivery + tier enforcement: lib/chatbot/channel-router.ts, channels/*.ts, SMS/voice/WhatsApp routes
- [ ] 08-06-PLAN.md — ChatWidget.tsx + embed script + chatbot-widget page: components/chatbot/ChatWidget.tsx, public/chatbot-embed.js, app/chatbot-widget/page.tsx

### Phase 9: Package Pages & Marketing Site
**Goal**: A prospect who arrives at the ASC site can understand pricing, check their platform's compatibility, calculate their ROI, and reach the intake agent — all without talking to a human
**Depends on**: Phase 4, Phase 8
**Requirements**: PKG-01, PKG-02, PKG-03, PKG-04, PKG-05
**Success Criteria** (what must be TRUE):
  1. `/packages` renders a side-by-side comparison of all tiers (Bronze, Silver, Gold, Core, Legacy) with correct slot counts, pricing, and feature lists
  2. `/packages/[tier]` renders full detail for each individual tier with a working CTA to `/get-started`
  3. `/platform-check` tells a prospect whether their current platform can achieve full protocol compliance and what their ceiling is
  4. The ROI calculator component returns a projected return based on package selection and prospect-provided inputs (leads/month, close rate, average deal size)
  5. All new pages include valid JSON-LD (Service, FAQPage, and/or HowTo schema) that passes schema.org validation
**Plans**: TBD

### Phase 10: Vercel MCP Server & Protocol Stack
**Goal**: AI agents can call ASC's own tools via MCP, and every /.well-known/* protocol route is dynamically generated rather than served from a static file
**Depends on**: Phase 6, Phase 7
**Requirements**: MCP-01, MCP-02, MCP-03, MCP-04
**Success Criteria** (what must be TRUE):
  1. An MCP client connected to `app/api/asc/[transport]` can successfully call all 6 tools (generateAuthorityMap, createBlogPost, generateSchemaMarkup, runProtocolCheck, calculateProposal, generatePressRelease) and receive valid responses
  2. `GET /.well-known/ucp`, `/.well-known/acp`, and `/.well-known/ap2` all return dynamically generated content via the artifact generator — not static files
  3. `lib/protocols/acp-adapter.ts` is scaffolded with the ACP checkout adapter interface (cart create, line-item update, finalize) and compiles without TypeScript errors
  4. `lib/protocols/ap2-mandate.ts` is scaffolded with the AP2 mandate service interface (intent mandate, cart mandate signing, verifiable credentials) and compiles without TypeScript errors
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in sequence: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
Note: Phase 8 depends on Phase 3 (not Phase 7) — can begin after Phase 3 completes.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System & UI Foundation | 2/2 | Complete | 2026-03-02 |
| 2. Supabase Schema & Data Architecture | 4/6 | In Progress|  |
| 3. Integration Catalog & Pricing Engine | 3/3 | Complete   | 2026-03-02 |
| 4. Agentic Intake Agent | 5/5 | Complete    | 2026-03-03 |
| 5. Topical Authority Map Agent | 2/2 | Complete   | 2026-03-03 |
| 6. Blog Post Production Pipeline | 4/4 | Complete   | 2026-03-03 |
| 7. Press Release Engine | 5/5 | Complete   | 2026-03-03 |
| 8. Site Chatbot Module | 6/6 | Complete   | 2026-03-03 |
| 9. Package Pages & Marketing Site | 0/? | Not started | - |
| 10. Vercel MCP Server & Protocol Stack | 0/? | Not started | - |

---
*Roadmap created: 2026-03-02 — Milestone v1.0 — 42 requirements across 10 phases*
*Phase 1 planned: 2026-03-02 — 2 plans*
*Phase 2 planned: 2026-03-02 — 6 plans*
*Phase 3 planned: 2026-03-02 — 3 plans*
*Phase 4 planned: 2026-03-02 — 5 plans*
*Phase 5 planned: 2026-03-03 — 2 plans*
*Phase 6 planned: 2026-03-03 — 2 plans*
*Phase 7 planned: 2026-03-03 — 5 plans*
*Phase 8 planned: 2026-03-03 — 6 plans*
