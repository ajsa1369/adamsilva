/**
 * Screenshot Service — runs on VPS with real Chrome
 * Uses puppeteer-extra + stealth plugin to bypass Cloudflare bot detection.
 *
 * GET /screenshot?url=https://example.com&token=SECRET
 * Returns: PNG image (1280x800)
 *
 * POST /screenshot  { url, token }
 * Returns: PNG image (1280x800)
 */

const http = require('http')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

const PORT = 3001
const SECRET = process.env.SCREENSHOT_SECRET || 'asc-screenshot-2026'

let browser = null

async function getBrowser() {
  if (!browser || !browser.connected) {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome-stable',
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
        '--disable-blink-features=AutomationControlled',
      ],
    })
  }
  return browser
}

async function captureScreenshot(url) {
  const b = await getBrowser()
  const page = await b.newPage()

  try {
    // Realistic browser fingerprint
    await page.setViewport({ width: 1280, height: 800 })
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    )
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    })

    // Block heavy resources to speed up load
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
      timeout: 15000,
    })

    // Wait for any Cloudflare challenge to resolve + lazy-loaded content
    await new Promise((r) => setTimeout(r, 3000))

    // Check if we're still on a Cloudflare challenge page
    const title = await page.title()
    if (title.includes('Just a moment') || title.includes('Attention Required')) {
      // Wait longer for Cloudflare to pass through
      await new Promise((r) => setTimeout(r, 7000))
    }

    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    })

    return screenshot
  } finally {
    await page.close().catch(() => {})
  }
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`)

  if (parsedUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', browser: browser?.connected ?? false }))
    return
  }

  if (parsedUrl.pathname !== '/screenshot') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  let url, token

  if (req.method === 'GET') {
    url = parsedUrl.searchParams.get('url')
    token = parsedUrl.searchParams.get('token')
  } else if (req.method === 'POST') {
    const body = await new Promise((resolve) => {
      let data = ''
      req.on('data', (chunk) => { data += chunk })
      req.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { resolve({}) }
      })
    })
    url = body.url
    token = body.token
  }

  if (token !== SECRET) {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Unauthorized' }))
    return
  }

  if (!url || typeof url !== 'string') {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'URL required' }))
    return
  }

  // Ensure URL has protocol
  if (!url.startsWith('http')) {
    url = `https://${url}`
  }

  try {
    console.log(`[screenshot] ${url}`)
    const png = await captureScreenshot(url)
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': png.length,
      'Cache-Control': 'public, max-age=86400',
    })
    res.end(png)
  } catch (err) {
    console.error(`[screenshot] FAILED ${url}:`, err.message)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Screenshot failed', detail: err.message }))
  }
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (browser) await browser.close().catch(() => {})
  process.exit(0)
})

server.listen(PORT, () => {
  console.log(`Screenshot service running on port ${PORT}`)
})
