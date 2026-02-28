import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, Clock, Users } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildPageSchema, SITE_URL } from '@/lib/schemas/organization'
import { buildServiceSchema, buildHowToSchema } from '@/lib/schemas/service'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { SERVICES, getServiceById } from '@/lib/data/services'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return SERVICES.map((service) => ({ slug: service.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceById(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.name} — ${service.tagline} | Adam Silva Consulting`,
    description: service.description,
    alternates: {
      canonical: `${SITE_URL}/services/${service.id}`,
    },
    openGraph: {
      title: `${service.name} | Adam Silva Consulting`,
      description: service.description,
      url: `${SITE_URL}/services/${service.id}`,
      type: 'website',
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  audit: '#3b82f6',
  optimization: '#8b5cf6',
  automation: '#10b981',
  protocol: '#f59e0b',
  content: '#ef4444',
}

const CATEGORY_LABELS: Record<string, string> = {
  audit: 'Audit',
  optimization: 'Optimization',
  automation: 'Automation',
  protocol: 'Protocol',
  content: 'Content',
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceById(slug)

  if (!service) {
    notFound()
  }

  const accentColor = CATEGORY_COLORS[service.category] ?? 'var(--color-accent)'

  // Build service-specific FAQs
  const serviceFAQs = [
    {
      question: `What does ${service.name} include?`,
      answer: `${service.name} includes: ${service.deliverables.join('; ')}. ${service.description}`,
    },
    {
      question: `How long does ${service.name} take?`,
      answer: `${service.name} takes ${service.timeline}. ${
        service.price === 'Custom'
          ? 'Timeline may vary based on your existing infrastructure and scope. Contact Adam for a precise project timeline.'
          : `The ${service.timeline} timeline begins once the engagement is confirmed and kickoff is complete.`
      }`,
    },
    {
      question: `Who is ${service.name} for?`,
      answer: `${service.name} is designed for ${service.audience}. ${
        service.featured
          ? 'This is one of our most popular services — contact Adam to get started or learn more about whether it fits your current stage.'
          : 'If you are unsure whether this service fits your needs, start with the AI Readiness Check ($100) for a prioritized action plan.'
      }`,
    },
  ]

  // Build HowTo from deliverables
  const deliverableHowTo = buildHowToSchema(
    `How ${service.name} Works`,
    `Step-by-step breakdown of what is delivered during the ${service.name} engagement.`,
    service.deliverables.map((deliverable, i) => ({
      name: `Step ${i + 1}: ${deliverable}`,
      text: deliverable,
    })),
    service.timeline ? `P${service.timeline.replace(/\s/g, '')}` : undefined
  )

  const serviceSchemaData = buildServiceSchema({
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price === 'Custom' ? undefined : service.price,
    deliverables: service.deliverables,
    timeline: service.timeline,
    audience: service.audience,
  })

  const pageJsonLd = buildPageSchema(`/services/${service.id}`, [
    serviceSchemaData,
    deliverableHowTo,
    buildFAQSchema(serviceFAQs),
  ])

  return (
    <>
      <JsonLd data={pageJsonLd} />

      {/* Breadcrumb */}
      <nav
        className="section-sm border-b border-[var(--color-border)]"
        aria-label="Breadcrumb"
      >
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted-2)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/services"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-text)] font-medium" aria-current="page">
              {service.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="section gradient-hero"
        aria-labelledby="service-name-heading"
      >
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="badge"
                style={{
                  background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                  color: accentColor,
                }}
              >
                {CATEGORY_LABELS[service.category]}
              </span>
              {service.featured && <span className="badge">Featured</span>}
            </div>

            <h1
              id="service-name-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight"
            >
              {service.name}
            </h1>

            <p className="text-xl text-[var(--color-muted)] mb-8 leading-relaxed">
              {service.tagline}
            </p>

            {/* Price + timeline display */}
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div>
                <div
                  className="text-4xl font-bold"
                  style={{ color: accentColor }}
                  aria-label={`Price: ${service.priceDisplay}`}
                >
                  {service.priceDisplay}
                </div>
                {service.price !== 'Custom' && (
                  <div className="text-xs text-[var(--color-muted-2)] mt-0.5">
                    One-time flat fee
                  </div>
                )}
                {service.price === 'Custom' && (
                  <div className="text-xs text-[var(--color-muted-2)] mt-0.5">
                    Contact for quote
                  </div>
                )}
              </div>

              <div className="h-10 w-px bg-[var(--color-border)]" aria-hidden="true" />

              <div className="flex items-center gap-2 text-[var(--color-muted)]">
                <Clock size={18} aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text)]">
                    {service.timeline}
                  </div>
                  <div className="text-xs text-[var(--color-muted-2)]">Delivery timeline</div>
                </div>
              </div>

              <div className="h-10 w-px bg-[var(--color-border)]" aria-hidden="true" />

              <div className="flex items-center gap-2 text-[var(--color-muted)]">
                <Users size={18} aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text)]">
                    {service.audience}
                  </div>
                  <div className="text-xs text-[var(--color-muted-2)]">Best for</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?service=${encodeURIComponent(service.id)}`}
                className="btn-primary"
              >
                Get {service.name}
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section" aria-labelledby="service-description-heading">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2
                id="service-description-heading"
                className="text-2xl font-bold text-[var(--color-text)] mb-4"
              >
                About {service.name}
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed text-base">
                {service.description}
              </p>

              {/* Audience callout */}
              <div
                className="mt-8 p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
                }}
                aria-label="Who this service is for"
              >
                <Users
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: accentColor }}
                  aria-hidden="true"
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                    Who This Is For
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-text)]">
                    {service.audience}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline badge sidebar */}
            <div>
              <div className="card p-6 sticky top-24">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-4">
                  At a Glance
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-[var(--color-muted-2)] mb-1">Price</div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: accentColor }}
                    >
                      {service.priceDisplay}
                    </div>
                  </div>

                  <div className="h-px bg-[var(--color-border)]" />

                  <div>
                    <div className="text-xs text-[var(--color-muted-2)] mb-1">Timeline</div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} style={{ color: accentColor }} aria-hidden="true" />
                      <span className="font-semibold text-[var(--color-text)] text-sm">
                        {service.timeline}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-[var(--color-border)]" />

                  <div>
                    <div className="text-xs text-[var(--color-muted-2)] mb-2">Category</div>
                    <span
                      className="badge text-xs"
                      style={{
                        background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                        color: accentColor,
                      }}
                    >
                      {CATEGORY_LABELS[service.category]}
                    </span>
                  </div>

                  <div className="h-px bg-[var(--color-border)]" />

                  <Link
                    href={`/contact?service=${encodeURIComponent(service.id)}`}
                    className="btn-primary w-full justify-center"
                    style={{ background: accentColor }}
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included — Deliverables */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="deliverables-heading"
      >
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <span
              className="badge mb-4"
              style={{
                background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                color: accentColor,
              }}
            >
              Deliverables
            </span>
            <h2
              id="deliverables-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              What&apos;s Included
            </h2>
            <p className="text-[var(--color-muted)] mt-3">
              Every deliverable is concrete, measurable, and yours to keep.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-4" aria-label={`${service.name} deliverables`}>
            {service.deliverables.map((deliverable, i) => (
              <li key={i} className="card p-5 flex items-start gap-4">
                <CheckCircle
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: accentColor }}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-[var(--color-text)] leading-relaxed">
                  {deliverable}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="section" aria-labelledby="features-heading">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">Capabilities</span>
            <h2
              id="features-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              How We Do It
            </h2>
            <p className="text-[var(--color-muted)] mt-3">
              The specific techniques and tools used to deliver results.
            </p>
          </div>

          <ul
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            aria-label={`${service.name} features`}
          >
            {service.features.map((feature, i) => (
              <li
                key={i}
                className="card p-4 flex items-start gap-3"
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 shrink-0"
                  style={{ background: accentColor }}
                  aria-hidden="true"
                />
                <span className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="service-faq-heading"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="service-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Questions About {service.name}
            </h2>
          </div>

          <div className="space-y-4">
            {serviceFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform ml-4 shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="service-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span
              className="badge mb-4"
              style={{
                background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                color: accentColor,
              }}
            >
              Ready to Start?
            </span>
            <h2
              id="service-cta-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              Get {service.name}
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              {service.price === 'Custom'
                ? `${service.name} is scoped to your infrastructure. Contact Adam to get a precise proposal and timeline.`
                : `For ${service.priceDisplay}, get ${service.name} delivered in ${service.timeline}. No retainer, no lock-in.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/contact?service=${encodeURIComponent(service.id)}`}
                className="btn-primary"
                style={{ background: accentColor }}
              >
                Get {service.name}
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
