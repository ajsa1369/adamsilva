'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingDown } from 'lucide-react'

interface Props {
  stat: string
  context: string
  source: string
  accentColor: string
}

export function CostOfInaction({ stat, context, source, accentColor }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-sm relative overflow-hidden" aria-labelledby="cost-inaction-heading">
      <div className="container">
        <div
          ref={ref}
          className="relative rounded-2xl overflow-hidden p-8 lg:p-12"
          style={{
            background: `linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(239, 68, 68, 0.02) 50%, rgba(37, 99, 235, 0.04) 100%)`,
            border: '1px solid rgba(239, 68, 68, 0.12)',
          }}
        >
          {/* Background glow */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
            style={{
              background: 'rgba(239, 68, 68, 0.06)',
              filter: 'blur(80px)',
            }}
          />

          <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            {/* Stat */}
            <div
              className="text-center lg:text-left transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.8)',
              }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <TrendingDown size={20} className="text-red-500" />
                <span
                  className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono"
                >
                  Cost of Inaction
                </span>
              </div>
              <div
                id="cost-inaction-heading"
                className="text-5xl lg:text-6xl xl:text-7xl font-bold font-mono tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat}
              </div>
            </div>

            {/* Context */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(20px)',
                transitionDelay: '200ms',
              }}
            >
              <p className="text-base lg:text-lg text-[var(--color-text)] leading-relaxed mb-3">
                {context}
              </p>
              <p className="text-xs text-[var(--color-muted-2)] font-mono">
                Source: {source}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
