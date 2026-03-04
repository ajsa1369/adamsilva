import type Stripe from 'stripe'
import { supabaseService } from '@/lib/supabase/service'

/** Update order status in Supabase by Stripe PaymentIntent ID */
async function updateOrderByPaymentIntent(piId: string, status: string) {
  const { error } = await supabaseService
    .from('orders')
    .update({ status })
    .eq('stripe_payment_intent_id', piId)

  if (error) {
    console.error(`[webhook] Failed to update order for PI ${piId}:`, error.message)
  }
}

/** Update order status by Stripe Subscription ID */
async function updateOrderBySubscription(subId: string, status: string) {
  const { error } = await supabaseService
    .from('orders')
    .update({ status })
    .eq('stripe_subscription_id', subId)

  if (error) {
    console.error(`[webhook] Failed to update order for sub ${subId}:`, error.message)
  }
}

export async function handlePaymentSuccess(pi: Stripe.PaymentIntent) {
  console.log(`[webhook] Payment succeeded: ${pi.id}`)
  await updateOrderByPaymentIntent(pi.id, 'paid')
}

export async function handlePaymentFailure(pi: Stripe.PaymentIntent) {
  console.log(`[webhook] Payment failed: ${pi.id}`)
  await updateOrderByPaymentIntent(pi.id, 'failed')
}

export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log(`[webhook] Invoice paid: ${invoice.id}`)
  const subDetails = invoice.parent?.subscription_details
  if (!subDetails) return

  const subId = typeof subDetails.subscription === 'string'
    ? subDetails.subscription
    : subDetails.subscription?.id

  if (subId) {
    await updateOrderBySubscription(subId, 'active')
  }
}

export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`[webhook] Invoice payment failed: ${invoice.id}`)
  const subDetails = invoice.parent?.subscription_details
  if (!subDetails) return

  const subId = typeof subDetails.subscription === 'string'
    ? subDetails.subscription
    : subDetails.subscription?.id

  if (subId) {
    await updateOrderBySubscription(subId, 'failed')
  }
}

export async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  console.log(`[webhook] Subscription updated: ${sub.id}, status: ${sub.status}`)
  if (sub.status === 'active') {
    await updateOrderBySubscription(sub.id, 'active')
  } else if (sub.status === 'past_due') {
    await updateOrderBySubscription(sub.id, 'failed')
  }
}

export async function handleSubscriptionCancelled(sub: Stripe.Subscription) {
  console.log(`[webhook] Subscription cancelled: ${sub.id}`)
  await updateOrderBySubscription(sub.id, 'cancelled')
}
