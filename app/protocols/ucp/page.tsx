import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildHowToSchema } from '@/lib/schemas/service'
import {
  organizationSchema,
  buildBreadcrumbSchema,
  SITE_URL,
  ORG_ID,
} from '@/lib/schemas/organization'
import { adamSilvaSchema } from '@/lib/schemas/person'

export const metadata: Metadata = {
  title:
    'UCP — Universal Commerce Protocol: The AI Agent Discovery Standard | Adam Silva Consulting',
  description:
    'UCP (Universal Commerce Protocol) is Google\'s open standard published at /.well-known/ucp/manifest.json. Learn how AI agents use UCP to discover merchants, what version 2026-01 requires, and how to implement it.',
  alternates: {
    canonical: 'https://www.adamsilvaconsulting.com/protocols/ucp',
  },
}

const ucpFAQs = [
  {
    question: 'What is Universal Commerce Protocol (UCP)?',
    answer:
      'Universal Commerce Protocol (UCP) is Google\'s open standard for AI agent commerce discovery. It is a JSON manifest published at /.well-known/ucp/manifest.json that tells AI shopping agents — including Google AI Mode, Perplexity Shopping, and ChatGPT — what your business sells, what capabilities you offer, and which transports (REST, MCP, A2A) you support for machine-to-machine interaction.',
  },
  {
    question: 'Who governs UCP and what is the current version?',
    answer:
      'UCP is governed by Google as an open standard. The current version is 2026-01, which introduced mandatory capability profiles, transport bindings (REST, MCP, A2A), and structured product/service definitions. Google coordinates with the broader AI commerce ecosystem including OpenAI, Anthropic, and Perplexity to ensure cross-platform agent compatibility.',
  },
  {
    question: 'What transport bindings does UCP support?',
    answer:
      'UCP v2 supports three transport bindings: REST API (standard HTTPS endpoints, the most widely compatible), MCP (Model Context Protocol, for deep tool-use integration with Claude and other LLMs), and A2A (Agent-to-Agent protocol, for direct AI-to-AI negotiation without human intermediary). Merchants declare supported transports in their manifest and agents select the most capable transport available.',
  },
  {
    question: 'How do AI agents use UCP to find and transact with merchants?',
    answer:
      'When a user issues a commerce intent to an AI agent (e.g., "buy running shoes under $150"), the agent performs UCP discovery by fetching /.well-known/ucp/manifest.json from candidate merchants. It reads capability profiles to confirm the merchant sells relevant products, checks transport bindings to understand how to interact, and then hands off to ACP for checkout execution and AP2 for cryptographic trust verification.',
  },
  {
    question: 'What does it cost to implement UCP?',
    answer:
      'The core UCP manifest — a JSON file served at /.well-known/ucp/manifest.json — has zero licensing cost; UCP is an open standard. Implementation costs come from engineering time to define capability profiles, configure transport endpoints, and integrate with your product catalog or service API. Adam Silva Consulting\'s UCP Implementation service handles the full deployment including manifest creation, capability profiling, transport configuration, and AI agent discovery verification.',
  },
]

const ucpHowToSteps = [
  {
    name: 'Create the manifest file at /.well-known/ucp/manifest.json',
    text:
      'Create the directory /.well-known/ucp/ in your web root and publish a manifest.json file. The manifest must declare ucp_version (currently "2026-01"), organization metadata (name, url, logo, description), primary_capability, and a capabilities array. Configure your server to serve this path with Content-Type: application/json and appropriate CORS headers to allow AI agent crawlers.',
  },
  {
    name: 'Define capability profiles',
    text:
      'For each product or service your business offers to AI agents, add an entry to the capabilities array. Each capability requires: type ("product" or "service"), a unique id, name, description, price object with amount and currency, a canonical url, and which protocol handles checkout (typically "ACP"). Capability definitions enable agents to evaluate your offerings against user intent without fetching individual product pages.',
  },
  {
    name: 'Configure REST, MCP, and A2A transport bindings',
    text:
      'Declare your supported transports in the manifest\'s "transports" array. For REST: expose a product/service catalog API with standard HTTP endpoints and document them in your manifest. For MCP: implement a Model Context Protocol server that exposes your commerce tools (search, quote, add-to-cart) and publish the MCP server URL. For A2A: implement an Agent-to-Agent endpoint that can receive and respond to structured negotiation requests from peer AI agents.',
  },
  {
    name: 'Test with AI agent discovery tools',
    text:
      'Validate your UCP manifest using the W3C well-known URL validator and Google\'s Merchant Center agent preview (when available). Run curl -H "User-Agent: GoogleBot-Commerce" https://yourdomain.com/.well-known/ucp/manifest.json to confirm the manifest is publicly accessible. Verify JSON validity with a linter and confirm all required fields are present. Check that capability URLs resolve and that transport endpoints respond correctly to agent probe requests.',
  },
]

