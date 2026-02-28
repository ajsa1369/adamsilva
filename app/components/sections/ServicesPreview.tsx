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
            <span className="badge mb-3">Services</span>
            <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
              Agentic Commerce Services
            </h2>
            <p className="text-[var(--color-muted)] mt-2 max-w-lg">
              From $100 AI readiness checks to full protocol stack implementation — every service is designed to make your business AI-agent-ready.
            </p>
          </div>
          <Link href="/services" className="btn-secondary text-sm shrink-0">
            All 10 Services
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
                className="card p-6 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="text-sm font-bold text-[var(--color-accent)]">
                    {service.priceDisplay === 'Custom' ? 'Custom' : service.priceDisplay}
                  </span>
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1 mb-4">
                  {service.tagline}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)]">
                  View details
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/services" className="btn-primary">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
