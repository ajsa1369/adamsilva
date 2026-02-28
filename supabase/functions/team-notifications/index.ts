import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const TEAM_EMAIL = Deno.env.get('TEAM_EMAIL') ?? 'info@adamsilvaconsulting.com'
const SITE_URL = 'https://www.adamsilvaconsulting.com'

interface NotificationPayload {
  type: 'new_contact' | 'new_lead' | 'new_newsletter'
  data: Record<string, string | number | boolean | null>
}

async function sendTeamEmail(subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log('No RESEND_API_KEY — skipping team notification')
    return { success: true, skipped: true }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ASC Notifications <notifications@adamsilvaconsulting.com>',
      to: [TEAM_EMAIL],
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Team notification failed:', err)
    return { success: false, error: err }
  }

  const data = await res.json()
  return { success: true, id: data.id }
}

function newContactHtml(data: Record<string, string | number | boolean | null>): string {
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1e40af;">🔔 New Contact Form Submission</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Name</td><td style="padding: 8px;">${data.name || '—'}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">Email</td><td style="padding: 8px;"><a href="mailto:${data.email}">${data.email || '—'}</a></td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Company</td><td style="padding: 8px;">${data.company || '—'}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: bold; color: #374151;">Service Interest</td><td style="padding: 8px;">${data.service || '—'}</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #374151; vertical-align: top;">Message</td><td style="padding: 8px;">${data.message || '—'}</td></tr>
  </table>
  <p style="margin-top: 24px;"><a href="${SITE_URL}/admin" style="background: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">View in Dashboard</a></p>
</div>`
}

function newNewsletterHtml(data: Record<string, string | number | boolean | null>): string {
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #059669;">📧 New Newsletter Signup</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${data.first_name || ''} ${data.last_name || ''}</td></tr>
    <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${data.email}">${data.email || '—'}</a></td></tr>
    <tr><td style="padding: 8px; font-weight: bold;">Source</td><td style="padding: 8px;">${data.source || 'website'}</td></tr>
  </table>
  <p style="color: #6b7280; margin-top: 16px; font-size: 14px;">Total subscribers growing!</p>
</div>`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const body: NotificationPayload = await req.json()
    const { type, data } = body

    let result

    if (type === 'new_contact') {
      result = await sendTeamEmail(
        `🔔 New Contact: ${data.name || data.email} — ${data.service || 'General'}`,
        newContactHtml(data)
      )
    } else if (type === 'new_newsletter') {
      result = await sendTeamEmail(
        `📧 New Subscriber: ${data.email}`,
        newNewsletterHtml(data)
      )
    } else if (type === 'new_lead') {
      result = await sendTeamEmail(
        `⭐ New Lead: ${data.email} (${data.source || 'unknown source'})`,
        `<p>New lead: <strong>${data.email}</strong> from ${data.source}</p>`
      )
    } else {
      return new Response(JSON.stringify({ error: `Unknown type: ${type}` }), { status: 400 })
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
