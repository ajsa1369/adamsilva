'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import type { CartItem, CartTotals } from './types'

const STORAGE_KEY = 'asc-cart'

function calculateTotals(items: CartItem[]): CartTotals {
  let setupTotal = 0
  let monthlyTotal = 0
  let hasRecurring = false

  for (const item of items) {
    setupTotal += item.setupPrice * item.quantity
    monthlyTotal += item.monthlyPrice * item.quantity
    if (item.pricingModel === 'recurring') hasRecurring = true
  }

  return {
    setupTotal,
    monthlyTotal,
    hasRecurring,
    hasFreeOnly: items.length > 0 && items.every(i => i.pricingModel === 'free'),
    itemCount: items.length,
  }
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage full or unavailable
  }
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  itemCount: number
  totals: CartTotals
}

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  // Persist on change (skip initial hydration)
  useEffect(() => {
    if (hydrated) saveCart(items)
  }, [items, hydrated])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const isInCart = useCallback((id: string) => items.some(i => i.id === id), [items])

  const totals = useMemo(() => calculateTotals(items), [items])

  const value: CartState = {
    items,
    addItem,
    removeItem,
    clearCart,
    isInCart,
    itemCount: items.length,
    totals,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartState {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
