---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: unknown
last_updated: "2026-03-03T01:04:28Z"
progress:
  total_phases: 10
  completed_phases: 4
  total_plans: 18
  completed_plans: 17
---

# GSD State — ASC Commercial Platform

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-02)

**Core value:** Every prospect gets an instant, accurate, branded proposal — no sales calls required to qualify.
**Current focus:** Phase 5 — Topical Authority Map Agent. Plan 01 complete.

## Current Position

Phase: 5 of 10 (Topical Authority Map Agent) — IN PROGRESS
Plan: 1 of 2 completed
Status: Phase 5 plan 01 complete
Last activity: 2026-03-03 — Completed 05-01 (types.ts contracts + researcher.ts dual-provider pipeline)

Progress: [████████░░] 45%

## Performance Metrics

**Velocity:**
- Total plans completed: 14
- Average duration: 2 min
- Total execution time: 0.2 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-design-system-ui-foundation | 1/2 | 4 min | 4 min |
| 02-supabase-schema-data-architecture | 4/6 | 2 min | 0.5 min |
| 03-integration-catalog-pricing-engine | 3/3 | 5 min | 1.7 min |
| 04-agentic-intake-agent | 5/5 | 8 min | 1.6 min |

**Recent Trend:**
- Last 5 plans: 03-02 (1 min), 04-01 (5 min), 04-03, 04-04, 04-05 (8 min)
- Trend: Phase 4 complete — intake agent, edge functions, PDF, cron all implemented
| Phase 04-agentic-intake-agent P05 | 2 | 2 tasks | 4 files |

## Accumulated Context

### ASCv2 Baseline (completed pre-milestone)
- 52 pages, TypeScript clean, committed to ASCv2 branch on GitHub
- Supabase tables live: contact_submissions, leads, newsletter_signups
- Remotion BlogSummaryVideo.tsx scaffolded (remotion/ — excluded from tsconfig)
- Strapi v5 live on VPS (http://72.60.127.124:1337)
- All /.well-known/ routes currently static (become dynamic in Phase 10)
- lib/schemas/* — full JSON-LD schema library in place

### Phase 1 Progress (01-01 complete)
- globals.css locked to light-mode-only (#f8faff base surface, all [data-theme="light"] blocks removed)
- lib/design-tokens.ts created with brand palette (navy=#1B2E4B, blue=#4D8EC0, blueLight=#85C1DF)
- components/ui/Button.tsx: 4 variants, 3 sizes, loading spinner, href-as-anchor
- components/ui/Card.tsx: default/glass variants, 4 padding sizes, polymorphic as prop
- components/ui/Badge.tsx: 14 variants (5 tier, 4 status, 3 protocol, 1 default/info)

### Phase 3 Progress (03-01, 03-02, 03-03 complete — PHASE DONE)
- lib/pricing/types.ts: 7 named TypeScript exports (IntegrationTier, CatalogEntry, IntegrationSelection, PackageDefinition, PricingResult, TierSelectorInput, TierRecommendation)
- lib/integrations/catalog.ts: CATALOG (53 entries: 20 T1 / 21 T2 / 12 T3), lookupIntegration(), ENTERPRISE_TOOLS, LEGACY_PLATFORMS, PACKAGES (6 packages)
- lib/pricing/calculator.ts: calculatePricing(packageSlug, integrations) → PricingResult, TIER_UNIT_COSTS export; Bronze + 4×T1 = $16,750/$3,650 confirmed
- lib/pricing/tier-selector.ts: selectTier(input) → TierRecommendation; 6-step priority chain (legacy → ERP → 10+ → zero → overrides → slot-fit)
- vitest.config.ts: Vitest configured with globals=true, node env, @/* alias; "test": "vitest run" in package.json
- lib/pricing/__tests__/calculator.test.ts: 9 tests — slot logic, overages, mixed tier, Core unlimited, empty integrations, unknown slug
- lib/pricing/__tests__/tier-selector.test.ts: 31 tests — all 4 LOCKED edge cases, ERP triggers, legacy platform routing, lead/location/tier overrides, slot-fit upgrades
- All 40 tests pass; npx tsc --noEmit exits 0

### Phase 2 Progress (02-01 through 02-04 complete)
- 004_integrations_catalog.sql: tier CHECK(1,2,3), setup_cost/monthly_cost NUMERIC(10,2), RLS
- 005_packages.sql: slug UNIQUE, tier1/2/3_slots, features_json JSONB, is_legacy_only, RLS
- 006_proposals.sql: integrations_detected/goals JSONB, status CHECK(6 values), RLS
- 007_blog_posts.sql: client_id TEXT (no FK), schema_json/images JSONB, UNIQUE(client_id,slug), RLS
- 008_authority_maps.sql: UNIQUE(client_id, month), topics_json JSONB, approved_at nullable, RLS
- 009_chatbot_sessions.sql: channel CHECK(web/sms/voice/whatsapp), messages JSONB, outcome CHECK, appointment_booked bool, RLS
- 010_press_releases.sql: wire_service CHECK(5), status CHECK(5), schema_json JSONB, RLS + idempotent FK patch fk_blog_posts_authority_map
- supabase/migrations/ is now git-tracked (fixed .gitignore **/*.sql issue)

