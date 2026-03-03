/**
 * lib/chatbot/crm-adapters/keap.ts
 *
 * Keap (Infusionsoft) CRM adapter implementing the CRMAdapter interface.
 * Creates a contact in Keap using the CRM REST v1 API.
 * Requires: KEAP_API_KEY environment variable.
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class KeapAdapter implements CRMAdapter {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.KEAP_API_KEY ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'KEAP_API_KEY not configured' }
    }
    try {
      const res = await fetch('https://api.infusionsoft.com/crm/rest/v1/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          given_name: lead.firstName,
          family_name: lead.lastName,
          email_addresses: [{ email: lead.email, field: 'EMAIL1' }],
          phone_numbers: lead.phone
            ? [{ number: lead.phone, field: 'PHONE1' }]
            : [],
          company: { company_name: lead.company ?? '' },
          lead_source_id: null,
          notes: lead.notes ?? '',
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `Keap API ${res.status}: ${err}` }
      }
      const data = await res.json() as { id: number }
      return { success: true, contactId: String(data.id) }
    } catch (err) {
      return { success: false, error: `Keap fetch error: ${String(err)}` }
    }
  }
}
