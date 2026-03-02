-- Authority maps — monthly topical authority maps per client
-- One map per client per month; tracks ranked topics with citation opportunity scores.
CREATE TABLE IF NOT EXISTS authority_maps (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  client_id    TEXT        NOT NULL,
  month        TEXT        NOT NULL,
  topics_json  JSONB       NOT NULL DEFAULT '[]'::jsonb,
  approved_at  TIMESTAMPTZ,
  UNIQUE (client_id, month)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_authority_maps_client_id ON authority_maps(client_id);
CREATE INDEX IF NOT EXISTS idx_authority_maps_month     ON authority_maps(month);

-- RLS
ALTER TABLE authority_maps ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; all other roles denied by default
CREATE POLICY "service_role_all" ON authority_maps
  FOR ALL USING (auth.role() = 'service_role');
