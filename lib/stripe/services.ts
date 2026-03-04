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

/**
 * Returns undefined if the env var is not set (for services without monthly pricing).
 */
function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name]
  if (!value || value.trim() === '') return undefined
  return value
}

// ---------------------------------------------------------------------------
// Module-level env var reads — all service IDs validated at import time
// ---------------------------------------------------------------------------

// ACRA (free lead magnet — $0)
const ACRA_PRODUCT_ID = getEnv('STRIPE_SVC_ACRA')
const ACRA_SETUP_PRICE_ID = getEnv('STRIPE_SVC_ACRA_SETUP')

// AEO Audit ($5,000 one-time)
const AEO_AUDIT_PRODUCT_ID = getEnv('STRIPE_SVC_AEO_AUDIT')
const AEO_AUDIT_SETUP_PRICE_ID = getEnv('STRIPE_SVC_AEO_AUDIT_SETUP')

// GEO Implementation ($7,500 one-time)
const GEO_IMPL_PRODUCT_ID = getEnv('STRIPE_SVC_GEO_IMPLEMENTATION')
const GEO_IMPL_SETUP_PRICE_ID = getEnv('STRIPE_SVC_GEO_IMPLEMENTATION_SETUP')

// Authority Building ($15,000 one-time)
const AUTH_BUILDING_PRODUCT_ID = getEnv('STRIPE_SVC_AUTHORITY_BUILDING')
const AUTH_BUILDING_SETUP_PRICE_ID = getEnv('STRIPE_SVC_AUTHORITY_BUILDING_SETUP')

// Quoting Agent ($8,500 setup + $1,200/mo)
const QUOTING_PRODUCT_ID = getEnv('STRIPE_SVC_QUOTING_AGENT')
const QUOTING_SETUP_PRICE_ID = getEnv('STRIPE_SVC_QUOTING_AGENT_SETUP')
const QUOTING_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_QUOTING_AGENT_MONTHLY')

// Off-Hours Voice Agent ($6,500 setup + $950/mo)
const VOICE_PRODUCT_ID = getEnv('STRIPE_SVC_OFF_HOURS_VOICE_AGENT')
const VOICE_SETUP_PRICE_ID = getEnv('STRIPE_SVC_OFF_HOURS_VOICE_AGENT_SETUP')
const VOICE_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_OFF_HOURS_VOICE_AGENT_MONTHLY')

// Lead Enrichment ($5,500 setup + $1,500/mo)
const ENRICHMENT_PRODUCT_ID = getEnv('STRIPE_SVC_LEAD_ENRICHMENT')
const ENRICHMENT_SETUP_PRICE_ID = getEnv('STRIPE_SVC_LEAD_ENRICHMENT_SETUP')
const ENRICHMENT_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_LEAD_ENRICHMENT_MONTHLY')

// Lead Scraping ($9,500 setup + $2,200/mo)
const SCRAPING_PRODUCT_ID = getEnv('STRIPE_SVC_LEAD_SCRAPING')
const SCRAPING_SETUP_PRICE_ID = getEnv('STRIPE_SVC_LEAD_SCRAPING_SETUP')
const SCRAPING_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_LEAD_SCRAPING_MONTHLY')

// Auto-Appointment Setter ($8,500 setup + $1,800/mo)
const APPOINTMENT_PRODUCT_ID = getEnv('STRIPE_SVC_AUTO_APPOINTMENT_SETTER')
const APPOINTMENT_SETUP_PRICE_ID = getEnv('STRIPE_SVC_AUTO_APPOINTMENT_SETTER_SETUP')
const APPOINTMENT_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_AUTO_APPOINTMENT_SETTER_MONTHLY')

