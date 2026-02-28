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
    'ACP — Agentic Commerce Protocol: AI Checkout Execution | Adam Silva Consulting',
  description:
    'ACP (Agentic Commerce Protocol) is the OpenAI + Stripe standard enabling AI agents to execute checkout on behalf of users. Learn how ChatGPT Instant Checkout, Stripe Payment Tokens, and delegated payment authorization work.',
  alternates: {
    canonical: 'https://www.adamsilvaconsulting.com/protocols/acp',
  },
}

const acpFAQs = [
  {
    question: 'What is Agentic Commerce Protocol (ACP)?',
    answer:
      'Agentic Commerce Protocol (ACP) is the OpenAI and Stripe co-developed standard that enables AI agents to execute purchases on behalf of users. It defines how AI agents ingest merchant product feeds, negotiate transaction terms via a standardized API, obtain Stripe Payment Tokens (SPT) for delegated payment authorization, and confirm order completion. ACP is the standard powering ChatGPT Instant Checkout.',
  },
  {
    question: 'How does ChatGPT Instant Checkout use ACP?',
    answer:
      'When a ChatGPT user says "buy this for me," the GPT commerce agent fetches the merchant\'s ACP config at /.well-known/acp/config.json to understand checkout capabilities. It then calls the /api/acp/negotiate endpoint to select a product and price, requests a Stripe Payment Token (SPT) using the user\'s pre-authorized payment method, and submits a checkout request. The merchant confirms the order via the checkout API and ChatGPT reports back to the user — all without the user visiting the merchant site.',
  },
  {
    question: 'What is a Stripe Payment Token (SPT) in the ACP context?',
    answer:
      'A Stripe Payment Token (SPT) is a single-use, merchant-scoped payment authorization issued by Stripe on behalf of a user who has pre-authorized AI agent purchases. The user authorizes the Stripe token once (in their ChatGPT or Stripe settings), and ACP-compatible merchants can charge it for approved transactions without additional user friction. The SPT includes amount limits, merchant restrictions, and expiry controls defined by the user\'s authorization policy.',
  },
  {
    question: 'Does ACP require Stripe? Can I use other payment processors?',
    answer:
      'ACP v1.0 natively supports Stripe Shared Payment Tokens as its primary delegated payment mechanism because Stripe is OpenAI\'s infrastructure partner for ChatGPT Instant Checkout. The config.json also includes a PayPal Express Checkout block for broader compatibility. Other payment processors can integrate with ACP via the negotiation API if they implement the SPT equivalent — though Stripe SPT integration provides the deepest ChatGPT Instant Checkout compatibility.',
  },
  {
    question: 'What does "delegated payment authorization" mean in ACP?',
    answer:
      'Delegated payment authorization means the user pre-authorizes an AI agent (like ChatGPT) to charge payments on their behalf within defined rules — maximum amount, approved merchant categories, time window. The agent holds a Stripe Payment Token that represents this authorization. When the agent finds a product the user wants, it exercises the delegated authority to complete the purchase without requiring the user to enter payment details at checkout time. The user receives a confirmation notification but does not manually approve each transaction.',
  },
]

const acpHowToSteps = [
  {
    name: 'Publish the ACP config at /.well-known/acp/config.json',
    text:
      'Create /.well-known/acp/config.json on your server. The config declares your ACP version, merchant identity, checkout configuration (instant checkout enabled, digital vs physical delivery, supported currencies), and payment method settings. Serve it publicly with Content-Type: application/json. This is the first endpoint ACP-compatible agents fetch when evaluating your checkout capabilities.',
  },
  {
    name: 'Build the product feed and negotiation endpoint',
    text:
      'Expose a structured product/service feed at a documented URL so agents can ingest your catalog. Implement the negotiation endpoint at /api/acp/negotiate (or your declared path). The negotiate endpoint accepts agent requests for service details, quotes, and availability confirmation. It returns a structured JSON response with a session token and price confirmation that the agent uses to proceed to checkout.',
  },
  {
    name: 'Integrate Stripe Shared Payment Tokens (SPT)',
    text:
      'Configure your Stripe integration to accept Shared Payment Tokens from ChatGPT and other ACP-enabled agents. In your Stripe dashboard, enable the Shared Payment Token feature and configure which AI agent platform IDs are permitted. In your checkout flow, add a payment type branch that handles "stripe_spt" token types — these bypass the usual card entry UI and charge the pre-authorized token directly.',
  },
  {
    name: 'Implement the checkout API endpoint',
    text:
      'Build the checkout API endpoint declared in your ACP config. It receives an agent checkout request containing: the session token from negotiation, the Stripe Payment Token (or other payment method), user shipping/contact info (for physical goods), and the agreed price. Process the payment via Stripe, fulfill the order, and return a structured confirmation response with order ID, fulfillment status, and receipt details.',
  },
  {
    name: 'Test the full ACP flow with agent simulation',
    text:
      'Use OpenAI\'s ACP test harness (available to Stripe Connect platform partners) to simulate agent checkout flows against your implementation. Validate: (1) config.json is accessible and parses correctly, (2) negotiate endpoint returns valid session tokens, (3) Stripe SPT charges process without errors, (4) checkout endpoint returns properly structured confirmations, (5) refund and dispute paths work correctly. Run a live test with a real ChatGPT Instant Checkout session before going to production.',
  },
]

