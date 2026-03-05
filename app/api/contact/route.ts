import { NextRequest, NextResponse } from 'next/server'
import { transporter } from '@/lib/mailer'
import { pushACRALeadToPipedrive } from '@/lib/pipedrive/acra-lead'

interface ACRAData {
  domain: string
  overallScore: number
  criticalCount: number
  pillarScores: Record<string, number>
  phone?: string
  bestTime?: string
  timezone?: string
}

const PILLAR_LABELS: Record<string, string> = {
  protocol: 'Agentic Protocol Compliance',
  'structured-data': 'Structured Data & Schema',
  aeo: 'Answer Engine Optimization',
  geo: 'Generative Engine Optimization',
  seo: 'SEO Foundation',
  social: 'Social Authority',
  press: 'Press & PR Coverage',
  'ai-authority': 'AI Authority Score',
  'llm-recommendation': 'LLM Recommendation Score',
}

function scoreGrade(s: number) { return s >= 90 ? 'A' : s >= 75 ? 'B' : s >= 60 ? 'C' : s >= 40 ? 'D' : 'F' }
function scoreColor(s: number) { return s >= 75 ? '#10b981' : s >= 60 ? '#22c55e' : s >= 40 ? '#f59e0b' : '#ef4444' }

function buildACRAReportHtml(data: ACRAData, contactName: string, contactEmail: string, contactCompany: string): string {
  const pillarRows = Object.entries(data.pillarScores)
    .map(([key, score]) => {
      const label = PILLAR_LABELS[key] ?? key
      const color = scoreColor(score)
      const g = scoreGrade(score)
      const pct = Math.round(score)
      return `
        <tr style="border-bottom:1px solid #f3f4f6;">
          <td style="padding:8px 12px;font-size:13px;color:#374151;">${label}</td>
          <td style="padding:8px 12px;text-align:center;font-weight:700;color:${color};">${pct}/100</td>
          <td style="padding:8px 12px;text-align:center;">
            <span style="font-weight:700;font-size:11px;padding:2px 7px;border-radius:9999px;background:${color}20;color:${color};">${g}</span>
          </td>
          <td style="padding:8px 12px;min-width:120px;">
            <div style="height:7px;background:#f3f4f6;border-radius:4px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:${color};border-radius:4px;"></div>
            </div>
          </td>
        </tr>`
    }).join('')

  const recommendations: string[] = []
  const p = data.pillarScores
  if ((p['protocol'] ?? 0) < 60) recommendations.push('🟣 <strong>UCP/ACP/AP2 Protocol Implementation</strong> — From $15,000 <em>(Critical: AI agents cannot transact)</em>')
  if ((p['press'] ?? 0) < 60) recommendations.push('🔴 <strong>Press Release Syndication</strong> — $6,500 + $3,000/mo <em>(Strongest AI authority signal — 0.664 Ahrefs correlation)</em>')
  if ((p['aeo'] ?? 0) < 60) recommendations.push('🟡 <strong>AEO Audit + Implementation</strong> — $5,000 <em>(AI systems not citing their content)</em>')
  if ((p['geo'] ?? 0) < 60) recommendations.push('🔵 <strong>GEO Content Architecture</strong> — $7,500 <em>(LLMs bypassing for competitors with stronger E-E-A-T)</em>')
  if ((p['social'] ?? 0) < 60) recommendations.push('🩷 <strong>Social Authority Building</strong> — $6,500 + $1,500/mo <em>(Social proof reduces AI recommendation hesitation by 40%)</em>')
  if ((p['structured-data'] ?? 0) < 60) recommendations.push('🟢 <strong>Structured Data & Schema Library</strong> — $5,000 <em>(Product data invisible to agentic buyers)</em>')
  if ((p['ai-authority'] ?? 0) < 60 && (p['llm-recommendation'] ?? 0) < 50) recommendations.push('🟠 <strong>AI Authority & Brand Entity Program</strong> — $15,000 <em>(Brand not registering with ChatGPT/Perplexity/Claude/Gemini)</em>')

  const goldCriteria = [
    { label: 'SPA + Server-Side Rendering (SSR)', pass: (p['seo'] ?? 0) >= 65 },
    { label: 'Heavy JSON-LD Schema Library', pass: (p['structured-data'] ?? 0) >= 70 },
    { label: 'Agentic Protocol Stack (UCP/ACP/AP2)', pass: (p['protocol'] ?? 0) >= 60 },
    { label: 'Tier 1 Press Release Syndication', pass: (p['press'] ?? 0) >= 65 },
    { label: 'Social Media Authority + sameAs Entity Graph', pass: (p['social'] ?? 0) >= 65 },
  ]
  const goldPass = goldCriteria.filter(c => c.pass).length
  const overallColor = scoreColor(data.overallScore)

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:24px;">
<div style="max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">

  <div style="background:linear-gradient(135deg,#1d4ed8,#4f46e5);padding:24px 28px;color:#fff;">
    <div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;opacity:.75;margin-bottom:8px;">ACRA Strategy Call Request</div>
    <h1 style="margin:0 0 4px;font-size:22px;font-weight:800;">${data.domain}</h1>
    <div style="font-size:14px;opacity:.85;">New booking from ${contactName} &middot; ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
  </div>

  <div style="padding:20px 28px;border-bottom:1px solid #e5e7eb;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:4px 12px 4px 0;font-size:11px;color:#9ca3af;font-weight:600;vertical-align:top;">NAME</td>
        <td style="padding:4px 0;font-weight:600;color:#111;font-size:14px;">${contactName}</td>
        <td style="padding:4px 12px 4px 24px;font-size:11px;color:#9ca3af;font-weight:600;vertical-align:top;">EMAIL</td>
        <td style="padding:4px 0;color:#1d4ed8;font-size:14px;">${contactEmail}</td>
      </tr>
      <tr>
        <td style="padding:4px 12px 4px 0;font-size:11px;color:#9ca3af;font-weight:600;vertical-align:top;">COMPANY</td>
        <td style="padding:4px 0;color:#111;font-size:14px;">${contactCompany}</td>
        ${data.phone ? `<td style="padding:4px 12px 4px 24px;font-size:11px;color:#9ca3af;font-weight:600;vertical-align:top;">PHONE</td><td style="padding:4px 0;color:#111;font-size:14px;">${data.phone}</td>` : '<td></td><td></td>'}
      </tr>
      ${data.bestTime ? `<tr><td style="padding:4px 12px 4px 0;font-size:11px;color:#9ca3af;font-weight:600;">BEST TIME</td><td colspan="3" style="padding:4px 0;color:#111;font-size:14px;">${data.bestTime}${data.timezone ? ` (${data.timezone})` : ''}</td></tr>` : ''}
    </table>
  </div>

  <div style="padding:20px 28px;border-bottom:1px solid #e5e7eb;background:#fafafa;display:flex;align-items:center;gap:20px;">
    <div style="text-align:center;background:#fff;border-radius:12px;padding:12px 20px;border:2px solid ${overallColor};min-width:90px;">
      <div style="font-size:40px;font-weight:900;color:${overallColor};line-height:1;">${data.overallScore}</div>
      <div style="font-size:11px;color:#6b7280;margin-top:2px;">Grade ${scoreGrade(data.overallScore)}</div>
    </div>
    <div>
      <div style="font-size:16px;font-weight:700;color:#111;">Overall ACRA Score</div>
      <div style="font-size:13px;color:#6b7280;margin-top:4px;">${data.criticalCount} critical gap${data.criticalCount !== 1 ? 's' : ''} identified across 9 pillars</div>
    </div>
  </div>

  <div style="padding:20px 28px;border-bottom:1px solid #e5e7eb;">
    <div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px;">9-Pillar Breakdown</div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:2px solid #e5e7eb;">
          <th style="padding:6px 12px;text-align:left;font-size:11px;color:#9ca3af;font-weight:600;">Pillar</th>
          <th style="padding:6px 12px;text-align:center;font-size:11px;color:#9ca3af;font-weight:600;">Score</th>
          <th style="padding:6px 12px;text-align:center;font-size:11px;color:#9ca3af;font-weight:600;">Grade</th>
          <th style="padding:6px 12px;font-size:11px;color:#9ca3af;font-weight:600;">Bar</th>
        </tr>
      </thead>
      <tbody>${pillarRows}</tbody>
    </table>
  </div>

  <div style="padding:20px 28px;border-bottom:1px solid #e5e7eb;background:#fffbeb;">
    <div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">⭐ ASC Gold Standard: ${goldPass}/5 criteria met</div>
    ${goldCriteria.map(c => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-size:14px;">${c.pass ? '✅' : '❌'}</span><span style="font-size:13px;color:${c.pass ? '#065f46' : '#7f1d1d'};">${c.label}</span></div>`).join('')}
  </div>

  ${recommendations.length > 0 ? `
  <div style="padding:20px 28px;border-bottom:1px solid #e5e7eb;">
    <div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">Recommended Services (${recommendations.length})</div>
    ${recommendations.map(r => `<div style="font-size:13px;color:#374151;margin-bottom:8px;padding:8px 12px;background:#f9fafb;border-radius:6px;border-left:3px solid #6b7280;">${r}</div>`).join('')}
  </div>` : ''}

  <div style="padding:14px 28px;background:#f9fafb;">
    <div style="font-size:11px;color:#9ca3af;">Generated by ACRA Tool &middot; adamsilvaconsulting.com &middot; ${new Date().toISOString()}</div>
  </div>
</div>
</body></html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message, acraData } = body as {
      name: string
      email: string
      company?: string
      service?: string
      message: string
      acraData?: ACRAData
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Get IP and user agent for spam prevention
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Try to store in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name,
            email,
            company: company || null,
            service: service || null,
            message,
            ip_address: ip,
            user_agent: userAgent,
            status: 'new',
          }),
        })

        if (!res.ok) {
          console.error('Supabase insert failed:', await res.text())
        }
      } catch (err) {
        console.error('Supabase error:', err)
      }
    }

    // Send email notification via SMTP
    if (process.env.SMTP_HOST) {
      try {
        const isACRACall = service === 'Free ACRA Strategy Call' && acraData
        const htmlBody = isACRACall
          ? buildACRAReportHtml(acraData, name, email, company || acraData.domain)
          : `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <small>IP: ${ip} | ${new Date().toISOString()}</small>
          `

        // Send to Adam (admin inbox)
        await transporter.sendMail({
          from: `"Adam Silva Consulting" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          replyTo: email,
          subject: isACRACall
            ? `ACRA Strategy Call — ${acraData.domain} (Score: ${acraData.overallScore}/100, ${acraData.criticalCount} gaps)`
            : `New Contact: ${name} — ${service || 'General Inquiry'}`,
          html: htmlBody,
        })

        // Also send to Rob Polonsky for ACRA strategy call bookings
        if (isACRACall && process.env.PIPEDRIVE_OWNER_EMAIL) {
          await transporter.sendMail({
            from: `"Adam Silva Consulting" <${process.env.SMTP_USER}>`,
            to: process.env.PIPEDRIVE_OWNER_EMAIL,
            replyTo: email,
            subject: `ACRA Strategy Call — ${acraData.domain} (Score: ${acraData.overallScore}/100, ${acraData.criticalCount} gaps)`,
            html: htmlBody,
          })
        }
      } catch (err) {
        console.error('Email send error:', err)
      }
    }

    // Push to Pipedrive for ACRA strategy call bookings
    if (service === 'Free ACRA Strategy Call') {
      const domainMatch = message.match(/ACRA scan for ([^\s]+)/)
      const scoreMatch = message.match(/scored (\d+)\/100/)
      const gapsMatch = message.match(/(\d+) critical gap/)
      void pushACRALeadToPipedrive({
        name,
        email,
        company: company || undefined,
        domain: acraData?.domain ?? domainMatch?.[1] ?? company ?? email,
        acraScore: acraData?.overallScore ?? (scoreMatch ? parseInt(scoreMatch[1], 10) : undefined),
        criticalGaps: acraData?.criticalCount ?? (gapsMatch ? parseInt(gapsMatch[1], 10) : undefined),
        pillarScores: acraData?.pillarScores,
        message,
      })
    }

    return NextResponse.json({ success: true, message: 'Thank you! We\'ll respond within 24 hours.' })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
