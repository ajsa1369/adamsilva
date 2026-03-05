'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Loader2, ChevronDown } from 'lucide-react'
import type { RevenueRange } from '@/lib/acra/revenue'

const INDUSTRIES = [
  'E-Commerce / DTC', 'B2B SaaS', 'Financial Services', 'Healthcare',
  'Professional Services', 'Manufacturing', 'Real Estate', 'Education',
  'Media & Publishing', 'Retail', 'Technology', 'Other',
]

const REVENUE_RANGES: RevenueRange[] = ['$0-50k', '$50k-250k', '$250k-1M', '$1M-10M', '$10M+']

const FRAMEWORKS = [
  'Next.js / React', 'Nuxt.js / Vue', 'SvelteKit', 'Gatsby',
  'WordPress', 'WooCommerce', 'Shopify', 'BigCommerce', 'Magento / Adobe Commerce',
  'Webflow', 'Wix', 'Squarespace', 'Custom / Bespoke', 'Other',
]

export function ScanForm() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [revenueRange, setRevenueRange] = useState<RevenueRange | ''>('')
  const [framework, setFramework] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showOptional, setShowOptional] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/acra/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          companyName: companyName.trim() || undefined,
          industry: industry || undefined,
          monthlyRevenueRange: revenueRange || undefined,
          framework: framework || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      router.push(`/acra/report/${data.reportId}`)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="ACRA scan form">
      {/* URL input */}
      <div>
        <label htmlFor="acra-url" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
          Enter Your Website URL
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]" aria-hidden="true" />
            <input
              id="acra-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yoursite.com"
              required
              className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-glow)] text-[var(--color-text)] placeholder:text-[var(--color-muted-2)]"
              aria-describedby="url-help"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-primary px-5 shrink-0 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Scanning…
              </>
            ) : (
              'Run ACRA'
            )}
          </button>
        </div>
        <p id="url-help" className="text-xs text-[var(--color-muted-2)] mt-1.5">
          We scan your public website only. No login or access required.
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
          {error}
        </div>
      )}

      {/* Optional fields toggle */}
      <button
        type="button"
        onClick={() => setShowOptional((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-[var(--color-accent)] font-semibold"
      >
        <ChevronDown size={14} className={`transition-transform ${showOptional ? 'rotate-180' : ''}`} />
        {showOptional ? 'Hide' : 'Add'} context for more accurate revenue projections (optional)
      </button>

      {showOptional && (
        <div className="grid sm:grid-cols-2 gap-3 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
          <div>
            <label htmlFor="company-name" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Company Name
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corp"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="framework" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Tech Stack / Framework <span className="text-[var(--color-accent)]">*</span>
            </label>
            <select
              id="framework"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            >
              <option value="">Select framework</option>
              {FRAMEWORKS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <p className="text-xs text-[var(--color-muted-2)] mt-1">Helps us tailor implementation recommendations</p>
          </div>

          <div>
            <label htmlFor="revenue-range" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Monthly Revenue
            </label>
            <select
              id="revenue-range"
              value={revenueRange}
              onChange={(e) => setRevenueRange(e.target.value as RevenueRange)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            >
              <option value="">Select range</option>
              {REVENUE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-6">
          <div className="inline-flex flex-col items-center gap-3 text-[var(--color-muted)]">
            <Loader2 size={32} className="animate-spin text-[var(--color-accent)]" />
            <div>
              <div className="font-semibold text-[var(--color-text)]">Running your ACRA…</div>
              <div className="text-sm mt-0.5">Checking 9 scoring pillars, protocol compliance, and AI authority signals</div>
            </div>
            <ScanningSteps />
          </div>
        </div>
      )}
    </form>
  )
}

function ScanningSteps() {
  const steps = [
    'Fetching site structure…',
    'Checking .well-known agentic endpoints…',
    'Analyzing structured data & schema…',
    'Evaluating AEO & GEO signals…',
    'Scoring social authority & press coverage…',
    'Computing LLM recommendation scores…',
    'Calculating revenue impact…',
  ]

  const [step] = useState(() => Math.floor(Math.random() * steps.length))

  return (
    <div className="text-xs text-[var(--color-muted-2)] animate-pulse">{steps[step]}</div>
  )
}
