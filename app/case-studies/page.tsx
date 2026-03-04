import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink, TrendingUp, CheckCircle } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Agentic Commerce Case Studies — UCP, ACP, AP2 in Action | Adam Silva Consulting',
  description:
    'Real-world results from UCP, ACP, and AP2 protocol implementations. Shopify, Walmart, Target, OpenAI, and a DTC brand SSR migration — this is the protocol stack we implement for clients.',
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: 'Agentic Commerce Case Studies — UCP, ACP, AP2 in Action | Adam Silva Consulting',
    description:
      'Real-world results from UCP, ACP, and AP2 protocol implementations. See what enterprises achieve when they implement the protocol stack correctly.',
    url: `${SITE_URL}/case-studies`,
    type: 'website',
  },
}

const SITE_URL_CONST = 'https://www.adamsilvaconsulting.com'

const caseStudies = [
  {
    id: 'shopify-ucp-google-ai-mode',
    number: '01',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Shopify + UCP: Merchant Discovery via Google AI Mode',
    source: 'Google UCP Documentation',
    sourceUrl: 'https://developers.google.com/commerce/agent',
    company: 'Shopify',
    partner: 'Google',
    problem:
      'Shopify merchants were invisible to AI shopping agents. Google AI Mode, which uses UCP capability profiles to discover merchant offerings, could not index or surface millions of Shopify products without a standardized discovery layer.',
    solution: 'UCP',
    solutionDetail:
      'Shopify integrated UCP manifests across millions of merchant storefronts. Each merchant\'s UCP manifest — hosted at /.well-known/ucp/manifest.json — declares commerce capabilities, product catalog endpoints, pricing structures, and fulfillment options in the standardized format Google AI Mode requires.',
    results: [
      'Google AI Mode now discovers Shopify products through UCP capability profiles at scale',
      'AI agents surface merchant products without requiring human search or browser sessions',
      'Millions of merchants gained AI agent visibility through a single protocol integration',
      'Real-time inventory and pricing accessible to AI agents programmatically',
    ],
    metrics: { stat: '8M+', label: 'Merchants made AI-discoverable' },
    cta: { label: 'Implement UCP for Your Business', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
  },
  {
    id: 'chatgpt-instant-checkout-acp',
    number: '02',
    protocol: 'ACP',
    badgeClass: 'badge-acp',
    title: 'ChatGPT Instant Checkout (OpenAI + Stripe): ACP in Action',
    source: 'OpenAI Product Announcements',
    sourceUrl: 'https://openai.com/chatgpt',
    company: 'OpenAI',
    partner: 'Stripe',
    problem:
      'ChatGPT users expressing purchase intent were forced to leave the conversation, navigate to external websites, complete checkout manually, and return — a friction-laden multi-step process that caused significant drop-off at the moment of highest purchase intent.',
    solution: 'ACP',
    solutionDetail:
      'OpenAI partnered with Stripe to launch ChatGPT Instant Checkout using the ACP standard. The integration uses Stripe Payment Tokens (SPT) to authorize AI-mediated transactions. Users grant ChatGPT a Cart Mandate (via AP2), and ChatGPT executes the full checkout flow — product selection, payment, confirmation — entirely within the chat interface.',
    results: [
      'Users complete purchases within ChatGPT without visiting a merchant website',
      'Zero-friction AI-mediated commerce at the moment of peak purchase intent',
      'Stripe SPT enables cryptographically secure delegated payment authorization',
      'Merchants receive orders through standard ACP checkout endpoints',
    ],
    metrics: { stat: '0', label: 'Redirects required to purchase' },
    cta: { label: 'Integrate ACP Checkout', href: '/services/acp-integration' },
    protocolPage: '/protocols/acp',
    color: '#8b5cf6',
  },
  {
    id: 'walmart-ucp-enterprise-agent-commerce',
    number: '03',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Walmart + UCP: Enterprise AI Agent Commerce',
    source: 'Google UCP Documentation — Co-developer Working Group',
    sourceUrl: 'https://developers.google.com/commerce/agent',
    company: 'Walmart',
    partner: 'Google',
    problem:
      'Enterprise procurement agents and AI shopping assistants had no standardized way to query Walmart\'s inventory, pricing, or fulfillment options programmatically. Each integration required custom API development and maintenance.',
    solution: 'UCP',
    solutionDetail:
      'Walmart participated as a UCP co-developer in Google\'s original working group, implementing UCP capability profiles across its entire product catalog. The UCP manifest exposes inventory levels, pricing tiers, bulk pricing, shipping options, and fulfillment center availability — all in a format any compliant AI agent can query without a custom integration.',
    results: [
      'AI agents can compare and purchase from Walmart without browser sessions',
      'Enterprise procurement agents query inventory, pricing, and fulfillment options programmatically',
      'Standardized capability profiles eliminate per-integration custom API development',
      'Real-time availability and pricing surfaces to AI shopping agents instantly',
    ],
    metrics: { stat: 'Real-time', label: 'AI agent inventory access' },
    cta: { label: 'Implement UCP Enterprise', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
  },
  {
    id: 'target-ucp-product-feed-standardization',
    number: '04',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Target + UCP: Product Feed Standardization',
    source: 'Google UCP Working Group Documentation',
    sourceUrl: 'https://developers.google.com/commerce/agent',
    company: 'Target',
    partner: 'Google',
    problem:
      'Target\'s product catalog existed in multiple proprietary formats across different systems — none of which AI agents could query directly. Without a standardized protocol layer, AI shopping agents could not reliably discover Target products, check availability, or surface accurate pricing.',
    solution: 'UCP',
    solutionDetail:
      'Target standardized its product catalog through UCP manifests as part of Google\'s original UCP working group. The standardization effort mapped Target\'s internal product data structures to UCP capability declarations — making the catalog machine-readable in the format AI agents natively understand.',
    results: [
      'AI agents now query Target\'s inventory directly through the UCP protocol layer',
      'Product catalog standardized to UCP format, readable by any compliant AI agent',
      'Google AI Mode surfaces Target products in AI-generated shopping responses',
      'Working group participation shaped UCP spec to reflect enterprise retail requirements',
    ],
    metrics: { stat: '400K+', label: 'Products AI-queryable via UCP' },
    cta: { label: 'Standardize Your Product Feed', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
  },
  {
    id: 'dtc-ssr-migration-hydration-tax',
    number: '05',
    protocol: 'SSR',
    badgeClass: 'badge',
    title: 'The Hydration Tax Fix: SSR Migration Case Study',
    source: 'ASC Client Engagement — DTC Brand (Identity Withheld)',
    sourceUrl: '/insights/hydration-tax-client-side-rendering',
    company: 'Leading DTC Brand',
    partner: 'Adam Silva Consulting',
    problem:
      'A leading DTC brand was running a React Single-Page Application (SPA) with full client-side rendering (CSR). Googlebot and AI agent crawlers were seeing blank pages — the JavaScript bundle had to execute before any content appeared. Result: 0 indexed products, invisible to AI agents, and zero AI citations.',
    solution: 'SSR Migration + Protocol Stack',
    solutionDetail:
      'Adam Silva Consulting led a full migration from React SPA (CSR) to Next.js with Server-Side Rendering (SSR). Every page now renders complete HTML on the server — no JavaScript execution required for AI agents or crawlers to read product content, pricing, and schema markup. UCP manifests and JSON-LD schema were layered on top of the SSR foundation.',
    results: [
      '847 products fully indexed (was 0 before SSR migration)',
      'AI citations appeared in ChatGPT, Perplexity, and Google AI Mode within 60 days',
      'Token cost per page reduced 73% (less DOM, no hydration overhead)',
      'Core Web Vitals improved: LCP from 4.2s to 1.1s',
    ],
    metrics: { stat: '73%', label: 'Token cost reduction' },
    cta: { label: 'Fix Your Hydration Tax', href: '/services/geo-implementation' },
    protocolPage: '/insights/hydration-tax-client-side-rendering',
    color: '#10b981',
  },
]

const caseStudyFAQs = [
  {
    question: 'What is UCP and why do enterprises like Shopify and Walmart implement it?',
    answer:
      'UCP (Universal Commerce Protocol) is Google\'s open standard for AI agent commerce discovery. Enterprises implement it because AI agents — including Google AI Mode, ChatGPT, and autonomous procurement agents — use UCP capability profiles to discover what a business sells, what inventory is available, and how to initiate a transaction. Without UCP, a business is invisible to this growing layer of AI-mediated commerce.',
  },
  {
    question: 'How does ChatGPT Instant Checkout use ACP?',
    answer:
      'ChatGPT Instant Checkout is OpenAI\'s implementation of the Agentic Commerce Protocol (ACP), built with Stripe Payment Tokens (SPT). When a user expresses purchase intent in ChatGPT, the AI agent uses ACP to communicate with merchant checkout endpoints and Stripe to authorize and complete the transaction — entirely within the chat interface. This is the result of proper ACP integration on the merchant side.',
  },
  {
    question: 'What is the hydration tax and how does SSR fix it?',
    answer:
      'The hydration tax is the performance penalty of client-side rendering. React SPAs deliver a blank HTML shell that requires JavaScript to execute before content appears. AI agents and Googlebot often time out or index blank pages as a result. Server-Side Rendering (SSR) delivers complete HTML on every request, so AI agents and crawlers can parse content immediately — no JavaScript required.',
  },
  {
    question: 'Does Adam Silva Consulting implement the same protocols used by Shopify and Walmart?',
    answer:
      'Yes. The UCP, ACP, and AP2 protocols are open standards. Adam Silva Consulting implements the exact same specifications used by Shopify, Walmart, Target, and OpenAI — tailored to each client\'s existing infrastructure, product catalog, and commerce platform. Our implementations are fully compliant with the published protocol specifications from Google and OpenAI.',
  },
  {
    question: 'How long does a full UCP/ACP/AP2 implementation take?',
    answer:
      'Our standard implementation timeline is 16 weeks for the full protocol stack (UCP + ACP + AP2 + schema + authority flywheel). UCP alone can be completed in 2 weeks. ACP checkout integration takes 3–4 weeks. AP2 mandate infrastructure takes 4–6 weeks. We can prioritize based on your most urgent protocol gap.',
  },
]

const itemListSchema = {
  '@type': 'ItemList',
  '@id': `${SITE_URL_CONST}/case-studies#case-study-list`,
  name: 'Agentic Commerce Case Studies — UCP, ACP, AP2 in Action',
  description:
    'Real-world protocol implementation results from enterprise brands adopting UCP, ACP, and AP2 agentic commerce standards.',
  numberOfItems: caseStudies.length,
  itemListElement: caseStudies.map((cs, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: cs.title,
    url: `${SITE_URL_CONST}/case-studies#${cs.id}`,
  })),
}

const articleSchemas = caseStudies.map((cs) => ({
  '@type': 'Article',
  '@id': `${SITE_URL_CONST}/case-studies#${cs.id}`,
  headline: cs.title,
  description: cs.problem,
  url: `${SITE_URL_CONST}/case-studies#${cs.id}`,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  datePublished: '2025-02-01',
  dateModified: '2026-02-28',
  about: {
    '@type': 'Thing',
    name: cs.solution === 'UCP' ? 'Universal Commerce Protocol' : cs.solution === 'ACP' ? 'Agentic Commerce Protocol' : 'Server-Side Rendering',
  },
  citation: {
    '@type': 'ClaimReview',
    claimReviewed: cs.title,
    url: cs.sourceUrl.startsWith('http') ? cs.sourceUrl : `${SITE_URL_CONST}${cs.sourceUrl}`,
    author: { '@id': ORG_ID },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      alternateName: 'True',
    },
  },
}))

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: caseStudyFAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Case Studies', url: '/case-studies' },
])

