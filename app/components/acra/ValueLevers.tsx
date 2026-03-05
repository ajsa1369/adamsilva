/**
 * ValueLevers — 4 high-stakes insight panels for ACRA reports
 *
 * 1. LLM Crawlability Score (1-10)
 * 2. Zero-Click Traffic Projection
 * 3. Hallucination & Misinformation Risk
 * 4. Shadow Competitor Context
 */
import { CheckCircle2, XCircle, AlertTriangle, TrendingDown, Bot, Users } from 'lucide-react'
import type { ValueLevers } from '@/lib/acra/scoring'

// ── Shared helpers ────────────────────────────────────────────────────────────

const RISK_CONFIG = {
  low: { label: 'Low Risk', color: '#10b981', bg: '#10b98112' },
  medium: { label: 'Medium Risk', color: '#f59e0b', bg: '#f59e0b12' },
  high: { label: 'High Risk', color: '#f97316', bg: '#f9731612' },
  critical: { label: 'Critical', color: '#ef4444', bg: '#ef444412' },
} as const

const CRAWL_GRADE_COLOR: Record<string, string> = {
  A: '#10b981', B: '#22c55e', C: '#f59e0b', D: '#f97316', F: '#ef4444',
}

// ── Panel 1: LLM Crawlability Score ──────────────────────────────────────────

function CrawlabilityMeter({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color = score >= 8 ? '#10b981' : score >= 6 ? '#22c55e' : score >= 4 ? '#f59e0b' : score >= 2 ? '#f97316' : '#ef4444'
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-surface-2)" strokeWidth="8" />
          <circle
            cx="40" cy="40" r="34" fill="none"
            stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 213.6} 213.6`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold leading-none" style={{ color }}>{score}</span>
          <span className="text-[10px] text-[var(--color-muted-2)]">/10</span>
        </div>
      </div>
    </div>
  )
}

function LLMCrawlabilityPanel({ levers }: { levers: ValueLevers }) {
  const { llmCrawlabilityScore, llmCrawlabilityGrade, llmCrawlabilityFactors } = levers
  const gradeColor = CRAWL_GRADE_COLOR[llmCrawlabilityGrade]
  const passCount = llmCrawlabilityFactors.filter((f) => f.pass).length

  return (
    <div className="card overflow-hidden">
      <div
        className="p-5 flex items-start gap-4"
        style={{ background: `linear-gradient(135deg, ${gradeColor}10, ${gradeColor}05)` }}
      >
        <Bot size={20} style={{ color: gradeColor }} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[var(--color-text)]">LLM Crawlability Score</h3>
          <p className="text-xs text-[var(--color-muted-2)] mt-0.5 leading-relaxed">
            How well AI bots can actually read, extract, and index your site. A score below 5/10 means AI systems time out, fail to extract content, or deprioritize your pages entirely.
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-center">
          <CrawlabilityMeter score={llmCrawlabilityScore} />
          <span
            className="mt-1 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${gradeColor}20`, color: gradeColor }}
          >
            Grade {llmCrawlabilityGrade}
          </span>
        </div>
      </div>

      {llmCrawlabilityScore <= 4 && (
        <div className="mx-4 mt-0 mb-0 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          <AlertTriangle size={13} className="inline mr-1.5" />
          Score {llmCrawlabilityScore}/10 — AI bots are likely skipping or mis-indexing your site. Competitors with scores above 7 receive preferential crawl frequency and citation priority.
        </div>
      )}

      <div className="divide-y divide-[var(--color-border)]">
        {llmCrawlabilityFactors.map((f) => (
          <div key={f.factor} className="px-5 py-3 flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              {f.pass
                ? <CheckCircle2 size={15} className="text-green-500" />
                : <XCircle size={15} className="text-red-400" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[var(--color-text)]">{f.factor}</div>
              <p className="text-xs text-[var(--color-muted-2)] mt-0.5 leading-relaxed">{f.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-muted-2)]">
        {passCount}/{llmCrawlabilityFactors.length} crawlability criteria met.{' '}
        {llmCrawlabilityScore < 5 ? 'Address failing factors to enable reliable AI indexing.' : 'Good baseline — close remaining gaps for maximum AI citation frequency.'}
      </div>
    </div>
  )
}

// ── Panel 2: Zero-Click Traffic Projection ────────────────────────────────────

