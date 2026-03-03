/**
 * app/api/authority-map/cron/route.ts
 *
 * Vercel Cron GET handler: fires on the first Monday of each month at 9 AM UTC.
 * Reads AUTHORITY_MAP_CLIENTS env var (JSON array of ClientConfig),
 * runs generateAuthorityMap per client sequentially (avoids rate limits),
 * upserts to Supabase authority_maps, sends approval email via SMTP (hosting.com).
 *
 * Cron schedule defined in vercel.json: "0 9 1-7 * 1" (first Monday, 9 AM UTC).
 * Auth: Vercel injects Authorization: Bearer {CRON_SECRET} automatically.
 */

import { generateAuthorityMap } from '@/lib/authority-map/researcher'
import { sendMail } from '@/lib/email/smtp'
import type { ClientConfig } from '@/lib/authority-map/types'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  // Verify CRON_SECRET (same pattern as Phase 4 followup cron)
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Parse client list from env var
  const raw = process.env.AUTHORITY_MAP_CLIENTS
  if (!raw) {
    return Response.json({ processed: 0, errors: ['AUTHORITY_MAP_CLIENTS not set'] })
  }

  let clients: ClientConfig[]
  try {
    clients = JSON.parse(raw) as ClientConfig[]
  } catch {
    return Response.json({ processed: 0, errors: ['AUTHORITY_MAP_CLIENTS is not valid JSON'] })
  }

  if (!Array.isArray(clients) || clients.length === 0) {
    return Response.json({ processed: 0, errors: ['AUTHORITY_MAP_CLIENTS must be a non-empty JSON array'] })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adamsilvaconsulting.com'

  const errors: string[] = []
  let processed = 0

  for (const client of clients) {
    try {
      // 1. Run researcher (dual-provider: NotebookLM MCP or Gemini)
      const result = await generateAuthorityMap(client)

      // 2. Upsert to Supabase authority_maps
      if (!supabaseUrl || !serviceKey) {
        throw new Error('Supabase environment variables not configured')
      }

      const supaRes = await fetch(`${supabaseUrl}/rest/v1/authority_maps`, {
        method: 'POST',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation,resolution=merge-duplicates',
        },
        body: JSON.stringify({
          client_id: result.clientId,
          month: result.month,
          topics_json: result.topics,
        }),
      })

      if (!supaRes.ok) {
        const errText = await supaRes.text()
        throw new Error(`Supabase upsert failed: ${supaRes.status} ${errText}`)
      }

      const rows = await supaRes.json() as Array<{ id: string }>
      const [row] = rows
      if (!row?.id) {
        throw new Error('Supabase upsert did not return a row id')
      }

      // 3. Send approval email via SMTP (hosting.com mail server)
      await sendMail({
        to: client.approvalEmail,
        subject: `Your ${result.month} Content Calendar is Ready — Review Required`,
        html: `<p>Your authority map for ${result.month} has been generated. <a href="${siteUrl}/api/authority-map/approve?id=${row.id}">Approve here</a></p>`,
      })

      processed++
    } catch (err) {
      errors.push(`${client.clientId}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return Response.json({ processed, errors })
}
