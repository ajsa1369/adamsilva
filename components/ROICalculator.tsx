'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ROICalculatorProps {
  /** Pre-selected tier (from /packages/[tier] page) */
  defaultTier?: Tier
  /** Unused — kept for backwards compat with server component callers */
  tier?: string
  leads?: string
  rate?: string
  deal?: string
  formAction?: string
  hiddenParams?: Record<string, string>
  className?: string
}

type Tier = 'genesis' | 'essentials' | 'prime' | 'scale'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CAPTURE_RATES: Record<Tier, number> = {
  genesis: 0.15,
  essentials: 0.25,
  prime: 0.40,
  scale: 0.55,
}

const ANNUAL_COSTS: Record<Tier, { setup: number; monthly: number }> = {
  genesis: { setup: 16000, monthly: 3500 },
  essentials: { setup: 28000, monthly: 6500 },
  prime: { setup: 48000, monthly: 12000 },
  scale: { setup: 75000, monthly: 20000 },
}

const TIER_LABELS: Record<Tier, string> = {
  genesis: 'Genesis',
  essentials: 'Essentials',
  prime: 'Prime',
  scale: 'Scale',
}

const TIER_PAGES: Record<Tier, number> = {
  genesis: 50,
  essentials: 100,
  prime: 150,
  scale: 250,
}

const TIERS: Tier[] = ['genesis', 'essentials', 'prime', 'scale']

const TIER_COLORS: Record<Tier, string> = {
  genesis: '#3b82f6',
  essentials: '#6366f1',
  prime: '#2563eb',
  scale: '#8b5cf6',
}

// ---------------------------------------------------------------------------
// ROI Computation
// ---------------------------------------------------------------------------

interface ROIResult {
  monthlyRevenueLift: number
  annualRevenueLift: number
  annualCost: number
  netProfit: number
  roi: number
  paybackMonths: number | null
}

