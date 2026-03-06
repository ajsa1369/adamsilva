/**
 * Screenshot capture via VPS Chrome service.
 * Calls the dedicated screenshot service running real Chrome on our VPS.
 * Falls back gracefully — scan still works without screenshots.
 */

const SCREENSHOT_URL = process.env.SCREENSHOT_SERVICE_URL || 'http://72.60.127.124:3001'
const SCREENSHOT_SECRET = process.env.SCREENSHOT_SECRET || 'asc-screenshot-2026'

/** Capture a screenshot of the given URL via VPS Chrome service */
export async function captureScreenshot(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(`${SCREENSHOT_URL}/screenshot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, token: SCREENSHOT_SECRET }),
      signal: AbortSignal.timeout(20000),
    })

    if (!res.ok) {
      console.error('Screenshot service returned', res.status)
      return null
    }

    const arrayBuf = await res.arrayBuffer()
    return Buffer.from(arrayBuf)
  } catch (err) {
    console.error('Screenshot capture failed:', (err as Error).message)
    return null
  }
}
