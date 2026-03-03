/**
 * app/api/press-release/generate/route.ts
 *
 * POST /api/press-release/generate
 *
 * Orchestrates the full 7-stage press release pipeline:
 * 1. Validate input (Zod) + parse body
 * 2. Stage 1: Research topic (non-fatal — .catch(() => undefined))
 * 3. Stage 2: Generate AI press release draft
 * 4. Stage 3: Inject AB 2013 / SB 942 compliance label (synchronous)
 * 5. Stage 4: Generate media (images + optional 60-second video)
 * 6. Stage 5: Build JSON-LD schema @graph (NewsArticle + Organization + ImageObject[] + VideoObject + FAQPage + BreadcrumbList)
 * 7. Stage 6: Upsert to Supabase press_releases table (fail hard on error)
 * 8. Stage 7: Parallel wire distribution (Promise.allSettled — partial failure OK)
 *    + PATCH wire_results back to Supabase (non-fatal)
 *
 * Mirrors app/api/insights/generate/route.ts exactly — same patterns, same conventions:
 * - runtime = 'nodejs' (not 'edge') — Supabase REST + large JSON parse exceeds edge memory
 * - parsed.error.issues[0]?.message — Zod v3 .issues NOT .errors
 * - Prefer: return=representation,resolution=merge-duplicates on Supabase POST
 * - Strapi publish: non-fatal (try/catch, returns strapiId: null on failure)
 * - Never import anthropic, openai, or @google/generative-ai directly
 */

import { z } from 'zod'
import { researchPressReleaseTopic } from '@/lib/press-release/researcher'
import { generatePressReleaseDraft } from '@/lib/press-release/draft-generator'
import { injectCompliance } from '@/lib/press-release/compliance'
import { generatePressReleaseMedia } from '@/lib/press-release/media-pipeline'
import { buildPressReleaseSchema } from '@/lib/press-release/schema-builder'
import { distribute } from '@/lib/press-release/distributor'
import { SITE_URL } from '@/lib/schemas/organization'
import type { PressReleaseSchemaInput } from '@/lib/press-release/types'

export const runtime = 'nodejs'

// -----------------------------------------------------------------------
// Zod schema for POST body
// -----------------------------------------------------------------------
const GenerateSchema = z.object({
  topic: z.string().min(10),                                       // news event or announcement (PR-01)
  clientId: z.string().min(1),
  authorName: z.string().default('Adam Silva'),
  wireServices: z.array(
    z.enum(['einpresswire', 'businesswire', 'prnewswire', 'accesswire']),
  ).default(['einpresswire']),                                      // PR-04: default to EIN Presswire free tier
  mediaOptions: z.object({
    imageCount: z.union([
      z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
    ]).default(2),
    includeVideo: z.boolean().default(true),                       // PR-03: 60-second video sidecar
  }).default({ imageCount: 2, includeVideo: true }),
})

