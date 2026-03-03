// lib/press-release/types.ts
// All TypeScript contracts for the Phase 7 press release pipeline.
// No implementation — pure type definitions.
// Consumed by: draft-generator, compliance, schema-builder, media-pipeline,
//              researcher, distributor, wire adapters, and the API route.

import type {
  ImagePipelineResult,
  VideoPipelineResult,
} from '@/lib/insights/types'

// Re-export Phase 6 types for downstream consumers that only import from this module
export type { ImagePipelineResult, VideoPipelineResult }

// -----------------------------------------------------------------------
// ResearchContext — output from NotebookLM MCP or AI fallback researcher
// -----------------------------------------------------------------------
export interface ResearchContext {
  summary: string    // AI-generated topic summary for draft context
  keyFacts: string[] // Bullet-point facts gathered during research
  sources: string[]  // URLs or citations gathered (best-effort)
}

// -----------------------------------------------------------------------
// PressReleaseDraft — output from draft-generator.ts
// -----------------------------------------------------------------------
export interface PressReleaseDraft {
  headline: string     // max 120 chars — AP style, present tense
  dateline: string     // e.g. "ATLANTA, March 2, 2026 /PRNewswire/"
  lead: string         // who/what/when/where/why — first paragraph (60-80 words)
  body: string         // 2-3 paragraphs of supporting detail + quotes
  boilerplate: string  // About Adam Silva Consulting standard block
  mediaContact: string // "Contact: Adam Silva | press@adamsilvaconsulting.com"
  wordCount: number
}

// -----------------------------------------------------------------------
// ComplianceResult — draft + injected AI label (output from compliance.ts)
// -----------------------------------------------------------------------
export interface ComplianceResult {
  draft: PressReleaseDraft
  complianceLabel: string       // "This press release was drafted with AI assistance. Content reviewed and approved by [Author Name]."
  complianceHtmlComment: string // <!-- AI-GENERATED: AB2013/SB942 --> for HTML rendering
  fullText: string              // boilerplate with AI label injected at end
}

// -----------------------------------------------------------------------
// PressReleaseMediaOptions — per-request configurable media options
// -----------------------------------------------------------------------
export interface PressReleaseMediaOptions {
  imageCount: 1 | 2 | 3 | 4 | 5 // default 2
  includeVideo: boolean           // default true
}

// -----------------------------------------------------------------------
// PressReleaseSchemaInput — input to schema-builder.ts
// -----------------------------------------------------------------------
export interface PressReleaseSchemaInput {
  headline: string
  slug: string
  pressReleaseUrl: string // canonical URL on adamsilvaconsulting.com
  authorName: string
  publishedAt: string     // ISO 8601
  body?: string           // full press release text — used for description + FAQPage answer
  images: ImagePipelineResult[]
  video?: VideoPipelineResult
  wireResultUrl?: string  // archivedAt URL after wire submission
}

// -----------------------------------------------------------------------
// WireSubmitResult — result from a single wire adapter
// -----------------------------------------------------------------------
export interface WireSubmitResult {
  service: 'businesswire' | 'prnewswire' | 'einpresswire' | 'accesswire'
  status: 'submitted' | 'skipped' | 'error'
  url?: string   // wire service distribution URL (if returned by API)
  error?: string // error message if status === 'error'
}

// -----------------------------------------------------------------------
// WireAdapter — interface all 4 adapters implement
// -----------------------------------------------------------------------
export interface WireAdapter {
  name: WireSubmitResult['service']
  submit(draft: PressReleaseDraft, mediaFiles: string[]): Promise<WireSubmitResult>
}

// -----------------------------------------------------------------------
// PressReleasePost — full press release record for Supabase + API response
// -----------------------------------------------------------------------
export interface PressReleasePost {
  clientId: string
  slug: string
  headline: string
  body: string                    // full press release text (compliant version)
  complianceLabel: string
  schemaJson: object[]            // 5-node @graph array from schema-builder
  mediaFiles: ImagePipelineResult[]
  wireResults: WireSubmitResult[]
  researchContext?: ResearchContext
}

// -----------------------------------------------------------------------
// PressReleaseClientConfig — per-client config (mirrors BlogClientConfig from Phase 6)
// -----------------------------------------------------------------------
export interface PressReleaseClientConfig {
  clientId: string
  authorName: string
  approvalEmail: string
}
