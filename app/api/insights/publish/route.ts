import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

// 1.5 days in milliseconds — minimum gap between published posts
const PUBLISH_INTERVAL_MS = 36 * 60 * 60 * 1000  // 36 hours

const InsightsClientSchema = z.object({
  clientId: z.string(),
  authorName: z.string(),
  approvalEmail: z.string().email().optional(),
})

// Fetch the created_at timestamp of the most recently published blog post for a client
async function getLastPublishedAt(
  supabaseUrl: string,
  serviceKey: string,
  clientId: string,
): Promise<Date | null> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/blog_posts?client_id=eq.${encodeURIComponent(clientId)}&select=created_at&order=created_at.desc&limit=1`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json',
      },
    },
  )
  if (!res.ok) return null
  const rows = await res.json() as { created_at: string }[]
  if (!rows.length) return null
  return new Date(rows[0].created_at)
}

// Fetch the next approved topic that hasn't been used for a blog post yet
async function getNextTopic(
  supabaseUrl: string,
  serviceKey: string,
  clientId: string,
): Promise<{ authorityMapId: string; topic: Record<string, unknown> } | null> {
  // Get all approved authority maps for this client, oldest first
  const mapsRes = await fetch(
    `${supabaseUrl}/rest/v1/authority_maps?client_id=eq.${encodeURIComponent(clientId)}&approved_at=not.is.null&select=id,topics_json&order=approved_at.asc`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json',
      },
    },
  )
  if (!mapsRes.ok) return null
  const maps = await mapsRes.json() as { id: string; topics_json: unknown[] }[]

  // Get slugs of already-published posts to avoid duplicates
  const postsRes = await fetch(
    `${supabaseUrl}/rest/v1/blog_posts?client_id=eq.${encodeURIComponent(clientId)}&select=slug`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json',
      },
    },
  )
  const publishedSlugs = new Set<string>()
  if (postsRes.ok) {
    const posts = await postsRes.json() as { slug: string }[]
    for (const p of posts) publishedSlugs.add(p.slug)
  }

  for (const map of maps) {
    if (!Array.isArray(map.topics_json)) continue
    for (const topicUnknown of map.topics_json) {
      const topic = topicUnknown as Record<string, unknown>
      const title = typeof topic['title'] === 'string' ? topic['title'] : ''
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      if (!publishedSlugs.has(slug)) {
        return { authorityMapId: map.id, topic }
      }
    }
  }
  return null
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  // CRON_SECRET auth (same pattern as other cron routes)
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adamsilvaconsulting.com'

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  const clientsRaw = process.env.INSIGHTS_CLIENTS
  if (!clientsRaw) {
    return NextResponse.json({ error: 'INSIGHTS_CLIENTS not configured' }, { status: 500 })
  }

  let clients: z.infer<typeof InsightsClientSchema>[]
  try {
    clients = z.array(InsightsClientSchema).parse(JSON.parse(clientsRaw))
  } catch {
    return NextResponse.json({ error: 'INSIGHTS_CLIENTS JSON invalid' }, { status: 500 })
  }

  const results: { clientId: string; status: string; slug?: string; reason?: string }[] = []

  for (const client of clients) {
    // 1. Check 36-hour throttle
    const lastPublished = await getLastPublishedAt(supabaseUrl, serviceKey, client.clientId)
    const now = Date.now()

    if (lastPublished && now - lastPublished.getTime() < PUBLISH_INTERVAL_MS) {
      const hoursAgo = Math.round((now - lastPublished.getTime()) / 3600000)
      results.push({
        clientId: client.clientId,
        status: 'skipped',
        reason: `Last post was ${hoursAgo}h ago — 36h minimum not reached`,
      })
      continue
    }

    // 2. Get next unprocessed approved topic
    const next = await getNextTopic(supabaseUrl, serviceKey, client.clientId)
    if (!next) {
      results.push({
        clientId: client.clientId,
        status: 'skipped',
        reason: 'No approved unprocessed topics available',
      })
      continue
    }

    const { authorityMapId, topic } = next
    const topicTitle = typeof topic['title'] === 'string' ? topic['title'] : 'Untitled'
    const slug = topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const postUrl = `${siteUrl}/insights/${slug}`

    // 3. Call generate pipeline
    try {
      const generateRes = await fetch(`${siteUrl}/api/insights/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: client.clientId,
          topicId: authorityMapId,
          topic,
          authorName: client.authorName,
          postUrl,
          imageCount: 3,
        }),
      })

      if (!generateRes.ok) {
        const err = await generateRes.text()
        results.push({ clientId: client.clientId, status: 'error', reason: err.slice(0, 200) })
        continue
      }

      await generateRes.json() as { success: boolean; postId?: string }
      results.push({ clientId: client.clientId, status: 'published', slug })
    } catch (err) {
      results.push({
        clientId: client.clientId,
        status: 'error',
        reason: err instanceof Error ? err.message : String(err),
      })
    }
  }

  return NextResponse.json({ processed: results.filter((r) => r.status === 'published').length, results })
}
