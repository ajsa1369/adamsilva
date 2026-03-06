import React from 'react'
import Link from 'next/link'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ROICalculatorProps {
  /** Pre-selected tier (from /packages/[tier] page) */
  defaultTier?: 'starter' | 'pro' | 'max'
  /** Current values from URL searchParams */
  tier?: string
  leads?: string
  rate?: string
  deal?: string
  /** Form action URL — e.g. "/packages" or "/packages/max" */
  formAction: string
  /** Extra hidden inputs to preserve in form (e.g. { view: 'monthly' }) */
  hiddenParams?: Record<string, string>
  className?: string
}

type Tier = 'starter' | 'pro' | 'max'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CAPTURE_RATES: Record<Tier, number> = {
  starter: 0.15,
  pro: 0.25,
  max: 0.40,
}

const ANNUAL_COSTS: Record<Tier, { setup: number; monthly: number }> = {
  starter: { setup: 16000, monthly: 3500 },
  pro: { setup: 28000, monthly: 6500 },
  max: { setup: 48000, monthly: 12000 },
}

const TIER_LABELS: Record<Tier, string> = {
  starter: 'Starter',
  pro: 'Pro',
  max: 'Max',
}

const TIERS: Tier[] = ['starter', 'pro', 'max']

// ---------------------------------------------------------------------------
// ROI Computation (pure function — runs on server)
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
    roi: Math.max(0, roi),
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
  if (months === null) return '\u2014'
  if (months <= 1) return '< 1 month'
  return `${months} months`
}

function isValidTier(value: string | undefined): value is Tier {
  return value === 'starter' || value === 'pro' || value === 'max'
}

// ---------------------------------------------------------------------------
// Component (server component — no 'use client')
// ---------------------------------------------------------------------------

export function ROICalculator({
  defaultTier,
  tier: tierParam,
  leads: leadsParam,
  rate: rateParam,
  deal: dealParam,
  formAction,
  hiddenParams,
  className = '',
}: ROICalculatorProps): React.JSX.Element {
  // Parse URL params with fallbacks
  const selectedTier: Tier = isValidTier(tierParam)
    ? tierParam
    : defaultTier ?? 'max'
  const leadsPerMonth = Math.max(1, Math.min(10000, Number(leadsParam) || 200))
  const closeRate = Math.max(1, Math.min(100, Number(rateParam) || 15))
  const avgDealSize = Math.max(100, Number(dealParam) || 5000)

  // Compute ROI server-side
  const result = computeROI(selectedTier, leadsPerMonth, closeRate, avgDealSize)

  // Check if user has submitted the form (any roi param present)
  const hasSubmitted = tierParam || leadsParam || rateParam || dealParam

  return (
    <section className={`py-12 ${className}`}>
      <h2
        className="font-display text-3xl font-bold tracking-tight mb-8"
        style={{ color: 'var(--color-text)' }}
      >
        Calculate Your ROI
      </h2>

      <form method="GET" action={formAction}>
        {/* Preserve non-ROI params */}
        {hiddenParams &&
          Object.entries(hiddenParams).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ---- Left panel: Inputs ---- */}
          <div className="space-y-6">
            {/* Tier selector — radio buttons (server-friendly) */}
            <fieldset>
              <legend
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Package
              </legend>
              <div className="flex gap-2">
                {TIERS.map((tier) => (
                  <label
                    key={tier}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border cursor-pointer transition-colors ${
                      selectedTier === tier
                        ? 'bg-[var(--color-accent)] text-white border-transparent'
                        : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={tier}
                      defaultChecked={selectedTier === tier}
                      className="sr-only"
                    />
                    {TIER_LABELS[tier]}
                  </label>
                ))}
              </div>
            </fieldset>

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
                name="leads"
                type="number"
                min={1}
                max={10000}
                defaultValue={leadsPerMonth}
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
                Close Rate (%)
              </label>
              <input
                id="roi-close-rate"
                name="rate"
                type="number"
                min={1}
                max={100}
                defaultValue={closeRate}
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Average deal size */}
            <div>
              <label
                htmlFor="roi-deal-size"
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Average Deal Size ($)
              </label>
              <input
                id="roi-deal-size"
                name="deal"
                type="number"
                min={100}
                defaultValue={avgDealSize}
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Calculate ROI
            </button>
          </div>

          {/* ---- Right panel: Output stat cards ---- */}
          <div className="space-y-4">
            {hasSubmitted ? (
              <>
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
              </>
            ) : (
              <div
                className="card rounded-xl p-8 flex items-center justify-center min-h-[280px]"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="text-sm text-center"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Adjust your inputs and click <strong>Calculate ROI</strong> to
                  see your projected returns.
                </p>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link href="/get-started" className="btn-primary inline-block">
          Get Your Custom Proposal &rarr;
        </Link>
      </div>
    </section>
  )
}
