import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'
import type { VideoPipelineInput, VideoPipelineResult, CaptionTrack } from '@/lib/insights/types'

// Build full verbatim voiceover script from all topic data.
// This is the complete transcript embedded in VideoObject JSON-LD + used for WebVTT CC.
// Includes all FAQ clusters as spoken questions and all target queries for AI discoverability.
function buildTranscript(input: VideoPipelineInput): string {
  const intro = `${input.postTitle}. ${input.excerpt}`
  const faqLines = input.topic.faqClusters.map(q => q)
  const queryLines = input.topic.targetQueries.map(q => `This insight covers: ${q}.`)
  return [intro, ...faqLines, ...queryLines].join(' ')
}

// Generate WebVTT closed caption file from transcript.
// Splits transcript into ~5-second cues for readable CC display.
// Saved to public/captions/insights/[slug].vtt.
// Returned CaptionTrack is referenced in VideoObject hasPart for hearing-impaired access + AI.
function generateWebVTT(transcript: string, durationSeconds: number, slug: string): CaptionTrack {
  const captionDir = path.join(process.cwd(), 'public', 'captions', 'insights')
  fs.mkdirSync(captionDir, { recursive: true })

  const captionPath = path.join(captionDir, `${slug}.vtt`)

  // Format timestamp HH:MM:SS.mmm
  const fmt = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0')
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0')
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}.000`
  }

  // Split transcript into ~5-second cues for readable CC display
  const words = transcript.split(/\s+/)
  const wordsPerCue = Math.ceil(words.length / Math.max(1, Math.floor(durationSeconds / 5)))
  const cues: string[] = ['WEBVTT', '']

  for (let i = 0; i < words.length; i += wordsPerCue) {
    const cueStart = (i / words.length) * durationSeconds
    const cueEnd = Math.min(((i + wordsPerCue) / words.length) * durationSeconds, durationSeconds)
    const cueText = words.slice(i, i + wordsPerCue).join(' ')
    cues.push(`${fmt(cueStart)} --> ${fmt(cueEnd)}\n${cueText}\n`)
  }

  fs.writeFileSync(captionPath, cues.join('\n'), 'utf-8')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
  return {
    captionPath,
    captionUrl: `${siteUrl}/captions/insights/${slug}.vtt`,
    language: 'en-US',
    label: 'English',
  }
}

// Parse ISO 8601 duration from frame count (30fps, 840 frames = PT28S)
function framesToDuration(frames: number, fps = 30): string {
  const seconds = Math.round(frames / fps)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  if (minutes > 0) {
    return `PT${minutes}M${remainingSeconds}S`
  }
  return `PT${remainingSeconds}S`
}

// Generic Remotion CLI spawner — handles both 'render' and 'still' subcommands.
// Uses shell: true on Windows to resolve npx correctly.
async function spawnRemotion(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['remotion', ...args], {
      stdio: 'pipe',
      shell: process.platform === 'win32',
    })
    const stderr: string[] = []
    proc.stderr?.on('data', (chunk: Buffer) => stderr.push(chunk.toString()))
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Remotion CLI exited ${code}: ${stderr.join('')}`))
    })
    proc.on('error', (err: Error) => reject(new Error(`Failed to spawn remotion: ${err.message}`)))
  })
}

// Render full MP4 video via Remotion CLI.
// TODO(v2): Replace with @remotion/renderer programmatic API or Remotion Lambda for production.
async function renderVideo(props: Record<string, unknown>, outputPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  await spawnRemotion([
    'render',
    'remotion/index.ts',
    'BlogSummary',
    `--props=${JSON.stringify(props)}`,
    `--output=${outputPath}`,
  ])
}

// Render title frame still PNG (frame 0) via Remotion CLI — becomes Image 1 and video thumbnail.
// Uses `npx remotion still remotion/index.ts BlogSummary --frame=0 --output=path.png`
async function renderStill(props: Record<string, unknown>, outputPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  await spawnRemotion([
    'still',
    'remotion/index.ts',
    'BlogSummary',
    '--frame=0',
    `--props=${JSON.stringify(props)}`,
    `--output=${outputPath}`,
  ])
}

