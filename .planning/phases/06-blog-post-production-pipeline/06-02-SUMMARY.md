---
phase: 06-blog-post-production-pipeline
plan: "02"
subsystem: api
tags: [json-ld, schema-assembler, blog-pipeline, cron, strapi, supabase, typescript, vercel]

# Dependency graph
requires:
  - phase: 06-01
    provides: types.ts (Citation, SchemaAssemblerInput, ImagePipelineResult, VideoPipelineResult, BlogClientConfig), image-pipeline.ts, video-pipeline.ts
  - phase: 05-topical-authority-map-agent
    provides: AuthorityMapTopic interface, authority_maps Supabase table
  - phase: 03-integration-catalog-pricing-engine
    provides: lib/schemas/organization.ts (SITE_URL, ORG_ID, buildBreadcrumbSchema), lib/schemas/faq.ts (buildFAQSchema)

provides:
  - lib/insights/schema-assembler.ts — assembleSchema(input) -> object[] (@graph array with 5+ interlinked nodes)
  - app/api/insights/generate/route.ts — POST endpoint orchestrating full blog pipeline (video → images → citations → schema → Supabase → Strapi)
  - app/api/insights/cron/route.ts — GET Vercel Cron handler, second Monday of month (0 10 8-14 * 1)
  - vercel.json — updated with third cron entry for /api/insights/cron
  - .env.example — Phase 6 block documenting all 4 new env vars

affects:
  - 06-03 (content generation route imports assembleSchema and generate route as dependency)
  - 06-04 (publishing cron reuses BlogClientConfig + cron pattern established here)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Interlinked @graph JSON-LD pattern: all nodes linked via @id absolute URLs; Article.citation[] required for factual content
    - Non-fatal external publish: Strapi publish failure returns strapiId null + strapiError without 500
    - resolveCitations() keyword matching: topic title + targetQueries determine which peer papers to include
    - Sequential cron loop: per-client then per-topic to avoid memory pressure from parallel blog generation

key-files:
  created:
    - lib/insights/schema-assembler.ts
    - app/api/insights/generate/route.ts
    - app/api/insights/cron/route.ts
  modified:
    - vercel.json (added third cron entry)
    - .env.example (added Phase 6 block)

key-decisions:
  - "object spread as (img.jsonLd as object) avoids TypeScript strict-mode error — ImagePipelineResult.jsonLd typed as object (not any); cast to object for spread is valid"
  - "resolveCitations() uses topic title + targetQueries keyword matching rather than external API — deterministic, zero latency, no API key needed; v2 can upgrade to semantic search"
  - "Baseline citations (schema.org Article, Google Structured Data, W3C JSON-LD) always appended — guarantees minimum 3 even for obscure topics"
  - "Strapi publish non-fatal by design — site works fully via Supabase; Strapi is content management layer; missing token is common in dev and should not block the pipeline"
  - "vercel.json cron schedule 0 10 8-14 * 1 = second Monday of month at 10 AM UTC — days 8-14 guarantee second week, weekday=1 is Monday"
  - "HowTo schema conditional on recommendedSchemaTypes.includes('HowTo') — authority map researcher explicitly flags when HowTo is appropriate; not default"

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 06 Plan 02: Schema Assembler, Generate Route, and Blog Cron Summary

**Interlinked JSON-LD @graph assembler plus full pipeline orchestration POST route and second-Monday-of-month Vercel Cron handler for automated blog production**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-03T03:20:43Z
- **Completed:** 2026-03-03T03:23:46Z
- **Tasks:** 3
- **Files modified:** 5 (3 created + 2 modified)

## Accomplishments

- Schema assembler produces interlinked @graph with BlogPosting (Article + citation[]), Person, ImageObject[], VideoObject, FAQPage, BreadcrumbList, and conditional HowTo — all nodes linked via absolute @id URLs
- Article.citation[] always includes minimum 3 peer paper sources (schema.org, Google, W3C JSON-LD baseline) — keyword matching adds additional sources from W3C, arXiv, Google Search Central
- generate POST route orchestrates all 5 pipeline stages in order (video → images → citations → schema → Supabase insert → Strapi publish) with Zod validation and graceful Strapi failure
- cron route queries Supabase authority_maps for approved rows this month, calls generate per topic sequentially with CRON_SECRET auth
- vercel.json has 3 cron entries — intake followup (daily), authority-map (first Monday), insights (second Monday)
- .env.example Phase 6 block documents all 4 new env vars with inline descriptions

## Task Commits

Each task was committed atomically:

1. **Task 1: lib/insights/schema-assembler.ts** - `86a18eb` (feat)
2. **Task 2: app/api/insights/generate/route.ts** - `38dc3d5` (feat)
3. **Task 3: cron/route.ts + vercel.json + .env.example** - `c389bd0` (feat)

## Files Created/Modified

- `lib/insights/schema-assembler.ts` — assembleSchema() produces @graph array: Article + Person + ImageObject[] + VideoObject + FAQPage + BreadcrumbList + conditional HowTo
- `app/api/insights/generate/route.ts` — POST pipeline orchestrator with Zod validation, resolveCitations(), Supabase insert (merge-duplicates), non-fatal Strapi publish
- `app/api/insights/cron/route.ts` — GET cron handler: CRON_SECRET auth, INSIGHTS_CLIENTS parse, Supabase authority_maps query (approved + current month), sequential generate calls
- `vercel.json` — added third cron entry: /api/insights/cron at "0 10 8-14 * 1"
- `.env.example` — Phase 6 block: STRAPI_URL, STRAPI_API_TOKEN, INSIGHTS_CLIENTS, INSIGHTS_IMAGES_BASE_URL

## Decisions Made

- `object spread as (img.jsonLd as object)` — ImagePipelineResult.jsonLd is typed as `object` (not any); cast to `object` is safe for spread in TypeScript strict mode
- `resolveCitations()` uses keyword matching on topic title + targetQueries — deterministic, zero latency, no external API required; baseline citations guarantee minimum 3 always
- Strapi publish non-fatal — site operates fully from Supabase; Strapi is CMS layer; missing token in dev should not halt pipeline
- Cron schedule `0 10 8-14 * 1` = second Monday of each month at 10:00 UTC — days 8-14 is always second week, weekday=1 is Monday

## Deviations from Plan

None — plan executed exactly as written. All types matched existing lib/insights/types.ts contracts from Plan 01. No TypeScript errors required auto-fixing.

## Issues Encountered

None. Zero TypeScript errors on first pass. All imports resolved from Plan 01 exports.

## Next Phase Readiness

- assembleSchema() ready for Plan 03 (2000-word AI draft generation adds content field)
- POST /api/insights/generate ready to call with real topic data — returns { success, postId, strapiId, slug, imageCount }
- Cron ready to activate once INSIGHTS_CLIENTS and SUPABASE_SERVICE_ROLE_KEY are set in Vercel env

---
*Phase: 06-blog-post-production-pipeline*
*Completed: 2026-03-03*

## Self-Check: PASSED
- lib/insights/schema-assembler.ts: FOUND
- app/api/insights/generate/route.ts: FOUND
- app/api/insights/cron/route.ts: FOUND
- vercel.json has 3 cron entries including 8-14: FOUND
- .env.example Phase 6 block: FOUND
- Commit 86a18eb: schema-assembler.ts
- Commit 38dc3d5: generate/route.ts
- Commit c389bd0: cron/route.ts + vercel.json + .env.example
