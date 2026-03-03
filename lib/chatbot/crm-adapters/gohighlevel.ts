/**
 * lib/chatbot/crm-adapters/gohighlevel.ts
 *
 * GoHighLevel CRM adapter implementing the CRMAdapter interface.
 * Creates a contact in GoHighLevel using the REST v1 API.
 * Requires: GOHIGHLEVEL_API_KEY environment variable.
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class GoHighLevelAdapter implements CRMAdapter {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.GOHIGHLEVEL_API_KEY ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'GOHIGHLEVEL_API_KEY not configured' }
    }
    try {
      const res = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone ?? '',
          companyName: lead.company ?? '',
          source: lead.source,
          customField: lead.notes ? [{ value: lead.notes }] : [],
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `GoHighLevel API ${res.status}: ${err}` }
      }
      const data = await res.json() as { contact: { id: string } }
      return { success: true, contactId: data.contact?.id }
    } catch (err) {
      return { success: false, error: `GoHighLevel fetch error: ${String(err)}` }
    }
  }
}
