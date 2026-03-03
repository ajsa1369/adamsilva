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

- ✓ Design system: tokens, 9 reusable components — v1.0 Phase 1
- ✓ Supabase schema: 7 tables with RLS — v1.0 Phase 2
- ✓ Integration catalog + pricing engine — v1.0 Phase 3
- ✓ Agentic intake chatbot + proposal PDF + email + CRM — v1.0 Phase 4
- ✓ Topical authority map agent — v1.0 Phase 5
- ✓ Blog post production pipeline — v1.0 Phase 6
- ✓ Press release engine — v1.0 Phase 7
- ✓ Site chatbot module (10 CRM adapters, multi-channel) — v1.0 Phase 8
- ✓ Package pages + ROI calculator + platform checker — v1.0 Phase 9

### Active

<!-- Current scope — milestone v2.0: Stripe Payment Integration -->

- [ ] Stripe Products/Prices for all 6 package tiers (setup + monthly)
- [ ] Wire/ACH payment processing for setup fees ($8.5K–$125K+)
- [ ] Stripe Subscriptions for monthly retainers ($2K–$12K/mo)
- [ ] ACP protocol integration — real Stripe Checkout Sessions via /api/acp/checkout
- [ ] UCP discovery update — advertise real payment methods in /.well-known/ucp
- [ ] AP2 mandate service — wire transfer enforcement for large amounts
- [ ] Stripe webhook handler (/api/stripe/webhook) for payment confirmations
- [ ] Chargeback protection strategy (ACH preferred, wire for large, Stripe Radar)
- [ ] All-sales-final policy enforcement (ToS, signed SOW before payment)

### Out of Scope

- Real-time multi-user collaboration on proposals — ASC is a one-to-one proposal flow
- Full shopping cart e-commerce (ASC sells services, not products) — not applicable
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

## Current Milestone: v2.0 — Stripe Payment Integration

**Goal:** Wire real payment processing into the ASC platform so prospects can pay setup fees (wire/ACH) and monthly retainers (Stripe Subscriptions) — with ACP/AP2 protocol integration for AI agent transactions.

**Target features:**
- Stripe Products/Prices for all 6 package tiers
- Wire/ACH for setup fees ($8.5K–$125K+) — non-reversible
- Stripe Subscriptions for monthly retainers ($2K–$12K/mo)
- Real ACP checkout sessions (AI agents can initiate payment)
- AP2 wire transfer mandate enforcement for large amounts
- Webhook handler for payment lifecycle events
- Chargeback mitigation: ACH preferred, wire for large, Stripe Radar + Chargeback Protection
- All-sales-final enforcement (ToS + signed SOW gating)

---
*Last updated: 2026-03-03 — Milestone v2.0 started*
