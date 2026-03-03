---
phase: 06-blog-post-production-pipeline
verified: 2026-03-03T04:00:00Z
status: passed
score: 7/7 must-haves verified
re_verification: false
---

# Phase 6: Blog Post Production Pipeline Verification Report

**Phase Goal:** A single API call can orchestrate the full insight post production cycle — AI-generated 2000-word article, images with embedded JSON-LD metadata, Remotion video + WebVTT CC, interlinked schema, Strapi CMS publish, and video sitemap — with a 1.5-day automated publishing cadence to maintain SEO/AEO/GEO health
**Verified:** 2026-03-03T04:00:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `lib/insights/image-pipeline.ts` generates N images with XMP JSON-LD embedded in PNG: Image 1 = Remotion still frame, Images 2-N = 1200x630 brand PNGs | VERIFIED | `generateImages()` exported; `writePngWithMetadata()` calls `sharp().withMetadata({ xmp: xmpBuffer })` for all images; `isVideoStill = i === 0` controls still-frame vs stub path |
| 2 | `lib/insights/video-pipeline.ts` triggers Remotion render and produces VideoObject JSON-LD with full transcript + WebVTT CC track | VERIFIED | `generateVideo()` exported; spawns `npx remotion render` + `npx remotion still` via `child_process.spawn`; `generateWebVTT()` produces 5-second cue splits; `jsonLd` includes `transcript`, `hasPart` with `text/vtt` caption MediaObject |
| 3 | `lib/insights/schema-assembler.ts` produces interlinked JSON-LD graph (Article + Person + FAQPage + HowTo + ImageObject[] + VideoObject) with all nodes linked via @id and minimum 3 peer paper citations | VERIFIED | `assembleSchema()` exported; 7 node types assembled; `citation: input.citations.map(...)` on BlogPosting node; baseline guarantees 3 citations; HowTo conditional on `recommendedSchemaTypes.includes('HowTo')` |
| 4 | `lib/insights/draft-generator.ts` uses `getIntakeModel()` to generate 2000+ word Answer-First articles with contextually relevant CTA to one ASC service | VERIFIED | `generateDraft()` calls `getIntakeModel()` from `@/lib/intake/model`; `generateText({ model, prompt, maxOutputTokens: 4096 })`; `resolveCta()` covers 6 service paths; never imports anthropic/openai directly |
| 5 | `POST /api/insights/generate` orchestrates the full pipeline end-to-end and publishes to Strapi v5 | VERIFIED | Route imports `generateDraft`, `generateImages`, `generateVideo`, `assembleSchema`; all called in sequence with `await`; Supabase insert to `blog_posts`; Strapi POST to `/api/articles` with graceful failure (non-fatal) |
| 6 | `GET /api/insights/publish` runs on daily Vercel Cron (6 AM UTC) with 36-hour throttle — one post per 1.5 days | VERIFIED | `PUBLISH_INTERVAL_MS = 36 * 60 * 60 * 1000` hardcoded; throttle check against `blog_posts.created_at DESC`; vercel.json has `"0 6 * * *"` schedule for `/api/insights/publish` |
| 7 | `GET /video-sitemap.xml` exposes all insight post videos to Google Video Search with full transcript | VERIFIED | `app/video-sitemap.xml/route.ts` queries `blog_posts`, finds VideoObject in `schema_json`, emits `<video:transcript>` per entry; `parseDurationSeconds()` converts ISO 8601 to integer seconds; `public/robots.txt` includes `Sitemap: .../video-sitemap.xml` |

