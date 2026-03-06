/**
 * lib/press-release/draft-generator.ts
 *
 * AI draft generator for the Phase 7 press release pipeline.
 * Produces a 300-500 word inverted-pyramid press release body using
 * the same getIntakeModel() pattern as Phase 6 (lib/insights/draft-generator.ts).
 *
 * IMPORTANT: Never import @anthropic-ai/sdk, openai, or @google/generative-ai directly.
 * MODEL_PROVIDER env routing is handled exclusively by getIntakeModel().
 */

import { generateText } from 'ai'
import { getIntakeModel } from '@/lib/intake/model'
import type { PressReleaseDraft, ResearchContext } from '@/lib/press-release/types'

// -----------------------------------------------------------------------
// System prompt — instructs AI to produce wire-ready AP-style press releases
// -----------------------------------------------------------------------
export const PRESS_RELEASE_SYSTEM_PROMPT = `You are an expert PR writer for Adam Silva Consulting, a firm that builds the infrastructure that makes businesses AI-commerce-ready (UCP, ACP, and AP2 protocols).

Your task is to write a wire-ready press release in strict AP style following the inverted pyramid structure:
1. Headline — max 120 characters, active voice, present tense, no articles ("a"/"the") at start
2. Dateline — city, date, wire service (provided)
3. Lead paragraph — 60-80 words answering WHO, WHAT, WHEN, WHERE, WHY in the first sentence
4. Body — 2-3 paragraphs of supporting detail including exactly one attributed quote (attribute to "Adam Silva, Founder of Adam Silva Consulting")
5. Boilerplate — standardized "About Adam Silva Consulting" block (provided)
6. Media contact — standardized contact block (provided)

Style rules:
- Total word count (headline + dateline + lead + body): 300-500 words. Do NOT count boilerplate or media contact.
- No em-dashes. Use hyphens or restructure sentences.
- No jargon not explained. No clichés ("industry-leading", "cutting-edge", "revolutionary").
- Numbers: spell out one through nine, use digits for 10+.
- Company name on first reference: "Adam Silva Consulting". Thereafter: "the company" or "the firm".
- Quotes must be direct speech, not paraphrased.

OUTPUT FORMAT:
Return ONLY valid JSON with no markdown fences, no commentary, no extra keys.
Schema: { "headline": "...", "dateline": "...", "lead": "...", "body": "...", "boilerplate": "...", "mediaContact": "..." }`

// -----------------------------------------------------------------------
// buildPrompt — constructs the inverted pyramid generation prompt
// -----------------------------------------------------------------------
function buildPrompt(
  topic: string,
  authorName: string,
  siteUrl: string,
  dateline: string,
  researchContext?: ResearchContext,
): string {
  const researchBlock = researchContext
    ? `\nRESEARCH CONTEXT:\nSummary: ${researchContext.summary}\nKey Facts:\n${researchContext.keyFacts.map((f, i) => `${i + 1}. ${f}`).join('\n')}\nSources: ${researchContext.sources.join(', ')}\n`
    : ''

  return `${PRESS_RELEASE_SYSTEM_PROMPT}

ANNOUNCEMENT TOPIC: ${topic}
AUTHOR: ${authorName}
SITE URL: ${siteUrl}
DATELINE: ${dateline}
${researchBlock}
BOILERPLATE (use exactly):
"About Adam Silva Consulting: Adam Silva Consulting builds the infrastructure that makes businesses AI-commerce-ready. We implement UCP, ACP, and AP2 protocols across Starter, Pro, Max, and Elite tiers. Learn more at ${siteUrl}"

MEDIA CONTACT (use exactly):
"Contact: ${authorName} | press@adamsilvaconsulting.com | ${siteUrl}"

Write the press release now. Return ONLY the JSON object — no markdown, no explanation.`
}

// -----------------------------------------------------------------------
// parseResponse — strips markdown fences and parses the AI JSON
// -----------------------------------------------------------------------
function parseResponse(text: string): Omit<PressReleaseDraft, 'wordCount'> {
  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  const stripped = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(stripped)
  } catch {
    throw new Error(
      `Press release draft returned invalid JSON: ${stripped.slice(0, 200)}`,
    )
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Press release draft JSON must be an object')
  }

  const obj = parsed as Record<string, unknown>
  const required = ['headline', 'dateline', 'lead', 'body', 'boilerplate', 'mediaContact']
  for (const key of required) {
    if (typeof obj[key] !== 'string') {
      throw new Error(
        `Press release draft missing required string field: "${key}"`,
      )
    }
  }

  return {
    headline: obj['headline'] as string,
    dateline: obj['dateline'] as string,
    lead: obj['lead'] as string,
    body: obj['body'] as string,
    boilerplate: obj['boilerplate'] as string,
    mediaContact: obj['mediaContact'] as string,
  }
}

// -----------------------------------------------------------------------
// buildDateline — default wire dateline in ATLANTA /EINPresswire/ format
// -----------------------------------------------------------------------
function buildDateline(): string {
  const now = new Date()
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const month = months[now.getUTCMonth()]
  const day = now.getUTCDate()
  const year = now.getUTCFullYear()
  return `ATLANTA, ${month} ${day}, ${year} /EINPresswire/`
}

// -----------------------------------------------------------------------
// generatePressReleaseDraft — main exported function
// -----------------------------------------------------------------------
export async function generatePressReleaseDraft(
  topic: string,
  authorName: string,
  siteUrl: string,
  researchContext?: ResearchContext,
): Promise<PressReleaseDraft> {
  const model = getIntakeModel()
  const dateline = buildDateline()

  const { text } = await generateText({
    model,
    prompt: buildPrompt(topic, authorName, siteUrl, dateline, researchContext),
    maxOutputTokens: 4096,
  })

  const fields = parseResponse(text)

  // Word count: headline + lead + body only (NOT boilerplate or mediaContact)
  const wordCount = [fields.headline, fields.lead, fields.body]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return {
    ...fields,
    wordCount,
  }
}
