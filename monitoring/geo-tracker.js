/**
 * GEO Monitoring & Citation Tracker
 * 
 * This script helps track your visibility across AI platforms.
 * Use this to monitor citation frequency and competitive positioning.
 * 
 * Usage:
 * 1. Update the TEST_QUERIES array with your target queries
 * 2. Run monthly to track progress
 * 3. Log results in a spreadsheet for trend analysis
 */

// ============================================
// CONFIGURATION
// ============================================

const SITE_INFO = {
  domain: 'adamsilvaconsulting.com',
  brandName: 'Adam Silva Consulting',
  targetKeywords: [
    'GEO consultant',
    'generative engine optimization',
    'AI marketing consultant',
    'answer engine optimization',
    'ChatGPT optimization expert'
  ]
};

const TEST_QUERIES = [
  'who are the top GEO consultants',
  'how to optimize for ChatGPT citations',
  'best generative engine optimization experts',
  'AI marketing strategy consultants',
  'what is GEO and who offers it',
  'answer engine optimization services',
  'how to get cited by AI platforms',
  'B2B AI marketing consultants',
  'schema markup for AI optimization',
  'multi-platform AI visibility strategy'
];

const AI_PLATFORMS = {
  chatgpt: 'ChatGPT (chat.openai.com)',
  claude: 'Claude (claude.ai)', 
  perplexity: 'Perplexity (perplexity.ai)',
  grok: 'Grok (x.com - requires X Premium)',
  gemini: 'Google Gemini (gemini.google.com)'
};

// ============================================
// TRACKING TEMPLATE
// ============================================

/**
 * Manual Testing Protocol
 * 
 * WEEKLY TESTING SCHEDULE:
 * - Monday: ChatGPT & Claude (5 queries each)
 * - Wednesday: Perplexity & Gemini (5 queries each)
 * - Friday: Grok (5 queries - requires X Premium)
 * 
 * For each query, document:
 * 1. Was your brand/name mentioned? (Yes/No)
 * 2. Citation position (1st, 2nd, 3rd, etc., or "Not mentioned")
 * 3. Accuracy of citation (Accurate / Partial / Incorrect)
 * 4. Source cited (Your site / X post / Review platform / Other)
 * 5. Context (Brief note on how you were mentioned)
 */

