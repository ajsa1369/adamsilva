import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SuccessContent } from './SuccessContent'

export const metadata: Metadata = {
  title: 'Payment Confirmed — Adam Silva Consulting',
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
