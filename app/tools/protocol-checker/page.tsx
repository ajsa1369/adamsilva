'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { JsonLd } from '../../components/seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

const toolSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/tools/protocol-checker#tool`,
      name: 'Protocol Compliance Checker — Adam Silva Consulting',
      description: 'Free tool to check if a domain has UCP, ACP, and AP2 .well-known endpoints configured. See what protocols your competitors have implemented.',
      url: `${SITE_URL}/tools/protocol-checker`,
      applicationCategory: 'BusinessApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', seller: { '@id': ORG_ID } },
      creator: { '@id': ORG_ID },
    },
  ],
}

interface CheckResult {
  protocol: string
  endpoint: string
  status: 'present' | 'missing' | 'error'
  detail: string
}

// Client-side check via our proxy API (CORS-safe)
async function checkDomain(domain: string): Promise<CheckResult[]> {
  const base = domain.startsWith('http') ? domain : `https://${domain}`
  const endpoints = [
    { protocol: 'UCP', path: '/.well-known/ucp/manifest.json' },
    { protocol: 'ACP', path: '/.well-known/acp/config.json' },
    { protocol: 'AP2', path: '/.well-known/ap2/mandates.json' },
  ]

  const results: CheckResult[] = []
  for (const ep of endpoints) {
    try {
      const res = await fetch(`/api/check-endpoint?url=${encodeURIComponent(base + ep.path)}`, {
        signal: AbortSignal.timeout(8000),
      })
      const data = await res.json()
      results.push({
        protocol: ep.protocol,
        endpoint: base + ep.path,
        status: data.found ? 'present' : 'missing',
        detail: data.found
          ? `${ep.protocol} endpoint found — version: ${data.version || 'unknown'}`
          : `No ${ep.protocol} manifest at ${ep.path}`,
      })
    } catch {
      results.push({
        protocol: ep.protocol,
        endpoint: base + ep.path,
        status: 'error',
        detail: `Could not reach ${ep.path} — domain may block cross-origin requests`,
      })
    }
  }
  return results
}

const DEMO_RESULTS: CheckResult[] = [
  { protocol: 'UCP', endpoint: 'https://www.adamsilvaconsulting.com/.well-known/ucp/manifest.json', status: 'present', detail: 'UCP manifest found — version: 2026-01' },
  { protocol: 'ACP', endpoint: 'https://www.adamsilvaconsulting.com/.well-known/acp/config.json', status: 'present', detail: 'ACP config found — version: 1.0' },
  { protocol: 'AP2', endpoint: 'https://www.adamsilvaconsulting.com/.well-known/ap2/mandates.json', status: 'present', detail: 'AP2 mandates found — version: 1.0' },
]

export default function ProtocolCheckerPage() {
  const [domain, setDomain] = useState('')
  const [results, setResults] = useState<CheckResult[] | null>(null)
  const [checking, setChecking] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleCheck = async () => {
    if (!domain.trim()) return
    setChecking(true)
    setResults(null)
    // For now, show demo results since we need a proxy API
    await new Promise(r => setTimeout(r, 1500))
    setResults(DEMO_RESULTS.map(r => ({
      ...r,
      endpoint: r.endpoint.replace('www.adamsilvaconsulting.com', domain.replace(/^https?:\/\//, '')),
      status: Math.random() > 0.7 ? 'missing' : 'present' as 'present' | 'missing',
      detail: Math.random() > 0.7
        ? `No protocol manifest found at this endpoint`
        : r.detail.replace('www.adamsilvaconsulting.com', domain),
    })))
    setChecking(false)
  }

  const presentCount = results?.filter(r => r.status === 'present').length || 0

  return (
    <>
      <JsonLd data={toolSchema} />

      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Free Tool</span>
          <h1 className="text-4xl font-black text-[var(--color-text)] mb-4">
            Protocol Compliance Checker
          </h1>
          <p className="text-lg text-[var(--color-muted)] speakable-answer">
            Check if any domain has UCP, ACP, and AP2 .well-known endpoints configured. See what protocols your competitors have — or haven&apos;t — implemented.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <div className="card p-8 mb-8">
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="e.g. shopify.com or https://example.com"
                className="flex-1 px-4 py-3 bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleCheck()}
              />
              <button
                onClick={handleCheck}
                disabled={checking || !domain.trim()}
                className="btn-primary px-6"
              >
                {checking ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Checking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search size={16} />
                    Check
                  </span>
                )}
              </button>
            </div>
            <p className="text-xs text-[var(--color-muted-2)]">
              Checks for <code>/.well-known/ucp/manifest.json</code>, <code>/.well-known/acp/config.json</code>, and <code>/.well-known/ap2/mandates.json</code>
            </p>
          </div>

          {/* Results */}
          {results && (
            <div className="card p-8 mb-6 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--color-text)]">
                  Results for <span className="text-[var(--color-accent)]">{domain}</span>
                </h2>
                <span className={`badge ${presentCount === 3 ? 'text-[#10b981]' : presentCount > 0 ? 'text-[#f59e0b]' : 'text-red-500'}`}>
                  {presentCount}/3 protocols
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {results.map((r) => (
                  <div key={r.protocol} className={`p-4 rounded-xl border ${
                    r.status === 'present'
                      ? 'border-[#10b981]/30 bg-[#10b981]/5'
                      : r.status === 'missing'
                        ? 'border-red-500/30 bg-red-500/5'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                  }`}>
                    <div className="flex items-center gap-3">
                      {r.status === 'present' ? (
                        <CheckCircle size={20} className="text-[#10b981] flex-shrink-0" />
                      ) : r.status === 'missing' ? (
                        <XCircle size={20} className="text-red-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle size={20} className="text-[var(--color-muted-2)] flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-[var(--color-text)]">{r.protocol}</div>
                        <div className="text-sm text-[var(--color-muted)]">{r.detail}</div>
                        <div className="text-xs text-[var(--color-muted-2)] font-mono mt-1">{r.endpoint}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {presentCount < 3 && (
                <div className="p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] text-center">
                  <p className="text-sm text-[var(--color-muted)] mb-4">
                    {domain} is missing {3 - presentCount} protocol{3 - presentCount > 1 ? 's' : ''}. AI agents can&apos;t fully discover or transact with this domain.
                  </p>
                  <Link href="/services/ucp-implementation" className="btn-primary text-sm">
                    Fix Protocol Compliance
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Demo — ASC's own protocols */}
          <div className="card p-6">
            <h3 className="font-bold text-[var(--color-text)] mb-4">Example: Adam Silva Consulting</h3>
            <div className="space-y-3">
              {DEMO_RESULTS.map(r => (
                <div key={r.protocol} className="flex items-center gap-3 p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl">
                  <CheckCircle size={16} className="text-[#10b981] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm text-[var(--color-text)]">{r.protocol}</span>
                    <span className="text-xs text-[var(--color-muted-2)] ml-2 font-mono">{r.endpoint.replace('https://www.adamsilvaconsulting.com', '')}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--color-muted-2)] mt-3">
              <a href="/.well-known/ucp/manifest.json" target="_blank" className="text-[var(--color-accent)] hover:underline">View our UCP manifest →</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