### Phase 5 Progress (05-01 complete)
- lib/authority-map/types.ts: AuthorityMapTopic, AuthorityMapResult, ClientConfig — all typed interfaces, no any
- lib/authority-map/researcher.ts: generateAuthorityMap(config) — dual-provider: NOTEBOOKLM_MCP_URL → NotebookLM MCP via @ai-sdk/mcp experimental_createMCPClient (SSE); else Gemini 2.0 Flash + google.tools.googleSearch({})
- RESEARCHER_SYSTEM_PROMPT + NOTEBOOKLM_SYSTEM_PROMPT exported as named const strings
- generateWithNotebookLM reuses getIntakeModel() from Phase 4 — MODEL_PROVIDER env var honored
- @ai-sdk/mcp@1.0.23 installed — MCP client was extracted from ai main package in ai@6
- parseTopicsFromResponse: strips markdown fences, parses JSON, throws descriptive error

### Phase 4 Progress (04-01, 04-03, 04-04, 04-05 complete — PHASE DONE)
- lib/intake/types.ts: ProspectData, ProposalLineItem, ProposalData — shared contracts for all Phase 4 plans
- lib/intake/model.ts: getIntakeModel() — MODEL_PROVIDER routing (anthropic default / openai if set)
- lib/intake/tools.ts: 5 tools (lookupIntegration, detectPlatformTier, calculateProposal, generateProposalPDF, saveToCRM), intakeTools barrel export
- saveToCRMTool: single orchestration — generate-proposal → send-proposal-email → CRM webhook
- ai@6 API: uses inputSchema (not parameters), execute receives (input, options) not destructured args
- supabase/functions/generate-proposal/index.ts: full Deno implementation — validates 5 required fields, inserts 13 columns to proposals table via service role REST API, returns { success, proposal_id }
- supabase/functions/send-proposal-email/index.ts: full Deno implementation — branded HTML email with pricing summary + PDF CTA + strategy call CTA via Resend, returns { success, email_id }
- app/(marketing)/get-started/page.tsx: 'use client' intake chat UI using ai@6 useChat hook (DefaultChatTransport, UIMessage.parts[], DynamicToolUIPart); renders ChatBubble history, IntakeStep progress, PlatformWarning + ProposalCard from tool results; Book Strategy Call + Download PDF CTAs
- app/api/intake/pdf/route.tsx: Node.js runtime React-PDF route; branded proposal with header, prospect, pricing stats, integrations, tier reasoning, CTA, footer; returns { pdfUrl } as base64 data URI
- app/api/intake/followup/route.ts: Vercel Cron GET handler; queries proposals past 48h with followup_sent_at IS NULL; sends follow-up emails via send-proposal-email; PATCHes followup_sent_at (not status)
- vercel.json: cron entry /api/intake/followup at 0 9 * * * (daily 9 AM UTC)
- .env.local.example: documents 9 required Phase 4 env vars

