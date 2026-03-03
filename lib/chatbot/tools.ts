/**
 * lib/chatbot/tools.ts
 *
 * Chatbot tool definitions for the Adam Silva Consulting site chatbot.
 * Uses Vercel AI SDK v6 tool() with inputSchema (NOT parameters — that was v3/v4).
 * Each tool's execute() receives the typed input object directly.
 *
 * 5 tools:
 *   1. bookAppointment   — Calendly stub (real integration deferred to v2)
 *   2. calculateJobCost  — Reuses selectTier() + calculatePricing() from Phase 3
 *   3. createCRMLead     — Routes to active CRM adapter via getCRMAdapter()
 *   4. escalateToHuman   — Creates escalation ticket, logs to Vercel console
 *   5. lookupOrderStatus — Fetches from client-configured endpoint with 5s timeout
 *
 * CHAT-02 / CHAT-03 compliance.
 */

import { tool } from 'ai'
import { z } from 'zod'
import { selectTier } from '@/lib/pricing/tier-selector'
import { calculatePricing } from '@/lib/pricing/calculator'
import type { IntegrationSelection } from '@/lib/pricing/types'
import { getCRMAdapter } from '@/lib/chatbot/crm-adapters/index'
import type {
  BookAppointmentResult,
  CalculateJobCostResult,
  EscalateToHumanResult,
  LookupOrderStatusResult,
} from '@/lib/chatbot/types'

// ---------------------------------------------------------------------------
// Tool 1 — bookAppointment
// ---------------------------------------------------------------------------

// TODO(v2): Integrate Calendly API — CALENDLY_API_KEY deferred
export const bookAppointmentTool = tool({
  description:
    'Book a strategy call appointment for the visitor. Returns a Calendly booking URL.',
  inputSchema: z.object({
    visitorName: z.string().describe('Full name of the visitor'),
    visitorEmail: z.string().describe('Email address of the visitor'),
    preferredTime: z
      .string()
      .optional()
      .describe('Preferred time for the appointment (e.g. "tomorrow afternoon")'),
  }),
  execute: async (_input): Promise<BookAppointmentResult> => {
    // TODO(v2): Integrate Calendly API — CALENDLY_API_KEY deferred
    return {
      success: true,
      bookingUrl: 'https://calendly.com/adamsilva/30min',
      bookingId: undefined,
    }
  },
})

// ---------------------------------------------------------------------------
// Tool 2 — calculateJobCost
// ---------------------------------------------------------------------------

