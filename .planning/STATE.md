---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: in-progress
last_updated: "2026-03-03T13:05:08.000Z"
progress:
  total_phases: 9
  completed_phases: 8
  total_plans: 37
  completed_plans: 36
---

# GSD State — ASC Commercial Platform

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-02)

**Core value:** Every prospect gets an instant, accurate, branded proposal — no sales calls required to qualify.
**Current focus:** Phase 9 — Package Pages & Marketing Site. Plans 01-03 complete, 1 remaining.

## Current Position

Phase: 9 of 10 (Package Pages & Marketing Site) — IN PROGRESS
Plan: 3 of 4 completed
Status: 09-03 complete — /platform-check interactive compliance checker page + PlatformCheckTool client component. Ready for Plan 09-04.
Last activity: 2026-03-03 — Plan 09-03 complete

Progress: [█████████████████░] 97%

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
| Phase 05-topical-authority-map-agent P02 | 3 | 2 tasks | 5 files |
| Phase 06 P03 | 2 | 1 tasks | 2 files |
| Phase 07 P01 | 5 | 2 tasks | 2 files |
| Phase 07-press-release-engine P05 | 3 | 4 tasks | 5 files |
| Phase 08-site-chatbot-module P01 | 2 | 2 tasks | 4 files |
| Phase 08-site-chatbot-module P02 | 2 | 2 tasks | 2 files |
| Phase 08-site-chatbot-module P03 | 3 | 2 tasks | 12 files |
| Phase 08-site-chatbot-module P04 | 1 | 1 tasks | 1 files |
| Phase 08-site-chatbot-module P05 | 2 | 2 tasks | 7 files |
| Phase 09-package-pages-marketing-site P01 | 3 | 2 tasks | 2 files |
| Phase 09-package-pages-marketing-site P02 | 6 | 2 tasks | 3 files |
| Phase 09-package-pages-marketing-site P03 | 5 | 2 tasks | 2 files |

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

### Phase 5 Progress (05-01 + 05-02 complete — PHASE DONE)
- lib/authority-map/types.ts: AuthorityMapTopic, AuthorityMapResult, ClientConfig — all typed interfaces, no any
- lib/authority-map/researcher.ts: generateAuthorityMap(config) — dual-provider: NOTEBOOKLM_MCP_URL → NotebookLM MCP via @ai-sdk/mcp experimental_createMCPClient (SSE); else Gemini 2.0 Flash + google.tools.googleSearch({})
- RESEARCHER_SYSTEM_PROMPT + NOTEBOOKLM_SYSTEM_PROMPT exported as named const strings
- generateWithNotebookLM reuses getIntakeModel() from Phase 4 — MODEL_PROVIDER env var honored
- @ai-sdk/mcp@1.0.23 installed — MCP client was extracted from ai main package in ai@6
- parseTopicsFromResponse: strips markdown fences, parses JSON, throws descriptive error
- app/api/authority-map/generate/route.ts: POST — Zod validation → generateAuthorityMap → Supabase upsert (merge-duplicates) → branded Resend approval email (top-5 topics HTML table + Approve button)
- app/api/authority-map/approve/route.ts: GET — fetch row → idempotent approved_at PATCH → HTML confirmation page
- app/api/authority-map/cron/route.ts: GET — CRON_SECRET auth → AUTHORITY_MAP_CLIENTS JSON parse → sequential per-client researcher + Supabase + Resend loop → { processed, errors }
- vercel.json: added /api/authority-map/cron at "0 9 1-7 * 1" (first Monday of month, 9 AM UTC) alongside existing daily followup cron
- .env.example: Phase 5 block — AUTHORITY_MAP_CLIENTS (required JSON array), NOTEBOOKLM_MCP_URL (commented, optional)

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

