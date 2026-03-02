/**
 * lib/intake/types.ts
 *
 * Shared type contracts for the Phase 4 agentic intake agent.
 * Imported by: lib/intake/tools.ts, app/api/intake/chat/route.ts,
 *              app/(marketing)/get-started/page.tsx, and edge functions.
 */

import type { IntegrationSelection } from '@/lib/pricing/types'

// Data collected during the intake conversation
export interface ProspectData {
  name: string
  email: string
  industry: string
  platform: string
  locationCount: number          // 1 | 5 | 13 | 25 (representative midpoints for 1/2-5/6-20/20+)
  monthlyLeads: number           // 25 | 125 | 350 | 750 (midpoints for under50/50-200/200-500/500+)
  goals: string[]                // e.g. ['appointments', 'leads', 'blog', 'ucp', 'acp']
  platformTier: 'legacy' | 'full' | 'migration'
  legacyPath?: 'addon' | 'migrate' // only set if platformTier === 'legacy'
  rawTools: string[]             // tool names as typed by prospect
}

// Integration line item in a proposal (extends IntegrationSelection with cost/status)
export interface ProposalLineItem extends IntegrationSelection {
  setupCost: number
  monthlyCost: number
  included: boolean   // true = within package slots, false = overage
}

// Full proposal data shape — used for PDF generation, Supabase insert, and CRM webhook
export interface ProposalData {
  prospectName: string
  prospectEmail: string
  industry: string
  platform: string
  platformTier: 'legacy' | 'full' | 'migration'
  locationCount: number
  monthlyLeads: number
  goals: string[]
  integrations: ProposalLineItem[]
  packageSlug: string
  baseSetup: number
  baseMonthly: number
  overageSetup: number
  overageMonthly: number
  setupTotal: number
  monthlyTotal: number
  tierReasoning: string
  proposalId?: string            // set after Supabase insert
  pdfUrl?: string                // set after PDF generation
  createdAt: string              // ISO string
}
