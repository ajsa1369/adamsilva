import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Cancelled — Adam Silva Consulting',
  robots: { index: false, follow: false },
}

export default function CheckoutCancelPage() {
  return (
    <section className="section gradient-hero">
      <div className="container max-w-2xl text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(239,68,68,0.1)' }}
        >
          <ShoppingCart size={40} style={{ color: '#ef4444' }} />
        </div>

        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
        >
          Payment Not Completed
        </h1>

        <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
          Your payment was not processed. Your cart items are still saved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/checkout" className="btn-primary">
            <ArrowLeft size={16} />
            Return to Checkout
          </Link>
          <Link href="/services" className="btn-secondary">
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  )
}
