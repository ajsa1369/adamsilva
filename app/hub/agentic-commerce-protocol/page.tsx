import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Agentic Commerce Protocol (ACP) Hub — Complete Resource Guide',
  description:
    "Everything you need to understand and implement Agentic Commerce Protocol (ACP). OpenAI's protocol for AI agent checkout execution — built on Stripe's Secure Payment Token framework.",
  alternates: {
    canonical: `${SITE_URL}/hub/agentic-commerce-protocol`,
  },
  openGraph: {
    title: 'Agentic Commerce Protocol (ACP) Hub — Complete Resource Guide',
    description:
      "The definitive resource for Agentic Commerce Protocol (ACP) — OpenAI's standard for AI agent-initiated checkout.",
    url: `${SITE_URL}/hub/agentic-commerce-protocol`,
  },
}

const acpFAQs = [
  {
    question: 'What is Agentic Commerce Protocol (ACP)?',
    answer:
      "Agentic Commerce Protocol (ACP) is OpenAI's protocol enabling AI agents to complete purchases on behalf of users. Built on Stripe's Secure Payment Token (SPT) framework, ACP allows ChatGPT and other AI agents to negotiate, confirm, and settle transactions entirely programmatically.",
  },
  {
    question: 'What is a Stripe Secure Payment Token (SPT)?',
    answer:
      "A Stripe Secure Payment Token (SPT) is an encrypted, single-use payment credential that an AI agent holds on behalf of a user. When the user authorizes ChatGPT or another ACP-compatible agent to make purchases, Stripe issues an SPT that the agent can use to complete transactions without exposing raw card data. The token is scoped to specific merchant categories, spending limits, and time windows.",
  },
  {
    question: 'Is ACP the same as ChatGPT Instant Checkout?',
    answer:
      "ChatGPT Instant Checkout is the consumer-facing feature built on top of ACP. The Agentic Commerce Protocol is the underlying technical specification that defines how ChatGPT communicates with merchants during checkout — the product feed format, cart creation API, payment token presentation, and order confirmation flow. ACP is the protocol; Instant Checkout is the user experience.",
  },
  {
    question: 'Do I need Stripe to implement ACP?',
    answer:
      "The current ACP specification is tightly integrated with Stripe's SPT framework for payment handling. However, ACP-compatible implementations can use other payment processors for the underlying charge — the SPT is the AI-layer abstraction that sits above your existing payment infrastructure. Most merchants implement ACP by adding Stripe as a secondary payment processor to handle agent-initiated transactions.",
  },
  {
    question: 'How does ACP differ from traditional checkout?',
    answer:
      "Traditional checkout requires a human to navigate product pages, add items to a cart, enter shipping and payment details, and click a confirm button. ACP eliminates every manual step. An ACP-enabled AI agent receives product recommendations, creates a cart via API, presents a pre-authorized SPT for payment, confirms shipping from a stored profile, and places the order — in under 10 seconds, without the user ever visiting your website.",
  },
]

const definedTermSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/hub/agentic-commerce-protocol#termset`,
  name: 'Agentic Commerce Protocol (ACP) Definitions',
  publisher: { '@id': ORG_ID },
  hasDefinedTerm: {
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/hub/agentic-commerce-protocol#term`,
    name: 'Agentic Commerce Protocol',
    alternateName: 'ACP',
    termCode: 'ACP',
    description:
      "Agentic Commerce Protocol (ACP) is OpenAI's protocol enabling AI agents to complete purchases on behalf of users. Built on Stripe's Secure Payment Token (SPT) framework, ACP allows ChatGPT and other AI agents to negotiate, confirm, and settle transactions entirely programmatically without requiring human navigation of checkout flows.",
    inDefinedTermSet: `${SITE_URL}/hub/agentic-commerce-protocol#termset`,
    url: `${SITE_URL}/hub/agentic-commerce-protocol`,
  },
}

const acpSchemas = [
  definedTermSchema,
  buildFAQSchema(acpFAQs),
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hub', url: '/hub' },
    { name: 'Agentic Commerce Protocol', url: '/hub/agentic-commerce-protocol' },
  ]),
]

