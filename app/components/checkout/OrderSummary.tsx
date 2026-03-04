'use client'

import { useCart } from '@/lib/cart/context'

function formatPrice(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const PRICING_BADGE: Record<string, { label: string; color: string }> = {
  'one-time': { label: 'One-time', color: '#3b82f6' },
  recurring: { label: 'Recurring', color: '#10b981' },
  free: { label: 'Free', color: '#f59e0b' },
}

export function OrderSummary() {
  const { items, totals } = useCart()

  return (
    <div className="card p-6 sticky top-24">
      <h2
        className="text-lg font-bold mb-4"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
      >
        Order Summary
      </h2>

      <div className="space-y-3 mb-6">
        {items.map(item => {
          const badge = PRICING_BADGE[item.pricingModel]
          return (
            <div
              key={item.id}
              className="flex justify-between items-start gap-3 pb-3"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                  {item.name}
                </p>
                <span
                  className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded inline-block mt-1"
                  style={{
                    background: `color-mix(in srgb, ${badge.color} 15%, transparent)`,
                    color: badge.color,
                  }}
                >
                  {badge.label}
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                {item.setupPrice > 0 && (
                  <div className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {formatPrice(item.setupPrice)}
                  </div>
                )}
                {item.monthlyPrice > 0 && (
                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    + {formatPrice(item.monthlyPrice)}/mo
                  </div>
                )}
                {item.pricingModel === 'free' && (
                  <div className="text-sm font-bold" style={{ color: '#f59e0b' }}>Free</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Totals */}
      <div className="space-y-2">
        {totals.setupTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
              {totals.hasRecurring ? 'Setup / One-time' : 'Total'}
            </span>
            <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              {formatPrice(totals.setupTotal)}
            </span>
          </div>
        )}
        {totals.monthlyTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>Monthly recurring</span>
            <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              {formatPrice(totals.monthlyTotal)}/mo
            </span>
          </div>
        )}
        {totals.hasRecurring && totals.setupTotal > 0 && (
          <p className="text-xs mt-2" style={{ color: 'var(--color-muted-2)' }}>
            Due today: {formatPrice(totals.setupTotal + totals.monthlyTotal)} (setup + first month)
          </p>
        )}
      </div>
    </div>
  )
}
