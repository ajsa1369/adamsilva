import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Universal Commerce Protocol (UCP) Hub — Complete Resource Guide',
  description:
    'Everything you need to understand and implement Universal Commerce Protocol (UCP). Google\'s open standard for AI agent capability discovery — manifests, transports, and implementation guides.',
  alternates: {
    canonical: `${SITE_URL}/hub/universal-commerce-protocol`,
  },
  openGraph: {
    title: 'Universal Commerce Protocol (UCP) Hub — Complete Resource Guide',
    description:
      'The definitive resource for Universal Commerce Protocol (UCP) — Google\'s open standard for AI agent capability discovery.',
    url: `${SITE_URL}/hub/universal-commerce-protocol`,
  },
}

const ucpFAQs = [
  {
    question: 'What is Universal Commerce Protocol (UCP)?',
    answer:
      'Universal Commerce Protocol (UCP) is Google\'s open standard for AI agent capability discovery. It publishes a machine-readable manifest at /.well-known/ucp/manifest.json that lets AI shopping agents discover your product catalog, pricing, and checkout capabilities without traditional search.',
  },
  {
    question: 'Is UCP required for Google AI Mode?',
    answer:
      'UCP is not technically mandatory, but Google\'s AI Mode and AI Overviews strongly prefer businesses that publish a UCP manifest. Merchants without UCP face a significant disadvantage in AI-mediated discovery — AI agents simply cannot reliably discover their capabilities, pricing, or checkout flows.',
  },
  {
    question: 'What transports does UCP support?',
    answer:
      'UCP supports three transport protocols: REST (standard HTTP API endpoints), MCP (Model Context Protocol, Anthropic\'s standard for AI tool integration), and A2A (Agent-to-Agent protocol for autonomous multi-agent commerce flows). Most implementations start with REST and add MCP and A2A over time.',
  },
  {
    question: 'How long does UCP implementation take?',
    answer:
      'A basic UCP manifest (product catalog, pricing, capabilities) typically takes 1-2 weeks to implement. A full implementation covering all three transports (REST, MCP, A2A), real-time inventory, and checkout integration typically runs 4-6 weeks. Adam Silva Consulting delivers full UCP stacks in the 16-week Agentic Readiness program.',
  },
  {
    question: 'What is the UCP manifest structure?',
    answer:
      'A UCP manifest is a JSON file served at /.well-known/ucp/manifest.json. It declares the merchant name, version, supported capabilities (browse, cart, checkout), supported transports (REST, MCP, A2A), product catalog endpoint, and authentication methods. AI agents fetch this file to understand how to interact with your business programmatically.',
  },
]

const definedTermSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/hub/universal-commerce-protocol#termset`,
  name: 'Universal Commerce Protocol (UCP) Definitions',
  publisher: { '@id': ORG_ID },
  hasDefinedTerm: {
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/hub/universal-commerce-protocol#term`,
    name: 'Universal Commerce Protocol',
    alternateName: 'UCP',
    termCode: 'UCP',
    description:
      'Universal Commerce Protocol (UCP) is Google\'s open standard for AI agent capability discovery. It publishes a machine-readable JSON manifest at /.well-known/ucp/manifest.json that allows AI shopping agents to discover product catalogs, pricing, inventory, and checkout capabilities without requiring traditional search or human-mediated browsing.',
    inDefinedTermSet: `${SITE_URL}/hub/universal-commerce-protocol#termset`,
    url: `${SITE_URL}/hub/universal-commerce-protocol`,
  },
}

const ucpSchemas = [
  definedTermSchema,
  buildFAQSchema(ucpFAQs),
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hub', url: '/hub' },
    { name: 'Universal Commerce Protocol', url: '/hub/universal-commerce-protocol' },
  ]),
]

const ucpManifestExample = `{
  "version": "2026-01",
  "merchant": {
    "name": "Example Store",
    "id": "https://example.com/#merchant",
    "url": "https://example.com"
  },
  "capabilities": {
    "browse": true,
    "cart": true,
    "checkout": true,
    "returns": true,
    "realtime_inventory": true
  },
  "transports": {
    "rest": {
      "base_url": "https://example.com/api/ucp/v1",
      "auth": "bearer"
    },
    "mcp": {
      "endpoint": "https://example.com/mcp",
      "version": "2024-11-05"
    },
    "a2a": {
      "agent_card": "https://example.com/.well-known/agent.json"
    }
  },
  "catalog": {
    "feed_url": "https://example.com/api/ucp/v1/products",
    "format": "json",
    "currency": "USD",
    "product_count": 4821
  },
  "discovery": {
    "search_endpoint": "https://example.com/api/ucp/v1/search",
    "filter_support": ["price", "category", "availability", "brand"]
  }
}`

