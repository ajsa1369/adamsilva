/**
 * app/api/authority-map/generate/route.ts
 *
 * POST endpoint: validate request → call generateAuthorityMap (researcher) →
 * upsert result to Supabase authority_maps table → send branded Resend approval email →
 * return { success: true, mapId, topicCount }
 */

import { z } from 'zod'
import { generateAuthorityMap } from '@/lib/authority-map/researcher'
import type { ClientConfig, AuthorityMapTopic } from '@/lib/authority-map/types'

export const runtime = 'nodejs'

const GenerateSchema = z.object({
  clientId: z.string().min(1),
  industry: z.string().min(1),
  serviceArea: z.string().min(1),
  approvalEmail: z.string().email(),
  existingContentUrls: z.array(z.string().url()).optional(),
})

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getMonthLabel(yyyyMm: string): string {
  const [year, monthNum] = yyyyMm.split('-')
  const idx = parseInt(monthNum, 10) - 1
  return `${MONTHS[idx]} ${year}`
}

function buildApprovalEmailHtml(
  monthLabel: string,
  topicCount: number,
  top5Topics: AuthorityMapTopic[],
  approveUrl: string,
): string {
  const topicsRows = top5Topics
    .map(
      (t) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${t.rank}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${t.title}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${t.authorityGapScore}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${t.estimatedCitationLift}</td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your ${monthLabel} Content Calendar is Ready</title>
</head>
<body style="margin:0;padding:0;background:#f8faff;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faff;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header banner -->
          <tr>
            <td style="background:#1B2E4B;padding:24px 32px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:18px;font-weight:600;letter-spacing:0.5px;">
                Adam Silva Consulting — Content Calendar
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <p style="margin:0 0 16px;color:#1B2E4B;font-size:16px;line-height:1.6;">
                Your ${monthLabel} topical authority map is ready for review. We've identified
                <strong>${topicCount} high-opportunity content topics</strong> based on real-time
                competitor analysis and AI citation gap research.
              </p>

              <!-- Topics table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:24px 0;font-size:14px;">
                <thead>
                  <tr style="background:#1B2E4B;color:#ffffff;">
                    <th style="padding:10px 12px;text-align:center;font-weight:600;">Rank</th>
                    <th style="padding:10px 12px;text-align:left;font-weight:600;">Topic</th>
                    <th style="padding:10px 12px;text-align:center;font-weight:600;">Authority Gap Score</th>
                    <th style="padding:10px 12px;text-align:left;font-weight:600;">Est. Citation Lift</th>
                  </tr>
                </thead>
                <tbody style="color:#374151;">
                  ${topicsRows}
                </tbody>
              </table>

              <!-- Approve button -->
              <div style="text-align:center;margin:32px 0;">
                <a href="${approveUrl}"
                   style="display:inline-block;background:#4D8EC0;color:#ffffff;text-decoration:none;
                          padding:14px 32px;border-radius:6px;font-size:16px;font-weight:600;">
                  Approve Content Calendar
                </a>
              </div>

              <p style="margin:16px 0 0;color:#6b7280;font-size:14px;line-height:1.6;">
                To modify topics, reply to this email with your changes. Content production begins once approved.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faff;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:13px;">
                Adam Silva Consulting |
                <a href="https://www.adamsilvaconsulting.com" style="color:#4D8EC0;text-decoration:none;">
                  adamsilvaconsulting.com
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: Request) {
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = GenerateSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid request', details: parsed.error.issues },
        { status: 400 },
      )
    }

    const config: ClientConfig = {
      clientId: parsed.data.clientId,
      industry: parsed.data.industry,
      serviceArea: parsed.data.serviceArea,
      approvalEmail: parsed.data.approvalEmail,
      existingContentUrls: parsed.data.existingContentUrls,
    }

    // 1. Run researcher (dual-provider: NotebookLM MCP or Gemini)
    const result = await generateAuthorityMap(config)

    // 2. Upsert to Supabase authority_maps
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
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

    // 3. Send branded approval email via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adamsilvaconsulting.com'
    const monthLabel = getMonthLabel(result.month)
    const approveUrl = `${siteUrl}/api/authority-map/approve?id=${row.id}`
    const top5Topics = result.topics.slice(0, 5)
    const emailHtml = buildApprovalEmailHtml(monthLabel, result.topics.length, top5Topics, approveUrl)

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Adam Silva Consulting <info@adamsilvaconsulting.com>',
        to: [config.approvalEmail],
        subject: `Your ${monthLabel} Content Calendar is Ready — Review Required`,
        html: emailHtml,
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      throw new Error(`Resend email failed: ${emailRes.status} ${errText}`)
    }

    return Response.json(
      { success: true, mapId: row.id, topicCount: result.topics.length },
      { status: 200 },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ error: message }, { status: 500 })
  }
}
