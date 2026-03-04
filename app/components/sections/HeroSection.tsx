import Link from 'next/link'
import { ArrowRight, Bot, Search, Megaphone, Network, ChevronRight } from 'lucide-react'

const STATS = [
  { value: '15+', label: 'AI & Automation Services' },
  { value: '16', suffix: ' Wks', label: 'To Full AI Readiness' },
  { value: '3', label: 'Protocols (UCP/ACP/AP2)' },
  { value: '$100', label: 'Starting Price' },
]

const CAPABILITIES = [
  {
    icon: Bot,
    title: 'AI Agents',
    accent: '#0ea5e9',
    items: ['Off-Hours Voice Agent', 'Quoting Agent', 'Auto-Appointment Setter'],
    href: '/services',
  },
  {
    icon: Search,
    title: 'Lead Generation',
    accent: '#10b981',
    items: ['Lead Scraping (Hunter)', 'Lead Enrichment Pipeline', 'ICP Targeting'],
    href: '/services',
  },
  {
    icon: Megaphone,
    title: 'Advertising',
    accent: '#f59e0b',
    items: ['Paid Social Campaigns', 'Search Advertising', 'Performance Tracking'],
    href: '/services',
  },
  {
    icon: Network,
    title: 'Agentic Commerce',
    accent: '#a855f7',
    items: ['UCP Protocol Stack', 'ACP Checkout Integration', 'AP2 Trust Layer'],
    href: '/protocols',
  },
]

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ background: 'var(--color-base)', paddingTop: '5rem', paddingBottom: '0' }}
    >
      {/* Top accent bar — Microsoft-style */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px] z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #0ea5e9 30%, #38bdf8 50%, #0284c7 70%, transparent 100%)',
        }}
      />

      {/* Subtle grid background */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid" style={{ opacity: 0.5 }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-start pb-16 pt-8">

          {/* ── Left: Content ── */}
          <div>
            {/* Eyebrow */}
            <div className="enterprise-eyebrow">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                Full-Stack AI Agency
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="animate-fade-up-delay-1 mb-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2.625rem, 5.5vw, 4.125rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--color-text)',
              }}
            >
              AI Agents. Lead Gen.<br />
              Advertising.{' '}
              <span style={{ color: 'var(--color-accent)' }}>Results.</span>
            </h1>

            {/* Subheading */}
            <p
              className="animate-fade-up-delay-2 mb-8 speakable-answer"
              style={{
                color: 'var(--color-muted)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                maxWidth: '520px',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Adam Silva Consulting builds custom AI agents, automates revenue workflows,
              generates qualified leads, runs advertising campaigns, and implements the
              agentic commerce protocol stack that lets AI buy from your business 24/7.
            </p>

            {/* Stats strip */}
            <div
              className="animate-fade-up-delay-2 stat-strip grid-cols-4 mb-8"
              style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.value}
                  className="stat-strip-cell"
                  style={i === STATS.length - 1 ? { borderRight: 'none' } : undefined}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginBottom: '0.3rem',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {stat.value}
                    {stat.suffix && (
                      <span style={{ fontSize: '0.7em', fontWeight: 600, opacity: 0.8 }}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-muted-2)',
                      lineHeight: 1.35,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-3">
              <Link href="/services/ai-readiness-check" className="btn-primary">
                Free AI Readiness Check
                <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-secondary">
                All 18 Services
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

          {/* ── Right: Capability grid ── */}
          <div className="hidden lg:grid grid-cols-2 gap-2.5 animate-fade-up-delay-2">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon
              return (
                <Link
                  key={cap.title}
                  href={cap.href}
                  className="capability-card group"
                  style={{
                    borderLeft: `3px solid ${cap.accent}40`,
                  }}
                >
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${cap.accent}18`,
                        border: `1px solid ${cap.accent}30`,
                      }}
                    >
                      <Icon size={14} style={{ color: cap.accent }} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        color: 'var(--color-text)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cap.title}
                    </span>
                  </div>

                  {/* Service list */}
                  <ul className="space-y-1.5 mb-3.5">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-muted-2)' }}
                      >
                        <span
                          className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: cap.accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Hover arrow */}
                  <div
                    className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-sans)',
                      color: cap.accent,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    View services <ArrowRight size={10} />
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </div>

      {/* Section bottom divider */}
      <div className="divider" />
    </section>
  )
}
