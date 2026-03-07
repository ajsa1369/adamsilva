import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle, Star } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { ScoreCard } from '@/app/components/acra/ScoreCard'
import { ScoreHero } from '@/app/components/acra/ScoreHero'
import { PillarScoreChart } from '@/app/components/acra/PillarScoreChart'
import { RevenueImpactPanel } from '@/app/components/acra/RevenueImpact'
import { LLMScoreBoard } from '@/app/components/acra/LLMScoreBoard'
import { RecommendedServices } from '@/app/components/acra/RecommendedServices'
import { ValueLeversSection } from '@/app/components/acra/ValueLevers'
import { PackageRecommendation } from '@/app/components/acra/PackageRecommendation'
import { ReportJsonLD } from '@/app/components/acra/ReportJsonLD'
import { SiteScreenshotHero } from '@/app/components/acra/SiteScreenshotHero'
import { calculateRevenueImpact, type RevenueRange } from '@/lib/acra/revenue'
import type { PillarScore, LLMScores, Finding, ValueLevers } from '@/lib/acra/scoring'

interface PageProps {
  params: Promise<{ token: string }>
}

interface DBReport {
  id: string
  overall_score: number
  overall_grade: string
  score_protocol_compliance: number
  score_structured_data: number
  score_aeo: number
  score_geo: number
  score_seo_foundation: number
  score_social_authority: number
  score_press_coverage: number
  score_ai_authority: number
  score_llm_recommendation: number
  projected_monthly_loss_usd: number
  projected_annual_loss_usd: number
  ai_traffic_share_percent: number
  competitor_ai_share_percent: number
  llm_chatgpt: number
  llm_perplexity: number
  llm_claude: number
  llm_gemini: number
  llm_copilot: number
  schema_types_found: string[]
  social_profiles_found: string[]
  press_sources_found: string[]
  missing_schema_types: string[]
  recommendations: Array<{ severity: string; title: string; detail: string; fixWith: string | null }>
  scan_meta: Record<string, unknown>
  created_at: string
  acra_scans: {
    url: string
    company_name: string | null
    industry: string | null
    monthly_revenue_range: string | null
    framework: string | null
    created_at: string
  }
}

const SERVICE_TO_PILLAR: Record<string, string> = {
  'ucp-implementation': 'protocol',
  'acp-integration': 'protocol',
  'ap2-trust-layer': 'protocol',
  'aeo-audit': 'aeo',
  'geo-implementation': 'geo',
  'authority-building': 'ai-authority',
  'press-syndicator': 'press',
  'social-media-manager': 'social',
}

