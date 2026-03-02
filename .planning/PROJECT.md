# Adam Silva Consulting — ASC Commercial Platform

## What This Is

Adam Silva Consulting (ASC) builds and sells Agentic Commerce readiness infrastructure for SMBs through enterprise clients. The platform runs on Next.js 14 App Router + Vercel Edge SSR, uses Supabase for data, Strapi v5 as headless CMS, Remotion for video generation, and Tailwind v4 for styling. The commercial platform layer — built on top of the existing ASCv2 site — sells four service tiers (Bronze $16K, Silver $28K, Gold $48K, Core custom) plus Legacy Add-On packages, delivered through an agentic intake chatbot that audits each prospect's stack and generates a live custom proposal automatically.

## Core Value

Every prospect gets an instant, accurate, branded proposal for exactly what they need — no sales calls required to qualify.

## Requirements

### Validated

<!-- Shipped and confirmed valuable — from ASCv2 baseline -->

- ✓ 52-page Next.js 14 App Router site (SSR, TypeScript clean) — ASCv2
- ✓ Full JSON-LD schema library (lib/schemas/*) — ASCv2
- ✓ AI discovery files (llms.txt, llms-full.txt, ai-context.json, agent.json, ai-plugin.json) — ASCv2
- ✓ /.well-known/ protocol routes (UCP, ACP, AP2 static) — ASCv2
- ✓ RSS feed at /feed.xml — ASCv2
- ✓ API routes: /api/contact, /api/newsletter — ASCv2
- ✓ Supabase tables: contact_submissions, leads, newsletter_signups (RLS) — ASCv2
- ✓ Remotion BlogSummaryVideo.tsx + Root.tsx scaffolded — ASCv2
- ✓ Strapi v5 live on VPS (http://72.60.127.124:1337) — ASCv2
- ✓ Protocol hub pages: /hub/ucp, /hub/acp, /hub/ap2 — ASCv2
- ✓ Tool pages: /tools/token-calculator, /tools/protocol-checker, /tools/aeo-score — ASCv2

### Active

<!-- Current scope — milestone v1.0: ASC Commercial Platform -->

- [ ] Design system: tokens, component library (Button, Card, Badge, ChatBubble, ProposalCard, PricingTable, ComparisonTable, IntakeStep, PlatformWarning)
- [ ] Supabase schema: integrations_catalog, packages, proposals, blog_posts, authority_maps, chatbot_sessions, press_releases (all with RLS)
- [ ] Integration catalog (all Tier 1/2/3 tools) seeded in Supabase + TypeScript lib
- [ ] Pricing engine: slot logic, overage calculation, tier recommendation engine
- [ ] Agentic intake chatbot at /get-started — prospect qualifies, stack detected, proposal generated and delivered
- [ ] PDF proposal generation + email delivery via Resend
- [ ] CRM webhook (configurable) + 48-hour follow-up sequence trigger
- [ ] Topical authority map agent — monthly research pipeline → content calendar per client
- [ ] Blog post production pipeline — image gen, Remotion video, heavy schema, Strapi publish
- [ ] Press release engine — draft, NewsArticle schema, Remotion video sidecar, wire service distribution
- [ ] Site chatbot module — embeddable widget, 10 CRM adapters, multi-channel (Web/SMS/Voice/WhatsApp)
- [ ] Package comparison pages (/packages, /packages/[tier]), platform compatibility checker (/platform-check)
- [ ] ROI calculator component
- [ ] ASC MCP server (app/api/asc/[transport]) with 6 tools
- [ ] Dynamic /.well-known/* routes via artifact generator
- [ ] Vercel Cron for monthly authority map + blog schedule

### Out of Scope

- Real-time multi-user collaboration on proposals — ASC is a one-to-one proposal flow
- Full e-commerce checkout on-site (proposals close via sales call/Stripe invoicing) — v2+
- Native mobile app — web-first, mobile later
- WordPress/Shopify theme generator — not in service scope
- Full Strapi admin customization beyond content types — VPS CMS is operational

## Context

- **Repository:** https://github.com/ajsa1369/adamsilva (branch: ASCv2)
- **VPS Strapi:** http://72.60.127.124:1337 (PM2, PostgreSQL, Nginx)
- **Supabase:** project ref cdifobufvgfpbcbvicjs, us-east-1
- **Vercel:** ASCv2 branch → preview on push, merge to main after QA
- **Local path:** C:\Users\Bev\Downloads\ASCW\adamsilva
- **AI transparency laws:** AB 2013 / SB 942 compliance required on all AI-generated content labels
- **LLM provider:** Never hardcoded — always via MODEL_PROVIDER env var

## Constraints

- **Tech Stack:** Next.js 14 App Router only (no pages/ directory), Tailwind v4, TypeScript strict
- **DB:** All DB operations via Supabase client (lib/supabase/) — no direct Postgres calls
- **AI:** Vercel AI SDK for all streaming + tool-calling; provider swappable via env
- **Schema:** JSON-LD always validated before storing or injecting
- **Dependencies:** Check package.json before adding any new package
- **Runtime:** Vercel Edge Runtime where compatible — verify before adding
- **Mobile-first:** No Tailwind arbitrary values unless absolutely unavoidable
- **API routes:** All require Zod input validation + error handling

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router on Vercel | SSR + Edge for AEO/GEO agent crawlability | ✓ Good |
| Strapi v5 on VPS (not managed) | Cost control, full schema control | — Pending |
| Supabase for leads/proposals | Managed Postgres + RLS + edge functions | — Pending |
| MODEL_PROVIDER env var (not hardcoded) | ASC can swap LLM without code deploy | — Pending |
| Vercel AI SDK for intake + chatbot | Streaming + tool-calling, edge-compatible | — Pending |
| Legacy platform detection + warning | Honest positioning, upsell to migration path | — Pending |
| PDFKit or React-PDF for proposals | In-process generation, no external service dep | — Pending |

## Current Milestone: v1.0 — ASC Commercial Platform

**Goal:** Build the full commercial layer on ASCv2 — intake agent, pricing engine, content pipelines, chatbot module, package pages, and protocol MCP server.

**Target features:**
- Agentic intake chatbot with proposal generation (critical path)
- Supabase commercial schema (7 new tables) + integration catalog
- Pricing engine with tier recommendation logic
- Blog post + press release production pipelines
- Deployable site chatbot module (10 CRM adapters)
- Package marketing pages + ROI calculator
- ASC MCP server with 6 tools

---
*Last updated: 2026-03-02 — Milestone v1.0 initialized*
