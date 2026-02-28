import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const FROM_EMAIL = 'Adam Silva Consulting <info@adamsilvaconsulting.com>'
const SITE_URL = 'https://www.adamsilvaconsulting.com'

interface EmailPayload {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  tags?: { name: string; value: string }[]
}

async function sendViaResend(payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!RESEND_API_KEY) return { success: false, error: 'RESEND_API_KEY not set' }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: Array.isArray(payload.to) ? payload.to : [payload.to],
      subject: payload.subject,
      html: payload.html,
      ...(payload.text && { text: payload.text }),
      ...(payload.replyTo && { reply_to: payload.replyTo }),
      ...(payload.tags && { tags: payload.tags }),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return { success: false, error: `Resend ${res.status}: ${err}` }
  }

  const data = await res.json()
  return { success: true, id: data.id }
}

function contactConfirmationHtml(name: string, message: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>We received your message</title></head>
<body style="font-family: Inter, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">Adam Silva Consulting</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Global Infrastructure for Agentic Commerce</p>
    </div>
    <div style="padding: 40px;">
      <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 16px;">Hi ${name},</h2>
      <p style="color: #475569; line-height: 1.6; margin: 0 0 16px;">Thank you for reaching out. We've received your message and will respond within 1–2 business days.</p>
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #3b82f6;">
        <p style="color: #64748b; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Your message:</p>
        <p style="color: #0f172a; margin: 0; line-height: 1.6;">${message}</p>
      </div>
      <p style="color: #475569; line-height: 1.6;">While you wait, explore our resources:</p>
      <ul style="color: #475569; line-height: 2;">
        <li><a href="${SITE_URL}/protocols/ucp" style="color: #3b82f6;">Universal Commerce Protocol (UCP)</a></li>
        <li><a href="${SITE_URL}/tools/aeo-score" style="color: #3b82f6;">Free AEO Readiness Score</a></li>
        <li><a href="${SITE_URL}/insights" style="color: #3b82f6;">Insights & Research</a></li>
      </ul>
    </div>
    <div style="background: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">Adam Silva Consulting · <a href="${SITE_URL}" style="color: #64748b;">adamsilvaconsulting.com</a></p>
    </div>
  </div>
</body>
</html>`
}

function newsletterWelcomeHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome to ASC Insights</title></head>
<body style="font-family: Inter, sans-serif; background: #f8fafc; margin: 0; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #000000 0%, #111111 50%, #1e40af 100%); padding: 40px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">Welcome to the Inner Circle</h1>
      <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0;">Agentic Commerce Intelligence · UCP · ACP · AP2</p>
    </div>
    <div style="padding: 40px;">
      <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 16px;">Hi ${firstName},</h2>
      <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">You're now subscribed to Adam Silva Consulting's intelligence briefings on agentic commerce — the protocols reshaping how AI agents discover, purchase, and pay.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${SITE_URL}/resources" style="background: #3b82f6; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">Download the Free Guide →</a>
      </div>
      <p style="color: #475569; line-height: 1.6;">Start exploring:</p>
      <ul style="color: #475569; line-height: 2.2;">
        <li><a href="${SITE_URL}/hub/universal-commerce-protocol" style="color: #3b82f6;">What is UCP? (Complete Hub)</a></li>
        <li><a href="${SITE_URL}/tools/protocol-checker" style="color: #3b82f6;">Check your protocol compliance (free)</a></li>
        <li><a href="${SITE_URL}/research/state-of-agentic-commerce-2026" style="color: #3b82f6;">State of Agentic Commerce 2026 Report</a></li>
      </ul>
    </div>
    <div style="background: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">Adam Silva Consulting · <a href="${SITE_URL}" style="color: #64748b;">adamsilvaconsulting.com</a></p>
    </div>
  </div>
</body>
</html>`
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
    const body = await req.json()
    const { type, data } = body

    let result: { success: boolean; id?: string; error?: string }

    if (type === 'contact_confirmation') {
      result = await sendViaResend({
        to: data.email,
        subject: 'We received your message — Adam Silva Consulting',
        html: contactConfirmationHtml(data.name, data.message),
        replyTo: 'info@adamsilvaconsulting.com',
        tags: [{ name: 'type', value: 'contact_confirmation' }],
      })
    } else if (type === 'newsletter_welcome') {
      result = await sendViaResend({
        to: data.email,
        subject: 'Welcome to Adam Silva Consulting Insights',
        html: newsletterWelcomeHtml(data.first_name || 'there'),
        tags: [{ name: 'type', value: 'newsletter_welcome' }],
      })
    } else {
      return new Response(JSON.stringify({ error: `Unknown email type: ${type}` }), { status: 400 })
    }

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
