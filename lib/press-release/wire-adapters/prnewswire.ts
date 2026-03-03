/**
 * lib/press-release/wire-adapters/prnewswire.ts
 *
 * PR Newswire adapter — implements WireAdapter interface.
 * Returns status: 'skipped' if PRNEWSWIRE_API_KEY is not set.
 *
 * TODO(live): Verify PR Newswire API endpoint when live credentials are available.
 * API: https://api.prnewswire.com/releases
 */

import type { WireAdapter, WireSubmitResult, PressReleaseDraft } from '@/lib/press-release/types'

export const prnewswireAdapter: WireAdapter = {
  name: 'prnewswire',
  async submit(draft: PressReleaseDraft, _mediaFiles: string[]): Promise<WireSubmitResult> {
    const apiKey = process.env.PRNEWSWIRE_API_KEY
    if (!apiKey) {
      return { service: 'prnewswire', status: 'skipped', error: 'PRNEWSWIRE_API_KEY not set' }
    }
    try {
      const res = await fetch('https://api.prnewswire.com/releases', {
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
        return { service: 'prnewswire', status: 'submitted', url: data.url }
      }
      const err = await res.text()
      return {
        service: 'prnewswire',
        status: 'error',
        error: `PRNewswire API ${res.status}: ${err.slice(0, 200)}`,
      }
    } catch (err) {
      return {
        service: 'prnewswire',
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      }
    }
  },
}
