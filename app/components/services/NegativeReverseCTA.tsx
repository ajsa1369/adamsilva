'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { NegativeReverse } from '@/lib/data/services'
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react'

interface Props {
  data: NegativeReverse
  serviceId: string
  priceDisplay: string
  accentColor: string
  isFree?: boolean
}

export function NegativeReverseCTA({ data, serviceId, priceDisplay, accentColor, isFree }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section relative overflow-hidden" aria-labelledby="negative-reverse-heading">
      {/* Dark premium background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)`,
        }}
      />

      <div className="container relative" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: accentColor }} />
              <span className="section-label" style={{ color: accentColor }}>
                Honest Talk
              </span>
              <div className="h-px w-8" style={{ background: accentColor }} />
            </div>
            <h2
              id="negative-reverse-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight"
            >
              {data.headline}
            </h2>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* NOT for */}
            <div
              className="rounded-2xl p-6 lg:p-8 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '200ms',
                background: 'rgba(239, 68, 68, 0.03)',
                border: '1px solid rgba(239, 68, 68, 0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <XCircle size={18} className="text-red-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-red-500">
                  Skip This If...
                </span>
              </div>
              <ul className="space-y-3">
                {data.notForList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-red-300" />
                    <span className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* IS for */}
            <div
              className="rounded-2xl p-6 lg:p-8 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(20px)',
                transitionDelay: '400ms',
                background: `color-mix(in srgb, ${accentColor} 4%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accentColor} 15%, transparent)`,
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle size={18} style={{ color: accentColor }} />
                <span
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  This Is For You If...
                </span>
              </div>
              <ul className="space-y-3">
                {data.isForList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: accentColor }}
                    />
                    <span className="text-sm text-[var(--color-text)] leading-relaxed font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div
            className="text-center transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '600ms',
            }}
          >
            <Link
              href={isFree ? `/contact?service=${serviceId}` : `/checkout?service=${serviceId}`}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3"
              style={{
                background: accentColor,
                boxShadow: `0 4px 24px color-mix(in srgb, ${accentColor} 35%, transparent)`,
              }}
            >
              {data.ctaText}
              <ArrowRight size={18} />
            </Link>
            <p className="text-xs text-[var(--color-muted-2)] mt-4">
              {isFree
                ? 'No credit card. No commitment. Just clarity.'
                : `${priceDisplay} — no retainer lock-in, no recurring surprises.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
