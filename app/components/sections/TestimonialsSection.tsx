'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data/testimonials'

const SERVICE_COLORS: Record<string, string> = {
  'ucp-implementation': '#0ea5e9',
  'acp-integration': '#a855f7',
  'ap2-trust-layer': '#10b981',
  'authority-building': '#8b5cf6',
  acra: '#3b82f6',
  'geo-implementation': '#10b981',
  'off-hours-voice-agent': '#0ea5e9',
  'aeo-audit': '#f59e0b',
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const visibleCount = 3
  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount)

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <section className="section" aria-labelledby="testimonials-heading" id="testimonials">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="enterprise-eyebrow">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                Client Results
              </span>
            </div>
            <h2
              id="testimonials-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.625rem, 3vw, 2.25rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              What Our Clients Say
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="p-2 rounded-lg transition-all"
              style={{
                background: activeIndex === 0 ? 'transparent' : 'var(--color-surface)',
                color: activeIndex === 0 ? 'var(--color-muted-2)' : 'var(--color-text)',
                border: '1px solid var(--color-border)',
                opacity: activeIndex === 0 ? 0.4 : 1,
                cursor: activeIndex === 0 ? 'default' : 'pointer',
              }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex === maxIndex}
              className="p-2 rounded-lg transition-all"
              style={{
                background: activeIndex === maxIndex ? 'transparent' : 'var(--color-surface)',
                color: activeIndex === maxIndex ? 'var(--color-muted-2)' : 'var(--color-text)',
                border: '1px solid var(--color-border)',
                opacity: activeIndex === maxIndex ? 0.4 : 1,
                cursor: activeIndex === maxIndex ? 'default' : 'pointer',
              }}
              aria-label="Next testimonials"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-3 gap-5">
          {TESTIMONIALS.slice(activeIndex, activeIndex + visibleCount).map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div
          className="sm:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="min-w-[85vw] snap-center">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  const borderColor = SERVICE_COLORS[testimonial.service] || 'var(--color-accent)'

  return (
    <div
      className="card p-6 h-full flex flex-col"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" />
        ))}
      </div>

      {/* Quote */}
      <div className="flex-1 mb-5">
        <Quote size={16} className="mb-2" style={{ color: 'var(--color-muted-2)', opacity: 0.4 }} />
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
        >
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div>
        <div
          className="text-sm font-bold"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
        >
          {testimonial.name}
        </div>
        <div
          className="text-xs"
          style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
        >
          {testimonial.role}, {testimonial.company}
        </div>
      </div>
    </div>
  )
}
