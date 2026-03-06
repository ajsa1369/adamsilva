'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

const BEFORE_AFTER = [
  {
    before: 'SEO: 10 Blue Links',
    after: 'AEO: AI Synthesized Answers',
    icon: TrendingDown,
    metric: '69% zero-click',
  },
  {
    before: 'Keyword Matching',
    after: 'Schema.org + JSON-LD',
    icon: TrendingUp,
    metric: '3x AI citations',
  },
  {
    before: 'Manual Checkout',
    after: 'Agent Checkout (ACP)',
    icon: TrendingUp,
    metric: '$67B agent sales',
  },
  {
    before: 'Trust on Reputation',
    after: 'Cryptographic Mandates (AP2)',
    icon: TrendingUp,
    metric: 'Verifiable Credentials',
  },
]

const MARKET_NUMBERS = [
  { label: 'Agentic Commerce Market (2025)', value: '$547M', color: '#3b82f6' },
  { label: 'Agentic Commerce Market (2033)', value: '$5.2B', color: '#10b981' },
  { label: 'CAGR Growth Rate', value: '32.5%', color: '#8b5cf6' },
  { label: 'Enterprises Deploying AI Agents', value: '82%', color: '#f59e0b' },
]

export function MarketShiftInfographic() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="section bg-[var(--color-surface)]" aria-label="Market shift infographic">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              color: '#2563eb',
            }}
          >
            <AlertCircle size={14} />
            <span className="text-xs font-bold tracking-wider uppercase font-mono">The Shift Is Happening Now</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight mb-3">
            The Old Playbook Is Dead
          </h2>
          <p className="text-[var(--color-muted)]">
            Every channel that built your business is being replaced. Here is what is taking over.
          </p>
        </div>

        {/* Before → After comparison */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-16">
          {BEFORE_AFTER.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="card-glass p-5 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : `translateX(${i % 2 === 0 ? -30 : 30}px)`,
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm line-through text-[var(--color-muted-2)]">{item.before}</span>
                  </div>
                  <span className="text-[var(--color-accent)] text-lg font-bold">&rarr;</span>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm font-bold text-[var(--color-text)]">{item.after}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: item.icon === TrendingDown ? '#6366f1' : '#10b981' }} />
                  <span
                    className="text-xs font-bold font-mono"
                    style={{ color: item.icon === TrendingDown ? '#6366f1' : '#10b981' }}
                  >
                    {item.metric}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Market growth bars */}
        <div className="max-w-3xl mx-auto">
          <h3
            className="text-lg font-bold text-[var(--color-text)] text-center mb-8 font-display transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: '500ms',
            }}
          >
            The $5.2 Billion Market You Cannot Ignore
          </h3>
          <div className="space-y-4">
            {MARKET_NUMBERS.map((item, i) => (
              <div
                key={i}
                className="transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                  transitionDelay: `${600 + i * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-[var(--color-muted)]">{item.label}</span>
                  <span className="text-lg font-black font-display" style={{ color: item.color }}>
                    {item.value}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                      width: visible ? (i === 0 ? '10%' : i === 1 ? '95%' : i === 2 ? '33%' : '82%') : '0%',
                      transitionDelay: `${700 + i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-muted-2)] text-center mt-4">
            Sources: Sanbi AI Market Report, Fortune Business Insights, Capgemini Research Institute
          </p>
        </div>
      </div>
    </section>
  )
}
