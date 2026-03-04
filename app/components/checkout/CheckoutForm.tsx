'use client'

import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { ArrowRight, ShoppingCart, Loader2, Building2, CreditCard, AlertTriangle } from 'lucide-react'
import { getStripeJs } from '@/lib/stripe/client-browser'
import { useCart } from '@/lib/cart/context'
import { OrderSummary } from './OrderSummary'
import { FreeCheckoutForm } from './FreeCheckoutForm'
import type { CheckoutPayload, CheckoutResponse, PaymentMethod } from '@/lib/cart/types'
import { CARD_CONVENIENCE_FEE_RATE } from '@/lib/cart/types'

function NoRefundsDisclaimer() {
  return (
    <div
      className="p-4 rounded-lg flex items-start gap-3"
      style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
    >
      <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
      <div>
        <p className="text-sm font-semibold" style={{ color: '#f59e0b' }}>
          All Sales Are Final — No Refunds
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
          By completing this purchase you acknowledge that all services are non-refundable. Please review your order carefully before proceeding.
        </p>
      </div>
    </div>
  )
}

function PaymentMethodSelector({
  selected,
  onChange,
  convenienceFeeAmount,
}: {
  selected: PaymentMethod
  onChange: (m: PaymentMethod) => void
  convenienceFeeAmount: number
}) {
  return (
    <div className="card p-6">
      <h2
        className="text-lg font-bold mb-4"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
      >
        Payment Method
      </h2>
      <div className="space-y-3">
        {/* ACH / Wire — preferred */}
        <label
          className="flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all"
          style={{
            border: selected === 'ach'
              ? '2px solid #10b981'
              : '2px solid var(--color-border)',
            background: selected === 'ach'
              ? 'rgba(16,185,129,0.05)'
              : 'transparent',
          }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="ach"
            checked={selected === 'ach'}
            onChange={() => onChange('ach')}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Building2 size={16} style={{ color: '#10b981' }} />
              <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                ACH Bank Transfer / Wire
              </span>
              <span
                className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}
              >
                Recommended
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
              No convenience fee. Pay directly from your bank account.
            </p>
          </div>
        </label>

        {/* Credit Card — with 4% fee */}
        <label
          className="flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all"
          style={{
            border: selected === 'card'
              ? '2px solid #3b82f6'
              : '2px solid var(--color-border)',
            background: selected === 'card'
              ? 'rgba(59,130,246,0.05)'
              : 'transparent',
          }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selected === 'card'}
            onChange={() => onChange('card')}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CreditCard size={16} style={{ color: '#3b82f6' }} />
              <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                Credit / Debit Card
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
              A {(CARD_CONVENIENCE_FEE_RATE * 100).toFixed(0)}% convenience fee applies
              {convenienceFeeAmount > 0 && (
                <> — adds <strong style={{ color: '#ef4444' }}>${convenienceFeeAmount.toLocaleString()}</strong> to your total</>
              )}
            </p>
          </div>
        </label>
      </div>
    </div>
  )
}

