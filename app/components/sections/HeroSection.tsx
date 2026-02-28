import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="gradient-hero section relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl bg-[var(--color-accent)]" />
        <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl bg-[var(--color-primary)]" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-muted)] mb-8">
            <Zap size={14} className="text-[var(--color-accent)]" />
            <span>UCP v2 · ACP v1 · AP2 v1 — All three protocols supported</span>
          </div>

          {/* Heading */}
          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-tight mb-6">
            Global Infrastructure for{' '}
            <span className="text-[var(--color-accent)]">Agentic Commerce</span>
          </h1>

          {/* Answer-First summary — captures featured snippets */}
          <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-4 speakable-answer max-w-2xl">
            Adam Silva Consulting implements the UCP, ACP, and AP2 protocol stack that enables AI agents to discover, negotiate with, and transact with your business — without human intermediaries. We build the infrastructure that makes you AI-commerce-ready.
          </p>
          <p className="text-base text-[var(--color-muted-2)] leading-relaxed mb-10 max-w-2xl">
            As Gartner predicts AI reduces traditional search traffic by 50% by 2028, businesses that haven&apos;t built agentic infrastructure face extinction. We close that gap in 16 weeks.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/services/ai-readiness-check" className="btn-primary">
              Get AI Readiness Check — $100
              <ArrowRight size={16} />
            </Link>
            <Link href="/protocols" className="btn-secondary">
              Explore the Protocols
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-[var(--color-border)]">
            {[
              { value: '50%', label: "Gartner's predicted search traffic decline by 2028" },
              { value: '3', label: 'Open protocols: UCP + ACP + AP2' },
              { value: '16', label: 'Weeks to full agentic readiness' },
            ].map((stat) => (
              <div key={stat.value} className="text-center sm:text-left">
                <div className="text-3xl font-black text-[var(--color-accent)] mb-1">{stat.value}</div>
                <div className="text-xs text-[var(--color-muted-2)] leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
