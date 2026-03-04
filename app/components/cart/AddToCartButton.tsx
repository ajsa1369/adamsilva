'use client'

import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/lib/cart/context'
import type { CartItem } from '@/lib/cart/types'

interface AddToCartButtonProps {
  item: CartItem
  variant?: 'primary' | 'secondary'
  className?: string
  accentColor?: string
}

export function AddToCartButton({
  item,
  variant = 'primary',
  className = '',
  accentColor,
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const inCart = isInCart(item.id)

  return (
    <button
      onClick={() => !inCart && addItem(item)}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      style={{
        ...(inCart ? { opacity: 0.7, cursor: 'default' } : {}),
        ...(accentColor && variant === 'primary' && !inCart ? { background: accentColor } : {}),
      }}
      aria-label={inCart ? `${item.name} is in your cart` : `Add ${item.name} to cart`}
    >
      {inCart ? (
        <>
          <Check size={16} />
          In Cart
        </>
      ) : (
        <>
          <ShoppingCart size={16} />
          Add to Cart
        </>
      )}
    </button>
  )
}