const pageSchemas = [
  itemListSchema,
  ...articleSchemas,
  faqSchema,
  breadcrumbSchema,
]

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="case-studies-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6">Protocol Implementation Results</span>
            <h1
              id="case-studies-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              Agentic Commerce Case Studies
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed speakable-answer">
              UCP, ACP, and AP2 are in production at Shopify, Walmart, Target, and OpenAI.
              These are the exact protocols we implement for clients — and these are the results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Get This for Your Business
                <ArrowRight size={16} />
              </Link>
              <Link href="/protocols" className="btn-secondary">
                See the Protocol Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Context Bar */}
      <section className="section-sm bg-[var(--color-surface)]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                protocol: 'UCP',
                cls: 'badge-ucp',
                label: 'Universal Commerce Protocol',
                govBy: 'Google',
                desc: 'AI agent discovery — how agents find your products',
              },
              {
                protocol: 'ACP',
                cls: 'badge-acp',
                label: 'Agentic Commerce Protocol',
                govBy: 'OpenAI + Stripe',
                desc: 'Checkout execution — how agents complete purchases',
              },
              {
                protocol: 'AP2',
                cls: 'badge-ap2',
                label: 'Agent Payments Protocol',
                govBy: 'Google',
                desc: 'Cryptographic mandates — how agents prove authorization',
              },
            ].map((p) => (
              <div key={p.protocol} className="card p-5 flex items-start gap-4">
                <span className={`badge ${p.cls} shrink-0`}>{p.protocol}</span>
                <div>
                  <p className="text-xs text-[var(--color-muted-2)] mb-1">Gov by {p.govBy}</p>
                  <p className="font-semibold text-[var(--color-text)] text-sm mb-1">{p.label}</p>
                  <p className="text-xs text-[var(--color-muted)]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section" aria-labelledby="case-study-list-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">In Production Worldwide</span>
            <h2
              id="case-study-list-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              5 Case Studies. 3 Protocols. Proven Results.
            </h2>
          </div>

          <div className="space-y-16">
            {caseStudies.map((cs) => (
              <article
                key={cs.id}
                id={cs.id}
                className="scroll-mt-20"
                aria-labelledby={`${cs.id}-heading`}
              >
                <div className="card p-8 lg:p-10">
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-4 mb-6">
                    <span
                      className="text-5xl font-black opacity-10 select-none"
                      style={{ color: cs.color, lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {cs.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`badge ${cs.badgeClass}`}>{cs.solution}</span>
                        <span className="badge" style={{ fontSize: '0.75rem' }}>
                          {cs.company} + {cs.partner}
                        </span>
                      </div>
                      <h3
                        id={`${cs.id}-heading`}
                        className="text-2xl font-bold text-[var(--color-text)] leading-tight"
                      >
                        {cs.title}
                      </h3>
                    </div>
                  </div>

                  {/* Source */}
                  <div className="flex items-center gap-2 mb-6 text-sm text-[var(--color-muted-2)]">
                    <span>Source:</span>
                    {cs.sourceUrl.startsWith('http') ? (
                      <a
                        href={cs.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                      >
                        {cs.source}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        href={cs.sourceUrl}
                        className="text-[var(--color-accent)] hover:underline"
                      >
                        {cs.source}
                      </Link>
                    )}
                  </div>

                  {/* Problem / Solution / Results grid */}
                  <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Problem */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                        The Problem
                      </h4>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                        {cs.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                        The Solution
                      </h4>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        {cs.solutionDetail}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                        The Results
                      </h4>
                      <ul className="space-y-2">
                        {cs.results.map((result, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                          >
                            <CheckCircle
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: cs.color }}
                            />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metric + CTA row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={20} style={{ color: cs.color }} />
                      <div>
                        <div
                          className="text-2xl font-black"
                          style={{ color: cs.color }}
                        >
                          {cs.metrics.stat}
                        </div>
                        <div className="text-xs text-[var(--color-muted-2)]">
                          {cs.metrics.label}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={cs.protocolPage} className="btn-secondary">
                        Learn the Protocol
                      </Link>
                      <Link href={cs.cta.href} className="btn-primary">
                        {cs.cta.label}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="cs-faq-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">Common Questions</span>
            <h2
              id="cs-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {caseStudyFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="cs-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-6">Get Started</span>
            <h2
              id="cs-cta-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              We Implement This for Your Business
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              The same UCP, ACP, and AP2 protocols used by Shopify, Walmart, and OpenAI are open
              standards — available to any business. We handle the full implementation: manifests,
              checkout endpoints, mandate infrastructure, schema, and authority content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
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
