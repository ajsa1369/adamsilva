/**
 * lib/intake/tools.ts
 *
 * AI tool definitions for the intake agent.
 * Uses Vercel AI SDK tool() + zod for runtime schema validation.
 * All 5 tools are called by the LLM during conversation steps.
 *
 * Delivery chain (INTAKE-05, INTAKE-06, INTAKE-07):
 *   calculateProposal → generateProposalPDF → saveToCRM
 *   saveToCRM internally calls: generate-proposal edge fn → send-proposal-email edge fn → CRM webhook
 *
 * NOTE: Uses ai@6 API — tool() takes inputSchema (not parameters),
 * and execute receives (input, options) where input is the typed object.
 */

import { tool } from 'ai'
import { z } from 'zod'
import { lookupIntegration as catalogLookup } from '@/lib/integrations/catalog'
import { selectTier } from '@/lib/pricing/tier-selector'
import { calculatePricing } from '@/lib/pricing/calculator'
import type { IntegrationSelection } from '@/lib/pricing/types'

const LEGACY_PLATFORMS = ['shopify', 'wix', 'squarespace', 'wordpress']

// ---- Tool 1: lookupIntegration ----
export const lookupIntegrationTool = tool({
  description: 'Look up a named tool or software in the integration catalog and return its tier classification and costs.',
  inputSchema: z.object({
    name: z.string().describe('The tool or software name as provided by the prospect (e.g. "HubSpot", "Shopify", "Stripe")'),
  }),
  execute: async (input) => {
    const entry = catalogLookup(input.name)
    if (!entry) {
      return { found: false, name: input.name, tier: null, setupCost: null, monthlyCost: null }
    }
    return {
      found: true,
      name: entry.name,
      tier: entry.tier,
      setupCost: entry.setupCost,
      monthlyCost: entry.monthlyCost,
      category: entry.category,
    }
  },
})

// ---- Tool 2: detectPlatformTier ----
export const detectPlatformTierTool = tool({
  description: 'Classify the prospect\'s website platform as legacy, full, or migration path.',
  inputSchema: z.object({
    platform: z.string().describe('The website platform name (e.g. "Shopify", "Next.js", "WordPress", "No website yet")'),
  }),
  execute: async (input) => {
    const normalized = input.platform.toLowerCase().trim()
    if (LEGACY_PLATFORMS.some(lp => normalized.includes(lp))) {
      return { platformTier: 'legacy' as const, platform: input.platform }
    }
    if (normalized === 'no website yet' || normalized === 'none') {
      return { platformTier: 'migration' as const, platform: input.platform }
    }
    return { platformTier: 'full' as const, platform: input.platform }
  },
})

// ---- Tool 3: calculateProposal ----
export const calculateProposalTool = tool({
  description: 'Generate a complete proposal by running tier selection and pricing calculation.',
  inputSchema: z.object({
    integrations: z.array(z.object({
      name: z.string(),
      tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    })).describe('List of tools the prospect uses, each with name and tier'),
    monthlyLeads: z.number().describe('Monthly lead volume (numeric midpoint: 25, 125, 350, or 750)'),
    goals: z.array(z.string()).describe('Selected goals (e.g. ["appointments", "leads", "ucp"])'),
    platform: z.string().describe('Website platform'),
    locationCount: z.number().describe('Number of business locations (midpoint: 1, 5, 13, or 25)'),
  }),
  execute: async (input) => {
    const integrationSelections: IntegrationSelection[] = input.integrations.map(i => ({
      name: i.name,
      tier: i.tier as 1 | 2 | 3,
    }))
    const recommendation = selectTier({
      integrations: integrationSelections,
      monthlyLeads: input.monthlyLeads,
      goals: input.goals,
      platform: input.platform,
      locationCount: input.locationCount,
    })
    const pricing = calculatePricing(recommendation.recommendedSlug, integrationSelections)
    return {
      packageSlug: recommendation.recommendedSlug,
      isLegacyPath: recommendation.isLegacyPath,
      tierReasoning: recommendation.reasoning,
      setupTotal: pricing.setupTotal,
      monthlyTotal: pricing.monthlyTotal,
      baseSetup: pricing.baseSetup,
      baseMonthly: pricing.baseMonthly,
      overageSetup: pricing.overageSetup,
      overageMonthly: pricing.overageMonthly,
      includedIntegrations: pricing.includedIntegrations,
      overageIntegrations: pricing.overageIntegrations,
    }
  },
})

