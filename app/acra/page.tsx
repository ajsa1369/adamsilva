import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, BarChart3, Shield, Zap, TrendingDown } from 'lucide-react'
import { SITE_URL } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Free Agentic Commerce Readiness Assessment (ACRA) — Adam Silva Consulting',
  description: 'Run a free ACRA report in minutes. Get scored on AEO, GEO, SEO, social authority, press coverage, and LLM recommendation probability — with projected revenue loss from each gap.',
  alternates: { canonical: `${SITE_URL}/acra` },
}

const PILLARS = [
  { icon: Shield, label: 'Protocol Compliance', desc: 'UCP, ACP, AP2 — can AI agents buy from you?', color: '#0ea5e9' },
  { icon: BarChart3, label: 'AEO Score', desc: 'Are you cited by ChatGPT, Perplexity, Claude, Gemini?', color: '#8b5cf6' },
  { icon: Zap, label: 'GEO Score', desc: 'E-E-A-T, topical authority, generative engine presence', color: '#10b981' },
  { icon: CheckCircle, label: 'SEO Foundation', desc: 'Technical SEO, schema, Core Web Vitals', color: '#f59e0b' },
  { icon: TrendingDown, label: 'Social Authority', desc: 'Platform presence + sameAs schema linkage', color: '#ec4899' },
  { icon: Shield, label: 'Press & PR Coverage', desc: 'AI-indexed press releases, newsroom, directories', color: '#f97316' },
  { icon: BarChart3, label: 'AI Authority Score', desc: 'Entity verification, E-E-A-T, brand credibility', color: '#6366f1' },
  { icon: Zap, label: 'LLM Recommendation', desc: 'Per-model score: ChatGPT · Claude · Perplexity · Gemini · Copilot', color: '#14b8a6' },
  { icon: TrendingDown, label: 'Revenue Impact', desc: 'Projected monthly loss from each unclosed gap', color: '#ef4444' },
]

