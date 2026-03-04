'use client'

import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { ArrowRight, ShoppingCart, CheckCircle, Loader2 } from 'lucide-react'
import { getStripeJs } from '@/lib/stripe/client-browser'
import { useCart } from '@/lib/cart/context'
import { OrderSummary } from './OrderSummary'
import { FreeCheckoutForm } from './FreeCheckoutForm'
import type { CheckoutPayload, CheckoutResponse } from '@/lib/cart/types'

function CheckoutFormInner() {
  const stripe = useStripe()
  const elements = useElements()
  const { items, totals, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'creating' | 'confirming' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setStatus('creating')
    setErrorMsg('')

    try {
      // 1. Create checkout session on server
      const payload: CheckoutPayload = {
        items: items.map(i => ({ id: i.id, type: i.type, quantity: i.quantity })),
        customer: form,
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

      // 2. Confirm payment with Stripe Elements
      setStatus('confirming')

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?order_id=${data.orderId}`,
          payment_method_data: {
            billing_details: {
              name: form.name,
              email: form.email,
            },
          },
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

  const isProcessing = status === 'creating' || status === 'confirming'

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      {/* Left: Form */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Billing Info */}
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

          {/* Payment */}
          <div className="card p-6">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
            >
              Payment
            </h2>
            <PaymentElement
              options={{
                layout: 'tabs',
              }}
            />
          </div>

          {status === 'error' && (
            <div className="p-4 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-sm text-red-500">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            className="btn-primary w-full justify-center text-base py-3"
            style={isProcessing ? { opacity: 0.7 } : undefined}
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {status === 'creating' ? 'Creating order...' : 'Processing payment...'}
              </>
            ) : (
              <>
                Pay {totals.setupTotal > 0 ? `$${(totals.setupTotal + totals.monthlyTotal).toLocaleString()}` : 'Now'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div>
        <OrderSummary />
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

  // Paid cart — Stripe Elements
  const amount = (totals.setupTotal + totals.monthlyTotal) * 100 // cents

  return (
    <Elements
      stripe={getStripeJs()}
      options={{
        mode: 'payment',
        amount,
        currency: 'usd',
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
      <CheckoutFormInner />
    </Elements>
  )
}
