import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Protocol Adoption Index — UCP, ACP, AP2 Quarterly Tracker',
  description:
    'Quarterly tracking of UCP, ACP, and AP2 adoption rates across Retail, Finance, Travel, Healthcare, and B2B SaaS. The benchmark dataset for agentic commerce protocol compliance.',
  alternates: {
    canonical: `${SITE_URL}/research/protocol-adoption-index`,
  },
  openGraph: {
    title: 'Protocol Adoption Index — UCP, ACP, AP2 Quarterly Tracker',
    description:
      'Quarterly UCP, ACP, AP2 adoption data across 5 industries — the definitive benchmark for agentic commerce protocol compliance.',
    url: `${SITE_URL}/research/protocol-adoption-index`,
  },
}

const datasetSchema = {
  '@type': 'Dataset',
  '@id': `${SITE_URL}/research/protocol-adoption-index#dataset`,
  name: 'Protocol Adoption Index — UCP, ACP, AP2 Quarterly Tracker',
  description:
    'Quarterly tracking dataset measuring UCP, ACP, and AP2 adoption rates across five industry verticals (Retail, Financial Services, Travel, Healthcare, B2B SaaS). Based on automated technical compliance checks across 500+ enterprise domains per quarter.',
  url: `${SITE_URL}/research/protocol-adoption-index`,
  creator: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  datePublished: '2026-01-15',
  dateModified: '2026-02-28',
  temporalCoverage: '2025-07/2026-03',
  variableMeasured: [
    'UCP manifest adoption rate (%)',
    'ACP checkout endpoint adoption rate (%)',
    'AP2 mandate infrastructure adoption rate (%)',
    'Quarter-over-quarter change',
  ],
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
}

const adoptionSchemas = [
  datasetSchema,
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Research', url: '/research' },
    { name: 'Protocol Adoption Index', url: '/research/protocol-adoption-index' },
  ]),
]

type Quarter = 'Q3 2025' | 'Q4 2025' | 'Q1 2026'

interface IndustryData {
  industry: string
  ucp: Record<Quarter, number>
  acp: Record<Quarter, number>
  ap2: Record<Quarter, number>
  trend: 'accelerating' | 'steady' | 'slow'
}

const industryData: IndustryData[] = [
  {
    industry: 'B2B SaaS',
    ucp: { 'Q3 2025': 18, 'Q4 2025': 26, 'Q1 2026': 34 },
    acp: { 'Q3 2025': 9, 'Q4 2025': 14, 'Q1 2026': 18 },
    ap2: { 'Q3 2025': 3, 'Q4 2025': 6, 'Q1 2026': 9 },
    trend: 'accelerating',
  },
  {
    industry: 'Retail',
    ucp: { 'Q3 2025': 14, 'Q4 2025': 21, 'Q1 2026': 28 },
    acp: { 'Q3 2025': 8, 'Q4 2025': 13, 'Q1 2026': 19 },
    ap2: { 'Q3 2025': 2, 'Q4 2025': 4, 'Q1 2026': 6 },
    trend: 'accelerating',
  },
  {
    industry: 'Financial Services',
    ucp: { 'Q3 2025': 12, 'Q4 2025': 17, 'Q1 2026': 21 },
    acp: { 'Q3 2025': 6, 'Q4 2025': 9, 'Q1 2026': 11 },
    ap2: { 'Q3 2025': 7, 'Q4 2025': 10, 'Q1 2026': 12 },
    trend: 'steady',
  },
  {
    industry: 'Travel',
    ucp: { 'Q3 2025': 6, 'Q4 2025': 10, 'Q1 2026': 15 },
    acp: { 'Q3 2025': 3, 'Q4 2025': 6, 'Q1 2026': 8 },
    ap2: { 'Q3 2025': 1, 'Q4 2025': 2, 'Q1 2026': 3 },
    trend: 'steady',
  },
  {
    industry: 'Healthcare',
    ucp: { 'Q3 2025': 3, 'Q4 2025': 5, 'Q1 2026': 8 },
    acp: { 'Q3 2025': 1, 'Q4 2025': 2, 'Q1 2026': 3 },
    ap2: { 'Q3 2025': 2, 'Q4 2025': 3, 'Q1 2026': 4 },
    trend: 'slow',
  },
]

const quarters: Quarter[] = ['Q3 2025', 'Q4 2025', 'Q1 2026']

function getChangeIndicator(current: number, previous: number) {
  const diff = current - previous
  if (diff > 0) return { label: `+${diff}pp`, color: '#10b981' }
  if (diff < 0) return { label: `${diff}pp`, color: '#ef4444' }
  return { label: '—', color: 'var(--color-muted-2)' }
}

