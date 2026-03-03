---
milestone: v2.0
milestone_name: Stripe Payment Integration
total_phases: 4
phase_range: 10-13
---

# Roadmap: ASC Commercial Platform

## Milestones

- [x] **v1.0 Commercial Platform** - Phases 1-9 (shipped 2026-03-03)
- [ ] **v2.0 Stripe Payment Integration** - Phases 10-13 (in progress)

## Phases

<details>
<summary>v1.0 Commercial Platform (Phases 1-9) - SHIPPED 2026-03-03</summary>

### Phase 1: Design System & UI Foundation
**Goal**: Every developer (Claude) building subsequent phases has a consistent, tested component library to draw from — no one-off styling decisions, no visual inconsistency
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03
**Success Criteria** (what must be TRUE):
  1. Developer can import design tokens from `lib/design-tokens.ts` and apply color, typography, and spacing values without hardcoding hex or pixel values anywhere
  2. All 9 components render correctly in isolation with no TypeScript errors
  3. All components render correctly in light mode with no dark mode styles or selectors present
  4. All components display correctly on a 375px mobile viewport
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Design tokens + primitive components
- [x] 01-02-PLAN.md — Composite components + barrel export

### Phase 2: Supabase Schema & Data Architecture
**Goal**: The database is the source of truth for all commercial operations
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07
**Plans**: 6 plans

Plans:
- [x] 02-01-PLAN.md — Migration files 004-007
- [x] 02-02-PLAN.md — Migration files 008-010
- [x] 02-03-PLAN.md — Seed migration files 011-012
- [x] 02-04-PLAN.md — Edge function scaffolds
- [ ] 02-05-PLAN.md — Apply migrations to live Supabase
- [ ] 02-06-PLAN.md — Deploy edge functions

### Phase 3: Integration Catalog & Pricing Engine
**Goal**: The pricing engine is a reliable, tested TypeScript library
**Depends on**: Phase 2
**Requirements**: PRICE-01, PRICE-02, PRICE-03, PRICE-04
**Plans**: 3 plans

Plans:
- [x] 03-01-PLAN.md — Types + Integration catalog
- [x] 03-02-PLAN.md — Pricing calculator + tier selector
- [x] 03-03-PLAN.md — Vitest setup + unit tests

### Phase 4: Agentic Intake Agent
**Goal**: Prospect completes qualification and receives a personalized proposal with no human involvement
**Depends on**: Phase 3
**Requirements**: INTAKE-01 through INTAKE-09
**Plans**: 5 plans

Plans:
- [x] 04-01-PLAN.md — Packages + types + model + tools
- [x] 04-02-PLAN.md — Streaming intake agent API route
- [x] 04-03-PLAN.md — Conversational intake UI
- [x] 04-04-PLAN.md — Supabase edge functions
- [x] 04-05-PLAN.md — PDF + followup + cron

### Phase 5: Topical Authority Map Agent
**Goal**: Automatic monthly content calendar per client without manual research
**Depends on**: Phase 4
**Requirements**: AUTHMAP-01 through AUTHMAP-04
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — TypeScript contracts + Gemini research pipeline
- [x] 05-02-PLAN.md — API routes + cron + config

### Phase 6: Insight Post Production Pipeline
**Goal**: Full insight post production cycle from a single API call
**Depends on**: Phase 5
**Requirements**: BLOG-01 through BLOG-06
**Plans**: 4 plans

Plans:
- [x] 06-01-PLAN.md — Image pipeline + video pipeline
- [x] 06-02-PLAN.md — Schema assembler + orchestration + cron
- [x] 06-03-PLAN.md — Google video sitemap + robots.txt
- [x] 06-04-PLAN.md — AI draft generator + publishing cron

### Phase 7: Press Release Engine
**Goal**: Complete, compliant, wire-ready press release with video sidecar from a single topic input
**Depends on**: Phase 6
**Requirements**: PR-01 through PR-04
**Plans**: 5 plans

Plans:
- [x] 07-01-PLAN.md — TypeScript contracts + Supabase migration
- [x] 07-02-PLAN.md — Draft generator + compliance module
- [x] 07-03-PLAN.md — Schema builder + media pipeline
- [x] 07-04-PLAN.md — Researcher + wire adapters + distributor
- [x] 07-05-PLAN.md — API route orchestration + env vars

### Phase 8: Site Chatbot Module
**Goal**: Deployable CRM-connected chatbot on any client site via a single script tag
**Depends on**: Phase 3
**Requirements**: CHAT-01 through CHAT-05
**Plans**: 6 plans

