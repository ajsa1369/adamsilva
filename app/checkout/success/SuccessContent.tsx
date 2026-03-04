'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart/context'

export function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const { clearCart } = useCart()

  // Clear cart on mount
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <section className="section gradient-hero">
      <div className="container max-w-2xl text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(16,185,129,0.1)' }}
        >
          <CheckCircle size={40} style={{ color: '#10b981' }} />
        </div>

        <h1
          className="text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
        >
          Payment Confirmed
        </h1>

        <p className="text-lg mb-2" style={{ color: 'var(--color-muted)' }}>
          Thank you for your purchase. Our engagement team will reach out within 24 hours to schedule your kickoff and assign a dedicated project lead.
        </p>

        <p className="text-sm mb-2" style={{ color: 'var(--color-muted)' }}>
          A confirmation has been sent to your email with next steps and onboarding details.
        </p>

        {orderId && (
          <p className="text-sm mb-8" style={{ color: 'var(--color-muted-2)' }}>
            Order reference: {orderId}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
            <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  )
}
