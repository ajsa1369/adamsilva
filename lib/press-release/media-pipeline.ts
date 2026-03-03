// lib/press-release/media-pipeline.ts
// Thin orchestrator wrapping Phase 6 image + video pipelines for press release media.
//
// Key differences from the insights pipeline:
// - Output video directory: public/videos/press-releases/ (not public/videos/insights/)
//   TODO(v2): generateImages writes to public/images/insights/ internally (hardcoded path).
//             Accept the insights/ path for v1 — add outputDir param to generateImages in v2.
// - Output image base URL points to /images/press-releases/ (imagesBaseUrl parameter)
// - Video composition target: 60 seconds (PR-03) — Remotion composition handles duration
// - Topic is synthesized from the press release headline (no AuthorityMapTopic from researcher)
// - Video description is the lead paragraph (60-word summary of headline + lead)

import { generateImages } from '@/lib/insights/image-pipeline'
import { generateVideo } from '@/lib/insights/video-pipeline'
import { SITE_URL } from '@/lib/schemas/organization'
import type { ImagePipelineResult, VideoPipelineResult } from '@/lib/insights/types'
import type { PressReleaseDraft, PressReleaseMediaOptions } from '@/lib/press-release/types'

// -----------------------------------------------------------------------
// PressReleaseMediaResult — return shape from generatePressReleaseMedia
// -----------------------------------------------------------------------
export interface PressReleaseMediaResult {
  images: ImagePipelineResult[]
  video?: VideoPipelineResult  // undefined if options.includeVideo === false
}

// -----------------------------------------------------------------------
// generatePressReleaseMedia — orchestrates image + video pipelines
//
// 1. Builds a synthetic AuthorityMapTopic from draft.headline + draft.lead
//    to satisfy ImagePipelineInput.topic and VideoPipelineInput.topic types.
// 2. Optionally renders Remotion video sidecar (PR-03) to public/videos/press-releases/.
// 3. Generates N PNG images (defaults in options.imageCount) with XMP-embedded JSON-LD.
// 4. Returns { images, video? }.
//
// TODO(v2): generateImages hardcodes output to public/images/insights/ internally.
//           For v1, imagesBaseUrl is set to /images/press-releases/ for the public URL
//           but the local PNG file is still written under public/images/insights/.
//           Add outputDir param to generateImages in v2 to fully separate press-release
//           images from insight images on disk.
// -----------------------------------------------------------------------
export async function generatePressReleaseMedia(
  draft: PressReleaseDraft,
  slug: string,
  authorName: string,
  options: PressReleaseMediaOptions,
): Promise<PressReleaseMediaResult> {
  // Build a synthetic AuthorityMapTopic from draft to satisfy pipeline input types.
  // Press releases don't come from the AuthorityMap researcher, so we synthesize
  // a minimal topic shape that satisfies the required interface fields.
  const syntheticTopic = {
    rank: 1,
    title: draft.headline,
    targetQueries: [draft.headline, draft.lead.slice(0, 80)],
    authorityGapScore: 0,
    recommendedSchemaTypes: ['NewsArticle'],
    faqClusters: [],
    estimatedCitationLift: '0',
  }

  let video: VideoPipelineResult | undefined

  // Step 1: Generate video sidecar if requested (PR-03: 60-second Remotion video)
  if (options.includeVideo) {
    video = await generateVideo({
      topic: syntheticTopic,
      slug,
      postTitle: draft.headline,
      // excerpt: first 240 chars of lead — concise 60-word press release summary
      excerpt: draft.lead.slice(0, 240),
      authorName,
      // Override output directory to press-releases subdirectory (not insights/)
      outputDir: 'public/videos/press-releases',
    })
  }

  // Step 2: Generate images with press-release-specific URL base.
  // stillFramePath: pass Remotion title frame path if video was generated
  // (image 1 = video title frame, subsequent images = brand-navy stubs)
  const images = await generateImages(
    {
      topic: syntheticTopic,
      postUrl: `${SITE_URL}/press-releases/${slug}`,
      postTitle: draft.headline,
      clientName: 'Adam Silva Consulting',
      imageCount: options.imageCount,
      // Public URL base for press-release images (controls contentUrl in ImageObject JSON-LD)
      // TODO(v2): local PNG files still written to public/images/insights/ — see header note
      imagesBaseUrl: `${SITE_URL}/images/press-releases`,
    },
    // Pass still frame so image 1 gets the Remotion title card embedded with XMP metadata
    video?.stillImagePath,
  )

  return { images, video }
}
