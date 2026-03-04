import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildPageSchema, SITE_URL } from '@/lib/schemas/organization'
import { buildServiceSchema, buildHowToSchema } from '@/lib/schemas/service'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { SERVICES } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'Agentic Commerce Services — UCP, ACP, AP2 Implementation | Adam Silva Consulting',
  description:
    'From a free Agentic Commerce Readiness Assessment to full protocol stack implementation, every Adam Silva Consulting service delivers measurable progress toward agentic commerce readiness.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
}

const servicesFAQs = [
  {
    question: 'Where should I start with agentic commerce services?',
    answer:
      'Start with the free Agentic Commerce Readiness Assessment (ACRA). It gives you a complete audit of your current agentic commerce posture — structured data coverage, protocol compliance, token efficiency, and authority signals — along with a prioritized strategic roadmap. This eliminates guesswork and ensures every dollar spent on subsequent services is targeted correctly.',
  },
  {
    question: 'How do the UCP, ACP, and AP2 implementation services differ?',
    answer:
      'UCP (Universal Commerce Protocol) Implementation makes your business discoverable by AI shopping agents via a .well-known/ucp/manifest.json manifest. ACP (Agentic Commerce Protocol) Integration enables AI agents to execute checkout directly in your store using Stripe Payment Tokens and the ChatGPT Instant Checkout standard. AP2 (Agent Payments Protocol) adds the cryptographic trust layer — mandate signing, Verifiable Credentials, and audit trails — that makes agentic transactions legally defensible for enterprise procurement.',
  },
  {
    question: 'What is the difference between AEO and GEO services?',
    answer:
      'AEO (Answer Engine Optimization) Audit identifies every gap in how AI models like ChatGPT, Perplexity, Claude, Gemini, and Bing Copilot find and cite your content. GEO (Generative Engine Optimization) Implementation is the execution layer — restructuring pages, adding schema, improving E-E-A-T signals, and ensuring AI models cite your brand as the authoritative source.',
  },
  {
    question: 'Can I combine multiple services?',
    answer:
      'Yes — and combining services compounds results. The most effective approach is the full 16-week protocol stack: start with the Agentic Commerce Readiness Assessment (ACRA), add GEO Implementation and UCP Protocol Implementation in weeks 3-6, integrate ACP and AP2 in weeks 7-10, and activate the Authority Building Program in weeks 11-14. Custom enterprise bundles are available — contact our team for a tailored roadmap.',
  },
]

const roadmapHowTo = buildHowToSchema(
  '16-Week Agentic Commerce Implementation Roadmap',
  'The complete 16-week implementation roadmap for UCP, ACP, and AP2 agentic commerce protocol stack deployment used by Adam Silva Consulting with enterprise clients.',
  [
    {
      name: 'Week 1-2: ACRA',
      text: 'Complete audit of current agentic commerce posture — structured data coverage, protocol compliance, token efficiency, and authority signals. Deliverable: prioritized action plan.',
    },
    {
      name: 'Week 3-6: Foundation Layer',
      text: 'Deploy JSON-LD schema across all pages, implement UCP manifest at .well-known/ucp/manifest.json, configure AP2 mandate infrastructure, and optimize content for token efficiency.',
    },
    {
      name: 'Week 7-10: Execution Layer',
      text: 'Implement ACP checkout integration with Stripe Payment Tokens, configure product feeds, test agent checkout flows end-to-end, and deploy Verifiable Credentials.',
    },
    {
      name: 'Week 11-14: Authority Layer',
      text: 'Launch authority flywheel — 10 AEO/GEO-optimized authority articles, topical hub pages, DefinedTermSet glossary, and AI citation tracking setup.',
    },
    {
      name: 'Week 15-16: Verification and Launch',
      text: 'Complete QA across all protocols and schema types, verify AI agent discovery via UCP, confirm ACP checkout flows, and launch the fully agentic-ready digital presence.',
    },
  ],
  'P112D'
)

const itemListSchema = {
  '@type': 'ItemList',
  name: 'Adam Silva Consulting Agentic Commerce Services',
  description:
    'Complete suite of 10 services for building agentic commerce infrastructure — from AI readiness audits to full UCP, ACP, and AP2 protocol stack implementation.',
  numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: service.name,
    url: `${SITE_URL}/services/${service.id}`,
    description: service.tagline,
  })),
}

const serviceSchemas = SERVICES.map((s) =>
  buildServiceSchema({
    id: s.id,
    name: s.name,
    description: s.description,
    price: s.price === 'Custom' ? undefined : s.price,
    deliverables: s.deliverables,
    timeline: s.timeline,
    audience: s.audience,
  })
)

