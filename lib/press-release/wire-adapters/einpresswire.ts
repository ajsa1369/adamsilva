/**
 * lib/press-release/wire-adapters/einpresswire.ts
 *
 * EIN Presswire adapter — free tier, default wire service per CONTEXT.md.
 * Implements WireAdapter interface.
 * Returns status: 'skipped' if EINPRESSWIRE_API_KEY is not set.
 *
 * TODO(live): Replace stub endpoint with verified EIN Presswire API URL
 * when live credentials are available.
 */

import type { WireAdapter, WireSubmitResult, PressReleaseDraft } from '@/lib/press-release/types'

export const einpresswireAdapter: WireAdapter = {
  name: 'einpresswire',
  async submit(draft: PressReleaseDraft, _mediaFiles: string[]): Promise<WireSubmitResult> {
    const apiKey = process.env.EINPRESSWIRE_API_KEY
    if (!apiKey) {
      return { service: 'einpresswire', status: 'skipped', error: 'EINPRESSWIRE_API_KEY not set' }
    }
    try {
      const res = await fetch('https://www.einpresswire.com/api/v1/news', {
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
        return { service: 'einpresswire', status: 'submitted', url: data.url }
      }
      const err = await res.text()
      return {
        service: 'einpresswire',
        status: 'error',
        error: `EIN API ${res.status}: ${err.slice(0, 200)}`,
      }
    } catch (err) {
      return {
        service: 'einpresswire',
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      }
    }
  },
}
