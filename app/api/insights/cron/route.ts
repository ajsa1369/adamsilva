import type { BlogClientConfig } from '@/lib/insights/types'

export const runtime = 'nodejs'

// Shape of each row from the authority_maps Supabase table
interface AuthorityMapRow {
  id: string
  topics_json: Array<{
    rank: number
    title: string
    targetQueries: string[]
    authorityGapScore: number
    recommendedSchemaTypes: string[]
    faqClusters: string[]
    estimatedCitationLift: string
  }>
}

/**
 * GET /api/insights/cron
 *
 * Vercel Cron handler — runs on the second Monday of every month at 10:00 UTC.
 * Cron schedule: "0 10 8-14 * 1" (days 8-14 of month, Monday=1)
 *
 * For each client in INSIGHTS_CLIENTS:
 * 1. Queries Supabase authority_maps for approved rows for the current month
 * 2. For each approved authority map row, calls POST /api/insights/generate for every topic
 * 3. Returns { processed, errors } summary
 *
 * Auth: CRON_SECRET header (Authorization: Bearer <secret>)
 * Strapi admin setup and STRAPI_API_TOKEN must be configured for blog publish to work.
 */
export async function GET(req: Request): Promise<Response> {
  // 1. Verify CRON_SECRET — same pattern as authority-map cron route
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Parse INSIGHTS_CLIENTS — JSON array of BlogClientConfig
  const raw = process.env.INSIGHTS_CLIENTS
  if (!raw) {
    return Response.json({ processed: 0, errors: ['INSIGHTS_CLIENTS not set'] })
  }

  let clients: BlogClientConfig[]
  try {
    clients = JSON.parse(raw) as BlogClientConfig[]
  } catch {
    return Response.json({ processed: 0, errors: ['INSIGHTS_CLIENTS is not valid JSON'] })
  }

  if (!Array.isArray(clients) || clients.length === 0) {
    return Response.json({ processed: 0, errors: ['INSIGHTS_CLIENTS must be a non-empty JSON array'] })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adamsilvaconsulting.com'

  if (!supabaseUrl || !serviceKey) {
    return Response.json({ processed: 0, errors: ['Supabase env vars not configured'] })
  }

  // Current month in YYYY-MM format for authority_maps.month query
  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const errors: string[] = []
  let processed = 0

  // Process each client sequentially — blog posts are large; avoid parallel to stay within memory limits
  for (const client of clients) {
    try {
      // 3. Query Supabase authority_maps for approved rows for this client and current month
      const mapRes = await fetch(
        `${supabaseUrl}/rest/v1/authority_maps?client_id=eq.${encodeURIComponent(client.clientId)}&month=eq.${month}&approved_at=not.is.null&select=id,topics_json`,
        {
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            Accept: 'application/json',
          },
        }
      )

      if (!mapRes.ok) {
        errors.push(`${client.clientId}: authority_map query failed (${mapRes.status})`)
        continue
      }

      const maps = await mapRes.json() as AuthorityMapRow[]
      if (maps.length === 0) {
        // No approved map for this client this month — skip silently (expected in some months)
        continue
      }

      // Use first approved authority map for this month
      const map = maps[0]
      const topics = map.topics_json ?? []

      // 4. Call /api/insights/generate for each topic sequentially
      for (const topic of topics) {
        try {
          const genRes = await fetch(`${siteUrl}/api/insights/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientId: client.clientId,
              topicId: map.id,
              topic,
              authorName: client.authorName,
              imageCount: 3,
            }),
          })

          if (!genRes.ok) {
            const errText = await genRes.text()
            errors.push(`${client.clientId}/${topic.title}: generate failed (${genRes.status}) ${errText}`)
          } else {
            processed++
          }
        } catch (err) {
          errors.push(`${client.clientId}/${topic.title}: ${err instanceof Error ? err.message : String(err)}`)
        }
      }
    } catch (err) {
      errors.push(`${client.clientId}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return Response.json({ processed, errors })
}
