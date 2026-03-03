---
phase: 06-blog-post-production-pipeline
plan: "03"
subsystem: api
tags: [video-sitemap, seo, xml, supabase, google-video-search, robots-txt, typescript, nextjs]

# Dependency graph
requires:
  - phase: 06-01
    provides: video-pipeline.ts (VideoObject JSON-LD with thumbnailUrl, contentUrl, duration ISO 8601, transcript, hasPart caption)
  - phase: 06-02
    provides: schema-assembler.ts (assembleSchema() stores VideoObject in schema_json JSONB column in blog_posts)
  - phase: 03-integration-catalog-pricing-engine
    provides: lib/schemas/organization.ts (SITE_URL constant)

provides:
  - app/video-sitemap.xml/route.ts — GET handler returning valid Google Video Sitemap XML; queries Supabase blog_posts for all posts with VideoObject in schema_json
  - public/robots.txt — updated with Sitemap: .../video-sitemap.xml line for Google discovery

affects:
  - 06-04 (video sitemap closes the SEO/AEO loop; future blog content will be discoverable immediately on publish)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ISO 8601 duration parsing: parseDurationSeconds() converts PT28S → 28, PT1M30S → 90 — Google video sitemap requires integer seconds not ISO 8601"
    - "xmlEscape() applied to all user-supplied content (transcript, title, description, URLs) before XML serialization"
    - "Supabase REST fetch with service role key — direct REST API (no SDK), Node.js runtime required"
    - "VideoObject extraction by @type search (findVideoObject) — resilient to array position changes"
    - "Cache-Control: public, max-age=3600, s-maxage=3600 — sitemap content stable for 1 hour"

key-files:
  created:
    - app/video-sitemap.xml/route.ts
  modified:
    - public/robots.txt

key-decisions:
  - "runtime='nodejs' not 'edge' — Supabase REST fetch + large JSON parse exceeds edge memory; node runtime required"
  - "video:duration as integer seconds (not ISO 8601) — Google video sitemap spec explicitly requires integer seconds; parseDurationSeconds() handles the conversion"
  - "findVideoObject() searches by @type not array index — resilient to schema_json array reordering; plan noted VideoObject is typically 4th element but search-by-type is robust"
  - "description.slice(0, 2048) — Google video sitemap enforces 2048 char limit on video:description"
  - "Skip posts where contentUrl is empty — no video URL means no valid video sitemap entry; avoids broken Google indexing"

requirements-completed: [BLOG-02]

# Metrics
duration: 2min
completed: 2026-03-03
---

# Phase 06 Plan 03: Video Sitemap Summary

**Dynamic GET /video-sitemap.xml route querying Supabase blog_posts for VideoObject JSON-LD and emitting valid Google Video Sitemap XML with transcript, integer-second duration, and full per-entry metadata**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-03T03:25:00Z
- **Completed:** 2026-03-03T03:28:29Z
- **Tasks:** 1
- **Files modified:** 2 (1 created + 1 modified)

## Accomplishments

- `app/video-sitemap.xml/route.ts` — Node.js runtime GET handler fetches all blog_posts with schema_json, extracts VideoObject by `@type` search, emits one `<video:video>` entry per post with thumbnail, title, description (2048 char limit), content URL, integer-second duration, publication date, and full transcript
- `parseDurationSeconds()` converts ISO 8601 (PT28S, PT1M30S, PT2H0M0S) to integer seconds — satisfies Google Video Sitemap spec which requires integer, not ISO 8601
- `xmlEscape()` escapes all user content (transcript text can contain any character including `&`, `<`, `>`)
- `findVideoObject()` searches schema_json array by `@type === 'VideoObject'` — position-independent, resilient to future schema_json ordering changes
- `public/robots.txt` updated with `Sitemap: https://www.adamsilvaconsulting.com/video-sitemap.xml` line in the SITEMAP LOCATIONS section
- Zero TypeScript errors (`npx tsc --noEmit` exits 0)

## Task Commits

Each task was committed atomically:

1. **Task 1: app/video-sitemap.xml/route.ts + robots.txt update** - `41a4fc7` (feat)

## Files Created/Modified

- `app/video-sitemap.xml/route.ts` — GET handler: runtime='nodejs', parseDurationSeconds(), xmlEscape(), findVideoObject(), buildVideoSitemapXml(), Supabase REST fetch with service role key, Content-Type: application/xml, Cache-Control: 1 hour
- `public/robots.txt` — added `Sitemap: https://www.adamsilvaconsulting.com/video-sitemap.xml` after existing sitemap-news.xml line

## Decisions Made

- `runtime='nodejs'` — Supabase REST fetch with large JSON response (all blog_posts) and JSON.parse exceeds edge memory limits; Node.js runtime is the correct choice
- `video:duration` as integer seconds via `parseDurationSeconds()` — Google's video sitemap XSD specification requires an integer (seconds), not ISO 8601 duration; plan explicitly noted this distinction
- `findVideoObject()` searches by `@type` not array index — plan noted VideoObject is typically 4th element but search-by-type is robust against future ordering changes in assembleSchema()
- `description.slice(0, 2048)` — Google video sitemap enforces hard 2048 character limit; silent truncation is the correct behavior (no error, just trim)
- Skip posts where `contentUrl` is empty string — a video sitemap entry without a `video:content_loc` would be invalid and cause Google Search Console errors

## Deviations from Plan

None — plan executed exactly as written. Single task with no unexpected issues. TypeScript compiled cleanly on first pass.

## Issues Encountered

None. Zero TypeScript errors. All imports (`SITE_URL` from `@/lib/schemas/organization`) resolved correctly.

## Next Phase Readiness

- Video sitemap route is complete and will serve valid XML to Google Video Search as soon as blog posts with VideoObject are in Supabase
- robots.txt now references video-sitemap.xml — Googlebot will discover it on next crawl
- Phase 6 Plan 03 closes the AEO/SEO loop: Remotion renders video → video published → video-sitemap.xml exposes it to Google → Google indexes video + transcript → AI models can cite the post with video context
- Ready for Phase 6 Plan 04

---
*Phase: 06-blog-post-production-pipeline*
*Completed: 2026-03-03*

## Self-Check: PASSED
- app/video-sitemap.xml/route.ts: FOUND
- public/robots.txt video-sitemap line: FOUND (`Sitemap: https://www.adamsilvaconsulting.com/video-sitemap.xml`)
- TypeScript: 0 errors (npx tsc --noEmit exits 0)
- Commit 41a4fc7: feat(06-03): add dynamic Google video sitemap route
