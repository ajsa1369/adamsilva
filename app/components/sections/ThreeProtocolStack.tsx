import Link from 'next/link'
import { Network, ShoppingCart, Shield, ArrowRight } from 'lucide-react'

const PROTOCOLS = [
  {
    num: '01',
    acronym: 'UCP',
    name: 'Universal Commerce Protocol',
    layer: 'Discovery Layer',
    icon: Network,
    accent: '#0ea5e9',
    govBy: 'Google',
    description:
      'AI agents use UCP manifests to discover what you sell, your prices, and how to transact. Published at /.well-known/ucp — the entry point for every AI shopping agent.',
    bullets: ['Capability profiles & inventory feeds', 'REST / MCP / A2A transports', 'Agent discovery manifest'],
    href: '/protocols/ucp',
  },
  {
    num: '02',
    acronym: 'ACP',
    name: 'Agentic Commerce Protocol',
    layer: 'Execution Layer',
    icon: ShoppingCart,
    accent: '#a855f7',
    govBy: 'OpenAI + Stripe',
    description:
      'ACP enables AI agents to complete purchases autonomously via Stripe SPT. ChatGPT Instant Checkout is ACP in action — the buy-without-leaving infrastructure.',
    bullets: ['Stripe Payment Tokens (SPT)', 'ChatGPT Instant Checkout', 'Delegated payment flows'],
    href: '/protocols/acp',
  },
  {
    num: '03',
    acronym: 'AP2',
    name: 'Agent Payments Protocol',
    layer: 'Trust Layer',
    icon: Shield,
    accent: '#10b981',
    govBy: 'Google',
    description:
      'AP2 mandates create cryptographically signed authorizations for agentic transactions. Non-repudiation audit trails and Verifiable Credentials — the legal and trust layer.',
    bullets: ['Verifiable Credentials (W3C)', 'Cryptographic mandates', 'Enterprise audit trail'],
    href: '/protocols/ap2',
  },
]

export function ThreeProtocolStack() {
  return (
    <section className="section" aria-labelledby="protocols-heading">
      <div className="container">

        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <div className="enterprise-eyebrow">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
            >
              The Protocol Stack
            </span>
          </div>
          <h2
            id="protocols-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Three Protocols.<br />One Complete Infrastructure.
          </h2>
          <p
            className="speakable-answer"
            style={{ color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.7, fontFamily: 'var(--font-sans)' }}
          >
            UCP handles discovery. ACP handles execution. AP2 handles trust.
            Together they form the complete stack for AI-mediated transactions —
            and Adam Silva Consulting implements all three.
          </p>
        </div>

        {/* Protocol cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {PROTOCOLS.map((protocol) => {
            const Icon = protocol.icon
            return (
              <div
                key={protocol.acronym}
                className="group relative rounded-lg overflow-hidden"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: `3px solid ${protocol.accent}`,
                  padding: '1.75rem',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Number + Acronym row */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      letterSpacing: '0.12em',
                      color: 'var(--color-muted-2)',
                    }}
                  >
                    {protocol.num}
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{
                        background: `${protocol.accent}15`,
                        border: `1px solid ${protocol.accent}30`,
                      }}
                    >
                      <Icon size={15} style={{ color: protocol.accent }} />
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: `${protocol.accent}15`,
                        color: protocol.accent,
                        border: `1px solid ${protocol.accent}25`,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {protocol.acronym}
                    </span>
                  </div>
                </div>

                {/* Layer label */}
                <div
                  className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ fontFamily: 'var(--font-mono)', color: protocol.accent }}
                >
                  {protocol.layer}
                </div>

                {/* Protocol name */}
                <h3
                  className="mb-1 leading-snug"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: 'var(--color-text)',
                  }}
                >
                  {protocol.name}
                </h3>

                {/* Governed by */}
                <div
                  className="mb-4 text-[11px]"
                  style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
                >
                  Governed by{' '}
                  <span style={{ color: 'var(--color-muted)', fontWeight: 600 }}>
                    {protocol.govBy}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="mb-5 leading-relaxed"
                  style={{ color: 'var(--color-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}
                >
                  {protocol.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {protocol.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-xs"
                      style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
                    >
                      <span
                        className="inline-block w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: protocol.accent }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={protocol.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 group-hover:gap-3"
                  style={{ color: protocol.accent, fontFamily: 'var(--font-sans)', letterSpacing: '0.06em' }}
                >
                  Deep-dive into {protocol.acronym}
                  <ArrowRight size={12} />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Stack summary bar */}
        <div
          className="mt-8 rounded-lg px-6 py-4 flex flex-wrap items-center justify-between gap-4"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            {PROTOCOLS.map((p, i) => (
              <div key={p.acronym} className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: `${p.accent}15`,
                    color: p.accent,
                    border: `1px solid ${p.accent}25`,
                  }}
                >
                  {p.acronym}
                </span>
                {i < PROTOCOLS.length - 1 && (
                  <ArrowRight size={12} style={{ color: 'var(--color-muted-2)' }} />
                )}
              </div>
            ))}
            <span
              className="text-xs"
              style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
            >
              = Complete Agentic Commerce Infrastructure
            </span>
          </div>
          <Link href="/protocols" className="btn-secondary text-sm">
            Full Protocol Comparison
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  )
}
