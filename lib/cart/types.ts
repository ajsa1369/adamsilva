export type CartItemType = 'package' | 'service'
export type PricingModel = 'one-time' | 'recurring' | 'free'
export type PaymentMethod = 'ach' | 'card'

/** 4% convenience fee for credit card payments */
export const CARD_CONVENIENCE_FEE_RATE = 0.04

export interface CartItem {
  id: string
  type: CartItemType
  name: string
  pricingModel: PricingModel
  setupPrice: number   // dollars (0 for free)
  monthlyPrice: number // dollars (0 for one-time or free)
  quantity: number     // always 1 for B2B services
}

export interface CartTotals {
  setupTotal: number
  monthlyTotal: number
  hasRecurring: boolean
  hasFreeOnly: boolean
  itemCount: number
}

/** Shape sent to the checkout API — client sends only IDs, server resolves prices */
export interface CheckoutPayload {
  items: Array<{
    id: string
    type: CartItemType
    quantity: number
  }>
  customer: {
    name: string
    email: string
    company: string
  }
  paymentMethod: PaymentMethod
}

/** Response from the checkout API route */
export interface CheckoutResponse {
  clientSecret: string
  subscriptionId?: string
  customerId: string
  orderId: string
  type: 'payment_intent' | 'subscription'
}
