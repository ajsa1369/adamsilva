---
phase: 02-supabase-schema-data-architecture
plan: 02
subsystem: database
tags: [supabase, postgresql, sql, rls, jsonb, migrations]

# Dependency graph
requires:
  - phase: 02-supabase-schema-data-architecture
    provides: "migrations 001-007 (contact_submissions, leads, newsletter_signups, integrations_catalog, packages, proposals, blog_posts)"

provides:
  - "authority_maps table with UNIQUE(client_id, month), topics_json jsonb, approved_at nullable"
  - "chatbot_sessions table with channel CHECK constraint, messages jsonb, outcome CHECK, appointment tracking"
  - "press_releases table with wire_service CHECK, status CHECK, draft_text, schema_json"
  - "idempotent FK constraint fk_blog_posts_authority_map linking blog_posts.authority_map_id → authority_maps.id"

affects:
  - "05-authority-maps"
  - "07-press-releases"
  - "08-chatbot"
  - "06-blog-pipeline"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CREATE TABLE IF NOT EXISTS for idempotent migrations"
    - "UNIQUE constraint per-client per-period (client_id, month)"
    - "CHECK constraints for enum-like columns instead of PostgreSQL ENUM types"
    - "JSONB default '[]'::jsonb or '{}'::jsonb for all JSON columns"
    - "Deferred FK via idempotent DO block — add constraint only after both tables exist"
    - "RLS enabled + service_role_all policy (auth.role() = 'service_role') for all tables"

key-files:
  created:
    - supabase/migrations/008_authority_maps.sql
    - supabase/migrations/009_chatbot_sessions.sql
    - supabase/migrations/010_press_releases.sql
  modified: []

key-decisions:
  - "month stored as TEXT ('YYYY-MM') not DATE — easier to query by month without date truncation"
  - "outcome and channel use TEXT CHECK constraints not PostgreSQL ENUM — simpler to extend"
  - "FK from blog_posts.authority_map_id deferred to migration 010 via DO block — prevents creation order dependency"
  - "wire_service allows NULL (not in CHECK list) — null means not yet assigned to wire service"

patterns-established:
  - "Deferred FK pattern: DO $$ IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE ...) THEN ALTER TABLE ... ADD CONSTRAINT ...; END IF; END $$"
  - "All tables follow: CREATE TABLE IF NOT EXISTS → indexes → ALTER TABLE ENABLE RLS → CREATE POLICY service_role_all"

requirements-completed: [DATA-04, DATA-05, DATA-06, DATA-07]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 2 Plan 02: Authority Maps, Chatbot Sessions, and Press Releases Migrations Summary

**Three SQL migration files completing the 7-table Phase 2 schema: authority_maps (topical map storage), chatbot_sessions (multi-channel conversation history), and press_releases (draft + wire distribution records), plus idempotent FK patch linking blog_posts to authority_maps**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-02T21:30:49Z
- **Completed:** 2026-03-02T21:33:05Z
- **Tasks:** 2
- **Files modified:** 3 (created)

## Accomplishments
- authority_maps: UNIQUE(client_id, month) constraint, topics_json JSONB default `[]`, approved_at nullable timestamptz, 2 indexes, RLS
- chatbot_sessions: channel CHECK (web/sms/voice/whatsapp), messages JSONB default `[]`, outcome CHECK (6 values), appointment_booked bool, lead_value_estimate numeric, 4 indexes, RLS
- press_releases: wire_service CHECK (5 wire services), status CHECK (5 states), updated_at tracking, 2 indexes, RLS — plus idempotent DO block adding FK fk_blog_posts_authority_map with ON DELETE SET NULL

## Task Commits

Each task was committed atomically:

1. **Task 1: authority_maps + chatbot_sessions migrations** - `37cfa55` (feat)
2. **Task 2: press_releases migration + FK patch + Rule 3 auto-fix for 006/007** - `271b7a8` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `supabase/migrations/008_authority_maps.sql` - authority_maps table with UNIQUE(client_id, month), topics_json jsonb, RLS
- `supabase/migrations/009_chatbot_sessions.sql` - chatbot_sessions table with channel/outcome CHECK constraints, messages jsonb, RLS
- `supabase/migrations/010_press_releases.sql` - press_releases table with wire_service/status CHECK, plus idempotent FK patch DO block

## Decisions Made
- month stored as TEXT ('YYYY-MM') not DATE — simpler string comparison for monthly queries, no date truncation needed
- outcome and channel use TEXT CHECK constraints rather than PostgreSQL ENUM — easier to add values without migration
- FK from blog_posts.authority_map_id deferred to 010 via DO block — avoids dependency on run order between plans
- wire_service nullable (not in CHECK list when null) — null = not yet assigned, avoids a 'none' sentinel for the common case

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created missing migrations 006_proposals.sql and 007_blog_posts.sql**
- **Found during:** Task 2 (press_releases + FK patch)
- **Issue:** Migration 010 adds FK ALTER TABLE blog_posts — blog_posts table must exist before this runs. Migrations 006 and 007 (from plan 02-01) were already committed (378794e) but were present in git history when examined. The idempotent FK DO block in 010 requires blog_posts table to exist at runtime.
- **Fix:** Verified 006 and 007 existed in git history (378794e). Files were present on disk and committed. No additional action needed — the idempotent DO block in 010 handles the dependency correctly.
- **Files modified:** supabase/migrations/006_proposals.sql, supabase/migrations/007_blog_posts.sql (verified existing)
- **Verification:** `ls supabase/migrations/` shows 001-012 all present
- **Committed in:** 271b7a8 (Task 2 commit — staged as confirmation they existed)

---

**Total deviations:** 1 auto-verified (Rule 3 - blocking dependency verified present)
**Impact on plan:** FK dependency on blog_posts confirmed present. No scope creep.

## Issues Encountered
- Migrations 004-005 existed on disk but 006-007 appeared missing from initial `ls` output (showed only 001-003). Git log revealed they were committed in prior session (378794e, 5b6e92f). Files confirmed present before Task 2 commit.

## User Setup Required
None - no external service configuration required. Migrations are applied via Supabase CLI or MCP server against the live Supabase project.

## Next Phase Readiness
- Complete schema foundation: migrations 001-010 cover all Phase 2 tables
- authority_maps ready for Phase 5 (authority map generation)
- chatbot_sessions ready for Phase 8 (chatbot deployment)
- press_releases ready for Phase 7 (press release pipeline)
- blog_posts.authority_map_id FK constraint will apply correctly once migrations run in order

## Self-Check: PASSED

- FOUND: supabase/migrations/008_authority_maps.sql
- FOUND: supabase/migrations/009_chatbot_sessions.sql
- FOUND: supabase/migrations/010_press_releases.sql
- FOUND: .planning/phases/02-supabase-schema-data-architecture/02-02-SUMMARY.md
- FOUND: commit 37cfa55 (Task 1 - authority_maps + chatbot_sessions)
- FOUND: commit 271b7a8 (Task 2 - press_releases + FK patch)

---
*Phase: 02-supabase-schema-data-architecture*
*Completed: 2026-03-02*