### Key Decisions
- experimental_createMCPClient imported from @ai-sdk/mcp not ai — MCP client was extracted to separate package in ai@6 (05-01)
- google.tools.googleSearch({}) requires empty options object — ProviderToolFactory signature requires ARGS arg even if all fields optional (05-01)
- NOTEBOOKLM_SYSTEM_PROMPT is a separate named export from RESEARCHER_SYSTEM_PROMPT — identical content, distinct exports for clarity (05-01)
- @ai-sdk/mcp@1.0.23 added to package.json for NotebookLM MCP SSE transport (05-01)
- MODEL_PROVIDER env var (never hardcode LLM provider) — enforced in INTAKE-09
- Vercel AI SDK for all streaming + tool-calling (intake + chatbot)
- PDFKit or React-PDF for proposal generation (in-process, no external service)
- Phase 8 (Chatbot) depends on Phase 3, not Phase 7 — can run in parallel with 5-7
- Light mode only — deleted all [data-theme='light'] override blocks; @theme is permanent light defaults (01-01)
- Design tokens are CSS variable references, not hex values — single source of truth stays in globals.css (01-01)
- Button/Card/Badge delegate to existing globals.css utility classes — no duplicate CSS (01-01)
- blog_posts.authority_map_id has no FK constraint — authority_maps created in migration 008 (Plan 02); FK added post-creation to avoid ordering dependency (02-01)
- client_id in blog_posts is TEXT (not UUID FK) — no clients table yet, avoids premature FK dependency (02-01)
- supabase/migrations/*.sql now git-tracked via !/supabase/ negation in .gitignore (same pattern as existing !/lib/ fix) (02-01)
- Edge function scaffolds use deno.land/std@0.208.0 to match existing email-service for version consistency (02-04)
- CRM_WEBHOOK_URL commented out in create-crm-deal scaffold to avoid undefined behavior until Phase 4 implements the body (02-04)
- month stored as TEXT ('YYYY-MM') not DATE in authority_maps — simpler string comparison for monthly queries (02-02)
- channel and outcome use TEXT CHECK constraints not PostgreSQL ENUM — easier to extend without migration (02-02)
- FK from blog_posts.authority_map_id deferred to migration 010 via idempotent DO block — prevents creation order dependency (02-02)
- CATALOG keys are lowercase-normalized slugs; PACKAGES exported from catalog.ts not types.ts; ENTERPRISE_TOOLS uses display-name variants for intake form matching (03-01)
- Core package (slots=99) never generates overages in calculatePricing — unlimited slot guard routes all integrations to includedIntegrations (03-02)
- Legacy platform check is strictly FIRST in selectTier — Shopify/Wix/Squarespace/WordPress always route to legacy path regardless of integration count or ERP presence (03-02)
- Tests go directly to GREEN — no RED phase needed because source files existed from Plans 03-01/03-02; any future regression will be caught immediately (03-03)
- vitest.config.ts uses path.resolve(__dirname, '.') so @/* maps to project root, consistent with tsconfig.json paths convention (03-03)
- Test helper factories t1/t2/t3 and input() neutral-defaults pattern established for all future unit tests (03-03)
- ai@6 uses inputSchema (not parameters) in tool() — all intake tools use inputSchema pattern (04-01)
- ai@6 uses LanguageModel (not LanguageModelV1) — model.ts imports LanguageModel type (04-01)
- ai@6 execute() receives (input, options) not destructured params — all tools access input.fieldName (04-01)
- saveToCRMTool is single orchestration point for proposal delivery — avoids onFinish missing-fields bug (04-01)
- generate-proposal uses Prefer: return=representation to get proposal_id from insert without a second query (04-04)
- JSONB columns (integrations_detected, goals) serialized via JSON.stringify before Supabase REST insert (04-04)
- send-proposal-email branded HTML uses brand colors #1B2E4B + #4D8EC0 matching design tokens; proposal_delivery Resend tag for analytics (04-04)
- useChat from @ai-sdk/react not ai/react — ai@6 split the react hooks to a separate package (04-03)
- DefaultChatTransport({ api: '/api/intake/chat' }) required to set custom API endpoint in ai@6 (04-03)
- UIMessage.parts[] used for all message content — no message.content string or toolInvocations in ai@6 (04-03)
- Input state managed via local useState in ai@6 — useChat no longer returns input/handleInputChange (04-03)
- sendMessage({ text }) replaces append/handleSubmit pattern from ai v3/v4 (04-03)
- DynamicToolUIPart (type='dynamic-tool', state='output-available') used for tool result detection in ai@6 (04-03)
- PDF route uses .tsx extension for JSX syntax with @react-pdf/renderer; returns base64 data URI (no Vercel Blob needed for v1) (04-05)
- followup_sent_at TIMESTAMPTZ column used for re-send prevention — status column never patched to 'followed_up' (not in CHECK constraint) (04-05)
- CRON_SECRET auth is optional (if block) — allows local dev without secret, secured in Vercel production (04-05)

### Pending Todos
None yet.

### Blockers/Concerns
- Strapi admin account not yet created — needed for Phase 6 (blog publish)
- RESEND_API_KEY not yet set — needed for Phase 4 proposal email delivery (see .env.local.example)
- MODEL_PROVIDER + ANTHROPIC_API_KEY / OPENAI_API_KEY not yet set — needed for Phase 4 intake agent
- Vercel preview URL for ASCv2 branch not yet confirmed
- DNS: cms.adamsilvaconsulting.com A record not yet pointing to VPS
- Supabase proposals table migration (006_proposals.sql) must be applied before intake flow goes live

## Session Continuity

Last session: 2026-03-03T01:04:28Z
Stopped at: Completed 05-01-PLAN.md — AuthorityMapTopic/AuthorityMapResult/ClientConfig types + generateAuthorityMap dual-provider pipeline (NotebookLM MCP + Gemini fallback).
Resume file: None
