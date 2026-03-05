/**
 * Deepgram Text-to-Speech utility.
 * Generates audio files from text using Deepgram's Aura-2 TTS API.
 *
 * Endpoint: POST https://api.deepgram.com/v1/speak
 * Auth: Token <DEEPGRAM_API_KEY>
 *
 * Usage:
 *   const audioBuffer = await generateSpeech('Hello world', { voice: 'aura-asteria-en' })
 */

const DEEPGRAM_API_URL = 'https://api.deepgram.com/v1/speak'

export interface DeepgramTTSOptions {
  /** Voice model — e.g. 'aura-asteria-en', 'aura-luna-en', 'aura-stella-en' */
  voice?: string
  /** Audio encoding — 'linear16', 'mp3', 'opus', 'flac', 'aac' */
  encoding?: string
  /** Sample rate in Hz */
  sampleRate?: number
}

/**
 * Generate speech audio from text using Deepgram TTS.
 * Returns a Buffer of the audio data.
 */
export async function generateSpeech(
  text: string,
  options: DeepgramTTSOptions = {}
): Promise<Buffer> {
  const apiKey = process.env.DEEPGRAM_API_KEY
  if (!apiKey) {
    throw new Error('DEEPGRAM_API_KEY environment variable is required')
  }

  const { voice = 'aura-asteria-en', encoding = 'mp3', sampleRate = 24000 } = options

  const params = new URLSearchParams({
    model: voice,
    encoding,
    sample_rate: sampleRate.toString(),
  })

  const response = await fetch(`${DEEPGRAM_API_URL}?${params}`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Deepgram TTS error (${response.status}): ${error}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

/**
 * Generate speech and save to a file.
 */
export async function generateSpeechToFile(
  text: string,
  outputPath: string,
  options: DeepgramTTSOptions = {}
): Promise<void> {
  const { writeFile } = await import('fs/promises')
  const buffer = await generateSpeech(text, options)
  await writeFile(outputPath, buffer)
}
