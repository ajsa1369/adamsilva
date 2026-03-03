# Phase 7: Press Release Engine — Context

**Gathered:** 2026-03-02
**Status:** Ready for planning
**Source:** PRD Express Path + live user decisions

<domain>
## Phase Boundary

Phase 7 delivers a complete, wire-ready press release production pipeline that mirrors the Phase 6 insight article pipeline. From a single topic or news event input, the system:
1. Drafts a 300–500 word press release (inverted pyramid format)
2. Applies NewsArticle JSON-LD schema + AI transparency labels automatically
3. Generates a configurable number of media files (images + 60-sec Remotion video sidecar)
4. Distributes to one or more wire services from a selectable list

The pipeline runs server-side via `POST /api/press-release/generate`, mirrors the stage-by-stage structure of `/api/insights/generate` (draft → media → schema → store → distribute), and uses `getIntakeModel()` for AI generation (MODEL_PROVIDER env routing — never hardcoded).

</domain>

<decisions>
## Implementation Decisions

### Draft Generator
- Format: **Inverted pyramid** — headline, dateline, lead (who/what/when/where/why), body quotes, boilerplate, media contact block
- Length: **300–500 words** (PR-01)
- AI via `getIntakeModel()` (Vercel AI SDK `generateText`) — same pattern as `lib/insights/draft-generator.ts`
- Output: `{ headline, dateline, body, boilerplate, mediaContact, wordCount }`
- File: `lib/press-release/draft-generator.ts`

### Compliance Module (PR-02)
- **NewsArticle JSON-LD** block applied at origin publication; must contain `author`, `publisher`, `datePublished`, `articleBody`
- **AI transparency label** required by AB 2013 (California) / SB 942: disclosure text injected into boilerplate section and as HTML comment in rendered output; label reads: "This press release was drafted with AI assistance. Content reviewed and approved by [Author Name]."
- File: `lib/press-release/compliance.ts`

### Schema Builder (PR-02)
- 5-node `@graph`: `NewsArticle` + `Organization` + `ImageObject[]` + `VideoObject` + `BreadcrumbList`
- `NewsArticle.isAccessibleForFree = true`; `archivedAt` linking to wire service URL after publish
- File: `lib/press-release/schema-builder.ts`

