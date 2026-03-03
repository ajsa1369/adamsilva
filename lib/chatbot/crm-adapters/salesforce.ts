/**
 * lib/chatbot/crm-adapters/salesforce.ts
 *
 * Salesforce CRM adapter implementing the CRMAdapter interface.
 * Requires: SALESFORCE_CLIENT_ID, SALESFORCE_CLIENT_SECRET, SALESFORCE_INSTANCE_URL
 *
 * TODO(v2): Full Salesforce OAuth2 client credentials flow
 * Requires SALESFORCE_CLIENT_ID + SALESFORCE_CLIENT_SECRET → token endpoint → Contact POST
 * Token endpoint: {SALESFORCE_INSTANCE_URL}/services/oauth2/token
 * Contact POST: {SALESFORCE_INSTANCE_URL}/services/data/v59.0/sobjects/Contact/
 */

import type { CRMAdapter, CRMLead, CRMResult } from '@/lib/chatbot/types'

export class SalesforceAdapter implements CRMAdapter {
  constructor() {
    // No-op: OAuth credentials checked at createContact call time
  }

  async createContact(_lead: CRMLead): Promise<CRMResult> {
    // TODO(v2): Full Salesforce OAuth2 client credentials flow
    // Requires SALESFORCE_CLIENT_ID + SALESFORCE_CLIENT_SECRET → token endpoint → Contact POST
    return {
      success: false,
      error: 'Salesforce adapter requires OAuth setup — see TODO(v2) comment',
    }
  }
}
