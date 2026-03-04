import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

const STATS = [
  { value: '15+', label: 'AI & Automation Services' },
  { value: '16', suffix: ' Wks', label: 'To Full AI Readiness' },
  { value: '3', label: 'Protocols (UCP/ACP/AP2)' },
  { value: '5.0', label: 'Client Rating' },
]

export function HeroSection() {

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ background: 'var(--color-base)', paddingTop: '5rem', paddingBottom: '0' }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px] z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #0ea5e9 30%, #38bdf8 50%, #0284c7 70%, transparent 100%)',
        }}
      />

      {/* Subtle grid background */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid" style={{ opacity: 0.5 }} />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-center pb-16 pt-8">

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
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
                <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-secondary">
                All 18 Services
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

          {/* ── Right: Hero Ad Video ── */}
          <div className="hidden lg:block animate-fade-up-delay-2">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 60px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.08)',
              }}
            >
              <video
                controls
                preload="metadata"
                poster="/images/hero/tech-services-hero.jpg"
                className="w-full h-auto block"
                style={{ aspectRatio: '16/9', background: '#0f172a' }}
                playsInline
              >
                <source src="/videos/hero-ad.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </div>

      {/* Section bottom divider */}
      <div className="divider" />
    </section>
  )
}
