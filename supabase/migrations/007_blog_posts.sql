-- Blog posts — per-client blog post metadata, linking to Strapi CMS and authority maps
-- NOTE: authority_map_id column is added here without FK constraint.
--       FK to authority_maps(id) is added in migration 010 (after authority_maps table exists).
CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  client_id        TEXT        NOT NULL,
  title            TEXT        NOT NULL,
  slug             TEXT        NOT NULL,
  status           TEXT        NOT NULL DEFAULT 'draft'
                     CHECK (status IN ('draft', 'pending_review', 'scheduled', 'published', 'archived')),
  authority_map_id UUID,
  published_at     TIMESTAMPTZ,
  schema_json      JSONB       DEFAULT '{}'::jsonb,
  images           JSONB       DEFAULT '[]'::jsonb,
  video_url        TEXT,
  strapi_id        TEXT,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, slug)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_client_id        ON blog_posts(client_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status           ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_authority_map_id ON blog_posts(authority_map_id);

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; all other roles denied by default
CREATE POLICY "service_role_all" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');
