---
phase: 06-blog-post-production-pipeline
plan: "01"
subsystem: api
tags: [sharp, remotion, webvtt, xmp, json-ld, image-pipeline, video-pipeline, typescript]

# Dependency graph
requires:
  - phase: 05-topical-authority-map-agent
    provides: AuthorityMapTopic interface used in all pipeline inputs
  - phase: 03-integration-catalog-pricing-engine
    provides: lib/schemas/image.ts buildImageObjectSchema, lib/schemas/organization.ts SITE_URL/ORG_ID

provides:
  - lib/insights/types.ts — 9 TypeScript contracts (Citation, ImagePipelineInput, ImagePipelineResult, VideoPipelineInput, CaptionTrack, VideoPipelineResult, SchemaAssemblerInput, InsightPost, BlogClientConfig)
  - lib/insights/image-pipeline.ts — generateImages() creates stub PNGs with XMP-embedded ImageObject JSON-LD via sharp
  - lib/insights/video-pipeline.ts — generateVideo() spawns Remotion CLI for MP4 + still PNG, generates WebVTT CC, returns VideoObject JSON-LD

affects:
  - 06-02 (schema assembler imports all types + pipeline results)
  - 06-03 (orchestration route calls generateImages + generateVideo)
  - 06-04 (cron uses BlogClientConfig + InsightPost)