function buildPillarsFromDB(report: DBReport): PillarScore[] {
  const make = (
    key: string,
    label: string,
    score: number,
    summaryFn: (s: number) => string,
    serviceUpsell: PillarScore['serviceUpsell']
  ): PillarScore => {
    const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F'
    const status: PillarScore['status'] = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 35 ? 'needs-work' : 'critical'
    const findings = report.recommendations
      .filter((r) => r.fixWith && SERVICE_TO_PILLAR[r.fixWith] === key)
      .map((r) => ({
        severity: r.severity as Finding['severity'],
        title: r.title,
        detail: r.detail,
        fixWith: r.fixWith ?? undefined,
      }))
    return { key, label, score, grade, status, summary: summaryFn(score), findings, serviceUpsell }
  }

  return [
    make('protocol', 'Agentic Protocol Compliance', report.score_protocol_compliance,
      (s) => s < 20 ? 'Zero agentic protocol coverage — AI agents cannot discover or buy from your site.' : s < 60 ? 'Partial protocol coverage.' : 'Strong protocol compliance.',
      report.score_protocol_compliance < 60 ? { name: 'UCP Implementation', slug: 'ucp-implementation', price: '$15,000', urgency: 'Every month without this costs you agentic market share.' } : null),
    make('structured-data', 'Structured Data & Semantics', report.score_structured_data,
      (s) => `${report.schema_types_found?.length ?? 0} schema types found. ${report.missing_schema_types?.length ?? 0} critical types missing.`,
      report.score_structured_data < 50 ? { name: 'AEO Audit', slug: 'aeo-audit', price: '$5,000', urgency: 'Fix structured data gaps before AI traffic scales.' } : null),
    make('aeo', 'Answer Engine Optimization', report.score_aeo,
      (s) => s < 30 ? 'Your site is not answering questions in a format AI engines can cite.' : s < 60 ? 'Partial AEO coverage.' : 'Strong AEO signals.',
      report.score_aeo < 60 ? { name: 'AEO Audit', slug: 'aeo-audit', price: '$5,000', urgency: 'AI citation traffic is growing 340% YoY.' } : null),
    make('geo', 'Generative Engine Optimization', report.score_geo,
      (s) => s < 30 ? 'Missing E-E-A-T signals and topical depth that generative AI requires.' : s < 60 ? 'Moderate GEO coverage.' : 'Strong GEO foundation.',
      report.score_geo < 60 ? { name: 'GEO Implementation', slug: 'geo-implementation', price: '$7,500', urgency: 'Generative search drives 28% of B2B discovery.' } : null),
    make('seo', 'SEO Foundation', report.score_seo_foundation,
      (s) => s < 40 ? 'Critical SEO gaps undermine both traditional and AI search.' : s < 70 ? 'SEO partially in place.' : 'Strong SEO foundation.',
      null),
    make('social', 'Social Authority Score', report.score_social_authority,
      (s) => `${report.social_profiles_found?.length ?? 0} social profile(s) detected.`,
      report.score_social_authority < 50 ? { name: 'Social Media Manager', slug: 'social-media-manager', price: '$6,500 + $1,500/mo', urgency: 'Social authority directly correlates with AI recommendation frequency.' } : null),
    make('press', 'Press & PR Coverage', report.score_press_coverage,
      (s) => s < 25 ? 'Critical: virtually no press footprint. AI systems cannot validate your authority.' : s < 60 ? 'Limited press coverage detected.' : 'Solid press coverage.',
      report.score_press_coverage < 50 ? { name: 'Press Syndicator', slug: 'press-syndicator', price: '$6,500 + $3,000/mo', urgency: 'Press releases are the fastest path to AI authority.' } : null),
    make('ai-authority', 'AI Authority Score', report.score_ai_authority,
      (s) => s < 25 ? 'Your brand does not register as authoritative to AI systems.' : s < 60 ? 'Moderate AI authority.' : 'Strong AI authority foundation.',
      report.score_ai_authority < 60 ? { name: 'Authority Building', slug: 'authority-building', price: '$15,000', urgency: 'AI authority compounds. Every month delayed, competitors build advantages.' } : null),
    make('llm-recommendation', 'LLM Recommendation Score', report.score_llm_recommendation,
      (s) => s < 20 ? 'No AI model would reliably recommend your brand for agentic commerce.' : s < 50 ? 'AI models have limited confidence in your brand.' : 'Strong AI recommendation signals.',
      report.score_llm_recommendation < 50 ? { name: 'Prime Package', slug: 'prime', price: '$48,000 + $12,000/mo', urgency: 'Agentic commerce will drive 31% of e-commerce revenue by 2027.' } : null),
  ]
}

