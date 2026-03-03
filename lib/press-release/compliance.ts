/**
 * lib/press-release/compliance.ts
 *
 * AB 2013 / SB 942 AI transparency label injection for the Phase 7 pipeline.
 * Pure synchronous module — no AI calls, no async, no external side effects.
 *
 * Called by the API route before every Supabase upsert. Zero manual steps required.
 * Consumers can import AI_TRANSPARENCY_LABEL directly to reference the label text.
 */

import type { PressReleaseDraft, ComplianceResult } from '@/lib/press-release/types'

// -----------------------------------------------------------------------
// AB 2013 / SB 942 compliance constants
// -----------------------------------------------------------------------

/**
 * Human-readable AI transparency label.
 * "[Author Name]" is a placeholder — replaced by injectCompliance() at call time.
 * Per AB 2013 (California AI Transparency Act) and SB 942, AI-generated content
 * distributed to the public must disclose its AI-assisted origin.
 */
export const AI_TRANSPARENCY_LABEL =
  'This press release was drafted with AI assistance. Content reviewed and approved by [Author Name].'

/**
 * HTML comment injected into rendered press release pages.
 * Provides machine-readable disclosure for crawlers and validators.
 */
export const AI_TRANSPARENCY_HTML_COMMENT =
  '<!-- AI-GENERATED-CONTENT: Drafted with AI assistance per AB 2013 / SB 942 (California AI Transparency Acts) -->'

// -----------------------------------------------------------------------
// injectCompliance — pure synchronous compliance injector
// -----------------------------------------------------------------------

/**
 * Injects the AB 2013 / SB 942 AI transparency label into a press release draft.
 *
 * The label is appended after the boilerplate block and before the media contact,
 * producing a wire-ready fullText string with compliance disclosure embedded.
 *
 * @param draft      - PressReleaseDraft from generatePressReleaseDraft()
 * @param authorName - Reviewer's name substituted into the compliance label
 * @returns ComplianceResult with label, HTML comment, and complete fullText
 */
export function injectCompliance(
  draft: PressReleaseDraft,
  authorName: string,
): ComplianceResult {
  // 1. Substitute the actual author name into the label
  const complianceLabel = AI_TRANSPARENCY_LABEL.replace('[Author Name]', authorName)

  // 2. Build the complete wire-ready press release text
  //    Order: headline -> dateline -> lead -> body -> boilerplate -> label -> mediaContact
  //    Sections separated by double newline (blank line between blocks)
  const fullText = [
    draft.headline,
    '',
    draft.dateline,
    '',
    draft.lead,
    '',
    draft.body,
    '',
    draft.boilerplate,
    '',
    complianceLabel,
    '',
    draft.mediaContact,
  ].join('\n')

  return {
    draft,
    complianceLabel,
    complianceHtmlComment: AI_TRANSPARENCY_HTML_COMMENT,
    fullText,
  }
}
