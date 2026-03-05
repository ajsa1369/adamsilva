'use client'

/**
 * SavingsCounter
 *
 * Animated panel that shows the financial case for acting now:
 *   Monthly revenue at risk  (what AI gaps are costing you)
 *   Package monthly cost     (what ASC charges)
 *   Net monthly recovery     (what you get back after fees)
 *   Break-even point         (months until ROI is positive)
 *
 * Numbers count up from 0 on first mount to create urgency.
 */

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react'

interface Props {
  monthlyAtRisk: number     // projected monthly revenue loss from ACRA gaps
  annualAtRisk: number      // annual version of above
  setupPrice: number        // package one-time setup cost
  monthlyPrice: number      // package monthly retainer
  packageName: string       // "Gold", "Silver", "Bronze"
}

function formatK(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${n.toLocaleString()}`
}

function useCountUp(target: number, duration = 1400, delay = 0): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const start = () => {
      startTimeRef.current = null
      const tick = (now: number) => {
        if (startTimeRef.current === null) startTimeRef.current = now
        const elapsed = now - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    delayTimerRef.current = setTimeout(start, delay)

    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, delay])

  return value
}

export function SavingsCounter({ monthlyAtRisk, annualAtRisk, setupPrice, monthlyPrice, packageName }: Props) {
  const netMonthlyRecovery = Math.max(0, monthlyAtRisk - monthlyPrice)
  const breakEvenMonths = netMonthlyRecovery > 0 ? Math.ceil(setupPrice / netMonthlyRecovery) : null
  const firstYearROI = netMonthlyRecovery > 0
    ? Math.round(((netMonthlyRecovery * 12 - setupPrice) / (setupPrice + monthlyPrice * 12)) * 100)
    : 0

  const animAtRisk = useCountUp(monthlyAtRisk, 1400, 100)
  const animMonthly = useCountUp(monthlyPrice, 1200, 300)
  const animRecovery = useCountUp(netMonthlyRecovery, 1600, 500)
  const animROI = useCountUp(Math.max(0, firstYearROI), 1800, 700)

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: 'color-mix(in srgb, #10b981 30%, transparent)', background: 'linear-gradient(135deg, #10b98108, #10b98104)' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign size={18} className="text-emerald-500" />
          <h4 className="font-bold text-[var(--color-text)]">ROI Case — {packageName} Package</h4>
        </div>
        <p className="text-xs text-[var(--color-muted-2)]">
          One-time setup fee of <strong className="text-[var(--color-text)]">{formatK(setupPrice)}</strong> builds the infrastructure. The continuity plan keeps it current. Here is the revenue math.
        </p>
      </div>

      {/* Four stat tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-border)] mx-5 mb-4 rounded-xl overflow-hidden">
        {/* Tile: monthly at risk */}
        <div className="bg-[var(--color-surface)] p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
            <TrendingDown size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-wide">Monthly Loss</span>
          </div>
          <div className="text-2xl font-black tabular-nums" style={{ color: '#ef4444' }}>
            {formatK(animAtRisk)}
          </div>
          <div className="text-[10px] text-[var(--color-muted-2)] mt-0.5">AI revenue at risk/mo</div>
        </div>

        {/* Tile: continuity plan cost */}
        <div className="bg-[var(--color-surface)] p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-[var(--color-muted-2)] mb-1">
            <DollarSign size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-wide">Continuity Plan</span>
          </div>
          <div className="text-2xl font-black tabular-nums text-[var(--color-muted)]">
            {formatK(animMonthly)}
          </div>
          <div className="text-[10px] text-[var(--color-muted-2)] mt-0.5">ongoing updates/mo</div>
        </div>

        {/* Tile: net monthly recovery */}
        <div className="bg-[var(--color-surface)] p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
            <TrendingUp size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-wide">Net Recovery</span>
          </div>
          <div className="text-2xl font-black tabular-nums" style={{ color: '#10b981' }}>
            {formatK(animRecovery)}
          </div>
          <div className="text-[10px] text-[var(--color-muted-2)] mt-0.5">net recovered/mo</div>
        </div>

        {/* Tile: first-year ROI */}
        <div className="bg-[var(--color-surface)] p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
            <Clock size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-wide">Year 1 ROI</span>
          </div>
          <div className="text-2xl font-black tabular-nums" style={{ color: '#f59e0b' }}>
            {animROI > 0 ? `${animROI}%` : '—'}
          </div>
          <div className="text-[10px] text-[var(--color-muted-2)] mt-0.5">
            {breakEvenMonths ? `setup breaks even: mo ${breakEvenMonths}` : 'within 12 months'}
          </div>
        </div>
      </div>

      {/* Continuity plan explainer */}
      <div className="px-5 pb-3">
        <div className="flex items-start gap-2 text-xs text-[var(--color-muted-2)] bg-[var(--color-surface-2)] rounded-lg px-3 py-2">
          <Clock size={12} className="shrink-0 mt-0.5 text-[var(--color-muted-2)]" />
          <span>
            <strong className="text-[var(--color-muted)]">Continuity plan</strong> — a monthly allocation of hours to keep your infrastructure current as AI models, protocols, and ranking signals evolve. New model releases, protocol updates, and schema changes are applied automatically.
          </span>
        </div>
      </div>

      {/* Narrative bar */}
      <div className="px-5 pb-5">
        <div className="flex items-start gap-3 p-3 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-border)]">
          <TrendingUp size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <span className="text-[var(--color-muted)] leading-relaxed">
            Your site is losing an estimated{' '}
            <strong className="text-[var(--color-text)]">{formatK(annualAtRisk)}/year</strong>{' '}
            to AI commerce gaps. One-time setup investment:{' '}
            <strong className="text-[var(--color-text)]">{formatK(setupPrice)}</strong>.{' '}
            Continuity plan to stay current:{' '}
            <strong className="text-[var(--color-text)]">{formatK(monthlyPrice)}/mo</strong>.
            {netMonthlyRecovery > 0 && (
              <> Net monthly recovery after continuity:{' '}
              <strong className="text-emerald-600">{formatK(netMonthlyRecovery)}/mo</strong>.
              {breakEvenMonths && breakEvenMonths <= 18 && (
                <> Setup investment breaks even in approximately{' '}
                <strong className="text-[var(--color-text)]">{breakEvenMonths} month{breakEvenMonths !== 1 ? 's' : ''}</strong>.</>
              )}</>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