async function getReportByToken(token: string): Promise<DBReport | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data, error } = await supabase
    .from('acra_reports')
    .select(`*, acra_scans ( url, company_name, industry, monthly_revenue_range, framework, created_at )`)
    .eq('share_token', token)
    .single()

  if (error || !data) return null
  return data as unknown as DBReport
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params
  const report = await getReportByToken(token)
  if (!report) return { title: 'Report Not Found' }

  const domain = (() => {
    try { return new URL(report.acra_scans.url.startsWith('http') ? report.acra_scans.url : `https://${report.acra_scans.url}`).hostname }
    catch { return report.acra_scans.url }
  })()

  const grade = report.overall_grade
  const ogImageUrl = `https://www.adamsilvaconsulting.com/api/acra/og/${token}`

  return {
    title: `ACRA Report for ${domain} — Grade ${grade} | Agentic Commerce Readiness Assessment`,
    description: `Agentic Commerce Readiness Assessment for ${domain}. Overall score: ${report.overall_score}/100 (Grade ${grade}). See 9 pillar scores, LLM recommendation scores, and revenue impact.`,
    openGraph: {
      title: `${domain} scored ${report.overall_score}/100 — Grade ${grade}`,
      description: `See how ${domain} performs across 9 agentic commerce pillars and what it means for AI-driven revenue.`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `ACRA Report for ${domain} — Grade ${grade}, Score ${report.overall_score}/100`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} scored ${report.overall_score}/100 — Grade ${grade}`,
      description: `Agentic Commerce Readiness: see 9 pillar scores and what AI agents think of this site.`,
      images: [ogImageUrl],
    },
  }
}

export default async function ACRASharePage({ params }: PageProps) {
  const { token } = await params
  const report = await getReportByToken(token)
  if (!report) notFound()

  const r = report
  const scan = r.acra_scans
  const domain = (() => {
    try { return new URL(scan.url.startsWith('http') ? scan.url : `https://${scan.url}`).hostname }
    catch { return scan.url }
  })()

  const pillars = buildPillarsFromDB(r)
  const llmScores: LLMScores = {
    chatgpt: r.llm_chatgpt,
    perplexity: r.llm_perplexity,
    claude: r.llm_claude,
    gemini: r.llm_gemini,
    copilot: r.llm_copilot,
  }

  const pillarScoreMap: Record<string, number> = {
    protocol: r.score_protocol_compliance,
    'structured-data': r.score_structured_data,
    aeo: r.score_aeo,
    geo: r.score_geo,
    seo: r.score_seo_foundation,
    social: r.score_social_authority,
    press: r.score_press_coverage,
    'ai-authority': r.score_ai_authority,
    'llm-recommendation': r.score_llm_recommendation,
  }

  const revenueImpact = calculateRevenueImpact(
    r.overall_score,
    pillarScoreMap,
    (scan.monthly_revenue_range as RevenueRange) ?? undefined
  )

  const criticalCount = pillars.filter((p) => p.status === 'critical').length
  const grade = r.overall_grade
  const gradeColor: Record<string, string> = { A: '#10b981', B: '#22c55e', C: '#f59e0b', D: '#f97316', F: '#ef4444' }

  return (
    <>
      {/* Structured data for AI agents — present on public share page too */}
      <ReportJsonLD
        domain={domain}
        scannedUrl={scan.url}
        companyName={scan.company_name}
        industry={scan.industry}
        overallScore={r.overall_score}
        overallGrade={grade}
        monthlyAtRisk={revenueImpact.monthlyAtRisk}
        annualAtRisk={revenueImpact.annualAtRisk}
        pillarScores={pillarScoreMap}
        framework={scan.framework}
        reportDate={r.created_at}
        shareUrl={`https://www.adamsilvaconsulting.com/acra/share/${token}`}
      />
      {/* Shared report banner */}
      <div className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-base)]/95 backdrop-blur-sm">
        <div className="container py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-bold text-[var(--color-accent)]">Adam Silva Consulting</Link>
            <span className="text-[var(--color-muted-2)]">/</span>
            <div className="text-sm font-bold text-[var(--color-text)] truncate max-w-[160px] sm:max-w-none">{domain}</div>
            <span
              className="text-sm font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${gradeColor[grade]}20`, color: gradeColor[grade] }}
            >
              Grade {grade}
            </span>
          </div>
          <Link href="/acra/login" className="btn-primary text-xs py-1.5 px-3">
            Get Your Free ACRA →
          </Link>
        </div>
      </div>

      {/* Shared report notice */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="container py-2 text-xs text-[var(--color-muted-2)] text-center">
          This is a shared Agentic Commerce Readiness Assessment for <strong>{domain}</strong> — generated on {new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.{' '}
          <Link href="/acra/login" className="text-[var(--color-accent)] hover:underline">Run your own free assessment →</Link>
        </div>
      </div>

      <div className="section">
        <div className="container max-w-5xl space-y-8">

          {criticalCount > 0 && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg, #dc2626, #9f1239)' }}
              role="alert"
            >
              <AlertTriangle size={20} className="shrink-0 mt-0.5" />
              <div>
                <strong>{criticalCount} critical gap{criticalCount > 1 ? 's' : ''} found.</strong>{' '}
                These issues are actively costing {domain} AI revenue and reducing LLM recommendation probability.
                <Link href="/contact" className="ml-2 underline font-semibold">Book a free strategy call →</Link>
              </div>
            </div>
          )}

          {/* Overall score hero — animated client component */}
          {/* GTmetrix-style screenshot hero */}
          <SiteScreenshotHero
            url={scan.url}
            domain={domain}
            companyName={scan.company_name}
            framework={scan.framework}
            overallScore={r.overall_score}
            grade={grade}
            reportDate={r.created_at}
            screenshotUrl={(r.scan_meta as Record<string, unknown>)?.screenshotUrl as string | undefined}
            ogImage={(r.scan_meta as Record<string, unknown>)?.ogImage as string | undefined}
            favicon={(r.scan_meta as Record<string, unknown>)?.favicon as string | undefined}
          />

          <ScoreHero
            overallScore={r.overall_score}
            grade={grade}
            pillars={[
              { label: 'Protocol', score: r.score_protocol_compliance },
              { label: 'AEO', score: r.score_aeo },
              { label: 'GEO', score: r.score_geo },
              { label: 'SEO', score: r.score_seo_foundation },
              { label: 'Social', score: r.score_social_authority },
              { label: 'Press', score: r.score_press_coverage },
              { label: 'AI Authority', score: r.score_ai_authority },
              { label: 'LLM Rec.', score: r.score_llm_recommendation },
              { label: 'Schema', score: r.score_structured_data },
            ]}
          />

          <RevenueImpactPanel impact={revenueImpact} url={scan.url} />

          {/* Risk Intelligence (4 Value Levers) */}
          {!!r.scan_meta?.valueLevers && (
            <ValueLeversSection levers={r.scan_meta.valueLevers as unknown as ValueLevers} />
          )}

          <LLMScoreBoard scores={llmScores} />
          <GoldStandardSection score={r.overall_score} framework={scan.framework} pillars={pillarScoreMap} />

          {/* Architecture & Package Recommendation */}
          <PackageRecommendation
            pillarScores={pillarScoreMap}
            domain={domain}
            framework={scan.framework}
            overallScore={r.overall_score}
            revenueImpact={revenueImpact}
          />

          {/* Pillar radar + bar chart */}
          <PillarScoreChart
            pillars={[
              { label: 'Protocol Compliance', short: 'Proto', score: r.score_protocol_compliance },
              { label: 'Answer Engine Opt.', short: 'AEO', score: r.score_aeo },
              { label: 'Generative Engine Opt.', short: 'GEO', score: r.score_geo },
              { label: 'SEO Foundation', short: 'SEO', score: r.score_seo_foundation },
              { label: 'Social Authority', short: 'Social', score: r.score_social_authority },
              { label: 'Press Coverage', short: 'Press', score: r.score_press_coverage },
              { label: 'AI Authority', short: 'AI Auth', score: r.score_ai_authority },
              { label: 'LLM Recommendation', short: 'LLM', score: r.score_llm_recommendation },
              { label: 'Structured Data', short: 'Schema', score: r.score_structured_data },
            ]}
          />

          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Detailed Pillar Analysis</h2>
            <div className="space-y-4">
              {pillars.map((pillar) => (
                <ScoreCard key={pillar.key} pillar={pillar} />
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">Schema Types Detected ({r.schema_types_found?.length ?? 0})</h3>
              {(r.schema_types_found ?? []).length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {r.schema_types_found.map((t) => (
                    <span key={t} className="badge text-xs text-green-700 bg-green-100">{t}</span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-muted-2)]">No JSON-LD schema detected on this page.</p>
              )}
              {(r.missing_schema_types ?? []).length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-red-500 mb-1.5">Missing ({r.missing_schema_types.length}):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.missing_schema_types.map((t) => (
                      <span key={t} className="badge text-xs text-red-600 bg-red-50">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">Social Profiles Found ({r.social_profiles_found?.length ?? 0})</h3>
              {(r.social_profiles_found ?? []).length > 0 ? (
                <ul className="space-y-1.5">
                  {r.social_profiles_found.map((p) => (
                    <li key={p}>
                      <a href={p} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-[var(--color-accent)] hover:underline truncate block">{p}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-500 font-medium">No social profiles detected or linked via sameAs schema.</p>
              )}
            </div>
          </div>

          <RecommendedServices pillarScores={pillarScoreMap} domain={domain} framework={scan.framework} />

          {/* CTA for share page viewers */}
          <div className="card p-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">How Does Your Site Score?</h2>
            <p className="text-[var(--color-muted)] mb-6 max-w-lg mx-auto">
              Get your own free Agentic Commerce Readiness Assessment in minutes — see exactly where you stand against AI-driven commerce.
            </p>
            <Link href="/acra/login" className="btn-primary inline-flex items-center gap-2">
              Run My Free ACRA
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

function GoldStandardSection({
  score,
  framework,
  pillars,
}: {
  score: number
  framework: string | null
  pillars: Record<string, number>
}) {
  const criteria = [
    { label: 'SPA + Server-Side Rendering (SSR)', description: 'Content immediately available in HTML — no JavaScript required for AI agents to read.', hint: framework ? `Implementation approach varies for ${framework}` : 'Requires SSR or edge rendering.', pass: (pillars['seo'] ?? 0) >= 65 },
    { label: 'Heavy JSON-LD Schema Library', description: 'Dense schema markup for Product, Organization, Person, FAQPage, SpeakableSpecification, and more.', hint: 'Maps all products and services as machine-readable entities.', pass: (pillars['structured-data'] ?? 0) >= 70 },
    { label: 'Agentic Protocol Stack (UCP/ACP/AP2)', description: 'AI agents can discover, negotiate, and execute purchases without human intervention.', hint: 'Requires /.well-known/ucp, /.well-known/acp, and /.well-known/ap2 endpoints.', pass: (pillars['protocol'] ?? 0) >= 60 },
    { label: 'Tier 1 Press Release Syndication', description: 'Regular press releases distributed via Business Wire or PR Newswire — the #1 AI authority signal.', hint: 'Branded web mentions have a 0.664 correlation with AI citation frequency (Ahrefs data).', pass: (pillars['press'] ?? 0) >= 65 },
    { label: 'Social Media Authority + sameAs Entity Graph', description: 'LinkedIn, Twitter/X, YouTube linked via sameAs in JSON-LD — machines can verify your brand identity.', hint: 'Social proof reduces AI recommendation hesitation by up to 40%.', pass: (pillars['social'] ?? 0) >= 65 },
  ]

  const passCount = criteria.filter((c) => c.pass).length
  const atGoldStandard = passCount >= 5

  return (
    <div className="card overflow-hidden">
      <div className="p-5" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, #f59e0b 12%, transparent), color-mix(in srgb, #f59e0b 5%, transparent))' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star size={18} className="text-amber-500" />
              <h2 className="font-bold text-[var(--color-text)]">ASC Gold Standard Comparison</h2>
            </div>
            <p className="text-sm text-[var(--color-muted-2)]">
              The architecture ASC implements for clients generating $50M+ annually.
              {framework && ` Framework detected: ${framework}.`}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold" style={{ color: atGoldStandard ? '#10b981' : passCount >= 3 ? '#f59e0b' : '#ef4444' }}>{passCount}/5</div>
            <div className="text-xs text-[var(--color-muted-2)]">criteria met</div>
          </div>
        </div>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {criteria.map((c) => (
          <div key={c.label} className="p-4 flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              {c.pass ? <CheckCircle2 size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-[var(--color-text)]">{c.label}</div>
              <p className="text-xs text-[var(--color-muted-2)] mt-0.5 leading-relaxed">{c.description}</p>
              {!c.pass && <p className="text-xs text-amber-600 mt-1 font-medium">{c.hint}</p>}
            </div>
            <div className="shrink-0">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: c.pass ? '#10b98115' : '#ef444415', color: c.pass ? '#10b981' : '#ef4444' }}>
                {c.pass ? 'Pass' : 'Gap'}
              </span>
            </div>
          </div>
        ))}
      </div>
      {!atGoldStandard && (
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            <strong className="text-[var(--color-text)]">This site is {5 - passCount} criteria away from the ASC Gold Standard.</strong>{' '}
            Sites at Gold Standard level score 85+ overall and capture 3–5× more AI-driven revenue than average.
          </p>
          <Link href="/contact" className="btn-primary mt-3 inline-flex items-center gap-1.5 text-sm">
            See What Full Implementation Looks Like
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  )
}
