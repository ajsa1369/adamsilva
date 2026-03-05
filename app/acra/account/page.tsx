import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/schemas/organization'
import { User, LogOut, Trash2, Clock, BarChart3, ArrowRight, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Account — ACRA Tool | Adam Silva Consulting',
  description: 'Manage your ACRA account, view your scan history, and manage your service subscriptions.',
  alternates: { canonical: `${SITE_URL}/acra/account` },
  robots: { index: false },
}

interface ScanRow {
  id: string
  url: string
  company_name: string | null
  status: string
  created_at: string
  acra_reports: Array<{ id: string; overall_score: number; overall_grade: string; projected_monthly_loss_usd: number }>
}

export default async function ACRAAccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/acra/login')

  const { data: scans } = await supabase
    .from('acra_scans')
    .select('id, url, company_name, status, created_at, acra_reports(id, overall_score, overall_grade, projected_monthly_loss_usd)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const allScans = (scans ?? []) as ScanRow[]
  const totalScans = allScans.length
  const completedScans = allScans.filter((s) => s.status === 'complete')
  const avgScore = completedScans.length > 0
    ? Math.round(completedScans.reduce((sum, s) => sum + (s.acra_reports?.[0]?.overall_score ?? 0), 0) / completedScans.length)
    : null

  const gradeColor: Record<string, string> = { A: '#10b981', B: '#22c55e', C: '#f59e0b', D: '#f97316', F: '#ef4444' }

  return (
    <section className="section" aria-labelledby="account-heading">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 id="account-heading" className="text-3xl font-bold text-[var(--color-text)] mb-1">Account</h1>
          <p className="text-[var(--color-muted)] text-sm">{user.email}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: stats + actions */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[var(--color-text)]">
                    {user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-[var(--color-muted-2)]">{user.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[var(--color-surface-2)] rounded-xl p-3">
                  <div className="text-xl font-bold text-[var(--color-accent)]">{totalScans}</div>
                  <div className="text-xs text-[var(--color-muted-2)]">Total Scans</div>
                </div>
                <div className="bg-[var(--color-surface-2)] rounded-xl p-3">
                  <div className="text-xl font-bold text-[var(--color-accent)]">{avgScore ?? '—'}</div>
                  <div className="text-xs text-[var(--color-muted-2)]">Avg Score</div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="card p-5 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">Quick Actions</h2>
              <Link href="/acra/run" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">
                <BarChart3 size={14} />
                Run New ACRA Scan
              </Link>
              <Link href="/contact" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">
                <ArrowRight size={14} />
                Book Strategy Call
              </Link>
              <Link href="/services" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline">
                <ArrowRight size={14} />
                View All Services
              </Link>
            </div>

            {/* Service management */}
            <div className="card p-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                Service Subscriptions
              </h2>
              <div
                className="p-3 rounded-xl text-sm"
                style={{ background: 'color-mix(in srgb, #f59e0b 10%, transparent)', border: '1px solid color-mix(in srgb, #f59e0b 25%, transparent)' }}
              >
                <div className="flex items-center gap-2 font-semibold text-amber-700 mb-1">
                  <AlertTriangle size={14} />
                  No Active Subscriptions
                </div>
                <p className="text-xs text-amber-600 leading-relaxed">
                  You don&apos;t have any active service subscriptions. ACRA scanning is always free.
                </p>
              </div>
              <p className="text-xs text-[var(--color-muted-2)] mt-3 leading-relaxed">
                To cancel a paid service subscription (monthly retainer, continuity program, or managed service),
                contact our team directly:
              </p>
              <a
                href="mailto:billing@adamsilvaconsulting.com?subject=Cancel Service Subscription"
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline"
              >
                billing@adamsilvaconsulting.com →
              </a>
            </div>

            {/* Danger zone */}
            <div className="card p-5 border-red-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-3">Danger Zone</h2>
              <p className="text-xs text-[var(--color-muted-2)] mb-3 leading-relaxed">
                To delete your account and all scan history, email us. This cannot be undone.
              </p>
              <a
                href="mailto:legal@adamsilvaconsulting.com?subject=Delete My ACRA Account"
                className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:underline"
              >
                <Trash2 size={12} />
                Request Account Deletion
              </a>
              <SignOutButton />
            </div>
          </div>

          {/* Right: scan history */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
              <Clock size={18} className="text-[var(--color-accent)]" />
              Scan History
            </h2>

            {allScans.length === 0 ? (
              <div className="card p-8 text-center">
                <BarChart3 size={32} className="mx-auto text-[var(--color-muted-2)] mb-3" />
                <p className="text-[var(--color-muted)] mb-4">No scans yet. Run your first ACRA to see results here.</p>
                <Link href="/acra/run" className="btn-primary">Run My First ACRA</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {allScans.map((scan) => {
                  const report = scan.acra_reports?.[0]
                  return (
                    <div key={scan.id} className="card p-4 flex items-center gap-4">
                      {report ? (
                        <div
                          className="text-xl font-bold w-10 text-center shrink-0"
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
                        <div className="text-xs text-[var(--color-muted-2)] flex items-center gap-2">
                          <span className="truncate">{scan.url}</span>
                          <span>·</span>
                          <span className="shrink-0">{new Date(scan.created_at).toLocaleDateString()}</span>
                        </div>
                        {report?.projected_monthly_loss_usd && report.projected_monthly_loss_usd > 0 && (
                          <div className="text-xs text-red-500 font-semibold mt-0.5">
                            ${report.projected_monthly_loss_usd.toLocaleString()}/mo at risk
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {report && (
                          <>
                            <div className="text-right hidden sm:block">
                              <div className="text-lg font-bold" style={{ color: gradeColor[report.overall_grade] ?? '#6b7280' }}>
                                {report.overall_score}
                              </div>
                              <div className="text-xs text-[var(--color-muted-2)]">score</div>
                            </div>
                            <Link
                              href={`/acra/report/${report.id}`}
                              className="btn-secondary text-xs py-1.5 px-3"
                            >
                              View →
                            </Link>
                          </>
                        )}
                        {scan.status === 'failed' && (
                          <span className="text-xs text-red-500">Failed</span>
                        )}
                        {scan.status === 'processing' && (
                          <span className="text-xs text-[var(--color-muted-2)] animate-pulse">Scanning…</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="POST" className="mt-2">
      <button
        type="submit"
        className="flex items-center gap-2 text-xs font-semibold text-[var(--color-muted-2)] hover:text-[var(--color-text)]"
      >
        <LogOut size={12} />
        Sign Out
      </button>
    </form>
  )
}