# Tech tracking
tech-stack:
  added:
    - sharp (^0.33.x) — PNG creation with XMP metadata embedding
  patterns:
    - XMP metadata pattern: embed ImageObject JSON-LD into PNG files for AI crawler discoverability
    - Graceful stub pattern: Remotion render failures warn+continue (pipeline doesn't halt)
    - WriteableMetadataWithXmp local interface extension (sharp runtime supports xmp, TS types don't)
    - Deterministic filenames: {post-slug}-{scene}-{index+1}.png always same for same input

key-files:
  created:
    - lib/insights/types.ts
    - lib/insights/image-pipeline.ts
    - lib/insights/video-pipeline.ts
  modified:
    - package.json (added sharp dependency)

key-decisions:
  - "WriteableMetadataWithXmp extends sharp WriteableMetadata — sharp runtime supports xmp buffer but TS types lack the field; local interface extension avoids any"
  - "generateImages is async (sharp is async) — plan showed both sync and async versions; async is required for writePngWithMetadata"
  - "stillFramePath optional param — image pipeline receives Remotion still path from video pipeline; if not provided, creates navy stub for Image 1"
  - "Remotion render/still failures are graceful stubs — console.warn + continue; allows pipeline to run in dev before Remotion is set up"
  - "WebVTT cues split into ~5-second intervals — better UX than single giant cue spanning full video"
  - "NEXT_PUBLIC_SITE_URL env var fallback to SITE_URL constant in all URL construction"
  - "sharp installed as regular dependency (not devDependency) — used at runtime in API routes and cron"

patterns-established:
  - "Pipeline leaf nodes first: types.ts → image-pipeline.ts → video-pipeline.ts, then assembler + orchestration import all three"
  - "XMP embedding: buildXmpXml() writes ImageObject JSON-LD to dc:description and schema:jsonLd so AI crawlers reading PNG metadata see structured data"
  - "Graceful render stub: try/catch around Remotion CLI spawns, warn on failure, return result with paths regardless"

requirements-completed:
  - BLOG-01
  - BLOG-02

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 06 Plan 01: Blog Pipeline Contracts, Image Pipeline, and Video Pipeline Summary

**TypeScript contracts for blog pipeline (9 interfaces) plus sharp-based image pipeline with XMP JSON-LD embedding and Remotion CLI video pipeline with WebVTT closed captions**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-03T03:13:54Z
- **Completed:** 2026-03-03T03:17:07Z
- **Tasks:** 3
- **Files modified:** 4 (3 created + package.json)

## Accomplishments
- 9 TypeScript interfaces in lib/insights/types.ts with no any types — Citation, all pipeline I/O types, BlogClientConfig — all downstream plans have clean imports
- Image pipeline creates brand-navy stub PNGs (1200x630) with XMP metadata embedding full ImageObject JSON-LD (AI crawler discoverability); Image 1 receives Remotion still frame if available
- Video pipeline spawns Remotion CLI for MP4 + still PNG render; generates WebVTT CC with 5-second cue splits; VideoObject JSON-LD includes full verbatim transcript + hasPart caption track

## Task Commits

Each task was committed atomically:

1. **Task 1: lib/insights/types.ts** - `0029c86` (feat)
2. **Task 2: lib/insights/image-pipeline.ts** - `8813ba8` (feat)
3. **Task 3: lib/insights/video-pipeline.ts** - `d9f88af` (feat)

## Files Created/Modified
- `lib/insights/types.ts` — 9 exported TypeScript interfaces for entire blog pipeline
- `lib/insights/image-pipeline.ts` — generateImages() with sharp PNG creation + XMP JSON-LD embedding
- `lib/insights/video-pipeline.ts` — generateVideo() with Remotion CLI spawn, WebVTT CC, VideoObject JSON-LD
- `package.json` — added sharp dependency

## Decisions Made
- `WriteableMetadataWithXmp` extends sharp's `WriteableMetadata` — sharp runtime supports xmp Buffer but TypeScript types don't declare it; local interface extension avoids `any` while enabling the feature
- `generateImages` is async (sharp API is async) — plan showed both sync and async versions; async is required for the PNG write operations via `writePngWithMetadata`
- `stillFramePath` is an optional param passed from video pipeline to image pipeline — if provided and file exists, embeds XMP into the Remotion title card; otherwise creates navy stub
- Remotion render/still failures are graceful stubs — `console.warn` + continue; pipeline returns full result shape regardless, allowing dev usage without Remotion fully configured
- WebVTT cues split into ~5-second intervals for better hearing-impaired UX vs single giant cue

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed sharp XMP TypeScript type error**
- **Found during:** Task 2 (image-pipeline.ts implementation)
- **Issue:** `sharp`'s `WriteableMetadata` type doesn't declare `xmp` property; `.withMetadata({ xmp: buffer })` caused TS2353 error on both sharp call sites
- **Fix:** Added `interface WriteableMetadataWithXmp extends WriteableMetadata { xmp?: Buffer }` locally in the file; used typed variable `const xmpMeta: WriteableMetadataWithXmp = { xmp: xmpBuffer }` passed to `.withMetadata()`
- **Files modified:** lib/insights/image-pipeline.ts
- **Verification:** `npx tsc --noEmit` exits 0
- **Committed in:** `8813ba8` (Task 2 commit)

**2. [Rule 3 - Blocking] Installed sharp dependency**
- **Found during:** Task 2 (before implementation — plan specified to check/install)
- **Issue:** `node -e "require('sharp')"` confirmed sharp was not installed
- **Fix:** `npm install sharp`
- **Files modified:** package.json
- **Verification:** `node -e "require('sharp')"` outputs successfully
- **Committed in:** `8813ba8` (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug fix, 1 blocking dependency)
**Impact on plan:** Both required for correct operation. XMP fix maintains strict TypeScript. sharp install was explicitly anticipated in the plan.

## Issues Encountered
None beyond the auto-fixed TypeScript type issue with sharp's XMP metadata API.

## Next Phase Readiness
- All 9 type contracts exported from lib/insights/types.ts — Plan 02 (schema assembler) can import immediately
- generateImages() and generateVideo() both export cleanly with zero TS errors
- Image pipeline produces deterministic filenames and valid ImageObject JSON-LD
- Video pipeline produces VideoObject JSON-LD with full transcript + WebVTT CC track
- sharp installed and working

---
*Phase: 06-blog-post-production-pipeline*
*Completed: 2026-03-03*

## Self-Check: PASSED
- lib/insights/types.ts: FOUND
- lib/insights/image-pipeline.ts: FOUND
- lib/insights/video-pipeline.ts: FOUND
- .planning/phases/06-blog-post-production-pipeline/06-01-SUMMARY.md: FOUND
- Commit 0029c86: FOUND
- Commit 8813ba8: FOUND
- Commit d9f88af: FOUND
