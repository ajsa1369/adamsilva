/**
 * Headless Chrome screenshot capture for ACRA reports.
 * Uses @sparticuz/chromium (serverless-compatible) + puppeteer-core.
 * Returns a Buffer of the PNG screenshot, or null on failure.
 */

import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

/** Capture a 800x500 screenshot of the given URL */
export async function captureScreenshot(url: string): Promise<Buffer | null> {
  let browser = null
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 800 },
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    })

    const page = await browser.newPage()

    // Block heavy resources to speed up page load
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const type = req.resourceType()
      if (['media', 'font', 'websocket'].includes(type)) {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 10000,
    })

    // Wait a moment for any lazy-loaded hero images
    await new Promise((r) => setTimeout(r, 1000))

    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    }) as Buffer

    return screenshot
  } catch (err) {
    console.error('Screenshot capture failed:', err)
    return null
  } finally {
    if (browser) {
      await browser.close().catch(() => {})
    }
  }
}
