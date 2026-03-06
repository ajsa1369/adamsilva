'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, ShoppingCart, Shield, Layers, Database, Globe } from 'lucide-react'

const PROTOCOL_LAYERS = [
  {
    name: 'UCP',
    fullName: 'Universal Commerce Protocol',
    description: 'AI agents discover your products via .well-known/ucp manifest',
    stat: '8M+ merchants discoverable',
    color: '#3b82f6',
    icon: Search,
    width: '100%',
  },
  {
    name: 'ACP',
    fullName: 'Agentic Commerce Protocol',
    description: 'Agents negotiate, compare, and complete checkout programmatically',
    stat: 'ChatGPT Instant Checkout',
    color: '#8b5cf6',
    icon: ShoppingCart,
    width: '85%',
  },
  {
    name: 'AP2',
    fullName: 'Agent Payments Protocol',
    description: 'Cryptographic mandates + Verifiable Credentials for trust',
    stat: 'x402 payment protocol',
    color: '#10b981',
    icon: Shield,
    width: '70%',
  },
  {
    name: 'Schema.org',
    fullName: 'Structured Data Layer',
    description: 'JSON-LD markup makes content machine-readable for AI engines',
    stat: '3.2x higher citation rate',
    color: '#f59e0b',
    icon: Database,
    width: '55%',
  },
  {
    name: 'MCP',
    fullName: 'Model Context Protocol',
    description: 'Connect AI agents to enterprise tools and data systems',
    stat: '97M+ monthly SDK downloads',
    color: '#06b6d4',
    icon: Layers,
    width: '40%',
  },
  {
    name: 'AEO/GEO',
    fullName: 'Answer Engine Optimization',
    description: 'Optimize content to be cited by ChatGPT, Perplexity, Claude, Gemini',
    stat: 'AI citation optimization',
    color: '#ec4899',
    icon: Globe,
    width: '100%',
  },
]

export function ProtocolStackInfographic() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="section relative overflow-hidden" aria-label="Protocol stack infographic">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 30% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 70% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 60%)
          `,
        }}
      />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge mb-4">Infrastructure</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight mb-3">
            The Protocol Stack We Implement
          </h2>
          <p className="text-[var(--color-muted)]">
            Six layers of infrastructure that make your business discoverable, transactable, and trustworthy to AI agents.
          </p>
        </div>

        {/* Stacked protocol visualization */}
        <div className="max-w-4xl mx-auto space-y-3">
          {PROTOCOL_LAYERS.map((protocol, i) => {
            const Icon = protocol.icon
            return (
              <div
                key={i}
                className="transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div
                  className="flex items-center gap-4 p-4 lg:p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${protocol.color}08 0%, ${protocol.color}04 100%)`,
                    border: `1px solid ${protocol.color}22`,
                    width: protocol.width,
                    marginLeft: protocol.width === '100%' ? 0 : 'auto',
                    marginRight: protocol.width === '100%' ? 0 : 'auto',
                  }}
                >
                  {/* Icon badge */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${protocol.color}15`, color: protocol.color }}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-base font-black font-display" style={{ color: protocol.color }}>
                        {protocol.name}
                      </span>
                      <span className="text-xs text-[var(--color-muted-2)] hidden sm:inline">
                        {protocol.fullName}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] leading-snug">{protocol.description}</p>
                  </div>

                  {/* Stat badge */}
                  <div
                    className="hidden lg:flex items-center px-3 py-1.5 rounded-full shrink-0"
                    style={{
                      background: `${protocol.color}10`,
                      border: `1px solid ${protocol.color}25`,
                    }}
                  >
                    <span className="text-xs font-bold font-mono" style={{ color: protocol.color }}>
                      {protocol.stat}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Connection lines annotation */}
        <div
          className="text-center mt-8 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: '900ms',
          }}
        >
          <p className="text-sm text-[var(--color-muted-2)] italic">
            Each layer builds on the one below. We implement the full stack &mdash; not isolated fixes.
          </p>
        </div>
      </div>
    </section>
  )
}