const techArticleSchema = {
  '@type': 'TechArticle',
  '@id': `${SITE_URL}/protocols/ucp#article`,
  headline: 'Universal Commerce Protocol (UCP) Technical Guide',
  name: 'Universal Commerce Protocol (UCP) Technical Guide',
  description:
    'A comprehensive technical guide to Universal Commerce Protocol (UCP) v2 — Google\'s open standard for AI agent commerce discovery. Covers manifest structure, capability profiles, REST/MCP/A2A transport bindings, and step-by-step implementation.',
  url: `${SITE_URL}/protocols/ucp`,
  author: { '@id': `${SITE_URL}/#adam-silva` },
  publisher: { '@id': ORG_ID },
  datePublished: '2025-06-01',
  dateModified: '2026-02-01',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: [
    { '@type': 'Thing', name: 'Universal Commerce Protocol', alternateName: 'UCP' },
    { '@type': 'Thing', name: 'AI Agent Discovery' },
    { '@type': 'Thing', name: 'Agentic Commerce' },
  ],
  mentions: [
    { '@type': 'SoftwareApplication', name: 'Google AI Mode' },
    { '@type': 'SoftwareApplication', name: 'Perplexity Shopping' },
    { '@type': 'SoftwareApplication', name: 'ChatGPT' },
    { '@type': 'SoftwareApplication', name: 'Model Context Protocol', alternateName: 'MCP' },
  ],
  proficiencyLevel: 'Expert',
}

const ucpHowToSchema = buildHowToSchema(
  'How to Implement UCP v2',
  'A step-by-step guide to implementing Universal Commerce Protocol version 2026-01 so AI agents can discover and transact with your business.',
  ucpHowToSteps,
  'P2D'
)

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Protocols', url: '/protocols' },
  { name: 'UCP', url: '/protocols/ucp' },
])

const pageSchemas = [
  { '@context': 'https://schema.org', '@graph': [
    techArticleSchema,
    ucpHowToSchema,
    buildFAQSchema(ucpFAQs),
    breadcrumbSchema,
    organizationSchema,
    adamSilvaSchema,
  ]},
]

