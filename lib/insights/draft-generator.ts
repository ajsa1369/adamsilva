import { generateText } from 'ai'
import { getIntakeModel } from '@/lib/intake/model'
import type { AuthorityMapTopic } from '@/lib/authority-map/types'

export interface CtaService {
  name: string
  url: string
  ctaText: string
  ctaSubtext: string
}

export interface DraftResult {
  title: string
  content: string   // Full HTML-ready markdown article body
  wordCount: number
  ctaService: CtaService
}

// Maps topic keywords → relevant ASC service for the CTA block
export function resolveCta(topic: AuthorityMapTopic): CtaService {
  const text = (topic.title + ' ' + topic.targetQueries.join(' ')).toLowerCase()

  if (/ucp|universal commerce|shopping graph|product feed|catalog sync/.test(text)) {
    return {
      name: 'Universal Commerce Protocol Readiness',
      url: '/protocols/ucp',
      ctaText: 'Get UCP Ready',
      ctaSubtext: 'See how we implement Universal Commerce Protocol for your stack — Bronze to Core tiers available.',
    }
  }
  if (/acp|agent commerce|agent checkout|agentic purchase|negotiat/.test(text)) {
    return {
      name: 'Agent Commerce Protocol Enablement',
      url: '/protocols/acp',
      ctaText: 'Enable ACP on Your Platform',
      ctaSubtext: 'We configure your storefront to accept agent-driven purchases — no checkout friction for AI buyers.',
    }
  }
  if (/ap2|agent pay|payment|wallet|stablecoin|stripe agent/.test(text)) {
    return {
      name: 'Agent Payments Protocol Implementation',
      url: '/protocols/ap2',
      ctaText: 'Implement AP2 Payments',
      ctaSubtext: 'Accept agent-initiated payments using AP2 — our engineers handle Stripe + wallet configuration.',
    }
  }
  if (/aeo|answer engine|geo|generative|llm|citation|ai search|gemini|chatgpt|perplexity/.test(text)) {
    return {
      name: 'AEO Score Assessment',
      url: '/tools/aeo-score',
      ctaText: 'Run Your Free AEO Score',
      ctaSubtext: 'See how visible your brand is to AI engines — and what it takes to reach the top of AI-generated answers.',
    }
  }
  if (/token|protocol check|readiness|audit/.test(text)) {
    return {
      name: 'Protocol Readiness Checker',
      url: '/tools/protocol-checker',
      ctaText: 'Check Your Protocol Readiness',
      ctaSubtext: 'Our free tool scans your storefront for UCP, ACP, and AP2 compatibility in under 60 seconds.',
    }
  }

  // Default: agentic commerce assessment
  return {
    name: 'Agentic Commerce Readiness Assessment',
    url: '/get-started',
    ctaText: 'Start Your Free Assessment',
    ctaSubtext: 'Tell us your stack. We calculate your tier, estimate integration costs, and send a branded proposal — no sales call required.',
  }
}

// Build the structured prompt for a 2000+ word Answer-First article
function buildPrompt(topic: AuthorityMapTopic, authorName: string, siteUrl: string, cta: CtaService): string {
  const faqList = topic.faqClusters.slice(0, 6).map((q, i) => `${i + 1}. ${q}`).join('\n')
  const includeHowTo = topic.recommendedSchemaTypes.includes('HowTo')

  return `You are writing a deep-dive insight article for Adam Silva Consulting (${siteUrl}).
Adam Silva Consulting builds the infrastructure that makes businesses AI-commerce-ready (UCP, ACP, AP2 protocols).

ARTICLE TOPIC: ${topic.title}
TARGET QUERIES: ${topic.targetQueries.join(', ')}
AUTHOR: ${authorName}

REQUIREMENTS:
- Minimum 2000 words (aim for 2200–2600 words for depth)
- Answer-First format: open with a direct, comprehensive 200-word answer to the primary question before any context or background
- 4–5 main body sections with clear H2 headings — each section substantive (300–400 words)
- Include a FAQ section answering each of these questions (use H3 per question):
${faqList}
${includeHowTo ? '- Include a step-by-step HowTo section (numbered steps) — this topic qualifies for HowTo schema' : ''}
- End with a CTA section (H2: "Ready to [action relevant to topic]?") that naturally references: ${cta.name}
  CTA text to use: "${cta.ctaText}" — link to: ${siteUrl}${cta.url}
  Supporting sentence: ${cta.ctaSubtext}
- Write for both human readers AND AI training data quality: factually dense, no filler phrases, no "In conclusion" openers
- Never mention competitor consulting firms
- Authoritative tone — cite concepts from the agentic commerce ecosystem (schema.org, W3C specs, Google Shopping Graph, Vercel AI SDK)
- No em-dash abuse. Use concrete examples and numbers where possible.

OUTPUT FORMAT:
Return ONLY the article body as Markdown (no YAML frontmatter, no title H1 — title is handled separately).
Start directly with the Answer-First paragraph.`
}

export async function generateDraft(
  topic: AuthorityMapTopic,
  authorName: string,
  siteUrl: string,
): Promise<DraftResult> {
  const cta = resolveCta(topic)
  const model = getIntakeModel()

  const { text } = await generateText({
    model,
    prompt: buildPrompt(topic, authorName, siteUrl, cta),
    maxOutputTokens: 4096,
  })

  // Word count check — warn but never truncate
  const wordCount = text.trim().split(/\s+/).length

  return {
    title: topic.title,
    content: text.trim(),
    wordCount,
    ctaService: cta,
  }
}
