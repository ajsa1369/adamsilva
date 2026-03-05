'use client'

import { useEffect, useRef, useState } from 'react'
import type { ServiceStat } from '@/lib/data/services'

interface Props {
  stats: ServiceStat[]
  accentColor: string
}

export function ServiceHeroStats({ stats, accentColor }: Props) {
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
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
      role="list"
      aria-label="Key metrics"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          role="listitem"
          className="card p-5 text-center transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: `${i * 100}ms`,
            borderTop: `3px solid ${accentColor}`,
          }}
        >
          <div
            className="text-2xl lg:text-3xl font-bold mb-1"
            style={{ color: accentColor }}
          >
            {stat.value}
          </div>
          <div className="text-xs text-[var(--color-muted)] leading-snug">
            {stat.label}
          </div>
          {stat.source && (
            <div className="text-[10px] text-[var(--color-muted-2)] mt-1">
              {stat.source}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
