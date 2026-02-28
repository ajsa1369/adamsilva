import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Answer Engine Optimization (AEO) Hub — Complete Resource Guide',
  description:
    'Everything you need to understand and implement Answer Engine Optimization (AEO). Structure your content so ChatGPT, Perplexity, Claude, and Gemini cite you in AI-generated responses.',
  alternates: {
    canonical: `${SITE_URL}/hub/answer-engine-optimization`,
  },
  openGraph: {
    title: 'Answer Engine Optimization (AEO) Hub — Complete Resource Guide',
    description:
      'The definitive resource for Answer Engine Optimization (AEO) — getting your content cited in AI-generated answers.',
    url: `${SITE_URL}/hub/answer-engine-optimization`,
  },
}

const aeoFAQs = [
  {
    question: 'What is Answer Engine Optimization (AEO)?',
    answer:
      'Answer Engine Optimization (AEO) is the practice of structuring web content so AI answer engines (ChatGPT, Perplexity, Claude, Gemini) can extract, understand, and cite your content directly in AI-generated responses — replacing traditional blue-link SEO.',
  },
  {
    question: 'How is AEO different from SEO?',
    answer:
      'Traditional SEO optimizes for search engine ranking positions — getting your blue link to appear high on a results page. AEO optimizes for AI citation — getting your content extracted and quoted directly in AI-generated answers. SEO success is measured in rankings and click-through rates. AEO success is measured in citation frequency, answer inclusion, and authority signal strength across AI systems.',
  },
  {
    question: 'What are the 12 AEO criteria?',
    answer:
      'The 12 AEO criteria are: (1) Server-side rendering with no hydration requirement, (2) Answer-first paragraph with direct answer in first 100 words, (3) JSON-LD structured data, (4) FAQPage schema, (5) Strong internal link structure (3+ internal links per page), (6) Content depth (2,000+ words), (7) Author credentials with Person schema, (8) Publication and modification dates, (9) Protocol discovery files (.well-known endpoints), (10) Mobile responsive with strong Core Web Vitals, (11) Speakable content markup, and (12) Descriptive image alt text.',
  },
  {
    question: 'Does AEO require removing existing SEO work?',
    answer:
      'No — AEO and SEO are largely complementary. Well-structured, authoritative content that ranks well in traditional search also performs better in AI citation. AEO adds a layer of AI-specific optimizations (JSON-LD schema, answer-first writing, speakable markup, structured data) on top of existing SEO foundations. The main divergence is in content structure: AEO requires direct, definitive answers — not the hedged, keyword-dense writing that dominated traditional SEO.',
  },
  {
    question: 'How long does AEO take to show results?',
    answer:
      'AEO results typically appear within 4-8 weeks of implementation. AI systems (especially Perplexity and Claude) re-index rapidly and will begin citing optimized content within weeks of publication. ChatGPT citation frequency increases as content is re-processed in training updates and retrieval-augmented generation (RAG) queries. Full authority establishment — where your content is the default citation source for your domain — typically takes 3-6 months of consistent AEO publishing.',
  },
]

const definedTermSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/hub/answer-engine-optimization#termset`,
  name: 'Answer Engine Optimization (AEO) Definitions',
  publisher: { '@id': ORG_ID },
  hasDefinedTerm: {
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/hub/answer-engine-optimization#term`,
    name: 'Answer Engine Optimization',
    alternateName: 'AEO',
    termCode: 'AEO',
    description:
      'Answer Engine Optimization (AEO) is the practice of structuring web content so AI answer engines (ChatGPT, Perplexity, Claude, Gemini) can extract, understand, and cite your content directly in AI-generated responses — replacing traditional blue-link SEO with direct AI citation.',
    inDefinedTermSet: `${SITE_URL}/hub/answer-engine-optimization#termset`,
    url: `${SITE_URL}/hub/answer-engine-optimization`,
  },
}

const aeoSchemas = [
  definedTermSchema,
  buildFAQSchema(aeoFAQs),
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hub', url: '/hub' },
    { name: 'Answer Engine Optimization', url: '/hub/answer-engine-optimization' },
  ]),
]