**Score:** 7/7 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/insights/types.ts` | 9 TypeScript interfaces: Citation, ImagePipelineInput, ImagePipelineResult, VideoPipelineInput, CaptionTrack, VideoPipelineResult, SchemaAssemblerInput, InsightPost, BlogClientConfig | VERIFIED | All 9 interfaces present, no `any` types, 99 lines |
| `lib/insights/image-pipeline.ts` | `generateImages(input, stillFramePath?)` returning `ImagePipelineResult[]` with PNG writes and XMP JSON-LD embedding | VERIFIED | Async export; sharp `writePngWithMetadata()`; XMP XML builder; `buildImageObjectSchema` imported from `@/lib/schemas/image` |
| `lib/insights/video-pipeline.ts` | `generateVideo(input)` returning `VideoPipelineResult` with Remotion CLI spawn, WebVTT CC, VideoObject JSON-LD | VERIFIED | `spawnRemotion()` via `child_process.spawn`; graceful try/catch on render failure; `generateWebVTT()` writes `.vtt` to disk; VideoObject JSON-LD has `transcript` and `hasPart` |
| `lib/insights/schema-assembler.ts` | `assembleSchema(input)` returning `object[]` with @graph array | VERIFIED | 144 lines; 7 schema node types; `citation[]` on BlogPosting; `buildFAQSchema` + `buildBreadcrumbSchema` wired |
| `lib/insights/draft-generator.ts` | `generateDraft()`, `resolveCta()`, `DraftResult`, `CtaService` exports; uses `getIntakeModel()` | VERIFIED | All 4 symbols exported; `getIntakeModel()` from `@/lib/intake/model`; `generateText` from `ai`; `maxOutputTokens: 4096` |
| `app/api/insights/generate/route.ts` | POST endpoint orchestrating full pipeline; `runtime = 'nodejs'`; Zod validation; Strapi publish | VERIFIED | 252 lines; `runtime = 'nodejs'`; imports all 4 lib modules; `generateDraft` called before images; Supabase + Strapi wired |
| `app/api/insights/cron/route.ts` | GET handler; CRON_SECRET auth; INSIGHTS_CLIENTS parse; Supabase authority_maps query; sequential generate calls | VERIFIED | 134 lines; `runtime = 'nodejs'`; CRON_SECRET header check; monthly filter `month=eq.${month}&approved_at=not.is.null` |
| `app/api/insights/publish/route.ts` | GET handler; 36h throttle constant; topic deduplication; internal generate call | VERIFIED | `PUBLISH_INTERVAL_MS = 36 * 60 * 60 * 1000`; throttle active; slug deduplication via `Set<string>`; internal fetch to `/api/insights/generate` |
| `app/video-sitemap.xml/route.ts` | GET handler; queries blog_posts; VideoObject extraction; valid Google video sitemap XML | VERIFIED | 134 lines; `runtime = 'nodejs'`; `parseDurationSeconds()`; `xmlEscape()`; `Content-Type: application/xml` |
| `vercel.json` | 4 cron entries including `/api/insights/cron` at `"0 10 8-14 * 1"` and `/api/insights/publish` at `"0 6 * * *"` | VERIFIED | Exactly 4 cron entries; third = insights/cron second Monday; fourth = insights/publish daily 6 AM |
| `public/robots.txt` | Sitemap line referencing `/video-sitemap.xml` | VERIFIED | Line 220: `Sitemap: https://www.adamsilvaconsulting.com/video-sitemap.xml` |
| `.env.example` | Phase 6 block with STRAPI_URL, STRAPI_API_TOKEN, INSIGHTS_CLIENTS, INSIGHTS_IMAGES_BASE_URL | VERIFIED | All 4 vars documented under `# === Phase 6: Blog Post Production Pipeline ===` |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `lib/insights/image-pipeline.ts` | `lib/schemas/image.ts` | `import { buildImageObjectSchema }` | WIRED | Import on line 4; called on line 104 with full config object |
| `lib/insights/video-pipeline.ts` | `remotion/BlogSummaryVideo.tsx` | `npx remotion render remotion/index.ts BlogSummary` | WIRED | `spawnRemotion(['render', 'remotion/index.ts', 'BlogSummary', ...])` on line 91-98 |
| `app/api/insights/generate/route.ts` | `lib/insights/image-pipeline.ts` | `import { generateImages }` | WIRED | Line 2; called as `await generateImages(imagePipelineInput, video.stillImagePath)` |
| `app/api/insights/generate/route.ts` | `lib/insights/video-pipeline.ts` | `import { generateVideo }` | WIRED | Line 3; called as `await generateVideo(videoPipelineInput)` |
| `app/api/insights/generate/route.ts` | `lib/insights/schema-assembler.ts` | `import { assembleSchema }` | WIRED | Line 4; called as `assembleSchema(schemaInput)` |
| `app/api/insights/generate/route.ts` | `lib/insights/draft-generator.ts` | `import { generateDraft }` | WIRED | Line 5; called as `await generateDraft(topic, authorName, siteUrl)` |
| `app/api/insights/generate/route.ts` | `Supabase REST /rest/v1/blog_posts` | `fetch` with `SUPABASE_SERVICE_ROLE_KEY` | WIRED | Line 174; POST with `Prefer: return=representation,resolution=merge-duplicates` |
| `app/api/insights/generate/route.ts` | `Strapi v5 /api/articles` | `fetch` with `STRAPI_API_TOKEN` | WIRED | Line 212; POST with Bearer token; graceful non-fatal on failure |
| `app/api/insights/cron/route.ts` | `app/api/insights/generate/route.ts` | `fetch POST /api/insights/generate` | WIRED | Line 105; `fetch(`${siteUrl}/api/insights/generate`, { method: 'POST', ... })` |
| `app/api/insights/publish/route.ts` | `app/api/insights/generate/route.ts` | `fetch POST /api/insights/generate` | WIRED | Line 153; internal fetch with full topic payload |
| `app/api/insights/publish/route.ts` | `Supabase REST /rest/v1/blog_posts` | `fetch` for throttle check | WIRED | Lines 22 and 59; throttle check + slug deduplication both query blog_posts |
| `app/video-sitemap.xml/route.ts` | `Supabase REST /rest/v1/blog_posts` | `fetch` with `SUPABASE_SERVICE_ROLE_KEY` | WIRED | Line 78; GET with `schema_json=not.is.null` filter |
| `lib/insights/draft-generator.ts` | `lib/intake/model.ts` | `import { getIntakeModel }` | WIRED | Line 2; `getIntakeModel()` called on line 111; MODEL_PROVIDER env var routing confirmed in model.ts |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| BLOG-01 | 06-01 | System can generate N blog post images per post with descriptive filenames and companion ImageObject JSON-LD | SATISFIED | `generateImages()` produces `ImagePipelineResult[]` with deterministic filenames and `jsonLd: buildImageObjectSchema(...)` per image; XMP metadata embedded in PNG files |
| BLOG-02 | 06-01, 06-03 | System can trigger Remotion render for BlogSummaryVideo.tsx and generate VideoObject JSON-LD with full transcript | SATISFIED | `generateVideo()` spawns `npx remotion render remotion/index.ts BlogSummary`; VideoObject includes `transcript` (full verbatim) and `hasPart` WebVTT caption; video sitemap exposes videos |
| BLOG-03 | 06-02 | System can assemble interlinked JSON-LD schema (Article + Person + FAQPage + HowTo + ImageObject[] + VideoObject, all linked via @id) | SATISFIED | `assembleSchema()` returns 7-node @graph array; all nodes use @id absolute URLs; Article links to VideoObject via `video: { '@id': videoId }` |
| BLOG-04 | 06-02, 06-04 | System can orchestrate the full blog pipeline via a single API route | SATISFIED | `POST /api/insights/generate` calls generateDraft + generateVideo + generateImages + resolveCitations + assembleSchema + Supabase insert + Strapi publish in sequence; `GET /api/insights/publish` wraps this with scheduling |
| BLOG-05 | 06-02 | Completed posts are published to Strapi v5 via REST API | SATISFIED | `fetch(`${strapiUrl}/api/articles`, { method: 'POST', ...})` with `Authorization: Bearer ${strapiToken}`; `publishedAt` set for immediate publish; Strapi failure is non-fatal (returns `strapiId: null`) |
| BLOG-06 | 06-02, 06-04 | Blog generation schedule per client is managed via Vercel Cron | SATISFIED | `vercel.json` has `/api/insights/cron` at `"0 10 8-14 * 1"` (second Monday batch) and `/api/insights/publish` at `"0 6 * * *"` (daily 1.5-day cadence check) |