### Phase 6 Progress (06-01 + 06-02 + 06-03 + 06-04 complete — PHASE DONE)
- lib/insights/types.ts: 9 TypeScript interfaces — Citation, ImagePipelineInput/Result, VideoPipelineInput/Result, CaptionTrack, SchemaAssemblerInput, InsightPost, BlogClientConfig
- lib/insights/image-pipeline.ts: generateImages(input, stillFramePath?) — sharp PNG creation with XMP JSON-LD embedding, brand-navy stubs, deterministic filenames
- lib/insights/video-pipeline.ts: generateVideo(input) — Remotion CLI spawn (render + still), WebVTT CC generation (5-sec cues), VideoObject JSON-LD with full transcript + hasPart caption
- sharp installed as dependency (package.json updated)
- WriteableMetadataWithXmp interface extends sharp WriteableMetadata — runtime supports xmp, TS types don't
- lib/insights/schema-assembler.ts: assembleSchema() — interlinked @graph (BlogPosting + Person + ImageObject[] + VideoObject + FAQPage + BreadcrumbList + conditional HowTo); Article.citation[] min 3 peer papers
- app/api/insights/generate/route.ts: POST — Zod validation → video → images → resolveCitations() → assembleSchema → Supabase insert (merge-duplicates) → Strapi publish (non-fatal)
- app/api/insights/cron/route.ts: GET — CRON_SECRET auth → INSIGHTS_CLIENTS parse → Supabase authority_maps query (approved + current month) → sequential per-topic generate calls
- vercel.json: 3 cron entries — intake/followup (daily), authority-map/cron (first Monday), insights/cron (second Monday 0 10 8-14 * 1)
- .env.example: Phase 6 block — STRAPI_URL, STRAPI_API_TOKEN, INSIGHTS_CLIENTS, INSIGHTS_IMAGES_BASE_URL
- app/video-sitemap.xml/route.ts: GET handler — Node.js runtime, queries Supabase blog_posts for VideoObject in schema_json, emits Google Video Sitemap XML with transcript + integer-second duration
- parseDurationSeconds() converts ISO 8601 duration to integer seconds — Google video sitemap spec requires integer not ISO 8601
- findVideoObject() searches schema_json array by @type — position-independent, resilient to schema ordering changes
- public/robots.txt updated with Sitemap: .../video-sitemap.xml line
- lib/insights/draft-generator.ts: generateDraft(topic, authorName, siteUrl) → DraftResult; uses getIntakeModel() + generateText() from Vercel AI SDK; maxOutputTokens: 4096 (ai@6 param)
- resolveCta(): 6 regex-keyword paths (ucp/acp/ap2/aeo/token/default) → CtaService; pure function, zero API cost
- app/api/insights/publish/route.ts: GET daily cron — PUBLISH_INTERVAL_MS = 36h constant; per-client throttle; slug deduplication; internal /api/insights/generate fetch
- vercel.json: 4th cron — /api/insights/publish at "0 6 * * *" (daily 6 AM UTC)
- generate/route.ts content field: stub replaced with await generateDraft(topic, authorName, siteUrl)

