import type { Metadata } from 'next'
import { CheckoutForm } from '@/app/components/checkout/CheckoutForm'

export const metadata: Metadata = {
  title: 'Checkout — Adam Silva Consulting',
  description: 'Complete your purchase of Adam Silva Consulting services.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <section className="section gradient-hero">
      <div className="container max-w-5xl">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
        >
          Checkout
        </h1>
        <CheckoutForm />
      </div>
    </section>
  )
}
