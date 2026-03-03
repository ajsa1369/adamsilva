---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Stripe Payment Integration
status: defining_requirements
last_updated: "2026-03-03T15:00:00.000Z"
progress:
  total_phases: 0
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
---

# GSD State — ASC Commercial Platform

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-03)

**Core value:** Every prospect gets an instant, accurate, branded proposal — no sales calls required to qualify.
**Current focus:** Milestone v2.0 — Stripe Payment Integration (defining requirements)

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-03-03 — Milestone v2.0 started

## Accumulated Context

### v1.0 Milestone Complete (Phases 1-9)
- 37 plans executed across 9 phases
- All server-side (no 'use client' in Phase 9 pages)
- Pushed to ASCv2 branch, Vercel preview deployed
- Phase 10 (MCP Server) deferred — ACP/AP2 work folded into v2.0 Stripe milestone

### Key Architecture for v2.0
- Existing ACP endpoints: /api/acp/negotiate, /api/acp/checkout (currently stub)
- Existing AP2 endpoint: /.well-known/ap2 (currently static)
- Existing UCP endpoint: /api/ucp (static)
- Package data: lib/data/packages.ts (6 tiers with exact pricing)
- Pricing engine: lib/pricing/calculator.ts (setup + monthly calculation)
- Proposal flow: /get-started → intake agent → proposal → PDF → email
- Supabase proposals table: stores tier, pricing, prospect info

### Pending Todos
None yet.

### Blockers/Concerns
- Stripe account needs to be created/configured
- Stripe API keys needed in .env.local
- Wire transfer requires Stripe Treasury or manual process
- Chargeback Protection is a paid Stripe add-on (~0.4% per transaction)
