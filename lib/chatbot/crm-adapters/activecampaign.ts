/**
 * lib/chatbot/crm-adapters/activecampaign.ts
 *
 * ActiveCampaign CRM adapter implementing the CRMAdapter interface.
 * Creates a contact in ActiveCampaign using the API v3.
 * Requires: ACTIVECAMPAIGN_API_KEY, ACTIVECAMPAIGN_BASE_URL environment variables.
 * ACTIVECAMPAIGN_BASE_URL example: "https://myaccount.api-us1.com"
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class ActiveCampaignAdapter implements CRMAdapter {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.ACTIVECAMPAIGN_API_KEY ?? ''
    this.baseUrl = process.env.ACTIVECAMPAIGN_BASE_URL ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'ACTIVECAMPAIGN_API_KEY not configured' }
    }
    if (!this.baseUrl) {
      return { success: false, error: 'ACTIVECAMPAIGN_BASE_URL not configured' }
    }
    try {
      const url = `${this.baseUrl}/api/3/contacts`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': this.apiKey,
        },
        body: JSON.stringify({
          contact: {
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone ?? '',
            fieldValues: lead.notes
              ? [{ field: 'notes', value: lead.notes }]
              : [],
          },
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `ActiveCampaign API ${res.status}: ${err}` }
      }
      const data = await res.json() as { contact: { id: string } }
      return { success: true, contactId: data.contact.id }
    } catch (err) {
      return { success: false, error: `ActiveCampaign fetch error: ${String(err)}` }
    }
  }
}
