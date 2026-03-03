-- 013_press_releases_phase7_columns.sql
-- Adds Phase 7 columns to press_releases table created in migration 010.
-- Idempotent: uses ADD COLUMN IF NOT EXISTS (PostgreSQL 9.6+).
--
-- Context: Migration 010 created press_releases with:
--   id, created_at, updated_at, client_id, title, draft_text,
--   schema_json, video_url, wire_service, distributed_at, status
-- Phase 7 needs: headline, body, compliance_label, media_files,
--   wire_results, research_context.
--
-- Note: filename is 013 (not 011) because migrations 011 and 012
--   were used for seed data (integrations_catalog + packages).

ALTER TABLE press_releases
  ADD COLUMN IF NOT EXISTS headline         TEXT,
  ADD COLUMN IF NOT EXISTS body             TEXT,
  ADD COLUMN IF NOT EXISTS compliance_label TEXT,
  ADD COLUMN IF NOT EXISTS media_files      JSONB,
  ADD COLUMN IF NOT EXISTS wire_results     JSONB,
  ADD COLUMN IF NOT EXISTS research_context JSONB;

-- Drop wire_service single-value column if present (Phase 7 uses wire_results JSONB array instead).
-- Uses DO block to check existence first — idempotent.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'press_releases'
      AND column_name  = 'wire_service'
  ) THEN
    ALTER TABLE press_releases DROP COLUMN wire_service;
  END IF;
END $$;

-- Index for efficient Phase 7 queries filtering by client + status
CREATE INDEX IF NOT EXISTS idx_press_releases_client_status
  ON press_releases(client_id, status);
