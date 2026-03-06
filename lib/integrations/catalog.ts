/**
 * lib/integrations/catalog.ts
 *
 * Static integration catalog for the Adam Silva Consulting pricing engine.
 * Exports the full 53-tool CATALOG record, lookup function, enterprise/legacy helpers,
 * and the PACKAGES static record.
 *
 * All keys are lowercase-normalized for consistent lookup.
 */

import type { CatalogEntry, IntegrationTier, PackageDefinition } from '@/lib/pricing/types'

// ---------------------------------------------------------------------------
// Tier cost constants
// ---------------------------------------------------------------------------

const TIER_SETUP: Record<IntegrationTier, number> = {
  1: 750,
  2: 1500,
  3: 4000,
}

const TIER_MONTHLY: Record<IntegrationTier, number> = {
  1: 150,
  2: 250,
  3: 500,
}

// ---------------------------------------------------------------------------
// CATALOG — 53-entry static record keyed by lowercase-normalized tool name
// ---------------------------------------------------------------------------

export const CATALOG: Record<string, CatalogEntry> = {
  // ---- Tier 1: $750 setup / $150/mo — 20 tools ----
  'activecampaign': {
    name: 'ActiveCampaign',
    tier: 1,
    category: 'email',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'calendly': {
    name: 'Calendly',
    tier: 1,
    category: 'calendar',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'convertkit': {
    name: 'ConvertKit',
    tier: 1,
    category: 'email',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'gohighlevel': {
    name: 'GoHighLevel',
    tier: 1,
    category: 'crm',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'google-calendar': {
    name: 'Google Calendar',
    tier: 1,
    category: 'calendar',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'hubspot': {
    name: 'HubSpot',
    tier: 1,
    category: 'crm',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'hubspot-service': {
    name: 'HubSpot Service',
    tier: 1,
    category: 'support',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'intercom': {
    name: 'Intercom',
    tier: 1,
    category: 'support',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'klaviyo': {
    name: 'Klaviyo',
    tier: 1,
    category: 'email',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'mailchimp': {
    name: 'Mailchimp',
    tier: 1,
    category: 'email',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'next.js-custom': {
    name: 'Next.js Custom',
    tier: 1,
    category: 'ecommerce',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'paypal': {
    name: 'PayPal',
    tier: 1,
    category: 'payment',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'pipedrive': {
    name: 'Pipedrive',
    tier: 1,
    category: 'crm',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'quickbooks-online': {
    name: 'QuickBooks Online',
    tier: 1,
    category: 'accounting',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'salesforce': {
    name: 'Salesforce',
    tier: 1,
    category: 'crm',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'square': {
    name: 'Square',
    tier: 1,
    category: 'payment',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'stripe': {
    name: 'Stripe',
    tier: 1,
    category: 'payment',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'webflow': {
    name: 'Webflow',
    tier: 1,
    category: 'ecommerce',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'xero': {
    name: 'Xero',
    tier: 1,
    category: 'accounting',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },
  'zendesk': {
    name: 'Zendesk',
    tier: 1,
    category: 'support',
    setupCost: TIER_SETUP[1],
    monthlyCost: TIER_MONTHLY[1],
  },

  // ---- Tier 2: $1,500 setup / $250/mo — 21 tools ----
  'activecampaign-email': {
    name: 'ActiveCampaign Email',
    tier: 2,
    category: 'email',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'acuity-scheduling': {
    name: 'Acuity Scheduling',
    tier: 2,
    category: 'calendar',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'adyen': {
    name: 'Adyen',
    tier: 2,
    category: 'payment',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'authorize.net': {
    name: 'Authorize.net',
    tier: 2,
    category: 'payment',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'beehiiv': {
    name: 'Beehiiv',
    tier: 2,
    category: 'email',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'brevo': {
    name: 'Brevo',
    tier: 2,
    category: 'email',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'close': {
    name: 'Close',
    tier: 2,
    category: 'crm',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'drip': {
    name: 'Drip',
    tier: 2,
    category: 'email',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'freshbooks': {
    name: 'FreshBooks',
    tier: 2,
    category: 'accounting',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'freshdesk': {
    name: 'Freshdesk',
    tier: 2,
    category: 'support',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'freshsales': {
    name: 'Freshsales',
    tier: 2,
    category: 'crm',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'keap': {
    name: 'Keap',
    tier: 2,
    category: 'crm',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'monday-sales-crm': {
    name: 'Monday Sales CRM',
    tier: 2,
    category: 'crm',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'outlook-calendar': {
    name: 'Outlook Calendar',
    tier: 2,
    category: 'calendar',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'quickbooks-payments': {
    name: 'QuickBooks Payments',
    tier: 2,
    category: 'payment',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'shopify': {
    name: 'Shopify',
    tier: 2,
    category: 'ecommerce',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'simplybook.me': {
    name: 'SimplyBook.me',
    tier: 2,
    category: 'calendar',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'wave': {
    name: 'Wave',
    tier: 2,
    category: 'accounting',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'woocommerce': {
    name: 'WooCommerce',
    tier: 2,
    category: 'ecommerce',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'wordpress': {
    name: 'WordPress',
    tier: 2,
    category: 'ecommerce',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },
  'zoho-crm': {
    name: 'Zoho CRM',
    tier: 2,
    category: 'crm',
    setupCost: TIER_SETUP[2],
    monthlyCost: TIER_MONTHLY[2],
  },

  // ---- Tier 3: $4,000 setup / $500/mo — 12 tools ----
  'housecall-pro': {
    name: 'Housecall Pro',
    tier: 3,
    category: 'field-service',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'jobber': {
    name: 'Jobber',
    tier: 3,
    category: 'field-service',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'magento': {
    name: 'Magento',
    tier: 3,
    category: 'ecommerce',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'microsoft-dynamics': {
    name: 'Microsoft Dynamics',
    tier: 3,
    category: 'erp',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'mindbody': {
    name: 'Mindbody',
    tier: 3,
    category: 'wellness',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'netsuite': {
    name: 'NetSuite',
    tier: 3,
    category: 'erp',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'oracle-erp': {
    name: 'Oracle ERP',
    tier: 3,
    category: 'erp',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'sap': {
    name: 'SAP',
    tier: 3,
    category: 'erp',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'servicetitan': {
    name: 'ServiceTitan',
    tier: 3,
    category: 'field-service',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'squarespace': {
    name: 'Squarespace',
    tier: 3,
    category: 'ecommerce',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'vagaro': {
    name: 'Vagaro',
    tier: 3,
    category: 'wellness',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
  'wix': {
    name: 'Wix',
    tier: 3,
    category: 'ecommerce',
    setupCost: TIER_SETUP[3],
    monthlyCost: TIER_MONTHLY[3],
  },
}

// ---------------------------------------------------------------------------
// lookupIntegration — returns null for unknown tools
// ---------------------------------------------------------------------------

export function lookupIntegration(name: string): CatalogEntry | null {
  return CATALOG[name.toLowerCase().trim()] ?? null
}

// ---------------------------------------------------------------------------
// Enterprise and legacy platform classifiers (used by tier-selector.ts)
// ---------------------------------------------------------------------------

/** Tools that always route to Core tier recommendation */
export const ENTERPRISE_TOOLS: readonly string[] = [
  'sap',
  'netsuite',
  'oracle erp',
  'microsoft dynamics',
]

/** Platforms that route to the legacy (Shopify-path) packages */
export const LEGACY_PLATFORMS: readonly string[] = [
  'shopify',
  'wix',
  'squarespace',
  'wordpress',
]

// ---------------------------------------------------------------------------
// PACKAGES — 6-package static record keyed by slug
// ---------------------------------------------------------------------------

export const PACKAGES: Record<string, PackageDefinition> = {
  starter: {
    slug: 'starter',
    name: 'Starter',
    baseSetup: 16000,
    baseMonthly: 3500,
    tier1Slots: 3,
    tier2Slots: 0,
    tier3Slots: 0,
    isLegacyOnly: false,
  },
  pro: {
    slug: 'pro',
    name: 'Pro',
    baseSetup: 28000,
    baseMonthly: 6500,
    tier1Slots: 6,
    tier2Slots: 1,
    tier3Slots: 0,
    isLegacyOnly: false,
  },
  max: {
    slug: 'max',
    name: 'Max',
    baseSetup: 48000,
    baseMonthly: 12000,
    tier1Slots: 12,
    tier2Slots: 3,
    tier3Slots: 1,
    isLegacyOnly: false,
  },
  elite: {
    slug: 'elite',
    name: 'Elite',
    baseSetup: 75000,
    baseMonthly: 0,   // custom engagement — not used in auto-calculation
    tier1Slots: 99,
    tier2Slots: 99,
    tier3Slots: 99,
    isLegacyOnly: false,
  },
  'shopify-starter': {
    slug: 'shopify-starter',
    name: 'Shopify Starter',
    baseSetup: 8500,
    baseMonthly: 2000,
    tier1Slots: 2,
    tier2Slots: 0,
    tier3Slots: 0,
    isLegacyOnly: true,
  },
  'shopify-growth': {
    slug: 'shopify-growth',
    name: 'Shopify Growth',
    baseSetup: 16000,
    baseMonthly: 4000,
    tier1Slots: 4,
    tier2Slots: 1,
    tier3Slots: 0,
    isLegacyOnly: true,
  },
}
