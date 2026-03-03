---
phase: 06-blog-post-production-pipeline
plan: "04"
subsystem: api
tags: [ai-generation, draft-generator, publish-cron, throttle, vercel-cron, blog-pipeline, typescript]

# Dependency graph
requires:
  - phase: 06-02
    provides: app/api/insights/generate/route.ts (pipeline orchestrator), BlogClientConfig
  - phase: 06-01
    provides: lib/insights/types.ts (AuthorityMapTopic, ImagePipelineResult, etc.)
  - phase: 04-agentic-intake-agent
    provides: lib/intake/model.ts (getIntakeModel — MODEL_PROVIDER routing)
  - phase: 05-topical-authority-map-agent
    provides: lib/authority-map/types.ts (AuthorityMapTopic interface), authority_maps Supabase table

provides:
  - lib/insights/draft-generator.ts — generateDraft(topic, authorName, siteUrl) -> DraftResult with 2000+ word Answer-First article, FAQ, and service CTA
  - app/api/insights/publish/route.ts — GET cron handler with 36h throttle, topic deduplication, internal generate call
  - vercel.json — 4th cron entry /api/insights/publish at "0 6 * * *"
  - app/api/insights/generate/route.ts — content field now uses generateDraft() (not stub)

affects:
  - All future blog posts now use AI-generated 2000+ word content instead of placeholder text

# Tech tracking
tech-stack:
  added: []
  patterns:
    - generateText from Vercel AI SDK with getIntakeModel() — never hardcode LLM provider (MODEL_PROVIDER env var)
    - maxOutputTokens (not maxTokens) — ai@6 parameter name for token limit in generateText
    - resolveCta() pure keyword regex matching — 6 paths covering all ASC services, deterministic, zero latency
    - 36h throttle as hardcoded PUBLISH_INTERVAL_MS constant — not configurable to prevent SEO cadence mistakes
    - Per-client slug deduplication via Set<string> from blog_posts — never republish same topic

key-files:
  created:
    - lib/insights/draft-generator.ts
    - app/api/insights/publish/route.ts
  modified:
    - vercel.json (added 4th cron entry)
    - app/api/insights/generate/route.ts (replaced content stub with generateDraft call)

key-decisions:
  - "maxOutputTokens (not maxTokens) — ai@6 renamed the token limit param; maxTokens is ai@3/v4; auto-fixed Rule 1"
  - "resolveCta() uses regex keyword matching on topic title + targetQueries — pure function, zero API cost, deterministic; 6 paths cover all ASC services with default fallback to /get-started"
  - "PUBLISH_INTERVAL_MS = 36 * 60 * 60 * 1000 hardcoded constant — not configurable per-client; prevents cadence mistakes that would trigger search engine over-publishing penalties"
  - "Per-client throttle check — each client in INSIGHTS_CLIENTS has its own 36h clock independent of other clients"
  - "Topic deduplication via slug comparison against blog_posts — idempotent, prevents re-publishing same topic twice"
  - "Internal fetch to /api/insights/generate reuses full 7-stage pipeline (video + images + citations + schema + Supabase + Strapi)"

# Metrics
duration: 4min
completed: 2026-03-03
---

# Phase 06 Plan 04: AI Draft Generator and Daily Publish Cron Summary

**AI-powered 2000-word article generation using Vercel AI SDK + getIntakeModel(), with a daily 6 AM UTC cron enforcing a 36-hour minimum cadence between posts**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-03T03:30:00Z
- **Completed:** 2026-03-03T03:34:30Z
- **Tasks:** 3
- **Files modified:** 4 (2 created + 2 modified)

## Accomplishments

