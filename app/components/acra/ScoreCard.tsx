'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Info, CheckCircle, ArrowRight } from 'lucide-react'
import type { PillarScore } from '@/lib/acra/scoring'
import { ScoreGauge } from './ScoreGauge'

const STATUS_COLORS: Record<PillarScore['status'], string> = {
  critical: '#ef4444',
  'needs-work': '#f97316',
  good: '#22c55e',
  excellent: '#10b981',
}

const STATUS_LABELS: Record<PillarScore['status'], string> = {
  critical: 'Critical Gap',
  'needs-work': 'Needs Work',
  good: 'Good',
  excellent: 'Excellent',
}

const SEVERITY_ICON = {
  critical: AlertTriangle,
  high: AlertCircle,
  medium: Info,
  low: CheckCircle,
}

const SEVERITY_COLOR = {
  critical: 'text-red-500',
  high: 'text-orange-500',
  medium: 'text-yellow-500',
  low: 'text-green-600',
}

export function ScoreCard({ pillar }: { pillar: PillarScore }) {
  const [open, setOpen] = useState(pillar.status === 'critical')
  const color = STATUS_COLORS[pillar.status]

  return (
    <div
      className="card overflow-hidden"
      style={{ borderTop: `3px solid ${color}` }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 flex items-center gap-4 text-left hover:bg-[var(--color-surface-2)] transition-colors"
        aria-expanded={open}
      >
        <ScoreGauge score={pillar.score} grade={pillar.grade} size="sm" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[var(--color-text)] text-sm">{pillar.label}</h3>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${color}20`, color }}
            >
              {STATUS_LABELS[pillar.status]}
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted-2)] mt-0.5 leading-snug">{pillar.summary}</p>
        </div>

        <div className="shrink-0 text-[var(--color-muted-2)]">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded findings */}
      {open && (
        <div className="px-5 pb-5 border-t border-[var(--color-border)]">
          {pillar.findings.length === 0 ? (
            <div className="flex items-center gap-2 pt-4 text-green-600 text-sm">
              <CheckCircle size={16} />
              <span>No critical issues detected in this category.</span>
            </div>
          ) : (
            <ul className="space-y-3 pt-4">
              {pillar.findings.map((finding, i) => {
                const Icon = SEVERITY_ICON[finding.severity]
                return (
                  <li key={i} className="flex gap-3">
                    <Icon size={16} className={`shrink-0 mt-0.5 ${SEVERITY_COLOR[finding.severity]}`} />
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text)]">{finding.title}</div>
                      <div className="text-xs text-[var(--color-muted)] mt-0.5 leading-relaxed">{finding.detail}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {pillar.serviceUpsell && (
            <div
              className="mt-4 p-4 rounded-xl flex items-center justify-between gap-3"
              style={{ background: 'color-mix(in srgb, #2563eb 8%, transparent)', border: '1px solid color-mix(in srgb, #2563eb 20%, transparent)' }}
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-0.5">
                  Fix This Gap
                </div>
                <div className="text-sm font-semibold text-[var(--color-text)]">{pillar.serviceUpsell.name}</div>
                <div className="text-xs text-[var(--color-muted-2)]">{pillar.serviceUpsell.urgency}</div>
              </div>
              <a
                href={`/services/${pillar.serviceUpsell.slug}`}
                className="btn-primary text-xs py-2 px-3 shrink-0 whitespace-nowrap flex items-center gap-1"
              >
                {pillar.serviceUpsell.price} <ArrowRight size={12} />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
