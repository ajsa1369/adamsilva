import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Generative Engine Optimization (GEO) Hub — Complete Resource Guide',
  description:
    'Everything you need to understand and implement Generative Engine Optimization (GEO). Make your brand the authoritative source that AI systems cite, recommend, and reference.',
  alternates: {
    canonical: `${SITE_URL}/hub/generative-engine-optimization`,
  },
  openGraph: {
    title: 'Generative Engine Optimization (GEO) Hub — Complete Resource Guide',
    description:
      'The definitive resource for Generative Engine Optimization (GEO) — building AI citation authority at scale.',
    url: `${SITE_URL}/hub/generative-engine-optimization`,
  },
}

const geoFAQs = [
  {
    question: 'What is Generative Engine Optimization (GEO)?',
    answer:
      'Generative Engine Optimization (GEO) is the systematic process of making your brand the authoritative source that generative AI systems cite, recommend, and reference when users ask questions in your domain — driving influence rather than just traffic.',
  },
  {
    question: 'How does GEO differ from AEO?',
    answer:
      'AEO (Answer Engine Optimization) focuses on optimizing individual pages and pieces of content to earn AI citations. GEO is the higher-level strategic discipline that governs which topics, angles, and narratives your brand owns across the entire AI information landscape. AEO is tactical (optimize this page). GEO is strategic (own this topic space). A complete GEO program includes AEO-optimized content, but also covers entity authority, topical map construction, cross-platform citation strategy, and AI training data presence.',
  },
  {
    question: 'What is the Authority Flywheel?',
    answer:
      'The Authority Flywheel is Adam Silva Consulting\'s four-step framework for building compounding GEO authority: (1) Identify your authority domains and the questions you can answer definitively, (2) Structure and publish comprehensive, schema-optimized content that AI systems can extract and cite, (3) Verify your citations are occurring and measure AI mention frequency, (4) Leverage citations to build more authority (new partnerships, media mentions, expert interviews) that feed back into the first step. Once spinning, the flywheel becomes self-sustaining.',
  },
  {
    question: 'How long does GEO take to produce results?',
    answer:
      'GEO operates on a longer horizon than AEO. Initial AI citations begin appearing within 4-8 weeks of publishing optimized content. Topical authority establishment — where your brand is the default citation source for questions in your domain — typically takes 4-6 months of consistent, high-quality publishing. The flywheel effect begins compounding at month 3-4, when AI systems start cross-referencing your content as a reliable source. After 12 months, most clients see their domain cited in 15-40% of relevant AI queries.',
  },
  {
    question: 'What is the difference between GEO and traditional content marketing?',
    answer:
      'Traditional content marketing is designed to attract human readers — it optimizes for engagement, time-on-page, social shares, and email conversions. GEO is designed to train AI systems — it optimizes for machine comprehensibility, factual density, entity relationships, and structured data coverage. GEO content must be written and marked up so AI systems can extract specific claims, understand the source\'s authority on those claims, and cite that source in generated answers. It is a fundamentally different writing and publication discipline.',
  },
]

const definedTermSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/hub/generative-engine-optimization#termset`,
  name: 'Generative Engine Optimization (GEO) Definitions',
  publisher: { '@id': ORG_ID },
  hasDefinedTerm: {
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/hub/generative-engine-optimization#term`,
    name: 'Generative Engine Optimization',
    alternateName: 'GEO',
    termCode: 'GEO',
    description:
      'Generative Engine Optimization (GEO) is the systematic process of making your brand the authoritative source that generative AI systems cite, recommend, and reference when users ask questions in your domain — driving influence rather than just traffic.',
    inDefinedTermSet: `${SITE_URL}/hub/generative-engine-optimization#termset`,
    url: `${SITE_URL}/hub/generative-engine-optimization`,
  },
}

const geoSchemas = [
  definedTermSchema,
  buildFAQSchema(geoFAQs),
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hub', url: '/hub' },
    { name: 'Generative Engine Optimization', url: '/hub/generative-engine-optimization' },
  ]),
]

