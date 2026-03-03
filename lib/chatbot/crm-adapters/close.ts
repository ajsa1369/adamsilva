/**
 * lib/chatbot/crm-adapters/close.ts
 *
 * Close CRM adapter implementing the CRMAdapter interface.
 * Creates a lead (with contact) in Close CRM using the REST API v1.
 * Requires: CLOSE_API_KEY environment variable.
 *
 * Note: Close CRM's data model uses "Lead" as the top-level entity
 * containing contacts. createContact() creates a Lead with one contact.
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class CloseAdapter implements CRMAdapter {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.CLOSE_API_KEY ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'CLOSE_API_KEY not configured' }
    }
    try {
      const authHeader = `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`
      const res = await fetch('https://api.close.com/api/v1/lead/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify({
          name: `${lead.firstName} ${lead.lastName}${lead.company ? ` — ${lead.company}` : ''}`,
          contacts: [
            {
              name: `${lead.firstName} ${lead.lastName}`,
              emails: [{ type: 'office', email: lead.email }],
              phones: lead.phone ? [{ type: 'office', phone: lead.phone }] : [],
            },
          ],
          custom: {
            source: lead.source,
            session_id: lead.sessionId,
          },
          description: lead.notes ?? '',
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `Close CRM API ${res.status}: ${err}` }
      }
      const data = await res.json() as { id: string; contacts: Array<{ id: string }> }
      return {
        success: true,
        dealId: data.id,
        contactId: data.contacts?.[0]?.id,
      }
    } catch (err) {
      return { success: false, error: `Close CRM fetch error: ${String(err)}` }
    }
  }
}