Plans:
- [x] 08-01-PLAN.md — TypeScript contracts + model + embedder + retriever
- [x] 08-02-PLAN.md — Supabase pgvector migration + knowledge seeder
- [x] 08-03-PLAN.md — Tools + CRM adapters
- [x] 08-04-PLAN.md — Streaming chatbot API route + session persistence
- [x] 08-05-PLAN.md — Multi-channel delivery + tier enforcement
- [x] 08-06-PLAN.md — ChatWidget + embed script + widget page

### Phase 9: Package Pages & Marketing Site
**Goal**: Prospect can understand pricing, check platform compatibility, calculate ROI, and reach the intake agent
**Depends on**: Phase 4, Phase 8
**Requirements**: PKG-01 through PKG-05
**Plans**: 3 plans

Plans:
- [x] 09-01-PLAN.md — Package listing + tier detail pages
- [x] 09-02-PLAN.md — Platform checker + ROI calculator
- [x] 09-03-PLAN.md — JSON-LD schema + final QA

</details>

## v2.0 Stripe Payment Integration

**Milestone Goal:** Wire real payment processing into the ASC platform so prospects can pay setup fees (wire/ACH) and monthly retainers (Stripe Subscriptions) — with ACP/AP2 protocol integration for AI agent transactions.

**Phase Numbering:**
- Integer phases (10-13): Planned milestone v2.0 work
- Decimal phases (e.g., 11.1): Urgent insertions only

Note: v1.0 Phase 10 (Vercel MCP Server) was deferred — ACP/AP2 protocol work folded into v2.0 Phase 13.

- [ ] **Phase 10: Stripe Foundation** - SDK singleton, webhook handler with signature verification, idempotency table migration, env var validation, service Supabase client, Products/Prices catalog
- [ ] **Phase 11: Payment State Machine** - Supabase orders/subscriptions/stripe_events migrations, proposals schema updates, Stripe Customer creation, webhook handler implementations for all event types
- [ ] **Phase 12: Checkout + Chargeback Defense + UI** - Checkout API with ACH/wire/card routing, SOW gate, ToS capture, subscription billing, Stripe Radar config, all checkout UI pages
- [ ] **Phase 13: Protocol Integration** - Real ACP checkout sessions, AP2 wire mandate enforcement, UCP discovery update, agent auth validation, rate limiting

## Phase Overview

| Phase | Name | Est. Plans | Requirements | Status |
|-------|------|------------|--------------|--------|
| 10 | Stripe Foundation | ~3 | STRIPE-01, STRIPE-02, STRIPE-03, STRIPE-04, HOOK-01, HOOK-02, HOOK-04 | Not started |
| 11 | Payment State Machine | ~3 | STATE-01, STATE-02, STATE-03, STATE-04, PAY-05, HOOK-03 | Not started |
| 12 | Checkout + Chargeback Defense + UI | ~4 | PAY-01, PAY-02, PAY-03, PAY-04, PAY-06, DEFEND-01, DEFEND-02, DEFEND-03, DEFEND-04, UI-01, UI-02, UI-03, UI-04, UI-05 | Not started |
| 13 | Protocol Integration | ~2 | PROTO-01, PROTO-02, PROTO-03, PROTO-04, PROTO-05 | Not started |

## Phase Details

### Phase 10: Stripe Foundation
**Goal**: All Stripe infrastructure exists and is verified — SDK singleton, webhook endpoint, idempotency table, env var validation, and service Supabase client — so every downstream phase can import and use Stripe safely
**Depends on**: v1.0 complete (Phases 1-9 shipped)
**Requirements**: STRIPE-01, STRIPE-02, STRIPE-03, STRIPE-04, HOOK-01, HOOK-02, HOOK-04
**Success Criteria** (what must be TRUE):
  1. `lib/stripe/client.ts` exports a Stripe singleton that fails loudly at import time if `STRIPE_SECRET_KEY` is missing or empty — API version is pinned and never defaults to latest
  2. `lib/stripe/products.ts` exports a typed map of all 6 package slugs to their Stripe Product/Price IDs (one-time setup Price + recurring monthly Price per tier), and the corresponding Products/Prices exist in Stripe Dashboard test mode
  3. `/api/stripe/webhook` accepts a POST with a valid Stripe signature and returns 200, rejects invalid signatures with 400, and logs the event ID to the `stripe_events` Supabase table — duplicate event IDs are silently skipped with 200 (no error)
  4. `lib/supabase/service.ts` exports a cookie-free service-role Supabase client that can read/write tables from webhook handlers and background processes without a user session
  5. Webhook route explicitly uses `export const runtime = 'nodejs'` (not Edge) and reads raw body via `request.text()` — never `request.json()`
