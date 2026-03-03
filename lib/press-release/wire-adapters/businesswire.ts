/**
 * lib/press-release/wire-adapters/businesswire.ts
 *
 * Business Wire adapter — implements WireAdapter interface.
 * Returns status: 'skipped' if BUSINESSWIRE_API_KEY is not set.
 *
 * TODO(live): Verify Business Wire API endpoint when live credentials are available.
 * API: https://api.businesswire.com/v1/releases
 */

import type { WireAdapter, WireSubmitResult, PressReleaseDraft } from '@/lib/press-release/types'

export const businesswireAdapter: WireAdapter = {
  name: 'businesswire',
  async submit(draft: PressReleaseDraft, _mediaFiles: string[]): Promise<WireSubmitResult> {
    const apiKey = process.env.BUSINESSWIRE_API_KEY
    if (!apiKey) {
      return { service: 'businesswire', status: 'skipped', error: 'BUSINESSWIRE_API_KEY not set' }
    }
    try {
      const res = await fetch('https://api.businesswire.com/v1/releases', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: draft.headline,
          body: `${draft.lead}\n\n${draft.body}\n\n${draft.boilerplate}`,
          dateline: draft.dateline,
        }),
      })
      if (res.ok) {
        const data = await res.json() as { url?: string; id?: string }
        return { service: 'businesswire', status: 'submitted', url: data.url }
      }
      const err = await res.text()
      return {
        service: 'businesswire',
        status: 'error',
        error: `BusinessWire API ${res.status}: ${err.slice(0, 200)}`,
      }
    } catch (err) {
      return {
        service: 'businesswire',
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      }
    }
  },
}
