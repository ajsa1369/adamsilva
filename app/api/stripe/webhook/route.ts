import { NextRequest, NextResponse } from 'next/server'
import { stripe, getWebhookSecret } from '@/lib/stripe/client'
import { supabaseService } from '@/lib/supabase/service'

// CRITICAL: Must be Node.js runtime — Stripe SDK uses crypto module (not available in Edge)
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  // CRITICAL: raw body required for signature verification — never request.json()
  const rawBody = await request.text()

  // Reject immediately if stripe-signature header is missing
  const sig = request.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  // Verify webhook signature — constructEvent throws on invalid or tampered payload
  let event: ReturnType<typeof stripe.webhooks.constructEvent>
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, getWebhookSecret())
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[stripe/webhook] Signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    )
  }

  // Idempotency check — Stripe delivers at-least-once; silently skip duplicates
  const { data: existing, error: lookupError } = await supabaseService
    .from('stripe_events')
    .select('event_id')
    .eq('event_id', event.id)
    .maybeSingle()

  if (lookupError) {
    console.error('[stripe/webhook] Idempotency lookup failed:', lookupError.message)
    return NextResponse.json(
      { error: 'Database error during idempotency check' },
      { status: 500 }
    )
  }

  if (existing) {
    // Event already processed — return 200 so Stripe stops retrying
    return NextResponse.json({ received: true, duplicate: true })
  }

  // Log event BEFORE processing — ensures every event is auditable even if handler crashes
  const { error: insertError } = await supabaseService
    .from('stripe_events')
    .insert({
      event_id: event.id,
      event_type: event.type,
      payload: event as unknown as Record<string, unknown>,
    })

  if (insertError) {
    console.error('[stripe/webhook] Failed to log event:', insertError.message)
    return NextResponse.json(
      { error: 'Database error during event logging' },
      { status: 500 }
    )
  }

  // Route to event-specific handlers
  switch (event.type) {
    // Phase 11 will implement these handlers:
    // case 'payment_intent.succeeded':
    // case 'payment_intent.payment_failed':
    // case 'invoice.paid':
    // case 'invoice.payment_failed':
    // case 'customer.subscription.updated':
    // case 'customer.subscription.deleted':
    default:
      console.log(`[stripe/webhook] Unhandled event type: ${event.type}`)
  }

  // Respond quickly — Stripe times out after 30 seconds
  return NextResponse.json({ received: true })
}
