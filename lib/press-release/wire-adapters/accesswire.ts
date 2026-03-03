/**
 * lib/press-release/wire-adapters/accesswire.ts
 *
 * AccessWire adapter — implements WireAdapter interface.
 * Returns status: 'skipped' if ACCESSWIRE_API_KEY is not set.
 *
 * TODO(live): Verify AccessWire API endpoint when live credentials are available.
 * API: https://api.accesswire.com/v1/news
 */

import type { WireAdapter, WireSubmitResult, PressReleaseDraft } from '@/lib/press-release/types'

export const accesswireAdapter: WireAdapter = {
  name: 'accesswire',
  async submit(draft: PressReleaseDraft, _mediaFiles: string[]): Promise<WireSubmitResult> {
    const apiKey = process.env.ACCESSWIRE_API_KEY
    if (!apiKey) {
      return { service: 'accesswire', status: 'skipped', error: 'ACCESSWIRE_API_KEY not set' }
    }
    try {
      const res = await fetch('https://api.accesswire.com/v1/news', {
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
        return { service: 'accesswire', status: 'submitted', url: data.url }
      }
      const err = await res.text()
      return {
        service: 'accesswire',
        status: 'error',
        error: `AccessWire API ${res.status}: ${err.slice(0, 200)}`,
      }
    } catch (err) {
      return {
        service: 'accesswire',
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      }
    }
  },
}
