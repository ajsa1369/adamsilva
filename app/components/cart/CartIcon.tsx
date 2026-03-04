'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart/context'

export function CartIcon({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart()

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.05)]"
      style={{ color: 'var(--color-muted)' }}
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
    >
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: 'var(--color-accent)' }}
        >
          {itemCount}
        </span>
      )}
    </button>
  )
}
