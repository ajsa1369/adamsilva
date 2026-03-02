---
phase: 02-supabase-schema-data-architecture
plan: 01
subsystem: database
tags: [supabase, postgres, sql, rls, migrations]

# Dependency graph
requires: []
provides:
  - "integrations_catalog table: tier/cost columns, UNIQUE(name), RLS service_role_all"
  - "packages table: slug UNIQUE, tier slots, features_json jsonb, is_legacy_only, RLS"
  - "proposals table: integrations_detected/goals jsonb, status CHECK, RLS"
  - "blog_posts table: client_id text, schema_json/images jsonb, status CHECK, UNIQUE(client_id,slug), RLS"
affects: [02-02, 02-03, 03-pricing-engine, 04-intake-agent, 06-blog-engine]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CREATE TABLE IF NOT EXISTS for idempotent migrations"
    - "NUMERIC(10,2) for all monetary columns"
    - "JSONB with default '[]'::jsonb for array columns, '{}'::jsonb for object columns"
    - "service_role_all RLS policy via auth.role() = 'service_role'"
    - "status TEXT with CHECK constraint for state machine columns"

key-files:
  created:
    - supabase/migrations/004_integrations_catalog.sql
    - supabase/migrations/005_packages.sql
    - supabase/migrations/006_proposals.sql
    - supabase/migrations/007_blog_posts.sql
  modified:
    - .gitignore

key-decisions:
  - "blog_posts.authority_map_id has no FK constraint — authority_maps created in migration 008 (Plan 02); FK added post-creation"
  - "client_id in blog_posts is TEXT (not UUID FK) — no clients table yet, avoids premature FK dependency"
  - "supabase/migrations/*.sql files are now git-tracked via !/supabase/ negation in .gitignore"

patterns-established:
  - "Migration pattern: table → indexes → ALTER ENABLE RLS → CREATE POLICY service_role_all"
  - "JSONB columns: arrays default '[]'::jsonb, objects default '{}'::jsonb"
  - "Deferred FK pattern: add nullable UUID column, add FK constraint in later migration after referenced table exists"

requirements-completed: [DATA-01, DATA-02, DATA-03, DATA-04, DATA-07]

# Metrics
duration: 1min
completed: 2026-03-02
---

# Phase 02 Plan 01: Supabase Schema — Core Tables Summary

**Four SQL migrations creating integrations_catalog, packages, proposals, and blog_posts with NUMERIC pricing columns, JSONB arrays, status CHECK constraints, and RLS service_role_all policies**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-02T21:31:06Z
- **Completed:** 2026-03-02T21:32:00Z
- **Tasks:** 2
- **Files modified:** 5 (4 migrations + .gitignore)

## Accomplishments

- 004_integrations_catalog.sql: tier CHECK(1,2,3), setup_cost/monthly_cost NUMERIC(10,2), UNIQUE(name), 3 indexes, RLS
- 005_packages.sql: slug UNIQUE, tier1/2/3_slots INTEGER, features_json JSONB, is_legacy_only BOOLEAN, RLS
- 006_proposals.sql: integrations_detected/goals JSONB NOT NULL DEFAULT '[]', status CHECK(6 values), 3 indexes, RLS
- 007_blog_posts.sql: client_id TEXT (no FK), schema_json/images JSONB, status CHECK(5 values), UNIQUE(client_id,slug), RLS

## Task Commits

Each task was committed atomically:

1. **Task 1: migrations 004 + 005** - `b6f469f` (feat) — integrations_catalog and packages
2. **Task 2: migrations 006 + 007** - `378794e` (feat) — proposals and blog_posts

## Files Created/Modified

- `supabase/migrations/004_integrations_catalog.sql` - integrations_catalog table with tier/cost pricing schema
- `supabase/migrations/005_packages.sql` - packages table with 6-slug system and tier slot counts
- `supabase/migrations/006_proposals.sql` - proposals table with JSONB integrations/goals and status machine
- `supabase/migrations/007_blog_posts.sql` - blog_posts table with client_id text, deferred authority_maps FK
- `.gitignore` - Added !/supabase/ negation to unblock *.sql files from PostgreSQL dump pattern

## Decisions Made

- blog_posts.authority_map_id has no FK constraint — the authority_maps table is created in migration 008 (Plan 02). A subsequent migration adds the FK after both tables exist to avoid ordering dependency.
- client_id in blog_posts is TEXT (not UUID FK) — no clients table exists yet, keeps migration standalone without premature structural coupling.
- supabase/migrations/ files are now tracked in git via !/supabase/ negation override in .gitignore.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed .gitignore blocking supabase/migrations/ SQL files**
- **Found during:** Task 1 (committing 004_integrations_catalog.sql)
- **Issue:** The comprehensive .gitignore template included `**/*.sql` under the `# PostgreSQL` section, which blocked all .sql files from being tracked by git. Git rejected `git add` with "paths are ignored by .gitignore".
- **Fix:** Added `!/supabase/` and `!/supabase/**` negation block at the bottom of .gitignore (same pattern as the existing `!/lib/` fix for the Python lib/ issue).
- **Files modified:** `.gitignore`
- **Verification:** `git add supabase/migrations/004_integrations_catalog.sql` succeeded after fix; files staged as `A` (new file).
- **Committed in:** `b6f469f` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Fix was necessary for git tracking of all migration files — no scope creep, identical approach to the pre-existing lib/ fix.

## Issues Encountered

- 006_proposals.sql and 007_blog_posts.sql already existed on disk from a prior session (migrations created ahead of schedule). Both files were schema-correct and matched plan requirements exactly — committed as-is with no changes needed.

## Next Phase Readiness

- All 4 tables ready for Plan 02 (authority_maps, chatbot_sessions) and Plan 03 (seed data)
- FK from blog_posts.authority_map_id to authority_maps.id will be added after migration 008 in Plan 02
- supabase/migrations/ is now fully git-tracked — no further .gitignore issues expected for subsequent migration plans

---
*Phase: 02-supabase-schema-data-architecture*
*Completed: 2026-03-02*
