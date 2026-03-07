/**
 * lib/chatbot/types.ts
 *
 * Shared TypeScript contracts for all chatbot modules.
 * Every downstream plan (tools, API route, channels, widget) imports from here.
 * All types are exported — nothing unexported.
 *
 * CHAT-01 / CHAT-02 / CHAT-03 compliance.
 */

// ---------------------------------------------------------------------------
// Channel + Outcome — match chatbot_sessions table CHECK constraints exactly
// ---------------------------------------------------------------------------

/** Channel type — matches chatbot_sessions.channel CHECK constraint */
export type ChatChannel = 'web' | 'sms' | 'voice' | 'whatsapp'

/** Session outcome — matches chatbot_sessions.outcome CHECK constraint */
export type ChatOutcome =
  | 'qualified'
  | 'unqualified'
  | 'escalated'
  | 'abandoned'
  | 'booked'
  | 'converted'

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

/** Tool call record stored in session messages */
export interface ChatToolCall {
  toolName: string
  input: Record<string, unknown>
  output: Record<string, unknown>
}

/** Single message in a session */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string // ISO 8601
  toolCalls?: ChatToolCall[]
}

// ---------------------------------------------------------------------------
// Session — maps to chatbot_sessions table
// ---------------------------------------------------------------------------

/** Full session shape (maps to chatbot_sessions table) */
export interface ChatSession {
  id?: string
  clientId: string
  channel: ChatChannel
  messages: ChatMessage[]
  outcome?: ChatOutcome
  crmContactId?: string
  appointmentBooked?: boolean
  leadValueEstimate?: number
  createdAt?: string
  updatedAt?: string
}

// ---------------------------------------------------------------------------
// Knowledge / RAG — maps to chatbot_knowledge table
// ---------------------------------------------------------------------------

/** RAG knowledge chunk (maps to chatbot_knowledge table) */
export interface KnowledgeChunk {
  id: string
  clientId: string
  content: string
  metadata: Record<string, unknown>
  source: string
  embedding?: number[]
}

// ---------------------------------------------------------------------------
// CRM — adapter interface implemented by all 10 CRM adapters in Plan 03
// ---------------------------------------------------------------------------

/** Lead data passed to any CRM adapter */
export interface CRMLead {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  source: string
  sessionId: string
  notes?: string
}

/** Result returned by any CRM adapter */
export interface CRMResult {
  success: boolean
  contactId?: string
  dealId?: string
  error?: string
}

/** CRM adapter interface — all 10 CRM adapters implement this */
export interface CRMAdapter {
  createContact(lead: CRMLead): Promise<CRMResult>
}

// ---------------------------------------------------------------------------
// Tool action result shapes for the 5 chatbot tools
// ---------------------------------------------------------------------------

export interface BookAppointmentResult {
  success: boolean
  bookingUrl?: string
  bookingId?: string
  error?: string
}

export interface CalculateJobCostResult {
  success: boolean
  setupTotal?: number
  monthlyTotal?: number
  packageSlug?: string
  error?: string
}

export interface EscalateToHumanResult {
  success: boolean
  ticketId?: string
  estimatedWait?: string
  error?: string
}

export interface LookupOrderStatusResult {
  success: boolean
  status?: string
  orderId?: string
  lastUpdated?: string
  error?: string
}

// ---------------------------------------------------------------------------
// Client config — loaded from Supabase to determine CRM, tier, allowed channels
// ---------------------------------------------------------------------------

/** Client config — loaded from Supabase to determine CRM, tier, allowed channels */
export interface ChatClientConfig {
  clientId: string
  packageTier: 'genesis' | 'essentials' | 'prime' | 'scale' | 'legacy'
  crmType:
    | 'hubspot'
    | 'salesforce'
    | 'pipedrive'
    | 'zoho'
    | 'gohighlevel'
    | 'monday-sales'
    | 'freshsales'
    | 'close'
    | 'keap'
    | 'activecampaign'
    | null
  allowedChannels: ChatChannel[]
  orderStatusEndpoint?: string
  systemPromptOverride?: string
}
