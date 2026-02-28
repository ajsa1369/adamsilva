import Link from 'next/link'
import { ArrowRight, Zap, Network, ShoppingCart, Shield, TrendingDown } from 'lucide-react'

const PROTOCOL_CHIPS = [
  {
    acronym: 'UCP',
    label: 'Universal Commerce Protocol',
    layer: 'Discovery Layer',
    icon: Network,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.2)',
    href: '/protocols/ucp',
  },
  {
    acronym: 'ACP',
    label: 'Agentic Commerce Protocol',
    layer: 'Execution Layer',
    icon: ShoppingCart,
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
    href: '/protocols/acp',
  },
  {
    acronym: 'AP2',
    label: 'Agent Payments Protocol',
    layer: 'Trust Layer',
    icon: Shield,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    href: '/protocols/ap2',
  },
]

const STATS = [
  { value: '50%', label: "Search traffic decline by 2028", source: 'Gartner' },
  { value: '3', label: 'Protocols. One implementation.', source: 'UCP · ACP · AP2' },
  { value: '16', label: 'Weeks to full AI readiness', source: 'Proven methodology' },
]

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero bg-grid"
      aria-labelledby="hero-heading"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Background glow orbs */}
      <div aria-hidden="true" className="pointer-events-none">
        <div className="glow-orb glow-orb-blue" style={{ width: 700, height: 700, top: '-20%', right: '-10%', opacity: 0.6 }} />
        <div className="glow-orb glow-orb-purple" style={{ width: 500, height: 500, bottom: '-10%', left: '-5%', opacity: 0.5 }} />
        <div className="glow-orb" style={{
          width: 200, height: 200, top: '40%', left: '45%',
          background: 'rgba(16,185,129,0.07)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left — Content */}
          <div>
            {/* Announcement chip */}
            <div className="animate-fade-up inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(14,165,233,0.08)',
                border: '1px solid rgba(14,165,233,0.18)',
                color: 'rgba(14,165,233,0.9)',
                letterSpacing: '0.06em',
              }}
            >
              <Zap size={11} />
              <span>UCP v2 · ACP v1 · AP2 v1 &nbsp;—&nbsp; All three protocols live</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="animate-fade-up-delay-1 leading-none mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
              }}
            >
              Global Infrastructure<br />
              for{' '}
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Agentic Commerce
              </span>
            </h1>

            {/* Answer-first summary */}
            <p className="animate-fade-up-delay-2 text-lg leading-relaxed mb-4 speakable-answer max-w-xl"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
            >
              Adam Silva Consulting implements the UCP, ACP, and AP2 protocol stack that enables AI agents to discover, negotiate, and transact with your business — without human intermediaries.
            </p>
            <p className="animate-fade-up-delay-2 text-base leading-relaxed mb-10 max-w-xl"
              style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
            >
              As Gartner predicts AI reduces traditional search traffic by 50% by 2028, businesses without agentic infrastructure face extinction. We close that gap in 16 weeks.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-3 mb-14">
              <Link href="/services/ai-readiness-check" className="btn-primary">
                AI Readiness Check — $100
                <ArrowRight size={15} />
              </Link>
              <Link href="/protocols" className="btn-secondary">
                Explore the Protocols
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-up-delay-3 grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <div className="stat-number mb-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs leading-snug mb-1" style={{ color: 'var(--color-muted)' }}>
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-2)' }}
                  >
                    {stat.source}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Protocol Stack Visual */}
          <div className="hidden lg:flex flex-col gap-4 relative">
            {/* Connection line */}
            <div
              aria-hidden="true"
              className="absolute left-6 top-16 bottom-16 w-px"
              style={{
                background: 'linear-gradient(to bottom, rgba(14,165,233,0.3), rgba(168,85,247,0.3), rgba(16,185,129,0.3))',
              }}
            />

            {PROTOCOL_CHIPS.map((p, i) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.acronym}
                  href={p.href}
                  className="group relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: p.bg,
                    border: `1px solid ${p.border}`,
                    animationDelay: `${0.4 + i * 0.15}s`,
                    animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
                    animationFillMode: 'both',
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon + connector dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `rgba(${p.color === '#0ea5e9' ? '14,165,233' : p.color === '#a855f7' ? '168,85,247' : '16,185,129'},0.15)` }}
                      >
                        <Icon size={18} style={{ color: p.color }} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ fontFamily: 'var(--font-mono)', color: p.color }}
                        >
                          {p.layer}
                        </span>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-md"
                          style={{
                            background: `rgba(${p.color === '#0ea5e9' ? '14,165,233' : p.color === '#a855f7' ? '168,85,247' : '16,185,129'},0.15)`,
                            color: p.color,
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {p.acronym}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-semibold leading-tight mb-1 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
                      >
                        {p.label}
                      </h3>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${p.border}`, background: `radial-gradient(ellipse at top left, ${p.bg} 0%, transparent 70%)` }}
                  />
                </Link>
              )
            })}

            {/* Bottom stat card */}
            <div
              className="rounded-xl p-4 animate-float-delayed"
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
                animation: 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.12)' }}
                >
                  <TrendingDown size={15} style={{ color: '#f87171' }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>
                    Without agentic infrastructure
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted-2)' }}>
                    50% traffic loss predicted by 2028
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-base), transparent)' }}
      />
    </section>
  )
}
