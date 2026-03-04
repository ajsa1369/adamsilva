// Content cluster topology for internal linking architecture
// Each hub connects to its spokes; spokes link back to hub and to each other

export interface ContentCluster {
  id: string
  name: string
  hubPath: string
  spokes: { path: string; label: string; type: 'protocol' | 'service' | 'insight' | 'tool' | 'glossary' | 'case-study' | 'research' | 'hub' }[]
}

export const CONTENT_CLUSTERS: ContentCluster[] = [
  {
    id: 'ucp',
    name: 'Universal Commerce Protocol (UCP)',
    hubPath: '/hub/universal-commerce-protocol',
    spokes: [
      { path: '/protocols/ucp', label: 'UCP Protocol Deep Dive', type: 'protocol' },
      { path: '/services/ucp-implementation', label: 'UCP Implementation Service', type: 'service' },
      { path: '/case-studies', label: 'Shopify + UCP Case Study', type: 'case-study' },
      { path: '/glossary', label: 'UCP Glossary Entry', type: 'glossary' },
      { path: '/insights/agentic-commerce-protocols-ucp-acp-ap2', label: 'UCP, ACP & AP2 Guide', type: 'insight' },
      { path: '/insights/ucp-vs-acp-protocol-comparison', label: 'UCP vs. ACP Comparison', type: 'insight' },
      { path: '/tools/protocol-checker', label: 'Protocol Compliance Checker', type: 'tool' },
      { path: '/research/protocol-adoption-index', label: 'Protocol Adoption Index', type: 'research' },
    ],
  },
  {
    id: 'acp',
    name: 'Agentic Commerce Protocol (ACP)',
    hubPath: '/hub/agentic-commerce-protocol',
    spokes: [
      { path: '/protocols/acp', label: 'ACP Protocol Deep Dive', type: 'protocol' },
      { path: '/services/acp-integration', label: 'ACP Integration Service', type: 'service' },
      { path: '/case-studies', label: 'ChatGPT Instant Checkout Case Study', type: 'case-study' },
      { path: '/glossary', label: 'ACP Glossary Entry', type: 'glossary' },
      { path: '/insights/agentic-commerce-protocols-ucp-acp-ap2', label: 'UCP, ACP & AP2 Guide', type: 'insight' },
      { path: '/insights/ucp-vs-acp-protocol-comparison', label: 'UCP vs. ACP Comparison', type: 'insight' },
      { path: '/tools/protocol-checker', label: 'Protocol Compliance Checker', type: 'tool' },
    ],
  },
  {
    id: 'ap2',
    name: 'Agent Payments Protocol (AP2)',
    hubPath: '/hub/agent-payments-protocol',
    spokes: [
      { path: '/protocols/ap2', label: 'AP2 Protocol Deep Dive', type: 'protocol' },
      { path: '/services/ap2-trust-layer', label: 'AP2 Trust Layer Service', type: 'service' },
      { path: '/glossary', label: 'AP2 Glossary Entry', type: 'glossary' },
      { path: '/insights/ap2-mandates-cryptographic-trust', label: 'AP2 Mandates Guide', type: 'insight' },
      { path: '/insights/agentic-commerce-protocols-ucp-acp-ap2', label: 'UCP, ACP & AP2 Guide', type: 'insight' },
      { path: '/tools/protocol-checker', label: 'Protocol Compliance Checker', type: 'tool' },
    ],
  },
  {
    id: 'aeo',
    name: 'Answer Engine Optimization (AEO)',
    hubPath: '/hub/answer-engine-optimization',
    spokes: [
      { path: '/services/aeo-audit', label: 'AEO Audit Service', type: 'service' },
      { path: '/services/authority-building', label: 'Authority Building Program', type: 'service' },
      { path: '/tools/aeo-score', label: 'AEO Score Analyzer', type: 'tool' },
      { path: '/glossary', label: 'AEO Glossary Entry', type: 'glossary' },
      { path: '/insights/aeo-vs-geo-difference', label: 'AEO vs. GEO Guide', type: 'insight' },
      { path: '/insights/building-topical-authority', label: 'Building Topical Authority', type: 'insight' },
      { path: '/insights/e-e-a-t-in-the-age-of-generative-ai-building-unshakeable-authority', label: 'E-E-A-T in the AI Age', type: 'insight' },
      { path: '/insights/zero-click-searches-the-new-reality-of-information-discovery', label: 'Zero-Click Searches', type: 'insight' },
    ],
  },
  {
    id: 'geo',
    name: 'Generative Engine Optimization (GEO)',
    hubPath: '/hub/generative-engine-optimization',
    spokes: [
      { path: '/services/geo-implementation', label: 'GEO Implementation Service', type: 'service' },
      { path: '/services/agent-ready-blog-creator', label: 'Blog Creator Engine', type: 'service' },
      { path: '/tools/token-calculator', label: 'Token Efficiency Calculator', type: 'tool' },
      { path: '/glossary', label: 'GEO Glossary Entry', type: 'glossary' },
      { path: '/insights/aeo-vs-geo-difference', label: 'AEO vs. GEO Guide', type: 'insight' },
      { path: '/insights/token-efficiency-make-pages-cheap-to-parse', label: 'Token Efficiency Guide', type: 'insight' },
      { path: '/insights/hydration-tax-client-side-rendering', label: 'Hydration Tax Guide', type: 'insight' },
      { path: '/insights/gartner-50-percent-traffic-decline', label: 'Gartner Traffic Prediction', type: 'insight' },
      { path: '/research/state-of-agentic-commerce-2026', label: 'State of Agentic Commerce 2026', type: 'research' },
    ],
  },
]

/**
 * Find which clusters a given path belongs to (as a spoke).
 * Returns the cluster IDs and hub paths for cross-linking.
 */
export function getClustersForPath(path: string): ContentCluster[] {
  return CONTENT_CLUSTERS.filter((c) =>
    c.hubPath === path || c.spokes.some((s) => s.path === path)
  )
}

/**
 * Get related content links for a given path, excluding self.
 * Returns up to `limit` links from the same cluster(s).
 */
export function getRelatedLinks(path: string, limit = 5): { path: string; label: string; type: string }[] {
  const clusters = getClustersForPath(path)
  const seen = new Set<string>()
  const links: { path: string; label: string; type: string }[] = []

  for (const cluster of clusters) {
    // Add hub if we're a spoke
    if (cluster.hubPath !== path && !seen.has(cluster.hubPath)) {
      seen.add(cluster.hubPath)
      links.push({ path: cluster.hubPath, label: `${cluster.name} Hub`, type: 'hub' })
    }
    // Add spokes
    for (const spoke of cluster.spokes) {
      if (spoke.path !== path && !seen.has(spoke.path)) {
        seen.add(spoke.path)
        links.push(spoke)
      }
    }
  }

  return links.slice(0, limit)
}
