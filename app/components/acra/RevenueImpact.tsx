'use client'

import { useEffect, useState } from 'react'
import { TrendingDown, DollarSign, AlertTriangle } from 'lucide-react'
import type { RevenueImpact } from '@/lib/acra/revenue'
import { formatCurrency } from '@/lib/acra/revenue'
import Link from 'next/link'

interface Props {
  impact: RevenueImpact
  url: string
}

export function RevenueImpactPanel({ impact, url }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(t)
  }, [])
  const domain = (() => { try { return new URL(url.startsWith('http') ? url : `https://${url}`).hostname } catch { return url } })()

  return (
    <div className="card overflow-hidden">
      {/* Red alert header */}
      <div
        className="p-5 text-white"
        style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle size={24} className="shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold">Revenue at Risk from AI Gaps</h2>
            <p className="text-red-100 text-sm mt-1">
              Based on current agentic commerce growth rates and your ACRA scores for <strong>{domain}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Big numbers row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[var(--color-border)] border-b border-[var(--color-border)]">
        <MetricCell
          label="Monthly Revenue at Risk"
          value={formatCurrency(impact.monthlyAtRisk)}
          sublabel="from AI gaps"
          color="#ef4444"
          icon={TrendingDown}
        />
        <MetricCell
          label="Annual Revenue at Risk"
          value={formatCurrency(impact.annualAtRisk)}
          sublabel="if unaddressed"
          color="#dc2626"
          icon={DollarSign}
        />
        <MetricCell
          label="Your AI Market Share"
          value={`${impact.yourAIShare}%`}
          sublabel="of AI-driven revenue"
          color="#f97316"
          icon={TrendingDown}
        />
        <MetricCell
          label="Competitor AI Share"
          value={`${impact.competitorAIShare}%`}
          sublabel="industry avg"
          color="#6b7280"
          icon={TrendingDown}
        />
      </div>

      {/* Gap breakdown */}
      <div className="p-5">
        <h3 className="text-sm font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
          <TrendingDown size={16} className="text-red-500" />
          Revenue Loss Breakdown by Gap
        </h3>

        <div className="space-y-3">
          {impact.breakdown.map((item, i) => {
            const barWidth = Math.min(100, (item.monthlyLoss / Math.max(1, impact.monthlyAtRisk)) * 100)
            const barColor = item.urgency === 'critical' ? '#ef4444' : item.urgency === 'high' ? '#f97316' : '#f59e0b'
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[var(--color-text)]">{item.gap}</span>
                    <span className="text-xs font-bold text-red-500">{formatCurrency(item.monthlyLoss)}/mo</span>
                  </div>
                  <div className="h-2 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: mounted ? `${barWidth}%` : '0%',
                        background: barColor,
                        transition: `width 0.9s cubic-bezier(0.34, 1.2, 0.64, 1) ${i * 120}ms`,
                        boxShadow: mounted ? `0 0 8px ${barColor}60` : 'none',
                      }}
                    />
                  </div>
                  <p className="text-xs text-[var(--color-muted-2)] mt-1 leading-snug">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 12-month projection */}
        <div
          className="mt-5 p-4 rounded-xl border"
          style={{ background: 'color-mix(in srgb, #ef4444 6%, transparent)', borderColor: 'color-mix(in srgb, #ef4444 20%, transparent)' }}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">12-Month Projection</div>
          <p className="text-sm text-[var(--color-text)]">
            Gartner projects <strong>50% of all search traffic</strong> will shift to AI answer engines by 2026. At 48% YoY AI commerce growth,
            your monthly revenue at risk reaches{' '}
            <strong className="text-red-500">{formatCurrency(impact.projectedIn12Months)}/month</strong> by this time next year
            if these gaps remain unaddressed. Every week of inaction, competitors cement their citation advantage in LLM training data — a position
            that compounds over time and becomes increasingly expensive to close.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Link href="/services/acra" className="btn-primary flex-1 text-center justify-center">
            Book Free Strategy Call
          </Link>
          <Link href="/contact" className="btn-secondary flex-1 text-center justify-center">
            Get Custom Remediation Plan
          </Link>
        </div>
      </div>
    </div>
  )
}

function MetricCell({
  label,
  value,
  sublabel,
  color,
  icon: Icon,
}: {
  label: string
  value: string
  sublabel: string
  color: string
  icon: React.ElementType
}) {
  return (
    <div className="p-4 flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Icon size={14} style={{ color }} />
        <span className="text-xs text-[var(--color-muted-2)]">{label}</span>
      </div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-[var(--color-muted-2)]">{sublabel}</div>
    </div>
  )
}