const flywheelSteps = [
  {
    number: '1',
    title: 'Identify',
    subtitle: 'Map your authority domain',
    desc: 'Define the exact question space your brand can answer definitively. Not broad categories — specific questions. "What is UCP?" is an authority claim. "E-commerce best practices" is not. GEO starts with a precise topical map of the 50-200 questions you want to own.',
    detail: 'Deliverables: Topic authority map, Question ownership matrix, Competitor citation audit',
    color: '#3b82f6',
  },
  {
    number: '2',
    title: 'Structure',
    subtitle: 'Publish AI-extractable content',
    desc: 'Create comprehensive, answer-first content for every question in your authority map. Apply all 12 AEO criteria. Build hub-and-spoke architecture. Publish at minimum 2 pieces per week for the first 90 days.',
    detail: 'Deliverables: Hub pages, Pillar articles, FAQ schemas, Internal link architecture',
    color: '#8b5cf6',
  },
  {
    number: '3',
    title: 'Verify',
    subtitle: 'Measure AI citation frequency',
    desc: 'Run weekly citation audits across ChatGPT, Perplexity, Claude, and Gemini. Track which questions cite you, which cite competitors, and which have no authoritative source yet. Identify citation gaps and publishing opportunities.',
    detail: 'Deliverables: Weekly citation report, Competitor gap analysis, Opportunity backlog',
    color: '#10b981',
  },
  {
    number: '4',
    title: 'Citation',
    subtitle: 'Leverage authority for growth',
    desc: 'Use your AI citations as social proof — in sales collateral, PR pitches, partnership discussions, and media outreach. Citations from AI systems validate expertise to human audiences, unlocking speaking opportunities, media coverage, and strategic partnerships.',
    detail: 'Deliverables: Citation tracking dashboard, PR leverage strategy, Partnership framework',
    color: '#f59e0b',
  },
]

