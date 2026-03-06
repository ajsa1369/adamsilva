/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

const GRADE_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  A: { bg: '#10b981', text: '#ffffff', ring: '#059669' },
  B: { bg: '#22c55e', text: '#ffffff', ring: '#16a34a' },
  C: { bg: '#f59e0b', text: '#ffffff', ring: '#d97706' },
  D: { bg: '#f97316', text: '#ffffff', ring: '#ea580c' },
  F: { bg: '#ef4444', text: '#ffffff', ring: '#dc2626' },
}

const GRADE_LABELS: Record<string, string> = {
  A: 'Excellent',
  B: 'Good',
  C: 'Needs Work',
  D: 'Poor',
  F: 'Critical',
}

interface RouteParams {
  params: Promise<{ token: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { token } = await params

  if (!token || !/^[0-9a-f-]{36}$/i.test(token)) {
    return new Response('Invalid token', { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('acra_reports')
    .select(`overall_score, overall_grade, scan_meta, acra_scans ( url, company_name )`)
    .eq('share_token', token)
    .single()

  if (error || !data) {
    return new Response('Report not found', { status: 404 })
  }

  const report = data as unknown as { overall_score: number; overall_grade: string; scan_meta: Record<string, unknown> | null; acra_scans: { url: string; company_name: string | null } }
  const grade = report.overall_grade
  const score = report.overall_score
  const domain = (() => {
    try {
      const u = report.acra_scans.url
      return new URL(u.startsWith('http') ? u : `https://${u}`).hostname
    } catch {
      return report.acra_scans.url
    }
  })()
  const companyName = report.acra_scans.company_name
  const fullUrl = report.acra_scans.url.startsWith('http') ? report.acra_scans.url : `https://${report.acra_scans.url}`

  const gradeStyle = GRADE_COLORS[grade] ?? GRADE_COLORS['F']
  const gradeLabel = GRADE_LABELS[grade] ?? 'Unknown'

  // Use Chrome screenshot (preferred) or og:image from scan
  let screenshotSrc: string | null = null
  const imageUrl = (report.scan_meta?.screenshotUrl as string | undefined)
    || (report.scan_meta?.ogImage as string | undefined)
  if (imageUrl) {
    try {
      const imgRes = await fetch(imageUrl, { signal: AbortSignal.timeout(6000) })
      if (imgRes.ok) {
        const contentType = imgRes.headers.get('content-type') || 'image/png'
        const buf = await imgRes.arrayBuffer()
        const bytes = new Uint8Array(buf)
        let binary = ''
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        screenshotSrc = `data:${contentType};base64,${btoa(binary)}`
      }
    } catch {
      // Fallback: no screenshot, just show grade card
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200',
          height: '630',
          display: 'flex',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Background: dark gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            display: 'flex',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #ffffff 39px, #ffffff 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #ffffff 39px, #ffffff 40px)',
            display: 'flex',
          }}
        />

        {/* Left side: Screenshot with grade overlay */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '620',
            height: '630',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Screenshot container */}
          <div
            style={{
              display: 'flex',
              width: '520',
              height: '340',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.15)',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {screenshotSrc ? (
              <img
                src={screenshotSrc}
                alt=""
                width={520}
                height={340}
                style={{ objectFit: 'cover', width: '520px', height: '340px' }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '520',
                  height: '340',
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  color: '#94a3b8',
                  fontSize: '24px',
                  fontWeight: '600',
                }}
              >
                {domain}
              </div>
            )}
          </div>

          {/* Grade badge overlaid on screenshot */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '30',
              right: '50',
              width: '130',
              height: '130',
              borderRadius: '50%',
              background: gradeStyle.bg,
              border: `5px solid ${gradeStyle.ring}`,
              boxShadow: `0 8px 30px ${gradeStyle.bg}80`,
            }}
          >
            <div style={{ fontSize: '64', fontWeight: '900', color: gradeStyle.text, lineHeight: '1', display: 'flex' }}>
              {grade}
            </div>
            <div style={{ fontSize: '14', fontWeight: '700', color: 'rgba(255,255,255,0.9)', display: 'flex', marginTop: '-2' }}>
              {score}/100
            </div>
          </div>
        </div>

        {/* Right side: Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '580',
            height: '630',
            padding: '40px 50px 40px 20px',
          }}
        >
          {/* ASC badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8',
              marginBottom: '24',
            }}
          >
            <div
              style={{
                display: 'flex',
                background: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(37, 99, 235, 0.4)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '13',
                fontWeight: '700',
                color: '#60a5fa',
                letterSpacing: '0.5px',
              }}
            >
              ACRA REPORT
            </div>
          </div>

          {/* Domain / company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4', marginBottom: '20' }}>
            <div style={{ fontSize: '36', fontWeight: '800', color: '#f8fafc', lineHeight: '1.1', display: 'flex' }}>
              {companyName || domain}
            </div>
            {companyName && (
              <div style={{ fontSize: '18', color: '#94a3b8', display: 'flex' }}>
                {domain}
              </div>
            )}
          </div>

          {/* Grade label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12', marginBottom: '24' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '20',
                fontWeight: '800',
                color: gradeStyle.bg,
              }}
            >
              Grade {grade} — {gradeLabel}
            </div>
          </div>

          {/* Score bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6', marginBottom: '30' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '13', color: '#94a3b8', display: 'flex' }}>AI Commerce Readiness</div>
              <div style={{ fontSize: '13', fontWeight: '700', color: gradeStyle.bg, display: 'flex' }}>{score}/100</div>
            </div>
            <div style={{ display: 'flex', height: '12', borderRadius: '6', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  height: '12',
                  borderRadius: '6',
                  width: `${score}%`,
                  background: `linear-gradient(90deg, ${gradeStyle.bg}, ${gradeStyle.ring})`,
                }}
              />
            </div>
          </div>

          {/* CTA text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4' }}>
            <div style={{ fontSize: '14', color: '#64748b', display: 'flex' }}>
              Agentic Commerce Readiness Assessment
            </div>
            <div style={{ fontSize: '15', color: '#94a3b8', fontWeight: '600', display: 'flex' }}>
              adamsilvaconsulting.com/acra
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