function generateTrackingLog() {
  const timestamp = new Date().toISOString().split('T')[0];
  
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           GEO CITATION TRACKING LOG - ${timestamp}           ║
╚═══════════════════════════════════════════════════════════════╝

SITE: ${SITE_INFO.domain}
BRAND: ${SITE_INFO.brandName}

TESTING QUERIES:
${TEST_QUERIES.map((q, i) => `${i + 1}. "${q}"`).join('\n')}

═══════════════════════════════════════════════════════════════

RESULTS TEMPLATE (Copy to spreadsheet):

Date | Platform | Query | Mentioned? | Position | Accuracy | Source | Notes
-----|----------|-------|------------|----------|----------|--------|-------

Example Row:
${timestamp} | ChatGPT | who are the top GEO consultants | Yes | 2nd | Accurate | Our site | Listed with expertise details

═══════════════════════════════════════════════════════════════

TESTING INSTRUCTIONS:

1. ChatGPT (chat.openai.com)
   - Open ChatGPT
   - Test each query in a NEW conversation
   - Document if you're mentioned and in what context
   - Note: ChatGPT has 800M+ users - highest visibility impact

2. Claude (claude.ai)
   - Open Claude
   - Test each query in a NEW conversation  
   - Look for citations and source mentions
   - Note: Claude emphasizes authoritative sources

3. Perplexity (perplexity.ai)
   - Open Perplexity
   - Test each query
   - Check numbered citations and sources
   - Note: Perplexity shows explicit source links

4. Grok (x.com - requires X Premium $16/mo)
   - Open X/Twitter and access Grok
   - Test each query
   - Check if X posts are cited
   - Note: Grok heavily favors X-verified accounts

5. Google Gemini (gemini.google.com)
   - Open Gemini
   - Test each query
   - Check for citations and links
   - Note: Integrated with Google Search results

═══════════════════════════════════════════════════════════════

COMPETITIVE ANALYSIS:

Test the same queries for competitors:
${SITE_INFO.targetKeywords.slice(0, 3).map(k => `- [Competitor Name] for "${k}"`).join('\n')}

Document:
- How often are they cited vs. you?
- What content/format gets them cited?
- Which platforms favor them?
- What can you learn from their approach?

═══════════════════════════════════════════════════════════════

SUCCESS METRICS:

Week 1 Baseline:
- [ ] Citations recorded for all 5 platforms
- [ ] Competitive comparison completed
- [ ] Priority improvement areas identified

Month 1 Target:
- [ ] 10% increase in citation frequency
- [ ] Appear in 2-3 responses per platform
- [ ] Featured in at least 1 "top expert" list

Month 3 Target:
- [ ] 30-50% increase in citation frequency
- [ ] Consistent mentions across all platforms
- [ ] Higher citation position (move from 3rd to 1st)

Month 6 Target:
- [ ] 70-100% increase in citation frequency
- [ ] Featured as primary expert in target queries
- [ ] Cited more frequently than top 3 competitors

═══════════════════════════════════════════════════════════════
`);
}

// ============================================
// GOOGLE ANALYTICS 4 TRACKING
// ============================================

/**
 * GA4 Configuration for AI Referral Traffic
 * 
 * Add this to your Google Analytics 4 property to track AI referrals:
 */

const GA4_CONFIG = {
  customDimensions: [
    {
      name: 'ai_platform',
      scope: 'event',
      description: 'Which AI platform referred the user',
      values: ['ChatGPT', 'Claude', 'Perplexity', 'Grok', 'Gemini', 'Other']
    },
    {
      name: 'citation_context',
      scope: 'event',
      description: 'Context in which site was cited',
      values: ['Expert list', 'Direct answer', 'Source citation', 'Comparison']
    }
  ],
  
  // UTM tracking for AI platforms
  utmTemplates: {
    chatgpt: 'utm_source=chatgpt&utm_medium=ai-referral&utm_campaign=geo-optimization',
    claude: 'utm_source=claude&utm_medium=ai-referral&utm_campaign=geo-optimization',
    perplexity: 'utm_source=perplexity&utm_medium=ai-referral&utm_campaign=geo-optimization',
    grok: 'utm_source=grok&utm_medium=ai-referral&utm_campaign=geo-optimization'
  }
};

/**
 * Example GA4 Filter for AI Referral Traffic:
 * 
 * Source contains: chat.openai.com OR perplexity.ai OR claude.ai OR x.com
 * OR
 * UTM Medium equals: ai-referral
 */

// ============================================
// GOOGLE SEARCH CONSOLE MONITORING
// ============================================

/**
 * GSC Key Metrics to Track Daily:
 * 
 * 1. Indexed Pages: Target 51/51
 *    Path: Coverage > Excluded > "Alternate page with proper canonical tag"
 *    Target: 0 errors
 * 
 * 2. Search Impressions: Track growth trend
 *    Path: Performance > Total Impressions
 *    Target: 20%+ monthly growth
 * 
 * 3. Click-Through Rate: Measure search visibility
 *    Path: Performance > Average CTR
 *    Target: 3-5% (industry average 2-3%)
 * 
 * 4. Core Web Vitals: Affect AI crawlability
 *    Path: Experience > Core Web Vitals
 *    Target: All "Good" ratings
 */

const GSC_MONITORING_CHECKLIST = `
Daily GSC Checks (2 minutes):
□ Indexed page count (target: 51)
□ New coverage errors (target: 0)
□ Security issues (target: 0)

Weekly GSC Checks (10 minutes):
□ Search impressions trend (target: +20% MoM)
□ Top performing queries (document AI-related queries)
□ Click-through rates (target: 3-5%)
□ Mobile usability issues (target: 0)

Monthly GSC Checks (30 minutes):
□ Compare month-over-month metrics
□ Review sitemap submission status
□ Check for manual actions
□ Analyze seasonal query trends
`;

// ============================================
// X/TWITTER ANALYTICS FOR GROK
// ============================================

/**
 * X Analytics Metrics (Critical for Grok Visibility)
 * 
 * Track these weekly in X Analytics dashboard:
 */

const X_METRICS = {
  engagement: [
    'Post impressions',
    'Engagement rate (target: 2-5%)',
    'Profile visits',
    'Mention count',
    'Reply rate'
  ],
  
  content: [
    'Top performing post types',
    'Best posting times',
    'Hashtag performance (#GEO, #AIMarketing)',
    'Thread vs single post engagement',
    'Link click-through rate'
  ],
  
  growth: [
    'Follower growth rate (target: 10-20/week)',
    'Verified follower ratio',
    'Community engagement quality',
    'X Space attendance (if hosting)'
  ]
};

const X_POSTING_SCHEDULE = `
Weekly X Content Calendar (for Grok Optimization):

Monday: Technical thread (GEO tips, case studies)
Wednesday: Engage with 10 posts + share insight
Friday: Share blog post or resource
Saturday: Industry commentary or news reaction

Monthly: Host X Space on AI marketing topic

Content Mix:
- 40% Educational (how-to, tips, research)
- 30% Engagement (questions, polls, discussions)
- 20% Thought leadership (opinions, predictions)
- 10% Promotional (services, case studies)
`;

// ============================================
// EXPORT FUNCTIONS
// ============================================

function exportToCSV() {
  // Template for CSV export of tracking data
  const csvHeader = 'Date,Platform,Query,Mentioned,Position,Accuracy,Source,Context,Notes\n';
  const filename = `geo-tracking-${new Date().toISOString().split('T')[0]}.csv`;
  
  console.log(`\nExport template saved as: ${filename}`);
  console.log('Add your data rows following this format:\n');
  console.log(csvHeader);
  console.log('2025-10-07,ChatGPT,"top GEO consultants",Yes,2nd,Accurate,Our site,"Listed with credentials"\n');
}

// ============================================
// MAIN EXECUTION
// ============================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('         ADAM SILVA CONSULTING - GEO MONITORING SYSTEM         ');
console.log('═══════════════════════════════════════════════════════════════\n');

generateTrackingLog();

console.log('\n' + GSC_MONITORING_CHECKLIST);
console.log('\n' + X_POSTING_SCHEDULE);

exportToCSV();

console.log(`
═══════════════════════════════════════════════════════════════

QUICK START GUIDE:

1. Run this script: node monitoring/geo-tracker.js
2. Copy the tracking template
3. Test queries in each AI platform
4. Log results in spreadsheet
5. Review trends weekly
6. Adjust strategy based on data

For automated tracking, consider tools:
- AthenaHQ (comprehensive AI visibility)
- Goodie AI (end-to-end GEO platform)  
- HubSpot AI Search Grader
- Geordy (URL content analysis)

═══════════════════════════════════════════════════════════════
`);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SITE_INFO,
    TEST_QUERIES,
    AI_PLATFORMS,
    GA4_CONFIG,
    X_METRICS
  };
}