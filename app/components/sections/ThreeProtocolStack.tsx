import Link from 'next/link'
import { Network, ShoppingCart, Shield, ArrowRight, CheckCircle } from 'lucide-react'

const PROTOCOLS = [
  {
    acronym: 'UCP',
    name: 'Universal Commerce Protocol',
    tagline: 'Discovery Layer',
    icon: Network,
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.12)',
    border: 'rgba(14,165,233,0.2)',
    govBy: 'Google',
    description: 'AI agents use UCP manifests to discover what you sell, your prices, and how to transact. Published at /.well-known/ucp — the entry point for every AI shopping agent.',
    bullets: ['Capability profiles', 'REST / MCP / A2A transports', 'Agent discovery manifest'],
    href: '/protocols/ucp',
    cardClass: 'card-ucp',
  },
  {
    acronym: 'ACP',
    name: 'Agentic Commerce Protocol',
    tagline: 'Execution Layer',
    icon: ShoppingCart,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.2)',
    govBy: 'OpenAI + Stripe',
    description: 'ACP enables AI agents to complete purchases autonomously via Stripe SPT. ChatGPT Instant Checkout is ACP in action — the buy-without-leaving infrastructure.',
    bullets: ['Stripe Payment Tokens', 'ChatGPT Instant Checkout', 'Delegated payments'],
    href: '/protocols/acp',
    cardClass: 'card-acp',
  },
  {
    acronym: 'AP2',
    name: 'Agent Payments Protocol',
    tagline: 'Trust Layer',
    icon: Shield,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.2)',
    govBy: 'Google',
    description: 'AP2 mandates create cryptographically signed authorizations for agentic transactions. Non-repudiation audit trails and Verifiable Credentials — the legal and trust infrastructure.',
    bullets: ['Verifiable Credentials', 'Cryptographic mandates', 'Enterprise audit trail'],
    href: '/protocols/ap2',
    cardClass: 'card-ap2',
  },
]

export function ThreeProtocolStack() {
  return (
    <section className="section" aria-labelledby="protocols-heading">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="badge mb-5">The Protocol Stack</div>
          <h2
            id="protocols-heading"
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Three Protocols.<br />One Complete Infrastructure.
          </h2>
          <p className="text-base speakable-answer" style={{ color: 'var(--color-muted)' }}>
            UCP handles discovery. ACP handles execution. AP2 handles trust.
            Together they form the complete stack for AI-mediated transactions —
            and Adam Silva Consulting implements all three.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROTOCOLS.map((protocol, i) => {
            const Icon = protocol.icon
            return (
              <div
                key={protocol.acronym}
                className={`card ${protocol.cardClass} group relative overflow-hidden`}
                style={{ padding: '1.75rem' }}
              >
                {/* Background glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${protocol.glow} 0%, transparent 60%)`,
                  }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-5 relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: protocol.glow, border: `1px solid ${protocol.border}` }}
                  >
                    <Icon size={22} style={{ color: protocol.color }} />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-xs font-bold px-2.5 py-1 rounded-lg inline-block mb-1"
                      style={{
                        background: protocol.glow,
                        color: protocol.color,
                        border: `1px solid ${protocol.border}`,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {protocol.acronym}
                    </div>
                    <div
                      className="block text-[10px] font-semibold uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-2)' }}
                    >
                      via {protocol.govBy}
                    </div>
                  </div>
                </div>

                {/* Layer label */}
                <div
                  className="text-[11px] font-bold uppercase tracking-widest mb-2"
                  style={{ fontFamily: 'var(--font-mono)', color: protocol.color }}
                >
                  {protocol.tagline}
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                >
                  {protocol.name}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>
                  {protocol.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {protocol.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--color-muted-2)' }}>
                      <CheckCircle size={13} style={{ color: protocol.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-sans)' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={protocol.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                  style={{ color: protocol.color, fontFamily: 'var(--font-sans)' }}
                >
                  Learn {protocol.acronym}
                  <ArrowRight size={14} />
                </Link>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${protocol.color}, transparent)` }}
                />
              </div>
            )
          })}
        </div>

        {/* Stack connector label */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {PROTOCOLS.map((p, i) => (
            <div key={p.acronym} className="flex items-center gap-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: p.glow,
                  color: p.color,
                  border: `1px solid ${p.border}`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {p.acronym}
              </span>
              {i < PROTOCOLS.length - 1 && (
                <ArrowRight size={14} style={{ color: 'var(--color-muted-2)' }} />
              )}
            </div>
          ))}
          <span className="text-xs ml-2" style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}>
            = Complete Agentic Commerce Infrastructure
          </span>
        </div>

        <div className="text-center mt-6">
          <Link href="/protocols" className="btn-secondary text-sm">
            Full Protocol Comparison
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
