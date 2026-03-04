'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useCart } from '@/lib/cart/context'

export function FreeCheckoutForm() {
  const { items, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/checkout/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, type: i.type })),
          customer: form,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(data.error || 'Request failed')
      }

      clearCart()
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(16,185,129,0.1)' }}
        >
          <CheckCircle size={32} style={{ color: '#10b981' }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          Request Submitted
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-muted)' }}>
          Your Agentic Commerce Readiness Assessment is being prepared.
          Our team will deliver it within 48 hours.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="card p-8">
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Get Your Free ACRA
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
          No payment required. Just tell us where to send it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {status === 'error' && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary w-full justify-center"
            style={status === 'submitting' ? { opacity: 0.7 } : undefined}
          >
            {status === 'submitting' ? 'Submitting...' : 'Request Free ACRA'}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