// -----------------------------------------------------------------------
// toSlug — URL-safe slug from any string
// Same helper as insights/generate/route.ts
// -----------------------------------------------------------------------
function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// -----------------------------------------------------------------------
// POST /api/press-release/generate
// -----------------------------------------------------------------------
export async function POST(req: Request): Promise<Response> {
  // Step 1: Parse + validate request body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = GenerateSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    )
  }

  const { topic, clientId, authorName, wireServices, mediaOptions } = parsed.data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
  const publishedAt = new Date().toISOString()

  // Supabase credentials — fail hard early if missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return Response.json(
      { error: 'Supabase environment variables not configured' },
      { status: 500 },
    )
  }

  // -----------------------------------------------------------------------
  // Stage 1: Research (non-fatal — pipeline continues if MCP unavailable)
  // -----------------------------------------------------------------------
  const researchContext = await researchPressReleaseTopic(topic).catch(() => undefined)

  // -----------------------------------------------------------------------
  // Stage 2: Draft generation
  // -----------------------------------------------------------------------
  const draft = await generatePressReleaseDraft(topic, authorName, siteUrl, researchContext)

  // Slug: {clientId}-{year}-{month}-{toSlug(headline)}
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const slug = `${clientId}-${year}-${month}-${toSlug(draft.headline)}`

  // -----------------------------------------------------------------------
  // Stage 3: Compliance injection (synchronous — no await)
  // AB 2013 / SB 942 transparency label injected before every upsert (PR-02)
  // -----------------------------------------------------------------------
  const compliance = injectCompliance(draft, authorName)

  // -----------------------------------------------------------------------
  // Stage 4: Media pipeline — images + optional 60-second video (PR-03)
  // -----------------------------------------------------------------------
  const media = await generatePressReleaseMedia(draft, slug, authorName, mediaOptions)

  // -----------------------------------------------------------------------
  // Stage 5: Schema builder — 6-node @graph (PR-02: NewsArticle always present)
  // wireResultUrl filled in after distribution — empty on first build
  // -----------------------------------------------------------------------
  const pressReleaseUrl = `${siteUrl}/press-releases/${slug}`
  const schemaInput: PressReleaseSchemaInput = {
    headline: draft.headline,
    slug,
    pressReleaseUrl,
    authorName,
    publishedAt,
    body: compliance.fullText,
    images: media.images,
    video: media.video,
    // wireResultUrl: populated after distribution via PATCH (see below)
  }
  const schema = buildPressReleaseSchema(schemaInput)

  // -----------------------------------------------------------------------
  // Stage 6: Supabase upsert to press_releases table
  // Columns: client_id, slug, headline, body (compliance.fullText),
  //          compliance_label, schema_json (schema array),
  //          media_files (media.images), wire_results ([]) initially,
  //          research_context (researchContext ?? null)
  // Prefer: return=representation,resolution=merge-duplicates
  // FAIL HARD on Supabase error (unlike Strapi which is non-fatal)
  // -----------------------------------------------------------------------
  const supaRes = await fetch(`${supabaseUrl}/rest/v1/press_releases`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation,resolution=merge-duplicates',
    },
    body: JSON.stringify({
      client_id: clientId,
      slug,
      headline: draft.headline,
      body: compliance.fullText,
      compliance_label: compliance.complianceLabel,
      schema_json: schema,
      media_files: media.images,
      wire_results: [],
      research_context: researchContext ?? null,
    }),
  })

  if (!supaRes.ok) {
    const errText = await supaRes.text()
    return Response.json(
      { error: `Supabase upsert failed: ${supaRes.status} ${errText}` },
      { status: 500 },
    )
  }

  const rows = await supaRes.json() as Array<{ id: string }>
  const postId = rows[0]?.id ?? null

  // -----------------------------------------------------------------------
  // Stage 7: Wire distribution (parallel via distribute())
  // Promise.allSettled — partial failure is acceptable (PR-04)
  // -----------------------------------------------------------------------
  const mediaFileUrls = media.images.map((img) => img.contentUrl)
  const wireResults = await distribute(draft, mediaFileUrls, wireServices)

  // After distribution: PATCH wire_results back to Supabase
  // Non-fatal — wire results are already in the response even if PATCH fails
  await fetch(
    `${supabaseUrl}/rest/v1/press_releases?slug=eq.${encodeURIComponent(slug)}`,
    {
      method: 'PATCH',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wire_results: wireResults }),
    },
  ).catch((e) => console.warn('[press-release/generate] wire_results PATCH failed:', e))

  // -----------------------------------------------------------------------
  // Optional: Strapi v5 publish (non-fatal — returns strapiId: null on failure)
  // Same pattern as insights/generate/route.ts
  // -----------------------------------------------------------------------
  const strapiUrl = process.env.STRAPI_URL ?? 'https://cms.adamsilvaconsulting.com'
  const strapiToken = process.env.STRAPI_API_TOKEN
  let strapiId: number | null = null
  let strapiError: string | undefined

  if (!strapiToken) {
    strapiError = 'STRAPI_API_TOKEN not set — Strapi publish skipped'
    console.warn(`[press-release/generate] ${strapiError}`)
  } else {
    try {
      const strapiRes = await fetch(`${strapiUrl}/api/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${strapiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title: draft.headline,
            slug,
            content: compliance.fullText,
            excerpt: draft.lead,
            schema_json: schema,
            publishedAt,
          },
        }),
      })
      if (strapiRes.ok) {
        const strapiBody = await strapiRes.json() as { data?: { id?: number } }
        strapiId = strapiBody.data?.id ?? null
      } else {
        const errText = await strapiRes.text()
        strapiError = `Strapi publish failed: ${strapiRes.status} ${errText}`
        console.warn(`[press-release/generate] ${strapiError}`)
      }
    } catch (err) {
      strapiError = `Strapi publish error: ${err instanceof Error ? err.message : String(err)}`
      console.warn(`[press-release/generate] ${strapiError}`)
    }
  }

  // -----------------------------------------------------------------------
  // Response
  // -----------------------------------------------------------------------
  return Response.json({
    success: true,
    slug,
    headline: draft.headline,
    wireResults,
    mediaFiles: media.images.map((img) => img.contentUrl),
    schema,
    complianceLabel: compliance.complianceLabel,
    postId,
    strapiId,
    ...(strapiError ? { strapiError } : {}),
  })
}
