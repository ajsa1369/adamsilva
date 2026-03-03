---
phase: 07-press-release-engine
plan: "05"
subsystem: press-release-api
tags: [api-route, press-release, pipeline, supabase, wire-distribution, llm-feeds]
dependency_graph:
  requires:
    - "07-02"  # draft-generator.ts + compliance.ts
    - "07-03"  # media-pipeline.ts + schema-builder.ts
    - "07-04"  # researcher.ts + distributor.ts + wire adapters
  provides:
    - "POST /api/press-release/generate — full 7-stage press release pipeline"
    - "GET /api/press-releases/feed.json — structured JSON-LD feed for LLM crawlers"
  affects:
    - "public/llms.txt — GENERATED MEDIA section + DYNAMIC CONTENT FEEDS"
    - "public/ai-context.json — content_feeds.press_releases_feed URL"
tech_stack:
  added: []
  patterns:
    - "7-stage sequential API pipeline mirroring insights/generate/route.ts"
    - "Zod validation with .issues[0] (Zod v3 pattern)"
    - "Supabase upsert with Prefer: return=representation,resolution=merge-duplicates"
    - "Promise.allSettled for partial-failure-tolerant wire distribution"
    - "Non-fatal PATCH for post-distribution wire_results update"
    - "Non-fatal Strapi publish (same pattern as Phase 6)"
    - "ISR revalidate=3600 on feed.json GET route"
key_files:
  created:
    - path: "app/api/press-release/generate/route.ts"
      role: "POST endpoint orchestrating the full 7-stage press release pipeline"
    - path: "app/api/press-releases/feed.json/route.ts"
      role: "GET LLM knowledge feed — all press releases as structured JSON-LD"
  modified:
    - path: ".env.example"
      role: "Added Phase 7 block with 4 wire service API key vars"
    - path: "public/llms.txt"
      role: "Added GENERATED MEDIA section describing PNG/MP4/WebVTT/speakable outputs"
decisions:
  - "Slug format: {clientId}-{year}-{month}-{toSlug(headline)} — ensures uniqueness per client per month"
  - "Research stage .catch(() => undefined) — non-fatal; pipeline continues without context if MCP unavailable"
  - "Supabase insert sets wire_results=[] initially; PATCH updates after distribution (non-fatal)"
  - "feed.json wireDistribution filters to submitted entries with URLs only (excludes skipped/error without URL)"
  - "GENERATED MEDIA section added to llms.txt (llms.txt already had DYNAMIC CONTENT FEEDS from prior session)"
  - "ai-context.json content_feeds already had all 3 URLs from prior session — no change needed"
metrics:
  duration: "3 minutes"
  completed_date: "2026-03-03"
  tasks_completed: 4
  files_created: 2
  files_modified: 3
requirements_satisfied:
  - PR-01  # POST endpoint accepts topic string → wire-ready press release
  - PR-02  # NewsArticle schema + AB 2013/SB 942 compliance label always present
  - PR-03  # 60-second video sidecar via media-pipeline (includeVideo: true default)
  - PR-04  # Wire distribution: wireServices[] from request body, default ['einpresswire']
---

# Phase 7 Plan 05: Wire API Route + LLM Feeds Summary

**One-liner:** 7-stage press release pipeline API route wiring all Phase 7 lib modules — researcher → draft → compliance → media → schema → Supabase upsert → parallel wire distribution — plus structured JSON-LD feed for LLM crawlers.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create app/api/press-release/generate/route.ts | c7c1076 | app/api/press-release/generate/route.ts |
| 2 | Add Phase 7 env var block to .env.example | 9813e5d | .env.example |
| 3 | Create app/api/press-releases/feed.json/route.ts | f3ab21d | app/api/press-releases/feed.json/route.ts |
| 4 | Update public/llms.txt and public/ai-context.json | 3f94ac5 | public/llms.txt, public/ai-context.json |

## What Was Built

