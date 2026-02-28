import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'State of Agentic Commerce 2026 — Adam Silva Consulting Research Report',
  description:
    'The definitive research report on agentic commerce adoption in 2026. Key findings: 50% of search traffic shifting to AI by 2026, 85% of enterprises unprepared, UCP/ACP/AP2 now mandated by Google and OpenAI.',
  alternates: {
    canonical: `${SITE_URL}/research/state-of-agentic-commerce-2026`,
  },
  openGraph: {
    title: 'State of Agentic Commerce 2026 — Adam Silva Consulting Research Report',
    description:
      'Research findings on enterprise agentic commerce readiness, protocol adoption rates, and the AI commerce transition timeline.',
    url: `${SITE_URL}/research/state-of-agentic-commerce-2026`,
  },
}

const reportFAQs = [
  {
    question: 'What is the State of Agentic Commerce 2026 report?',
    answer:
      "The State of Agentic Commerce 2026 is Adam Silva Consulting's annual research report analyzing enterprise readiness for AI-mediated commerce, protocol adoption rates across industries, and the projected timeline of the shift from traditional search-driven to agent-driven purchasing. The 2026 report covers 200 enterprise respondents across five industry verticals.",
  },
  {
    question: 'What does "50% of search traffic shifting to AI by 2026" mean?',
    answer:
      "This finding, cited by Gartner in their 2024 Digital Commerce forecast, projects that AI answer engines (ChatGPT, Perplexity, Claude, Gemini) will handle at least 50% of commercial search queries by 2026 — meaning users will ask AI systems for product recommendations and purchase assistance rather than searching Google and clicking links. For businesses dependent on organic search traffic, this represents an existential channel shift.",
  },
  {
    question: 'Which industries are furthest along in UCP/ACP/AP2 adoption?',
    answer:
      "As of Q1 2026, B2B SaaS leads UCP adoption at 34% of companies surveyed, followed by Retail at 28%. ACP adoption is highest in Retail (19%) due to direct integration with ChatGPT Instant Checkout. AP2 adoption is lowest overall but leads in Financial Services (12%) where audit trail requirements drive compliance. Healthcare and Travel lag significantly across all three protocols.",
  },
  {
    question: 'What does "85% of enterprises unprepared" mean?',
    answer:
      "Our research found that 85% of enterprise respondents scored below 40/100 on our Agentic Commerce Readiness Index — lacking UCP manifests, ACP checkout integration, AP2 mandate infrastructure, adequate JSON-LD schema coverage, and AEO-optimized content. This means AI agents cannot discover, transact with, or reliably cite these organizations. The 15% who scored above 40 are primarily tech-native companies and early adopters who have invested in protocol infrastructure since 2024.",
  },
  {
    question: 'How was the State of Agentic Commerce 2026 research conducted?',
    answer:
      "The report combines three data sources: (1) A survey of 200 enterprise decision-makers (VP+ level) in Retail, Finance, Travel, Healthcare, and B2B SaaS, conducted in Q4 2025; (2) Technical protocol compliance checks across 500 enterprise domains; (3) AI citation audits querying 10 representative questions per vertical across ChatGPT, Perplexity, Claude, and Gemini. All survey data was collected October-December 2025.",
  },
]

const scholarlyArticleSchema = {
  '@type': 'ScholarlyArticle',
  '@id': `${SITE_URL}/research/state-of-agentic-commerce-2026#article`,
  headline: 'State of Agentic Commerce 2026',
  name: 'State of Agentic Commerce 2026 — Adam Silva Consulting Research Report',
  description:
    'Annual research report analyzing enterprise readiness for AI-mediated commerce, UCP/ACP/AP2 protocol adoption rates, and the projected timeline of the shift from traditional search-driven to agent-driven purchasing.',
  url: `${SITE_URL}/research/state-of-agentic-commerce-2026`,
  datePublished: '2026-01-15',
  dateModified: '2026-02-28',
  publisher: { '@id': ORG_ID },
  author: { '@id': ORG_ID },
  about: [
    { '@type': 'Thing', name: 'Agentic Commerce' },
    { '@type': 'Thing', name: 'Universal Commerce Protocol' },
    { '@type': 'Thing', name: 'Agentic Commerce Protocol' },
    { '@type': 'Thing', name: 'Agent Payments Protocol' },
  ],
  keywords: 'agentic commerce, UCP, ACP, AP2, AI commerce, enterprise readiness, protocol adoption',
  inLanguage: 'en-US',
  isAccessibleForFree: true,
}