### Key Decisions
- No --color-navy CSS var; used --color-text + --color-accent from globals.css design tokens (09-01)
- lib/data/packages.ts is fully independent from lib/integrations/catalog.ts — separate purposes, no cross-imports (09-01)
- searchParams toggle (?view=setup/monthly) instead of client-side useState — keeps /packages as pure server component with export metadata (09-02)
- gitignore **/packages/ negation via !/app/ + !/app/** — same pattern as existing lib/ and supabase/ fixes (09-02)
- getBadgeVariant() maps shopify-starter/shopify-growth to 'legacy' Badge variant — not in Badge variant union type (09-02)
- PlatformWarning without callback props (undefined) renders info-only without CTA buttons — server component compatibility (09-02)
- Server/client split: page.tsx is server component (exports metadata + JSON-LD), PlatformCheckTool.tsx is separate 'use client' component (useState for platform selection) — standard Next.js 14 pattern (09-03)
- complianceCell() maps ComplianceLevel to ComparisonTable cell: 'full'->true (green check), 'none'->false (red cross), others->descriptive string (09-03)
- PlatformWarning callbacks use window.location.href navigation — valid in client component, simpler than router for full page transitions (09-03)
- ROI denominator uses setup cost per plan formula: ((annualRevenueLift - annualCost) / setupCost) * 100 (09-01)
- body goes inside DefaultChatTransport not useChat — ai@6 UseChatOptions has no body field; HttpChatTransportInitOptions accepts body?: Resolvable<object> (08-06)
- iframe embed pattern (not web component) — works on Shopify without framework dependency, no CORS issues, no bundle needed on host page (08-06)
- Inline hex in embed.js (#4D8EC0, #1B2E4B) — globals.css not loaded on external pages; CSS vars only in ChatWidget.tsx (08-06)
- sessionId via useRef(crypto.randomUUID()) — stable for widget lifetime; passed in DefaultChatTransport body (08-06)
- slugToTier() derives tier from clientId prefix convention (e.g., 'gold-acme-xyz' → gold tier) — no Supabase query in Phase 8; Phase 9+ replaces with client-tier mapping table (08-05)
- stopWhen:stepCountIs(5) replaces maxSteps:5 in generateText() — ai@6 renamed/removed maxSteps; stopWhen is the correct api@6 parameter for step limiting (08-05)
- SMS 160-char truncation via text.slice(0, 160) enforced server-side — SMS protocol limit; fallback message used if text is empty after truncation (08-05)
- runtime='nodejs' not 'edge' in chatbot route — Supabase createClient + session upsert requires Node.js; intake/chat/route.ts uses edge because it has no Supabase writes (08-04)
- onFinish callback for persistSession — session written after stream completes; try/catch ensures session failure never blocks chat response (08-04)
- TypedToolCall input is unknown not Record<string,unknown> in ai@6 onFinish — cast to Record<string,unknown> only at JSONB storage boundary (08-04)
- vector(768) matches Google text-embedding-004 native output — same VECTOR_DIMENSIONS constant as embedder.ts; migration 014 uses vector(768) (08-02)
- IVFFlat lists=100 for pgvector ANN — appropriate default for tables under 1M rows per pgvector docs (08-02)
- RLS service_role_all on chatbot_knowledge — knowledge base never public-readable, service role only (08-02)
- CHATBOT_SEED_SECRET optional auth on seed route — skipped if env var absent for dev; enforced in production (08-02)
- SHA-256 dedup pre-check before embed() call — avoids wasteful Google AI API calls for already-known chunks (08-02)
- getCRMAdapter() returns null for unknown types — caller handles null with graceful { success: false, error } to LLM; no throw on unknown CRM type (08-03)
- Salesforce adapter deferred to TODO(v2) OAuth2 stub — complex OAuth client credentials flow deferred per plan spec; stub returns descriptive error (08-03)
- bookAppointment returns static Calendly URL stub — CALENDLY_API_KEY integration deferred per CONTEXT.md; real booking v2 TODO (08-03)
- AbortController + setTimeout for 5s lookupOrderStatus fetch timeout — fetch has no native timeout, prevents hanging tool calls (08-03)
- Close CRM Lead+Contact model — Close uses Lead as top-level entity; createContact creates Lead with one contact, returns both dealId and contactId (08-03)
- getChatModel() uses gemini-2.5-flash-lite-preview-06-17 as Google default — lowest latency for real-time chat vs gemini-2.0-flash used by intake (08-01)
- VECTOR_DIMENSIONS=768 — Google text-embedding-004 natively outputs 768 dimensions; exported constant ensures migration 014 alignment (08-01)
- retrieveContext() graceful fallback — returns '' on missing env, embed error, or RPC error; chatbot operates without RAG (08-01)
- OpenAI fallback gpt-4o-mini (not gpt-4o) + Anthropic fallback claude-haiku-4-5-20251001 — cost-optimized fast models for real-time chat (08-01)
- Slug format {clientId}-{year}-{month}-{toSlug(headline)} — ensures uniqueness per client per month without requiring DB sequence (07-05)
- Research stage .catch(() => undefined) — non-fatal; pipeline continues without context if MCP unavailable (07-05)
- Supabase insert sets wire_results=[] initially; non-fatal PATCH updates after distribution — wire results in response even if PATCH fails (07-05)
- feed.json wireDistribution filters to submitted entries with URLs only — excludes skipped/error without URL to prevent malformed data (07-05)
- GENERATED MEDIA section added to llms.txt — DYNAMIC CONTENT FEEDS already present from prior session; no URL duplication (07-05)
- Double-fallback in researcher: MCP path in outer try/catch; AI path in inner try/catch; final catch returns graceful stub — researcher never throws (07-04)
- ADAPTERS registry in distributor.ts keyed by service name — unknown services return status: 'error' without throwing (07-04)
- Promise.allSettled (not Promise.all) in distribute() — one adapter failing does not block the other 3 (07-04)
- Default wireServices = ['einpresswire'] in distribute() — EIN Presswire free tier as safe default per CONTEXT.md (07-04)
- VideoObject.duration always 'PT60S' — never uses video.duration from pipeline (may be shorter for stub renders); PR-03 requires 60-second sidecar (07-03)
- body?: string added to PressReleaseSchemaInput — required for NewsArticle.description (200 chars) and FAQPage answer (300 chars); optional to avoid breaking callers without body (07-03)
- Synthetic AuthorityMapTopic rank=1, authorityGapScore=0, faqClusters=[] — minimal shape satisfying pipeline types; press releases don't come from authority map researcher (07-03)
- TODO(v2) for generateImages disk-path issue — generateImages hardcodes public/images/insights/; imagesBaseUrl controls public URL only; separate on disk deferred to v2 (07-03)
- FAQPage always included (not conditional) — 3 baseline Q&As required for Google Gemini AI Overviews indexing per PR-02 spec (07-03)
- wordCount counts headline + lead + body only — boilerplate and mediaContact are standard fixed blocks, word budget applies only to variable content (07-02)
- buildDateline() generates ATLANTA /EINPresswire/ format — default wire for all ASC drafts unless overridden downstream (07-02)
- parseResponse() throws descriptive error on invalid JSON — fail-fast prevents silent garbage data reaching Supabase (07-02)
- AI_TRANSPARENCY_HTML_COMMENT exported separately from AI_TRANSPARENCY_LABEL — HTML renderer needs comment token, API route needs label string; separate exports prevent coupling (07-02)
- fullText joins sections with '\n' + blank '' entries — matches industry wire text submission format (07-02)
- Migration named 013 not 011 — migrations 011/012 already used for seed data (integrations_catalog + packages) (07-01)
- wire_service column dropped via DO block — Phase 7 uses wire_results JSONB array (WireSubmitResult[]) not single text value (07-01)
- import type (never value import) from @/lib/insights/types — no runtime coupling between lib modules (07-01)
- headline + body columns added to migration 013 — migration 010 used title/draft_text which don't map to PressReleasePost interface (07-01)
- maxOutputTokens (not maxTokens) — ai@6 renamed this param; plan used v3/v4 name; auto-fixed Rule 1 (06-04)
- resolveCta() regex keyword matching — 6 paths covering all ASC services; pure function, zero latency, deterministic (06-04)
- PUBLISH_INTERVAL_MS = 36h hardcoded constant — not configurable; prevents SEO cadence mistakes (06-04)
- Per-client throttle — each INSIGHTS_CLIENTS entry has its own independent 36h publish clock (06-04)
- Topic deduplication via slug Set from blog_posts — idempotent; same title = same slug = never republished (06-04)
- runtime='nodejs' not 'edge' — Supabase REST fetch + large JSON parse for video sitemap exceeds edge memory limits (06-03)
- video:duration as integer seconds via parseDurationSeconds() — Google video sitemap XSD requires integer, not ISO 8601; parseDurationSeconds handles PT28S → 28 (06-03)
- findVideoObject() searches by @type not array index — position-independent, resilient to future schema_json ordering changes in assembleSchema() (06-03)
- description.slice(0, 2048) — Google video sitemap enforces 2048 char limit; silent truncation is correct behavior (06-03)
- Skip posts where contentUrl is empty — video sitemap entry without video:content_loc is invalid per Google spec (06-03)
- object spread as (img.jsonLd as object) — ImagePipelineResult.jsonLd typed as object; cast is safe for spread in TypeScript strict mode (06-02)
- resolveCitations() keyword matching — deterministic, zero latency, no external API; baseline citations guarantee min 3 always (06-02)
- Strapi publish non-fatal — site operates fully from Supabase; STRAPI_API_TOKEN missing in dev should not halt pipeline (06-02)
- Cron schedule 0 10 8-14 * 1 = second Monday of month at 10 AM UTC — days 8-14 is always second week, weekday=1 is Monday (06-02)
- HowTo schema conditional on recommendedSchemaTypes.includes('HowTo') — not default; researcher explicitly flags it (06-02)
- WriteableMetadataWithXmp extends sharp WriteableMetadata — runtime supports xmp Buffer but TS types lack field; local extension avoids any (06-01)
- generateImages is async (sharp API is async) — plan showed both sync/async versions; async required for PNG writes (06-01)
- Remotion render failures are graceful stubs — console.warn + continue; pipeline returns result shape regardless (06-01)
- WebVTT cues split into ~5-second intervals — better UX than single cue (06-01)
- sharp installed as regular dependency not devDependency — used at runtime in API routes and cron (06-01)
- parsed.error.issues not .errors — Zod v3 ZodError uses .issues property; .errors does not exist on the type (05-02)
- Cron route uses minimal email HTML (plain link), generate route has full branded template — keeps cron lean (05-02)
- Approve route is idempotent — returns already-approved page without double-patching (05-02)
- AUTHORITY_MAP_CLIENTS stored as JSON array string in single env var — avoids per-client env var proliferation (05-02)
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

### Phase 9 Progress (09-01, 09-02, 09-03 complete)
- lib/data/packages.ts: PackagePageData interface + PACKAGES array (6 tiers: bronze, silver, gold, core, shopify-starter, shopify-growth) + ComplianceLevel type + PlatformEntry interface + PLATFORM_MATRIX array (8 platforms)
- components/ROICalculator.tsx: 'use client' interactive calculator — 4 inputs (tier, leads/month, close rate, deal size) + 3 computed outputs (monthly lift, annual ROI %, payback months) + CTA to /get-started
- All pricing matches PRD Section 5 exactly; all compliance values match PRD Section 9 exactly
- PACKAGES and PLATFORM_MATRIX serve as single source of truth for all Phase 9 marketing pages
- app/(marketing)/packages/page.tsx: Server component comparison page — PricingTable (4 main tiers), ComparisonTable (12 feature rows), ROICalculator, searchParams-based price toggle, ItemList+FAQPage JSON-LD, sticky mobile CTA
- app/(marketing)/packages/[tier]/page.tsx: Dynamic tier detail page — generateStaticParams (6 slugs: bronze, silver, gold, core, shopify-starter, shopify-growth), generateMetadata per tier, hero pricing, What's Included, upgrade nudge ComparisonTable, PlatformWarning for isLegacy, FAQ, ROICalculator (non-core), Service+FAQPage+BreadcrumbList JSON-LD
- .gitignore: Added !/app/ + !/app/** negation for **/packages/ rule (NuGet/C# pattern blocked marketing route)
- app/(marketing)/platform-check/page.tsx: Server component with metadata, JSON-LD (SoftwareApplication + FAQPage + BreadcrumbList), renders PlatformCheckTool client component
- components/PlatformCheckTool.tsx: 'use client' interactive compliance checker — platform dropdown (8 platforms from PLATFORM_MATRIX), 7-row ComparisonTable compliance matrix, legacy penalty breakdown, PlatformWarning for legacy platforms, recommended package card, migration path CTA, link to /tools/protocol-checker

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

Last session: 2026-03-03T13:05:08Z
Stopped at: Completed 09-03-PLAN.md (all 2 tasks) — /platform-check page + PlatformCheckTool component. Phase 9 Plan 03 complete.
Resume file: None
