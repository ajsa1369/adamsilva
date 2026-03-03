/**
 * lib/press-release/distributor.ts
 *
 * Parallel wire submission orchestrator.
 * Uses Promise.allSettled so partial failure is acceptable (PR-04: at least one service).
 * Default: ['einpresswire'] (free tier — per CONTEXT.md decision)
 */

import { einpresswireAdapter } from '@/lib/press-release/wire-adapters/einpresswire'
import { businesswireAdapter } from '@/lib/press-release/wire-adapters/businesswire'
import { prnewswireAdapter } from '@/lib/press-release/wire-adapters/prnewswire'
import { accesswireAdapter } from '@/lib/press-release/wire-adapters/accesswire'
import type { WireAdapter, WireSubmitResult, PressReleaseDraft } from '@/lib/press-release/types'

// Registry of all available adapters — keyed by service name
const ADAPTERS: Record<string, WireAdapter> = {
  einpresswire: einpresswireAdapter,
  businesswire: businesswireAdapter,
  prnewswire: prnewswireAdapter,
  accesswire: accesswireAdapter,
}

/**
 * distribute — Submit a press release to one or more wire services in parallel.
 *
 * Uses Promise.allSettled so partial failure is acceptable (PR-04: at least one service).
 * Unrecognized service names return status: 'error' without throwing.
 * Default: ['einpresswire'] (free tier — per CONTEXT.md decision)
 *
 * @param draft       - The press release draft to submit
 * @param mediaFiles  - Array of public-facing URLs for generated images/video
 * @param wireServices - Wire service names to submit to (default: einpresswire only)
 */
export async function distribute(
  draft: PressReleaseDraft,
  mediaFiles: string[],
  wireServices: string[] = ['einpresswire'],
): Promise<WireSubmitResult[]> {
  const submissions = wireServices.map(async (service) => {
    const adapter = ADAPTERS[service]
    if (!adapter) {
      return {
        service: service as WireSubmitResult['service'],
        status: 'error' as const,
        error: `Unknown wire service: ${service}`,
      }
    }
    return adapter.submit(draft, mediaFiles)
  })

  const settled = await Promise.allSettled(submissions)

  return settled.map((result, i) => {
    if (result.status === 'fulfilled') return result.value
    // Promise itself rejected (should not happen given try/catch in adapters)
    return {
      service: wireServices[i] as WireSubmitResult['service'],
      status: 'error' as const,
      error: result.reason instanceof Error ? result.reason.message : String(result.reason),
    }
  })
}
