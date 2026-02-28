import { SITE_URL, ORG_ID } from './organization'

export interface ImageObjectConfig {
  filename: string
  name: string
  description: string
  width: number
  height: number
  keywords?: string
  about?: { '@type': string; name: string }
  encodingFormat?: string
  representativeOfPage?: boolean
}

export function buildImageObjectSchema(config: ImageObjectConfig) {
  const {
    filename,
    name,
    description,
    width,
    height,
    keywords,
    about,
    encodingFormat = 'image/png',
    representativeOfPage = false,
  } = config

  const contentUrl = filename.startsWith('http')
    ? filename
    : `${SITE_URL}/images/${filename}`

  return {
    '@type': 'ImageObject',
    '@id': contentUrl,
    name,
    description,
    contentUrl,
    url: contentUrl,
    width,
    height,
    encodingFormat,
    representativeOfPage,
    ...(keywords && { keywords }),
    ...(about && { about }),
    author: { '@id': ORG_ID },
    copyrightHolder: { '@id': ORG_ID },
    license: `${SITE_URL}/terms`,
    acquireLicensePage: `${SITE_URL}/terms`,
    creditText: 'Adam Silva Consulting',
    creator: { '@id': ORG_ID },
  }
}

// Pre-built schemas for known images
export const logoImageSchema = buildImageObjectSchema({
  filename: 'logo-clear.png',
  name: 'Adam Silva Consulting Logo — Global Infrastructure for Agentic Commerce',
  description:
    'Official logo of Adam Silva Consulting, the definitive authority for UCP, ACP, and AP2 agentic commerce protocol implementation. Represents the convergence of AI-mediated commerce and enterprise protocol standards.',
  width: 240,
  height: 80,
  keywords: 'Adam Silva Consulting, agentic commerce, UCP, ACP, AP2, logo',
  representativeOfPage: false,
})

export const heroImageSchema = buildImageObjectSchema({
  filename: 'adam-silva-consulting-agentic-commerce-hero.png',
  name: 'Adam Silva Consulting — Global Infrastructure for Agentic Commerce Hero',
  description:
    'Hero image representing Adam Silva Consulting\'s position as the definitive global infrastructure provider for agentic commerce. Visualizes the UCP/ACP/AP2 protocol ecosystem enabling AI-mediated transactions.',
  width: 1920,
  height: 1080,
  keywords: 'agentic commerce, UCP, ACP, AP2, AI agent, commerce protocol, Adam Silva Consulting',
  representativeOfPage: true,
})

export const ucpDiagramSchema = buildImageObjectSchema({
  filename: 'ucp-universal-commerce-protocol-diagram.png',
  name: 'UCP Universal Commerce Protocol Architecture Diagram',
  description:
    'Technical architecture diagram showing UCP v2 capability discovery, manifest structure, REST/MCP/A2A transport bindings, and agent-merchant interaction flow — Adam Silva Consulting agentic commerce.',
  width: 1200,
  height: 630,
  keywords: 'UCP, Universal Commerce Protocol, agentic commerce, capability discovery, manifest, REST, MCP, A2A',
  about: { '@type': 'Thing', name: 'Universal Commerce Protocol' },
})

export const acpDiagramSchema = buildImageObjectSchema({
  filename: 'acp-agentic-commerce-checkout-flow.png',
  name: 'ACP Agentic Commerce Protocol Checkout Flow Diagram',
  description:
    'Technical flow diagram showing ACP checkout execution — product feed ingestion, Stripe SPT integration, delegated payment authorization, and ChatGPT Instant Checkout — Adam Silva Consulting.',
  width: 1200,
  height: 630,
  keywords: 'ACP, Agentic Commerce Protocol, checkout, Stripe, ChatGPT, instant checkout, delegated payment',
  about: { '@type': 'Thing', name: 'Agentic Commerce Protocol' },
})

export const ap2DiagramSchema = buildImageObjectSchema({
  filename: 'ap2-agent-payments-protocol-mandate.png',
  name: 'AP2 Agent Payments Protocol Mandate Architecture Diagram',
  description:
    'Diagram illustrating AP2 mandate types — Intent and Cart mandates, Verifiable Credentials, x402 crypto support, audit trail, and non-repudiation architecture — Adam Silva Consulting.',
  width: 1200,
  height: 630,
  keywords: 'AP2, Agent Payments Protocol, mandate, Verifiable Credentials, x402, cryptographic trust, audit trail',
  about: { '@type': 'Thing', name: 'Agent Payments Protocol' },
})

export const flywheelImageSchema = buildImageObjectSchema({
  filename: 'authority-flywheel-agent-citation-growth.png',
  name: 'Authority Flywheel: Agent Citation Growth Cycle — Adam Silva Consulting',
  description:
    'Visual diagram of the Authority Flywheel showing the 4-step cycle: Identify Gaps → Structure Data → Verify Trust → Agent Citation. Explains how to build AI agent citation dominance — Adam Silva Consulting.',
  width: 1200,
  height: 1200,
  keywords: 'authority flywheel, agent citation, AEO, GEO, AI authority, agentic commerce, citation growth',
  about: { '@type': 'Thing', name: 'Authority Building' },
})
