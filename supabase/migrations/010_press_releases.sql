-- ============================================================
-- SECTION 1: press_releases table
-- ============================================================
-- Press releases — drafts, schema markup, wire service distribution records
CREATE TABLE IF NOT EXISTS press_releases (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  client_id      TEXT        NOT NULL,
  title          TEXT        NOT NULL,
  draft_text     TEXT        NOT NULL,
  schema_json    JSONB       DEFAULT '{}'::jsonb,
  video_url      TEXT,
  wire_service   TEXT
                   CHECK (wire_service IN ('business-wire', 'pr-newswire', 'ein-presswire', 'accesswire', 'none')),
  distributed_at TIMESTAMPTZ,
  status         TEXT        NOT NULL DEFAULT 'draft'
                   CHECK (status IN ('draft', 'review', 'approved', 'distributed', 'archived'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_press_releases_client_id ON press_releases(client_id);
CREATE INDEX IF NOT EXISTS idx_press_releases_status    ON press_releases(status);

-- RLS
ALTER TABLE press_releases ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; all other roles denied by default
CREATE POLICY "service_role_all" ON press_releases
  FOR ALL USING (auth.role() = 'service_role');


-- ============================================================
-- SECTION 2: FK patch — blog_posts.authority_map_id → authority_maps.id
-- ============================================================
-- Add FK from blog_posts to authority_maps (deferred until both tables exist).
-- This runs safely after migration 007 (blog_posts) and 008 (authority_maps).
-- The DO block is idempotent — safe to run multiple times.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_blog_posts_authority_map'
      AND table_name = 'blog_posts'
  ) THEN
    ALTER TABLE blog_posts
      ADD CONSTRAINT fk_blog_posts_authority_map
      FOREIGN KEY (authority_map_id) REFERENCES authority_maps(id) ON DELETE SET NULL;
  END IF;
END $$;
