import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildPageSchema, SITE_URL } from '@/lib/schemas/organization'
import { buildServiceSchema, buildHowToSchema } from '@/lib/schemas/service'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { SERVICES } from '@/lib/data/services'
import { SandlerPainHero } from '@/app/components/services/SandlerPainHero'
import { MarketShiftInfographic } from '@/app/components/services/MarketShiftInfographic'
import { ProtocolStackInfographic } from '@/app/components/services/ProtocolStackInfographic'
import { RoadmapInfographic } from '@/app/components/services/RoadmapInfographic'
import { SandlerNegativeReverse } from '@/app/components/services/SandlerNegativeReverse'
import { ServicesVideoShowcase } from '@/app/components/services/ServicesVideoShowcase'

export const metadata: Metadata = {
  title: 'Agentic Commerce Services — UCP, ACP, AP2 Implementation | Adam Silva Consulting',
  description:
    '69% of searches end without a click. AI agents influenced $67B in sales. 18 services to make your business visible to AI agents — from free ACRA assessment to full protocol stack implementation.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
}

const servicesFAQs = [
  {
    question: 'Why can\'t I just keep doing SEO?',
    answer:
      'You can — but SEO alone is no longer enough. Similarweb reports 69% of searches now end without a click. AI Overviews trigger 83% zero-click rates. Seer Interactive found organic CTR plummets 61% when AI Overviews appear. Traditional SEO optimizes for 10 blue links that are being replaced by AI-synthesized answers. AEO/GEO optimize for the new channel — being cited as THE authoritative source in ChatGPT, Perplexity, Claude, and Gemini responses. The brands cited in AI Overviews actually earn 35% MORE organic clicks. It\'s not either/or — it\'s both, and AEO/GEO is the one growing.',
  },
  {
    question: 'How much does the full protocol stack cost?',
    answer:
      'Individual services range from free (ACRA) to $25,000 (Authority Building). The full 16-week protocol stack — ACRA through launch — is custom-priced based on your catalog size, complexity, and existing infrastructure. Most enterprise engagements fall between $40,000-$80,000 total. Compare that to the $15 trillion in B2B purchases flowing through AI agents by 2028 — the ROI calculus is clear. Start with the free ACRA and we\'ll show you exactly what you need and what you don\'t.',
  },
  {
    question: 'What if I only need one service, not the full stack?',
    answer:
      'Every service is available standalone. The AEO Audit ($5,000) and GEO Implementation ($7,500) are our most popular individual services — they deliver measurable citation improvements within 60 days. That said, combining services compounds results. A GEO implementation without UCP means AI agents can find your content but can\'t transact. An ACP integration without Schema.org means agents can checkout but can\'t discover your products. Start where the ACRA tells you to — not where you think you should.',
  },
  {
    question: 'How fast will I see results?',
    answer:
      'Schema.org implementation and AEO quick wins typically show citation improvements within 2-4 weeks. Full GEO implementation drives measurable changes within 60 days. Protocol implementations (UCP, ACP, AP2) are immediately functional once deployed. The Authority Building Program is a 90-day compound — results accelerate over time as the content flywheel builds momentum. We don\'t promise overnight results because that\'s not how infrastructure works. We promise measurable progress on a defined timeline.',
  },
  {
    question: 'Do you offer ongoing retainers or is it project-based?',
    answer:
      'Project-based. We build infrastructure, not dependency. Every service has a defined scope, timeline, and deliverable. The Authority Building Program ($15,000/quarter) is the only recurring engagement, and even that can be run as a one-time quarter. We don\'t do monthly retainers where you\'re paying for reports you don\'t read. You pay once, you own the result, you move on.',
  },
  {
    question: 'What happens if AI commerce doesn\'t take off as projected?',
    answer:
      'Every protocol we implement is built on open standards that improve your digital infrastructure regardless. Schema.org markup improves traditional SEO. SSR migration improves Core Web Vitals. Content restructuring improves conversion rates. UCP manifests are just well-structured product data. The worst case is you have a dramatically better website. The best case is you\'re the first in your category visible to a $15 trillion market.',
  },
]

const roadmapHowTo = buildHowToSchema(
  '16-Week Agentic Commerce Implementation Roadmap',
  'The complete 16-week implementation roadmap for UCP, ACP, and AP2 agentic commerce protocol stack deployment used by Adam Silva Consulting with enterprise clients.',
  [
    { name: 'Week 1-2: ACRA', text: 'Complete audit of current agentic commerce posture — structured data coverage, protocol compliance, token efficiency, and authority signals. Deliverable: prioritized action plan.' },
    { name: 'Week 3-6: Foundation Layer', text: 'Deploy JSON-LD schema across all pages, implement UCP manifest at .well-known/ucp/manifest.json, configure AP2 mandate infrastructure, and optimize content for token efficiency.' },
    { name: 'Week 7-10: Execution Layer', text: 'Implement ACP checkout integration with Stripe Payment Tokens, configure product feeds, test agent checkout flows end-to-end, and deploy Verifiable Credentials.' },
    { name: 'Week 11-14: Authority Layer', text: 'Launch authority flywheel — 10 AEO/GEO-optimized authority articles, topical hub pages, DefinedTermSet glossary, and AI citation tracking setup.' },
    { name: 'Week 15-16: Verification and Launch', text: 'Complete QA across all protocols and schema types, verify AI agent discovery via UCP, confirm ACP checkout flows, and launch the fully agentic-ready digital presence.' },
  ],
  'P112D'
)