function CheckoutFormInner({ orderId }: { orderId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const { totals } = useCart()
  const [status, setStatus] = useState<'idle' | 'confirming' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setStatus('confirming')
    setErrorMsg('')

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
        },
      })

      // If we reach here, there was an error (success would redirect)
      if (error) {
        throw new Error(error.message || 'Payment failed')
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment */}
      <div className="card p-6">
        <h2
          className="text-lg font-bold mb-4"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
        >
          Payment Details
        </h2>
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      <NoRefundsDisclaimer />

      {status === 'error' && (
        <div className="p-4 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <p className="text-sm text-red-500">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'confirming' || !stripe || !elements}
        className="btn-primary w-full justify-center text-base py-3"
        style={status === 'confirming' ? { opacity: 0.7 } : undefined}
      >
        {status === 'confirming' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing payment...
          </>
        ) : (
          <>
            Confirm &amp; Pay {totals.setupTotal > 0 ? `$${(totals.setupTotal + totals.monthlyTotal).toLocaleString()}` : 'Now'}
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-[11px] text-center" style={{ color: 'var(--color-muted-2)' }}>
        By clicking &quot;Confirm &amp; Pay&quot; you agree that all sales are final and non-refundable.
      </p>
    </form>
  )
}

function PaidCheckout() {
  const { items, totals } = useCart()
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ach')
  const [sessionData, setSessionData] = useState<CheckoutResponse | null>(null)
  const [status, setStatus] = useState<'billing' | 'creating' | 'payment' | 'error'>('billing')
  const [errorMsg, setErrorMsg] = useState('')

  const baseTotal = totals.setupTotal + totals.monthlyTotal
  const convenienceFee = paymentMethod === 'card' ? Math.round(baseTotal * CARD_CONVENIENCE_FEE_RATE) : 0

  const handleBillingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('creating')
    setErrorMsg('')

    try {
      const payload: CheckoutPayload = {
        items: items.map(i => ({ id: i.id, type: i.type, quantity: i.quantity })),
        customer: form,
        paymentMethod,
      }

      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Failed to create checkout session' }))
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const data: CheckoutResponse = await res.json()
      setSessionData(data)
      setStatus('payment')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  // Step 1: Billing form + payment method selection
  if (status === 'billing' || status === 'creating' || status === 'error') {
    return (
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <form onSubmit={handleBillingSubmit} className="space-y-6">
            <div className="card p-6">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
              >
                Billing Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg text-sm"
                    style={{
                      background: 'var(--color-base)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg text-sm"
                    style={{
                      background: 'var(--color-base)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg text-sm"
                    style={{
                      background: 'var(--color-base)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="Acme Corp (optional)"
                  />
                </div>
              </div>
            </div>

            <PaymentMethodSelector
              selected={paymentMethod}
              onChange={setPaymentMethod}
              convenienceFeeAmount={convenienceFee}
            />

            <NoRefundsDisclaimer />

            {status === 'error' && (
              <div className="p-4 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="text-sm text-red-500">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'creating'}
              className="btn-primary w-full justify-center text-base py-3"
              style={status === 'creating' ? { opacity: 0.7 } : undefined}
            >
              {status === 'creating' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Setting up payment...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-[11px] text-center" style={{ color: 'var(--color-muted-2)' }}>
              By proceeding you agree that all sales are final and non-refundable.
            </p>
          </form>
        </div>
        <div>
          <OrderSummary paymentMethod={paymentMethod} />
        </div>
      </div>
    )
  }

  // Step 2: Payment form (Elements with real clientSecret)
  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div>
        <Elements
          stripe={getStripeJs()}
          options={{
            clientSecret: sessionData!.clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#0f172a',
                colorText: '#e2e8f0',
                colorDanger: '#ef4444',
                borderRadius: '8px',
                fontFamily: 'Inter, system-ui, sans-serif',
              },
            },
          }}
        >
          <CheckoutFormInner orderId={sessionData!.orderId} />
        </Elements>
      </div>
      <div>
        <OrderSummary paymentMethod={paymentMethod} />
      </div>
    </div>
  )
}

export function CheckoutForm() {
  const { items, totals } = useCart()
  const [ready, setReady] = useState(false)

  // Wait for hydration
  useEffect(() => setReady(true), [])

  if (!ready) return null

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <ShoppingCart size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted-2)', opacity: 0.4 }} />
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          Your cart is empty
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-muted)' }}>
          Add services or packages to get started.
        </p>
        <Link href="/services" className="btn-primary">
          Browse Services
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  // Free-only cart (ACRA)
  if (totals.hasFreeOnly) {
    return <FreeCheckoutForm />
  }

  // Paid cart — two-step: billing + method → Stripe Elements
  return <PaidCheckout />
}
