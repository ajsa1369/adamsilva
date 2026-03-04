import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { ProtocolExplorer } from '@/app/components/interactive/ProtocolExplorer'
import { buildFAQSchema } from '@/lib/schemas/faq'
import {
  organizationSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'UCP, ACP, AP2: The Agentic Commerce Protocol Stack | Adam Silva Consulting',
  description:
    'UCP, ACP, and AP2 are the three protocols that determine whether AI agents can discover, transact with, and trust your business. Learn the full protocol stack and how to implement it.',
  alternates: {
    canonical: `${SITE_URL}/protocols`,
  },
}

const protocolFAQs = [
  {
    question: 'What is the difference between UCP, ACP, and AP2?',
    answer:
      'UCP (Universal Commerce Protocol) handles AI agent discovery — it publishes what your business sells and how agents can interact. ACP (Agentic Commerce Protocol) handles checkout execution — it defines how AI agents initiate and complete purchases. AP2 (Agent Payments Protocol) provides the cryptographic trust layer — it issues Verifiable Credentials that give agents legal authority to transact on behalf of users. Together they form the complete agentic commerce stack.',
  },
  {
    question: 'Do I need all three protocols, or can I implement them individually?',
    answer:
      'Each protocol serves a distinct layer, but they work best together. UCP alone makes you discoverable but not transactable. ACP alone enables checkout but agents may not discover you. AP2 alone provides trust infrastructure but nothing to transact. A complete implementation — UCP for discovery, ACP for execution, AP2 for trust — is required for full agentic commerce readiness.',
  },
  {
    question: 'Who governs UCP, ACP, and AP2?',
    answer:
      'UCP and AP2 are governed by Google as open standards. ACP is led by OpenAI in partnership with Stripe. All three are designed to be interoperable and vendor-agnostic, though each integrates deeply with its governing organization\'s AI commerce infrastructure.',
  },
  {
    question: 'How long does it take to implement the full UCP/ACP/AP2 stack?',
    answer:
      'Adam Silva Consulting\'s full protocol stack implementation takes 16 weeks. Weeks 1-2 cover AI readiness auditing. Weeks 3-6 deploy the foundation layer including UCP manifest, AP2 infrastructure, and JSON-LD schema. Weeks 7-10 implement ACP checkout with Stripe SPT. Weeks 11-16 add the authority layer and final verification. Enterprises with existing APIs and modern tech stacks can often move faster.',
  },
]

const techArticleSchema = {
  '@type': 'TechArticle',
  '@id': `${SITE_URL}/protocols#article`,
  headline: 'UCP, ACP, AP2: The Agentic Commerce Protocol Stack',
  description:
    'A technical overview of the three protocols powering agentic commerce — Universal Commerce Protocol (UCP), Agentic Commerce Protocol (ACP), and Agent Payments Protocol (AP2) — their layers, governing bodies, and how to implement the complete stack.',
  url: `${SITE_URL}/protocols`,
  author: { '@id': `${SITE_URL}/#adam-silva` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  datePublished: '2025-01-01',
  dateModified: '2026-01-01',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: [
    { '@type': 'Thing', name: 'Universal Commerce Protocol', alternateName: 'UCP' },
    { '@type': 'Thing', name: 'Agentic Commerce Protocol', alternateName: 'ACP' },
    { '@type': 'Thing', name: 'Agent Payments Protocol', alternateName: 'AP2' },
  ],
}

const ucpSoftwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/protocols/ucp#protocol`,
  name: 'Universal Commerce Protocol',
  alternateName: 'UCP',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Agentic Commerce Protocol',
  description:
    'UCP is Google\'s open standard for AI agent commerce discovery, published at /.well-known/ucp/manifest.json. It enables AI agents to discover business capabilities, products, and services through standardized manifest files.',
  url: `${SITE_URL}/protocols/ucp`,
  version: 'v2',
  author: { '@type': 'Organization', name: 'Google LLC', url: 'https://www.google.com' },
}

const acpSoftwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/protocols/acp#protocol`,
  name: 'Agentic Commerce Protocol',
  alternateName: 'ACP',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Agentic Commerce Protocol',
  description:
    'ACP is the OpenAI-led standard for AI agent checkout execution. It defines how agents ingest product feeds, initiate purchases via Stripe Payment Tokens (SPT), and confirm orders — enabling ChatGPT Instant Checkout.',
  url: `${SITE_URL}/protocols/acp`,
  version: 'v1',
  author: { '@type': 'Organization', name: 'OpenAI', url: 'https://openai.com' },
}

const ap2SoftwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/protocols/ap2#protocol`,
  name: 'Agent Payments Protocol',
  alternateName: 'AP2',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Agentic Commerce Protocol',
  description:
    'AP2 is Google\'s cryptographic mandate framework for agentic transactions. Intent and Cart mandates — signed with Verifiable Credentials — give AI agents the legal authority to transact and create the audit trail enterprise procurement requires.',
  url: `${SITE_URL}/protocols/ap2`,
  version: 'v1',
  author: { '@type': 'Organization', name: 'Google LLC', url: 'https://www.google.com' },
}

const pageSchemas = [
  techArticleSchema,
  ucpSoftwareSchema,
  acpSoftwareSchema,
  ap2SoftwareSchema,
  buildFAQSchema(protocolFAQs),
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Protocols', url: '/protocols' },
  ]),
]

const protocolCards = [
  {
    protocol: 'UCP',
    label: 'Universal Commerce Protocol',
    color: '#3b82f6',
    badgeClass: 'badge-ucp',
    govBy: 'Google',
    wellKnown: '/.well-known/ucp/manifest.json',
    href: '/protocols/ucp',
    serviceHref: '/services/ucp-implementation',
    description:
      'The AI agent discovery standard. A JSON manifest at /.well-known/ucp/manifest.json tells every AI shopping agent what your business sells, how to transact, and which transport protocols you support.',
  },
  {
    protocol: 'ACP',
    label: 'Agentic Commerce Protocol',
    color: '#8b5cf6',
    badgeClass: 'badge-acp',
    govBy: 'OpenAI + Stripe',
    wellKnown: '/.well-known/acp/config.json',
    href: '/protocols/acp',
    serviceHref: '/services/acp-integration',
    description:
      'The AI checkout execution standard. ACP defines how AI agents ingest product feeds, initiate purchases via Stripe Payment Tokens, and confirm orders — powering ChatGPT Instant Checkout.',
  },
  {
    protocol: 'AP2',
    label: 'Agent Payments Protocol',
    color: '#10b981',
    badgeClass: 'badge-ap2',
    govBy: 'Google',
    wellKnown: '/.well-known/ap2/mandates.json',
    href: '/protocols/ap2',
    serviceHref: '/services/ap2-trust-layer',
    description:
      'The cryptographic trust layer. AP2 Intent and Cart mandates — signed with Verifiable Credentials — give AI agents legal authority to transact and create the non-repudiation trail enterprise procurement demands.',
  },
]

const comparisonTable = [
  {
    field: 'Layer',
    ucp: 'Discovery',
    acp: 'Execution',
    ap2: 'Trust',
  },
  {
    field: 'Governed By',
    ucp: 'Google',
    acp: 'OpenAI + Stripe',
    ap2: 'Google',
  },
  {
    field: '.well-known Path',
    ucp: '/ucp/manifest.json',
    acp: '/acp/config.json',
    ap2: '/ap2/mandates.json',
  },
  {
    field: 'Purpose',
    ucp: 'AI agent capability discovery',
    acp: 'Delegated checkout execution',
    ap2: 'Cryptographic mandate + audit trail',
  },
  {
    field: 'Key Integration',
    ucp: 'Google AI Mode, Perplexity',
    acp: 'ChatGPT Instant Checkout, Stripe SPT',
    ap2: 'Verifiable Credentials, x402',
  },
]

