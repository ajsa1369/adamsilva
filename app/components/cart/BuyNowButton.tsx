'use client'

import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'
import { useCart } from '@/lib/cart/context'
import type { CartItem } from '@/lib/cart/types'

interface BuyNowButtonProps {
  item: CartItem
  className?: string
  accentColor?: string
}

export function BuyNowButton({ item, className = '', accentColor }: BuyNowButtonProps) {
  const { addItem, isInCart } = useCart()
  const router = useRouter()

  const handleBuyNow = () => {
    if (!isInCart(item.id)) {
      addItem(item)
    }
    router.push('/checkout')
  }

  return (
    <button
      onClick={handleBuyNow}
      className={`btn-primary ${className}`}
      style={accentColor ? { background: accentColor } : undefined}
      aria-label={`Buy ${item.name} now`}
    >
      <Zap size={16} />
      Buy Now
    </button>
  )
}
