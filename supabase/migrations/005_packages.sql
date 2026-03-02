-- Service packages offered by Adam Silva Consulting
-- Slugs: 'bronze', 'silver', 'gold', 'core', 'shopify-starter', 'shopify-growth'
CREATE TABLE IF NOT EXISTS packages (
  id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT          NOT NULL,
  slug           TEXT          NOT NULL UNIQUE,
  base_setup     NUMERIC(10,2) NOT NULL,
  base_monthly   NUMERIC(10,2) NOT NULL,
  tier1_slots    INTEGER       NOT NULL DEFAULT 0,
  tier2_slots    INTEGER       NOT NULL DEFAULT 0,
  tier3_slots    INTEGER       NOT NULL DEFAULT 0,
  features_json  JSONB         NOT NULL DEFAULT '[]'::jsonb,
  is_legacy_only BOOLEAN       NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_packages_slug           ON packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_is_legacy_only ON packages(is_legacy_only);

-- RLS
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; all other roles denied by default
CREATE POLICY "service_role_all" ON packages
  FOR ALL USING (auth.role() = 'service_role');