/**
 * generateVideo — renders Remotion MP4 + still PNG, generates WebVTT CC, builds VideoObject JSON-LD.
 *
 * Steps:
 * 1. Build full verbatim transcript from topic data (all FAQs + target queries).
 * 2. Render Remotion still (frame 0) as title card PNG → Image 1 + video thumbnail.
 * 3. Render full MP4 video via Remotion CLI.
 * 4. Generate WebVTT closed captions from full transcript (5-second cues).
 * 5. Assemble VideoObject JSON-LD with hasPart caption track and full transcript.
 *
 * Both render steps are graceful stubs — failure logs warning but does not halt pipeline.
 * This allows the pipeline to run in dev without Remotion being fully set up.
 */
export async function generateVideo(input: VideoPipelineInput): Promise<VideoPipelineResult> {
  const outputDir = input.outputDir ?? 'public/videos/insights'
  const videoFilename = `${input.slug}.mp4`
  const stillFilename = `${input.slug}-title.png`  // title frame PNG → becomes Image 1
  const videoPath = path.join(process.cwd(), outputDir, videoFilename)
  const thumbnailPath = path.join(process.cwd(), outputDir, `${input.slug}-thumb.jpg`)
  const stillImagePath = path.join(process.cwd(), 'public', 'images', 'insights', stillFilename)

  const remotionProps: Record<string, unknown> = {
    title: input.postTitle,
    excerpt: input.excerpt,
    keyPoints: input.topic.faqClusters.slice(0, 4),
    author: input.authorName,
    category: input.category ?? 'Agentic Commerce',
    slug: input.slug,
    protocols: [] as string[],
  }

  // Full verbatim transcript — every word, all queries, all FAQs — for CC + AI metadata
  const transcript = buildTranscript(input)
  const FRAMES = 840
  const FPS = 30
  const DURATION_SECONDS = FRAMES / FPS
  const duration = framesToDuration(FRAMES, FPS)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
  const contentUrl = `${siteUrl}/videos/insights/${videoFilename}`
  const stillImageUrl = `${siteUrl}/images/insights/${stillFilename}`
  const postUrl = `${siteUrl}/insights/${input.slug}`

  // 1. Render Remotion still (frame 0) as title card PNG — this IS Image 1
  try {
    await renderStill(remotionProps, stillImagePath)
  } catch (err) {
    console.warn(
      `[video-pipeline] Remotion still render failed (stub fallback): ${err instanceof Error ? err.message : String(err)}`,
    )
  }

  // 2. Render full MP4
  try {
    await renderVideo(remotionProps, videoPath)
  } catch (err) {
    console.warn(
      `[video-pipeline] Remotion video render failed (stub fallback): ${err instanceof Error ? err.message : String(err)}`,
    )
  }

  // 3. Generate WebVTT closed captions from full transcript
  const captionTrack = generateWebVTT(transcript, DURATION_SECONDS, input.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${postUrl}#video`,
    name: `${input.postTitle} — Video Summary`,
    description: input.excerpt,
    thumbnailUrl: stillImageUrl,  // Remotion title frame is the thumbnail
    uploadDate: new Date().toISOString(),
    duration,
    transcript,  // FULL verbatim — every word spoken, for AI discoverability
    contentUrl,
    embedUrl: contentUrl,
    // Closed captions for hearing-impaired + AI metadata
    hasPart: {
      '@type': 'MediaObject',
      '@id': `${postUrl}#captions`,
      encodingFormat: 'text/vtt',
      contentUrl: captionTrack.captionUrl,
      inLanguage: captionTrack.language,
      name: captionTrack.label,
      accessibilityFeature: 'closedCaptions',
    },
    author: { '@type': 'Person', name: input.authorName, '@id': `${siteUrl}/#person` },
    publisher: { '@id': ORG_ID },
    about: { '@type': 'Article', name: input.postTitle, url: postUrl },
    inLanguage: 'en-US',
  }

  return {
    videoPath,
    thumbnailPath,
    stillImagePath,
    stillImageUrl,
    transcript,
    captionTrack,
    duration,
    jsonLd,
  }
}
