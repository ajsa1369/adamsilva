/**
 * app/api/intake/followup/route.ts
 *
 * Vercel Cron job: fires daily, finds proposals past 48 hours with status='pending_call'
 * that have NOT yet been followed up (followup_sent_at IS NULL).
 * Sends a follow-up email via the send-proposal-email edge function.
 * Marks followup_sent_at = now() after send — does NOT change status column.
 *
 * Cron schedule defined in vercel.json: daily at 9 AM UTC.
 * INTAKE-08: 48-hour follow-up if no strategy call booked after proposal delivery.
 *
 * NOTE: Do NOT PATCH status='followed_up' — not in CHECK constraint.
 * Valid status values: 'pending_call', 'called', 'won', 'lost', 'expired'.
 * Use followup_sent_at timestamp column instead to record when follow-up was sent.
 */

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ProposalRow {
  id: string
  prospect_email: string
  prospect_name: string
  recommended_package: string
  setup_total: number
  monthly_total: number
  proposal_pdf_url: string | null
  status: string
  created_at: string
}

export async function GET(req: Request) {
  // Validate cron secret to prevent unauthorized calls
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  // Find proposals:
  //   status = 'pending_call'         (still in initial state)
  //   followup_sent_at IS NULL        (not yet followed up — avoids re-sends)
  //   created_at < now - 48h          (48-hour window has elapsed)
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()

  const res = await fetch(
    `${supabaseUrl}/rest/v1/proposals?status=eq.pending_call&followup_sent_at=is.null&created_at=lt.${cutoff}&select=id,prospect_email,prospect_name,recommended_package,setup_total,monthly_total,proposal_pdf_url`,
    {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: `Supabase query failed: ${err}` }, { status: 500 })
  }

  const proposals = await res.json() as ProposalRow[]

  if (proposals.length === 0) {
    return NextResponse.json({ success: true, sent: 0, message: 'No proposals require follow-up' })
  }

  // Send follow-up email for each pending proposal
  let sent = 0
  const errors: string[] = []

  for (const proposal of proposals) {
    const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-proposal-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        proposal_id: proposal.id,
        prospect_email: proposal.prospect_email,
        prospect_name: proposal.prospect_name,
        proposal_pdf_url: proposal.proposal_pdf_url ?? `${process.env.NEXT_PUBLIC_SITE_URL}/api/intake/pdf`,
        package_name: proposal.recommended_package,
        setup_total: proposal.setup_total,
        monthly_total: proposal.monthly_total,
      }),
    })

    if (emailRes.ok) {
      // Mark as followed-up using followup_sent_at timestamp.
      // DO NOT change status — 'followed_up' is not a valid CHECK value.
      // Setting followup_sent_at prevents this row from appearing in future cron runs.
      await fetch(`${supabaseUrl}/rest/v1/proposals?id=eq.${proposal.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followup_sent_at: new Date().toISOString() }),
      })
      sent++
    } else {
      errors.push(`Failed to email ${proposal.prospect_email}: ${emailRes.status}`)
    }
  }

  return NextResponse.json({ success: true, sent, errors: errors.length > 0 ? errors : undefined })
}
