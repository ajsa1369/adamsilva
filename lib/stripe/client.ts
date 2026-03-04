// Stripe SDK singleton — import this everywhere, never instantiate Stripe directly

import Stripe from 'stripe'

/**
 * Validates that a required environment variable is set and non-empty.
 */
function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Add it to .env.local for local development and to the Vercel Dashboard for production.`
    )
  }
  return value
}

/**
 * Stripe SDK singleton — lazy-initialized on first access.
 * This avoids crashing during `next build` static page collection
 * when env vars aren't available (e.g. Vercel build without secrets).
 * The singleton is created once and reused for all subsequent calls.
 */
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(getRequiredEnv('STRIPE_SECRET_KEY'), {
      apiVersion: '2026-02-25.clover',
      maxNetworkRetries: 2,
      timeout: 30000,
      telemetry: true,
    })
  }
  return _stripe
}

/**
 * Backwards-compatible export — evaluates lazily via getter.
 * Usage: import { stripe } from '@/lib/stripe/client'
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver)
  },
})

/**
 * Returns the Stripe webhook signing secret.
 * Only needed in the webhook route handler.
 */
export function getWebhookSecret(): string {
  return getRequiredEnv('STRIPE_WEBHOOK_SECRET')
}
