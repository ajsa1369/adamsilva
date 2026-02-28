import Link from 'next/link'
import { ArrowRight, CheckCircle, Search, Zap, Award, FileText, Network, ShoppingCart, Shield, Bot } from 'lucide-react'
import { getFeaturedServices } from '@/lib/data/services'

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle, Search, Zap, Award, FileText, Network, ShoppingCart, Shield, Bot,
  Newspaper: FileText,
}

export function ServicesPreview() {
  const featured = getFeaturedServices()

  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="badge mb-4">Services</div>
            <h2
              id="services-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
              }}
            >
              Full-Stack AI Agency Services
            </h2>
            <p className="mt-2 max-w-lg text-sm" style={{ color: 'var(--color-muted)' }}>
              From AI agents that answer every call to protocol stacks that let AI buy from you — every service compounds your revenue.
            </p>
          </div>
          <Link href="/services" className="btn-secondary text-sm shrink-0">
            All 15 Services
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((service) => {
            const Icon = ICON_MAP[service.icon] || CheckCircle
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="card group flex flex-col"
                style={{ padding: '1.5rem' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(14,165,233,0.1)',
                      border: '1px solid rgba(14,165,233,0.15)',
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span
                    className="text-sm font-bold px-2.5 py-1 rounded-lg"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(14,165,233,0.08)',
                      color: 'var(--color-accent)',
                      border: '1px solid rgba(14,165,233,0.12)',
                    }}
                  >
                    {service.priceDisplay === 'Custom' ? 'Custom' : service.priceDisplay}
                  </span>
                </div>

                <h3
                  className="font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '1rem' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {service.tagline}
                </p>
                <div
                  className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)' }}
                >
                  View details
                  <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/services" className="btn-primary">
            View All Services
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