// Blog Creator Engine ($4,500 setup + $2,500/mo)
const BLOG_PRODUCT_ID = getEnv('STRIPE_SVC_BLOG_CREATOR_ENGINE')
const BLOG_SETUP_PRICE_ID = getEnv('STRIPE_SVC_BLOG_CREATOR_ENGINE_SETUP')
const BLOG_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_BLOG_CREATOR_ENGINE_MONTHLY')

// Press Syndicator ($6,500 setup + $3,000/mo)
const PRESS_PRODUCT_ID = getEnv('STRIPE_SVC_PRESS_SYNDICATOR')
const PRESS_SETUP_PRICE_ID = getEnv('STRIPE_SVC_PRESS_SYNDICATOR_SETUP')
const PRESS_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_PRESS_SYNDICATOR_MONTHLY')

// UCP Implementation ($15,000 one-time)
const UCP_PRODUCT_ID = getEnv('STRIPE_SVC_UCP_IMPLEMENTATION')
const UCP_SETUP_PRICE_ID = getEnv('STRIPE_SVC_UCP_IMPLEMENTATION_SETUP')

// ACP Integration ($25,000 one-time)
const ACP_PRODUCT_ID = getEnv('STRIPE_SVC_ACP_INTEGRATION')
const ACP_SETUP_PRICE_ID = getEnv('STRIPE_SVC_ACP_INTEGRATION_SETUP')

// AP2 Trust Layer ($35,000 one-time)
const AP2_PRODUCT_ID = getEnv('STRIPE_SVC_AP2_TRUST_LAYER')
const AP2_SETUP_PRICE_ID = getEnv('STRIPE_SVC_AP2_TRUST_LAYER_SETUP')

// Unified Sales Agent ($45,000 setup + $5,000/mo)
const UNIFIED_PRODUCT_ID = getEnv('STRIPE_SVC_UNIFIED_SALES_AGENT')
const UNIFIED_SETUP_PRICE_ID = getEnv('STRIPE_SVC_UNIFIED_SALES_AGENT_SETUP')
const UNIFIED_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_UNIFIED_SALES_AGENT_MONTHLY')

// Social Media Manager Agent ($6,500 setup + $1,500/mo)
const SMM_PRODUCT_ID = getEnv('STRIPE_SVC_SOCIAL_MEDIA_MANAGER')
const SMM_SETUP_PRICE_ID = getEnv('STRIPE_SVC_SOCIAL_MEDIA_MANAGER_SETUP')
const SMM_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_SOCIAL_MEDIA_MANAGER_MONTHLY')

// Social Media Poster Agent ($4,500 setup + $950/mo)
const SMP_PRODUCT_ID = getEnv('STRIPE_SVC_SOCIAL_MEDIA_POSTER')
const SMP_SETUP_PRICE_ID = getEnv('STRIPE_SVC_SOCIAL_MEDIA_POSTER_SETUP')
const SMP_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_SOCIAL_MEDIA_POSTER_MONTHLY')

// RAG Message Replier Agent ($7,500 setup + $1,800/mo)
const RAG_PRODUCT_ID = getEnv('STRIPE_SVC_RAG_MESSAGE_REPLIER')
const RAG_SETUP_PRICE_ID = getEnv('STRIPE_SVC_RAG_MESSAGE_REPLIER_SETUP')
const RAG_MONTHLY_PRICE_ID = getEnv('STRIPE_SVC_RAG_MESSAGE_REPLIER_MONTHLY')

// ---------------------------------------------------------------------------
// Typed map from service slug to Stripe Product/Price IDs
// ---------------------------------------------------------------------------