const itemListSchema = {
  '@type': 'ItemList',
  name: 'Adam Silva Consulting Agentic Commerce Services',
  description: 'Complete suite of 18 services for building agentic commerce infrastructure — from AI readiness audits to full UCP, ACP, and AP2 protocol stack implementation.',
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

      {/* 1. SANDLER PAIN HERO — Lead with pain, not features */}
      <SandlerPainHero />

      {/* 2. MARKET SHIFT INFOGRAPHIC — Before/After + market growth bars */}
      <MarketShiftInfographic />

      {/* 3. VIDEO SHOWCASE — Sandler narration video */}
      <ServicesVideoShowcase />

      {/* 4. PROTOCOL STACK INFOGRAPHIC — 6-layer visual */}
      <ProtocolStackInfographic />

      {/* 5. SERVICE GRID — grouped by category with category filter anchors */}
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

      <section id="services-grid" className="section" aria-labelledby="services-grid-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">18 Services</span>
            <h2
              id="services-grid-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4 font-display tracking-tight"
            >
              Every Service. Every Stage. No Filler.
            </h2>
            <p className="text-[var(--color-muted)]">
              Each service has a defined scope, timeline, and deliverable. No retainer lock-in. No recurring surprises. You pay once, you own the result.
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
                      {/* Hero image thumbnail */}
                      {service.heroImage && (
                        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-[var(--color-surface-2)]">
                          <Image
                            src={service.heroImage}
                            alt={service.name}
                            fill
                            className="object-contain p-2"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-tight font-display">
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
                            className="text-xl font-bold font-display"
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

      {/* 6. COMPARISON TABLE */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="comparison-heading"
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Compare</span>
            <h2
              id="comparison-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4 font-display tracking-tight"
            >
              Three Entry Points. Pick Yours.
            </h2>
            <p className="text-[var(--color-muted)]">
              Not sure where to start? Here is what each tier delivers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Service comparison table">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-4 pr-6 font-semibold text-[var(--color-text)] w-48">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text)]">
                    <div className="text-[#3b82f6] text-xs uppercase tracking-wider mb-1">Starter</div>
                    <div className="font-display">ACRA Assessment</div>
                    <div className="text-[#3b82f6] font-bold text-lg mt-1">Free</div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text)] bg-[var(--color-surface-2)] rounded-t-lg">
                    <div className="text-[#8b5cf6] text-xs uppercase tracking-wider mb-1">Authority</div>
                    <div className="font-display">Authority Building</div>
                    <div className="text-[#8b5cf6] font-bold text-lg mt-1">$15,000</div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text)]">
                    <div className="text-[#10b981] text-xs uppercase tracking-wider mb-1">Enterprise</div>
                    <div className="font-display">UCP / ACP / AP2</div>
                    <div className="text-[#10b981] font-bold text-lg mt-1">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Timeline', starter: '48 hours', authority: '90 days', enterprise: '2-6 weeks' },
                  { feature: 'Protocol audit', starter: true, authority: false, enterprise: true },
                  { feature: 'Structured data', starter: 'Audit only', authority: 'Full implementation', enterprise: 'Full implementation' },
                  { feature: 'UCP manifest', starter: false, authority: false, enterprise: true },
                  { feature: 'ACP checkout', starter: false, authority: false, enterprise: true },
                  { feature: 'AP2 trust layer', starter: false, authority: false, enterprise: true },
                  { feature: 'Authority content', starter: false, authority: '10 articles', enterprise: false },
                  { feature: 'Citation tracking', starter: false, authority: 'Monthly', enterprise: false },
                  { feature: 'Action plan', starter: true, authority: false, enterprise: true },
                ].map((row, i) => (
                  <tr key={row.feature} className={`border-b border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-[var(--color-surface)]'}`}>
                    <td className="py-3 pr-6 font-medium text-[var(--color-text)]">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-[var(--color-muted)]">
                      {typeof row.starter === 'boolean' ? (row.starter ? <CheckCircle size={16} className="mx-auto text-[#3b82f6]" /> : <span className="text-[var(--color-border)] text-lg leading-none">&mdash;</span>) : row.starter}
                    </td>
                    <td className="py-3 px-4 text-center text-[var(--color-muted)] bg-[var(--color-surface-2)]">
                      {typeof row.authority === 'boolean' ? (row.authority ? <CheckCircle size={16} className="mx-auto text-[#8b5cf6]" /> : <span className="text-[var(--color-border)] text-lg leading-none">&mdash;</span>) : row.authority}
                    </td>
                    <td className="py-3 px-4 text-center text-[var(--color-muted)]">
                      {typeof row.enterprise === 'boolean' ? (row.enterprise ? <CheckCircle size={16} className="mx-auto text-[#10b981]" /> : <span className="text-[var(--color-border)] text-lg leading-none">&mdash;</span>) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/acra/run" className="btn-primary">
              Start Free ACRA
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Discuss Enterprise Options
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 16-WEEK ROADMAP INFOGRAPHIC — animated timeline */}
      <RoadmapInfographic />

      {/* 8. OBJECTION-HANDLING FAQ — Sandler style */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="services-faq-heading"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              Objections
            </span>
            <h2
              id="services-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)] font-display tracking-tight"
            >
              The Questions You Are Already Thinking
            </h2>
            <p className="text-[var(--color-muted)] mt-3">
              We would rather address your concerns now than have you leave wondering.
            </p>
          </div>
          <div className="space-y-4">
            {servicesFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none font-display">
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

      {/* 9. SANDLER NEGATIVE REVERSE CTA — "This isn't for everyone" */}
      <SandlerNegativeReverse />
    </>
  )
}