**Plans**: TBD

Plans:
- [ ] 10-01: Stripe SDK singleton, types, env var validation, service Supabase client
- [ ] 10-02: Stripe Products/Prices catalog (Dashboard setup guide + products.ts typed map)
- [ ] 10-03: Webhook endpoint with signature verification, stripe_events idempotency migration

---

### Phase 11: Payment State Machine
**Goal**: Supabase schema fully supports payment and subscription lifecycle tracking — orders, subscriptions, and stripe_events tables, plus proposals table updates — so checkout routes have a complete data layer to write against and webhooks have somewhere to record state transitions
**Depends on**: Phase 10
**Requirements**: STATE-01, STATE-02, STATE-03, STATE-04, PAY-05, HOOK-03
**Success Criteria** (what must be TRUE):
  1. Supabase `orders` table exists with status enum (`pending`, `processing`, `confirmed`, `failed`, `refunded`, `wire_pending`) and links to proposal ID and Stripe PaymentIntent ID — RLS enabled
  2. Supabase `subscriptions` table exists with status enum (`active`, `past_due`, `canceled`, `paused`) and links to Stripe Subscription ID and Customer ID — RLS enabled
  3. Supabase `proposals` table has `payment_status`, `stripe_customer_id`, and `stripe_payment_intent_id` columns — proposals remain the canonical price source for all checkout operations
  4. Webhook handlers update order and subscription status on all key Stripe events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted` — each handler is idempotent via stripe_events check
  5. A Stripe Customer record is created and `stripe_customer_id` is stored in Supabase when a prospect accepts a proposal — and no client onboarding triggers until payment status reaches `confirmed`
**Plans**: TBD

Plans:
- [ ] 11-01: Supabase migrations (orders, subscriptions tables + proposals column additions)
- [ ] 11-02: Stripe Customer creation flow + payment state machine logic
- [ ] 11-03: Webhook handler implementations for all 6 event types

---

### Phase 12: Checkout + Chargeback Defense + UI
**Goal**: Prospects can pay for ASC packages through a complete checkout flow — ACH for standard amounts, wire instructions for $25K+, card with 4% surcharge — with SOW signing and ToS acceptance enforced before any payment session is created, and all checkout UI pages are live and functional
**Depends on**: Phase 11
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, PAY-06, DEFEND-01, DEFEND-02, DEFEND-03, DEFEND-04, UI-01, UI-02, UI-03, UI-04, UI-05
**Success Criteria** (what must be TRUE):
  1. Prospect on a package page can click "Start Payment" and is required to digitally sign a Statement of Work before any Stripe session is created — SOW acceptance timestamp is stored in Supabase
  2. Checkout flow displays payment method options with clear pricing: ACH (standard price), card (+4% surcharge itemized before checkout), or wire transfer instructions (for amounts $25K+) — routing enforced by amount thresholds
  3. Prospect must acknowledge "All Sales Final - No Refunds for Services Rendered" Terms of Service before payment proceeds — ToS acceptance timestamp and IP stored in both Supabase and Stripe PaymentIntent metadata
  4. After setup fee payment reaches `confirmed` status, prospect can start a Stripe Subscription for their monthly retainer — subscription is never created before setup fee confirmation
  5. Payment success page (`/payment/success`) confirms receipt with next steps; payment failure/cancellation page (`/payment/canceled`) offers retry options; Stripe Customer Portal link is available for subscription management (update payment method, view invoices)
**Plans**: TBD

Plans:
- [ ] 12-01: SOW gate and ToS capture (chargeback defense layer)
- [ ] 12-02: Checkout API — ACH PaymentIntents, wire routing, card surcharge, subscription creation
- [ ] 12-03: Checkout UI pages (package CTAs, payment method selection, success, canceled, portal link)
- [ ] 12-04: Stripe Radar and Chargeback Protection configuration + setup guide

---

### Phase 13: Protocol Integration
**Goal**: ACP, AP2, and UCP protocol endpoints are upgraded from stubs to real payment initiators — AI agents can discover available payment methods via UCP, initiate Stripe Checkout Sessions via ACP, and receive wire transfer instructions via AP2 for large amounts — with authentication and rate limiting to prevent abuse
**Depends on**: Phase 12
**Requirements**: PROTO-01, PROTO-02, PROTO-03, PROTO-04, PROTO-05
**Success Criteria** (what must be TRUE):
  1. `/api/acp/checkout` creates real Stripe Checkout Sessions (or returns wire instructions for amounts above $25K) when called with a valid agent bearer token — unauthenticated requests are rejected with 401
  2. `/.well-known/ucp` returns real payment methods (`stripe_checkout`, `ach_direct_debit`, `wire_transfer`) and supported currencies (USD) — replacing the current static stub data
  3. `/.well-known/ap2` returns structured wire transfer instructions (bank name, routing number, account number, reference format) for amounts above the $25K threshold — enforcing AP2 mandate
  4. ACP checkout endpoint has rate limiting middleware that prevents abuse by AI agents — excessive requests return 429
  5. ACP checkout looks up price from Supabase proposals table (never from request body `cart.total`) and the full flow from ACP request to Stripe session creation to webhook confirmation works end-to-end
**Plans**: TBD

Plans:
- [ ] 13-01: ACP checkout upgrade (real Stripe sessions, agent auth validation, rate limiting)
- [ ] 13-02: UCP discovery update + AP2 wire mandate endpoint

---

## Progress

**Execution Order:** 10 -> 11 -> 12 -> 13

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|---------------|--------|-----------|
| 1. Design System | v1.0 | 2/2 | Complete | 2026-03-02 |
| 2. Supabase Schema | v1.0 | 4/6 | Complete | 2026-03-03 |
| 3. Pricing Engine | v1.0 | 3/3 | Complete | 2026-03-02 |
| 4. Intake Agent | v1.0 | 5/5 | Complete | 2026-03-03 |
| 5. Authority Map | v1.0 | 2/2 | Complete | 2026-03-03 |
| 6. Insight Pipeline | v1.0 | 4/4 | Complete | 2026-03-03 |
| 7. Press Release | v1.0 | 5/5 | Complete | 2026-03-03 |
| 8. Site Chatbot | v1.0 | 6/6 | Complete | 2026-03-03 |
| 9. Package Pages | v1.0 | 3/3 | Complete | 2026-03-03 |
| 10. Stripe Foundation | v2.0 | 0/3 | Not started | - |
| 11. Payment State Machine | v2.0 | 0/3 | Not started | - |
| 12. Checkout + Defense + UI | v2.0 | 0/4 | Not started | - |
| 13. Protocol Integration | v2.0 | 0/2 | Not started | - |

## Coverage

| Requirement | Phase | Status |
|-------------|-------|--------|
| STRIPE-01 | 10 | Pending |
| STRIPE-02 | 10 | Pending |
| STRIPE-03 | 10 | Pending |
| STRIPE-04 | 10 | Pending |
| HOOK-01 | 10 | Pending |
| HOOK-02 | 10 | Pending |
| HOOK-04 | 10 | Pending |
| STATE-01 | 11 | Pending |
| STATE-02 | 11 | Pending |
| STATE-03 | 11 | Pending |
| STATE-04 | 11 | Pending |
| PAY-05 | 11 | Pending |
| HOOK-03 | 11 | Pending |
| PAY-01 | 12 | Pending |
| PAY-02 | 12 | Pending |
| PAY-03 | 12 | Pending |
| PAY-04 | 12 | Pending |
| PAY-06 | 12 | Pending |
| DEFEND-01 | 12 | Pending |
| DEFEND-02 | 12 | Pending |
| DEFEND-03 | 12 | Pending |
| DEFEND-04 | 12 | Pending |
| UI-01 | 12 | Pending |
| UI-02 | 12 | Pending |
| UI-03 | 12 | Pending |
| UI-04 | 12 | Pending |
| UI-05 | 12 | Pending |
| PROTO-01 | 13 | Pending |
| PROTO-02 | 13 | Pending |
| PROTO-03 | 13 | Pending |
| PROTO-04 | 13 | Pending |
| PROTO-05 | 13 | Pending |

**v2.0 requirements: 32 total | Mapped: 32 | Unmapped: 0**

## Research Flags

- **Phase 10, 11, 12**: Standard Stripe patterns. Skip `/gsd:research-phase` — official Stripe docs and research/SUMMARY.md are sufficient.
- **Phase 13**: LOW confidence on ACP-to-Stripe bridging (novel, no prior art). Run `/gsd:research-phase 13` before planning. Agent auth mechanism, AP2 wire instruction format, and rate limiting strategy need deeper design.

---
*Roadmap created: 2026-03-02 — Milestone v1.0 — 42 requirements across 10 phases*
*v2.0 roadmap added: 2026-03-03 — 32 requirements across 4 phases (10-13)*
*Last updated: 2026-03-03*
