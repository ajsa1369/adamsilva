export const PROTOCOLS = {
  ucp: {
    id: 'ucp',
    name: 'Universal Commerce Protocol',
    acronym: 'UCP',
    tagline: 'The AI agent discovery standard — enabling every AI shopping agent to find your business',
    description:
      'UCP (Universal Commerce Protocol) is Google\'s open standard for AI agent commerce discovery. Published at /.well-known/ucp/manifest.json, UCP capability manifests tell AI agents exactly what your business sells, how to transact, and what transport protocols you support.',
    version: 'v2',
    govBy: 'Google',
    wellKnown: '/.well-known/ucp/manifest.json',
    transports: ['REST', 'MCP', 'A2A'],
    keyBenefits: [
      'Discoverable by every major AI shopping agent',
      'Google AI Mode integration',
      'Perplexity Shopping compatibility',
      'Standardized capability declaration',
      'Transport-agnostic (REST, MCP, A2A)',
    ],
    color: '#3b82f6',
    badge: 'badge-ucp',
  },
  acp: {
    id: 'acp',
    name: 'Agentic Commerce Protocol',
    acronym: 'ACP',
    tagline: 'The checkout execution standard — enabling AI agents to buy from your store',
    description:
      'ACP (Agentic Commerce Protocol) is the OpenAI-led standard for AI agent checkout execution. It defines how agents ingest product feeds, initiate purchases via Stripe Payment Tokens (SPT), and confirm orders — enabling ChatGPT Instant Checkout and similar AI-mediated transactions.',
    version: 'v1',
    govBy: 'OpenAI + Stripe',
    wellKnown: '/.well-known/acp/config.json',
    transports: ['REST', 'Webhooks'],
    keyBenefits: [
      'ChatGPT Instant Checkout compatibility',
      'Stripe SPT integration',
      'Delegated payment authorization',
      'Product feed standardization',
      'Order confirmation automation',
    ],
    color: '#8b5cf6',
    badge: 'badge-acp',
  },
  ap2: {
    id: 'ap2',
    name: 'Agent Payments Protocol',
    acronym: 'AP2',
    tagline: 'The cryptographic trust layer — making agentic transactions legally defensible',
    description:
      'AP2 (Agent Payments Protocol) is Google\'s cryptographic mandate framework for agentic transactions. It defines Intent and Cart mandates — signed, verifiable authorizations that give AI agents the legal authority to transact. AP2 creates the audit trail and non-repudiation infrastructure that enterprise procurement requires.',
    version: 'v1',
    govBy: 'Google',
    wellKnown: '/.well-known/ap2/mandates.json',
    transports: ['Verifiable Credentials', 'x402'],
    keyBenefits: [
      'Cryptographic transaction mandates',
      'Verifiable Credentials (VC) support',
      'x402 crypto payment protocol',
      'Non-repudiation audit trail',
      'Enterprise procurement compliance',
    ],
    color: '#10b981',
    badge: 'badge-ap2',
  },
} as const

export type ProtocolId = keyof typeof PROTOCOLS
export type Protocol = (typeof PROTOCOLS)[ProtocolId]