### Media Pipeline — Configurable Count (USER DECISION)
- **User can specify media count per request** (1–5 images + 1 optional video)
- Request body accepts `mediaOptions: { imageCount: 1 | 2 | 3 | 4 | 5, includeVideo: boolean }`
- Default: `{ imageCount: 2, includeVideo: true }` (matches insight pipeline defaults)
- Image 1 (if video included): Remotion still frame at frame 0 with XMP metadata
- Images 2–N: 1200×630 brand-navy (#1B2E4B) stub PNGs with XMP JSON-LD
- Video: 60-second Remotion composition (PR-03) → WebVTT captions → `public/captions/press-releases/[slug].vtt`
- Reuse `lib/insights/image-pipeline.ts` and `lib/insights/video-pipeline.ts` where possible; extend if needed
- `VideoObject` JSON-LD: `duration: "PT60S"`, `hasPart` caption track, full transcript
- Files: `lib/press-release/media-pipeline.ts` (thin orchestrator wrapping insights pipeline)

### Wire Service Distribution (PR-04) — USER DECISION: Multiple + Selectable
- **Multiple wire services supported** from a single request
- Request body accepts `wireServices: ('businesswire' | 'prnewswire' | 'einpresswire' | 'accesswire')[]`
- Default: `['einpresswire']` (cheapest / free tier)
- Each adapter: `submit(draft, media): Promise<WireSubmitResult>` (same interface)
- Adapters: `lib/press-release/wire-adapters/einpresswire.ts`, `businesswire.ts`, `prnewswire.ts`, `accesswire.ts`
- Results aggregated: `{ service, status, url?, error? }[]` — partial success is OK
- Env vars: `EINPRESSWIRE_API_KEY`, `BUSINESSWIRE_API_KEY`, `PRNEWSWIRE_API_KEY`, `ACCESSWIRE_API_KEY`
- File: `lib/press-release/distributor.ts` (calls adapters in parallel)

### NotebookLM MCP Integration (USER DECISION)
- Use `@google/notebooklm-mcp` (or equivalent MCP server) during **research phase** to gather source materials for press release context
- `lib/press-release/researcher.ts` — wraps NotebookLM MCP: creates a notebook, uploads topic context, generates summary → feeds into `draft-generator.ts`
- If NotebookLM MCP unavailable at runtime, falls back to AI summary of topic string alone (non-fatal)
- Research output stored in Supabase `press_releases.research_context` JSONB column

### API Route (PR-01, PR-02, PR-03, PR-04)
- `POST /api/press-release/generate`
- `runtime = 'nodejs'`; Zod-validated request body
- Pipeline stages (mirrors `/api/insights/generate`):
  1. `researcher.ts` — NotebookLM MCP context gathering (with fallback)
  2. `draft-generator.ts` — inverted pyramid draft
  3. `compliance.ts` — inject AI transparency label
  4. `media-pipeline.ts` — images (imageCount) + video (if includeVideo)
  5. `schema-builder.ts` — 5-node @graph
  6. Supabase upsert → `press_releases` table
  7. `distributor.ts` — submit to wireServices[] in parallel
- Response: `{ slug, headline, wireResults[], mediaFiles[], schema, complianceLabel }`
- File: `app/api/press-release/generate/route.ts`

### Supabase Table
- Table: `press_releases` (new, via migration)
- Columns: `id`, `slug`, `client_id`, `headline`, `body`, `compliance_label`, `schema_json JSONB`, `media_files JSONB`, `wire_results JSONB`, `research_context JSONB`, `created_at`
- RLS: service role only (server-side generation)

### Claude's Discretion
- Remotion composition for press releases: can reuse `BlogSummaryVideo` composition or create `PressReleaseVideo` variant — executor decides based on what fits within 60s
- Exact NotebookLM MCP server package name / availability — researcher wraps with try/catch fallback
- Slug generation: `${clientId}-${year}-${month}-${kebab(headline)}`
- Wire service API details: adapters scaffold with TODO comments where actual API credentials/endpoints are undocumented publicly; scaffold is complete enough to test with env vars set

</decisions>

<specifics>
## Specific Requirements from PRD

- PR-01: 300–500 word draft, inverted pyramid format, from topic/news event input
- PR-02: NewsArticle schema + AB 2013 / SB 942 AI transparency label — both automatic (no manual step)
- PR-03: 60-second Remotion video sidecar + VideoObject JSON-LD
- PR-04: Wire service distribution — configurable (Business Wire, PR Newswire, EIN Presswire, AccessWire)
- Package context: Bronze = 1 PR/mo, Silver = 2/mo, Gold = 4/mo, Shopify Growth Add-On = 2/mo

### Pipeline Similarity to Phase 6
The generate route must follow the same stage-by-stage pattern as `app/api/insights/generate/route.ts`:
- Same Zod validation pattern
- Same Supabase upsert pattern (service role key)
- Same Strapi publish (optional, non-fatal) if `NEXT_PUBLIC_STRAPI_URL` set
- Same `runtime = 'nodejs'` + Next.js App Router
- Same `getIntakeModel()` for AI generation
- Never import `anthropic` or `openai` directly

</specifics>

<deferred>
## Deferred Ideas

- Vercel Cron for scheduled press release generation (packages specify monthly count — cron scheduling deferred to Phase 10 MCP integration or future billing phase)
- Client approval email before wire submit (UI not built yet — deferred to Phase 9 client portal concept)
- Full wire service live API integration (adapters scaffolded; live credentials and exact API contracts deferred pending service account setup)

</deferred>

---

*Phase: 07-press-release-engine*
*Context gathered: 2026-03-02 via PRD Express Path + user decisions*