// ---- Tool 4: generateProposalPDF ----
export const generateProposalPDFTool = tool({
  description: 'Generate a PDF proposal and return the URL or data URI. Call this after calculateProposal, before saveToCRM.',
  inputSchema: z.object({
    prospectName: z.string(),
    packageSlug: z.string(),
    setupTotal: z.number(),
    monthlyTotal: z.number(),
  }),
  execute: async (input) => {
    // PDF is generated server-side in app/api/intake/pdf/route.ts (Plan 05)
    // This tool calls that route to get the URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adamsilvaconsulting.com'
    const res = await fetch(`${baseUrl}/api/intake/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prospectName: input.prospectName,
        packageSlug: input.packageSlug,
        setupTotal: input.setupTotal,
        monthlyTotal: input.monthlyTotal,
      }),
    })
    if (!res.ok) {
      return { success: false, pdfUrl: null, error: `PDF generation failed: ${res.status}` }
    }
    const data = await res.json() as { pdfUrl: string }
    return { success: true, pdfUrl: data.pdfUrl }
  },
})

// ---- Tool 5: saveToCRM ----
// This is the single orchestration point for proposal persistence + email delivery + CRM webhook.
// Called AFTER generateProposalPDF — pdfUrl is passed in explicitly from the LLM's tool call context.
//
// Internal sequence (all three run inside execute):
//   1. Call generate-proposal edge function → get proposalId (INTAKE-05)
//   2. Call send-proposal-email edge function with proposalId + pdfUrl (INTAKE-06)
//   3. Fire CRM webhook with deal data (INTAKE-07)
//
// This approach avoids the onFinish anti-pattern where prospect_name/prospect_email
// are unavailable — they are explicit zod parameters here.
export const saveToCRMTool = tool({
  description: 'Persist the proposal to Supabase, send the PDF proposal email to the prospect, and create a contact + deal in the CRM. Call this after generateProposalPDF — pass the pdfUrl from its result.',
  inputSchema: z.object({
    prospectName: z.string(),
    prospectEmail: z.string(),
    industry: z.string(),
    platform: z.string(),
    platformTier: z.enum(['legacy', 'full', 'migration']),
    locationCount: z.number(),
    monthlyLeads: z.number(),
    goals: z.array(z.string()),
    packageSlug: z.string(),
    setupTotal: z.number(),
    monthlyTotal: z.number(),
    tierReasoning: z.string(),
    pdfUrl: z.string().describe('The pdfUrl returned by generateProposalPDF'),
    integrations: z.array(z.object({
      name: z.string(),
      tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      setupCost: z.number(),
      monthlyCost: z.number(),
      included: z.boolean(),
    })).optional().describe('Proposal line items (optional — included if available from calculateProposal)'),
  }),
  execute: async (input) => {
    const {
      prospectName, prospectEmail, industry, platform, platformTier,
      locationCount, monthlyLeads, goals, packageSlug, setupTotal, monthlyTotal,
      tierReasoning, pdfUrl, integrations,
    } = input

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    let proposalId: string | null = null

    // ── Step 1: Persist proposal to Supabase (INTAKE-05) ──────────────────────────
    if (supabaseUrl && serviceKey) {
      try {
        const persistRes = await fetch(`${supabaseUrl}/functions/v1/generate-proposal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({
            prospect_name: prospectName,
            prospect_email: prospectEmail,
            industry,
            platform,
            platform_tier: platformTier,
            locations: locationCount,
            monthly_leads: monthlyLeads,
            goals,
            recommended_package: packageSlug,
            setup_total: setupTotal,
            monthly_total: monthlyTotal,
            integrations_detected: integrations ?? [],
            proposal_pdf_url: pdfUrl,
          }),
        })
        if (persistRes.ok) {
          const persistData = await persistRes.json() as { success: boolean; proposal_id: string }
          proposalId = persistData.proposal_id ?? null
        } else {
          console.error('generate-proposal edge function failed:', persistRes.status)
        }
      } catch (err) {
        console.error('generate-proposal fetch error:', err)
      }

      // ── Step 2: Send proposal email (INTAKE-06) ───────────────────────────────────
      if (proposalId) {
        try {
          const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-proposal-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${serviceKey}`,
            },
            body: JSON.stringify({
              proposal_id: proposalId,
              prospect_email: prospectEmail,
              prospect_name: prospectName,
              proposal_pdf_url: pdfUrl,
              package_name: packageSlug,
              setup_total: setupTotal,
              monthly_total: monthlyTotal,
            }),
          })
          if (!emailRes.ok) {
            console.error('send-proposal-email edge function failed:', emailRes.status)
          }
        } catch (err) {
          console.error('send-proposal-email fetch error:', err)
        }
      }
    } else {
      console.warn('NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — skipping Supabase steps')
    }

    // ── Step 3: CRM webhook (INTAKE-07) ──────────────────────────────────────────
    const webhookUrl = process.env.ASC_CRM_WEBHOOK_URL
    if (!webhookUrl) {
      // CRM not configured — log and continue (non-fatal)
      console.warn('ASC_CRM_WEBHOOK_URL not set — skipping CRM webhook')
      return {
        success: true,
        proposalId,
        crmSkipped: true,
        reason: 'CRM_WEBHOOK_URL not configured',
      }
    }
    const apiKey = process.env.ASC_CRM_API_KEY ?? ''
    const crmPayload = {
      event: 'proposal_created',
      prospect: { name: prospectName, email: prospectEmail, industry, platform, monthlyLeads },
      proposal: { packageSlug, setupTotal, monthlyTotal, proposalId, tierReasoning },
    }
    try {
      const crmRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(crmPayload),
      })
      if (!crmRes.ok) {
        return { success: false, proposalId, error: `CRM webhook ${crmRes.status}` }
      }
    } catch (err) {
      return { success: false, proposalId, error: `CRM webhook error: ${String(err)}` }
    }

    return { success: true, proposalId }
  },
})

// Barrel export used by app/api/intake/chat/route.ts
export const intakeTools = {
  lookupIntegration: lookupIntegrationTool,
  detectPlatformTier: detectPlatformTierTool,
  calculateProposal: calculateProposalTool,
  generateProposalPDF: generateProposalPDFTool,
  saveToCRM: saveToCRMTool,
}
