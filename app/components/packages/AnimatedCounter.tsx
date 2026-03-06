'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  label: string
  sublabel?: string
}

export function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 2000,
  label,
  sublabel,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const animate = useCallback(() => {
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration])

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, animate])

  return (
    <div ref={ref} className="text-center">
      <p className="stat-number text-4xl lg:text-5xl mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="font-display font-semibold text-[var(--color-text)] text-sm lg:text-base">
        {label}
      </p>
      {sublabel && (
        <p className="text-xs text-[var(--color-muted-2)] mt-1">{sublabel}</p>
      )}
    </div>
  )
}

export function PainStatsStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
      <AnimatedCounter
        end={83}
        suffix="%"
        label="Searches Show AI Overviews"
        sublabel="Google AI Mode, 2026"
      />
      <AnimatedCounter
        end={14}
        suffix="M+"
        label="AI Commerce Queries Daily"
        sublabel="ChatGPT + Perplexity + Gemini"
      />
      <AnimatedCounter
        end={40}
        suffix="%"
        label="Crawl Traffic Lost to Hydration Tax"
        sublabel="SPA vs SSR architecture gap"
      />
      <AnimatedCounter
        end={73}
        suffix="%"
        label="Token Cost Reduction with SSR"
        sublabel="React SPA vs Next.js SSR"
      />
    </div>
  )
}
