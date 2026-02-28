'use client'

import { useState } from 'react'
import { ArrowRight, BookOpen, Download } from 'lucide-react'

const guideChapters = [
  { number: 1, title: 'What Is Agentic Commerce?', desc: 'The shift from human-to-website to agent-to-API commerce and why it matters now.' },
  { number: 2, title: 'The UCP Discovery Layer', desc: "How Google's Universal Commerce Protocol works, what a manifest contains, and how AI agents use it." },
  { number: 3, title: 'The ACP Checkout Layer', desc: "How OpenAI's Agentic Commerce Protocol enables AI agents to complete purchases without browser sessions." },
  { number: 4, title: 'The AP2 Trust Layer', desc: 'Cryptographic mandates, Verifiable Credentials, and why AP2 makes agentic transactions legally defensible.' },
  { number: 5, title: 'Eliminating the Hydration Tax', desc: 'Why client-side rendering is invisible to AI agents and how SSR fixes it with measurable results.' },
  { number: 6, title: 'JSON-LD Schema Architecture', desc: 'Building a complete schema graph that AI systems can parse, trust, and cite.' },
  { number: 7, title: 'Answer Engine Optimization (AEO)', desc: 'The content, structure, and signal framework for getting cited by ChatGPT, Perplexity, and Google AI Mode.' },
  { number: 8, title: 'The 16-Week Implementation Roadmap', desc: 'The exact methodology ASC uses to take clients from zero to full protocol compliance and citation dominance.' },
]

export function ResourcesForm() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, email }),
      })
      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="guide" className="section bg-[var(--color-surface)] scroll-mt-8" aria-labelledby="guide-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Guide Info */}
          <div>
            <span className="badge mb-4">Featured Guide</span>
            <h2
              id="guide-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              The Complete Guide to Agentic Commerce
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-6">
              An 8-chapter definitive guide to understanding and implementing agentic
              commerce — from protocol fundamentals through the full 16-week implementation
              roadmap. Used internally by our consulting team and clients.
            </p>
            <div className="space-y-3">
              {guideChapters.map((ch) => (
                <div key={ch.number} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    {ch.number}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--color-text)] text-sm">{ch.title}</p>
                    <p className="text-xs text-[var(--color-muted)]">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Gate Form */}
          <div className="card p-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} style={{ color: 'var(--color-accent)' }} />
              <span className="font-bold text-[var(--color-text)]">Get Free Access</span>
            </div>

            {formState === 'success' ? (
              <div className="text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'color-mix(in srgb, #10b981 15%, transparent)' }}
                >
                  <Download size={24} style={{ color: '#10b981' }} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                  You&apos;re in, {firstName}!
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  Check your inbox — the guide is on its way.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-[var(--color-muted)] mb-6">
                  Enter your details to receive the complete 8-chapter guide instantly. No spam
                  — just the guide and our weekly protocol updates.
                </p>

                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-base)] text-[var(--color-text)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guide_email"
                    className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                  >
                    Business Email
                  </label>
                  <input
                    id="guide_email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-base)] text-[var(--color-text)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="btn-primary w-full justify-center"
                >
                  {formState === 'loading' ? 'Sending...' : 'Send Me the Guide'}
                  {formState !== 'loading' && <ArrowRight size={16} />}
                </button>

                <p className="text-xs text-[var(--color-muted-2)] text-center">
                  Free. Unsubscribe any time. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