export default function ACRALandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="acra-hero-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-4">Free Tool</span>
            <h1 id="acra-hero-heading" className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight">
              Your Free Agentic Commerce<br />
              <span className="text-[var(--color-accent)]">Readiness Assessment</span>
            </h1>
            <p className="text-xl text-[var(--color-muted)] mb-4 leading-relaxed">
              Enter your URL. Get a GTmetrix-style report scoring your AEO, GEO, SEO, Social Authority,
              Press Coverage, and LLM Recommendation probability — with dollar-figure revenue loss projections
              for every gap.
            </p>
            <p className="text-sm text-[var(--color-muted-2)] mb-8">
              No credit card. No sales call required. Results in under 30 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acra/run" className="btn-primary text-base px-8 py-3.5">
                Run My Free ACRA
                <ArrowRight size={18} />
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-base px-8 py-3.5">
                See How It Works
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-[var(--color-muted-2)]">
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-500" /> Free forever</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-500" /> 9 scoring pillars</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-500" /> Revenue loss projections</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-500" /> Per-LLM scores</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sample report preview */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="preview-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Report Preview</span>
            <h2 id="preview-heading" className="text-3xl font-bold text-[var(--color-text)] mb-4">
              A Report That Actually Hurts to Read
            </h2>
            <p className="text-[var(--color-muted)]">
              We don&apos;t sugarcoat gaps. Your ACRA shows exactly what AI agents can and cannot do with your site — and what it&apos;s costing you every month.
            </p>
          </div>

          {/* Mock report card */}
          <div className="max-w-4xl mx-auto card p-0 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs text-[var(--color-muted-2)] mb-1">ACRA Report for example.com</div>
                <div className="text-2xl font-bold text-[var(--color-text)]">Overall Grade: <span className="text-red-500">D</span></div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">38</div>
                  <div className="text-xs text-[var(--color-muted-2)]">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">$47K</div>
                  <div className="text-xs text-[var(--color-muted-2)]">Revenue at Risk/mo</div>
                </div>
              </div>
            </div>

            {/* Pillar bars */}
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Protocol Compliance (UCP/ACP/AP2)', score: 0, color: '#ef4444' },
                { label: 'Structured Data & Schema', score: 22, color: '#f97316' },
                { label: 'AEO Score', score: 31, color: '#f97316' },
                { label: 'GEO Score', score: 28, color: '#f97316' },
                { label: 'SEO Foundation', score: 67, color: '#22c55e' },
                { label: 'Social Authority', score: 15, color: '#ef4444' },
                { label: 'Press & PR Coverage', score: 5, color: '#ef4444' },
                { label: 'AI Authority Score', score: 18, color: '#ef4444' },
                { label: 'LLM Recommendation', score: 12, color: '#ef4444' },
              ].map(({ label, score, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--color-text)]">{label}</span>
                    <span className="text-xs font-bold" style={{ color }}>{score}</span>
                  </div>
                  <div className="h-2 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Blurred CTA overlay */}
            <div className="relative">
              <div className="p-6 filter blur-sm select-none pointer-events-none" aria-hidden="true">
                <div className="text-sm font-bold text-red-500 mb-2">🚨 Critical: No Agentic Protocol Endpoints Detected</div>
                <div className="text-xs text-[var(--color-muted)">AI shopping agents (ChatGPT, Claude Commerce, Perplexity Shop) cannot discover or purchase from your site. Estimated monthly revenue loss: $23,400</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]/80 backdrop-blur-sm">
                <Link href="/acra/run" className="btn-primary">
                  Run Your Real ACRA to See Full Report
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Pillars */}
      <section id="how-it-works" className="section" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">What We Score</span>
            <h2 id="pillars-heading" className="text-3xl font-bold text-[var(--color-text)] mb-4">
              9 Pillars. 200+ Data Points. One Brutal Score.
            </h2>
            <p className="text-[var(--color-muted)]">
              The ACRA is the only free tool that evaluates agentic protocol compliance, LLM recommendation probability, social authority, and press coverage in a single automated report.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="card p-5 flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={20} style={{ color }} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold text-[var(--color-text)] text-sm">{label}</div>
                  <div className="text-xs text-[var(--color-muted)] mt-1 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="why-heading">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="badge mb-4">Why This Matters Now</span>
            <h2 id="why-heading" className="text-3xl font-bold text-[var(--color-text)] mb-4">
              Agentic Commerce Is Already Happening.<br />You&apos;re Probably Missing It.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { stat: '50%', label: 'of traditional search traffic will be replaced by AI answer engines by 2026 — Gartner. If you\'re not being cited, you\'re losing half your discovery channel.', color: '#ef4444' },
              { stat: '25–45', label: 'is where most websites score on AEO readiness. A score below 60 means AI systems are likely not citing your content at all.', color: '#f97316' },
              { stat: 'Top 15%', label: 'of websites score above 70 on AI readiness. That\'s the threshold to appear consistently in ChatGPT, Perplexity, Claude, and Gemini answers.', color: '#8b5cf6' },
              { stat: '$0', label: 'in agentic revenue for sites without UCP/ACP protocol compliance. AI agents literally cannot complete a purchase from your store.', color: '#ef4444' },
            ].map(({ stat, label, color }) => (
              <div key={stat} className="card p-6 flex gap-5">
                <div className="text-4xl font-bold shrink-0 leading-tight" style={{ color }}>{stat}</div>
                <div className="text-sm text-[var(--color-muted)] leading-relaxed">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What happens after */}
      <section className="section" aria-labelledby="after-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 id="after-heading" className="text-3xl font-bold text-[var(--color-text)]">
              What Happens After Your ACRA
            </h2>
          </div>
          <ol className="space-y-4">
            {[
              { n: 1, title: 'You get your score instantly', detail: 'No waiting. No email follow-up required. Your report is live in your dashboard the moment the scan completes.' },
              { n: 2, title: 'You see exactly what\'s costing you money', detail: 'Every gap includes a projected monthly revenue loss based on your industry and traffic profile.' },
              { n: 3, title: 'You get a prioritized fix list', detail: 'Recommendations are ranked by revenue impact, not complexity. The highest-ROI fixes come first.' },
              { n: 4, title: 'You decide what to do next', detail: 'Fix it yourself using our guides, or engage us for implementation. Zero pressure either way.' },
            ].map(({ n, title, detail }) => (
              <li key={n} className="card p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {n}
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-text)]">{title}</div>
                  <div className="text-sm text-[var(--color-muted)] mt-1 leading-relaxed">{detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="acra-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-4">Start Free</span>
            <h2 id="acra-cta-heading" className="text-3xl font-bold text-[var(--color-text)] mb-4">
              Run Your Free ACRA Now
            </h2>
            <p className="text-[var(--color-muted)] mb-8">
              Create a free account, enter your URL, and get your full 9-pillar report with revenue impact projections in under 30 seconds.
            </p>
            <Link href="/acra/run" className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
              Get My Free ACRA Score
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