const ucpManifestExample = `{
  // Required: protocol version — always "2026-01" for UCP v2
  "ucp_version": "2026-01",

  // Organization block: who you are
  "organization": {
    "name": "Acme Commerce Co.",
    "legal_name": "Acme Commerce Co. LLC",
    "url": "https://www.acmecommerce.com",
    "logo": "https://www.acmecommerce.com/logo.png",
    "description": "Premium outdoor gear and apparel.",
    "email": "agents@acmecommerce.com",
    "founded": "2018"
  },

  // What this business does — used for agent intent matching
  "primary_capability": "Outdoor Gear Retail",

  // Capabilities: one entry per product/service category
  "capabilities": [
    {
      "type": "product",              // "product" | "service"
      "id": "trail-running-shoes",    // unique slug
      "name": "Trail Running Shoes",
      "description": "Waterproof trail running shoes, sizes 6–15",
      "price": {
        "amount": "89.99",            // base/min price
        "currency": "USD"
      },
      "url": "https://www.acmecommerce.com/trail-running",
      "protocol": "ACP"              // checkout handled via ACP
    },
    {
      "type": "service",
      "id": "gear-consultation",
      "name": "Gear Fit Consultation",
      "description": "30-minute video call with a gear specialist",
      "price": { "amount": "0", "currency": "USD" },
      "url": "https://www.acmecommerce.com/consult",
      "protocol": "ACP"
    }
  ],

  // Checkout endpoints — used by ACP after UCP discovery
  "checkout": {
    "endpoint": "https://www.acmecommerce.com/api/acp/checkout",
    "negotiate_endpoint": "https://www.acmecommerce.com/api/acp/negotiate",
    "supported_payment_tokens": ["stripe_spt", "credit_card"]
  },

  // Transports: which protocols agents can use to talk to you
  // REST = standard HTTP; MCP = tool-use; A2A = agent-to-agent
  "transports": ["REST", "MCP", "A2A"],

  // Authority signals: topics you are an expert source on
  "authority": {
    "topics": ["trail running", "outdoor gear", "hiking equipment"],
    "primary_research_url": "https://www.acmecommerce.com/gear-guides",
    "glossary_url": "https://www.acmecommerce.com/glossary"
  }
}`

const transports = [
  {
    name: 'REST API',
    badge: 'Standard HTTP',
    badgeColor: '#3b82f6',
    description:
      'The most universally compatible transport. AI agents make standard HTTPS requests to your product catalog, negotiation, and checkout endpoints. Every AI commerce agent supports REST. Required for baseline UCP compliance.',
    whenToUse:
      'Start here. REST is the minimum viable transport and the one all agents fall back to when more advanced options are unavailable.',
    endpoint: 'GET /api/products\nPOST /api/acp/negotiate\nPOST /api/acp/checkout',
  },
  {
    name: 'MCP',
    badge: 'Model Context Protocol',
    badgeColor: '#8b5cf6',
    description:
      'Deep tool-use integration for agents built on LLMs (Claude, GPT, Gemini). Your commerce capabilities are exposed as callable tools — search_products, get_quote, add_to_cart, checkout — that the model can invoke natively during a conversation.',
    whenToUse:
      'When you want agents to perform complex multi-step shopping flows (compare, filter, negotiate) without manual API choreography. Required for ChatGPT Advanced Shopping mode.',
    endpoint: 'MCP Server: wss://api.acmecommerce.com/mcp\nTools: search_products, get_quote, checkout',
  },
  {
    name: 'A2A',
    badge: 'Agent-to-Agent',
    badgeColor: '#10b981',
    description:
      'Direct machine-to-machine negotiation between AI agents without human intermediary. The buying agent and your selling agent negotiate price, quantity, delivery terms, and payment in a structured dialogue governed by the A2A protocol spec.',
    whenToUse:
      'Enterprise B2B procurement, high-volume automated purchasing, and scenarios where human confirmation at each transaction is not required. Requires AP2 mandate infrastructure for authorization.',
    endpoint: 'A2A Endpoint: https://api.acmecommerce.com/a2a\nCapabilities: negotiate, quote, purchase',
  },
]

const useCases = [
  {
    agent: 'Google AI Mode',
    icon: 'G',
    color: '#4285F4',
    description:
      'When a user searches with Google AI Mode ("find trail shoes under $150 with waterproofing"), Google\'s commerce agent fetches your UCP manifest to confirm you sell trail shoes, checks pricing against the budget constraint, and surfaces your products in the AI-generated response with a direct checkout link.',
  },
  {
    agent: 'Perplexity Shopping',
    icon: 'P',
    color: '#20B2AA',
    description:
      'Perplexity\'s shopping agent uses UCP to build its merchant index. When users ask product comparison questions, Perplexity queries merchant manifests to find capability matches, reads your product definitions, and includes your offerings in comparative answers alongside citation links.',
  },
  {
    agent: 'ChatGPT Plugins / Actions',
    icon: 'C',
    color: '#10a37f',
    description:
      'ChatGPT commerce actions use UCP manifest data to register your store as an available commerce action. The capability profiles define which products the plugin exposes, and the MCP transport binding enables deep tool-use for complex shopping workflows including size selection and gift wrapping.',
  },
  {
    agent: 'Custom AI Agents',
    icon: 'A',
    color: '#f59e0b',
    description:
      'Enterprise procurement agents built on Anthropic Claude, Google Gemini, or open-source models can discover your capabilities via UCP and automate purchasing for recurring orders. The A2A transport enables these agents to negotiate terms and execute transactions without per-order human approval.',
  },
]

