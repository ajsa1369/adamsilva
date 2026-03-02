-- Integrations catalog — every tool Adam Silva integrates with, tier pricing, and metadata
CREATE TABLE IF NOT EXISTS integrations_catalog (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT         NOT NULL,
  category       TEXT         NOT NULL CHECK (category IN ('crm', 'booking', 'email', 'payment', 'helpdesk', 'accounting', 'platform', 'erp')),
  tier           INTEGER      NOT NULL CHECK (tier IN (1, 2, 3)),
  setup_cost     NUMERIC(10,2) NOT NULL,    -- Tier 1=$750, Tier 2=$1500, Tier 3=$4000
  monthly_cost   NUMERIC(10,2) NOT NULL,    -- Tier 1=$150, Tier 2=$250, Tier 3=$500
  api_available  BOOLEAN      NOT NULL DEFAULT true,
  connector_type TEXT,                       -- 'pre-built', 'custom-rest', 'legacy'
  notes          TEXT,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE (name)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_integrations_catalog_tier      ON integrations_catalog(tier);
CREATE INDEX IF NOT EXISTS idx_integrations_catalog_category  ON integrations_catalog(category);
CREATE INDEX IF NOT EXISTS idx_integrations_catalog_name      ON integrations_catalog(name);

-- RLS
ALTER TABLE integrations_catalog ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; all other roles denied by default
CREATE POLICY "service_role_all" ON integrations_catalog
  FOR ALL USING (auth.role() = 'service_role');