export default function ProtocolsPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="protocols-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6">The Protocol Stack</span>
            <h1
              id="protocols-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              The Three Protocols Powering Agentic Commerce
            </h1>
            <p className="text-lg text-[var(--color-muted)] leading-relaxed speakable-answer">
              UCP, ACP, and AP2 are the three open standards that govern how AI agents discover,
              transact with, and cryptographically trust businesses. Together they form the
              complete agentic commerce infrastructure layer. Businesses that implement all three
              are visible, transactable, and trusted by AI agents — those that don&apos;t are
              invisible to the fastest-growing commerce channel in history.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="comparison-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Protocol Comparison</span>
            <h2
              id="comparison-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              UCP vs ACP vs AP2
            </h2>
            <p className="text-[var(--color-muted)]">
              Each protocol operates at a distinct layer of the agentic commerce stack.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              style={{
                borderCollapse: 'separate',
                borderSpacing: 0,
                border: '1px solid var(--color-border)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ background: 'var(--color-surface-2)' }}>
                  <th
                    className="text-left font-semibold text-[var(--color-muted-2)] px-5 py-3"
                    scope="col"
                  >
                    Property
                  </th>
                  <th className="text-left font-semibold px-5 py-3" scope="col">
                    <span className="badge badge-ucp">UCP</span>
                  </th>
                  <th className="text-left font-semibold px-5 py-3" scope="col">
                    <span className="badge badge-acp">ACP</span>
                  </th>
                  <th className="text-left font-semibold px-5 py-3" scope="col">
                    <span className="badge badge-ap2">AP2</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr
                    key={row.field}
                    style={{
                      background:
                        i % 2 === 0 ? 'var(--color-base)' : 'var(--color-surface)',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <td
                      className="font-semibold text-[var(--color-text)] px-5 py-3 whitespace-nowrap"
                    >
                      {row.field}
                    </td>
                    <td className="text-[var(--color-muted)] px-5 py-3">{row.ucp}</td>
                    <td className="text-[var(--color-muted)] px-5 py-3">{row.acp}</td>
                    <td className="text-[var(--color-muted)] px-5 py-3">{row.ap2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Protocol Cards */}
      <section className="section" aria-labelledby="protocol-cards-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2
              id="protocol-cards-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Explore Each Protocol
            </h2>
            <p className="text-[var(--color-muted)]">
              Deep-dive into the specification, implementation details, and code examples for
              each protocol.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {protocolCards.map((card) => (
              <div key={card.protocol} className="card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`badge ${card.badgeClass}`}>{card.protocol}</span>
                  <span className="text-xs text-[var(--color-muted-2)]">{card.govBy}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  {card.label}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 flex-1">
                  {card.description}
                </p>
                <div className="mt-auto space-y-2">
                  <div className="font-mono text-xs text-[var(--color-muted-2)] bg-[var(--color-surface-2)] px-3 py-1.5 rounded">
                    {card.wellKnown}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={card.href}
                      className="btn-secondary text-xs py-2 px-3 flex-1 justify-center"
                    >
                      Deep Dive
                    </Link>
                    <Link
                      href={card.serviceHref}
                      className="btn-primary text-xs py-2 px-3 flex-1 justify-center"
                    >
                      Implement
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Explorer (interactive) */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="explorer-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Live Protocol Viewer</span>
            <h2
              id="explorer-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Explore the Protocol Manifests
            </h2>
            <p className="text-[var(--color-muted)]">
              See the actual JSON served to AI agents at each /.well-known endpoint — and how
              each protocol works in practice.
            </p>
          </div>
          <ProtocolExplorer />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="protocols-faq-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="protocols-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Protocol Questions Answered
            </h2>
          </div>
          <div className="space-y-4">
            {protocolFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">
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

      {/* Implementation CTA */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="protocols-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="protocols-cta-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              Ready to Implement the Complete Stack?
            </h2>
            <p className="text-[var(--color-muted)] mb-8">
              Adam Silva Consulting implements the complete UCP/ACP/AP2 stack — from the initial
              ACRA through full protocol deployment. 16 weeks to agentic readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn-primary">
                View All Services
                <ArrowRight size={16} />
              </Link>
              <Link href="/services/acra" className="btn-secondary">
                Free ACRA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