### app/api/press-release/generate/route.ts
POST endpoint implementing the complete 7-stage pipeline:
1. Zod validation (topic, clientId, authorName, wireServices, mediaOptions)
2. Stage 1: `researchPressReleaseTopic(topic).catch(() => undefined)` — non-fatal research
3. Stage 2: `generatePressReleaseDraft(topic, authorName, siteUrl, researchContext)` — AI draft
4. Stage 3: `injectCompliance(draft, authorName)` — synchronous AB 2013/SB 942 label
5. Stage 4: `generatePressReleaseMedia(draft, slug, authorName, mediaOptions)` — images + video
6. Stage 5: `buildPressReleaseSchema(schemaInput)` — 6-node @graph JSON-LD
7. Stage 6: Supabase POST to `press_releases` table with `Prefer: return=representation,resolution=merge-duplicates`
8. Stage 7: `distribute(draft, mediaFileUrls, wireServices)` via `Promise.allSettled` + PATCH wire_results (non-fatal)

Slug format: `{clientId}-{year}-{month}-{toSlug(headline)}`

Response shape:
```json
{
  "success": true,
  "slug": "...",
  "headline": "...",
  "wireResults": [...],
  "mediaFiles": [...],
  "schema": [...],
  "complianceLabel": "...",
  "postId": "..."
}
```

### app/api/press-releases/feed.json/route.ts
GET endpoint returning all press releases from Supabase as structured JSON-LD `ItemList`. Key properties:
- `schema_json` passed through to each item — LLMs get full `VideoObject.transcript` without playback
- `wireDistribution` filtered to submitted entries with URLs only
- `revalidate: 3600` + `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`
- `usageInfo` and `trainingPermission` fields guide AI model training usage

### .env.example Phase 7 Block
Documents 4 wire service API keys:
- `EINPRESSWIRE_API_KEY` — Required (free tier default)
- `BUSINESSWIRE_API_KEY` — Optional
- `PRNEWSWIRE_API_KEY` — Optional
- `ACCESSWIRE_API_KEY` — Optional

### LLM Discovery Files
- `public/llms.txt`: Added `## GENERATED MEDIA` section describing PNG/MP4/WebVTT/speakable outputs; `## DYNAMIC CONTENT FEEDS` section already referenced all 3 feeds from prior session
- `public/ai-context.json`: `content_feeds` with all 3 URLs already present from prior session — no change needed

## Deviations from Plan

### Auto-noted Observations

**1. [Pre-existing state] llms.txt DYNAMIC CONTENT FEEDS already had all 3 feed URLs**
- **Found during:** Task 4
- **Issue:** The plan said to add Press Release Feed, Insights Feed, and Video Sitemap to MACHINE-READABLE ENDPOINTS. A prior session had already added a `## DYNAMIC CONTENT FEEDS` section with all 3 URLs.
- **Fix:** Added only the `## GENERATED MEDIA` section (which was missing). Did not duplicate URLs.
- **Files modified:** public/llms.txt
- **Commit:** 3f94ac5

**2. [Pre-existing state] ai-context.json content_feeds already complete**
- **Found during:** Task 4
- **Issue:** The plan said to add 3 keys to `machine_endpoints`. A prior session had already added a `content_feeds` object with all 3 URLs. `last_updated` was already `2026-03-02`.
- **Fix:** No change made to ai-context.json — state was already correct.
- **Files modified:** None

## Requirements Satisfied

- PR-01: POST /api/press-release/generate accepts topic, clientId, authorName, wireServices, mediaOptions — returns slug, headline, wireResults, mediaFiles, schema, complianceLabel
- PR-02: NewsArticle schema present in every generated press release; AB 2013/SB 942 compliance label injected before Supabase upsert
- PR-03: includeVideo: true default — 60-second video sidecar generated via media-pipeline
- PR-04: wireServices[] from request body, defaults to ['einpresswire']; distribute() uses Promise.allSettled for partial failure tolerance

## Self-Check

All files verified:
- `app/api/press-release/generate/route.ts` — created, exports `runtime` and `POST`
- `app/api/press-releases/feed.json/route.ts` — created, exports `GET` and `runtime`
- `.env.example` — EINPRESSWIRE_API_KEY present at line 50
- `public/llms.txt` — GENERATED MEDIA section at line 129, feed URL at line 141
- `public/ai-context.json` — press_releases_feed at line 102

All commits verified:
- c7c1076 — feat(07-05): create app/api/press-release/generate/route.ts
- 9813e5d — chore(07-05): add Phase 7 wire service env var block to .env.example
- f3ab21d — feat(07-05): create app/api/press-releases/feed.json/route.ts LLM knowledge feed
- 3f94ac5 — docs(07-05): add GENERATED MEDIA section to llms.txt; LLM discovery files reference press-release feed

TypeScript: zero errors (npx tsc --noEmit exits 0)
