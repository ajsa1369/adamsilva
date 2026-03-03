/**
 * lib/chatbot/crm-adapters/zoho.ts
 *
 * Zoho CRM adapter implementing the CRMAdapter interface.
 * Creates a contact record in Zoho CRM using the v2 API.
 * Requires: ZOHO_ACCESS_TOKEN environment variable.
 *
 * Note: Zoho access tokens expire every hour. For production use,
 * implement OAuth2 refresh token flow using ZOHO_CLIENT_ID + ZOHO_CLIENT_SECRET.
 * TODO(v2): Implement Zoho OAuth2 token refresh
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class ZohoAdapter implements CRMAdapter {
  private accessToken: string

  constructor() {
    this.accessToken = process.env.ZOHO_ACCESS_TOKEN ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.accessToken) {
      return { success: false, error: 'ZOHO_ACCESS_TOKEN not configured' }
    }
    try {
      const res = await fetch('https://www.zohoapis.com/crm/v2/Contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
        },
        body: JSON.stringify({
          data: [
            {
              First_Name: lead.firstName,
              Last_Name: lead.lastName,
              Email: lead.email,
              Phone: lead.phone ?? '',
              Account_Name: lead.company ?? '',
              Lead_Source: lead.source,
              Description: lead.notes ?? '',
            },
          ],
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `Zoho CRM API ${res.status}: ${err}` }
      }
      const data = await res.json() as { data: Array<{ details: { id: string }; status: string }> }
      const record = data.data?.[0]
      if (!record || record.status === 'error') {
        return { success: false, error: 'Zoho CRM returned error status for contact creation' }
      }
      return { success: true, contactId: record.details.id }
    } catch (err) {
      return { success: false, error: `Zoho fetch error: ${String(err)}` }
    }
  }
}