const pageJsonLd = buildPageSchema('/services', [
  itemListSchema,
  roadmapHowTo,
  buildFAQSchema(servicesFAQs),
  ...serviceSchemas,
])

const CATEGORY_LABELS: Record<string, string> = {
  audit: 'Audit',
  optimization: 'Optimization',
  automation: 'Automation',
  protocol: 'Protocol',
  content: 'Content',
}

const CATEGORY_COLORS: Record<string, string> = {
  audit: '#3b82f6',
  optimization: '#8b5cf6',
  automation: '#10b981',
  protocol: '#f59e0b',
  content: '#ef4444',
}

export default function ServicesPage() {
  const categories = ['audit', 'optimization', 'automation', 'protocol', 'content'] as const

  return (
    <>
      <JsonLd data={pageJsonLd} />

      {/* Hero */}
      <section
        className="section gradient-hero"
        aria-labelledby="services-hero-heading"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge mb-4">18 Services</span>
            <h1
              id="services-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              18 Services to Build Your Agentic Commerce Infrastructure
            </h1>
            <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
              From a free Agentic Commerce Readiness Assessment to full protocol stack implementation,
              every Adam Silva Consulting service delivers measurable progress toward agentic commerce
              readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Adam
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters (static visual — no JS required) */}
      <section className="section-sm bg-[var(--color-surface)]" aria-label="Service categories">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#category-${cat}`}
                className="badge"
                style={{
                  background: `color-mix(in srgb, ${CATEGORY_COLORS[cat]} 15%, transparent)`,
                  color: CATEGORY_COLORS[cat],
                }}
              >
                {CATEGORY_LABELS[cat]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Grid — grouped by category */}
      <section className="section" aria-labelledby="services-grid-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">All Services</span>
            <h2
              id="services-grid-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              Every Service, Every Stage
            </h2>
            <p className="text-[var(--color-muted)]">
              Whether you need a quick diagnostic or a complete protocol stack — there&apos;s a
              service for your current stage.
            </p>
          </div>

          {categories.map((cat) => {
            const categoryServices = SERVICES.filter((s) => s.category === cat)
            return (
              <div key={cat} id={`category-${cat}`} className="mb-14 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="badge"
                    style={{
                      background: `color-mix(in srgb, ${CATEGORY_COLORS[cat]} 15%, transparent)`,
                      color: CATEGORY_COLORS[cat],
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: `color-mix(in srgb, ${CATEGORY_COLORS[cat]} 20%, transparent)` }}
                  />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="card p-6 flex flex-col group"
                      aria-label={`${service.name} — ${service.priceDisplay}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                          {service.name}
                        </h3>
                        {service.featured && (
                          <span className="badge shrink-0 text-xs">Featured</span>
                        )}
                      </div>

                      <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed flex-1">
                        {service.tagline}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
                        <div>
                          <div
                            className="text-xl font-bold"
                            style={{ color: CATEGORY_COLORS[cat] }}
                          >
                            {service.priceDisplay}
                          </div>
                          <div className="text-xs text-[var(--color-muted-2)]">
                            {service.timeline}
                          </div>
                        </div>
                        <span className="text-[var(--color-accent)] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Learn more <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="comparison-heading"
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Compare</span>
            <h2
              id="comparison-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              Which Service Is Right for You?
            </h2>
            <p className="text-[var(--color-muted)]">
              Three entry points depending on your current stage and goals.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Service comparison table"
            >
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-4 pr-6 font-semibold text-[var(--color-text)] w-48">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text)]">
                    <div className="text-[#3b82f6] text-xs uppercase tracking-wider mb-1">
                      Starter
                    </div>
                    <div>ACRA Assessment</div>
                    <div className="text-[#3b82f6] font-bold text-lg mt-1">Free</div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text)] bg-[var(--color-surface-2)] rounded-t-lg">
                    <div className="text-[#8b5cf6] text-xs uppercase tracking-wider mb-1">
                      Authority
                    </div>
                    <div>Authority Building</div>
                    <div className="text-[#8b5cf6] font-bold text-lg mt-1">$15,000</div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text)]">
                    <div className="text-[#10b981] text-xs uppercase tracking-wider mb-1">
                      Enterprise
                    </div>
                    <div>UCP / ACP / AP2</div>
                    <div className="text-[#10b981] font-bold text-lg mt-1">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Timeline',
                    starter: '48 hours',
                    authority: '90 days',
                    enterprise: '2–6 weeks',
                  },
                  {
                    feature: 'Protocol audit',
                    starter: true,
                    authority: false,
                    enterprise: true,
                  },
                  {
                    feature: 'Structured data',
                    starter: 'Audit only',
                    authority: 'Full implementation',
                    enterprise: 'Full implementation',
                  },
                  {
                    feature: 'UCP manifest',
                    starter: false,
                    authority: false,
                    enterprise: true,
                  },
                  {
                    feature: 'ACP checkout',
                    starter: false,
                    authority: false,
                    enterprise: true,
                  },
                  {
                    feature: 'AP2 trust layer',
                    starter: false,
                    authority: false,
                    enterprise: true,
                  },
                  {
                    feature: 'Authority content',
                    starter: false,
                    authority: '10 articles',
                    enterprise: false,
                  },
                  {
                    feature: 'Citation tracking',
                    starter: false,
                    authority: 'Monthly',
                    enterprise: false,
                  },
                  {
                    feature: 'Action plan',
                    starter: true,
                    authority: false,
                    enterprise: true,
                  },
                ].map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-[var(--color-surface)]'}`}
                  >
                    <td className="py-3 pr-6 font-medium text-[var(--color-text)]">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center text-[var(--color-muted)]">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <CheckCircle size={16} className="mx-auto text-[#3b82f6]" />
                        ) : (
                          <span className="text-[var(--color-border)] text-lg leading-none">—</span>
                        )
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-[var(--color-muted)] bg-[var(--color-surface-2)]">
                      {typeof row.authority === 'boolean' ? (
                        row.authority ? (
                          <CheckCircle size={16} className="mx-auto text-[#8b5cf6]" />
                        ) : (
                          <span className="text-[var(--color-border)] text-lg leading-none">—</span>
                        )
                      ) : (
                        row.authority
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-[var(--color-muted)]">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <CheckCircle size={16} className="mx-auto text-[#10b981]" />
                        ) : (
                          <span className="text-[var(--color-border)] text-lg leading-none">—</span>
                        )
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/services/acra" className="btn-primary">
              Free ACRA
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Discuss Enterprise Options
            </Link>
          </div>
        </div>
      </section>

      {/* 16-Week Roadmap */}
      <section className="section" aria-labelledby="roadmap-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Implementation</span>
            <h2
              id="roadmap-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              The 16-Week Protocol Roadmap
            </h2>
            <p className="text-[var(--color-muted)]">
              Our proven methodology from first audit to full agentic commerce deployment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              {
                phase: 'Phase 1',
                weeks: 'Wk 1–2',
                title: 'ACRA',
                description: 'Full audit of current posture — protocol compliance, structured data, token efficiency',
                color: '#3b82f6',
                service: 'acra',
              },
              {
                phase: 'Phase 2',
                weeks: 'Wk 3–6',
                title: 'Foundation Layer',
                description: 'JSON-LD schema, UCP manifest, AP2 mandate infrastructure, GEO implementation',
                color: '#8b5cf6',
                service: 'ucp-implementation',
              },
              {
                phase: 'Phase 3',
                weeks: 'Wk 7–10',
                title: 'Execution Layer',
                description: 'ACP checkout, Stripe SPT, agent checkout flows, Verifiable Credentials',
                color: '#10b981',
                service: 'acp-integration',
              },
              {
                phase: 'Phase 4',
                weeks: 'Wk 11–14',
                title: 'Authority Layer',
                description: 'Authority flywheel, 10 AEO articles, hub pages, topical authority structure',
                color: '#f59e0b',
                service: 'authority-building',
              },
              {
                phase: 'Phase 5',
                weeks: 'Wk 15–16',
                title: 'Launch',
                description: 'QA across all protocols and schema types, verify agent discovery, go live',
                color: '#ef4444',
                service: null,
              },
            ].map((item) => (
              <div key={item.phase} className="card p-5 flex flex-col">
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: item.color }}
                >
                  {item.weeks}
                </div>
                <div className="text-sm font-bold text-[var(--color-text)] mb-2">{item.title}</div>
                <div className="text-xs text-[var(--color-muted-2)] flex-1 leading-relaxed">
                  {item.description}
                </div>
                {item.service && (
                  <Link
                    href={`/services/${item.service}`}
                    className="text-xs font-semibold mt-3 flex items-center gap-1"
                    style={{ color: item.color }}
                  >
                    View service <ArrowRight size={11} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="services-faq-heading"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="services-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Common Questions About Our Services
            </h2>
          </div>
          <div className="space-y-4">
            {servicesFAQs.map((faq, i) => (
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
      <section className="section" aria-labelledby="services-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-4">Get Started</span>
            <h2
              id="services-cta-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              Start with a Free ACRA Assessment
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              Get a complete 48-hour audit of your agentic commerce posture — structured
              data, protocol compliance, token efficiency, and authority signals — plus a
              prioritized strategic roadmap. Completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Get Your Free ACRA
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Adam First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
