import { z } from 'zod'
import { generateImages } from '@/lib/insights/image-pipeline'
import { generateVideo } from '@/lib/insights/video-pipeline'
import { assembleSchema } from '@/lib/insights/schema-assembler'
import { generateDraft } from '@/lib/insights/draft-generator'
import { SITE_URL } from '@/lib/schemas/organization'
import type { ImagePipelineInput, VideoPipelineInput, SchemaAssemblerInput, Citation } from '@/lib/insights/types'
import type { AuthorityMapTopic } from '@/lib/authority-map/types'

export const runtime = 'nodejs'

// Zod validation schema for POST body
const GenerateSchema = z.object({
  clientId: z.string().min(1),
  topicId: z.string().optional(),       // authority_maps row UUID (optional for direct calls)
  topic: z.object({                     // AuthorityMapTopic shape
    rank: z.number(),
    title: z.string(),
    targetQueries: z.array(z.string()),
    authorityGapScore: z.number(),
    recommendedSchemaTypes: z.array(z.string()),
    faqClusters: z.array(z.string()),
    estimatedCitationLift: z.string(),
  }),
  authorName: z.string().default('Adam Silva'),
  postUrl: z.string().url().optional(),  // if omitted, derive from slug
  imageCount: z.number().min(1).max(8).default(3),
})

// Convert title to URL-safe slug: lowercase, hyphens, no special chars
function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/**
 * resolveCitations — resolves minimum 3 peer paper citations from topic keywords.
 *
 * Sources are authoritative papers and specifications:
 * W3C, Google, schema.org, arXiv — never competitor links.
 * Used for factual accuracy in Article JSON-LD citation[] property.
 * Baseline citations (schema.org, Google, W3C JSON-LD) always guaranteed.
 */