function ZeroClickProjection({ levers }: { levers: ValueLevers }) {
  const { zeroClickRiskPercent, zeroClickCitationRate, zeroClickNetLossPercent } = levers

  const riskColor = zeroClickNetLossPercent >= 35 ? '#ef4444' : zeroClickNetLossPercent >= 20 ? '#f97316' : '#f59e0b'

  return (
    <div className="card overflow-hidden">
      <div
        className="p-5"
        style={{ background: 'linear-gradient(135deg, #ef444410, #ef444405)' }}
      >
        <div className="flex items-start gap-3">
          <TrendingDown size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-[var(--color-text)]">Zero-Click Traffic Projection</h3>
            <p className="text-xs text-[var(--color-muted-2)] mt-0.5 leading-relaxed">
              Gartner projects {zeroClickRiskPercent}% of organic search will shift to AI answer engines by Q4 2026.
              At your current AEO score, only <strong>{zeroClickCitationRate}%</strong> of that traffic would cite your brand.
              The rest goes to competitors.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Visual flow */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-lg bg-[var(--color-surface)]">
            <div className="text-lg font-bold text-[var(--color-text)]">{zeroClickRiskPercent}%</div>
            <div className="text-xs text-[var(--color-muted-2)] mt-0.5">Organic traffic<br />shifting to AI</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-[var(--color-muted-2)] text-lg">→</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: `${riskColor}12` }}>
            <div className="text-lg font-bold" style={{ color: riskColor }}>{zeroClickNetLossPercent}%</div>
            <div className="text-xs mt-0.5" style={{ color: riskColor }}>Net organic loss<br />at current AEO</div>
          </div>
        </div>

        {/* Projection bar */}
        <div>
          <div className="flex justify-between text-xs text-[var(--color-muted-2)] mb-1.5">
            <span>Traffic you retain in AI era</span>
            <span>Traffic flowing to competitors</span>
          </div>
          <div className="h-4 rounded-full bg-[var(--color-surface-2)] overflow-hidden flex">
            <div
              className="h-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold"
              style={{ width: `${100 - zeroClickNetLossPercent}%` }}
            >
              {100 - zeroClickNetLossPercent}%
            </div>
            <div
              className="h-full flex items-center justify-center text-[10px] text-white font-bold"
              style={{ width: `${zeroClickNetLossPercent}%`, background: riskColor }}
            >
              {zeroClickNetLossPercent}%
            </div>
          </div>
        </div>

        {/* Citation rate callout */}
        <div className="p-3 rounded-lg border border-[var(--color-border)] text-xs leading-relaxed text-[var(--color-muted)]">
          <strong className="text-[var(--color-text)]">What this means:</strong>{' '}
          {zeroClickCitationRate < 20
            ? `With a ${zeroClickCitationRate}% AI citation rate, the majority of visitors who ask ChatGPT, Perplexity, or Gemini about your category will never see your brand. They will see whoever ranks highest in the AI's training data — likely your better-optimized competitors.`
            : zeroClickCitationRate < 50
            ? `Your ${zeroClickCitationRate}% citation rate means you capture some AI-driven traffic, but over half of AI-referred buyers in your category go to more authoritative competitors. Closing your AEO gaps can push this above 70%.`
            : `Your ${zeroClickCitationRate}% citation rate is above average — but there's still meaningful traffic loss. Reaching 80%+ citation rate requires closing remaining AEO and GEO gaps.`
          }
        </div>
      </div>
    </div>
  )
}

// ── Panel 3: Hallucination & Misinformation Risk ─────────────────────────────

