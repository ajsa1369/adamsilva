'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AddToCartButton } from './AddToCartButton'
import { BuyNowButton } from './BuyNowButton'
import { serviceToCartItem } from '@/lib/cart/helpers'
import type { Service } from '@/lib/data/services'

interface ServiceCTASectionProps {
  service: Service
  accentColor?: string
  compact?: boolean
}

export function ServiceCTASection({ service, accentColor, compact }: ServiceCTASectionProps) {
  const isFree = service.price === '0'
  const isCustom = service.price === 'Custom'
  const cartItem = serviceToCartItem(service)

  // Free (ACRA): lead capture only
  if (isFree) {
    return (
      <div className={compact ? '' : 'flex flex-col sm:flex-row gap-4'}>
        <Link
          href={`/contact?service=${encodeURIComponent(service.id)}`}
          className={`btn-primary ${compact ? 'w-full justify-center' : ''}`}
          style={accentColor ? { background: accentColor } : undefined}
        >
          Get Free Assessment
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  // Custom pricing: contact only
  if (isCustom) {
    return (
      <div className={compact ? '' : 'flex flex-col sm:flex-row gap-4'}>
        <Link
          href={`/contact?service=${encodeURIComponent(service.id)}`}
          className={`btn-primary ${compact ? 'w-full justify-center' : ''}`}
          style={accentColor ? { background: accentColor } : undefined}
        >
          Request Quote
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  // Priced service: add to cart + contact fallback
  if (compact) {
    return (
      <AddToCartButton item={cartItem} variant="primary" className="w-full justify-center" accentColor={accentColor} />
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <BuyNowButton item={cartItem} accentColor={accentColor} />
      <AddToCartButton item={cartItem} variant="secondary" />
      <Link
        href={`/contact?service=${encodeURIComponent(service.id)}`}
        className="btn-secondary"
      >
        Speak With Our Team
      </Link>
    </div>
  )
}