const acpCheckoutFlow = `// ACP Checkout Flow — Step by Step

// 1. Agent fetches product catalog
GET /api/acp/v1/products?q=wireless+headphones&limit=5
Authorization: Bearer {merchant_api_key}

// 2. Agent creates a cart
POST /api/acp/v1/carts
{
  "items": [
    { "product_id": "prod_abc123", "quantity": 1 }
  ],
  "agent_id": "chatgpt-shopping-agent",
  "buyer_locale": "en-US"
}

// Response: Cart with price breakdown
{
  "cart_id": "cart_xyz789",
  "subtotal": 24900,
  "tax": 1992,
  "shipping": 0,
  "total": 26892,
  "currency": "USD"
}

// 3. Agent presents Stripe SPT for payment
POST /api/acp/v1/carts/cart_xyz789/checkout
{
  "payment": {
    "type": "stripe_spt",
    "token": "spt_live_xxxxxxxxxx"
  },
  "shipping": {
    "profile_id": "ship_profile_abc",
    "method": "standard"
  }
}

// 4. Order confirmation
{
  "order_id": "ord_9876",
  "status": "confirmed",
  "estimated_delivery": "2026-03-04",
  "confirmation_email": "buyer@example.com"
}`

export default function ACPHubPage() {
  return (
    <>
      <JsonLd data={acpSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-acp">ACP</span>
            <span className="badge">Hub Resource</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-6">
            Agentic Commerce Protocol (ACP)
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Agentic Commerce Protocol (ACP) is OpenAI&apos;s protocol enabling AI agents to complete
            purchases on behalf of users. Built on Stripe&apos;s Secure Payment Token (SPT) framework,
            ACP allows ChatGPT and other AI agents to negotiate, confirm, and settle transactions
            entirely programmatically.
          </p>
        </div>
      </section>

      {/* What is ACP */}
      <section className="section" id="what-is-acp">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">What is ACP?</h2>
          <div className="prose-asc">
            <p>
              Agentic Commerce Protocol (ACP) is OpenAI&apos;s answer to the question: once an AI agent
              has discovered a product (via UCP), how does it actually buy it? ACP defines the full
              checkout execution layer — the structured APIs, authentication flows, and payment
              primitives that allow AI agents to complete purchases programmatically, without
              requiring human navigation of checkout pages, form fills, or CAPTCHA challenges.
            </p>
            <p>
              At the heart of ACP is the Stripe Secure Payment Token (SPT). When a user authorizes
              ChatGPT (or any ACP-compatible agent) to make purchases on their behalf, Stripe issues
              a cryptographically signed, scoped payment token. This token encodes the user&apos;s
              pre-authorized spending limits, permitted merchant categories, and time validity window.
              The AI agent presents this token at checkout — the merchant validates it with Stripe and
              completes the charge — without the user ever entering their card number.
            </p>
            <p>
              ACP is not just a payment protocol — it&apos;s a complete commerce execution specification.
              It defines how agents ingest product feeds, query real-time inventory and pricing,
              create shopping carts via structured API calls, apply discount codes and loyalty
              rewards, select shipping methods from pre-stored profiles, and receive structured order
              confirmations that can be parsed, stored, and acted upon by downstream agents.
            </p>
            <p>
              For merchants, ACP compliance means your checkout flow is accessible to every AI
              shopping agent built on OpenAI&apos;s ecosystem — including ChatGPT Instant Checkout,
              enterprise procurement agents, and autonomous resupply systems. With ChatGPT alone
              serving over 400 million weekly active users as of early 2026, ACP non-compliance is an
              increasingly costly blind spot.
            </p>
          </div>
        </div>
      </section>

      {/* How ACP Works */}
      <section className="section bg-[var(--color-surface)]" id="how-acp-works">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            How ACP Works: The Agent Checkout Flow
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            ACP defines a four-step checkout execution flow. Every ACP-compatible merchant exposes
            these endpoints, and every ACP-compatible agent follows this sequence.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                step: '01',
                title: 'Catalog Ingest',
                desc: 'Agent queries your product feed for relevant items matching user intent',
                color: '#3b82f6',
              },
              {
                step: '02',
                title: 'Cart Creation',
                desc: 'Agent creates a server-side cart with selected items, triggering real-time pricing',
                color: '#8b5cf6',
              },
              {
                step: '03',
                title: 'SPT Payment',
                desc: "Agent presents user's pre-authorized Stripe Secure Payment Token at checkout",
                color: '#10b981',
              },
              {
                step: '04',
                title: 'Confirmation',
                desc: 'Merchant returns structured order confirmation — parsed and stored by the agent',
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
            ACP Checkout API Example
          </h3>
          <div className="schema-viewer">
            <pre className="text-sm leading-relaxed overflow-x-auto">
              <code>{acpCheckoutFlow}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ACP vs Traditional Checkout */}
      <section className="section" id="acp-vs-traditional">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">
            ACP vs Traditional Checkout
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 pr-6 font-bold text-[var(--color-text)]">Factor</th>
                  <th className="text-left py-3 pr-6 font-bold text-[var(--color-muted)]">
                    Traditional Checkout
                  </th>
                  <th className="text-left py-3 font-bold text-[var(--color-accent)]">
                    ACP Agent Checkout
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Time to complete', '3-8 minutes (manual)', '< 10 seconds (automated)'],
                  ['Human required', 'Yes — every step', 'No — fully autonomous'],
                  ['Abandoned cart risk', 'High (70% avg)', 'Near zero'],
                  ['Payment method', 'Card entry per transaction', 'Pre-authorized SPT (zero friction)'],
                  ['Cart persistence', 'Session-based (lost on close)', 'Server-side (persistent)'],
                  ['Order confirmation', 'Email HTML (unstructured)', 'Structured JSON (machine-readable)'],
                  ['Multi-merchant purchasing', 'Requires separate sessions', 'Single agent orchestration'],
                  ['Loyalty / discount application', 'Manual code entry', 'Automatic via agent profile'],
                ].map(([factor, traditional, acp]) => (
                  <tr key={factor}>
                    <td className="py-3 pr-6 font-medium text-[var(--color-text)]">{factor}</td>
                    <td className="py-3 pr-6 text-[var(--color-muted)]">{traditional}</td>
                    <td className="py-3 text-[#10b981] font-medium">{acp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-[var(--color-surface)]" id="acp-benefits">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">
            Benefits of ACP Integration
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'ChatGPT Instant Checkout',
                stat: '400M+',
                statLabel: 'ChatGPT weekly users',
                desc: 'ACP compliance makes your products purchasable through ChatGPT Instant Checkout — reaching hundreds of millions of users without any additional marketing spend.',
                color: '#3b82f6',
              },
              {
                title: 'Zero Abandonment',
                stat: '< 2%',
                statLabel: 'agent checkout abandonment',
                desc: "AI agents don't get distracted, run out of patience, or encounter UX friction. ACP-initiated checkouts complete at rates traditional e-commerce can't approach.",
                color: '#10b981',
              },
              {
                title: 'Enterprise Procurement',
                stat: '$8.4T',
                statLabel: 'B2B e-commerce market',
                desc: 'Enterprise procurement agents are the fastest-growing ACP use case. ACP compliance means your catalog is accessible to autonomous corporate purchasing systems.',
                color: '#8b5cf6',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="card p-6 text-center">
                <div className="text-4xl font-black mb-1" style={{ color: benefit.color }}>
                  {benefit.stat}
                </div>
                <div className="text-xs text-[var(--color-muted-2)] mb-3">{benefit.statLabel}</div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">{benefit.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Teaser */}
      <section className="section" id="acp-implementation">
        <div className="container max-w-4xl">
          <div className="card p-8 border-l-4 border-[var(--color-accent)]">
            <span className="badge mb-4">Implementation Service</span>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Ready to Enable ACP Checkout?
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              Adam Silva Consulting implements the complete ACP stack — product feed configuration,
              cart and checkout API endpoints, Stripe SPT integration, and ChatGPT Merchant
              Center enrollment. We handle the technical complexity so your team can focus on
              inventory and fulfillment. Most ACP integrations go live within 4-6 weeks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services/acp-integration" className="btn-primary">
                View ACP Integration Service
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Schedule a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--color-surface)]" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Agentic Commerce Protocol FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {acpFAQs.map((faq, i) => (
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
            Enable AI Agent Checkout Today
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            ACP is how AI agents buy from merchants. If you&apos;re not ACP-compliant, agents can&apos;t
            purchase your products — no matter how good your catalog is.
          </p>
          <Link href="/contact" className="btn-primary">
            Talk to Adam About ACP
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
