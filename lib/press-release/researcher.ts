/**
 * lib/press-release/researcher.ts
 *
 * Press release topic research pipeline.
 * Primary: NotebookLM MCP (if NOTEBOOKLM_MCP_URL env var is set)
 * Fallback: getIntakeModel() + generateText() when NOTEBOOKLM_MCP_URL not set
 *
 * Mirrors the Phase 5 authority-map researcher pattern.
 */

import { generateText, stepCountIs } from 'ai'
import { experimental_createMCPClient } from '@ai-sdk/mcp'
import { getIntakeModel } from '@/lib/intake/model'
import type { ResearchContext } from '@/lib/press-release/types'

function buildResearchPrompt(topic: string): string {
  return `Research and summarize key facts about this press release topic. Return ONLY valid JSON with no markdown fences, no prose. Raw JSON only.

JSON structure:
{
  "summary": "2-3 sentence summary of the topic and its news significance",
  "keyFacts": ["fact 1", "fact 2", "fact 3"],
  "sources": ["https://source1.com", "https://source2.com"]
}

Topic: ${topic}`
}

function parseResearchContext(text: string, topic: string): ResearchContext {
  const cleaned = text.replace(/^```json\n?|^```\n?|```$/gm, '').trim()
  try {
    return JSON.parse(cleaned) as ResearchContext
  } catch {
    // Graceful degradation — never throw from researcher
    return { summary: topic, keyFacts: [], sources: [] }
  }
}

async function researchWithNotebookLM(topic: string): Promise<ResearchContext> {
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
      stopWhen: stepCountIs(10),
      prompt: buildResearchPrompt(topic),
    })
    return parseResearchContext(text, topic)
  } finally {
    await mcpClient.close()
  }
}

async function researchWithAI(topic: string): Promise<ResearchContext> {
  const { text } = await generateText({
    model: getIntakeModel(),
    prompt: buildResearchPrompt(topic),
  })
  return parseResearchContext(text, topic)
}

/**
 * researchPressReleaseTopic — Gather context for a press release topic.
 *
 * Primary: NotebookLM MCP via experimental_createMCPClient (SSE) when NOTEBOOKLM_MCP_URL is set.
 * Fallback: getIntakeModel() + generateText() — used when NOTEBOOKLM_MCP_URL is not set or MCP fails.
 * Graceful degradation: any error returns { summary: topic, keyFacts: [], sources: [] }
 */
export async function researchPressReleaseTopic(topic: string): Promise<ResearchContext> {
  if (process.env.NOTEBOOKLM_MCP_URL) {
    try {
      return await researchWithNotebookLM(topic)
    } catch {
      // MCP failure is non-fatal — fall back to AI-only path
    }
  }
  try {
    return await researchWithAI(topic)
  } catch {
    // Complete fallback — never throw from researcher
    return { summary: topic, keyFacts: [], sources: [] }
  }
}
