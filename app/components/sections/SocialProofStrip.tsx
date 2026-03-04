import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export function SocialProofStrip() {
  const avg = TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
  const companies = TESTIMONIALS.map((t) => t.company)

  return (
    <section
      className="py-5"
      style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
      aria-label="Client trust indicators"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Rating */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="#f59e0b"
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {avg.toFixed(1)}
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-muted-2)' }}
            >
              from {TESTIMONIALS.length} client reviews
            </span>
          </div>

          {/* Client names */}
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-muted-2)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Trusted by
            </span>
            <span style={{ fontFamily: 'var(--font-sans)' }}>
              {companies.join(' · ')}
            </span>
          </div>

          {/* Protocol count */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: '#0ea5e9' }} />
              <span className="w-2 h-2 rounded-full" style={{ background: '#a855f7' }} />
              <span className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
            </div>
            <span
              className="text-xs font-semibold"
              style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-muted)' }}
            >
              3 Protocol Implementations
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