export default function GEOHubPage() {
  return (
    <>
      <JsonLd data={geoSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge">GEO</span>
            <span className="badge">Hub Resource</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-6">
            Generative Engine Optimization (GEO)
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Generative Engine Optimization (GEO) is the systematic process of making your brand the
            authoritative source that generative AI systems cite, recommend, and reference when users
            ask questions in your domain — driving influence rather than just traffic.
          </p>
        </div>
      </section>

      {/* What is GEO */}
      <section className="section" id="what-is-geo">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">What is GEO?</h2>
          <div className="prose-asc">
            <p>
              Generative Engine Optimization is the strategic discipline that answers the question:
              in a world where AI generates the answers, how do you make sure your brand is the
              source those answers come from? It operates at a level above individual content
              optimization — it is about owning an entire topic space in the minds (and training
              data) of AI systems.
            </p>
            <p>
              When someone asks ChatGPT about agentic commerce protocols, which company gets cited?
              When Perplexity answers questions about UCP implementation, whose content does it
              reference? When an enterprise research agent pulls background on AI agent checkout, who
              is the authoritative voice? GEO is the systematic work that determines the answer to
              these questions — and builds the structural advantages that make your brand the default
              citation.
            </p>
            <p>
              GEO encompasses technical optimization (the AEO layer — structured data, schema,
              SSR), content strategy (the topical authority map — which questions you own and how you
              answer them), and authority infrastructure (the entity graph — how your organization,
              its people, and its claims are represented across the web and in AI training data).
              Together, these three layers create a compounding authority moat that becomes
              progressively harder for competitors to breach.
            </p>
            <p>
              The earliest brands to establish GEO authority in their verticals will hold dominant
              positions for years. AI systems, once they have strong citation patterns for a source,
              reinforce those patterns through training — creating a self-reinforcing advantage. The
              brands that move now are investing in the most durable competitive advantage in the
              coming decade of AI-mediated information.
            </p>
          </div>
        </div>
      </section>

      {/* GEO vs AEO vs SEO */}
      <section className="section bg-[var(--color-surface)]" id="geo-vs-aeo-vs-seo">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">GEO vs AEO vs SEO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-text)]">Factor</th>
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-muted)]">SEO</th>
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-muted)]">AEO</th>
                  <th className="text-left py-3 font-bold text-[var(--color-accent)]">GEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Scope', 'Individual page rankings', 'Individual page citations', 'Brand-level topic ownership'],
                  ['Target system', 'Search engine crawlers', 'AI answer extraction', 'Generative AI training + retrieval'],
                  ['Success metric', 'Ranking position', 'Citation frequency', 'Domain authority score in AI'],
                  ['Content unit', 'Individual page', 'Individual Q&A', 'Topic map (50-200 questions)'],
                  ['Time to results', '3-6 months', '4-8 weeks', '4-6 months (compounds indefinitely)'],
                  ['Competitive moat', 'Links (replicable)', 'Schema (replicable)', 'Entity authority (durable)'],
                  ['Strategic layer', 'Tactical', 'Tactical', 'Strategic'],
                  ['Outcome', 'Traffic', 'Answers', 'Influence + Revenue'],
                ].map(([factor, seo, aeo, geo]) => (
                  <tr key={factor}>
                    <td className="py-3 pr-4 font-medium text-[var(--color-text)]">{factor}</td>
                    <td className="py-3 pr-4 text-[var(--color-muted-2)]">{seo}</td>
                    <td className="py-3 pr-4 text-[var(--color-muted)]">{aeo}</td>
                    <td className="py-3 text-[#10b981] font-medium">{geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Authority Flywheel */}
      <section className="section" id="authority-flywheel">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            The Authority Flywheel
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            The Authority Flywheel is Adam Silva Consulting&apos;s four-step compounding framework for
            GEO. Each step feeds the next — and after the first full cycle, the process becomes
            self-reinforcing. The flywheel never stops spinning once it starts.
          </p>

          <div className="space-y-4 mb-10">
            {flywheelSteps.map((step) => (
              <div key={step.number} className="card p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div
                    className="text-4xl font-black w-12 flex-shrink-0"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold text-[var(--color-text)]">{step.title}</h3>
                      <span className="text-sm text-[var(--color-muted)]">{step.subtitle}</span>
                    </div>
                    <p className="text-[var(--color-muted)] mb-3">{step.desc}</p>
                    <p className="text-xs text-[var(--color-muted-2)] italic">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-5 bg-[var(--color-surface)] text-center">
            <p className="text-sm text-[var(--color-muted)] mb-2">
              <strong className="text-[var(--color-text)]">Flywheel effect timeline:</strong> Initial
              citations in weeks 4-8 → authority pattern establishes at month 3 → compounding begins
              at month 4 → dominant vertical position at month 12
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Phases */}
      <section className="section bg-[var(--color-surface)]" id="geo-implementation">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            GEO Implementation Phases
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Adam Silva Consulting implements GEO in three phases, aligned with the 16-week
            Agentic Readiness program.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                phase: 'Phase 1',
                weeks: 'Weeks 1-4',
                title: 'Foundation Audit',
                items: [
                  'AEO score across all 12 criteria',
                  'Competitor citation analysis',
                  'Topic authority map (50-100 questions)',
                  'Content gap identification',
                  'Technical infrastructure audit',
                ],
                color: '#3b82f6',
              },
              {
                phase: 'Phase 2',
                weeks: 'Weeks 5-12',
                title: 'Content Architecture',
                items: [
                  'Hub page creation (5-10 hubs)',
                  'Pillar article production (10-20 articles)',
                  'Schema and structured data implementation',
                  'Internal link architecture build-out',
                  'FAQ and Q&A content expansion',
                ],
                color: '#8b5cf6',
              },
              {
                phase: 'Phase 3',
                weeks: 'Weeks 13-16+',
                title: 'Authority Compounding',
                items: [
                  'Weekly citation tracking and reporting',
                  'Content calendar execution',
                  'PR and media outreach with citation proof',
                  'Flywheel acceleration campaigns',
                  'Quarterly authority position review',
                ],
                color: '#10b981',
              },
            ].map((phase) => (
              <div key={phase.phase} className="card p-6">
                <div className="text-xs font-bold mb-1" style={{ color: phase.color }}>
                  {phase.weeks}
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-1">
                  {phase.phase}: {phase.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: phase.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="card p-8 border-l-4 border-[var(--color-accent)]">
            <h3 className="font-bold text-[var(--color-text)] mb-3">
              Ready to Build GEO Authority?
            </h3>
            <p className="text-[var(--color-muted)] mb-4">
              Adam Silva Consulting&apos;s Authority Building service delivers the full GEO program —
              topic authority mapping, content architecture, AEO implementation, and flywheel
              activation. Start with a free authority audit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services/authority-building" className="btn-primary">
                View Authority Building Service
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get a Free Authority Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Generative Engine Optimization FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {geoFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            Own Your Topic Space in AI
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            The brands building GEO authority today will be the default AI citations for the next
            decade. The window to establish first-mover position is closing — start the flywheel now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/authority-building" className="btn-primary">
              Start the Authority Flywheel
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to Adam
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
