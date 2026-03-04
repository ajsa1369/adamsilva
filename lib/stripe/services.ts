// Individual service -> Stripe pricing mapping (18 services)
//
// ACRA:                     $0 free lead magnet
// AEO Audit:                $5,000 one-time
// GEO Implementation:       $7,500 one-time
// Authority Building:       $15,000 one-time
// Quoting Agent:            $8,500 setup + $1,200/mo
// Off-Hours Voice Agent:    $6,500 setup + $950/mo
// Lead Enrichment:          $5,500 setup + $1,500/mo
// Lead Scraping:            $9,500 setup + $2,200/mo
// Auto-Appointment Setter:  $8,500 setup + $1,800/mo
// Blog Creator Engine:      $4,500 setup + $2,500/mo
// Press Syndicator:         $6,500 setup + $3,000/mo
// UCP Implementation:       $15,000 one-time
// ACP Integration:          $25,000 one-time
// AP2 Trust Layer:          $35,000 one-time
// Unified Sales Agent:      $45,000 setup + $5,000/mo
// Social Media Manager:     $6,500 setup + $1,500/mo
// Social Media Poster:      $4,500 setup + $950/mo
// RAG Message Replier:      $7,500 setup + $1,800/mo
//
// Products and Prices are created in Stripe Dashboard (test mode).
// All IDs are stored in .env.local as STRIPE_SVC_* variables.

import type { StripeServicePricing, StripeServiceMap, ServiceSlug } from '@/lib/stripe/types'

/**
 * Validates that a required environment variable is set and non-empty.
 */
function getEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Create the product in Stripe Dashboard (test mode), copy the ID, ` +
      `and add it to .env.local.`
    )
  }
  return value
}

// ---------------------------------------------------------------------------
// Lazy-initialized map — built on first access so `next build` doesn't crash
// when Stripe env vars aren't set in the build environment.
// ---------------------------------------------------------------------------

let _services: StripeServiceMap | null = null

function getServices(): StripeServiceMap {
  if (!_services) {
    _services = {
      'ai-readiness-check': {
        productId: getEnv('STRIPE_SVC_ACRA'),
        setupPriceId: getEnv('STRIPE_SVC_ACRA_SETUP'),
      },
      'aeo-audit': {
        productId: getEnv('STRIPE_SVC_AEO_AUDIT'),
        setupPriceId: getEnv('STRIPE_SVC_AEO_AUDIT_SETUP'),
      },
      'geo-implementation': {
        productId: getEnv('STRIPE_SVC_GEO_IMPLEMENTATION'),
        setupPriceId: getEnv('STRIPE_SVC_GEO_IMPLEMENTATION_SETUP'),
      },
      'authority-building': {
        productId: getEnv('STRIPE_SVC_AUTHORITY_BUILDING'),
        setupPriceId: getEnv('STRIPE_SVC_AUTHORITY_BUILDING_SETUP'),
      },
      'quoting-agent': {
        productId: getEnv('STRIPE_SVC_QUOTING_AGENT'),
        setupPriceId: getEnv('STRIPE_SVC_QUOTING_AGENT_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_QUOTING_AGENT_MONTHLY'),
      },
      'off-hours-voice-agent': {
        productId: getEnv('STRIPE_SVC_OFF_HOURS_VOICE_AGENT'),
        setupPriceId: getEnv('STRIPE_SVC_OFF_HOURS_VOICE_AGENT_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_OFF_HOURS_VOICE_AGENT_MONTHLY'),
      },
      'lead-enrichment': {
        productId: getEnv('STRIPE_SVC_LEAD_ENRICHMENT'),
        setupPriceId: getEnv('STRIPE_SVC_LEAD_ENRICHMENT_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_LEAD_ENRICHMENT_MONTHLY'),
      },
      'lead-scraping': {
        productId: getEnv('STRIPE_SVC_LEAD_SCRAPING'),
        setupPriceId: getEnv('STRIPE_SVC_LEAD_SCRAPING_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_LEAD_SCRAPING_MONTHLY'),
      },
      'auto-appointment-setter': {
        productId: getEnv('STRIPE_SVC_AUTO_APPOINTMENT_SETTER'),
        setupPriceId: getEnv('STRIPE_SVC_AUTO_APPOINTMENT_SETTER_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_AUTO_APPOINTMENT_SETTER_MONTHLY'),
      },
      'agent-ready-blog-creator': {
        productId: getEnv('STRIPE_SVC_BLOG_CREATOR_ENGINE'),
        setupPriceId: getEnv('STRIPE_SVC_BLOG_CREATOR_ENGINE_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_BLOG_CREATOR_ENGINE_MONTHLY'),
      },
      'press-syndicator': {
        productId: getEnv('STRIPE_SVC_PRESS_SYNDICATOR'),
        setupPriceId: getEnv('STRIPE_SVC_PRESS_SYNDICATOR_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_PRESS_SYNDICATOR_MONTHLY'),
      },
      'ucp-implementation': {
        productId: getEnv('STRIPE_SVC_UCP_IMPLEMENTATION'),
        setupPriceId: getEnv('STRIPE_SVC_UCP_IMPLEMENTATION_SETUP'),
      },
      'acp-integration': {
        productId: getEnv('STRIPE_SVC_ACP_INTEGRATION'),
        setupPriceId: getEnv('STRIPE_SVC_ACP_INTEGRATION_SETUP'),
      },
      'ap2-trust-layer': {
        productId: getEnv('STRIPE_SVC_AP2_TRUST_LAYER'),
        setupPriceId: getEnv('STRIPE_SVC_AP2_TRUST_LAYER_SETUP'),
      },
      'unified-sales-agent': {
        productId: getEnv('STRIPE_SVC_UNIFIED_SALES_AGENT'),
        setupPriceId: getEnv('STRIPE_SVC_UNIFIED_SALES_AGENT_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_UNIFIED_SALES_AGENT_MONTHLY'),
      },
      'social-media-manager': {
        productId: getEnv('STRIPE_SVC_SOCIAL_MEDIA_MANAGER'),
        setupPriceId: getEnv('STRIPE_SVC_SOCIAL_MEDIA_MANAGER_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_SOCIAL_MEDIA_MANAGER_MONTHLY'),
      },
      'social-media-poster': {
        productId: getEnv('STRIPE_SVC_SOCIAL_MEDIA_POSTER'),
        setupPriceId: getEnv('STRIPE_SVC_SOCIAL_MEDIA_POSTER_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_SOCIAL_MEDIA_POSTER_MONTHLY'),
      },
      'rag-message-replier': {
        productId: getEnv('STRIPE_SVC_RAG_MESSAGE_REPLIER'),
        setupPriceId: getEnv('STRIPE_SVC_RAG_MESSAGE_REPLIER_SETUP'),
        monthlyPriceId: getEnv('STRIPE_SVC_RAG_MESSAGE_REPLIER_MONTHLY'),
      },
    }
  }
  return _services
}

/**
 * STRIPE_SERVICES — lazy proxy so imports don't crash at build time.
 */
export const STRIPE_SERVICES: StripeServiceMap = new Proxy({} as StripeServiceMap, {
  get(_target, prop, receiver) {
    return Reflect.get(getServices(), prop, receiver)
  },
})

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Returns the Stripe Product/Price IDs for a given service slug.
 */
export function getStripeServicePricing(slug: ServiceSlug): StripeServicePricing {
  return getServices()[slug]
}

/**
 * Returns true if the service has a recurring monthly price (agents),
 * false if it's one-time only (audits, implementations).
 */
export function hasMonthlyPricing(slug: ServiceSlug): boolean {
  return !!getServices()[slug].monthlyPriceId
}
