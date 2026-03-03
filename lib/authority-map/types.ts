export interface AuthorityMapTopic {
  rank: number                        // 1-based ranking by opportunity score
  title: string                       // Blog post / content topic title
  targetQueries: string[]             // Search queries this topic addresses
  authorityGapScore: number           // 0-100: gap in market coverage
  recommendedSchemaTypes: string[]    // e.g. ['Article', 'FAQPage', 'HowTo']
  faqClusters: string[]               // Key questions to answer in the content
  estimatedCitationLift: string       // e.g. "3-5 AI citations/month"
}

export interface AuthorityMapResult {
  clientId: string
  month: string                       // 'YYYY-MM' format
  topics: AuthorityMapTopic[]         // 5-10 ranked topics
}

export interface ClientConfig {
  clientId: string
  industry: string
  serviceArea: string                 // e.g. "Atlanta, GA" or "US"
  approvalEmail: string               // Who receives the approval email
  existingContentUrls?: string[]      // Optional: URLs of existing posts for gap analysis
}