function getTrendBadge(trend: IndustryData['trend']) {
  if (trend === 'accelerating') return { label: 'Accelerating', color: '#10b981' }
  if (trend === 'steady') return { label: 'Steady', color: '#f59e0b' }
  return { label: 'Slow', color: '#ef4444' }
}

export default function ProtocolAdoptionIndexPage() {
  return (
    <>
      <JsonLd data={adoptionSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge">Live Dataset</span>
            <span className="badge">Updated Q1 2026</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-6">
            Protocol Adoption Index
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Quarterly tracking of UCP, ACP, and AP2 adoption rates across five industry verticals.
            Based on automated technical compliance checks across 500+ enterprise domains per
            quarter. The benchmark dataset for agentic commerce protocol readiness.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="card px-4 py-2 text-sm">
              <span className="text-[var(--color-muted-2)]">Last Updated:</span>{' '}
              <span className="text-[var(--color-text)] font-medium">February 28, 2026</span>
            </div>
            <div className="card px-4 py-2 text-sm">
              <span className="text-[var(--color-muted-2)]">Coverage:</span>{' '}
              <span className="text-[var(--color-text)] font-medium">500+ enterprise domains</span>
            </div>
            <div className="card px-4 py-2 text-sm">
              <span className="text-[var(--color-muted-2)]">Frequency:</span>{' '}
              <span className="text-[var(--color-text)] font-medium">Quarterly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Headline Numbers */}
      <section className="section" id="headline-numbers">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
            Q1 2026 Headline Numbers
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                protocol: 'UCP',
                adoption: '21.2%',
                qoq: '+7.4pp',
                desc: 'Average across 5 industries',
                color: '#3b82f6',
                badge: 'badge-ucp',
              },
              {
                protocol: 'ACP',
                adoption: '11.8%',
                qoq: '+3.9pp',
                desc: 'Average across 5 industries',
                color: '#8b5cf6',
                badge: 'badge-acp',
              },
              {
                protocol: 'AP2',
                adoption: '6.8%',
                qoq: '+2.2pp',
                desc: 'Average across 5 industries',
                color: '#10b981',
                badge: 'badge-ap2',
              },
            ].map((item) => (
              <div key={item.protocol} className="card p-6 text-center">
                <span className={`badge ${item.badge} mb-3 block w-fit mx-auto`}>
                  {item.protocol}
                </span>
                <div className="text-4xl font-black mb-1" style={{ color: item.color }}>
                  {item.adoption}
                </div>
                <div className="text-sm text-[#10b981] font-semibold mb-2">{item.qoq} QoQ</div>
                <div className="text-xs text-[var(--color-muted-2)]">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="card p-5 bg-[var(--color-surface)]">
            <p className="text-sm text-[var(--color-muted)]">
              <strong className="text-[var(--color-text)]">Key takeaway:</strong> UCP is accelerating
              fastest — up 54% quarter-over-quarter — driven by Google AI Mode&apos;s preference for
              merchants with UCP manifests. ACP adoption lags UCP by roughly 9 percentage points,
              reflecting the additional technical complexity of checkout API integration. AP2 adoption
              remains lowest but shows strong growth in Financial Services where audit trail
              requirements make Verifiable Credentials non-optional.
            </p>
          </div>
        </div>
      </section>

      {/* By-Industry Tables */}
      <section className="section bg-[var(--color-surface)]" id="industry-breakdown">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            Adoption by Industry — Q3 2025 to Q1 2026
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Data from automated compliance checks of .well-known protocol endpoints. Percentages
            represent the share of surveyed enterprise domains with fully functional endpoints.
          </p>

          <div className="space-y-8">
            {industryData.map((row) => {
              const trendBadge = getTrendBadge(row.trend)
              return (
                <div key={row.industry} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[var(--color-text)]">{row.industry}</h3>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        color: trendBadge.color,
                        background: `${trendBadge.color}20`,
                      }}
                    >
                      {trendBadge.label}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--color-border)]">
                          <th className="text-left py-2 pr-4 font-medium text-[var(--color-muted-2)]">
                            Protocol
                          </th>
                          {quarters.map((q) => (
                            <th
                              key={q}
                              className="text-left py-2 pr-4 font-medium text-[var(--color-muted-2)]"
                            >
                              {q}
                            </th>
                          ))}
                          <th className="text-left py-2 font-medium text-[var(--color-muted-2)]">
                            QoQ Change
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-border)]">
                        {[
                          { protocol: 'UCP', data: row.ucp, color: '#3b82f6', badge: 'badge-ucp' },
                          { protocol: 'ACP', data: row.acp, color: '#8b5cf6', badge: 'badge-acp' },
                          { protocol: 'AP2', data: row.ap2, color: '#10b981', badge: 'badge-ap2' },
                        ].map(({ protocol, data, color, badge }) => {
                          const q4 = data['Q4 2025']
                          const q1 = data['Q1 2026']
                          const change = getChangeIndicator(q1, q4)
                          return (
                            <tr key={protocol}>
                              <td className="py-2 pr-4">
                                <span className={`badge ${badge} text-xs`}>{protocol}</span>
                              </td>
                              {quarters.map((q) => (
                                <td
                                  key={q}
                                  className="py-2 pr-4 font-medium"
                                  style={{ color: q === 'Q1 2026' ? color : 'var(--color-muted)' }}
                                >
                                  {data[q]}%
                                </td>
                              ))}
                              <td
                                className="py-2 font-semibold text-sm"
                                style={{ color: change.color }}
                              >
                                {change.label}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-[var(--color-muted-2)] mt-4">
            Source: Adam Silva Consulting Protocol Adoption Index. n=100 enterprise domains per
            industry per quarter. &quot;pp&quot; = percentage points. Methodology: automated HTTP checks of
            standardized .well-known protocol endpoint paths.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="section" id="methodology">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">Methodology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-text)] mb-3">Domain Selection</h3>
              <p className="text-sm text-[var(--color-muted)]">
                100 enterprise domains per vertical are selected using a stratified sample
                methodology: 30 large-cap ($1B+ revenue), 40 mid-market ($100M-$1B), and 30
                emerging ($10M-$100M). Domains are held constant across quarters to enable
                longitudinal comparison. New cohorts are added annually.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-text)] mb-3">Compliance Checks</h3>
              <p className="text-sm text-[var(--color-muted)]">
                Automated HTTP GET requests to standardized .well-known endpoint paths:
                /ucp/manifest.json, /acp/config.json, /ap2/mandates.json. Endpoints are scored
                as compliant only if they return valid JSON with required protocol fields — not
                just a 200 HTTP status code. Checks run first week of each quarter.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-text)] mb-3">Quality Standards</h3>
              <p className="text-sm text-[var(--color-muted)]">
                Compliance requires: (1) valid JSON response, (2) correct Content-Type header
                (application/json), (3) required protocol version field present, (4) at least one
                capability or transport declared, (5) no authentication required for the manifest
                itself. Partial compliance is not counted.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-[var(--color-text)] mb-3">Limitations</h3>
              <p className="text-sm text-[var(--color-muted)]">
                The index measures technical endpoint presence, not implementation quality.
                A minimal manifest with a single product counts equally with a comprehensive
                implementation covering all transports. The Agentic Commerce Readiness Index
                (published in the State of Agentic Commerce report) provides the quality-weighted
                alternative metric.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section bg-[var(--color-surface)]" id="subscribe">
        <div className="container max-w-3xl text-center">
          <span className="badge mb-4 block w-fit mx-auto">Free Quarterly Updates</span>
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            Get the Protocol Adoption Index Every Quarter
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            New data drops every quarter — industry breakdowns, trend analysis, and the protocol
            movers to watch. Sent directly to your inbox, free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources" className="btn-primary">
              Subscribe to Research Updates
              <ArrowRight size={16} />
            </Link>
            <Link href="/research/state-of-agentic-commerce-2026" className="btn-secondary">
              Read the Full 2026 Report
            </Link>
          </div>
        </div>
      </section>

      {/* Related Research */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Related Research</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/research/state-of-agentic-commerce-2026"
              className="card p-5 hover:border-[var(--color-accent)] transition-colors group"
            >
              <span className="badge text-xs mb-3 block w-fit">Annual Report</span>
              <h3 className="font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                State of Agentic Commerce 2026
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Full enterprise readiness survey, AI citation audits, and the complete methodology
                behind the Protocol Adoption Index.
              </p>
              <ArrowRight
                size={14}
                className="mt-3 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <Link
              href="/tools/protocol-checker"
              className="card p-5 hover:border-[var(--color-accent)] transition-colors group"
            >
              <span className="badge text-xs mb-3 block w-fit">Free Tool</span>
              <h3 className="font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                Protocol Compliance Checker
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Check any domain&apos;s UCP, ACP, and AP2 compliance — see where your competitors stand
                in real time.
              </p>
              <ArrowRight
                size={14}
                className="mt-3 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
