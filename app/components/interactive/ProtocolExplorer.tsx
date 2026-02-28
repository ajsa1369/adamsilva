'use client'

import { useState } from 'react'
import Link from 'next/link'
import { JsonLd } from '../seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

const PROTOCOL_DATA = {
  ucp: {
    name: 'Universal Commerce Protocol',
    acronym: 'UCP',
    color: '#3b82f6',
    badge: 'badge-ucp',
    tagline: 'AI Agent Discovery Standard',
    govBy: 'Google',
    version: 'v2',
    wellKnown: '/.well-known/ucp/manifest.json',
    description:
      'UCP enables AI agents to discover your business capabilities, products, and services through standardized manifest files. Published at /.well-known/ucp, a UCP manifest tells every AI shopping agent exactly what you sell and how to transact.',
    useCases: ['Google AI Mode product discovery', 'Perplexity Shopping', 'AI agent capability queries', 'Merchant onboarding automation'],
    manifestPreview: `{
  "ucp_version": "2026-01",
  "organization": {
    "name": "Adam Silva Consulting",
    "url": "https://www.adamsilvaconsulting.com"
  },
  "capabilities": [
    {
      "type": "service",
      "id": "aeo-audit",
      "name": "AEO Audit",
      "price": { "amount": "500", "currency": "USD" }
    }
  ],
  "transports": ["REST", "MCP", "A2A"]
}`,
    href: '/protocols/ucp',
    serviceHref: '/services/ucp-implementation',
  },
  acp: {
    name: 'Agentic Commerce Protocol',
    acronym: 'ACP',
    color: '#8b5cf6',
    badge: 'badge-acp',
    tagline: 'AI Checkout Execution Standard',
    govBy: 'OpenAI + Stripe',
    version: 'v1',
    wellKnown: '/.well-known/acp/config.json',
    description:
      'ACP enables AI agents to execute purchases directly in your store. It defines how agents ingest product feeds, initiate purchases via Stripe Payment Tokens (SPT), and confirm orders — powering ChatGPT Instant Checkout.',
    useCases: ['ChatGPT Instant Checkout', 'Delegated payment authorization', 'AI agent product queries', 'Automated order confirmation'],
    manifestPreview: `{
  "acp_version": "1.0",
  "merchant": {
    "id": "adam-silva-consulting",
    "name": "Adam Silva Consulting"
  },
  "checkout": {
    "endpoint": "/api/acp/checkout",
    "supported_payment_tokens": ["stripe_spt"]
  },
  "product_feed": "/api/products.json"
}`,
    href: '/protocols/acp',
    serviceHref: '/services/acp-integration',
  },
  ap2: {
    name: 'Agent Payments Protocol',
    acronym: 'AP2',
    color: '#10b981',
    badge: 'badge-ap2',
    tagline: 'Cryptographic Trust Layer',
    govBy: 'Google',
    version: 'v1',
    wellKnown: '/.well-known/ap2/mandates.json',
    description:
      'AP2 provides the cryptographic mandate infrastructure that makes agentic transactions legally defensible. Intent and Cart mandates — signed with Verifiable Credentials — create the audit trail enterprise procurement requires.',
    useCases: ['Enterprise procurement mandates', 'Verifiable Credentials issuance', 'x402 crypto payments', 'Transaction audit trails'],
    manifestPreview: `{
  "ap2_version": "1.0",
  "mandate_types": ["intent", "cart"],
  "credential_formats": ["jwt_vc", "ldp_vc"],
  "payment_protocols": ["stripe", "x402"],
  "audit": {
    "enabled": true,
    "non_repudiation": true
  }
}`,
    href: '/protocols/ap2',
    serviceHref: '/services/ap2-trust-layer',
  },
}

type ProtocolKey = keyof typeof PROTOCOL_DATA

// Schema emitted per protocol — AI agents parse this
function buildProtocolSchema(key: ProtocolKey) {
  const p = PROTOCOL_DATA[key]
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/protocols/${key}#protocol`,
    name: p.name,
    alternateName: p.acronym,
    description: p.description,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Agentic Commerce Protocol',
    url: `${SITE_URL}${p.href}`,
    version: p.version,
    operatingSystem: 'Web, REST API',
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `${p.name} (${p.acronym}) Implementation`,
        url: `${SITE_URL}${p.serviceHref}`,
        provider: { '@id': ORG_ID },
      },
    },
    author: p.govBy === 'Google'
      ? { '@type': 'Organization', name: 'Google LLC', url: 'https://www.google.com' }
      : { '@type': 'Organization', name: 'OpenAI', url: 'https://openai.com' },
    keywords: [p.name, p.acronym, 'agentic commerce', 'AI agent', 'protocol', 'commerce standard'].join(', '),
  }
}

export function ProtocolExplorer() {
  const [active, setActive] = useState<ProtocolKey>('ucp')
  const protocol = PROTOCOL_DATA[active]

  const allProtocolSchemas = (['ucp', 'acp', 'ap2'] as ProtocolKey[]).map(buildProtocolSchema)

  return (
    <div>
      {/* Pre-render ALL protocol schemas — agents ingest all 3 regardless of which tab is active */}
      <JsonLd data={allProtocolSchemas} />

      {/* Tab buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(['ucp', 'acp', 'ap2'] as ProtocolKey[]).map((key) => {
          const p = PROTOCOL_DATA[key]
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                active === key
                  ? 'text-white border-transparent'
                  : 'text-[var(--color-muted)] border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/50'
              }`}
              style={active === key ? { backgroundColor: p.color } : {}}
              aria-pressed={active === key}
            >
              {key.toUpperCase()}
            </button>
          )
        })}
      </div>

      {/* Protocol details */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: protocol.color }}>
              {protocol.acronym}
            </span>
            <span className="text-xs text-[var(--color-muted-2)]">Gov by {protocol.govBy}</span>
            <span className="text-xs text-[var(--color-muted-2)]">{protocol.version}</span>
          </div>

          <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{protocol.name}</h3>
          <p className="text-sm font-medium mb-4" style={{ color: protocol.color }}>{protocol.tagline}</p>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-6 speakable-answer">
            {protocol.description}
          </p>

          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">Key Use Cases</h4>
            <ul className="space-y-2">
              {protocol.useCases.map((useCase, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: protocol.color }} />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Link href={protocol.href} className="btn-secondary text-sm py-2 px-4">
              Learn More
            </Link>
            <Link href={protocol.serviceHref} className="btn-primary text-sm py-2 px-4">
              Implement {protocol.acronym}
            </Link>
          </div>
        </div>

        {/* Manifest preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[var(--color-muted-2)]">{protocol.wellKnown}</span>
            <a
              href={protocol.wellKnown}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              View live
            </a>
          </div>
          <pre className="schema-viewer p-4 text-[var(--color-muted)] overflow-x-auto text-xs leading-relaxed">
            <code>{protocol.manifestPreview}</code>
          </pre>
          <p className="text-xs text-[var(--color-muted-2)] mt-2">
            Live manifest served at <code className="text-[var(--color-accent)]">{protocol.wellKnown}</code> — AI agents discover this automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