function resolveCitations(topic: AuthorityMapTopic): Citation[] {
  const combined = (topic.title + ' ' + topic.targetQueries.join(' ')).toLowerCase()
  const matched: Citation[] = []

  if (combined.includes('ucp') || combined.includes('universal commerce')) {
    matched.push({ title: 'Universal Commerce Protocol Specification', url: 'https://www.adamsilvaconsulting.com/.well-known/ucp', publisher: 'Adam Silva Consulting', year: 2026 })
    matched.push({ title: 'Google Shopping Graph: Product Data Specification', url: 'https://developers.google.com/shopping-content/guides/products/data-spec', publisher: 'Google', year: 2024 })
  }
  if (combined.includes('acp') || combined.includes('agentic commerce protocol')) {
    matched.push({ title: 'Agentic Commerce Protocol Specification', url: 'https://www.adamsilvaconsulting.com/.well-known/acp', publisher: 'Adam Silva Consulting', year: 2026 })
  }
  if (combined.includes('ap2') || combined.includes('agent payments')) {
    matched.push({ title: 'W3C Verifiable Credentials Data Model 2.0', url: 'https://www.w3.org/TR/vc-data-model-2.0/', publisher: 'W3C', year: 2024 })
    matched.push({ title: 'W3C Decentralized Identifiers (DIDs) v1.0', url: 'https://www.w3.org/TR/did-core/', publisher: 'W3C', year: 2022 })
  }
  if (combined.includes('schema') || combined.includes('json-ld') || combined.includes('structured data')) {
    matched.push({ title: 'Google Search Central: Intro to Structured Data', url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', publisher: 'Google Search Central', year: 2025 })
    matched.push({ title: 'W3C JSON-LD 1.1 Specification', url: 'https://www.w3.org/TR/json-ld11/', publisher: 'W3C', year: 2024 })
  }
  if (combined.includes('ai') || combined.includes('llm') || combined.includes('agent')) {
    matched.push({ title: 'Generative Agents: Interactive Simulacra of Human Behavior', url: 'https://arxiv.org/abs/2304.03442', publisher: 'arXiv / Stanford', year: 2023 })
  }
  if (combined.includes('seo') || combined.includes('aeo') || combined.includes('geo') || combined.includes('answer engine')) {
    matched.push({ title: 'Google: How Search Works — Understand Your Results', url: 'https://www.google.com/search/howsearchworks/', publisher: 'Google', year: 2025 })
  }

  // Baseline fallback citations — always available regardless of topic keywords
  const baseline: Citation[] = [
    { title: 'Schema.org Article Type Specification', url: 'https://schema.org/Article', publisher: 'Schema.org', year: 2024 },
    { title: 'Google Search Central: Structured Data Guidelines', url: 'https://developers.google.com/search/docs/appearance/structured-data', publisher: 'Google', year: 2025 },
    { title: 'W3C JSON-LD 1.1 Specification', url: 'https://www.w3.org/TR/json-ld11/', publisher: 'W3C', year: 2024 },
  ]

  // Deduplicate by URL, enforce minimum 3 via baseline guarantee
  const seen = new Set<string>()
  const result: Citation[] = []
  for (const c of [...matched, ...baseline]) {
    if (!seen.has(c.url)) { seen.add(c.url); result.push(c) }
  }
  return result  // always at least 3 (baseline guarantees this)
}

/**
 * POST /api/insights/generate
 *
 * Orchestrates the full blog production pipeline in a single call:
 * 1. Validate input (Zod)
 * 2. Generate video (Remotion render + WebVTT CC)
 * 3. Generate images (sharp PNGs with XMP JSON-LD, Remotion still as Image 1)
 * 4. Resolve citations (minimum 3 peer papers)
 * 5. Assemble schema (@graph JSON-LD)
 * 6. Insert to Supabase blog_posts
 * 7. Publish to Strapi v5 (non-fatal — failure returns strapiId: null)
 *
 * Returns: { success, postId, strapiId, slug, imageCount, strapiError? }
 */
export async function POST(req: Request): Promise<Response> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = GenerateSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 })
  }

  const { clientId, topicId, topic, authorName, imageCount } = parsed.data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
  const slug = toSlug(topic.title)
  const postUrl = parsed.data.postUrl ?? `${siteUrl}/insights/${slug}`
  const publishedAt = new Date().toISOString()
  const excerpt = `${topic.title}. An Answer-First deep-dive covering ${topic.targetQueries.slice(0, 2).join(' and ')}.`
  const imagesBaseUrl = process.env.INSIGHTS_IMAGES_BASE_URL ?? `${siteUrl}/images/insights`

  // AI-generated 2000+ word article via generateDraft (uses getIntakeModel internally)
  const draft = await generateDraft(topic, authorName, siteUrl)
  const content = draft.content

  // Step 7: Video pipeline first — generates Remotion still frame (Image 1) + WebVTT CC
  const videoPipelineInput: VideoPipelineInput = {
    topic,
    slug,
    postTitle: topic.title,
    excerpt,
    authorName,
    category: 'Agentic Commerce',
  }
  const video = await generateVideo(videoPipelineInput)

  // Step 8: Image pipeline — passes Remotion still frame path as Image 1 source
  // Images 2-N are stub brand-color PNGs. All have ImageObject JSON-LD in XMP metadata.
  const imagePipelineInput: ImagePipelineInput = {
    topic,
    postUrl,
    postTitle: topic.title,
    clientName: authorName,
    imageCount,
    imagesBaseUrl,
  }
  const images = await generateImages(imagePipelineInput, video.stillImagePath)

  // Step 9: Resolve peer paper citations (minimum 3, never competitors)
  const citations = resolveCitations(topic)

  // Step 10: Schema assembler — builds interlinked JSON-LD @graph including VideoObject + citation[]
  const schemaInput: SchemaAssemblerInput = {
    topic,
    postUrl,
    postTitle: topic.title,
    slug,
    excerpt,
    authorName,
    publishedAt,
    images,
    video,
    citations,
    captionTrack: video.captionTrack,
    category: 'Agentic Commerce',
  }
  const schemas = assembleSchema(schemaInput)

  // Step 11: Supabase insert to blog_posts table
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return Response.json({ error: 'Supabase environment variables not configured' }, { status: 500 })
  }

  const supaRes = await fetch(`${supabaseUrl}/rest/v1/blog_posts`, {
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
      title: topic.title,
      content,
      schema_json: schemas,
      images: images,
      ...(topicId ? { authority_map_id: topicId } : {}),
    }),
  })

  if (!supaRes.ok) {
    const errText = await supaRes.text()
    return Response.json({ error: `Supabase insert failed: ${supaRes.status} ${errText}` }, { status: 500 })
  }

  const rows = await supaRes.json() as Array<{ id: string }>
  const postId = rows[0]?.id ?? null

  // Step 12: Strapi v5 publish (non-fatal — failure returns strapiId: null)
  const strapiUrl = process.env.STRAPI_URL ?? 'https://cms.adamsilvaconsulting.com'
  const strapiToken = process.env.STRAPI_API_TOKEN
  let strapiId: number | null = null
  let strapiError: string | undefined

  if (!strapiToken) {
    strapiError = 'STRAPI_API_TOKEN not set — Strapi publish skipped'
    console.warn(`[blog/generate] ${strapiError}`)
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
            title: topic.title,
            slug,
            content,
            excerpt,
            schema_json: schemas,
            publishedAt,  // publish immediately (Strapi v5 publish-on-create)
          },
        }),
      })
      if (strapiRes.ok) {
        const strapiBody = await strapiRes.json() as { data?: { id?: number } }
        strapiId = strapiBody.data?.id ?? null
      } else {
        const errText = await strapiRes.text()
        strapiError = `Strapi publish failed: ${strapiRes.status} ${errText}`
        console.warn(`[blog/generate] ${strapiError}`)
      }
    } catch (err) {
      strapiError = `Strapi publish error: ${err instanceof Error ? err.message : String(err)}`
      console.warn(`[blog/generate] ${strapiError}`)
    }
  }

  return Response.json({
    success: true,
    postId,
    strapiId,
    slug,
    imageCount: images.length,
    ...(strapiError ? { strapiError } : {}),
  })
}