**All 6 BLOG requirements satisfied. No orphaned requirements.**

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `lib/insights/video-pipeline.ts` | 88 | `TODO(v2): Replace with @remotion/renderer programmatic API or Remotion Lambda for production` | Info | Documented upgrade path; CLI spawn is the intended v1 implementation per plan spec |
| `lib/insights/image-pipeline.ts` | 86 | `TODO(v2): Replace stub creation with actual AI image generation API for images 2-N` | Info | Documented upgrade path; brand-color stub PNGs with XMP metadata are the intended v1 implementation |
| `lib/insights/types.ts` | 83 | `content: string // placeholder text in v1` | Info | Comment only — actual `content` is now AI-generated via `generateDraft()` in generate route; comment is stale but accurate for InsightPost interface description |

No blocker or warning-level anti-patterns found. All TODOs are v2 upgrade paths that are explicitly documented in the plan as intended behavior. The `content` comment in types.ts is stale but does not affect runtime behavior.

---

### Human Verification Required

#### 1. Remotion Render Produces Actual MP4

**Test:** Run `POST /api/insights/generate` with a real topic payload in a local environment where Remotion is set up
**Expected:** `public/videos/insights/[slug].mp4` is created on disk; video contains the BlogSummaryVideo title card animation
**Why human:** Remotion CLI render requires a configured environment; the pipeline has graceful fallback (warn + continue) if Remotion fails, so a missing render does not fail the route — it must be tested manually