const techArticleSchema = {
  '@type': 'TechArticle',
  '@id': `${SITE_URL}/protocols/acp#article`,
  headline: 'Agentic Commerce Protocol (ACP) Technical Guide',
  name: 'Agentic Commerce Protocol (ACP) Technical Guide',
  description:
    'A comprehensive technical guide to Agentic Commerce Protocol (ACP) v1.0 — the OpenAI and Stripe standard for AI agent checkout execution. Covers config structure, product feed ingestion, Stripe Payment Tokens, delegated authorization, and the full checkout flow.',
  url: `${SITE_URL}/protocols/acp`,
  author: { '@id': `${SITE_URL}/#adam-silva` },
  publisher: { '@id': ORG_ID },
  datePublished: '2025-06-01',
  dateModified: '2026-02-01',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: [
    { '@type': 'Thing', name: 'Agentic Commerce Protocol', alternateName: 'ACP' },
    { '@type': 'Thing', name: 'AI Agent Checkout' },
    { '@type': 'Thing', name: 'Delegated Payment Authorization' },
    { '@type': 'Thing', name: 'Stripe Payment Token', alternateName: 'SPT' },
  ],
  mentions: [
    { '@type': 'SoftwareApplication', name: 'ChatGPT Instant Checkout' },
    { '@type': 'Organization', name: 'OpenAI', url: 'https://openai.com' },
    { '@type': 'Organization', name: 'Stripe', url: 'https://stripe.com' },
  ],
  proficiencyLevel: 'Expert',
}

const acpHowToSchema = buildHowToSchema(
  'How to Integrate Agentic Commerce Protocol (ACP)',
  'A five-step guide to implementing ACP so AI agents like ChatGPT can execute purchases on your platform via Stripe Payment Tokens and delegated authorization.',
  acpHowToSteps,
  'P5D'
)

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Protocols', url: '/protocols' },
  { name: 'ACP', url: '/protocols/acp' },
])

const pageSchemas = [
  { '@context': 'https://schema.org', '@graph': [
    techArticleSchema,
    acpHowToSchema,
    buildFAQSchema(acpFAQs),
    breadcrumbSchema,
    organizationSchema,
    adamSilvaSchema,
  ]},
]

const acpConfigExample = `{
  // ACP protocol version
  "acp_version": "1.0",

  // Merchant identity
  "merchant": {
    "id": "acme-commerce",
    "name": "Acme Commerce Co.",
    "url": "https://www.acmecommerce.com",
    "category": "retail",           // merchant category code
    "subcategory": "outdoor_gear"
  },

  // Checkout capabilities
  "checkout_configuration": {
    "instant_checkout_enabled": true,     // enables ChatGPT Instant Checkout
    "guest_checkout_allowed": false,       // require account for physical goods
    "requires_shipping": true,
    "digital_delivery": false,
    "supported_currencies": ["USD", "CAD", "EUR"],
    "tax_handling": "merchant_calculated"
  },

  // Payment methods accepted
  "payment_methods": {
    "stripe": {
      "enabled": true,
      "shared_payment_tokens": true,      // accepts Stripe SPT from AI agents
      "supported_types": ["card", "link", "spt"]
    },
    "paypal": {
      "enabled": true,
      "express_checkout": true
    }
  },

  // What AI agents are permitted to do
  "agent_permissions": {
    "can_view_catalog": true,
    "can_request_quote": true,
    "can_initiate_checkout": true,
    "can_complete_purchase": false,       // user confirmation required
    "requires_user_confirmation": true,
    "max_transaction_amount": {
      "amount": "500",                    // per-transaction limit for agent checkout
      "currency": "USD"
    }
  },

  // Negotiation API configuration
  "negotiation": {
    "enabled": true,
    "endpoint": "/api/acp/negotiate",
    "supported_actions": [
      "get_product_details",
      "check_availability",
      "request_quote",
      "initiate_checkout"
    ],
    "response_format": "json",
    "timeout_seconds": 30
  },

  // Order fulfillment settings
  "fulfillment": {
    "type": "physical",
    "delivery_methods": ["standard_shipping", "express_shipping"],
    "estimated_delivery": "3-5 business days",
    "refund_policy": {
      "refund_window_days": 30,
      "conditions": "unopened_items"
    }
  },

  // Security requirements
  "security": {
    "tls_required": true,
    "minimum_tls_version": "1.3",
    "api_authentication": "bearer_token",
    "rate_limiting": {
      "requests_per_minute": 60,
      "requests_per_hour": 1000
    }
  }
}`

