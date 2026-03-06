'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const PHASES = [
  {
    phase: 'Phase 1',
    weeks: 'Week 1-2',
    title: 'ACRA Assessment',
    items: ['9-pillar protocol audit', 'AI citation testing (5 platforms)', 'Competitive benchmarking', 'Prioritized action plan'],
    color: '#3b82f6',
    service: 'acra',
  },
  {
    phase: 'Phase 2',
    weeks: 'Week 3-6',
    title: 'Foundation Layer',
    items: ['JSON-LD schema across all pages', 'UCP manifest deployment', 'AP2 mandate infrastructure', 'GEO implementation'],
    color: '#8b5cf6',
    service: 'ucp-implementation',
  },
  {
    phase: 'Phase 3',
    weeks: 'Week 7-10',
    title: 'Execution Layer',
    items: ['ACP checkout integration', 'Stripe SPT setup', 'Agent checkout testing', 'Verifiable Credentials'],
    color: '#10b981',
    service: 'acp-integration',
  },
  {
    phase: 'Phase 4',
    weeks: 'Week 11-14',
    title: 'Authority Layer',
    items: ['10 AEO-optimized articles', 'Topical hub pages', 'DefinedTermSet glossary', 'AI citation tracking'],
    color: '#f59e0b',
    service: 'authority-building',
  },
  {
    phase: 'Phase 5',
    weeks: 'Week 15-16',
    title: 'Launch & QA',
    items: ['Full protocol QA', 'Agent discovery verification', 'Performance benchmarks', 'Go live'],
    color: '#ec4899',
    service: null,
  },
]

export function RoadmapInfographic() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="section bg-[var(--color-surface)]" aria-labelledby="roadmap-heading">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge mb-4">Implementation</span>
          <h2
            id="roadmap-heading"
            className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight mb-3"
          >
            The 16-Week Protocol Roadmap
          </h2>
          <p className="text-[var(--color-muted)]">
            Not a proposal. Not a deck. A proven methodology from first audit to full agentic commerce deployment.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: visible
                ? 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #10b981, #f59e0b, #ec4899)'
                : 'var(--color-border)',
              transition: 'background 2s ease',
            }}
          />

          <div className="space-y-6">
            {PHASES.map((phase, i) => (
              <div
                key={i}
                className="flex gap-4 lg:gap-8 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center shrink-0 hidden md:flex">
                  <div
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white text-sm lg:text-base font-black font-display z-10"
                    style={{ background: phase.color }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className="card p-6 flex-1"
                  style={{
                    borderColor: `color-mix(in srgb, ${phase.color} 20%, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold font-mono tracking-wider uppercase px-2 py-1 rounded"
                      style={{
                        background: `${phase.color}12`,
                        color: phase.color,
                      }}
                    >
                      {phase.weeks}
                    </span>
                    <span className="text-xs text-[var(--color-muted-2)] font-mono md:hidden">{phase.phase}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] font-display mb-3">{phase.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {phase.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: phase.color }} />
                        <span className="text-sm text-[var(--color-muted)]">{item}</span>
                      </div>
                    ))}
                  </div>
                  {phase.service && (
                    <Link
                      href={`/services/${phase.service}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold mt-4"
                      style={{ color: phase.color }}
                    >
                      View service <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline summary bar */}
        <div
          className="max-w-4xl mx-auto mt-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: '900ms',
          }}
        >
          <div className="flex rounded-xl overflow-hidden h-3">
            {PHASES.map((phase, i) => (
              <div
                key={i}
                className="transition-all duration-1000"
                style={{
                  background: phase.color,
                  flex: i === 0 ? 2 : i === 4 ? 2 : 4,
                  opacity: visible ? 1 : 0.2,
                  transitionDelay: `${1000 + i * 100}ms`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-[var(--color-muted-2)]">
            <span>Week 1</span>
            <span>Week 6</span>
            <span>Week 10</span>
            <span>Week 14</span>
            <span>Week 16</span>
          </div>
        </div>
      </div>
    </section>
  )
}
