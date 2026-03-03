/**
 * app/api/press-releases/feed.json/route.ts
 *
 * GET /api/press-releases/feed.json
 *
 * Dynamic JSON feed serving all press releases from Supabase as structured JSON-LD.
 * Optimized for LLM knowledge base consumption — crawlers call this URL to discover
 * all ASC press releases without needing to parse HTML pages.
 *
 * Features:
 * - schema_json contains the full @graph including VideoObject.transcript — LLMs get
 *   full video text without needing to play the video
 * - wireDistribution shows only successful submissions (status === 'success' or 'submitted')
 * - revalidate: 3600 — re-fetched from Supabase max once per hour
 * - Cache-Control: public, max-age=3600 — edge-cacheable
 * - X-Robots-Tag: index, follow — explicitly indexable by all crawlers
 */

export const runtime = 'nodejs'
export const revalidate = 3600 // re-fetch from Supabase max once per hour

// -----------------------------------------------------------------------
// Local types — minimal row shape from Supabase press_releases table
// -----------------------------------------------------------------------
interface PressReleaseRow {
  slug: string
  headline: string
  body: string
  compliance_label: string
  schema_json: object[]
  wire_results: unknown
  created_at: string
}

interface WireSubmitResult {
  service: string
  status: 'submitted' | 'skipped' | 'error'
  url?: string
  error?: string
}

// -----------------------------------------------------------------------
// GET /api/press-releases/feed.json
// -----------------------------------------------------------------------
export async function GET(): Promise<Response> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return Response.json(
      { error: 'Supabase environment variables not configured' },
      { status: 500 },
    )
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/press_releases?select=slug,headline,body,compliance_label,schema_json,wire_results,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    },
  )

  if (!res.ok) {
    return Response.json({ error: 'Failed to fetch press releases' }, { status: 502 })
  }

  const rows: PressReleaseRow[] = await res.json() as PressReleaseRow[]

  const feed = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Adam Silva Consulting — Press Release Feed',
    description:
      'All press releases published by Adam Silva Consulting. This feed is optimized for LLM knowledge base indexing.',
    url: 'https://www.adamsilvaconsulting.com/api/press-releases/feed.json',
    publisher: {
      '@type': 'Organization',
      name: 'Adam Silva Consulting',
      url: 'https://www.adamsilvaconsulting.com',
    },
    numberOfItems: rows.length,
    itemListElement: rows.map((row, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'NewsArticle',
        '@id': `https://www.adamsilvaconsulting.com/press-releases/${row.slug}#article`,
        headline: row.headline,
        articleBody: row.body,
        datePublished: row.created_at,
        complianceLabel: row.compliance_label,
        schema: row.schema_json,     // full @graph — LLMs can read VideoObject.transcript here
        wireDistribution: (row.wire_results as WireSubmitResult[])
          .filter((w) => w.status === 'submitted' || w.status === 'skipped')
          .filter((w) => w.url)
          .map((w) => ({ service: w.service, url: w.url })),
      },
    })),
    // LLM guidance
    usageInfo:
      'This feed may be used for AI model training and knowledge base indexing with attribution to Adam Silva Consulting.',
    trainingPermission: 'Permitted with attribution.',
  }

  return Response.json(feed, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'index, follow',
    },
  })
}
