'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X, Check } from 'lucide-react'

const NOT_FOR = [
  'You are satisfied with your current lead volume and do not need AI-driven channels',
  'You do not sell products or services online',
  'You are not willing to act on findings within 90 days',
  'You think "AI commerce" is a buzzword that will pass',
]

const IS_FOR = [
  'You suspect AI engines cannot find your business and want proof',
  'You are losing deals to competitors who appear in every AI response',
  'You need a prioritized roadmap, not another generic audit',
  'You are ready to invest in infrastructure that compounds over time',
]

export function SandlerNegativeReverse() {
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
    <section ref={ref} className="section relative overflow-hidden" aria-labelledby="sandler-nr-heading">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 60%),
            var(--color-base)
          `,
        }}
      />
      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span
              className="badge mb-4"
              style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
            >
              Fair Warning
            </span>
            <h2
              id="sandler-nr-heading"
              className="text-3xl lg:text-5xl font-bold text-[var(--color-text)] font-display tracking-tight"
            >
              This Is Not for Everyone.
            </h2>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* NOT for */}
            <div
              className="card p-8 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transitionDelay: '200ms',
                borderColor: 'rgba(239, 68, 68, 0.15)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.03) 0%, var(--color-surface) 100%)',
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                  <X size={16} style={{ color: '#ef4444' }} />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] font-display">Do NOT contact us if:</h3>
              </div>
              <div className="space-y-4">
                {NOT_FOR.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 transition-all duration-500"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                      transitionDelay: `${400 + i * 100}ms`,
                    }}
                  >
                    <X size={16} className="shrink-0 mt-1" style={{ color: '#ef4444' }} />
                    <span className="text-sm text-[var(--color-muted)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IS for */}
            <div
              className="card p-8 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(30px)',
                transitionDelay: '300ms',
                borderColor: 'rgba(16, 185, 129, 0.2)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, var(--color-surface) 100%)',
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Check size={16} style={{ color: '#10b981' }} />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] font-display">This IS for you if:</h3>
              </div>
              <div className="space-y-4">
                {IS_FOR.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 transition-all duration-500"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(20px)',
                      transitionDelay: `${500 + i * 100}ms`,
                    }}
                  >
                    <Check size={16} className="shrink-0 mt-1" style={{ color: '#10b981' }} />
                    <span className="text-sm text-[var(--color-muted)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hard close CTA */}
          <div
            className="text-center transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '900ms',
            }}
          >
            <div
              className="card-glass p-10 max-w-2xl mx-auto"
              style={{
                borderColor: 'rgba(37, 99, 235, 0.2)',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(37, 99, 235, 0.02) 100%)',
              }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)] font-display mb-4">
                Still Here?
              </h3>
              <p className="text-[var(--color-muted)] mb-8 max-w-lg mx-auto">
                The free ACRA takes 48 hours and tells you exactly what AI agents see when they look at your business. No commitment. No sales call. Just data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/acra/run" className="btn-primary text-lg px-8 py-3">
                  Get Your Free ACRA
                  <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Talk to Adam Instead
                </Link>
              </div>
              <p className="text-xs text-[var(--color-muted-2)] mt-4">
                Over 60% of our Gold and Enterprise clients started with a free ACRA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
