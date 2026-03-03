/**
 * lib/chatbot/crm-adapters/hubspot.ts
 *
 * HubSpot CRM adapter implementing the CRMAdapter interface.
 * Creates a contact in HubSpot using the CRM v3 API.
 * Requires: HUBSPOT_API_KEY environment variable.
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class HubSpotAdapter implements CRMAdapter {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.HUBSPOT_API_KEY ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'HUBSPOT_API_KEY not configured' }
    }
    try {
      const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          properties: {
            firstname: lead.firstName,
            lastname: lead.lastName,
            email: lead.email,
            phone: lead.phone ?? '',
            company: lead.company ?? '',
            leadsource: lead.source,
          },
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `HubSpot API ${res.status}: ${err}` }
      }
      const data = await res.json() as { id: string }
      return { success: true, contactId: data.id }
    } catch (err) {
      return { success: false, error: `HubSpot fetch error: ${String(err)}` }
    }
  }
}
