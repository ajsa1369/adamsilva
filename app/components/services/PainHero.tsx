'use client'

import { useEffect, useRef, useState } from 'react'
import type { SandlerPain } from '@/lib/data/services'
import { AlertTriangle } from 'lucide-react'

interface Props {
  pain: SandlerPain
  serviceName: string
  accentColor: string
}

export function PainHero({ pain, serviceName, accentColor }: Props) {
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
    <div ref={ref} className="relative">
      {/* Pain headline */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(239, 68, 68, 0.1)' }}
          >
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <span className="section-label" style={{ color: 'rgb(239, 68, 68)' }}>
            The Problem
          </span>
        </div>

        <h1
          className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-text)] mb-5 leading-[1.1] font-display tracking-tight"
        >
          {pain.headline}
        </h1>

        <p className="text-lg lg:text-xl text-[var(--color-muted)] mb-8 leading-relaxed max-w-2xl">
          {pain.subheadline}
        </p>
      </div>

      {/* Pain bullets */}
      <div className="space-y-3 mb-10">
        {pain.painPoints.map((point, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-20px)',
              transitionDelay: `${300 + i * 150}ms`,
              background: 'rgba(239, 68, 68, 0.04)',
              border: '1px solid rgba(239, 68, 68, 0.1)',
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
              style={{ background: 'rgb(239, 68, 68)' }}
            />
            <p className="text-sm text-[var(--color-text)] leading-relaxed font-medium">
              {point}
            </p>
          </div>
        ))}
      </div>

      {/* Micro-label: service name reveal */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: '800ms',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1 max-w-[40px]" style={{ background: accentColor }} />
          <span className="section-label" style={{ color: accentColor }}>
            The Solution
          </span>
        </div>
        <p className="text-base text-[var(--color-muted)]">
          <span className="font-bold text-[var(--color-text)]">{serviceName}</span> — built to solve exactly this.
        </p>
      </div>
    </div>
  )
}