export default function UCPPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="container py-3">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[var(--color-muted-2)]">/</li>
            <li>
              <Link href="/protocols" className="hover:text-[var(--color-accent)] transition-colors">
                Protocols
              </Link>
            </li>
            <li aria-hidden="true" className="text-[var(--color-muted-2)]">/</li>
            <li aria-current="page" className="font-semibold text-[var(--color-text)]">
              UCP
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="section gradient-hero"
        aria-labelledby="ucp-hero-heading"
      >
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-ucp">UCP</span>
              <span className="text-sm text-[var(--color-muted)]">Governed by Google</span>
              <span className="text-sm text-[var(--color-muted-2)]">&middot;</span>
              <span className="text-sm text-[var(--color-muted)]">Version 2026-01</span>
            </div>
            <h1
              id="ucp-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              Universal Commerce Protocol (UCP): The AI Agent Discovery Standard
            </h1>
            <div
              className="speakable-answer card p-5 border-l-4 border-[var(--color-accent)] bg-[var(--color-surface)]"
              aria-label="Quick answer"
            >
              <p className="text-[var(--color-text)] leading-relaxed">
                UCP is Google&apos;s open standard for AI agent commerce discovery. A JSON manifest
                at <code className="font-mono text-sm bg-[var(--color-surface-2)] px-1.5 py-0.5 rounded">/.well-known/ucp/manifest.json</code> tells
                every AI shopping agent — Google AI Mode, Perplexity, ChatGPT — what your business sells,
                what you can do, and how agents should interact with you. Without it, AI agents cannot
                find or transact with your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is UCP */}
      <section className="section" aria-labelledby="what-is-ucp-heading">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Protocol Overview</span>
          <h2
            id="what-is-ucp-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-6"
          >
            What is UCP?
          </h2>
          <div className="prose-asc space-y-5">
            <p>
              Universal Commerce Protocol (UCP) is Google&apos;s open standard for machine-readable
              merchant capability discovery. Published as a JSON file at the well-known URL
              path <code>/.well-known/ucp/manifest.json</code>, the UCP manifest is the
              first document AI shopping agents fetch when evaluating whether a merchant can
              fulfill a user&apos;s commerce intent. It functions like a business card written
              specifically for machines — not humans.
            </p>
            <p>
              When a user tells Google AI Mode to &ldquo;find a SaaS tool for project management
              under $50/month,&rdquo; the agent does not browse web pages. It queries merchant
              manifests. Your UCP manifest defines your capability profiles — structured
              descriptions of every product or service you offer to AI agents — along with
              pricing, canonical URLs, and which downstream protocol (ACP) handles the actual
              checkout. AI agents match user intent against capability profiles to determine
              relevance, then surface your offerings in the AI-generated response.
            </p>
            <p>
              Version 2026-01, the current release, introduced three major additions: mandatory
              transport bindings (REST, MCP, and A2A), structured authority signals for topic
              expertise, and tighter integration with ACP and AP2 via the checkout configuration
              block. Merchants implementing UCP v2 are indexed by Google AI Mode, Perplexity
              Shopping, and any third-party AI agent that follows the UCP discovery specification.
              Merchants without a valid UCP manifest are, from the agent&apos;s perspective,
              nonexistent.
            </p>
          </div>
        </div>
      </section>

      {/* UCP Manifest Structure */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="manifest-structure-heading"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="badge mb-4">Specification</span>
            <h2
              id="manifest-structure-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-2"
            >
              UCP Manifest Structure
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              A complete UCP v2 manifest with annotations explaining each field and its
              purpose for AI agent discovery.
            </p>
            <div className="schema-viewer p-5">
              <pre className="text-[var(--color-text)] whitespace-pre overflow-x-auto leading-relaxed">
                <code>{ucpManifestExample}</code>
              </pre>
            </div>
            <p className="text-sm text-[var(--color-muted)] mt-4">
              Serve this file at{' '}
              <code className="font-mono text-xs bg-[var(--color-surface-2)] px-1.5 py-0.5 rounded">
                /.well-known/ucp/manifest.json
              </code>{' '}
              with <code className="font-mono text-xs bg-[var(--color-surface-2)] px-1.5 py-0.5 rounded">Content-Type: application/json</code> and
              public read access. No authentication required on this endpoint — AI agent crawlers
              must be able to fetch it without credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Transport Bindings */}
      <section className="section" aria-labelledby="transport-bindings-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Transport Layer</span>
            <h2
              id="transport-bindings-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              UCP Transport Bindings
            </h2>
            <p className="text-[var(--color-muted)]">
              UCP v2 supports three transport protocols. Declare which ones you support in
              the manifest&apos;s <code className="font-mono text-sm">transports</code> array.
              Agents select the most capable transport available.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {transports.map((t) => (
              <div key={t.name} className="card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-bold text-xl"
                    style={{ color: t.badgeColor }}
                  >
                    {t.name}
                  </span>
                </div>
                <span
                  className="badge mb-4 self-start text-xs"
                  style={{
                    background: `color-mix(in srgb, ${t.badgeColor} 15%, transparent)`,
                    color: t.badgeColor,
                  }}
                >
                  {t.badge}
                </span>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 flex-1">
                  {t.description}
                </p>
                <div className="mt-auto">
                  <p className="text-xs font-semibold text-[var(--color-muted-2)] mb-2 uppercase tracking-wide">
                    When to use
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mb-4 leading-relaxed">
                    {t.whenToUse}
                  </p>
                  <div className="schema-viewer p-3">
                    <pre className="text-xs text-[var(--color-muted)] whitespace-pre-wrap leading-relaxed">
                      <code>{t.endpoint}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation HowTo */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="implementation-heading"
      >
        <div className="container max-w-3xl">
          <span className="badge mb-4">Implementation Guide</span>
          <h2
            id="implementation-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-2"
          >
            How to Implement UCP v2
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Four steps from zero to full AI agent discovery. Each step builds on the previous.
          </p>

          <ol className="space-y-6">
            {ucpHowToSteps.map((step, i) => (
              <li key={i} className="card p-6 flex gap-5">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: 'var(--color-accent)' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2 leading-snug">
                    {step.name}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section" aria-labelledby="use-cases-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Real-World Applications</span>
            <h2
              id="use-cases-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              UCP Use Cases by AI Agent
            </h2>
            <p className="text-[var(--color-muted)]">
              How the major AI commerce agents use your UCP manifest in practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div key={uc.agent} className="card p-6 flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: uc.color }}
                  aria-hidden="true"
                >
                  {uc.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2">{uc.agent}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="ucp-faq-heading"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="ucp-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              UCP Questions Answered
            </h2>
          </div>
          <div className="space-y-4">
            {ucpFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span
                    className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform flex-shrink-0 ml-4"
                    aria-hidden="true"
                  >
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
      <section className="section" aria-labelledby="ucp-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center card p-10">
            <span className="badge badge-ucp mb-6">UCP Implementation</span>
            <h2
              id="ucp-cta-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Implement UCP for Your Business
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              Adam Silva Consulting deploys complete UCP v2 manifests — capability profiles,
              transport bindings, and authority signals — so AI agents can discover and
              transact with your business. Includes integration with ACP and AP2.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/ucp-implementation" className="btn-primary">
                Implement UCP for My Business
              </Link>
              <Link href="/protocols" className="btn-secondary">
                Explore Full Protocol Stack
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