- `generateDraft()` calls `getIntakeModel()` (MODEL_PROVIDER routing) then `generateText()` from Vercel AI SDK — produces 2000+ word Answer-First article with FAQ section and service-specific CTA
- `resolveCta()` pure keyword regex function maps topic title + targetQueries to one of 6 ASC service paths (UCP, ACP, AP2, AEO, token/protocol-checker, or default assessment)
- `buildPrompt()` constructs structured prompt with HowTo step inclusion conditional on `recommendedSchemaTypes.includes('HowTo')` — not default
- Publish cron GET handler: CRON_SECRET auth, INSIGHTS_CLIENTS JSON parse, per-client 36h throttle against `blog_posts.created_at DESC`, topic deduplication via slug Set, internal fetch to `/api/insights/generate`
- vercel.json has 4 cron entries — intake/followup (daily 9 AM), authority-map/cron (first Monday), insights/cron (second Monday), insights/publish (daily 6 AM)
- generate/route.ts content field replaced: stub placeholder → `await generateDraft(topic, authorName, siteUrl)` — all new blog posts are AI-generated 2000+ word articles

## Task Commits

Each task was committed atomically:

1. **Task 1: lib/insights/draft-generator.ts** - `5d294dc` (feat)
2. **Task 2: app/api/insights/publish/route.ts** - `2e0638b` (feat)
3. **Task 3: vercel.json + generate/route.ts** - `dfbcf44` (feat)

## Files Created/Modified

- `lib/insights/draft-generator.ts` — generateDraft(), resolveCta(), DraftResult, CtaService exports; Answer-First prompt with FAQ + conditional HowTo + service CTA; maxOutputTokens: 4096
- `app/api/insights/publish/route.ts` — GET cron handler: PUBLISH_INTERVAL_MS = 36h constant, per-client throttle, slug deduplication, sequential client loop, internal generate fetch
- `vercel.json` — added 4th cron: `/api/insights/publish` at `"0 6 * * *"` (daily 6 AM UTC)
- `app/api/insights/generate/route.ts` — added `generateDraft` import; replaced content stub with `const draft = await generateDraft(topic, authorName, siteUrl); const content = draft.content`

## Decisions Made

- `maxOutputTokens` not `maxTokens` — ai@6 renamed this parameter; the plan used the v3/v4 name; auto-fixed as Rule 1 (bug)
- `resolveCta()` regex keyword matching — deterministic, zero latency, covers all 6 ASC service paths with sensible default
- PUBLISH_INTERVAL_MS hardcoded as constant — not an env var; changing the publishing cadence is a deliberate decision, not a config toggle
- Topic deduplication uses slug comparison (not UUID) — slugs are derived from title; same title = same slug = idempotent

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] maxTokens → maxOutputTokens in generateText call**
- **Found during:** Task 1 — TypeScript check
- **Issue:** Plan specified `maxTokens: 4096` but ai@6 renamed this parameter to `maxOutputTokens`; TypeScript error TS2353 on first compile
- **Fix:** Changed `maxTokens: 4096` to `maxOutputTokens: 4096` in the generateText options object
- **Files modified:** `lib/insights/draft-generator.ts`
- **Commit:** `5d294dc` (included in same Task 1 commit after fix)

## Issues Encountered

One TypeScript error caught on first compile — auto-fixed immediately. No other issues.

## Next Phase Readiness

- Blog production pipeline (Phase 6) is now complete — all 4 plans done
- Daily cron will publish one AI-generated article every 36+ hours once INSIGHTS_CLIENTS + SUPABASE_SERVICE_ROLE_KEY are set in Vercel env
- MODEL_PROVIDER env var routes to Anthropic, OpenAI, or Google Gemini — no code changes needed to switch providers
- All 7 pipeline stages active: video + images + citations + schema + Supabase + Strapi + AI content generation

---
*Phase: 06-blog-post-production-pipeline*
*Completed: 2026-03-03*

## Self-Check: PASSED
- lib/insights/draft-generator.ts: FOUND
- app/api/insights/publish/route.ts: FOUND
- vercel.json: FOUND
- .planning/phases/06-blog-post-production-pipeline/06-04-SUMMARY.md: FOUND
- Commit 5d294dc: FOUND
- Commit 2e0638b: FOUND
- Commit dfbcf44: FOUND
- vercel.json has /api/insights/publish at "0 6 * * *": FOUND
- generate/route.ts calls await generateDraft: FOUND
