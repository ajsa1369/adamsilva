// Stripe SDK singleton — import this everywhere, never instantiate Stripe directly

import Stripe from 'stripe'

/**
 * Validates that a required environment variable is set and non-empty.
 * Throws at module load time if the variable is missing — fail fast,
 * never silently proceed with an undefined key.
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
 * Stripe SDK singleton.
 * Instantiated at module level so that a missing STRIPE_SECRET_KEY throws
 * immediately on import, not lazily on first use.
 */
export const stripe = new Stripe(getRequiredEnv('STRIPE_SECRET_KEY'), {
  apiVersion: '2026-02-25.clover',
  maxNetworkRetries: 2,
  timeout: 30000,
  telemetry: true,
})

/**
 * Returns the Stripe webhook signing secret.
 * Exposed as a function (not a module-level constant) because this value
 * is only needed in the webhook route handler, not in all Stripe operations.
 * Throws at call time if the variable is missing.
 */
export function getWebhookSecret(): string {
  return getRequiredEnv('STRIPE_WEBHOOK_SECRET')
}
