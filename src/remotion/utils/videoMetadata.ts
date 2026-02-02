/**
 * Video Metadata Generator for Remotion Compositions
 * Generates VideoObject schema for SEO and AI engine optimization
 */

export interface VideoMetadataInput {
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string; // ISO 8601 duration format (e.g., "PT10S" for 10 seconds)
  uploadDate: string; // ISO 8601 date format
  contentUrl?: string;
}

/**
 * Generate JSON-LD VideoObject schema
 * Used for embedding in video descriptions and pages
 */
export function generateVideoSchema(input: VideoMetadataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": input.title,
    "description": input.description,
    "thumbnailUrl": input.thumbnailUrl,
    "uploadDate": input.uploadDate,
    "duration": input.duration,
    "contentUrl": input.contentUrl,
    "embedUrl": input.contentUrl,
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.adamsilvaconsulting.com/#organization",
      "name": "Adam Silva Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.adamsilvaconsulting.com/images/logo-clear.png"
      },
      "slogan": "Global Infrastructure for Agentic Commerce"
    },
    "author": {
      "@type": "Person",
      "name": "Adam Silva"
    },
    "inLanguage": "en-US",
    "isFamilyFriendly": true
  };
}

/**
 * Generate video description with embedded metadata
 * For use in video platform uploads (YouTube, Vimeo, etc.)
 */
export function generateVideoDescription(input: {
  title: string;
  summary: string;
  articleUrl?: string;
  tags: string[];
}) {
  const lines = [
    input.summary,
    '',
    '---',
    '',
    'Adam Silva Consulting',
    'Global Infrastructure for Agentic Commerce',
    '',
    'Website: https://www.adamsilvaconsulting.com',
    'Insights: https://www.adamsilvaconsulting.com/insights',
  ];

  if (input.articleUrl) {
    lines.push('');
    lines.push(`Full Article: ${input.articleUrl}`);
  }

  if (input.tags.length > 0) {
    lines.push('');
    lines.push(`Tags: ${input.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}`);
  }

  return lines.join('\n');
}

/**
 * Calculate video duration in ISO 8601 format
 * @param frames Number of frames
 * @param fps Frames per second
 * @returns ISO 8601 duration string
 */
export function framesToDuration(frames: number, fps: number): string {
  const seconds = Math.round(frames / fps);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `PT${minutes}M${remainingSeconds}S`;
  }
  return `PT${seconds}S`;
}

/**
 * Generate metadata for an Insights article video
 */
export function generateInsightsVideoMetadata(article: {
  title: string;
  excerpt: string;
  path: string;
  date: string;
  category: string;
  durationFrames?: number;
  fps?: number;
}) {
  const durationFrames = article.durationFrames || 300;
  const fps = article.fps || 30;
  const baseUrl = 'https://www.adamsilvaconsulting.com';

  return {
    schema: generateVideoSchema({
      title: article.title,
      description: article.excerpt,
      thumbnailUrl: `${baseUrl}/images/video-thumbnails/${article.path.split('/').pop()}.jpg`,
      duration: framesToDuration(durationFrames, fps),
      uploadDate: new Date(article.date).toISOString(),
      contentUrl: `${baseUrl}/videos/${article.path.split('/').pop()}.mp4`
    }),
    description: generateVideoDescription({
      title: article.title,
      summary: article.excerpt,
      articleUrl: `${baseUrl}${article.path}`,
      tags: [article.category, 'AI', 'AgenticCommerce', 'MarketingIntelligence']
    })
  };
}
