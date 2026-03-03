import { SITE_URL } from '@/lib/schemas/organization'

export const runtime = 'nodejs'

interface VideoSitemapEntry {
  postUrl: string
  thumbnailUrl: string
  title: string
  description: string
  contentUrl: string
  durationSeconds: number  // integer seconds (Google spec — NOT ISO 8601)
  uploadDate: string       // ISO date string
  transcript: string
}

// Parse ISO 8601 duration to integer seconds (Google video sitemap requirement)
// PT28S → 28, PT1M30S → 90, PT2M0S → 120
function parseDurationSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const h = parseInt(match[1] ?? '0', 10)
  const m = parseInt(match[2] ?? '0', 10)
  const s = parseInt(match[3] ?? '0', 10)
  return h * 3600 + m * 60 + s
}

// Escape XML special characters
function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Extract VideoObject from a schema_json array (searches by @type)
function findVideoObject(schemaJson: unknown[]): Record<string, unknown> | null {
  for (const node of schemaJson) {
    if (node && typeof node === 'object' && (node as Record<string, unknown>)['@type'] === 'VideoObject') {
      return node as Record<string, unknown>
    }
  }
  return null
}

function buildVideoSitemapXml(entries: VideoSitemapEntry[]): string {
  const urls = entries.map((e) => `
  <url>
    <loc>${xmlEscape(e.postUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${xmlEscape(e.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${xmlEscape(e.title)}</video:title>
      <video:description>${xmlEscape(e.description.slice(0, 2048))}</video:description>
      <video:content_loc>${xmlEscape(e.contentUrl)}</video:content_loc>
      <video:duration>${e.durationSeconds}</video:duration>
      <video:publication_date>${e.uploadDate}</video:publication_date>
      <video:transcript>${xmlEscape(e.transcript)}</video:transcript>
    </video:video>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urls}
</urlset>`
}

export async function GET(): Promise<Response> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL

  if (!supabaseUrl || !serviceKey) {
    return new Response('Supabase not configured', { status: 500 })
  }

  // Fetch all blog_posts with schema_json populated
  const res = await fetch(
    `${supabaseUrl}/rest/v1/blog_posts?select=slug,title,schema_json&schema_json=not.is.null`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json',
      },
    }
  )

  if (!res.ok) {
    return new Response('Failed to fetch posts', { status: 500 })
  }

  type BlogPostRow = { slug: string; title: string; schema_json: unknown[] }
  const posts = await res.json() as BlogPostRow[]

  const entries: VideoSitemapEntry[] = []

  for (const post of posts) {
    if (!Array.isArray(post.schema_json)) continue

    const video = findVideoObject(post.schema_json)
    if (!video) continue  // skip posts without VideoObject

    const thumbnailUrl = typeof video['thumbnailUrl'] === 'string' ? video['thumbnailUrl'] : ''
    const contentUrl = typeof video['contentUrl'] === 'string' ? video['contentUrl'] : ''
    const description = typeof video['description'] === 'string' ? video['description'] : ''
    const uploadDate = typeof video['uploadDate'] === 'string' ? video['uploadDate'] : new Date().toISOString()
    const transcript = typeof video['transcript'] === 'string' ? video['transcript'] : ''
    const durationIso = typeof video['duration'] === 'string' ? video['duration'] : 'PT0S'

    if (!contentUrl) continue  // skip if no video URL

    entries.push({
      postUrl: `${siteUrl}/insights/${post.slug}`,
      thumbnailUrl,
      title: post.title,
      description,
      contentUrl,
      durationSeconds: parseDurationSeconds(durationIso),
      uploadDate,
      transcript,
    })
  }

  const xml = buildVideoSitemapXml(entries)

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
