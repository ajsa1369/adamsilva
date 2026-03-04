'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Trash2, ArrowRight, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart/context'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

const PRICING_BADGE: Record<string, { label: string; color: string }> = {
  'one-time': { label: 'One-time', color: '#3b82f6' },
  recurring: { label: 'Recurring', color: '#10b981' },
  free: { label: 'Free', color: '#f59e0b' },
}

function formatPrice(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, clearCart, totals } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-md transition-transform duration-300 ease-out"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
        }}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <h2
              className="text-lg font-bold"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
            >
              Cart ({items.length})
            </h2>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs px-2 py-1 rounded transition-colors hover:bg-[rgba(239,68,68,0.1)]"
                  style={{ color: 'var(--color-muted-2)' }}
                  aria-label="Clear cart"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.05)]"
                style={{ color: 'var(--color-muted)' }}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <ShoppingCart size={48} style={{ color: 'var(--color-muted-2)', opacity: 0.4 }} />
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    Your cart is empty
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-muted-2)' }}>
                    Browse our services to get started
                  </p>
                </div>
                <Link
                  href="/services"
                  onClick={onClose}
                  className="btn-secondary text-sm"
                >
                  Browse Services
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(item => {
                  const badge = PRICING_BADGE[item.pricingModel]
                  return (
                    <div
                      key={item.id}
                      className="card p-4 flex items-start gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                            style={{
                              background: `color-mix(in srgb, ${badge.color} 15%, transparent)`,
                              color: badge.color,
                            }}
                          >
                            {badge.label}
                          </span>
                          <span
                            className="text-[10px] uppercase font-medium"
                            style={{ color: 'var(--color-muted-2)' }}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.setupPrice > 0 && (
                            <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
                              {formatPrice(item.setupPrice)}
                            </span>
                          )}
                          {item.monthlyPrice > 0 && (
                            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                              + {formatPrice(item.monthlyPrice)}/mo
                            </span>
                          )}
                          {item.pricingModel === 'free' && (
                            <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-[rgba(239,68,68,0.1)]"
                        style={{ color: 'var(--color-muted-2)' }}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div
              className="px-6 py-4 space-y-3"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {/* Totals */}
              <div className="space-y-1.5">
                {totals.setupTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-muted)' }}>
                      {totals.hasRecurring ? 'Setup / One-time' : 'Total'}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--color-text)' }}>
                      {formatPrice(totals.setupTotal)}
                    </span>
                  </div>
                )}
                {totals.monthlyTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-muted)' }}>Monthly recurring</span>
                    <span className="font-bold" style={{ color: 'var(--color-text)' }}>
                      {formatPrice(totals.monthlyTotal)}/mo
                    </span>
                  </div>
                )}
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