export default function UCPHubPage() {
  return (
    <>
      <JsonLd data={ucpSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-ucp">UCP</span>
            <span className="badge">Hub Resource</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-6">
            Universal Commerce Protocol (UCP)
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Universal Commerce Protocol (UCP) is Google&apos;s open standard for AI agent capability
            discovery. It publishes a machine-readable manifest at{' '}
            <code className="text-[var(--color-accent)] bg-[var(--color-surface)] px-1.5 py-0.5 rounded text-base">
              /.well-known/ucp/manifest.json
            </code>{' '}
            that lets AI shopping agents discover your product catalog, pricing, and checkout
            capabilities without traditional search.
          </p>
        </div>
      </section>

      {/* What is UCP */}
      <section className="section" id="what-is-ucp">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">What is UCP?</h2>
          <div className="prose-asc">
            <p>
              Universal Commerce Protocol (UCP) represents a fundamental shift in how AI agents
              interact with businesses online. Developed by Google and released as an open standard,
              UCP moves beyond the traditional search paradigm — where a human types a query, gets
              blue links, and manually visits websites — toward a fully machine-mediated discovery
              layer where AI agents can programmatically understand and interact with your entire
              commerce infrastructure.
            </p>
            <p>
              When an AI shopping agent like Google&apos;s AI Mode or a custom enterprise purchasing
              agent needs to find a product, it no longer needs to scrape web pages or rely on
              keyword-matched search results. Instead, it fetches your UCP manifest from a
              standardized location, reads your declared capabilities in seconds, and knows
              immediately what you sell, how to search your catalog, what checkout flows you support,
              and which API transports you accept for machine-to-machine transactions.
            </p>
            <p>
              This is not merely an API specification — it is a complete capability declaration
              system. Your UCP manifest tells AI agents whether you support real-time inventory
              queries, whether you can handle cart operations via REST or MCP, whether you have
              Agent-to-Agent (A2A) protocol endpoints for autonomous multi-step purchasing, and what
              your authentication requirements are. In a world where 50% of commercial search traffic
              is projected to shift to AI channels by 2026, a missing or malformed UCP manifest means
              AI agents cannot find you — period.
            </p>
            <p>
              UCP is designed to be progressive. Merchants can start with a minimal manifest
              declaring basic product feed access and add transports, capabilities, and real-time
              features incrementally. The protocol is versioned, schema-validated, and designed for
              zero-downtime updates. It integrates natively with Google Merchant Center and is
              expected to become a formal ranking signal in Google AI Mode commerce results.
            </p>
          </div>
        </div>
      </section>

      {/* How UCP Works */}
      <section className="section bg-[var(--color-surface)]" id="how-ucp-works">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            How UCP Works: Capability Discovery Flow
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            UCP operates on a simple discovery-first architecture. AI agents follow a predictable
            four-step flow every time they need to interact with a merchant.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                step: '01',
                title: 'Manifest Fetch',
                desc: 'Agent fetches /.well-known/ucp/manifest.json — always the first step',
                color: '#3b82f6',
              },
              {
                step: '02',
                title: 'Capability Parse',
                desc: 'Agent reads supported transports, catalog endpoint, and checkout capability',
                color: '#8b5cf6',
              },
              {
                step: '03',
                title: 'Catalog Query',
                desc: 'Agent searches product catalog via declared endpoint with structured filters',
                color: '#10b981',
              },
              {
                step: '04',
                title: 'Transaction',
                desc: 'Agent initiates cart and checkout via the supported transport (REST, MCP, or A2A)',
                color: '#f59e0b',
              },
            ].map((item) => (
              <div key={item.step} className="card p-5">
                <div className="text-3xl font-black mb-2" style={{ color: item.color }}>
                  {item.step}
                </div>
                <div className="font-bold text-[var(--color-text)] mb-2">{item.title}</div>
                <div className="text-sm text-[var(--color-muted)]">{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">
            Example UCP Manifest
          </h3>
          <div className="schema-viewer">
            <pre className="text-sm leading-relaxed overflow-x-auto">
              <code>{ucpManifestExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* UCP Transports */}
      <section className="section" id="ucp-transports">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">UCP Transports</h2>
          <p className="text-[var(--color-muted)] mb-8">
            UCP supports three transport protocols, giving AI agents flexible ways to interact with
            your commerce infrastructure. Most enterprises implement REST first, then add MCP and A2A
            as their agentic readiness matures.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'REST',
                subtitle: 'Standard HTTP/JSON API',
                description:
                  'The baseline UCP transport. AI agents interact with your commerce backend via standard HTTP endpoints — product search, cart management, order placement. REST is universally supported and the fastest to implement.',
                badge: 'Start Here',
                badgeColor: '#10b981',
                features: [
                  'Standard HTTP GET/POST',
                  'JSON request/response',
                  'Bearer token auth',
                  'OpenAPI schema compatible',
                ],
              },
              {
                name: 'MCP',
                subtitle: 'Model Context Protocol',
                description:
                  "Anthropic's protocol for AI tool integration. MCP transports expose your commerce operations as structured tools that AI agents (Claude, GPT, Gemini) can call natively within their reasoning chains — enabling complex, multi-step shopping flows.",
                badge: 'AI-Native',
                badgeColor: '#8b5cf6',
                features: [
                  'Tool-based commerce primitives',
                  'Streaming support',
                  'Structured error handling',
                  'Claude + GPT + Gemini compatible',
                ],
              },
              {
                name: 'A2A',
                subtitle: 'Agent-to-Agent Protocol',
                description:
                  "Google's protocol for autonomous multi-agent commerce. A2A enables AI agents to collaborate — a shopping agent delegates payment to a payment agent, which coordinates with an inventory agent — all without human intervention.",
                badge: 'Advanced',
                badgeColor: '#f59e0b',
                features: [
                  'Multi-agent orchestration',
                  'Agent Card discovery',
                  'Task-based commerce flows',
                  'Autonomous delegation',
                ],
              },
            ].map((transport) => (
              <div key={transport.name} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-black text-[var(--color-text)]">{transport.name}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{transport.subtitle}</p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ color: transport.badgeColor, background: `${transport.badgeColor}20` }}
                  >
                    {transport.badge}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)] mb-4">{transport.description}</p>
                <ul className="space-y-1.5">
                  {transport.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-[var(--color-surface)]" id="ucp-benefits">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">
            Benefits of UCP Implementation
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Agent Discovery',
                stat: '100%',
                desc: 'AI agents can only purchase from merchants they can discover. A published UCP manifest makes your entire catalog machine-readable across Google AI Mode, ChatGPT, and every agent built on open standards.',
                color: '#3b82f6',
              },
              {
                title: 'Faster Commerce',
                stat: '< 2s',
                desc: 'UCP eliminates the multi-page browsing flow. AI agents go from discovery to cart in seconds — a direct product search, immediate inventory check, instant checkout initiation. No abandoned carts from friction.',
                color: '#10b981',
              },
              {
                title: 'Future-Ready',
                stat: '3 years',
                desc: 'UCP is designed for the agentic commerce decade. Implementing now means your infrastructure is ready for every new AI shopping agent, every new protocol version, and every enterprise procurement workflow.',
                color: '#8b5cf6',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="card p-6 text-center">
                <div
                  className="text-4xl font-black mb-2"
                  style={{ color: benefit.color }}
                >
                  {benefit.stat}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">{benefit.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Teaser */}
      <section className="section" id="ucp-implementation">
        <div className="container max-w-4xl">
          <div className="card p-8 border-l-4 border-[var(--color-accent)]">
            <span className="badge mb-4">Implementation Service</span>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Ready to Implement UCP?
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              Adam Silva Consulting delivers full UCP implementations — manifest authoring, REST/MCP/A2A
              transport setup, catalog integration, and Google Merchant Center alignment. Most clients
              have a production-ready UCP manifest within 2 weeks. Full three-transport implementation
              completes in 4-6 weeks as part of the 16-week Agentic Readiness program.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services/ucp-implementation" className="btn-primary">
                View UCP Implementation Service
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get a Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="section bg-[var(--color-surface)]" id="ucp-resources">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Related Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Protocol Reference',
                title: 'UCP Protocol Deep Dive',
                desc: 'Full manifest schema, endpoint specs, and transport documentation',
                href: '/protocols/ucp',
                badge: 'Reference',
              },
              {
                label: 'Insight Article',
                title: 'UCP, ACP & AP2: The Complete Guide',
                desc: 'How all three agentic commerce protocols work together',
                href: '/insights/agentic-commerce-protocols-ucp-acp-ap2',
                badge: 'Article',
              },
              {
                label: 'Service',
                title: 'UCP Implementation',
                desc: 'Done-for-you UCP manifest and transport setup for your platform',
                href: '/services/ucp-implementation',
                badge: 'Service',
              },
            ].map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="card p-5 hover:border-[var(--color-accent)] transition-colors group"
              >
                <span className="badge text-xs mb-3 block w-fit">{resource.badge}</span>
                <h3 className="font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">{resource.desc}</p>
                <ArrowRight
                  size={14}
                  className="mt-3 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Universal Commerce Protocol FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {ucpFAQs.map((faq, i) => (
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
            Start Your UCP Implementation
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            AI agents can&apos;t discover merchants without a UCP manifest. Get yours live in 2 weeks.
          </p>
          <Link href="/contact" className="btn-primary">
            Talk to Adam About UCP
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
