/**
 * lib/chatbot/crm-adapters/freshsales.ts
 *
 * Freshsales CRM adapter implementing the CRMAdapter interface.
 * Creates a contact in Freshsales CRM using the REST API.
 * Requires: FRESHSALES_API_KEY, FRESHSALES_DOMAIN environment variables.
 * FRESHSALES_DOMAIN example: "mycompany" (subdomain of myfreshworks.com)
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class FreshsalesAdapter implements CRMAdapter {
  private apiKey: string
  private domain: string

  constructor() {
    this.apiKey = process.env.FRESHSALES_API_KEY ?? ''
    this.domain = process.env.FRESHSALES_DOMAIN ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'FRESHSALES_API_KEY not configured' }
    }
    if (!this.domain) {
      return { success: false, error: 'FRESHSALES_DOMAIN not configured' }
    }
    try {
      const url = `https://${this.domain}.myfreshworks.com/crm/sales/api/contacts`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token token=${this.apiKey}`,
        },
        body: JSON.stringify({
          contact: {
            first_name: lead.firstName,
            last_name: lead.lastName,
            email: lead.email,
            mobile_number: lead.phone ?? '',
            company: { name: lead.company ?? '' },
            lead_source_id: 1, // Default: web
            custom_field: { notes: lead.notes ?? '' },
          },
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `Freshsales API ${res.status}: ${err}` }
      }
      const data = await res.json() as { contact: { id: number } }
      return { success: true, contactId: String(data.contact.id) }
    } catch (err) {
      return { success: false, error: `Freshsales fetch error: ${String(err)}` }
    }
  }
}