#### 2. Strapi Publish Creates Article

**Test:** Set `STRAPI_API_TOKEN` to a valid admin token, run `POST /api/insights/generate`, check Strapi admin at `http://72.60.127.124:1337/admin`
**Expected:** An article appears in the Strapi content manager with correct title, slug, and schema_json; `publishedAt` is set (immediately published)
**Why human:** Strapi VPS must be running with the `articles` content type created; cannot verify externally

#### 3. Video Sitemap Returns Valid XML

**Test:** Deploy to Vercel preview, `curl https://[preview-url]/video-sitemap.xml`
**Expected:** Response is `Content-Type: application/xml`; XML opens with `<?xml`; has `<urlset>` root with `xmlns:video` namespace; once posts exist in Supabase, `<video:video>` entries appear with `<video:transcript>` content
**Why human:** Requires live Supabase data to have blog_posts rows with schema_json

#### 4. Daily 1.5-Day Cron Cadence

**Test:** Verify Vercel dashboard shows cron job `/api/insights/publish` scheduled at `0 6 * * *`; trigger manually and confirm 36h throttle skips when last post is recent
**Expected:** First trigger publishes; second trigger within 36h returns `status: 'skipped'` with hours-ago reason
**Why human:** Requires live Vercel deployment; time-dependent behavior cannot be verified statically

---

### Gaps Summary

No gaps found. All 7 observable truths are verified. All 12 artifacts pass existence, substantive content, and wiring checks. All 6 BLOG requirements are satisfied. TypeScript build produces zero errors (`npx tsc --noEmit` exits 0).

Notable observations (not gaps):
- The `maxTokens` → `maxOutputTokens` parameter name change (ai@6 SDK) was auto-fixed during plan execution and is correctly implemented in the codebase
- Images 2-N are intentional stub brand-navy PNGs per v1 design; actual AI image generation is deferred to v2 by design
- Remotion renders fail gracefully in environments where Remotion is not configured; this is documented as the intended v1 behavior

---

## Summary Table

| Check | Result |
|-------|--------|
| TypeScript zero errors | PASS — `npx tsc --noEmit` exits 0 |
| lib/insights/ directory | PASS — 5 files: types.ts, image-pipeline.ts, video-pipeline.ts, schema-assembler.ts, draft-generator.ts |
| app/api/insights/ directory | PASS — 3 subdirs: generate/, cron/, publish/ |
| app/video-sitemap.xml/route.ts | PASS — exists, 134 lines, substantive |
| vercel.json cron count | PASS — 4 entries, all schedules correct |
| robots.txt video-sitemap reference | PASS — line 220 |
| .env.example Phase 6 block | PASS — 4 vars documented |
| sharp dependency | PASS — installed and importable |
| getIntakeModel() wiring | PASS — draft-generator imports from lib/intake/model |
| Strapi publish wiring | PASS — fetch POST to STRAPI_API_TOKEN URL, graceful failure |
| Supabase blog_posts wiring | PASS — generate route inserts; publish route queries |
| Citation minimum 3 guarantee | PASS — baseline array always provides 3 fallback citations |

---

_Verified: 2026-03-03T04:00:00Z_
_Verifier: Claude (gsd-verifier)_
