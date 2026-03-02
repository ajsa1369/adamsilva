# GSD Initialization Prompt — ASC Commercial Platform v1

Copy and paste the block below into a new Claude Code session inside the adamsilva project directory.

---

## PROMPT TO PASTE

```
/gsd:new-milestone

PROJECT CONTEXT:
This is Adam Silva Consulting (ASC) — "Global Infrastructure for Agentic Commerce."
The existing ASCv2 codebase is live on GitHub (branch: ASCv2) at github.com/ajsa1369/adamsilva.
Stack: Next.js 14 App Router · Vercel Edge SSR · Supabase · Strapi v5 · Remotion · Tailwind v4.
Full PRD is at .planning/PRD.md — read it before planning any phase.

MILESTONE NAME: ASC Commercial Platform v1

MILESTONE GOAL:
Build the commercial layer that turns the ASCv2 site into a fully operational
sales and delivery platform for Agentic Commerce readiness services.

The platform sells four service tiers (Bronze $16K, Silver $28K, Gold $48K,
Core custom) plus Legacy Add-On packages for Shopify/Wix/Squarespace clients.
Pricing is dynamic — an agentic intake chatbot asks prospects what software
they use, then auto-calculates a custom proposal based on integration count
and tier classification.

PHASES (execute in order):

Phase 1: Design System & UI Foundation
  Skills to invoke: ui-ux-pro-max, frontend-design
  Deliverables:
  - Design tokens (color, typography, spacing) in lib/design-tokens.ts
  - Component library: Button, Card, Badge, ChatBubble, ProposalCard,
    PricingTable, ComparisonTable, IntakeStep, PlatformWarning
  - Figma-quality mockups for: intake chatbot page, package comparison page,
    proposal output card, blog post template
  - All components: Tailwind v4, dark/light mode, mobile-first
  - Push to GitHub via GitHub MCP

Phase 2: Supabase Schema & Data Architecture
  MCP servers to use: Supabase MCP (project ref: cdifobufvgfpbcbvicjs)
  Tables to create (full schema in PRD.md Section 7):
  - integrations_catalog
  - packages
  - proposals
  - blog_posts
  - authority_maps
  - chatbot_sessions
  - press_releases
  Deliverables:
  - All tables created with RLS enabled
  - Integration catalog seeded (all Tier 1/2/3 tools from PRD.md Section 6 Module 1)
  - Edge functions scaffolded: generate-proposal, send-proposal-email, create-crm-deal
  - Supabase migrations in /supabase/migrations/

Phase 3: Integration Catalog & Pricing Engine
  Deliverables:
  - lib/integrations/catalog.ts — complete integration database with tier classification
  - lib/pricing/calculator.ts — slot logic + overage calculation
  - lib/pricing/tier-selector.ts — recommendation engine (integration count,
    lead volume, goals, platform type → recommended tier)
  - lib/pricing/types.ts — all TypeScript types for pricing system
  - Unit tests for all pricing logic

Phase 4: Agentic Intake Agent (CRITICAL PATH)
  MCP servers to use: Supabase MCP, GitHub MCP
  Vercel AI SDK: streamText, useChat, tool-calling
  Deliverables:
  - app/(marketing)/get-started/page.tsx — conversational intake UI
    (use frontend-design skill for the chat interface)
  - app/api/intake/chat/route.ts — Vercel AI SDK streamText endpoint
    with full tool set (calculateProposal, detectPlatformTier,
    lookupIntegration, generateProposalPDF, saveToCRM)
  - Platform detection + branch routing (legacy warning for Shopify/Wix/etc)
  - Proposal generation saved to Supabase proposals table
  - PDF proposal generation (React-PDF or PDFKit)
  - Email delivery via Resend or existing email-service edge function
  - CRM webhook to ASC's own CRM (configurable)
  - 48-hour follow-up sequence trigger if no call booked
  NOTE: Do NOT hardcode any LLM provider — use environment variable
  MODEL_PROVIDER so ASC can swap models without code changes.

Phase 5: Topical Authority Map Agent
  MCP servers to use: NotebookLM MCP (when available), Supabase MCP
  Deliverables:
  - app/api/authority-map/generate/route.ts — research pipeline
  - lib/authority-map/researcher.ts — NotebookLM MCP integration wrapper
  - lib/authority-map/gap-analyzer.ts — competitor gap analysis
  - Authority map stored in Supabase authority_maps table
  - Vercel Cron trigger (monthly, first Monday of month)
  - Client approval email with approve/modify link
  - Output: authority-map JSON per client per month

Phase 6: Blog Post Production Pipeline
  Skills to invoke: image-creator (image generation), Remotion video
  MCP servers to use: Supabase MCP, GitHub MCP
  Deliverables:
  - lib/blog/image-pipeline.ts
    * Generate N images from post content
    * Descriptive filename: [topic-slug]-[scene]-[n].png
    * Companion ImageObject JSON-LD for each image (see PRD.md)
    * Store to Vercel Blob or configured asset storage
  - lib/blog/video-pipeline.ts
    * Trigger Remotion render for BlogSummaryVideo.tsx
    * Pass post summary, key points, FAQ as Remotion input props
    * Generate VideoObject JSON-LD with full transcript (see PRD.md)
  - lib/blog/schema-assembler.ts
    * Build full interlinked JSON-LD: Article + Person + FAQPage +
      HowTo + ImageObject[] + VideoObject
    * All nodes linked via @id references
  - app/api/blog/generate/route.ts — full pipeline orchestration
  - Strapi v5 publish integration
  - Vercel Cron for monthly post schedule per client

Phase 7: Press Release Engine
  Deliverables:
  - app/api/press-release/generate/route.ts
  - lib/press-release/draft-generator.ts (300-500w inverted pyramid)
  - lib/press-release/schema-builder.ts (NewsArticle schema)
  - lib/press-release/compliance.ts (AB 2013 / SB 942 labels)
  - Wire service integration (configurable: Business Wire / PR Newswire /
    EIN Presswire / AccessWire)
  - 60-second Remotion video sidecar with VideoObject JSON-LD

Phase 8: Site Chatbot Module
  Skills to invoke: frontend-design (chatbot widget UI)
  Vercel AI SDK: streamText, useChat, tool definitions
  Deliverables:
  - components/chatbot/ChatWidget.tsx — embeddable widget
  - components/chatbot/ChatBubble.tsx — message rendering
  - app/api/chatbot/[clientId]/route.ts — client-specific chatbot endpoint
  - lib/chatbot/tools.ts — all tool definitions:
    bookAppointment, calculateJobCost, createCRMLead,
    escalateToHuman, lookupOrderStatus
  - lib/chatbot/crm-adapters/ — adapter pattern for all Tier 1 CRMs:
    hubspot.ts, salesforce.ts, pipedrive.ts, zoho.ts, gohighlevel.ts,
    monday-sales.ts, freshsales.ts, close.ts, keap.ts, activecampaign.ts
  - Multi-channel connector interfaces (SMS, Voice, WhatsApp)
  - Session storage in Supabase chatbot_sessions table
  - Embeddable script for client sites: public/chatbot-embed.js

Phase 9: Package Pages & Marketing Site
  Skills to invoke: frontend-design, ui-ux-pro-max
  Deliverables:
  - app/(marketing)/packages/page.tsx — full tier comparison
  - app/(marketing)/packages/[tier]/page.tsx — individual tier detail
  - app/(marketing)/platform-check/page.tsx — compatibility checker
    (integrates with existing /tools/protocol-checker)
  - ROI calculator component (lib/components/ROICalculator.tsx)
  - Blog post: "The 8-Track Problem: Why We Won't Build on Legacy Site Builders"
    (full content in .planning/PRD.md, publish through blog pipeline)
  - Heavy JSON-LD on all new pages (Service, FAQPage, HowTo schema)

Phase 10: Vercel MCP Server & Protocol Stack
  MCP: @vercel/mcp-adapter (createMcpHandler)
  Deliverables:
  - app/api/asc/[transport]/route.ts — ASC MCP server
    Tools: generateAuthorityMap, createBlogPost, generateSchemaMarkup,
    runProtocolCheck, calculateProposal, generatePressRelease
  - UCP manifest generator: app/api/ucp-generator/route.ts
  - ACP checkout adapter framework: lib/protocols/acp-adapter.ts
  - AP2 mandate service scaffolding: lib/protocols/ap2-mandate.ts
  - Agent artifact auto-generator: lib/protocols/artifact-generator.ts
  - All existing /.well-known/* routes updated to use generator

TOOLS & MCP SERVERS TO USE THROUGHOUT:
- GitHub MCP: all commits, branch management (branch: ASCv2)
- Supabase MCP (project ref: cdifobufvgfpbcbvicjs, region: us-east-1)
- NotebookLM MCP: research for authority maps and blog content
- Vercel AI SDK: all AI streaming + tool-calling
- @vercel/mcp-adapter: Phase 10 MCP server
- ui-ux-pro-max skill: Phase 1 design, Phase 8 chatbot UI, Phase 9 pages
- frontend-design skill: all React component builds
- image-creator skill: Phase 6 blog image generation
- Remotion (existing remotion/ directory): Phase 6 + 7 video generation

CODING RULES:
- Never hardcode LLM provider — all AI calls use configurable model via env
- All new pages use Next.js 14 App Router (no pages/ directory)
- All DB operations via Supabase client (lib/supabase/)
- TypeScript strict mode throughout
- No new dependencies without checking package.json first
- Schema JSON-LD always validated before storing or injecting
- Mobile-first Tailwind v4 — no arbitrary values unless unavoidable
- All API routes: error handling + Zod input validation
- Vercel Edge Runtime where possible (check compatibility before adding)

VERCEL DEPLOYMENT:
- Branch: ASCv2 → Vercel preview on every push (GitHub MCP for push)
- Production: merge ASCv2 → main after each phase QA passes
- Vercel Cron: configure in vercel.json for authority map + blog schedule
- Vercel Blob: for generated images and videos
- Edge Config: for integration catalog (fast reads, no DB query on intake)
```

---

## HOW TO USE

1. Open terminal in `C:\Users\Bev\Downloads\ASCW\adamsilva`
2. Run `claude` to start Claude Code
3. Paste the entire prompt block above
4. GSD will:
   - Read the PRD from `.planning/PRD.md`
   - Create a `PROJECT.md` and milestone plan
   - Break each phase into executable tasks
   - Let you approve the plan before execution starts

## PHASE EXECUTION

After milestone is set up, execute each phase with:
```
/gsd:plan-phase
```
Then:
```
/gsd:execute-phase
```

## CHECKING PROGRESS
```
/gsd:progress
```

## IF WORK IS INTERRUPTED
```
/gsd:resume-work
```
