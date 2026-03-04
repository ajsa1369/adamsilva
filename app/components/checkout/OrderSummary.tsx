'use client'

import { useCart } from '@/lib/cart/context'
import type { PaymentMethod } from '@/lib/cart/types'
import { CARD_CONVENIENCE_FEE_RATE } from '@/lib/cart/types'

function formatPrice(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const PRICING_BADGE: Record<string, { label: string; color: string }> = {
  'one-time': { label: 'One-time', color: '#3b82f6' },
  recurring: { label: 'Recurring', color: '#10b981' },
  free: { label: 'Free', color: '#f59e0b' },
}

export function OrderSummary({ paymentMethod = 'ach' }: { paymentMethod?: PaymentMethod }) {
  const { items, totals } = useCart()

  const baseTotal = totals.setupTotal + totals.monthlyTotal
  const convenienceFee = paymentMethod === 'card' ? Math.round(baseTotal * CARD_CONVENIENCE_FEE_RATE) : 0
  const grandTotal = baseTotal + convenienceFee

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
              {totals.hasRecurring ? 'Setup / One-time' : 'Subtotal'}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {formatPrice(totals.setupTotal)}
            </span>
          </div>
        )}
        {totals.monthlyTotal > 0 && (
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>Monthly recurring</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              {formatPrice(totals.monthlyTotal)}/mo
            </span>
          </div>
        )}

        {/* Convenience fee line */}
        {convenienceFee > 0 && (
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#ef4444' }}>
              Card convenience fee (4%)
            </span>
            <span className="text-sm font-semibold" style={{ color: '#ef4444' }}>
              +{formatPrice(convenienceFee)}
            </span>
          </div>
        )}

        {/* Divider before grand total */}
        <div className="pt-2 mt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex justify-between">
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {totals.hasRecurring ? 'Due today' : 'Total'}
            </span>
            <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>

        {totals.hasRecurring && (
          <p className="text-xs" style={{ color: 'var(--color-muted-2)' }}>
            Includes setup fees + first month.
            {paymentMethod === 'card' && ' The 4% card fee applies to each billing cycle.'}
          </p>
        )}

        {paymentMethod === 'ach' && (
          <p className="text-[10px] mt-2" style={{ color: '#10b981' }}>
            No convenience fee — you save {formatPrice(Math.round(baseTotal * CARD_CONVENIENCE_FEE_RATE))} vs. card payment.
          </p>
        )}
      </div>

      {/* No refunds policy */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <p className="text-[11px] font-semibold" style={{ color: 'var(--color-muted-2)' }}>
          All sales are final. No refunds.
        </p>
      </div>
    </div>
  )
}
