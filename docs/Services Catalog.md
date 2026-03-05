# Services Catalog

Tags: #services #pricing

## Packages (5)
| Package | Setup | Monthly | Slug |
|---------|-------|---------|------|
| Bronze | $16,000 | $3,500/mo | `bronze` |
| Silver | $28,000 | $6,500/mo | `silver` |
| Gold | $48,000 | $12,000/mo | `gold` |
| Shopify Starter | $8,500 | $2,000/mo | `shopify-starter` |
| Shopify Growth | $16,000 | $4,000/mo | `shopify-growth` |
| Core | Custom | Custom | `core` (no Stripe product) |

## Individual Services (18)

### Audit & Optimization
| Service | Price | Recurring | Slug |
|---------|-------|-----------|------|
| ACRA | FREE | — | `acra` |
| AEO Audit | $5,000 | — | `aeo-audit` |
| GEO Implementation | $7,500 | — | `geo-implementation` |
| Authority Building | $15,000 | — | `authority-building` |

### AI Agents (recurring)
| Service | Setup | Monthly | Slug |
|---------|-------|---------|------|
| Quoting Agent | $8,500 | $1,200/mo | `quoting-agent` |
| Off-Hours Voice Agent | $6,500 | $950/mo | `off-hours-voice-agent` |
| Lead Enrichment | $5,500 | $1,500/mo | `lead-enrichment` |
| Lead Scraping | $9,500 | $2,200/mo | `lead-scraping` |
| Auto-Appointment Setter | $8,500 | $1,800/mo | `auto-appointment-setter` |
| Blog Creator Engine | $4,500 | $2,500/mo | `agent-ready-blog-creator` |
| Press Syndicator | $6,500 | $3,000/mo | `press-syndicator` |
| Unified Sales Agent | $45,000 | $5,000/mo | `unified-sales-agent` |
| Social Media Manager | $6,500 | $1,500/mo | `social-media-manager` |
| Social Media Poster | $4,500 | $950/mo | `social-media-poster` |
| RAG Message Replier | $7,500 | $1,800/mo | `rag-message-replier` |

### Protocol Implementations (one-time)
| Service | Price | Slug |
|---------|-------|------|
| UCP Implementation | $15,000 | `ucp-implementation` |
| ACP Integration | $25,000 | `acp-integration` |
| AP2 Trust Layer | $35,000 | `ap2-trust-layer` |

## CTA Logic per Service
- **Free (ACRA):** "Get Free Assessment" → `/contact`
- **Custom (Core):** "Request Quote" → `/contact`
- **Priced:** "Buy Now" (primary) + "Add to Cart" (secondary) + "Speak With Our Team"

## Data File
`lib/data/services.ts` — source of truth for all service metadata

## Related
- [[Stripe Setup]] — product/price IDs
- [[Architecture]] — ServiceCTASection, BuyNowButton