const aeoCriteria = [
  {
    number: '01',
    title: 'Server-Side Rendering',
    desc: 'AI crawlers often execute minimal JavaScript. SSR ensures your content is immediately available in the HTML response without hydration.',
    color: '#3b82f6',
  },
  {
    number: '02',
    title: 'Answer-First Paragraph',
    desc: 'The direct, definitive answer to the primary question must appear in the first 100 words. AI systems extract the most direct answer — not the most eloquent one.',
    color: '#8b5cf6',
  },
  {
    number: '03',
    title: 'JSON-LD Structured Data',
    desc: 'Schema.org markup in JSON-LD format tells AI systems what your content is about, who wrote it, when it was published, and how it relates to other entities.',
    color: '#10b981',
  },
  {
    number: '04',
    title: 'FAQPage Schema',
    desc: 'FAQPage structured data makes your question-answer pairs directly extractable by AI systems — the most reliable path to appearing in AI responses.',
    color: '#f59e0b',
  },
  {
    number: '05',
    title: 'Internal Link Structure',
    desc: '3+ internal links per page signals topical authority and helps AI systems understand the breadth and depth of your expertise in a domain.',
    color: '#ef4444',
  },
  {
    number: '06',
    title: 'Content Depth',
    desc: '2,000+ words of substantive, expert content. AI systems favor comprehensive coverage over surface-level treatments when selecting citation sources.',
    color: '#06b6d4',
  },
  {
    number: '07',
    title: 'Author Credentials',
    desc: 'Person schema with author expertise signals. AI systems weight content from identified experts with verifiable credentials more heavily than anonymous sources.',
    color: '#84cc16',
  },
  {
    number: '08',
    title: 'Publication Dates',
    desc: 'datePublished and dateModified in schema. AI systems prioritize current information — stale content without modification dates is deprioritized.',
    color: '#f97316',
  },
  {
    number: '09',
    title: 'Protocol Discovery Files',
    desc: '.well-known endpoints (UCP, ACP, AP2) signal machine-readable infrastructure that positions your domain as a full agentic commerce participant.',
    color: '#a855f7',
  },
  {
    number: '10',
    title: 'Core Web Vitals',
    desc: 'LCP < 2.5s, FID < 100ms, CLS < 0.1. Performance signals are proxy indicators for content quality and are factored into AI citation weighting.',
    color: '#14b8a6',
  },
  {
    number: '11',
    title: 'Speakable Markup',
    desc: 'SpeakableSpecification schema marks content suitable for text-to-speech — used by Google Assistant and voice-based AI query systems.',
    color: '#ec4899',
  },
  {
    number: '12',
    title: 'Descriptive Alt Text',
    desc: 'Specific, descriptive alt text on all images. AI multimodal systems use alt text to understand image content — missing or generic alt text is an indexing gap.',
    color: '#78716c',
  },
]

