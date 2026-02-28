import { getInsights, FALLBACK_POSTS } from '@/lib/strapi/queries'

const SITE_URL = 'https://www.adamsilvaconsulting.com'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildRssItem(post: {
  title: string
  slug: string
  excerpt: string
  published_at: string
  cover_image?: { url: string } | null
  tags?: string[]
  read_time?: number
  author?: { name: string } | null
}) {
  const url = `${SITE_URL}/insights/${post.slug}`
  const pubDate = new Date(post.published_at).toUTCString()
  const coverUrl = post.cover_image?.url || `${SITE_URL}/images/insights/${post.slug}-cover.jpg`

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>info@adamsilvaconsulting.com (Adam Silva)</author>
      <category>Agentic Commerce</category>
      ${post.tags?.map(t => `<category>${escapeXml(t)}</category>`).join('\n      ') || ''}
      <media:content url="${coverUrl}" medium="image" width="1200" height="630" />
      <content:encoded><![CDATA[
        <p>${post.excerpt}</p>
        <p><a href="${url}">Read the full article (${post.read_time || 8} min read) →</a></p>
        <img src="${coverUrl}" alt="${escapeXml(post.title)}" width="1200" height="630" />
      ]]></content:encoded>
    </item>`
}

export async function GET() {
  let posts
  try {
    posts = await getInsights(50)
    if (!posts || posts.length === 0) posts = FALLBACK_POSTS
  } catch {
    posts = FALLBACK_POSTS
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Adam Silva Consulting Insights</title>
    <link>${SITE_URL}/insights</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Global Infrastructure for Agentic Commerce — UCP, ACP, AP2, AEO, and GEO intelligence from Adam Silva Consulting.</description>
    <language>en-US</language>
    <managingEditor>info@adamsilvaconsulting.com (Adam Silva)</managingEditor>
    <webMaster>info@adamsilvaconsulting.com (Adam Silva)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/images/logo-clear.png</url>
      <title>Adam Silva Consulting Insights</title>
      <link>${SITE_URL}/insights</link>
      <width>240</width>
      <height>80</height>
    </image>
    ${posts.map(buildRssItem).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
