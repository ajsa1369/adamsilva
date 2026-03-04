import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calculator, CheckSquare, BarChart2, ExternalLink, ChevronRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'
import { ResourcesForm } from './ResourcesForm'

export const metadata: Metadata = {
  title: 'Free Agentic Commerce Resources & Guides | Adam Silva Consulting',
  description:
    'Free guides, tools, and protocol documentation for UCP, ACP, AP2, AEO, and GEO implementation. Download The Complete Guide to Agentic Commerce and use our free diagnostic tools.',
  alternates: {
    canonical: `${SITE_URL}/resources`,
  },
  openGraph: {
    title: 'Free Agentic Commerce Resources & Guides | Adam Silva Consulting',
    description:
      'Free guides, tools, and protocol documentation for UCP, ACP, AP2, AEO, and GEO implementation.',
    url: `${SITE_URL}/resources`,
    type: 'website',
  },
}

const freeTools = [
  {
    icon: Calculator,
    title: 'Token Efficiency Calculator',
    description:
      "Calculate your page's token efficiency score against the ASC benchmark. Identify bloated DOM, wasted tokens, and CSR overhead dragging down your AI agent discoverability.",
    href: '/tools/token-calculator',
    badge: 'Free Tool',
    color: '#3b82f6',
  },
  {
    icon: CheckSquare,
    title: 'Protocol Compliance Checker',
    description:
      'Instantly check whether your site has valid UCP manifests, ACP configuration, and AP2 mandate files at the required /.well-known paths. Know your protocol status in seconds.',
    href: '/tools/protocol-checker',
    badge: 'Free Tool',
    color: '#8b5cf6',
  },
  {
    icon: BarChart2,
    title: 'AEO Score Analyzer',
    description:
      "Score your page's Answer Engine Optimization posture. Measures schema coverage, E-E-A-T signals, content structure, and AI citation readiness across 12 factors.",
    href: '/tools/aeo-score',
    badge: 'Free Tool',
    color: '#10b981',
  },
]

const insightLinks = [
  { title: 'The Agentic Commerce Protocols: UCP, ACP, and AP2', slug: 'agentic-commerce-protocols-ucp-acp-ap2', readTime: 12 },
  { title: 'Why Legacy Platforms Fail in the Agentic Era', slug: 'why-legacy-platforms-fail-agentic-era', readTime: 10 },
  { title: 'Token Efficiency: Make Your Pages Cheap to Parse', slug: 'token-efficiency-make-pages-cheap-to-parse', readTime: 8 },
  { title: 'The Hydration Tax: Why Client-Side Rendering Kills Agent Discovery', slug: 'hydration-tax-client-side-rendering', readTime: 9 },
  { title: "Gartner's 50% Traffic Decline Prediction: What It Means for Your Business", slug: 'gartner-50-percent-traffic-decline', readTime: 8 },
  { title: 'The Authority Flywheel: How to Build Agent Citation Dominance', slug: 'authority-flywheel-agent-citation-dominance', readTime: 11 },
  { title: 'AP2 Mandates: Cryptographic Trust for Agentic Transactions', slug: 'ap2-mandates-cryptographic-trust', readTime: 10 },
  { title: 'UCP vs. ACP: Choosing the Right Protocol Stack', slug: 'ucp-vs-acp-protocol-comparison', readTime: 9 },
  { title: '16 Weeks to Agentic Readiness: The Implementation Roadmap', slug: '16-weeks-agentic-readiness-roadmap', readTime: 14 },
  { title: "AEO vs. GEO: What's the Difference and Why It Matters", slug: 'aeo-vs-geo-difference', readTime: 8 },
]

const externalDocs = [
  {
    title: 'Google UCP Specification',
    description: 'Official Universal Commerce Protocol documentation from Google Developers.',
    url: 'https://developers.google.com/commerce/agent',
    source: 'Google Developers',
  },
  {
    title: 'OpenAI ACP Documentation',
    description: 'Agentic Commerce Protocol reference and integration guide from OpenAI.',
    url: 'https://platform.openai.com/docs',
    source: 'OpenAI',
  },
  {
    title: 'Stripe Payment Token (SPT) Docs',
    description: "Stripe's documentation for implementing SPT in ACP-compliant checkout flows.",
    url: 'https://stripe.com/docs',
    source: 'Stripe',
  },
]

const itemListSchema = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/resources#resource-list`,
  name: 'Agentic Commerce Resources & Guides',
  description: 'Free guides, tools, and protocol documentation for agentic commerce implementation.',
  numberOfItems: 13,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'The Complete Guide to Agentic Commerce', url: `${SITE_URL}/resources#guide` },
    { '@type': 'ListItem', position: 2, name: 'Token Calculator Tool', url: `${SITE_URL}/tools/token-calculator` },
    { '@type': 'ListItem', position: 3, name: 'Protocol Checker Tool', url: `${SITE_URL}/tools/protocol-checker` },
    { '@type': 'ListItem', position: 4, name: 'AEO Score Tool', url: `${SITE_URL}/tools/aeo-score` },
    ...insightLinks.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 5,
      name: a.title,
      url: `${SITE_URL}/insights/${a.slug}`,
    })),
  ],
}

