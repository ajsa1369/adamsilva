-- Migration: Add framework column to acra_scans
-- Captures the user's reported tech stack for framework-specific recommendations

ALTER TABLE acra_scans
  ADD COLUMN IF NOT EXISTS framework text;

COMMENT ON COLUMN acra_scans.framework IS 'Tech stack / framework reported by user (e.g. WordPress, Shopify, Next.js)';
