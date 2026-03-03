/**
 * lib/chatbot/crm-adapters/monday-sales.ts
 *
 * Monday.com Sales CRM adapter implementing the CRMAdapter interface.
 * Creates a lead item in a Monday.com board using the GraphQL API v2.
 * Requires: MONDAY_API_KEY, MONDAY_BOARD_ID environment variables.
 * MONDAY_BOARD_ID: the numeric ID of the board to create items in.
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class MondaySalesAdapter implements CRMAdapter {
  private apiKey: string
  private boardId: string

  constructor() {
    this.apiKey = process.env.MONDAY_API_KEY ?? ''
    this.boardId = process.env.MONDAY_BOARD_ID ?? ''
  }

  async createContact(lead: CRMLead): Promise<CRMResult> {
    if (!this.apiKey) {
      return { success: false, error: 'MONDAY_API_KEY not configured' }
    }
    if (!this.boardId) {
      return { success: false, error: 'MONDAY_BOARD_ID not configured' }
    }
    try {
      const itemName = `${lead.firstName} ${lead.lastName}`
      const columnValues = JSON.stringify({
        email: { email: lead.email, text: lead.email },
        phone: { phone: lead.phone ?? '', countryShortName: 'US' },
        text: lead.company ?? '',
        status: { label: lead.source },
      })

      const query = `
        mutation {
          create_item(
            board_id: ${this.boardId},
            item_name: "${itemName.replace(/"/g, '\\"')}",
            column_values: "${columnValues.replace(/"/g, '\\"')}"
          ) {
            id
          }
        }
      `

      const res = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
        },
        body: JSON.stringify({ query }),
      })
      if (!res.ok) {
        const err = await res.text()
        return { success: false, error: `Monday.com API ${res.status}: ${err}` }
      }
      const data = await res.json() as { data: { create_item: { id: string } }; errors?: Array<{ message: string }> }
      if (data.errors && data.errors.length > 0) {
        return { success: false, error: `Monday.com GraphQL error: ${data.errors[0].message}` }
      }
      return { success: true, contactId: data.data.create_item.id }
    } catch (err) {
      return { success: false, error: `Monday.com fetch error: ${String(err)}` }
    }
  }
}