export const STRIPE_SERVICES: StripeServiceMap = {
  'ai-readiness-check': {
    productId: ACRA_PRODUCT_ID,
    setupPriceId: ACRA_SETUP_PRICE_ID,
  },
  'aeo-audit': {
    productId: AEO_AUDIT_PRODUCT_ID,
    setupPriceId: AEO_AUDIT_SETUP_PRICE_ID,
  },
  'geo-implementation': {
    productId: GEO_IMPL_PRODUCT_ID,
    setupPriceId: GEO_IMPL_SETUP_PRICE_ID,
  },
  'authority-building': {
    productId: AUTH_BUILDING_PRODUCT_ID,
    setupPriceId: AUTH_BUILDING_SETUP_PRICE_ID,
  },
  'quoting-agent': {
    productId: QUOTING_PRODUCT_ID,
    setupPriceId: QUOTING_SETUP_PRICE_ID,
    monthlyPriceId: QUOTING_MONTHLY_PRICE_ID,
  },
  'off-hours-voice-agent': {
    productId: VOICE_PRODUCT_ID,
    setupPriceId: VOICE_SETUP_PRICE_ID,
    monthlyPriceId: VOICE_MONTHLY_PRICE_ID,
  },
  'lead-enrichment': {
    productId: ENRICHMENT_PRODUCT_ID,
    setupPriceId: ENRICHMENT_SETUP_PRICE_ID,
    monthlyPriceId: ENRICHMENT_MONTHLY_PRICE_ID,
  },
  'lead-scraping': {
    productId: SCRAPING_PRODUCT_ID,
    setupPriceId: SCRAPING_SETUP_PRICE_ID,
    monthlyPriceId: SCRAPING_MONTHLY_PRICE_ID,
  },
  'auto-appointment-setter': {
    productId: APPOINTMENT_PRODUCT_ID,
    setupPriceId: APPOINTMENT_SETUP_PRICE_ID,
    monthlyPriceId: APPOINTMENT_MONTHLY_PRICE_ID,
  },
  'agent-ready-blog-creator': {
    productId: BLOG_PRODUCT_ID,
    setupPriceId: BLOG_SETUP_PRICE_ID,
    monthlyPriceId: BLOG_MONTHLY_PRICE_ID,
  },
  'press-syndicator': {
    productId: PRESS_PRODUCT_ID,
    setupPriceId: PRESS_SETUP_PRICE_ID,
    monthlyPriceId: PRESS_MONTHLY_PRICE_ID,
  },
  'ucp-implementation': {
    productId: UCP_PRODUCT_ID,
    setupPriceId: UCP_SETUP_PRICE_ID,
  },
  'acp-integration': {
    productId: ACP_PRODUCT_ID,
    setupPriceId: ACP_SETUP_PRICE_ID,
  },
  'ap2-trust-layer': {
    productId: AP2_PRODUCT_ID,
    setupPriceId: AP2_SETUP_PRICE_ID,
  },
  'unified-sales-agent': {
    productId: UNIFIED_PRODUCT_ID,
    setupPriceId: UNIFIED_SETUP_PRICE_ID,
    monthlyPriceId: UNIFIED_MONTHLY_PRICE_ID,
  },
  'social-media-manager': {
    productId: SMM_PRODUCT_ID,
    setupPriceId: SMM_SETUP_PRICE_ID,
    monthlyPriceId: SMM_MONTHLY_PRICE_ID,
  },
  'social-media-poster': {
    productId: SMP_PRODUCT_ID,
    setupPriceId: SMP_SETUP_PRICE_ID,
    monthlyPriceId: SMP_MONTHLY_PRICE_ID,
  },
  'rag-message-replier': {
    productId: RAG_PRODUCT_ID,
    setupPriceId: RAG_SETUP_PRICE_ID,
    monthlyPriceId: RAG_MONTHLY_PRICE_ID,
  },
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Returns the Stripe Product/Price IDs for a given service slug.
 */
export function getStripeServicePricing(slug: ServiceSlug): StripeServicePricing {
  return STRIPE_SERVICES[slug]
}

/**
 * Returns true if the service has a recurring monthly price (agents),
 * false if it's one-time only (audits, implementations).
 */
export function hasMonthlyPricing(slug: ServiceSlug): boolean {
  return !!STRIPE_SERVICES[slug].monthlyPriceId
}