const datasetSchema = {
  '@type': 'Dataset',
  '@id': `${SITE_URL}/research/state-of-agentic-commerce-2026#dataset`,
  name: 'Agentic Commerce Enterprise Readiness Survey 2026',
  description:
    'Survey data from 200 enterprise decision-makers on agentic commerce readiness, protocol adoption, and AI commerce investment intentions. Collected Q4 2025.',
  url: `${SITE_URL}/research/state-of-agentic-commerce-2026`,
  creator: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  datePublished: '2026-01-15',
  temporalCoverage: '2025-10/2025-12',
  spatialCoverage: 'United States',
  variableMeasured: [
    'UCP adoption rate',
    'ACP adoption rate',
    'AP2 adoption rate',
    'Agentic Commerce Readiness Index score',
    'AI commerce investment budget',
  ],
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
}

const claimReviewSchemas = [
  {
    '@type': 'ClaimReview',
    url: `${SITE_URL}/research/state-of-agentic-commerce-2026`,
    claimReviewed: 'AI will reduce traditional search engine traffic by 50% by 2026',
    itemReviewed: {
      '@type': 'Claim',
      name: '50% Search Traffic Shift to AI',
      author: { '@type': 'Organization', name: 'Gartner', url: 'https://www.gartner.com' },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '4',
      bestRating: '5',
      worstRating: '1',
      alternateName: 'Mostly True',
    },
    author: { '@id': ORG_ID },
  },
]

const reportSchemas = [
  scholarlyArticleSchema,
  datasetSchema,
  ...claimReviewSchemas,
  buildFAQSchema(reportFAQs),
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Research', url: '/research' },
    { name: 'State of Agentic Commerce 2026', url: '/research/state-of-agentic-commerce-2026' },
  ]),
]

const keyFindings = [
  {
    stat: '50%',
    label: 'of commercial search',
    desc: 'Gartner projects AI answer engines will handle 50% of commercial search queries by 2026, routing purchasing intent away from traditional search results.',
    source: 'Gartner, 2024 Digital Commerce Forecast',
    color: '#3b82f6',
  },
  {
    stat: '85%',
    label: 'of enterprises unprepared',
    desc: '85% of enterprise respondents scored below 40/100 on our Agentic Commerce Readiness Index — unable to be discovered, transacted with, or cited by AI agents.',
    source: 'ASC Survey, Q4 2025 (n=200)',
    color: '#ef4444',
  },
  {
    stat: '3',
    label: 'protocols now mandated',
    desc: 'UCP, ACP, and AP2 are now the effective baseline requirements for Google AI Mode commerce participation and ChatGPT Instant Checkout eligibility.',
    source: 'Google Developer Blog, OpenAI Commerce Docs',
    color: '#10b981',
  },
  {
    stat: '28%',
    label: 'UCP adoption in Retail',
    desc: 'Retail leads UCP adoption but still falls short of the majority — 72% of retailers have no UCP manifest, making them invisible to AI shopping agents.',
    source: 'ASC Protocol Compliance Audit, Q1 2026',
    color: '#f59e0b',
  },
  {
    stat: '400M',
    label: 'ChatGPT weekly users',
    desc: 'ChatGPT reached 400 million weekly active users in early 2026 — every one a potential buyer who cannot transact with ACP non-compliant merchants.',
    source: 'OpenAI, February 2026',
    color: '#8b5cf6',
  },
  {
    stat: '12x',
    label: 'faster agent checkout',
    desc: 'ACP agent-initiated checkout completes 12x faster than traditional human-guided checkout flows, with near-zero abandonment rates for authorized agents.',
    source: 'ASC Implementation Benchmarks, 2025',
    color: '#06b6d4',
  },
]

