/**
 * lib/chatbot/crm-adapters/pipedrive.ts
 *
 * Pipedrive CRM adapter implementing the CRMAdapter interface.
 * Creates a person (contact) in Pipedrive using the REST API v1.
 * Requires: PIPEDRIVE_API_TOKEN, PIPEDRIVE_DOMAIN environment variables.
 * PIPEDRIVE_DOMAIN example: "mycompany" (subdomain of pipedrive.com)
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class PipedriveAdapter implements CRMAdapter {
  private apiToken: string
  private domain: string

  constructor() {
    this.apiToken = process.env.PIPEDRIVE_API_TOKEN ?? ''
    this.domain = process.env.PIPEDRIVE_DOMAIN ?? 'api'
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiToken) {
      return { success: false, error: 'PIPEDRIVE_API_TOKEN not configured' }
    }
    try {
      const url = `https://${this.domain}.pipedrive.com/api/v1/persons?api_token=${this.apiToken}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${lead.firstName} ${lead.lastName}`,
          email: [{ value: lead.email, primary: true }],
          phone: lead.phone ? [{ value: lead.phone, primary: true }] : [],
          org_name: lead.company ?? '',
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `Pipedrive API ${res.status}: ${err}` }
      }
      const data = await res.json() as { success: boolean; data: { id: number } }
      return { success: true, contactId: String(data.data.id) }
    } catch (err) {
      return { success: false, error: `Pipedrive fetch error: ${String(err)}` }
    }
  }
}
