'use client'

import { useState } from 'react'
import { Calendar, CheckCircle2, Loader2, Phone } from 'lucide-react'

const BEST_TIMES = [
  'Morning (9am – 12pm)',
  'Afternoon (12pm – 3pm)',
  'Late Afternoon (3pm – 6pm)',
  'Flexible — any time works',
]

const TIMEZONES = [
  'Eastern (ET)', 'Central (CT)', 'Mountain (MT)', 'Pacific (PT)',
  'GMT / UTC', 'CET (Europe)', 'AEST (Australia)',
]

interface Props {
  domain: string
  overallScore: number
  criticalCount: number
  pillarScores?: Record<string, number>
}

export function ConsultationBooking({ domain, overallScore, criticalCount, pillarScores }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [bestTime, setBestTime] = useState('')
  const [timezone, setTimezone] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const message = [
      `I just completed an ACRA scan for ${domain} and scored ${overallScore}/100 with ${criticalCount} critical gap${criticalCount !== 1 ? 's' : ''}.`,
      phone ? `Phone: ${phone}` : '',
      bestTime ? `Best time to call: ${bestTime}${timezone ? ` (${timezone})` : ''}` : '',
      `I'd like to discuss a remediation plan and next steps.`,
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || domain,
          service: 'Free ACRA Strategy Call',
          message,
          acraData: pillarScores ? {
            domain,
            overallScore,
            criticalCount,
            pillarScores,
            phone: phone.trim() || undefined,
            bestTime: bestTime || undefined,
            timezone: timezone || undefined,
          } : undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      setSubmitted(true)
    } catch {
      setError('Network error. Please try again or email us directly.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Call Request Received</h3>
        <p className="text-[var(--color-muted)] max-w-sm mx-auto leading-relaxed">
          We&apos;ll reach out within <strong>24 hours</strong> to schedule your free 30-minute ACRA strategy call.
          We&apos;ll review your report and map out a specific remediation plan.
        </p>
        <p className="text-xs text-[var(--color-muted-2)] mt-4">Check your inbox for a confirmation email.</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="p-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Book Your Free Strategy Call</h2>
            <p className="text-blue-100 text-sm mt-0.5">
              30 minutes with Adam — we&apos;ll review your ACRA report and build your personalised remediation roadmap
            </p>
          </div>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {['100% Free', 'No Obligation', 'Within 24hrs'].map((v) => (
            <div key={v} className="bg-white/10 rounded-lg px-3 py-2 text-center text-xs font-semibold">{v}</div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="consult-name" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="consult-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            />
          </div>
          <div>
            <label htmlFor="consult-email" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="consult-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@yourcompany.com"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="consult-company" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Company
            </label>
            <input
              id="consult-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your Company"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            />
          </div>
          <div>
            <label htmlFor="consult-phone" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Phone (optional)
            </label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]" />
              <input
                id="consult-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="best-time" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Best Time to Call
            </label>
            <select
              id="best-time"
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            >
              <option value="">Select a time</option>
              {BEST_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="timezone" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            >
              <option value="">Select timezone</option>
              {TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !name.trim() || !email.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Calendar size={16} />
              Request My Free Strategy Call
            </>
          )}
        </button>

        <p className="text-xs text-center text-[var(--color-muted-2)]">
          We respond within 24 hours. Your data is never shared.
        </p>
      </form>
    </div>
  )
}
