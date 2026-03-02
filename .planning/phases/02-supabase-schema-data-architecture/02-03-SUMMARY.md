---
phase: 02-supabase-schema-data-architecture
plan: 03
subsystem: database
tags: [supabase, postgresql, sql, seed-data, integrations-catalog, packages, pricing-engine]

# Dependency graph
requires:
  - phase: 02-supabase-schema-data-architecture (plan 01)
    provides: integrations_catalog table (004) and packages table (005) that receive this seed data
provides:
  - 53 integration tool rows in integrations_catalog across 8 categories and 3 tiers
  - 6 package rows in packages table with locked pricing, slot counts, and features_json
  - Idempotent seed data: ON CONFLICT DO NOTHING allows re-running without duplicates
affects: [phase-03-pricing-engine, phase-04-intake-agent, phase-05-content-pipeline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "INSERT INTO ... ON CONFLICT (constraint) DO NOTHING for idempotent SQL seeds"
    - "::jsonb cast for JSONB literal arrays in PostgreSQL INSERT statements"
    - "Multi-row INSERT VALUES syntax for efficient bulk seed data"

key-files:
  created:
    - supabase/migrations/011_seed_integrations_catalog.sql
    - supabase/migrations/012_seed_packages.sql
  modified: []

key-decisions:
  - "Tier 1 tools: setup_cost=750, monthly_cost=150 (pre-built connectors)"
  - "Tier 2 tools: setup_cost=1500, monthly_cost=250 (custom REST mapping)"
  - "Tier 3 tools: setup_cost=4000, monthly_cost=500 (legacy/no-API)"
  - "ActiveCampaign listed twice: once under crm (Tier 1, pre-built) and once as ActiveCampaign Email under email (Tier 2) to reflect dual-mode usage"
  - "Shopify seeded as Tier 2 under platform category (limited API for agentic protocols)"
  - "Core package base_monthly=0 — retainer is negotiated separately per client"
  - "Shopify Starter and Shopify Growth have is_legacy_only=true — not offered to headless clients"

patterns-established:
  - "Seed migrations use ON CONFLICT on unique constraint columns (name for integrations_catalog, slug for packages)"
  - "JSONB arrays in seeds cast explicitly with ::jsonb to ensure correct type storage"

requirements-completed: [DATA-01, DATA-02]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 2 Plan 03: Supabase Seed Data Summary

**53 integration tools seeded across 8 categories/3 tiers and 6 packages seeded with locked slot counts, pricing, and JSONB feature arrays — pricing engine (Phase 3) can now resolve any tool by name and retrieve tier/cost.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-02T21:30:54Z
- **Completed:** 2026-03-02T21:32:55Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Migration 011 seeds 53 rows into integrations_catalog covering CRM (10 tools), booking (10), email (7), payment (6), helpdesk (4), accounting (4), ERP (4), and platform (8)
- Migration 012 seeds 6 package rows with exact slot counts and pricing from CONTEXT.md: Bronze/Silver/Gold/Core/Shopify Starter/Shopify Growth
- Both files are fully idempotent via ON CONFLICT DO NOTHING — safe to re-run without duplicating rows

## Task Commits

Each task was committed atomically:

1. **Task 1: Write migration 011 — integrations_catalog seed (53 tools)** - `5b6e92f` (feat)
2. **Task 2: Write migration 012 — packages seed (6 packages)** - `6ced837` (feat)

**Plan metadata:** (included in final docs commit)

## Files Created/Modified
- `supabase/migrations/011_seed_integrations_catalog.sql` — 53 INSERT rows across 8 tool categories (crm, booking, email, payment, helpdesk, accounting, erp, platform) with tier-based cost mapping; ON CONFLICT (name) DO NOTHING
- `supabase/migrations/012_seed_packages.sql` — 6 package rows with locked setup/monthly pricing, tier slot counts, JSONB feature arrays cast with ::jsonb, is_legacy_only=true for shopify-* rows; ON CONFLICT (slug) DO NOTHING

## Decisions Made
- ActiveCampaign appears in both crm (Tier 1, pre-built, full CRM mode) and as "ActiveCampaign Email" in email (Tier 2, custom-rest, email-only mode) — different name means no UNIQUE conflict
- Shopify seeded under platform category as Tier 2 (limited API) rather than Tier 1, per CONTEXT.md specification
- Core package base_monthly=0.00 as specified — the actual retainer is negotiated separately and stored in a future clients table

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required. Migrations must be applied to Supabase via CLI (`supabase db push`) or SQL editor before seed data is live.

## Next Phase Readiness
- integrations_catalog and packages seed data ready for Phase 3 pricing engine queries
- Pricing engine can query: `SELECT * FROM integrations_catalog WHERE name = 'HubSpot'` to get tier=1, setup_cost=750, monthly_cost=150
- Pricing engine can query: `SELECT * FROM packages WHERE slug = 'gold'` to get tier1_slots=12, tier2_slots=3, tier3_slots=1
- Migrations must be applied to Supabase (not yet executed — SQL files written only)

## Self-Check: PASSED

- FOUND: supabase/migrations/011_seed_integrations_catalog.sql
- FOUND: supabase/migrations/012_seed_packages.sql
- FOUND: .planning/phases/02-supabase-schema-data-architecture/02-03-SUMMARY.md
- FOUND commit: 5b6e92f (Task 1 — integrations_catalog seed)
- FOUND commit: 6ced837 (Task 2 — packages seed)

---
*Phase: 02-supabase-schema-data-architecture*
*Completed: 2026-03-02*
