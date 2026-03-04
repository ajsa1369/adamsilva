import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase/service'
import {
  findOrCreateCustomer,
  resolveCartItems,
  createOneTimePayment,
  createSubscription,
} from '@/lib/stripe/checkout'
import { getServiceById } from '@/lib/data/services'
import { PACKAGES } from '@/lib/data/packages'
import type { CartItemType } from '@/lib/cart/types'

export const runtime = 'nodejs'

interface RequestItem {
  id: string
  type: CartItemType
  quantity: number
}

interface RequestBody {
  items: RequestItem[]
  customer: {
    name: string
    email: string
    company: string
  }
}

function validateRequest(body: unknown): body is RequestBody {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  if (!Array.isArray(b.items) || b.items.length === 0) return false
  if (!b.customer || typeof b.customer !== 'object') return false
  const c = b.customer as Record<string, unknown>
  if (!c.name || !c.email) return false
  return true
}

/** Validate that all item IDs are real services/packages */
function validateItems(items: RequestItem[]): boolean {
  for (const item of items) {
    if (item.type === 'service') {
      if (!getServiceById(item.id)) return false
    } else if (item.type === 'package') {
      if (!PACKAGES.find(p => p.slug === item.id)) return false
    } else {
      return false
    }
  }
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!validateRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid request body. Required: items[], customer { name, email }' },
        { status: 400 }
      )
    }

    if (!validateItems(body.items)) {
      return NextResponse.json(
        { error: 'One or more items are invalid' },
        { status: 400 }
      )
    }

    const { items, customer } = body

    // Resolve server-side pricing to determine flow
    const resolved = resolveCartItems(items)

    // Filter out free items (ACRA) — they don't go through Stripe
    const paidItems = items.filter(i => {
      if (i.type === 'service') {
        const svc = getServiceById(i.id)
        return svc && svc.price !== '0'
      }
      return true
    })

    if (paidItems.length === 0) {
      return NextResponse.json(
        { error: 'No paid items in cart. Use /api/checkout/free for free services.' },
        { status: 400 }
      )
    }

    // Find or create Stripe customer
    const stripeCustomer = await findOrCreateCustomer(
      customer.email,
      customer.name,
      customer.company
    )

    // Build order items for Supabase
    const orderItems = items.map(i => {
      if (i.type === 'service') {
        const svc = getServiceById(i.id)!
        return { id: i.id, type: i.type, name: svc.name }
      }
      const pkg = PACKAGES.find(p => p.slug === i.id)!
      return { id: i.id, type: i.type, name: pkg.name }
    })

    // Create order in Supabase (status: pending)
    const { data: order, error: orderError } = await supabaseService
      .from('orders')
      .insert({
        stripe_customer_id: stripeCustomer.id,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_company: customer.company || null,
        items: orderItems,
        setup_total: 0, // Will be updated by webhook
        monthly_total: 0,
        status: 'pending',
        payment_type: resolved.hasRecurring ? 'subscription' : 'one_time',
      })
      .select('id')
      .single()

    if (orderError || !order) {
      console.error('[checkout] Failed to create order:', orderError?.message)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    const orderId = order.id

    let clientSecret: string
    let subscriptionId: string | undefined

    if (resolved.hasRecurring) {
      // Subscription flow
      const sub = await createSubscription(stripeCustomer.id, paidItems, orderId)
      subscriptionId = sub.id

      // Get client secret from the first invoice's payment intent
      const invoice = sub.latest_invoice as { payment_intent: { id: string; client_secret: string } | null } | null
      const pi = invoice?.payment_intent
      if (!pi || !pi.client_secret) {
        throw new Error('No client secret returned from subscription')
      }
      clientSecret = pi.client_secret

      // Update order with subscription ID
      await supabaseService
        .from('orders')
        .update({
          stripe_subscription_id: sub.id,
          stripe_payment_intent_id: pi.id,
        })
        .eq('id', orderId)
    } else {
      // One-time payment flow
      const pi = await createOneTimePayment(stripeCustomer.id, paidItems, orderId)
      clientSecret = pi.client_secret!

      // Update order with payment intent ID
      await supabaseService
        .from('orders')
        .update({ stripe_payment_intent_id: pi.id })
        .eq('id', orderId)
    }

    return NextResponse.json({
      clientSecret,
      subscriptionId,
      customerId: stripeCustomer.id,
      orderId,
      type: resolved.hasRecurring ? 'subscription' : 'payment_intent',
    })
  } catch (err) {
    console.error('[checkout] Error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
