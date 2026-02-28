import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SITE_URL = 'https://www.adamsilvaconsulting.com'

// The Agentic Commerce Guide — delivered as a rich HTML email (light theme)
function buildGuideEmail(firstName: string): string {
  const chapterStyle = 'margin-bottom: 32px; background: #f8fafc; border-radius: 12px; overflow: hidden;'
  const chapterHeaderStyle = (color: string) =>
    `padding: 16px 24px; border-left: 4px solid ${color};`
  const chapterBodyStyle = 'padding: 20px 24px;'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Complete Guide to Agentic Commerce — Adam Silva Consulting</title>
</head>
<body style="font-family: Inter, -apple-system, sans-serif; background: #f1f5f9; margin: 0; padding: 32px 16px;">
  <div style="max-width: 660px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 48px 40px; text-align: center;">
      <div style="display: inline-block; background: rgba(255,255,255,0.15); border-radius: 999px; padding: 4px 14px; font-size: 11px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Adam Silva Consulting</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 30px; font-weight: 900; line-height: 1.25;">The Complete Guide to<br>Agentic Commerce</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 14px 0 0; font-size: 15px; letter-spacing: 0.05em;">UCP &nbsp;·&nbsp; ACP &nbsp;·&nbsp; AP2 Protocol Implementation</p>
    </div>

    <!-- Intro -->
    <div style="padding: 36px 40px 24px;">
      <p style="color: #374151; line-height: 1.75; margin: 0; font-size: 15px;">Hi <strong>${firstName}</strong> — here is your complete implementation guide for the three protocols powering AI-mediated commerce. Each chapter ends with a direct link to the corresponding implementation service.</p>
    </div>

    <!-- Chapters -->
    <div style="padding: 0 40px 40px;">

      <!-- Chapter 1 -->
      <div style="${chapterStyle}">
        <div style="${chapterHeaderStyle('#3b82f6')} background: #eff6ff;">
          <span style="font-size: 11px; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Chapter 1</span>
          <h2 style="color: #1e3a8a; margin: 4px 0 0; font-size: 18px; font-weight: 800;">The Agentic Commerce Shift</h2>
        </div>
        <div style="${chapterBodyStyle}">
          <p style="color: #374151; line-height: 1.75; margin: 0 0 12px;">Gartner projects <strong>50% of traditional search traffic</strong> will shift to AI-mediated channels by 2026. AI agents operating autonomously on behalf of buyers are now discovering products, comparing options, and completing purchases without human search intent.</p>
          <p style="color: #374151; line-height: 1.75; margin: 0; padding: 12px 16px; background: #dbeafe; border-radius: 8px; border-left: 3px solid #3b82f6; font-size: 14px;"><strong>Key insight:</strong> The question is no longer "how do we rank in Google?" — it's "can AI agents discover, trust, and transact with us?"</p>
        </div>
      </div>

      <!-- Chapter 2 -->
      <div style="${chapterStyle}">
        <div style="${chapterHeaderStyle('#8b5cf6')} background: #f5f3ff;">
          <span style="font-size: 11px; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Chapter 2</span>
          <h2 style="color: #4c1d95; margin: 4px 0 0; font-size: 18px; font-weight: 800;">Universal Commerce Protocol (UCP)</h2>
        </div>
        <div style="${chapterBodyStyle}">
          <p style="color: #374151; line-height: 1.75; margin: 0 0 14px;">UCP (Google, 2025) is the <strong>discovery layer</strong>. A machine-readable manifest at <code style="background: #f1f5f9; color: #1e40af; padding: 2px 7px; border-radius: 4px; font-size: 13px;">/.well-known/ucp/manifest.json</code> exposes your complete capability set to any AI agent.</p>
          <div style="background: #0f172a; border-radius: 8px; padding: 16px 20px; margin-bottom: 14px;">
            <pre style="margin: 0; color: #38bdf8; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.6; white-space: pre-wrap;">{
  "ucp_version": "2026-01",
  "merchant": { "name": "...", "categories": [...] },
  "capabilities": {
    "product_feed": { "endpoint": "/api/products" },
    "checkout": { "endpoint": "/api/acp/checkout" }
  },
  "transports": ["rest", "mcp", "a2a"]
}</pre>
          </div>
          <p style="color: #374151; margin: 0; font-size: 14px;"><strong>Ready to implement?</strong> <a href="${SITE_URL}/services/ucp-implementation" style="color: #7c3aed; font-weight: 600;">UCP Implementation Service →</a></p>
        </div>
      </div>

      <!-- Chapter 3 -->
      <div style="${chapterStyle}">
        <div style="${chapterHeaderStyle('#10b981')} background: #ecfdf5;">
          <span style="font-size: 11px; color: #059669; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Chapter 3</span>
          <h2 style="color: #064e3b; margin: 4px 0 0; font-size: 18px; font-weight: 800;">Agentic Commerce Protocol (ACP)</h2>
        </div>
        <div style="${chapterBodyStyle}">
          <p style="color: #374151; line-height: 1.75; margin: 0 0 12px;">ACP (OpenAI + Stripe, 2025) is the <strong>transaction layer</strong>. Using Stripe's Secure Payment Token (SPT) framework, AI agents like ChatGPT can complete purchases programmatically — session negotiation, product confirmation, and payment — on behalf of users.</p>
          <p style="color: #374151; line-height: 1.75; margin: 0 0 14px; padding: 12px 16px; background: #d1fae5; border-radius: 8px; border-left: 3px solid #10b981; font-size: 14px;"><strong>ChatGPT Instant Checkout</strong> requires ACP. Without it, your products cannot be purchased through ChatGPT's shopping interface.</p>
          <p style="color: #374151; margin: 0; font-size: 14px;"><strong>Ready to implement?</strong> <a href="${SITE_URL}/services/acp-integration" style="color: #059669; font-weight: 600;">ACP Integration Service →</a></p>
        </div>
      </div>

      <!-- Chapter 4 -->
      <div style="${chapterStyle}">
        <div style="${chapterHeaderStyle('#f59e0b')} background: #fffbeb;">
          <span style="font-size: 11px; color: #d97706; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Chapter 4</span>
          <h2 style="color: #78350f; margin: 4px 0 0; font-size: 18px; font-weight: 800;">Agent Payments Protocol (AP2)</h2>
        </div>
        <div style="${chapterBodyStyle}">
          <p style="color: #374151; line-height: 1.75; margin: 0 0 12px;">AP2 (Google, 2025) is the <strong>cryptographic trust layer</strong>. Using W3C Verifiable Credentials, AP2 mandates create proof of payment authorization — establishing non-repudiation for every agentic transaction.</p>
          <p style="color: #374151; line-height: 1.75; margin: 0 0 14px;">Two mandate types: <strong>Intent Mandates</strong> (pre-authorized spending limits) and <strong>Cart Mandates</strong> (specific cart approval with full audit trail). Supports Stripe, Adyen, and x402 crypto rails.</p>
          <p style="color: #374151; margin: 0; font-size: 14px;"><strong>Ready to implement?</strong> <a href="${SITE_URL}/services/ap2-trust-layer" style="color: #d97706; font-weight: 600;">AP2 Trust Layer Service →</a></p>
        </div>
      </div>

      <!-- Chapter 5 -->
      <div style="${chapterStyle}">
        <div style="${chapterHeaderStyle('#ef4444')} background: #fef2f2;">
          <span style="font-size: 11px; color: #dc2626; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Chapter 5</span>
          <h2 style="color: #7f1d1d; margin: 4px 0 0; font-size: 18px; font-weight: 800;">The 16-Week Implementation Roadmap</h2>
        </div>
        <div style="${chapterBodyStyle}">
          <p style="color: #374151; line-height: 1.75; margin: 0 0 16px;">Full three-protocol readiness across four focused phases:</p>
          ${[
            ['#3b82f6', 'Weeks 1–4', 'AI Readiness Assessment + SSR migration + JSON-LD schema foundation'],
            ['#8b5cf6', 'Weeks 5–8', 'UCP manifest deployment + capability profiling + AI agent testing'],
            ['#10b981', 'Weeks 9–12', 'ACP checkout API + Stripe SPT integration + ChatGPT Instant Checkout'],
            ['#f59e0b', 'Weeks 13–16', 'AP2 Verifiable Credentials + audit trail + full compliance verification'],
          ].map(([color, label, desc], i) => `
          <div style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 10px; background: #ffffff; border-radius: 8px; padding: 14px 16px; border: 1px solid #e2e8f0;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${color}; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0; text-align: center; line-height: 28px;">${i + 1}</div>
            <div style="flex: 1;"><strong style="color: #0f172a; font-size: 14px;">${label}:</strong> <span style="color: #475569; font-size: 14px;">${desc}</span></div>
          </div>`).join('')}
        </div>
      </div>

      <!-- CTA -->
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 12px; padding: 32px; text-align: center;">
        <h3 style="color: #ffffff; margin: 0 0 8px; font-size: 22px; font-weight: 800;">Ready to start?</h3>
        <p style="color: rgba(255,255,255,0.88); margin: 0 0 24px; font-size: 15px;">Begin with a free AI Readiness Check — 3-day audit, $100, immediate action plan.</p>
        <a href="${SITE_URL}/contact" style="display: inline-block; background: #ffffff; color: #1e40af; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 16px;">Get Your Readiness Check →</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">Adam Silva Consulting &nbsp;·&nbsp; <a href="${SITE_URL}" style="color: #64748b; text-decoration: none;">adamsilvaconsulting.com</a> &nbsp;·&nbsp; Global Infrastructure for Agentic Commerce</p>
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
    const { email, first_name } = body

    if (!email) {
      return new Response(JSON.stringify({ error: 'email is required' }), { status: 400 })
    }

    // Store lead in Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    await supabase.from('leads').upsert({
      email,
      first_name: first_name || null,
      source: 'guide_download',
      opted_in: true,
    }, { onConflict: 'email' })

    // Send guide via email
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ success: true, message: 'Lead captured (Resend not configured)' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Adam Silva Consulting <info@adamsilvaconsulting.com>',
        to: [email],
        subject: 'Your Agentic Commerce Guide — UCP, ACP & AP2',
        html: buildGuideEmail(first_name || 'there'),
        tags: [{ name: 'type', value: 'guide_delivery' }],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return new Response(JSON.stringify({ success: false, error: err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const data = await res.json()
    return new Response(JSON.stringify({ success: true, email_id: data.id }), {
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
