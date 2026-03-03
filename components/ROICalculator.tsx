'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ROICalculatorProps {
  defaultTier?: 'bronze' | 'silver' | 'gold'  // pre-selects tier when on /packages/[tier]
  className?: string
}

type Tier = 'bronze' | 'silver' | 'gold'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Agent capture rates — baseline lift from 24/7 AI capture */
const CAPTURE_RATES: Record<Tier, number> = {
  bronze: 0.15,
  silver: 0.25,
  gold: 0.40,
} as const

/** Package annual costs for ROI denominator */
const ANNUAL_COSTS: Record<Tier, { setup: number; monthly: number }> = {
  bronze: { setup: 16000, monthly: 3500 },
  silver: { setup: 28000, monthly: 6500 },
  gold: { setup: 48000, monthly: 12000 },
} as const

const TIER_LABELS: Record<Tier, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
}

const TIERS: Tier[] = ['bronze', 'silver', 'gold']

// ---------------------------------------------------------------------------
// ROI Computation (pure function)
// ---------------------------------------------------------------------------

interface ROIResult {
  monthlyRevenueLift: number
  annualRevenueLift: number
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
  const annualCost = pkg.monthly * 12
  const roi =
    annualCost > 0
      ? ((annualRevenueLift - annualCost) / pkg.setup) * 100
      : 0
  const paybackMonths =
    monthlyRevenueLift > 0 ? Math.ceil(pkg.setup / monthlyRevenueLift) : null

  return {
    monthlyRevenueLift,
    annualRevenueLift,
    roi: Math.max(0, roi), // never show negative ROI
    paybackMonths,
  }
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatCurrency(value: number): string {
  return '$' + Math.round(value).toLocaleString('en-US')
}

function formatPayback(months: number | null): string {
  if (months === null) return '\u2014' // em dash
  if (months <= 1) return '< 1 month'
  return `${months} months`
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ROICalculator({
  defaultTier,
  className = '',
}: ROICalculatorProps): React.JSX.Element {
  const [selectedTier, setSelectedTier] = useState<Tier>(defaultTier ?? 'gold')
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(200)
  const [closeRate, setCloseRate] = useState<number>(15)
  const [avgDealSize, setAvgDealSize] = useState<number>(5000)

  const result = useMemo(
    () => computeROI(selectedTier, leadsPerMonth, closeRate, avgDealSize),
    [selectedTier, leadsPerMonth, closeRate, avgDealSize],
  )

  return (
    <section className={`py-12 ${className}`}>
      <h2
        className="font-display text-3xl font-bold tracking-tight mb-8"
        style={{ color: 'var(--color-text)' }}
      >
        Calculate Your ROI
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ---- Left panel: Inputs ---- */}
        <div className="space-y-6">
          {/* Tier selector */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Package
            </label>
            <div className="flex gap-2">
              {TIERS.map((tier) => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedTier(tier)}
                  aria-label={`Select ${TIER_LABELS[tier]} package`}
                >
                  {TIER_LABELS[tier]}
                </Button>
              ))}
            </div>
          </div>

          {/* Leads per month */}
          <div>
            <label
              htmlFor="roi-leads"
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Leads per Month
            </label>
            <input
              id="roi-leads"
              type="number"
              min={1}
              max={10000}
              value={leadsPerMonth}
              onChange={(e) =>
                setLeadsPerMonth(
                  Math.max(1, Math.min(10000, Number(e.target.value) || 1)),
                )
              }
              className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          </div>

          {/* Close rate */}
          <div>
            <label
              htmlFor="roi-close-rate"
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Close Rate:{' '}
              <span style={{ color: 'var(--color-accent)' }}>{closeRate}%</span>
            </label>
            <input
              id="roi-close-rate"
              type="range"
              min={1}
              max={100}
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: 'var(--color-accent)' }}
            />
            <div
              className="flex justify-between text-xs mt-1"
              style={{ color: 'var(--color-muted-2)' }}
            >
              <span>1%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Average deal size */}
          <div>
            <label
              htmlFor="roi-deal-size"
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Average Deal Size
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                style={{ color: 'var(--color-muted)' }}
              >
                $
              </span>
              <input
                id="roi-deal-size"
                type="number"
                min={100}
                value={avgDealSize}
                onChange={(e) =>
                  setAvgDealSize(Math.max(100, Number(e.target.value) || 100))
                }
                className="w-full rounded-lg pl-7 pr-4 py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ---- Right panel: Output stat cards ---- */}
        <div className="space-y-4">
          {/* Monthly Revenue Lift */}
          <div
            className="card rounded-xl p-6"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-muted)' }}
            >
              Monthly Revenue Lift
            </p>
            <p
              className="text-3xl font-bold font-display"
              style={{ color: 'var(--color-accent)' }}
            >
              {formatCurrency(result.monthlyRevenueLift)}
            </p>
          </div>

          {/* Annual ROI */}
          <div
            className="card rounded-xl p-6"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-muted)' }}
            >
              Annual ROI
            </p>
            <p
              className="text-3xl font-bold font-display"
              style={{ color: 'var(--color-accent)' }}
            >
              {Math.round(result.roi).toLocaleString('en-US')}%
            </p>
          </div>

          {/* Payback Period */}
          <div
            className="card rounded-xl p-6"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--color-muted)' }}
            >
              Payback Period
            </p>
            <p
              className="text-3xl font-bold font-display"
              style={{ color: 'var(--color-accent)' }}
            >
              {formatPayback(result.paybackMonths)}
            </p>
          </div>

          {/* Disclaimer */}
          <p
            className="text-xs mt-2"
            style={{ color: 'var(--color-muted-2)' }}
          >
            Projections based on industry benchmarks. Actual results vary.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Button variant="primary" size="lg" href="/get-started">
          Get Your Custom Proposal &rarr;
        </Button>
      </div>
    </section>
  )
}
