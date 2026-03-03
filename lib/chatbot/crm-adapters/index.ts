/**
 * lib/chatbot/crm-adapters/index.ts
 *
 * Factory function returning the correct CRMAdapter by CRM type string.
 * Used by the createCRMLead chatbot tool in lib/chatbot/tools.ts.
 *
 * Supported CRM types (10 total — CHAT-03 requirement):
 *   hubspot, salesforce, pipedrive, zoho, gohighlevel,
 *   monday-sales, freshsales, close, keap, activecampaign
 *
 * Returns null for unknown CRM types (caller must handle).
 */

import type { CRMAdapter } from '@/lib/chatbot/types'
import { HubSpotAdapter } from './hubspot'
import { SalesforceAdapter } from './salesforce'
import { PipedriveAdapter } from './pipedrive'
import { ZohoAdapter } from './zoho'
import { GoHighLevelAdapter } from './gohighlevel'
import { MondaySalesAdapter } from './monday-sales'
import { FreshsalesAdapter } from './freshsales'
import { CloseAdapter } from './close'
import { KeapAdapter } from './keap'
import { ActiveCampaignAdapter } from './activecampaign'

const ADAPTERS: Record<string, () => CRMAdapter> = {
  hubspot: () => new HubSpotAdapter(),
  salesforce: () => new SalesforceAdapter(),
  pipedrive: () => new PipedriveAdapter(),
  zoho: () => new ZohoAdapter(),
  gohighlevel: () => new GoHighLevelAdapter(),
  'monday-sales': () => new MondaySalesAdapter(),
  freshsales: () => new FreshsalesAdapter(),
  close: () => new CloseAdapter(),
  keap: () => new KeapAdapter(),
  activecampaign: () => new ActiveCampaignAdapter(),
}

/**
 * Returns a CRMAdapter instance for the given CRM type string.
 * Returns null if the CRM type is not supported.
 *
 * @param crmType - Lowercase CRM type identifier (e.g. 'hubspot', 'salesforce')
 * @returns CRMAdapter instance or null
 */
export function getCRMAdapter(crmType: string): CRMAdapter | null {
  const factory = ADAPTERS[crmType.toLowerCase()]
  return factory ? factory() : null
}