const checkoutFlowSteps = [
  {
    step: 1,
    label: 'Discovery',
    detail: 'Agent fetches /.well-known/ucp/manifest.json to confirm merchant capabilities and ACP support',
    color: '#3b82f6',
  },
  {
    step: 2,
    label: 'Negotiation',
    detail: 'Agent calls /api/acp/negotiate — sends intent, receives session token + confirmed price',
    color: '#8b5cf6',
  },
  {
    step: 3,
    label: 'Feed Ingestion',
    detail: 'Agent reads product feed to match user criteria: size, color, availability, price',
    color: '#f59e0b',
  },
  {
    step: 4,
    label: 'SPT Issuance',
    detail: 'Stripe issues a Shared Payment Token bound to the user\'s pre-authorized payment method',
    color: '#10b981',
  },
  {
    step: 5,
    label: 'Checkout Execution',
    detail: 'Agent submits checkout request with session token + SPT. Merchant charges and confirms.',
    color: '#ef4444',
  },
  {
    step: 6,
    label: 'Order Confirmed',
    detail: 'Merchant returns order ID + fulfillment status. Agent notifies user with receipt.',
    color: '#06b6d4',
  },
]

const integrations = [
  {
    name: 'ChatGPT Instant Checkout',
    gov: 'OpenAI',
    color: '#10a37f',
    description:
      'The primary ACP use case. Users authorize ChatGPT to shop on their behalf within defined spending limits. The GPT commerce agent discovers merchants via UCP, negotiates via ACP, and charges the user\'s pre-authorized Stripe payment method — completing purchases without site visits.',
    requirement: 'Requires: ACP config, Stripe SPT integration, negotiation API',
  },
  {
    name: 'Stripe Payment Tokens (SPT)',
    gov: 'Stripe',
    color: '#635bff',
    description:
      'SPT is Stripe\'s delegated payment credential. Users create a payment authorization policy in Stripe settings — setting merchant categories, per-transaction limits, and time windows. ACP merchants receive this token as payment and charge it via Stripe\'s standard API with a new payment_method_type of "shared_payment_token."',
    requirement: 'Requires: Stripe Connect platform integration, SPT beta access',
  },
  {
    name: 'Delegated Payment Authorization',
    gov: 'OpenAI + Stripe',
    color: '#8b5cf6',
    description:
      'The policy layer governing what AI agents are allowed to purchase. Users define authorization rules (spend limits, merchant categories, date ranges) that ACP enforces. Merchants check authorization claims in the SPT payload before processing. Non-compliant charges are rejected by Stripe at the token level.',
    requirement: 'Requires: AP2 mandate integration for enterprise-grade authorization',
  },
]

