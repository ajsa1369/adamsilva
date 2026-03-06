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
  try {
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

    const report = data as unknown as {
      overall_score: number
      overall_grade: string
      scan_meta: Record<string, unknown> | null
      acra_scans: { url: string; company_name: string | null }
    }
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
    const gradeStyle = GRADE_COLORS[grade] ?? GRADE_COLORS['F']
    const gradeLabel = GRADE_LABELS[grade] ?? 'Unknown'
    const displayName = companyName || domain

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'system-ui, sans-serif',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          {/* Left side: Grade circle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 480,
              height: 630,
            }}
          >
            {/* Grade circle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 220,
                height: 220,
                borderRadius: 110,
                background: gradeStyle.bg,
                border: `8px solid ${gradeStyle.ring}`,
              }}
            >
              <div
                style={{
                  fontSize: 120,
                  fontWeight: 900,
                  color: gradeStyle.text,
                  lineHeight: 1,
                  display: 'flex',
                }}
              >
                {grade}
              </div>
            </div>
            {/* Score below circle */}
            <div
              style={{
                display: 'flex',
                fontSize: 32,
                fontWeight: 700,
                color: gradeStyle.bg,
                marginTop: 20,
              }}
            >
              {score} / 100
            </div>
          </div>

          {/* Right side: Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: 720,
              height: 630,
              padding: '60px 60px 60px 0',
            }}
          >
            {/* ACRA badge */}
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(37, 99, 235, 0.25)',
                  borderRadius: 20,
                  padding: '8px 18px',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#60a5fa',
                  letterSpacing: 1,
                }}
              >
                ACRA REPORT
              </div>
            </div>

            {/* Company / domain name */}
            <div
              style={{
                display: 'flex',
                fontSize: 42,
                fontWeight: 800,
                color: '#f8fafc',
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              {displayName}
            </div>

            {/* Domain subtitle (only if company name exists) */}
            {companyName ? (
              <div
                style={{
                  display: 'flex',
                  fontSize: 20,
                  color: '#94a3b8',
                  marginBottom: 28,
                }}
              >
                {domain}
              </div>
            ) : (
              <div style={{ display: 'flex', marginBottom: 28 }} />
            )}

            {/* Grade label */}
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                fontWeight: 800,
                color: gradeStyle.bg,
                marginBottom: 32,
              }}
            >
              Grade {grade} — {gradeLabel}
            </div>

            {/* Score bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', fontSize: 14, color: '#94a3b8' }}>
                  AI Commerce Readiness
                </div>
                <div style={{ display: 'flex', fontSize: 14, fontWeight: 700, color: gradeStyle.bg }}>
                  {score}/100
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  height: 14,
                  borderRadius: 7,
                  background: 'rgba(255,255,255,0.1)',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    height: 14,
                    borderRadius: 7,
                    width: `${score}%`,
                    background: `linear-gradient(90deg, ${gradeStyle.bg}, ${gradeStyle.ring})`,
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', fontSize: 16, color: '#64748b', fontWeight: 600 }}>
              adamsilvaconsulting.com/acra
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (err) {
    console.error('OG image generation failed:', err)
    return new Response('OG image generation failed', { status: 500 })
  }
}
