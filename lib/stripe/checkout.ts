import Stripe from 'stripe'
import { getStripe } from './client'
import { getStripePricing } from './products'
import { getStripeServicePricing } from './services'
import type { PackageSlug, ServiceSlug } from './types'
import type { PaymentMethod } from '@/lib/cart/types'
import { CARD_CONVENIENCE_FEE_RATE } from '@/lib/cart/types'

// ---------------------------------------------------------------------------
// Customer management
// ---------------------------------------------------------------------------

export async function findOrCreateCustomer(
  email: string,
  name: string,
  company?: string
): Promise<Stripe.Customer> {
  const stripe = getStripe()

  // Search for existing customer by email
  const existing = await stripe.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) {
    return existing.data[0]
  }

  // Create new customer
  return stripe.customers.create({
    email,
    name,
    metadata: { company: company || '' },
  })
}

// ---------------------------------------------------------------------------
// Cart item resolution
// ---------------------------------------------------------------------------

export interface ResolvedCartItems {
  subscriptionItems: Stripe.SubscriptionCreateParams.Item[]
  invoiceItems: Array<{ price: string }>
  totalOneTimeCents: number
  hasRecurring: boolean
}

interface CartLineItem {
  id: string
  type: 'package' | 'service'
  quantity: number
}

export function resolveCartItems(items: CartLineItem[]): ResolvedCartItems {
  const subscriptionItems: Stripe.SubscriptionCreateParams.Item[] = []
  const invoiceItems: Array<{ price: string }> = []
  let totalOneTimeCents = 0
  let hasRecurring = false

  for (const item of items) {
    if (item.type === 'package') {
      const pricing = getStripePricing(item.id as PackageSlug)
      if (!pricing) continue // Core tier — skip (custom quoted)

      // Package always has recurring monthly
      hasRecurring = true
      subscriptionItems.push({ price: pricing.monthlyPriceId })

      // Setup fee as invoice item (charged on first invoice)
      invoiceItems.push({ price: pricing.setupPriceId })
    } else {
      // Service
      const pricing = getStripeServicePricing(item.id as ServiceSlug)
      if (!pricing) continue

      if (pricing.monthlyPriceId) {
        // Recurring service (agent): monthly goes to subscription, setup to invoice
        hasRecurring = true
        subscriptionItems.push({ price: pricing.monthlyPriceId })
        invoiceItems.push({ price: pricing.setupPriceId })
      } else {
        // One-time service (audit, implementation): setup fee only
        invoiceItems.push({ price: pricing.setupPriceId })
      }
    }
  }

  return { subscriptionItems, invoiceItems, totalOneTimeCents, hasRecurring }
}

// ---------------------------------------------------------------------------
// Payment creation
// ---------------------------------------------------------------------------

/** For carts with ONLY one-time items (no recurring) */
export async function createOneTimePayment(
  customerId: string,
  items: CartLineItem[],
  orderId: string,
  paymentMethod: PaymentMethod = 'ach'
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripe()
  const resolved = resolveCartItems(items)

  // Sum up all one-time prices by retrieving each price from Stripe
  let totalCents = 0
  for (const item of resolved.invoiceItems) {
    const price = await stripe.prices.retrieve(item.price)
    totalCents += price.unit_amount || 0
  }

  if (totalCents <= 0) {
    throw new Error('Cannot create payment with zero amount')
  }

  // Apply 4% convenience fee for credit card payments
  if (paymentMethod === 'card') {
    const feeCents = Math.round(totalCents * CARD_CONVENIENCE_FEE_RATE)
    totalCents += feeCents
  }

  // Build payment method types — include card as fallback if ACH unavailable
  const paymentMethodTypes: string[] =
    paymentMethod === 'ach' ? ['us_bank_account', 'card'] : ['card']

  // Create a PaymentIntent for the total
  return stripe.paymentIntents.create({
    amount: totalCents,
    currency: 'usd',
    customer: customerId,
    payment_method_types: paymentMethodTypes,
    metadata: { orderId, paymentMethod },
  })
}

/** For carts with ANY recurring items (may also include one-time items) */
export async function createSubscription(
  customerId: string,
  items: CartLineItem[],
  orderId: string,
  paymentMethod: PaymentMethod = 'ach'
): Promise<Stripe.Subscription> {
  const stripe = getStripe()
  const resolved = resolveCartItems(items)

  // For card payments, calculate convenience fee on setup items and add as extra invoice item
  if (paymentMethod === 'card') {
    // Calculate total setup/one-time amount to apply the 4% fee
    let setupCents = 0
    for (const item of resolved.invoiceItems) {
      const price = await stripe.prices.retrieve(item.price)
      setupCents += price.unit_amount || 0
    }
    // Also calculate first month recurring total for the fee
    let recurringCents = 0
    for (const item of resolved.subscriptionItems) {
      if (!item.price) continue
      const price = await stripe.prices.retrieve(item.price)
      recurringCents += price.unit_amount || 0
    }
    const totalFirstPayment = setupCents + recurringCents
    const feeCents = Math.round(totalFirstPayment * CARD_CONVENIENCE_FEE_RATE)

    if (feeCents > 0) {
      // Create an ad-hoc price for the convenience fee
      const feePrice = await stripe.prices.create({
        unit_amount: feeCents,
        currency: 'usd',
        product_data: { name: 'Credit Card Convenience Fee (4%)' },
      })
      resolved.invoiceItems.push({ price: feePrice.id })
    }
  }

  return stripe.subscriptions.create({
    customer: customerId,
    items: resolved.subscriptionItems,
    add_invoice_items: resolved.invoiceItems,
    payment_behavior: 'default_incomplete',
    payment_settings: {
      payment_method_types: paymentMethod === 'ach' ? ['us_bank_account', 'card'] : ['card'],
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
    metadata: { orderId, paymentMethod },
  })
}
