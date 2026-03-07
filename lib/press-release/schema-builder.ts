// lib/press-release/schema-builder.ts
// Builds the 6-node JSON-LD @graph for a press release page.
//
// Nodes:
// 1. NewsArticle — canonical article node with speakable, about, keywords for LLM injection
// 2. Organization — imported directly from lib/schemas/organization (never re-declared)
// 3. ImageObject[] — one per input.images (description + caption for LLMs without vision)
// 4. VideoObject — 60-second sidecar (only if input.video is defined)
// 5. FAQPage — 3 baseline Q&A entries for Google Gemini AI Overviews indexing
// 6. BreadcrumbList — standard 3-level breadcrumb
//
// PR-02: NewsArticle schema at origin (isAccessibleForFree: true, archivedAt after wire)
// PR-03: VideoObject.duration is always "PT60S" regardless of video.duration stub value

import type { PressReleaseSchemaInput } from '@/lib/press-release/types'
import { SITE_URL, ORG_ID, organizationSchema } from '@/lib/schemas/organization'

// Format a publishedAt ISO 8601 string as "MMMM d, yyyy" (e.g. "March 2, 2026")
function formatPublishedAt(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * buildPressReleaseSchema — returns a 6-node @graph array for a press release page.
 *
 * Always includes: NewsArticle, Organization, FAQPage, BreadcrumbList.
 * Spreads ImageObject nodes (one per image in input.images).
 * Adds VideoObject only if input.video is defined.
 *
 * Duration of VideoObject is always "PT60S" (PR-03 spec) — never uses video.duration
 * from the pipeline, which may be shorter for stub renders.
 *
 * FAQPage is always included (3 baseline Q&As) for Google Gemini AI Overviews indexing.
 * NewsArticle.speakable tells Google Assistant, voice AI, and LLMs which sections to read.
 */
export function buildPressReleaseSchema(input: PressReleaseSchemaInput): object[] {
  const { pressReleaseUrl, headline, authorName, publishedAt, images, video, wireResultUrl, body } = input

  // Derive topic from headline (press releases have no AuthorityMapTopic)
  const topic = headline.replace(/\s+/g, ' ').trim()

  // Body excerpt for description + FAQPage answers
  const bodyExcerpt200 = body ? body.slice(0, 200) : `Press release: ${headline}. Published by Adam Silva Consulting.`
  const bodyExcerpt300 = body ? body.slice(0, 300) : `Press release: ${headline}. Published by Adam Silva Consulting — Global Infrastructure for Agentic Commerce.`

  const schemas: object[] = []

  // -----------------------------------------------------------------------
  // 1. NewsArticle — primary article node
  // -----------------------------------------------------------------------
  const newsArticle: Record<string, unknown> = {
    '@type': 'NewsArticle',
    '@id': `${pressReleaseUrl}#article`,
    headline,
    name: headline,
    url: pressReleaseUrl,
    description: bodyExcerpt200,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      '@id': `${SITE_URL}/about#person`,
    },
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
    keywords: `${topic} press release, agentic commerce, Adam Silva Consulting`,
    about: {
      '@type': 'Thing',
      name: topic,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1.pr-headline', '.pr-lead', '.pr-body'],
    },
  }

  // image reference — first ImageObject only (referenced by @id)
  if (images.length > 0) {
    newsArticle.image = [{ '@id': `${images[0].contentUrl}#img` }]
  }

  // video reference — only if video present
  if (video) {
    newsArticle.video = { '@id': `${pressReleaseUrl}#video` }
  }

  // archivedAt — only after wire submission (wireResultUrl populated post-distribution)
  if (wireResultUrl) {
    newsArticle.archivedAt = wireResultUrl
  }

  schemas.push(newsArticle)

  // -----------------------------------------------------------------------
  // 2. Organization — import directly; never re-declare fields inline
  // -----------------------------------------------------------------------
  schemas.push(organizationSchema)

  // -----------------------------------------------------------------------
  // 3. ImageObject[] — one per image; description + caption for LLM accessibility
  // -----------------------------------------------------------------------
  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    schemas.push({
      '@type': 'ImageObject',
      '@id': `${img.contentUrl}#img`,
      url: img.contentUrl,
      contentUrl: img.contentUrl,
      name: `Press Release: ${headline} — Image ${i + 1}`,
      // description + caption let LLMs without vision access understand image content
      description: `Press release image for: ${headline}. Published by Adam Silva Consulting.`,
      caption: headline,
      encodingFormat: 'image/png',
      width: 1200,
      height: 630,
      embeddedTextCaption: headline,
    })
  }

  // -----------------------------------------------------------------------
  // 4. VideoObject — only if input.video is defined
  //    Duration is ALWAYS "PT60S" (PR-03) — never video.duration (may be stub value)
  //    transcript field includes full text for LLM consumption without playback
  // -----------------------------------------------------------------------
  if (video) {
    schemas.push({
      '@type': 'VideoObject',
      '@id': `${pressReleaseUrl}#video`,
      name: `${headline} — Press Release Video`,
      description: `60-second press release summary video for: ${headline}`,
      contentUrl: video.videoPath,
      thumbnailUrl: video.stillImageUrl,
      duration: 'PT60S', // PR-03: always 60 seconds, never use video.duration (stub)
      uploadDate: publishedAt.includes('T') ? publishedAt : `${publishedAt}T00:00:00-05:00`,
      hasPart: { '@id': `${video.captionTrack.captionUrl}#caption` },
      transcript: video.transcript, // full text for LLM consumption without vision/playback
    })
  }

  // -----------------------------------------------------------------------
  // 5. FAQPage — always included; 3 baseline Q&As for Google Gemini AI Overviews
  // -----------------------------------------------------------------------
  schemas.push({
    '@type': 'FAQPage',
    '@id': `${pressReleaseUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is this press release about?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: bodyExcerpt300,
        },
      },
      {
        '@type': 'Question',
        name: 'Who published this press release?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `This press release was published by Adam Silva Consulting (${SITE_URL}), Global Infrastructure for Agentic Commerce.`,
        },
      },
      {
        '@type': 'Question',
        name: 'When was this press release published?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: formatPublishedAt(publishedAt),
        },
      },
    ],
  })

  // -----------------------------------------------------------------------
  // 6. BreadcrumbList — standard 3-level: Home > Press Releases > {headline}
  // -----------------------------------------------------------------------
  schemas.push({
    '@type': 'BreadcrumbList',
    '@id': `${pressReleaseUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Press Releases',
        item: `${SITE_URL}/press-releases`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: headline,
        item: pressReleaseUrl,
      },
    ],
  })

  return schemas
}
