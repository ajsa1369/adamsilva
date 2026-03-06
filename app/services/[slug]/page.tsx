import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, Clock, Users, ArrowRight, Shield, Zap } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildPageSchema, SITE_URL } from '@/lib/schemas/organization'
import { buildServiceSchema, buildHowToSchema } from '@/lib/schemas/service'
import { buildFAQSchema, buildWebPageSchema } from '@/lib/schemas/faq'
import { SERVICES, getServiceById } from '@/lib/data/services'
import { serviceToCartItem } from '@/lib/cart/helpers'
import { RelatedContent } from '@/app/components/sections/RelatedContent'
import { ServiceCTASection } from '@/app/components/cart/ServiceCTASection'
import { ServiceHeroStats } from '@/app/components/services/ServiceHeroStats'
import { ServiceDeepDive } from '@/app/components/services/ServiceDeepDive'
import { ServiceComparisonTable } from '@/app/components/services/ServiceComparisonTable'
import { PainHero } from '@/app/components/services/PainHero'
import { CostOfInaction } from '@/app/components/services/CostOfInaction'
import { NegativeReverseCTA } from '@/app/components/services/NegativeReverseCTA'
import { VideoShowcase } from '@/app/components/services/VideoShowcase'
import { ProofQuote } from '@/app/components/services/ProofQuote'

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
  const hasSandler = !!service.sandlerPain
  const hasVisual = !!service.heroImage

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
          ? 'Timeline may vary based on your existing infrastructure and scope. Contact our team for a precise project timeline.'
          : `The ${service.timeline} timeline begins once the engagement is confirmed and kickoff is complete. ${service.price === '0' ? 'This service is completely free — no commitment required.' : ''}`
      }`,
    },
    {
      question: `Who is ${service.name} for?`,
      answer: `${service.name} is designed for ${service.audience}. ${
        service.featured
          ? 'This is one of our most popular services — contact our team to get started or learn more about whether it fits your current stage.'
          : 'If you are unsure whether this service fits your needs, start with the free Agentic Commerce Readiness Assessment (ACRA) for a prioritized strategic roadmap.'
      }`,
    },
    ...(service.customFAQs ?? []),
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

  const webPageSchema = buildWebPageSchema({
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.id}`,
  })

  const videoSchema = {
    '@type': 'VideoObject',
    name: `${service.name} — Service Overview`,
    description: service.description,
    thumbnailUrl: service.heroImage ? `${SITE_URL}${service.heroImage}` : `${SITE_URL}/images/og-default.png`,
    uploadDate: '2026-03-01',
    contentUrl: `${SITE_URL}/services/${service.id}`,
    embedUrl: `${SITE_URL}/services/${service.id}`,
    duration: `PT${Math.ceil((5 + Math.min(service.features.length, 6) * 4 + (service.uniqueInsight ? 5 : 0) + 4))}S`,
    publisher: {
      '@type': 'Organization',
      name: 'Adam Silva Consulting',
      url: SITE_URL,
    },
  }

  const pageJsonLd = buildPageSchema(`/services/${service.id}`, [
    webPageSchema,
    serviceSchemaData,
    deliverableHowTo,
    buildFAQSchema(serviceFAQs),
    videoSchema,
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

      {/* ============================================================
          SECTION 1: PAIN-FIRST HERO (Sandler) or Classic Hero
          ============================================================ */}
      <section
        className="section-lg gradient-hero relative overflow-hidden"
        aria-labelledby="service-name-heading"
      >
        {/* Background orbs */}
        <div className="glow-orb glow-orb-blue w-96 h-96 -top-48 -left-48 absolute" />
        <div className="glow-orb glow-orb-purple w-64 h-64 -bottom-32 -right-32 absolute" />

        <div className="container relative">
          {hasSandler ? (
            /* Sandler pain-first hero */
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
              <div>
                {/* Category badge */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
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

                <PainHero
                  pain={service.sandlerPain!}
                  serviceName={service.name}
                  accentColor={accentColor}
                />
              </div>

              {/* Right column: Investment card */}
              <div className="lg:sticky lg:top-24">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
                    boxShadow: `0 12px 40px color-mix(in srgb, ${accentColor} 8%, transparent)`,
                  }}
                >
                  {/* Card header */}
                  <div
                    className="p-6"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 8%, var(--color-surface)), color-mix(in srgb, ${accentColor} 3%, var(--color-surface)))`,
                    }}
                  >
                    <h2
                      id="service-name-heading"
                      className="text-xl font-bold text-[var(--color-text)] font-display mb-1"
                    >
                      {service.name}
                    </h2>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Investment details */}
                  <div className="p-6 bg-[var(--color-surface)]">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="text-4xl font-bold font-mono tracking-tight"
                        style={{ color: accentColor }}
                      >
                        {service.priceDisplay}
                      </span>
                      {service.price === '0' && (
                        <span className="text-xs text-[var(--color-muted-2)]">No cost</span>
                      )}
                    </div>
                    {service.price !== '0' && service.priceDisplay.includes('/mo') && (
                      <p className="text-xs text-[var(--color-muted-2)] mb-4">
                        Setup fee + monthly retainer
                      </p>
                    )}
                    {service.price !== '0' && service.price !== 'Custom' && !service.priceDisplay.includes('/mo') && (
                      <p className="text-xs text-[var(--color-muted-2)] mb-4">
                        One-time investment
                      </p>
                    )}
                    {service.price === 'Custom' && (
                      <p className="text-xs text-[var(--color-muted-2)] mb-4">
                        Scoped to your infrastructure
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-4">
                      <Clock size={14} style={{ color: accentColor }} />
                      <span>Delivered in {service.timeline}</span>
                    </div>

                    <div className="mb-6">
                      <ServiceCTASection service={service} accentColor={accentColor} />
                    </div>

                    {/* Trust signals */}
                    <div className="space-y-2 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-2)]">
                        <Shield size={12} style={{ color: accentColor }} />
                        <span>No retainer lock-in</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-2)]">
                        <Zap size={12} style={{ color: accentColor }} />
                        <span>Deliverables are yours to keep</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-2)]">
                        <CheckCircle size={12} style={{ color: accentColor }} />
                        <span>Adam personally reviews every engagement</span>
                      </div>
                    </div>
                  </div>

                  {/* Related links */}
                  {(service.relatedProtocol || service.relatedHubPage) && (
                    <div
                      className="px-6 py-4"
                      style={{
                        background: `color-mix(in srgb, ${accentColor} 3%, var(--color-surface))`,
                        borderTop: '1px solid var(--color-border)',
                      }}
                    >
                      {service.relatedProtocol && (
                        <Link
                          href={`/protocols/${service.relatedProtocol}`}
                          className="text-sm font-semibold hover:underline flex items-center gap-1"
                          style={{ color: accentColor }}
                        >
                          {service.relatedProtocol.toUpperCase()} Deep Dive
                          <ArrowRight size={12} />
                        </Link>
                      )}
                      {service.relatedHubPage && (
                        <Link
                          href={service.relatedHubPage}
                          className="text-sm font-semibold hover:underline flex items-center gap-1 mt-1"
                          style={{ color: accentColor }}
                        >
                          Learn More
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Classic hero for services without Sandler data */
            <div className={hasVisual ? 'grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center' : 'max-w-3xl'}>
              <div>
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
                  className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight font-display"
                >
                  {service.name}
                </h1>

                <p className="text-xl text-[var(--color-muted)] mb-8 leading-relaxed">
                  {service.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-10">
                  <div>
                    <div
                      className="text-4xl font-bold font-mono"
                      style={{ color: accentColor }}
                    >
                      {service.priceDisplay}
                    </div>
                  </div>
                  <div className="h-10 w-px bg-[var(--color-border)]" />
                  <div className="flex items-center gap-2 text-[var(--color-muted)]">
                    <Clock size={18} />
                    <span className="font-semibold text-sm">{service.timeline}</span>
                  </div>
                </div>

                <ServiceCTASection service={service} accentColor={accentColor} />
              </div>

              {hasVisual && (
                <div className="mt-12 lg:mt-0">
                  <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: '0 0 40px rgba(37,99,235,0.08)' }}>
                    <Image
                      src={service.heroImage!}
                      alt={`${service.name} — ${service.tagline}`}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 2: HERO STATS — Dramatic numbers
          ============================================================ */}
      {service.heroStats && service.heroStats.length > 0 && (
        <section className="section-sm bg-[var(--color-surface)]">
          <div className="container">
            <ServiceHeroStats stats={service.heroStats} accentColor={accentColor} />
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 3: COST OF INACTION — Sandler pain amplification
          ============================================================ */}
      {service.sandlerPain && (
        <CostOfInaction
          stat={service.sandlerPain.costOfInaction.stat}
          context={service.sandlerPain.costOfInaction.context}
          source={service.sandlerPain.costOfInaction.source}
          accentColor={accentColor}
        />
      )}

      {/* ============================================================
          SECTION 4: VIDEO SHOWCASE — Visual + audio combined
          ============================================================ */}
      <VideoShowcase
        serviceName={service.name}
        serviceSlug={service.id}
        description={service.description}
        features={service.features}
        uniqueInsight={service.uniqueInsight}
        accentColor={accentColor}
      />

      {/* ============================================================
          SECTION 5: SOCIAL PROOF
          ============================================================ */}
      {service.proofQuote && (
        <ProofQuote
          text={service.proofQuote.text}
          author={service.proofQuote.author}
          role={service.proofQuote.role}
          accentColor={accentColor}
        />
      )}

      {/* ============================================================
          SECTION 6: WHAT'S INCLUDED — Deliverables (outcome-framed)
          ============================================================ */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="deliverables-heading"
      >
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="enterprise-eyebrow justify-center mb-4">
              <span className="section-label" style={{ color: accentColor }}>
                What You Get
              </span>
            </div>
            <h2
              id="deliverables-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight"
            >
              Every Deliverable Is Yours to Keep
            </h2>
            <p className="text-[var(--color-muted)] mt-3 max-w-xl mx-auto">
              Concrete, measurable outputs — not vague &ldquo;strategy sessions&rdquo; or recurring retainers.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-4" aria-label={`${service.name} deliverables`}>
            {service.deliverables.map((deliverable, i) => (
              <li
                key={i}
                className="card p-5 flex items-start gap-4"
                style={{
                  borderLeft: `3px solid color-mix(in srgb, ${accentColor} 40%, transparent)`,
                }}
              >
                <CheckCircle
                  size={18}
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

      {/* ============================================================
          SECTION 7: ABOUT + UNIQUE INSIGHT — The full story
          ============================================================ */}
      <section className="section" aria-labelledby="service-description-heading">
        <div className="container max-w-3xl">
          <div className="enterprise-eyebrow mb-4">
            <span className="section-label" style={{ color: accentColor }}>
              Why This Exists
            </span>
          </div>

          <h2
            id="service-description-heading"
            className="text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-6 font-display tracking-tight"
          >
            About {service.name}
          </h2>

          <div className="prose-asc">
            <p className="text-base leading-relaxed speakable-answer">
              {service.description}
            </p>

            {service.longDescription && (
              <p className="text-sm leading-relaxed mt-4">
                {service.longDescription}
              </p>
            )}
          </div>

          {/* Audience callout */}
          <div
            className="mt-8 p-5 rounded-xl flex items-start gap-4"
            style={{
              background: `color-mix(in srgb, ${accentColor} 6%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accentColor} 15%, transparent)`,
            }}
          >
            <Users
              size={18}
              className="shrink-0 mt-0.5"
              style={{ color: accentColor }}
            />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                Built For
              </div>
              <div className="text-sm font-medium text-[var(--color-text)]">
                {service.audience}
              </div>
            </div>
          </div>

          {/* Unique insight */}
          {service.uniqueInsight && (
            <div
              className="mt-8 p-6 lg:p-8 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 4%, var(--color-surface)), color-mix(in srgb, ${accentColor} 2%, var(--color-surface)))`,
                border: `1px solid color-mix(in srgb, ${accentColor} 15%, transparent)`,
                borderLeft: `4px solid ${accentColor}`,
              }}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                What Makes This Different
              </div>
              <p className="text-[var(--color-text)] leading-relaxed text-sm speakable-answer">
                {service.uniqueInsight}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 8: HOW IT WORKS — Process steps
          ============================================================ */}
      {service.howItWorksSteps && (
        <section
          className="section bg-[var(--color-surface)]"
          aria-labelledby="how-it-works-heading"
        >
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <div className="enterprise-eyebrow justify-center mb-4">
                <span className="section-label" style={{ color: accentColor }}>
                  Process
                </span>
              </div>
              <h2
                id="how-it-works-heading"
                className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight"
              >
                How It Works
              </h2>
              <p className="text-[var(--color-muted)] mt-3">
                Clear steps from kickoff to delivery. No ambiguity.
              </p>
            </div>

            <ol className="space-y-4 relative" aria-label={`${service.name} process steps`}>
              {/* Vertical connector line */}
              <div
                className="absolute left-4 top-5 bottom-5 w-px hidden sm:block"
                style={{ background: `color-mix(in srgb, ${accentColor} 20%, transparent)` }}
              />

              {service.howItWorksSteps.map((step, i) => (
                <li key={i} className="card p-5 flex items-start gap-4 relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white relative z-10"
                    style={{
                      background: accentColor,
                      boxShadow: `0 2px 8px color-mix(in srgb, ${accentColor} 30%, transparent)`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm text-[var(--color-text)] leading-relaxed pt-1 font-medium">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 9: FEATURES — Capabilities grid
          ============================================================ */}
      <section className="section" aria-labelledby="features-heading">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <div className="enterprise-eyebrow justify-center mb-4">
              <span className="section-label" style={{ color: accentColor }}>
                Capabilities
              </span>
            </div>
            <h2
              id="features-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight"
            >
              How We Deliver Results
            </h2>
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
                />
                <span className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          SECTION 10: DEEP DIVE — Research-backed content
          ============================================================ */}
      {service.deepDiveSections && service.deepDiveSections.length > 0 && (
        <ServiceDeepDive sections={service.deepDiveSections} accentColor={accentColor} />
      )}

      {/* ============================================================
          SECTION 11: COMPARISON — "Why Other Approaches Fail"
          ============================================================ */}
      {service.comparisonRows && service.comparisonRows.length > 0 && (
        <ServiceComparisonTable
          title={service.comparisonTitle ?? `${service.name} vs. the Alternative`}
          rows={service.comparisonRows}
          accentColor={accentColor}
        />
      )}

      {/* ============================================================
          SECTION 12: FAQ — Objection handling
          ============================================================ */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="service-faq-heading"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="enterprise-eyebrow justify-center mb-4">
              <span className="section-label" style={{ color: accentColor }}>
                FAQ
              </span>
            </div>
            <h2
              id="service-faq-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight"
            >
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {serviceFAQs.map((faq, i) => (
              <details
                key={i}
                className="rounded-xl overflow-hidden transition-all"
                style={{
                  background: 'var(--color-base)',
                  border: '1px solid var(--color-border)',
                }}
                open={i === 0}
              >
                <summary className="p-5 font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none hover:bg-[var(--color-surface)] transition-colors">
                  <span className="pr-4">{faq.question}</span>
                  <span
                    className="text-lg shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                      color: accentColor,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed speakable-answer">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 13: NEGATIVE REVERSE CTA — Sandler close
          ============================================================ */}
      {service.negativeReverse ? (
        <NegativeReverseCTA
          data={service.negativeReverse}
          serviceId={service.id}
          priceDisplay={service.priceDisplay}
          accentColor={accentColor}
          isFree={service.price === '0'}
          cartItem={service.price !== '0' && service.price !== 'Custom' ? serviceToCartItem(service) : undefined}
        />
      ) : (
        /* Fallback CTA for services without Sandler data */
        <section className="section" aria-labelledby="service-cta-heading">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                id="service-cta-heading"
                className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4 font-display"
              >
                Get {service.name}
              </h2>
              <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
                {service.price === 'Custom'
                  ? `${service.name} is scoped to your infrastructure. Contact our team for a precise proposal and timeline.`
                  : `For ${service.priceDisplay}, get ${service.name} delivered in ${service.timeline}. No retainer, no lock-in.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ServiceCTASection service={service} accentColor={accentColor} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Content */}
      <RelatedContent currentPath={`/services/${service.id}`} />
    </>
  )
}