function computeROI(
  tier: Tier,
  leads: number,
  closeRatePct: number,
  dealSize: number,
): ROIResult {
  const captureRate = CAPTURE_RATES[tier]
  const closeRate = closeRatePct / 100
  const pkg = ANNUAL_COSTS[tier]

  const monthlyRevenueLift = leads * captureRate * closeRate * dealSize
  const annualRevenueLift = monthlyRevenueLift * 12
  const annualCost = pkg.setup + pkg.monthly * 12
  const netProfit = annualRevenueLift - annualCost
  const roi = annualCost > 0 ? (netProfit / annualCost) * 100 : 0
  const paybackMonths =
    monthlyRevenueLift > 0 ? Math.ceil(annualCost / monthlyRevenueLift) : null

  return {
    monthlyRevenueLift,
    annualRevenueLift,
    annualCost,
    netProfit,
    roi: Math.max(0, roi),
    paybackMonths,
  }
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function fmt(value: number): string {
  if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M'
  if (value >= 1000) return '$' + Math.round(value / 1000) + 'K'
  return '$' + Math.round(value).toLocaleString('en-US')
}

function fmtFull(value: number): string {
  return '$' + Math.round(value).toLocaleString('en-US')
}

// ---------------------------------------------------------------------------
// Bar Chart component
// ---------------------------------------------------------------------------

function BarChart({
  results,
}: {
  results: { tier: Tier; result: ROIResult }[]
}) {
  const maxRevenue = Math.max(...results.map((r) => r.result.annualRevenueLift), 1)

  return (
    <div className="space-y-3">
      {results.map(({ tier, result }) => {
        const revPct = (result.annualRevenueLift / maxRevenue) * 100
        const costPct = (result.annualCost / maxRevenue) * 100
        const isProfit = result.netProfit > 0

        return (
          <div key={tier} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span
                className="font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                {TIER_LABELS[tier]}{' '}
                <span style={{ color: 'var(--color-muted)' }}>
                  ({TIER_PAGES[tier]} pages)
                </span>
              </span>
              <span
                className="font-mono font-bold"
                style={{ color: isProfit ? '#16a34a' : '#dc2626' }}
              >
                {isProfit ? '+' : ''}{fmtFull(result.netProfit)}
              </span>
            </div>

            {/* Revenue bar */}
            <div className="relative h-6 rounded-md overflow-hidden"
              style={{ background: 'var(--color-surface)' }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(revPct, 2)}%`,
                  background: TIER_COLORS[tier],
                  opacity: 0.85,
                }}
              />
              {/* Cost overlay */}
              <div
                className="absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(costPct, 100)}%`,
                  background: 'var(--color-text)',
                  opacity: 0.12,
                }}
              />
              <div className="absolute inset-0 flex items-center px-2">
                <span className="text-[10px] font-bold text-white drop-shadow-sm">
                  {fmt(result.annualRevenueLift)} rev
                </span>
              </div>
            </div>

            {/* ROI + payback */}
            <div className="flex items-center gap-3 text-[10px]" style={{ color: 'var(--color-muted)' }}>
              <span>{Math.round(result.roi)}% ROI</span>
              <span>
                Payback:{' '}
                {result.paybackMonths === null
                  ? '\u2014'
                  : result.paybackMonths <= 1
                    ? '< 1mo'
                    : `${result.paybackMonths}mo`}
              </span>
              <span>Cost: {fmt(result.annualCost)}</span>
            </div>
          </div>
        )
      })}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2 text-[10px]" style={{ color: 'var(--color-muted)' }}>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-2 rounded-sm" style={{ background: '#3b82f6' }} />
          Annual Revenue
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-2 rounded-sm" style={{ background: 'var(--color-text)', opacity: 0.15 }} />
          Year 1 Cost
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Slider input
// ---------------------------------------------------------------------------

function SliderInput({
  label,
  id,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
}: {
  label: string
  id: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="text-sm font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
        <span
          className="text-sm font-mono font-bold"
          style={{ color: 'var(--color-accent)' }}
        >
          {prefix}{value.toLocaleString('en-US')}{suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
        style={{ background: 'var(--color-border)' }}
      />
      <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--color-muted)' }}>
        <span>{prefix}{min.toLocaleString('en-US')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-US')}{suffix}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ROICalculator({
  defaultTier,
  tier: tierParam,
  leads: leadsParam,
  rate: rateParam,
  deal: dealParam,
  className = '',
}: ROICalculatorProps): React.JSX.Element {
  const initialTier: Tier =
    (tierParam as Tier) ?? defaultTier ?? 'prime'

  const [selectedTier, setSelectedTier] = useState<Tier>(
    TIERS.includes(initialTier as Tier) ? initialTier : 'prime'
  )
  const [leadsPerMonth, setLeadsPerMonth] = useState(
    Math.max(10, Math.min(10000, Number(leadsParam) || 200))
  )
  const [closeRate, setCloseRate] = useState(
    Math.max(1, Math.min(100, Number(rateParam) || 15))
  )
  const [avgDealSize, setAvgDealSize] = useState(
    Math.max(500, Math.min(100000, Number(dealParam) || 5000))
  )

  // Compute ROI for all tiers (for chart comparison)
  const allResults = useMemo(
    () =>
      TIERS.map((tier) => ({
        tier,
        result: computeROI(tier, leadsPerMonth, closeRate, avgDealSize),
      })),
    [leadsPerMonth, closeRate, avgDealSize]
  )

  const selectedResult = allResults.find((r) => r.tier === selectedTier)!.result

  return (
    <section className={`py-12 ${className}`}>
      <h2
        className="font-display text-3xl font-bold tracking-tight mb-2"
        style={{ color: 'var(--color-text)' }}
      >
        Calculate Your ROI
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
        Drag the sliders to see real-time projections across all tiers.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ---- Left panel: Inputs ---- */}
        <div className="space-y-6">
          {/* Tier selector */}
          <fieldset>
            <legend
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Selected Package
            </legend>
            <div className="flex gap-2 flex-wrap">
              {TIERS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    selectedTier === tier
                      ? 'text-white border-transparent shadow-md'
                      : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]'
                  }`}
                  style={
                    selectedTier === tier
                      ? { background: TIER_COLORS[tier] }
                      : undefined
                  }
                >
                  {TIER_LABELS[tier]}
                </button>
              ))}
            </div>
          </fieldset>

          <SliderInput
            label="Leads per Month"
            id="roi-leads"
            value={leadsPerMonth}
            onChange={setLeadsPerMonth}
            min={10}
            max={2000}
            step={10}
          />

          <SliderInput
            label="Close Rate"
            id="roi-close-rate"
            value={closeRate}
            onChange={setCloseRate}
            min={1}
            max={50}
            step={1}
            suffix="%"
          />

          <SliderInput
            label="Average Deal Size"
            id="roi-deal-size"
            value={avgDealSize}
            onChange={setAvgDealSize}
            min={500}
            max={50000}
            step={500}
            prefix="$"
          />
        </div>

        {/* ---- Right panel: Results ---- */}
        <div className="space-y-6">
          {/* Stat cards row */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                Monthly Lift
              </p>
              <p
                className="text-lg font-bold font-display"
                style={{ color: 'var(--color-accent)' }}
              >
                {fmt(selectedResult.monthlyRevenueLift)}
              </p>
            </div>

            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                Annual ROI
              </p>
              <p
                className="text-lg font-bold font-display"
                style={{ color: selectedResult.roi > 0 ? '#16a34a' : 'var(--color-accent)' }}
              >
                {Math.round(selectedResult.roi)}%
              </p>
            </div>

            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                Payback
              </p>
              <p
                className="text-lg font-bold font-display"
                style={{ color: 'var(--color-accent)' }}
              >
                {selectedResult.paybackMonths === null
                  ? '\u2014'
                  : selectedResult.paybackMonths <= 1
                    ? '< 1mo'
                    : `${selectedResult.paybackMonths}mo`}
              </p>
            </div>
          </div>

          {/* Comparison bar chart */}
          <div
            className="rounded-xl p-5"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-xs font-semibold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Year 1 Revenue vs Cost — All Tiers
            </p>
            <BarChart results={allResults} />
          </div>

          <p
            className="text-xs"
            style={{ color: 'var(--color-muted-2)' }}
          >
            Projections based on AI capture rate benchmarks per tier. Actual results vary.
            Year 1 cost includes setup fee + 12 months support.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link href="/get-started" className="btn-primary inline-block">
          Get Your Custom Proposal &rarr;
        </Link>
      </div>
    </section>
  )
}
