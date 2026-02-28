import Link from 'next/link'
import { Network, ShoppingCart, Shield, ArrowRight } from 'lucide-react'

const PROTOCOLS = [
  {
    acronym: 'UCP',
    name: 'Universal Commerce Protocol',
    tagline: 'Discovery Layer',
    icon: Network,
    color: '#3b82f6',
    govBy: 'Google',
    description: 'AI agents use UCP manifests to discover what you sell, your prices, and how to transact. Published at /.well-known/ucp — the entry point for every AI shopping agent.',
    href: '/protocols/ucp',
    badge: 'badge-ucp',
  },
  {
    acronym: 'ACP',
    name: 'Agentic Commerce Protocol',
    tagline: 'Execution Layer',
    icon: ShoppingCart,
    color: '#8b5cf6',
    govBy: 'OpenAI + Stripe',
    description: 'ACP enables AI agents to complete purchases autonomously via Stripe SPT. ChatGPT Instant Checkout is ACP in action — the buy-without-leaving infrastructure.',
    href: '/protocols/acp',
    badge: 'badge-acp',
  },
  {
    acronym: 'AP2',
    name: 'Agent Payments Protocol',
    tagline: 'Trust Layer',
    icon: Shield,
    color: '#10b981',
    govBy: 'Google',
    description: 'AP2 mandates create cryptographically signed authorizations for agentic transactions. Non-repudiation audit trails and Verifiable Credentials — the legal and trust infrastructure.',
    href: '/protocols/ap2',
    badge: 'badge-ap2',
  },
]

export function ThreeProtocolStack() {
  return (
    <section className="section bg-[var(--color-surface)]" aria-labelledby="protocols-heading">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge mb-4">The Protocol Stack</span>
          <h2 id="protocols-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
            Three Protocols Power Agentic Commerce
          </h2>
          <p className="text-[var(--color-muted)] speakable-answer">
            UCP handles discovery. ACP handles execution. AP2 handles trust. Together they form the complete infrastructure for AI-mediated transactions — and Adam Silva Consulting implements all three.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROTOCOLS.map((protocol) => {
            const Icon = protocol.icon
            return (
              <div key={protocol.acronym} className="card p-6 group">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${protocol.color} 15%, transparent)` }}
                  >
                    <Icon size={22} style={{ color: protocol.color }} />
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: protocol.color }}
                  >
                    {protocol.acronym}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: protocol.color }}>
                    {protocol.tagline}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">{protocol.name}</h3>
                <p className="text-xs text-[var(--color-muted-2)] mb-3">Governed by {protocol.govBy}</p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                  {protocol.description}
                </p>

                <Link
                  href={protocol.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: protocol.color }}
                >
                  Learn {protocol.acronym}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Protocol overview CTA */}
        <div className="text-center mt-10">
          <Link href="/protocols" className="btn-secondary">
            Full Protocol Comparison
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