export default function ACPPage() {
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
              ACP
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="section gradient-hero"
        aria-labelledby="acp-hero-heading"
      >
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-acp">ACP</span>
              <span className="text-sm text-[var(--color-muted)]">OpenAI + Stripe</span>
              <span className="text-sm text-[var(--color-muted-2)]">&middot;</span>
              <span className="text-sm text-[var(--color-muted)]">Version 1.0</span>
            </div>
            <h1
              id="acp-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              Agentic Commerce Protocol (ACP): Enabling AI Agent Checkout
            </h1>
            <div
              className="speakable-answer card p-5 border-l-4 border-[#8b5cf6] bg-[var(--color-surface)]"
              aria-label="Quick answer"
            >
              <p className="text-[var(--color-text)] leading-relaxed">
                ACP is the OpenAI and Stripe standard that lets AI agents execute purchases on
                behalf of users. A config at{' '}
                <code className="font-mono text-sm bg-[var(--color-surface-2)] px-1.5 py-0.5 rounded">
                  /.well-known/acp/config.json
                </code>{' '}
                declares your checkout capabilities, Stripe Payment Tokens handle delegated
                payment, and ChatGPT Instant Checkout completes purchases without the user
                visiting your site. ACP is the execution layer of the agentic commerce stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is ACP */}
      <section className="section" aria-labelledby="what-is-acp-heading">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Protocol Overview</span>
          <h2
            id="what-is-acp-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-6"
          >
            What is ACP?
          </h2>
          <div className="prose-asc space-y-5">
            <p>
              Agentic Commerce Protocol (ACP) is the checkout execution standard co-developed
              by OpenAI and Stripe. Where UCP handles discovery — telling agents what you sell
              — ACP handles execution: the mechanics of how an AI agent actually completes a
              purchase on a user&apos;s behalf. It is the protocol powering ChatGPT Instant
              Checkout and any future AI-native commerce surface that Stripe powers.
            </p>
            <p>
              ACP works through three interlocking components. First, the{' '}
              <strong className="text-[var(--color-text)]">product feed</strong>: a structured
              catalog of your offerings that agents ingest to match products against user intent
              without browsing your site. Second, the{' '}
              <strong className="text-[var(--color-text)]">negotiation API</strong>: a
              standardized endpoint at <code>/api/acp/negotiate</code> where agents confirm
              product selection, price, and availability before committing to a transaction.
              Third, <strong className="text-[var(--color-text)]">Stripe Payment Tokens (SPT)</strong>:
              single-use payment credentials that carry the user&apos;s pre-authorized payment
              method, scoped to specific merchants and amounts, so agents can charge payments
              without storing card details or requiring user re-authentication at checkout.
            </p>
            <p>
              The combination of these three components enables what ACP calls{' '}
              <strong className="text-[var(--color-text)]">delegated payment authorization</strong>:
              a user authorizes an AI agent to shop within defined rules (spend limits, merchant
              categories, date windows), and the agent exercises that authority autonomously.
              For merchants, ACP integration means appearing in ChatGPT commerce flows, being
              transactable by the next generation of AI shopping assistants, and enabling
              frictionless purchase completion that converts at rates traditional checkout
              cannot match — because the user never leaves the AI conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ACP Checkout Flow */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="checkout-flow-heading"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="badge mb-4">Architecture</span>
            <h2
              id="checkout-flow-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-2"
            >
              ACP Checkout Flow
            </h2>
            <p className="text-[var(--color-muted)] mb-8">
              Step-by-step: how an AI agent goes from user intent to confirmed purchase order
              using the full ACP stack.
            </p>

            <div className="space-y-3" role="list" aria-label="ACP checkout flow steps">
              {checkoutFlowSteps.map((step, i) => (
                <div
                  key={step.step}
                  className="card p-5 flex items-start gap-4"
                  role="listitem"
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: step.color }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="font-bold text-[var(--color-text)]"
                        style={{ color: step.color }}
                      >
                        {step.label}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                  {i < checkoutFlowSteps.length - 1 && (
                    <div
                      className="absolute ml-4 mt-14 w-0.5 h-3 bg-[var(--color-border)]"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACP Config Example */}
      <section className="section" aria-labelledby="acp-config-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="badge mb-4">Specification</span>
            <h2
              id="acp-config-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-2"
            >
              ACP Config Structure
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              The complete <code className="font-mono text-sm">/.well-known/acp/config.json</code> structure
              with field-by-field annotations. This file is the first document ACP-compatible
              agents fetch when evaluating your checkout capabilities.
            </p>
            <div className="schema-viewer p-5">
              <pre className="text-[var(--color-text)] whitespace-pre overflow-x-auto leading-relaxed">
                <code>{acpConfigExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Key Integrations */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="acp-integrations-heading"
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Integrations</span>
            <h2
              id="acp-integrations-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Key ACP Integrations
            </h2>
            <p className="text-[var(--color-muted)]">
              The three core components that make ACP-enabled checkout work in practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="badge text-xs"
                    style={{
                      background: `color-mix(in srgb, ${integration.color} 15%, transparent)`,
                      color: integration.color,
                    }}
                  >
                    {integration.gov}
                  </span>
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-3 leading-snug">
                  {integration.name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1 mb-4">
                  {integration.description}
                </p>
                <div className="mt-auto">
                  <div className="schema-viewer px-3 py-2">
                    <p className="text-xs text-[var(--color-muted)] font-mono">
                      {integration.requirement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation HowTo */}
      <section className="section" aria-labelledby="acp-implementation-heading">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Implementation Guide</span>
          <h2
            id="acp-implementation-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-2"
          >
            How to Integrate ACP
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Five steps from no agent support to full ChatGPT Instant Checkout capability.
          </p>

          <ol className="space-y-6">
            {acpHowToSteps.map((step, i) => (
              <li key={i} className="card p-6 flex gap-5">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: '#8b5cf6' }}
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

      {/* FAQ */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="acp-faq-heading"
      >
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="acp-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              ACP Questions Answered
            </h2>
          </div>
          <div className="space-y-4">
            {acpFAQs.map((faq, i) => (
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
      <section className="section" aria-labelledby="acp-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center card p-10">
            <span className="badge badge-acp mb-6">ACP Integration</span>
            <h2
              id="acp-cta-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Enable AI Agent Checkout for Your Business
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              Adam Silva Consulting implements the complete ACP stack — config file, negotiation
              API, Stripe SPT integration, and ChatGPT Instant Checkout verification. Paired
              with UCP discovery and AP2 trust infrastructure for full agentic commerce readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acp-integration" className="btn-primary">
                Implement ACP Integration
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
