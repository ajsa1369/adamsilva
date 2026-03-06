'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000 }: {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const step = end / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const PAIN_STATS = [
  { value: 69, suffix: '%', label: 'Searches End Without a Click', source: 'Similarweb 2025', color: '#ef4444' },
  { value: 67, prefix: '$', suffix: 'B', label: 'AI Agent Sales Last Cyber Week', source: 'Salesforce 2025', color: '#f59e0b' },
  { value: 61, suffix: '%', label: 'CTR Drop in AI Overviews', source: 'Seer Interactive', color: '#ef4444' },
  { value: 83, suffix: '%', label: 'Zero-Click on AI Overviews', source: 'Semrush 2025', color: '#f59e0b' },
]

export function SandlerPainHero() {
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
    <section
      ref={ref}
      className="section-lg relative overflow-hidden"
      aria-labelledby="pain-hero-heading"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239, 68, 68, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 50%),
          var(--color-base)
        `,
      }}
    >
      {/* Animated danger pulse background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
            animation: visible ? 'pulse 3s ease-in-out infinite' : 'none',
            opacity: visible ? 0.6 : 0,
          }}
        />
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Warning badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-700"
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <AlertTriangle size={14} />
            <span className="text-xs font-bold tracking-wider uppercase font-mono">The Cost of Waiting</span>
          </div>

          {/* Pain headline */}
          <h1
            id="pain-hero-heading"
            className="text-4xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight font-display tracking-tight transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '100ms',
            }}
          >
            Your Competitors Are Already
            <span className="block" style={{ color: '#ef4444' }}>
              Visible to AI Agents.
            </span>
            <span className="block text-[var(--color-muted-2)] text-3xl lg:text-4xl mt-2 font-sans font-medium">
              You Are Not.
            </span>
          </h1>

          {/* Pain subheadline */}
          <p
            className="text-lg lg:text-xl text-[var(--color-muted)] mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '200ms',
            }}
          >
            While you optimize for yesterday&apos;s Google, AI shopping agents are choosing your competitors &mdash; because they can actually find them.
          </p>
        </div>

        {/* Pain stats grid — animated counters */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto mb-12"
        >
          {PAIN_STATS.map((stat, i) => (
            <div
              key={i}
              className="card-glass p-6 text-center transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transitionDelay: `${300 + i * 100}ms`,
                borderColor: `color-mix(in srgb, ${stat.color} 20%, transparent)`,
              }}
            >
              <div
                className="text-4xl lg:text-5xl font-black font-display leading-none mb-2"
                style={{ color: stat.color }}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
              </div>
              <div className="text-sm font-semibold text-[var(--color-text)] mb-1">{stat.label}</div>
              <div className="text-xs text-[var(--color-muted-2)]">{stat.source}</div>
            </div>
          ))}
        </div>

        {/* Cost of inaction callout */}
        <div
          className="max-w-3xl mx-auto transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '700ms',
          }}
        >
          <div
            className="card p-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(245, 158, 11, 0.04) 100%)',
              borderColor: 'rgba(239, 68, 68, 0.15)',
            }}
          >
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted-2)] mb-3">Cost of Inaction</div>
            <div className="text-5xl lg:text-6xl font-black font-display mb-3" style={{ color: '#ef4444' }}>
              <AnimatedCounter end={15} prefix="$" suffix="T" duration={1500} />
            </div>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-xl mx-auto">
              in B2B purchases will flow through AI agents by 2028. Every month you wait, competitors with protocol-compliant infrastructure capture market share you cannot get back.
            </p>
            <div className="text-xs text-[var(--color-muted-2)] mt-3">Gartner via Digital Commerce 360, Nov 2025</div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '900ms',
          }}
        >
          <Link href="/acra/run" className="btn-primary text-lg px-8 py-3">
            Find Out What You&apos;re Missing
            <ArrowRight size={18} />
          </Link>
          <Link href="#services-grid" className="btn-secondary">
            See All 18 Services
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}