const offerCatalogSchema = {
  '@type': 'OfferCatalog',
  '@id': `${SITE_URL}/resources#offer-catalog`,
  name: 'Free Agentic Commerce Tools',
  description: 'Free tools for diagnosing protocol compliance, token efficiency, and AEO readiness.',
  numberOfItems: 3,
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'Token Efficiency Calculator',
        applicationCategory: 'BusinessApplication',
        description: "Calculate your page's token efficiency score against the ASC benchmark.",
        url: `${SITE_URL}/tools/token-calculator`,
        publisher: { '@id': ORG_ID },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'Protocol Compliance Checker',
        applicationCategory: 'BusinessApplication',
        description: 'Check whether your site has valid UCP manifests, ACP config, and AP2 mandate files.',
        url: `${SITE_URL}/tools/protocol-checker`,
        publisher: { '@id': ORG_ID },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'AEO Score Analyzer',
        applicationCategory: 'BusinessApplication',
        description: "Score your page's Answer Engine Optimization posture across 12 factors.",
        url: `${SITE_URL}/tools/aeo-score`,
        publisher: { '@id': ORG_ID },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  ],
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Resources', url: '/resources' },
])

const pageSchemas = [itemListSchema, offerCatalogSchema, breadcrumbSchema]

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="resources-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6">Free Resources</span>
            <h1
              id="resources-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              Agentic Commerce Resources &amp; Guides
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed speakable-answer">
              Free tools, comprehensive guides, protocol documentation, and the complete
              article library on UCP, ACP, AP2, AEO, and GEO &mdash; everything you need to
              understand and implement agentic commerce.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guide — client component handles the email form */}
      <ResourcesForm />

      {/* Free Tools */}
      <section className="section" aria-labelledby="tools-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Free Tools</span>
            <h2
              id="tools-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Diagnose Your Agentic Readiness
            </h2>
            <p className="text-[var(--color-muted)]">
              Three free tools to measure your current protocol compliance, token
              efficiency, and AEO posture &mdash; before spending anything on implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {freeTools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="card p-6 flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${tool.color} 15%, transparent)`,
                      }}
                    >
                      <Icon size={22} style={{ color: tool.color }} />
                    </div>
                    <span className="badge text-xs">{tool.badge}</span>
                  </div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2">{tool.title}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1 mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
                    Use Tool Free
                    <ChevronRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Article Library */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="articles-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Article Library</span>
            <h2
              id="articles-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              10 Deep-Dive Articles
            </h2>
            <p className="text-[var(--color-muted)]">
              2,000+ word technical articles on every aspect of agentic commerce
              implementation &mdash; from protocol fundamentals to implementation tactics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {insightLinks.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="card p-5 flex items-start gap-4 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor:
                      'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                  }}
                >
                  <BookOpen size={15} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-text)] text-sm leading-snug mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted-2)]">
                    {article.readTime} min read
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="shrink-0 mt-1 text-[var(--color-muted-2)] group-hover:text-[var(--color-accent)] transition-colors"
                />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/insights" className="btn-secondary">
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol Documentation */}
      <section className="section" aria-labelledby="protocol-docs-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="badge mb-4">Official Specs</span>
            <h2
              id="protocol-docs-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Protocol Documentation
            </h2>
            <p className="text-[var(--color-muted)]">
              Official specifications from Google, OpenAI, and Stripe &mdash; the primary
              sources for UCP, ACP, and AP2 protocol standards.
            </p>
          </div>

          <div className="space-y-4">
            {externalDocs.map((doc) => (
              <a
                key={doc.title}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 flex items-start justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                      {doc.title}
                    </h3>
                    <span className="badge text-xs">{doc.source}</span>
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">{doc.description}</p>
                </div>
                <ExternalLink
                  size={16}
                  className="shrink-0 mt-1 text-[var(--color-muted-2)] group-hover:text-[var(--color-accent)] transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="resources-cta-heading"
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-6">Next Step</span>
            <h2
              id="resources-cta-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Ready to Move from Learning to Building?
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              The guide and tools give you the map. Adam Silva Consulting provides the
              implementation. Start with a free Agentic Commerce Readiness Assessment (ACRA) &mdash; a 48-hour
              assessment of your current protocol compliance, structured data, and agentic
              readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
                <ArrowRight size={16} />
              </Link>
              <Link href="/case-studies" className="btn-secondary">
                See Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
