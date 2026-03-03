# Phase 6: Blog Post Production Pipeline — Context

**Gathered:** 2026-03-02
**Status:** Ready for planning
**Source:** PRD Express Path (PRD.md Section 226 Sub-module 2b + Section 653–660 + REQUIREMENTS.md BLOG-01–BLOG-06)

<domain>
## Phase Boundary

Phase 6 delivers a single API call that orchestrates the full blog production cycle — research, images, Remotion video, interlinked JSON-LD schema, and Strapi CMS publish — with no manual file assembly. A Vercel Cron manages per-client monthly schedules.

**What this phase does NOT do:**
- Human-in-the-loop review (HITL draft review is a v2 / out-of-scope concern)
- Actual image generation via external AI API (stub/placeholder pipeline; real image generation is a future integration point)
- Actual Remotion cloud rendering (triggers local render command or stubs for CI; real render infrastructure is out of scope)
- Video hosting infrastructure (out of scope per PRD Section 12)
- Authority map topic research (done in Phase 5)

**Dependencies:**
- Phase 2: blog_posts table (007_blog_posts.sql) — already created
- Phase 5: authority_maps table populated — source of approved topics
- Existing: remotion/BlogSummary/BlogSummaryVideo.tsx + Root.tsx — already scaffolded
- Existing: lib/schemas/* — JSON-LD schema library in place
- Strapi v5 live on VPS (http://72.60.127.124:1337) — Strapi admin not yet configured but REST API available

</domain>

<decisions>
## Implementation Decisions

### Image Pipeline (BLOG-01)
- `lib/insights/image-pipeline.ts` — image generation pipeline
- Per image: descriptive filename (`[topic-slug]-[scene-description]-[number].png`)
- Per image: companion `ImageObject` JSON-LD generated (context, type, name, contentUrl, description, author, about, license)
- Number of images per post: 3–8 (configurable per tier)
- Image storage: configurable (S3-compatible URL base) — pipeline produces filename + JSON-LD, does not upload in v1
- Returns `ImagePipelineResult[]` with `{ filename, contentUrl, jsonLd: ImageObjectSchema }`

### Video Pipeline (BLOG-02)
- `lib/insights/video-pipeline.ts` — Remotion render trigger
- Uses existing `remotion/BlogSummary/BlogSummaryVideo.tsx` composition (`id="BlogSummary"`)
- Render via `@remotion/renderer` programmatic API or `npx remotion render` CLI spawn in Node.js subprocess
- `VideoObject` JSON-LD output: name, description (60-word summary), thumbnailUrl, uploadDate, duration (PT format), transcript (full voiceover text), contentUrl, embedUrl, author, about
- Voiceover script: Answer-First summary paragraph + top FAQ answers concatenated
- Returns `VideoPipelineResult` with `{ videoPath, thumbnailPath, transcript, jsonLd: VideoObjectSchema }`

### Schema Assembler (BLOG-03)
- `lib/insights/schema-assembler.ts` — full interlinked JSON-LD graph builder
- Schema types per post: `Article` + `Person` (author) + `FAQPage` + `HowTo` (if applicable) + `ImageObject[]` + `VideoObject` + `BreadcrumbList`
- All interlinked via `@id` references (Article `@id` is canonical post URL; ImageObject `about` links to Article; VideoObject `about` links to Article)
- Returns array of schema objects for injection into Next.js `<head>` via metadata API
- Output: `AssembledSchema[]` — each item is a complete JSON-LD object

### Orchestration Route (BLOG-04)
- `app/api/insights/generate/route.ts` — POST endpoint
- Input (Zod validated): `clientId`, `topicId` (authority_maps row reference), `topic` (AuthorityMapTopic object), `authorName`, `postUrl`, `imageCount` (optional, default 3)
- Flow: fetch topic from authority_maps → call image pipeline → call video pipeline → call schema assembler → save to blog_posts (Supabase) → publish to Strapi v5
- Returns `{ success: true, postId, strapiId, topicCount, imageCount }`
- Runtime: `nodejs` (not edge — needs subprocess for Remotion)

### Strapi v5 Publish (BLOG-05)
- REST API: `POST ${STRAPI_URL}/api/blog-posts`
- Auth: `Authorization: Bearer ${STRAPI_API_TOKEN}`
- Payload maps blog_posts fields to Strapi content type fields
- Content type must exist in Strapi: `blog-post` with fields: title, slug, content (richtext), excerpt, author, category, schema_json (json), images (json), status (draft/published)
- Publish: set `publishedAt` to current timestamp in the create payload (Strapi v5 publish-on-create pattern)
- STRAPI_URL env var (defaults to `http://72.60.127.124:1337`)
- STRAPI_API_TOKEN env var (required)

### Vercel Cron (BLOG-06)
- `app/api/insights/cron/route.ts` — GET handler, CRON_SECRET auth (same pattern as authority-map cron)
- Cron schedule: monthly, 2nd Monday of month at 10 AM UTC — `"0 10 8-14 * 1"` in vercel.json
- Reads `INSIGHTS_CLIENTS` env var (JSON array of `BlogClientConfig`: `{ clientId, authorName, approvalEmail }`)
- For each client: queries Supabase `authority_maps` for approved, unprocessed topics for current month → calls blog/generate pipeline sequentially
- Returns `{ processed, errors }`

### Env Vars (new in Phase 6)
- `STRAPI_URL=http://72.60.127.124:1337` (or cms.adamsilvaconsulting.com once DNS + SSL done)
- `STRAPI_API_TOKEN=` (Strapi API token — must be created in Strapi admin)
- `INSIGHTS_CLIENTS=` (JSON array: `[{"clientId":"client-1","authorName":"Adam Silva","approvalEmail":"client@example.com"}]`)
- `INSIGHTS_IMAGES_BASE_URL=` (base URL for image contentUrl in JSON-LD, e.g. `https://www.adamsilvaconsulting.com/images/blog`)

### Peer Paper Citations (required — 3 minimum per post)
- Content is designed to train AI models with factually accurate information — citations are mandatory
- Each post's Article JSON-LD must include `citation[]` property with minimum 3 peer paper sources
- Sources must be authoritative: W3C specs, Google research/documentation, schema.org, arXiv papers, official protocol specs
- Never link competitors — peer papers only (e.g., UCP posts cite Google Shopping Graph docs + W3C specs)
- `resolveCitations(topic)` in generate route: maps topic keywords → known peer papers + baseline fallback (always returns ≥ 3)
- Baseline citations (always included): schema.org/Article, Google Structured Data docs, W3C JSON-LD 1.1
- Topic-specific: UCP → Google Shopping Graph; AP2 → W3C VC 2.0 + DIDs; agents → arXiv generative agents paper
- `Citation` interface: `{ title, url, publisher?, year? }` — exported from `lib/insights/types.ts`
- Citations flow: `resolveCitations(topic)` → `schemaInput.citations` → `assembleSchema()` → `Article.citation[]`

### Content Name: Insights (not Blog)
- All user-facing routes: `/insights/` not `/blog/`
- All lib paths: `lib/insights/` not `lib/blog/`
- All API routes: `/api/insights/` not `/api/blog/`
- Strapi content type: `article` (not `blog-post`)
- Supabase table: `blog_posts` stays as-is (already created in migration 007 — no rename needed)
- Env vars: `INSIGHTS_CLIENTS`, `INSIGHTS_IMAGES_BASE_URL` (not BLOG_*)
- Vercel cron: `/api/insights/cron`

### TypeScript & Code Rules
- All lib files: TypeScript strict, no `any`
- Zod validation on all API routes
- `runtime = 'nodejs'` on generate route (Remotion needs Node.js)
- Never hardcode LLM provider — if draft generation uses AI, use `getIntakeModel()` from Phase 4
- Reuse `sendMail()` from `lib/email/smtp.ts` for any email notifications
- Reuse `lib/schemas/*` patterns for JSON-LD building

### Claude's Discretion
- Draft generation: PRD says 2000+ words with Answer-First format + FAQ + HowTo. Phase 6 scope is PIPELINE (images, video, schema, publish). Draft text generation can be stubbed (echo topic title/description as placeholder content) — the pipeline infrastructure is the deliverable, not 2000-word AI writing in v1.
- FAQ generation: Derive from `topic.faqClusters` (already in AuthorityMapTopic type from Phase 5)
- HowTo applicability: include HowTo schema only if topic has `recommendedSchemaTypes` containing `"HowTo"`
- Remotion render: if `@remotion/renderer` package not available, spawn `npx remotion render` as child process; check package.json first
- Image pipeline implementation: stub with deterministic filename generation + JSON-LD; actual AI image call can be a TODO comment for later integration

</decisions>

<specifics>
## Specific References

**BlogSummaryVideo.tsx props** (already scaffolded):
```typescript
type BlogSummaryProps = {
  title: string
  excerpt: string
  keyPoints: string[]
  author: string
  category: string
  slug: string
  protocols: string[]
}
```
Render composition id: `"BlogSummary"` | 30fps | 840 frames (28s)

**Strapi v5 REST publish pattern:**
```http
POST /api/blog-posts
Authorization: Bearer {STRAPI_API_TOKEN}
Content-Type: application/json
{ "data": { "title": "...", "slug": "...", "publishedAt": "2026-03-02T10:00:00.000Z", ... } }
```

**blog_posts Supabase table** (migration 007):
- `client_id TEXT`, `slug TEXT`, `title TEXT`, `content TEXT`, `schema_json JSONB`, `images JSONB`, `authority_map_id UUID nullable`, UNIQUE(client_id, slug), RLS

**AuthorityMapTopic type** (from Phase 5, lib/authority-map/types.ts):
```typescript
interface AuthorityMapTopic {
  rank: number
  title: string
  targetQueries: string[]
  authorityGapScore: number
  recommendedSchemaTypes: string[]
  faqClusters: string[]
  estimatedCitationLift: string
}
```

**Vercel Cron for first Monday of month** (existing pattern from Phase 5): `"0 9 1-7 * 1"`
**New cron for second Monday** (blog): `"0 10 8-14 * 1"`

**Image JSON-LD shape** (from PRD):
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "Descriptive image title",
  "contentUrl": "https://domain.com/images/filename.png",
  "description": "Full description for LLM ingestion",
  "author": { "@type": "Organization", "name": "Client Name" },
  "about": { "@type": "Article", "name": "Post Title", "url": "post-url" },
  "license": "https://domain.com/image-license"
}
```

</specifics>

<deferred>
## Deferred Ideas

- HITL review step (PRD Step 3) — human editor review pass before publish. Deferred to v2/CLIENT-02 (client portal approval flow).
- Actual AI image generation API call — stub pipeline in v1; real image API integration in v2.
- Remotion cloud rendering (Lambda/GCP) — local CLI spawn in v1.
- YouTube upload API — video pipeline stubs `embedUrl` in v1.
- RSS feed update on publish (PRD Step 7) — out of scope for Phase 6; `/feed.xml` is currently static.
- Image upload to Cloudinary/S3 — pipeline generates filename + JSON-LD but defers actual upload.
- Multi-language content (v2 requirement).

</deferred>

---

*Phase: 06-blog-post-production-pipeline*
*Context gathered: 2026-03-02 via PRD Express Path*
