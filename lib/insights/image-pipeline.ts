import sharp, { type WriteableMetadata } from 'sharp'
import fs from 'fs'
import path from 'path'
import { buildImageObjectSchema } from '@/lib/schemas/image'
import type { ImagePipelineInput, ImagePipelineResult } from '@/lib/insights/types'

// sharp's WriteableMetadata doesn't declare xmp in its TypeScript types,
// but the sharp library supports it at runtime. Extend the type locally.
interface WriteableMetadataWithXmp extends WriteableMetadata {
  xmp?: Buffer
}

// Slug-safe string helper: lowercase, spaces → hyphens, strip special chars
function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// Build XMP XML string embedding JSON-LD in dc:description + schema:jsonLd
function buildXmpXml(description: string, jsonLd: object): string {
  const xmlEscape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const jsonStr = xmlEscape(JSON.stringify(jsonLd))
  return `<?xpacket begin='\uFEFF' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x='adobe:ns:meta/'>
  <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>
    <rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:schema='https://schema.org/'>
      <dc:description><rdf:Alt><rdf:li xml:lang='x-default'>${xmlEscape(description)}</rdf:li></rdf:Alt></dc:description>
      <schema:jsonLd>${jsonStr}</schema:jsonLd>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end='w'?>`
}

// Embed XMP metadata into an existing PNG file path, or create a new stub PNG.
// If existingPath is provided and exists, reads it first (Remotion still frame).
// Otherwise creates brand-color 1200×630 PNG (navy #1B2E4B).
async function writePngWithMetadata(
  outputPath: string,
  jsonLd: object,
  description: string,
  existingPath?: string,
): Promise<void> {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  const xmpBuffer = Buffer.from(buildXmpXml(description, jsonLd), 'utf-8')

  const xmpMeta: WriteableMetadataWithXmp = { xmp: xmpBuffer }

  if (existingPath && fs.existsSync(existingPath)) {
    // Embed metadata into existing Remotion still frame
    await sharp(existingPath)
      .withMetadata(xmpMeta)
      .png()
      .toFile(outputPath)
  } else {
    // Create stub PNG: 1200×630 solid brand navy (#1B2E4B) background
    await sharp({
      create: { width: 1200, height: 630, channels: 3, background: { r: 27, g: 46, b: 75 } },
    })
      .withMetadata(xmpMeta)
      .png()
      .toFile(outputPath)
  }
}

// Generate N scene labels from topic data.
// First two scenes are topic-specific; remaining use generic scene vocabulary.
function generateSceneDescriptions(topic: ImagePipelineInput['topic'], count: number): string[] {
  const scenes = ['overview', 'diagram', 'infographic', 'comparison', 'workflow', 'architecture', 'results', 'summary']
  const topicSlug = toSlug(topic.title)
  const baseScenes = [topicSlug + '-title-frame', topicSlug + '-diagram', ...scenes.slice(2)]
  return baseScenes.slice(0, count)
}

/**
 * generateImages — creates PNG files and returns ImagePipelineResult[].
 *
 * Image 1 (isVideoStill=true): Remotion title card.
 *   - If stillFramePath is provided and exists, embeds XMP metadata into it.
 *   - Otherwise creates a brand-navy stub (Remotion not yet rendered).
 * Images 2-N: solid brand-navy 1200×630 stub PNGs with embedded XMP JSON-LD.
 *
 * All PNGs written to: public/images/insights/
 * XMP metadata contains full ImageObject JSON-LD for AI crawler discoverability.
 *
 * TODO(v2): Replace stub creation with actual AI image generation API for images 2-N.
 */
export async function generateImages(
  input: ImagePipelineInput,
  stillFramePath?: string,
): Promise<ImagePipelineResult[]> {
  const topicSlug = toSlug(input.postTitle)
  const results: ImagePipelineResult[] = []
  const outputBase = path.join(process.cwd(), 'public', 'images', 'insights')
  const scenes = generateSceneDescriptions(input.topic, input.imageCount)

  for (let i = 0; i < input.imageCount; i++) {
    const scene = scenes[i] ?? `scene-${i + 1}`
    const filename = `${topicSlug}-${scene}-${i + 1}.png`
    const contentUrl = `${input.imagesBaseUrl}/${filename}`
    const localPath = path.join(outputBase, filename)
    const isVideoStill = i === 0  // image 1 = Remotion title frame

    const jsonLd = buildImageObjectSchema({
      filename: contentUrl,  // full URL — buildImageObjectSchema detects http prefix
      name: `${input.postTitle} — ${scene.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
      description: `${input.topic.title}: ${input.topic.targetQueries[0] ?? scene}. Authority gap score: ${input.topic.authorityGapScore}/100.`,
      width: 1200,
      height: 630,
      keywords: input.topic.targetQueries.slice(0, 3).join(', '),
      about: { '@type': 'Article', name: input.postTitle },
      encodingFormat: 'image/png',
      representativeOfPage: i === 0,
    })

    const description = `${input.postTitle}. ${input.topic.targetQueries[0] ?? ''}`

    // Write PNG with embedded XMP JSON-LD
    await writePngWithMetadata(
      localPath,
      jsonLd,
      description,
      isVideoStill ? stillFramePath : undefined,
    )

    results.push({ filename, contentUrl, localPath, jsonLd, hasEmbeddedMetadata: true, isVideoStill })
  }

  return results
}
