'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'

interface Props {
  text: string
  author: string
  role: string
  accentColor: string
}

export function ProofQuote({ text, author, role, accentColor }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

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
    <section className="section-sm" aria-label="Social proof">
      <div className="container max-w-3xl">
        <div
          ref={ref}
          className="relative rounded-2xl p-8 lg:p-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            background: `color-mix(in srgb, ${accentColor} 4%, var(--color-surface))`,
            border: `1px solid color-mix(in srgb, ${accentColor} 15%, transparent)`,
          }}
        >
          {/* Quote mark */}
          <div
            className="absolute -top-4 left-8 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: accentColor,
              boxShadow: `0 4px 12px color-mix(in srgb, ${accentColor} 30%, transparent)`,
            }}
          >
            <Quote size={14} fill="#fff" stroke="#fff" />
          </div>

          <blockquote className="text-base lg:text-lg text-[var(--color-text)] leading-relaxed italic mb-6 mt-2">
            &ldquo;{text}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: accentColor }}
            >
              {author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--color-text)]">{author}</div>
              <div className="text-xs text-[var(--color-muted-2)]">{role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
