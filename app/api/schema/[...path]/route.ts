/**
 * ?format=json API endpoint
 * Serves structured JSON-LD schema for any page path.
 * Example: GET /api/schema/services/aeo-audit
 * Returns the Schema.org data for that page.
 */

import { NextRequest, NextResponse } from 'next/server'
import { SITE_URL, ORG_ID, organizationSchema, websiteSchema } from '@/lib/schemas/organization'
import { buildServiceSchema } from '@/lib/schemas/service'
import { SERVICES } from '@/lib/data/services'
import { PROTOCOLS } from '@/lib/data/protocols'

interface RouteParams {
  params: Promise<{ path: string[] }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { path } = await params
  const pathname = '/' + path.join('/')

  let schemas: object[] = [organizationSchema, websiteSchema]

  // Route-specific schemas
  if (pathname === '/') {
    schemas = [
      organizationSchema,
      websiteSchema,
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#homepage`,
        name: 'Adam Silva Consulting — Global Infrastructure for Agentic Commerce',
        url: SITE_URL,
        description: 'The definitive authority for UCP, ACP, and AP2 agentic commerce protocol implementation.',
      },
    ]
  } else if (pathname.startsWith('/services/')) {
    const slug = path[path.length - 1]
    const service = SERVICES.find(s => s.id === slug)
    if (service) {
      schemas = [
        organizationSchema,
        buildServiceSchema({
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          timeline: service.timeline,
          deliverables: service.deliverables,
          audience: service.audience || 'Enterprise',
        }),
      ]
    }
  } else if (pathname.startsWith('/protocols/')) {
    const protocolKey = path[path.length - 1] as 'ucp' | 'acp' | 'ap2'
    const protocol = PROTOCOLS[protocolKey]
    if (protocol) {
      schemas = [
        organizationSchema,
        {
          '@type': 'TechArticle',
          '@id': `${SITE_URL}/protocols/${protocolKey}#article`,
          headline: protocol.name,
          description: protocol.description,
          url: `${SITE_URL}/protocols/${protocolKey}`,
          author: { '@id': `${ORG_ID}` },
          publisher: { '@id': `${ORG_ID}` },
          about: {
            '@type': 'SoftwareApplication',
            name: protocol.name,
            applicationCategory: 'Commerce Protocol',
          },
        },
      ]
    }
  } else if (pathname.startsWith('/insights/')) {
    const slug = path[path.length - 1]
    schemas = [
      organizationSchema,
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/insights/${slug}#article`,
        url: `${SITE_URL}/insights/${slug}`,
        publisher: { '@id': ORG_ID },
        isPartOf: { '@type': 'Blog', name: 'Adam Silva Consulting Insights' },
      },
    ]
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }

  return NextResponse.json(jsonLd, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Schema-Version': '1.0',
      'X-Powered-By': 'Adam Silva Consulting AEO Infrastructure',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