export default function AEOHubPage() {
  return (
    <>
      <JsonLd data={aeoSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge">AEO</span>
            <span className="badge">Hub Resource</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-6">
            Answer Engine Optimization (AEO)
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Answer Engine Optimization (AEO) is the practice of structuring web content so AI answer
            engines (ChatGPT, Perplexity, Claude, Gemini) can extract, understand, and cite your
            content directly in AI-generated responses — replacing traditional blue-link SEO.
          </p>
        </div>
      </section>

      {/* What is AEO */}
      <section className="section" id="what-is-aeo">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">What is AEO?</h2>
          <div className="prose-asc">
            <p>
              Answer Engine Optimization emerged from a fundamental shift in how people find
              information. For two decades, search meant Google — you typed a query, got ten blue
              links, and clicked the most promising one. That model is collapsing. ChatGPT, Perplexity,
              Claude, and Gemini now answer questions directly. Users increasingly never click a link
              at all. Gartner projects that AI will reduce traditional search engine traffic by 50% by
              2026. For businesses whose leads, customers, and revenue depend on search visibility,
              this is an existential shift.
            </p>
            <p>
              AEO is the discipline that replaces traditional SEO for this new reality. Instead of
              optimizing to appear as a blue link in a list of results, AEO optimizes your content
              to be extracted, cited, and quoted by AI systems that generate answers in prose.
              This requires a completely different content architecture: answers must appear at the
              top of the page (not buried after introductory paragraphs), content must be structured
              with machine-readable schema markup, authors must have verifiable credentials, and
              every factual claim must be presented with appropriate confidence signals.
            </p>
            <p>
              The core insight of AEO is that AI systems are not keyword matchers — they are
              comprehension systems. They read your content the way an expert reader would: they
              evaluate the directness of the answer, the quality of the evidence, the authority of
              the author, and the technical implementation quality of the page. AEO systematically
              optimizes all of these signals.
            </p>
          </div>
        </div>
      </section>

      {/* AEO vs SEO */}
      <section className="section bg-[var(--color-surface)]" id="aeo-vs-seo">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">AEO vs SEO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 pr-6 font-bold text-[var(--color-text)]">Factor</th>
                  <th className="text-left py-3 pr-6 font-bold text-[var(--color-muted)]">
                    Traditional SEO
                  </th>
                  <th className="text-left py-3 font-bold text-[var(--color-accent)]">
                    Answer Engine Optimization
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Goal', 'Rank #1 in blue links', 'Get cited in AI-generated answers'],
                  ['User interaction', 'Click from SERP to website', 'Answer delivered inline — no click needed'],
                  ['Content structure', 'Keyword density, H-tag hierarchy', 'Answer-first, structured schema, speakable'],
                  ['Success metric', 'Rankings, organic traffic', 'Citation frequency, AI mention rate'],
                  ['Authority signal', 'Backlinks, domain authority', 'Author credentials, schema depth, topical breadth'],
                  ['Content length', '800-1,500 words (sweet spot)', '2,000+ words (comprehensive coverage)'],
                  ['Technical requirements', 'Page speed, mobile-first', 'SSR, JSON-LD, structured data depth'],
                  ['Lifespan', 'Rankings decay over 6-18 months', 'Authority compounds — earlier = larger moat'],
                ].map(([factor, seo, aeo]) => (
                  <tr key={factor}>
                    <td className="py-3 pr-6 font-medium text-[var(--color-text)]">{factor}</td>
                    <td className="py-3 pr-6 text-[var(--color-muted)]">{seo}</td>
                    <td className="py-3 text-[#10b981] font-medium">{aeo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 12 AEO Criteria */}
      <section className="section" id="aeo-criteria">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            The 12 AEO Criteria
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Adam Silva Consulting evaluates AEO readiness across 12 criteria derived from analysis
            of content that consistently earns AI citations across ChatGPT, Perplexity, Claude, and
            Gemini. Every criterion is measurable — and every one has a concrete implementation path.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aeoCriteria.map((criterion) => (
              <div key={criterion.number} className="card p-5">
                <div className="text-2xl font-black mb-2" style={{ color: criterion.color }}>
                  {criterion.number}
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{criterion.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{criterion.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Implement AEO */}
      <section className="section bg-[var(--color-surface)]" id="aeo-implementation">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            How to Implement AEO
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            AEO implementation follows a systematic four-phase process. Each phase builds on the
            previous — technical foundations enable content strategies, which enable authority
            signals.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                phase: 'Phase 1: AEO Audit',
                desc: 'Assess current AEO score across all 12 criteria. Identify highest-impact gaps. Benchmark against top citations in your vertical.',
                link: '/services/aeo-audit',
                linkText: 'AEO Audit Service',
                color: '#3b82f6',
              },
              {
                phase: 'Phase 2: Technical Foundation',
                desc: 'Implement JSON-LD structured data, fix SSR issues, add speakable markup, and ensure all 12 technical criteria are met across key pages.',
                link: '/services/geo-implementation',
                linkText: 'GEO Implementation Service',
                color: '#8b5cf6',
              },
              {
                phase: 'Phase 3: Content Restructuring',
                desc: 'Rewrite existing content with answer-first structure, add comprehensive FAQ sections, deepen topical coverage, and build hub-and-spoke content architecture.',
                link: '/services/geo-implementation',
                linkText: 'Content Strategy Service',
                color: '#10b981',
              },
              {
                phase: 'Phase 4: Authority Compounding',
                desc: 'Launch the Authority Flywheel — systematic publication of AEO-optimized content that compounds citation frequency over time.',
                link: '/services/authority-building',
                linkText: 'Authority Building Service',
                color: '#f59e0b',
              },
            ].map((item) => (
              <div key={item.phase} className="card p-6 flex flex-col sm:flex-row gap-4">
                <div
                  className="w-1 rounded-full flex-shrink-0 min-h-[60px]"
                  style={{ background: item.color }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--color-text)] mb-2">{item.phase}</h3>
                  <p className="text-sm text-[var(--color-muted)] mb-3">{item.desc}</p>
                  <Link
                    href={item.link}
                    className="text-sm text-[var(--color-accent)] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    {item.linkText}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-center">
            <p className="text-[var(--color-muted)] mb-4">
              Not sure where to start? Use the free AEO Readiness Score tool to get an instant
              assessment across all 12 criteria.
            </p>
            <Link href="/tools/aeo-score" className="btn-primary">
              Get Your Free AEO Score
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Answer Engine Optimization FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {aeoFAQs.map((faq, i) => (
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
            Start Getting Cited by AI
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Every week you wait is a week your competitors are building AI citation authority.
            Get your AEO audit and start appearing in AI-generated answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/aeo-audit" className="btn-primary">
              Get an AEO Audit
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
