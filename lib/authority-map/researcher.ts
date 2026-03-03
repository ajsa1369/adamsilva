/**
 * lib/authority-map/researcher.ts
 *
 * Dual-provider research pipeline for topical authority mapping.
 * Primary: NotebookLM MCP (if NOTEBOOKLM_MCP_URL env var is set)
 * Fallback: Gemini + Google Search grounding
 */

import { generateText, stepCountIs } from 'ai'
import { experimental_createMCPClient } from '@ai-sdk/mcp'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import type { AuthorityMapTopic, AuthorityMapResult, ClientConfig } from '@/lib/authority-map/types'
import { getIntakeModel } from '@/lib/intake/model'

export const RESEARCHER_SYSTEM_PROMPT = `You are a content strategist and SEO researcher. Your job is to identify the highest-opportunity content topics for a business to dominate AI-generated search results (ChatGPT, Gemini, Perplexity citations).

Use Google Search to:
1. Find the top 5 competitor sites in the given industry/service area and analyze their content
2. Search for common questions people ask about the industry in the service area
3. Look for what AI tools (ChatGPT, Gemini, Perplexity) answer when asked about services in this industry
4. Identify gaps: high-authority topics that competitors are thin on or missing

Return ONLY a valid JSON array of 5-10 topics. No prose, no markdown code fences, no explanation. Raw JSON array only.

Each topic must use EXACTLY this structure:
[
  {
    "rank": 1,
    "title": "...",
    "targetQueries": ["...", "..."],
    "authorityGapScore": 85,
    "recommendedSchemaTypes": ["Article", "FAQPage"],
    "faqClusters": ["What is...?", "How much does...?"],
    "estimatedCitationLift": "4-6 AI citations/month"
  }
]

Rank topics by authorityGapScore descending (highest gap = rank 1).`

export const NOTEBOOKLM_SYSTEM_PROMPT = `You are a content strategist and SEO researcher. Your job is to identify the highest-opportunity content topics for a business to dominate AI-generated search results (ChatGPT, Gemini, Perplexity citations).

Use Google Search to:
1. Find the top 5 competitor sites in the given industry/service area and analyze their content
2. Search for common questions people ask about the industry in the service area
3. Look for what AI tools (ChatGPT, Gemini, Perplexity) answer when asked about services in this industry
4. Identify gaps: high-authority topics that competitors are thin on or missing

Return ONLY a valid JSON array of 5-10 topics. No prose, no markdown code fences, no explanation. Raw JSON array only.

Each topic must use EXACTLY this structure:
[
  {
    "rank": 1,
    "title": "...",
    "targetQueries": ["...", "..."],
    "authorityGapScore": 85,
    "recommendedSchemaTypes": ["Article", "FAQPage"],
    "faqClusters": ["What is...?", "How much does...?"],
    "estimatedCitationLift": "4-6 AI citations/month"
  }
]

Rank topics by authorityGapScore descending (highest gap = rank 1).`

function buildPrompt(config: ClientConfig): string {
  const basePrompt = `Research topical authority gaps for a ${config.industry} business in ${config.serviceArea}.

Find the highest-opportunity content topics based on:
- Top competitor content in this industry/area
- Common questions asked about ${config.industry} in ${config.serviceArea}
- What AI tools (ChatGPT, Gemini, Perplexity) cite when asked about ${config.industry} services
- Gaps where competitors have thin or missing coverage`

  if (config.existingContentUrls && config.existingContentUrls.length > 0) {
    return `${basePrompt}

Client's existing content (already covered — do NOT recommend):
${config.existingContentUrls.join('\n')}

Return ONLY a valid JSON array of 5-10 ranked topics in the schema provided.`
  }

  return `${basePrompt}

Return ONLY a valid JSON array of 5-10 ranked topics in the schema provided.`
}

function parseTopicsFromResponse(text: string): AuthorityMapTopic[] {
  const cleaned = text.replace(/^```json\n?|^```\n?|```$/gm, '').trim()
  try {
    return JSON.parse(cleaned) as AuthorityMapTopic[]
  } catch {
    throw new Error(`Authority map research returned invalid JSON. Raw response: ${text.slice(0, 200)}`)
  }
}

async function generateWithGemini(config: ClientConfig): Promise<AuthorityMapResult> {
  const google = createGoogleGenerativeAI()
  const { text } = await generateText({
    model: google('gemini-2.0-flash'),
    tools: { google_search: google.tools.googleSearch({}) },
    stopWhen: stepCountIs(10),
    system: RESEARCHER_SYSTEM_PROMPT,
    prompt: buildPrompt(config),
  })
  const topics = parseTopicsFromResponse(text)
  const now = new Date()
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  return { clientId: config.clientId, month, topics }
}

async function generateWithNotebookLM(config: ClientConfig): Promise<AuthorityMapResult> {
  const mcpClient = await experimental_createMCPClient({
    transport: {
      type: 'sse',
      url: process.env.NOTEBOOKLM_MCP_URL!,
    },
  })
  try {
    const tools = await mcpClient.tools()
    const { text } = await generateText({
      model: getIntakeModel(),
      tools,
      stopWhen: stepCountIs(15),
      system: NOTEBOOKLM_SYSTEM_PROMPT,
      prompt: buildPrompt(config),
    })
    const topics = parseTopicsFromResponse(text)
    const now = new Date()
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    return { clientId: config.clientId, month, topics }
  } finally {
    await mcpClient.close()
  }
}

export async function generateAuthorityMap(config: ClientConfig): Promise<AuthorityMapResult> {
  if (process.env.NOTEBOOKLM_MCP_URL) {
    return await generateWithNotebookLM(config)   // primary
  }
  return await generateWithGemini(config)         // fallback
}
