import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ScanForm } from '@/app/components/acra/ScanForm'
import { SITE_URL } from '@/lib/schemas/organization'
import { Clock, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Run Your ACRA — Agentic Commerce Readiness Assessment',
  description: 'Enter your URL and run a free ACRA scan. Get your AEO, GEO, SEO, social, press, and LLM recommendation scores in under 30 seconds.',
  alternates: { canonical: `${SITE_URL}/acra/run` },
}

interface ScanRow {
  id: string
  url: string
  company_name: string | null
  status: string
  created_at: string
  acra_reports: Array<{ id: string; overall_score: number; overall_grade: string }>
}

export default async function ACRARun() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/acra/login')

  // Fetch recent scans
  const { data: recentScans } = await supabase
    .from('acra_scans')
    .select('id, url, company_name, status, created_at, acra_reports(id, overall_score, overall_grade)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const scans = (recentScans ?? []) as ScanRow[]

  return (
    <section className="section gradient-hero" aria-labelledby="run-heading">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge mb-4">Free Scan</span>
          <h1 id="run-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight">
            Run Your Agentic Commerce Readiness Assessment
          </h1>
          <p className="text-[var(--color-muted)]">
            Enter any URL. We scan 200+ data points across 9 scoring pillars and return your full report in under 30 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[var(--color-muted-2)]">
            <span className="flex items-center gap-1"><Clock size={12} /> ~30 seconds</span>
            <span>·</span>
            <span className="flex items-center gap-1"><BarChart3 size={12} /> 9 pillars scored</span>
            <span>·</span>
            <Link href="/acra/account" className="text-[var(--color-accent)] hover:underline">Manage account →</Link>
          </div>
        </div>

        {/* Scan form */}
        <div className="card p-6 mb-8">
          <ScanForm />
        </div>

        {/* Recent scans */}
        {scans.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[var(--color-muted-2)] uppercase tracking-wider mb-3">
              Your Recent Scans
            </h2>
            <div className="space-y-2">
              {scans.map((scan) => {
                const report = scan.acra_reports?.[0]
                const gradeColor: Record<string, string> = { A: '#10b981', B: '#22c55e', C: '#f59e0b', D: '#f97316', F: '#ef4444' }
                return (
                  <div key={scan.id} className="card p-4 flex items-center gap-4">
                    {report ? (
                      <div
                        className="text-lg font-bold w-10 text-center shrink-0"
                        style={{ color: gradeColor[report.overall_grade] ?? '#6b7280' }}
                      >
                        {report.overall_grade}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center text-xs text-[var(--color-muted-2)] shrink-0">
                        {scan.status === 'processing' ? '…' : '—'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[var(--color-text)] truncate">
                        {scan.company_name ?? scan.url}
                      </div>
                      <div className="text-xs text-[var(--color-muted-2)]">
                        {scan.url} · {new Date(scan.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {report && (
                      <Link
                        href={`/acra/report/${report.id}`}
                        className="text-xs font-semibold text-[var(--color-accent)] hover:underline shrink-0"
                      >
                        View Report →
                      </Link>
                    )}
                    {scan.status === 'failed' && (
                      <span className="text-xs text-red-500 shrink-0">Scan failed</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
