import type { AuthorityMapTopic } from '@/lib/authority-map/types'

// Peer paper citation — minimum 3 per post, sourced from authoritative papers (not competitors)
export interface Citation {
  title: string        // Full paper/doc title
  url: string          // Canonical URL (W3C, arXiv, Google, schema.org, etc.)
  publisher?: string   // e.g. "Google", "W3C", "arXiv"
  year?: number        // Publication year
}

// Input to image pipeline
export interface ImagePipelineInput {
  topic: AuthorityMapTopic
  postUrl: string          // canonical post URL for ImageObject @id and about
  postTitle: string
  clientName: string       // e.g. "Adam Silva Consulting" — used in author field
  imageCount: number       // 3–8
  imagesBaseUrl: string    // e.g. https://www.adamsilvaconsulting.com/images/insights
}

// One image result
export interface ImagePipelineResult {
  filename: string              // e.g. "agentic-commerce-protocol-overview-header-1.png"
  contentUrl: string            // imagesBaseUrl + "/" + filename
  localPath: string             // absolute local file path (PNG written to disk with embedded XMP)
  jsonLd: object                // ImageObject schema (from buildImageObjectSchema)
  hasEmbeddedMetadata: boolean  // true = JSON-LD written into PNG XMP metadata block
  isVideoStill: boolean         // true = this PNG is the Remotion title frame (image 1 only)
}

// Input to video pipeline
export interface VideoPipelineInput {
  topic: AuthorityMapTopic
  slug: string
  postTitle: string
  excerpt: string          // 60-word summary for VideoObject description
  authorName: string
  category?: string
  outputDir?: string       // defaults to "public/videos/insights" (served at /videos/insights/)
}

// WebVTT closed caption track (accessibility + AI metadata)
export interface CaptionTrack {
  captionPath: string   // local path: public/captions/insights/[slug].vtt
  captionUrl: string    // public URL: https://domain/captions/insights/[slug].vtt
  language: string      // e.g. "en-US"
  label: string         // e.g. "English"
}

// Video pipeline result
export interface VideoPipelineResult {
  videoPath: string        // e.g. "public/videos/insights/[slug].mp4" (relative to project root)
  thumbnailPath: string    // e.g. "public/videos/insights/[slug]-thumb.jpg"
  stillImagePath: string   // Remotion-rendered PNG title frame: public/images/insights/[slug]-title.png
  stillImageUrl: string    // public URL for the title card (used as Image 1 + video thumbnail)
  transcript: string       // full verbatim voiceover text (all words, used for CC + AI metadata)
  captionTrack: CaptionTrack  // WebVTT CC file generated from transcript
  duration: string         // ISO 8601 duration e.g. "PT28S"
  jsonLd: object           // VideoObject schema (includes hasPart caption track, full transcript)
}

// Input to schema assembler
export interface SchemaAssemblerInput {
  topic: AuthorityMapTopic
  postUrl: string
  postTitle: string
  slug: string
  excerpt: string
  authorName: string
  publishedAt: string      // ISO 8601 date string
  images: ImagePipelineResult[]   // images[0] is the Remotion still frame / video thumbnail
  video: VideoPipelineResult
  citations: Citation[]    // minimum 3 peer papers — required for factual accuracy
  captionTrack: CaptionTrack  // WebVTT CC — for accessibility + VideoObject hasPart
  category?: string
}

// Full insight post record (for Supabase + Strapi)
export interface InsightPost {
  clientId: string
  slug: string
  title: string
  content: string          // placeholder text in v1
  excerpt: string
  authorName: string
  category: string
  publishedAt: string
  schemaJson: object[]     // assembled JSON-LD array (includes citation[] on Article node)
  images: ImagePipelineResult[]
  citations: Citation[]    // minimum 3 peer paper sources
  authorityMapId?: string  // UUID of source authority_maps row
}

// Per-client config for cron
export interface BlogClientConfig {
  clientId: string
  authorName: string
  approvalEmail: string
}