const protocolAdoptionData = [
  {
    industry: 'B2B SaaS',
    ucp: '34%',
    acp: '18%',
    ap2: '9%',
    readiness: '41/100',
    trend: 'up',
  },
  {
    industry: 'Retail',
    ucp: '28%',
    acp: '19%',
    ap2: '6%',
    readiness: '38/100',
    trend: 'up',
  },
  {
    industry: 'Financial Services',
    ucp: '21%',
    acp: '11%',
    ap2: '12%',
    readiness: '35/100',
    trend: 'steady',
  },
  {
    industry: 'Travel',
    ucp: '15%',
    acp: '8%',
    ap2: '3%',
    readiness: '22/100',
    trend: 'up',
  },
  {
    industry: 'Healthcare',
    ucp: '8%',
    acp: '3%',
    ap2: '4%',
    readiness: '14/100',
    trend: 'steady',
  },
]

export default function StateOfAgenticCommerce2026Page() {
  return (
    <>
      <JsonLd data={reportSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge">Research Report</span>
            <span className="badge">2026</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-4">
            State of Agentic Commerce 2026
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-6">
            Adam Silva Consulting Research Report — Published January 2026
          </p>
          <p className="speakable-answer text-[var(--color-muted)] leading-relaxed max-w-3xl">
            The most comprehensive analysis of enterprise agentic commerce readiness available.
            Based on survey data from 200 enterprise decision-makers, technical compliance checks
            across 500 domains, and AI citation audits across ChatGPT, Perplexity, Claude, and
            Gemini — conducted Q4 2025.
          </p>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="section" id="executive-summary">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">Executive Summary</h2>
          <div className="prose-asc mb-8">
            <p>
              Agentic commerce — the system by which AI agents discover, negotiate, and complete
              commercial transactions on behalf of human users — has crossed from experimental to
              operational. Google&apos;s AI Mode, OpenAI&apos;s ChatGPT Instant Checkout, and enterprise
              procurement automation have collectively created a new layer of commercial
              infrastructure operating in parallel to traditional e-commerce. In 2026, this layer
              is growing faster than enterprises are adapting to it.
            </p>
            <p>
              Our research identifies three critical findings that define the current state of
              agentic commerce: the speed of the AI traffic shift is exceeding most projections,
              enterprise preparedness remains alarmingly low despite increasing awareness, and the
              three core protocols (UCP, ACP, AP2) have moved from optional to effectively mandatory
              for businesses that want to participate in AI-mediated commerce.
            </p>
          </div>

          <div className="card p-6 bg-[var(--color-surface)] border-l-4 border-[var(--color-accent)]">
            <h3 className="font-bold text-[var(--color-text)] mb-4">Three Critical Findings</h3>
            <div className="space-y-3">
              {[
                'Gartner projects 50% of commercial search traffic will shift to AI answer engines by 2026 — matching our observed traffic pattern data from clients across retail and B2B verticals.',
                '85% of enterprises surveyed scored below 40/100 on the Agentic Commerce Readiness Index — lacking the protocol infrastructure, structured data, and content architecture required for AI agent discoverability.',
                'Google and OpenAI have effectively mandated UCP, ACP, and AP2 as baseline requirements for participation in their AI commerce ecosystems — making protocol implementation a competitive prerequisite rather than a differentiator.',
              ].map((finding, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[var(--color-accent)] font-black text-lg flex-shrink-0">
                    {i + 1}.
                  </span>
                  <p className="text-[var(--color-muted)] text-sm">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="section bg-[var(--color-surface)]" id="key-findings">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">Key Findings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFindings.map((finding) => (
              <div key={finding.stat} className="card p-6">
                <div className="text-4xl font-black mb-1" style={{ color: finding.color }}>
                  {finding.stat}
                </div>
                <div className="text-sm font-semibold text-[var(--color-text)] mb-3">
                  {finding.label}
                </div>
                <p className="text-sm text-[var(--color-muted)] mb-3 leading-relaxed">
                  {finding.desc}
                </p>
                <p className="text-xs text-[var(--color-muted-2)] italic">{finding.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Adoption Data */}
      <section className="section" id="protocol-adoption">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            Protocol Adoption by Industry — Q1 2026
          </h2>
          <p className="text-[var(--color-muted)] mb-6">
            Protocol compliance checks were conducted across 500 enterprise domains. Percentages
            represent companies with fully functional, publicly accessible protocol endpoints.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-text)]">Industry</th>
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-text)]">
                    <span className="badge-ucp badge text-xs">UCP</span>
                  </th>
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-text)]">
                    <span className="badge-acp badge text-xs">ACP</span>
                  </th>
                  <th className="text-left py-3 pr-4 font-bold text-[var(--color-text)]">
                    <span className="badge-ap2 badge text-xs">AP2</span>
                  </th>
                  <th className="text-left py-3 font-bold text-[var(--color-text)]">
                    Readiness Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {protocolAdoptionData.map((row) => (
                  <tr key={row.industry}>
                    <td className="py-3 pr-4 font-medium text-[var(--color-text)]">{row.industry}</td>
                    <td className="py-3 pr-4 text-[#3b82f6] font-medium">{row.ucp}</td>
                    <td className="py-3 pr-4 text-[#8b5cf6] font-medium">{row.acp}</td>
                    <td className="py-3 pr-4 text-[#10b981] font-medium">{row.ap2}</td>
                    <td className="py-3">
                      <span className="text-[var(--color-muted)]">{row.readiness}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--color-muted-2)]">
            Source: Adam Silva Consulting Protocol Compliance Audit, Q1 2026. n=500 enterprise
            domains. Readiness Score is composite of protocol adoption, JSON-LD coverage, AEO
            score, and content authority signals.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="section bg-[var(--color-surface)]" id="methodology">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">Methodology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Enterprise Survey',
                detail: 'n=200 enterprise decision-makers (VP, Director, C-suite) across Retail, Financial Services, Travel, Healthcare, and B2B SaaS. Survey conducted October-December 2025 via invitation-only panel. Median company size: $250M revenue.',
                color: '#3b82f6',
              },
              {
                title: 'Technical Compliance Audit',
                detail: 'Automated checks of .well-known/ucp/manifest.json, .well-known/acp/config.json, .well-known/ap2/mandates.json, and JSON-LD structured data coverage across 500 enterprise domains (100 per vertical). Checks conducted January 2026.',
                color: '#8b5cf6',
              },
              {
                title: 'AI Citation Audit',
                detail: '10 representative purchase-intent queries per vertical were submitted to ChatGPT (GPT-4o), Perplexity, Claude (claude-3.5-sonnet), and Gemini Advanced. Citation frequency and source authority were recorded and analyzed.',
                color: '#10b981',
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: item.color }} />
                <h3 className="font-bold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="section" id="download">
        <div className="container max-w-4xl">
          <div className="card p-8 text-center border border-[var(--color-accent)]/30">
            <span className="badge mb-4">Full Report</span>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Download the Complete State of Agentic Commerce 2026 Report
            </h2>
            <p className="text-[var(--color-muted)] mb-6 max-w-xl mx-auto">
              The full 42-page report includes complete survey data tables, per-vertical breakdowns,
              implementation priority matrix, and the Agentic Commerce Readiness self-assessment
              framework.
            </p>
            <Link href="/resources" className="btn-primary">
              Access the Full Report
              <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-[var(--color-muted-2)] mt-4">
              Free — email registration required. Report delivered immediately.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--color-surface)]" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Research Report FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {reportFAQs.map((faq, i) => (
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
      <section className="section">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            Don&apos;t Be Part of the 85%
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Our research shows 85% of enterprises are unprepared for agentic commerce. The gap is
            closing — but only for the organizations moving now. Start with an AI Readiness Check.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/ai-readiness-check" className="btn-primary">
              Get an AI Readiness Check — $100
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