export const calculateJobCostTool = tool({
  description:
    'Calculate the estimated setup cost and monthly cost for an agentic commerce integration project based on the prospect\'s integrations and requirements.',
  inputSchema: z.object({
    integrations: z
      .array(
        z.object({
          name: z.string().describe('Integration or tool name'),
          tier: z
            .union([z.literal(1), z.literal(2), z.literal(3)])
            .describe('Integration tier (1=basic, 2=mid, 3=enterprise)'),
        }),
      )
      .describe('List of integrations the prospect uses'),
    monthlyLeads: z.number().describe('Monthly lead volume'),
    goals: z.array(z.string()).describe('Prospect goals (e.g. ["appointments", "ucp", "leads"])'),
    platform: z.string().describe('Website or commerce platform (e.g. "shopify", "next.js")'),
    locationCount: z.number().describe('Number of business locations'),
  }),
  execute: async (input): Promise<CalculateJobCostResult> => {
    try {
      const integrationSelections: IntegrationSelection[] = input.integrations.map((i) => ({
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
        success: true,
        setupTotal: pricing.setupTotal,
        monthlyTotal: pricing.monthlyTotal,
        packageSlug: recommendation.recommendedSlug,
      }
    } catch (err) {
      return {
        success: false,
        error: `Cost calculation error: ${String(err)}`,
      }
    }
  },
})

// ---------------------------------------------------------------------------
// Tool 3 — createCRMLead
// ---------------------------------------------------------------------------

export const createCRMLeadTool = tool({
  description:
    'Create a lead or contact record in the client\'s CRM system. Supports 10 CRM types.',
  inputSchema: z.object({
    firstName: z.string().describe('Lead first name'),
    lastName: z.string().describe('Lead last name'),
    email: z.string().describe('Lead email address'),
    phone: z.string().optional().describe('Lead phone number'),
    company: z.string().optional().describe('Lead company name'),
    crmType: z
      .string()
      .describe(
        'CRM system type (hubspot, salesforce, pipedrive, zoho, gohighlevel, monday-sales, freshsales, close, keap, activecampaign)',
      ),
    sessionId: z.string().describe('Chatbot session ID for tracking'),
    notes: z.string().optional().describe('Additional notes about the lead'),
  }),
  execute: async (input) => {
    const adapter = getCRMAdapter(input.crmType)
    if (!adapter) {
      return {
        success: false,
        error: `CRM type not supported: ${input.crmType}`,
      }
    }

    return adapter.createContact({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      company: input.company,
      source: 'chatbot',
      sessionId: input.sessionId,
      notes: input.notes,
    })
  },
})

// ---------------------------------------------------------------------------
// Tool 4 — escalateToHuman
// ---------------------------------------------------------------------------

export const escalateToHumanTool = tool({
  description:
    'Escalate the conversation to a human agent. Creates a support ticket and returns estimated wait time.',
  inputSchema: z.object({
    reason: z.string().describe('Reason for escalation'),
    visitorName: z.string().optional().describe('Name of the visitor requesting escalation'),
    visitorEmail: z.string().optional().describe('Email of the visitor requesting escalation'),
    urgency: z
      .enum(['low', 'medium', 'high'])
      .describe('Urgency level — high means < 5 min response, others < 2 hours'),
  }),
  execute: async (input): Promise<EscalateToHumanResult> => {
    const ticketId = `ESC-${Date.now()}`
    const estimatedWait = input.urgency === 'high' ? '< 5 minutes' : '< 2 hours'

    // Log to Vercel serverless function logs for immediate visibility
    console.warn(
      `[ESCALATION] ticketId=${ticketId} urgency=${input.urgency} reason="${input.reason}" visitor="${input.visitorName ?? 'unknown'}" email="${input.visitorEmail ?? 'none'}"`,
    )

    return {
      success: true,
      ticketId,
      estimatedWait,
    }
  },
})

// ---------------------------------------------------------------------------
// Tool 5 — lookupOrderStatus
// ---------------------------------------------------------------------------

export const lookupOrderStatusTool = tool({
  description:
    'Look up the status of a client order using the configured order status endpoint.',
  inputSchema: z.object({
    orderId: z.string().describe('The order ID to look up'),
    clientEndpoint: z
      .string()
      .optional()
      .describe('Client-specific order status API endpoint URL'),
  }),
  execute: async (input): Promise<LookupOrderStatusResult> => {
    if (!input.clientEndpoint) {
      return {
        success: false,
        status: 'Order lookup not configured for this client',
        error: 'ORDER_STATUS_ENDPOINT not set',
      }
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const res = await fetch(
        `${input.clientEndpoint}?orderId=${encodeURIComponent(input.orderId)}`,
        { signal: controller.signal },
      )
      clearTimeout(timeoutId)

      if (!res.ok) {
        return {
          success: false,
          orderId: input.orderId,
          error: `Order status API returned ${res.status}`,
        }
      }

      const data = await res.json() as {
        status?: string
        orderId?: string
        lastUpdated?: string
      }

      return {
        success: true,
        status: data.status,
        orderId: data.orderId ?? input.orderId,
        lastUpdated: data.lastUpdated,
      }
    } catch (err) {
      return {
        success: false,
        orderId: input.orderId,
        error: `Order lookup failed: ${String(err)}`,
      }
    }
  },
})

// ---------------------------------------------------------------------------
// Barrel export — passed to streamText tools object in Plan 04
// ---------------------------------------------------------------------------

export const chatbotTools = {
  bookAppointment: bookAppointmentTool,
  calculateJobCost: calculateJobCostTool,
  createCRMLead: createCRMLeadTool,
  escalateToHuman: escalateToHumanTool,
  lookupOrderStatus: lookupOrderStatusTool,
}