function HallucinationRiskPanel({ levers }: { levers: ValueLevers }) {
  const { hallucinationRiskLevel, hallucinationRiskReasons } = levers
  const cfg = RISK_CONFIG[hallucinationRiskLevel]

  return (
    <div className="card overflow-hidden">
      <div className="p-5 flex items-start gap-4" style={{ background: `${cfg.bg}` }}>
        <AlertTriangle size={20} style={{ color: cfg.color }} className="shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[var(--color-text)]">Hallucination & Misinformation Risk</h3>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${cfg.color}20`, color: cfg.color }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted-2)] mt-1 leading-relaxed">
            {hallucinationRiskLevel === 'critical'
              ? 'AI systems are actively hallucinating information about your brand. Without verified entity data, LLMs invent founding dates, pricing, team members, and services — then present them as fact to your potential customers.'
              : hallucinationRiskLevel === 'high'
              ? 'Significant gaps in your entity verification signal mean AI systems fill in missing facts with inferences or competitor data. This creates a reputation risk every time someone asks an AI about your brand.'
              : hallucinationRiskLevel === 'medium'
              ? 'Some entity verification gaps exist. AI systems can generally identify your brand but may produce inaccurate details in edge cases, particularly for newer AI models still building their knowledge graphs.'
              : 'Strong entity verification signals in place. AI systems are likely producing accurate descriptions of your brand in response queries.'
            }
          </p>
        </div>
      </div>

      {hallucinationRiskReasons.length > 0 && (
        <div className="divide-y divide-[var(--color-border)]">
          {hallucinationRiskReasons.map((reason, i) => (
            <div key={i} className="px-5 py-3 flex items-start gap-2.5">
              <XCircle size={14} style={{ color: cfg.color }} className="shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      )}

      {hallucinationRiskLevel === 'low' && (
        <div className="px-5 py-3 flex items-center gap-2 text-green-700 text-xs">
          <CheckCircle2 size={14} />
          No significant hallucination risk factors detected. Continue maintaining entity verification signals.
        </div>
      )}

      <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-muted-2)]">
        Hallucination risk is resolved by adding Organization schema, sameAs social links, press coverage, and Wikipedia/Wikidata entries — all of which Claude, ChatGPT, and Gemini use to verify brand claims.
      </div>
    </div>
  )
}

// ── Panel 4: Shadow Competitor Context ───────────────────────────────────────

function ShadowCompetitorPanel({ levers }: { levers: ValueLevers }) {
  const { competitorAdvantageMonths, shadowCompetitorStatement } = levers
  const urgencyColor = competitorAdvantageMonths >= 12 ? '#ef4444' : competitorAdvantageMonths >= 6 ? '#f97316' : '#f59e0b'

  return (
    <div className="card overflow-hidden">
      <div
        className="p-5"
        style={{ background: 'linear-gradient(135deg, #7c3aed10, #7c3aed05)' }}
      >
        <div className="flex items-start gap-3">
          <Users size={20} className="text-violet-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[var(--color-text)]">Shadow Competitor Advantage</h3>
              {competitorAdvantageMonths > 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${urgencyColor}20`, color: urgencyColor }}
                >
                  ~{competitorAdvantageMonths} months ahead
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-muted-2)] mt-1 leading-relaxed">
              Who AI systems are recommending instead of you — and why.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <blockquote className="border-l-4 border-violet-400 pl-4 text-sm text-[var(--color-muted)] leading-relaxed italic">
          {shadowCompetitorStatement}
        </blockquote>

        {competitorAdvantageMonths > 0 && (
          <div className="p-3 rounded-lg" style={{ background: `${urgencyColor}08`, border: `1px solid ${urgencyColor}30` }}>
            <div className="text-xs font-semibold" style={{ color: urgencyColor }}>
              Digital Equity Transfer in Progress
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-1 leading-relaxed">
              Every month without an agentic protocol stack and verified brand entity, compliant competitors build an estimated <strong>{competitorAdvantageMonths} month</strong> compound advantage in AI training data. Once AI systems learn who the category authority is, reversing that perception takes 2–3× longer than establishing it.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[var(--color-surface)]">
            <div className="font-semibold text-[var(--color-text)] mb-1">What competitors who ARE cited have:</div>
            <ul className="space-y-1 text-[var(--color-muted-2)]">
              <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-green-500 shrink-0" />UCP/ACP protocol endpoints</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-green-500 shrink-0" />Organization + FAQPage schema</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-green-500 shrink-0" />Press releases + sameAs links</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-green-500 shrink-0" />Verified E-E-A-T author signals</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#ef444408', border: '1px solid #ef444420' }}>
            <div className="font-semibold text-red-500 mb-1">What's missing from your site:</div>
            <ul className="space-y-1 text-[var(--color-muted-2)]">
              <li className="flex items-center gap-1.5"><XCircle size={11} className="text-red-400 shrink-0" />Agentic commerce protocols</li>
              <li className="flex items-center gap-1.5"><XCircle size={11} className="text-red-400 shrink-0" />Complete entity schema graph</li>
              <li className="flex items-center gap-1.5"><XCircle size={11} className="text-red-400 shrink-0" />AI-indexed press footprint</li>
              <li className="flex items-center gap-1.5"><XCircle size={11} className="text-red-400 shrink-0" />Cross-platform brand verification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main export: ValueLeversSection ──────────────────────────────────────────

export function ValueLeversSection({ levers }: { levers: ValueLevers }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[var(--color-text)]">Risk Intelligence Report</h2>
        <p className="text-sm text-[var(--color-muted-2)] mt-1">
          Four dimensions that determine whether your digital equity is compounding — or being transferred to competitors every day.
        </p>
      </div>
      <div className="space-y-4">
        <ZeroClickProjection levers={levers} />
        <HallucinationRiskPanel levers={levers} />
        <ShadowCompetitorPanel levers={levers} />
        <LLMCrawlabilityPanel levers={levers} />
      </div>
    </div>
  )
}
