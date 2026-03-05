-- Migration 019: ACRA consent log
-- Stores explicit marketing consent records for CAN-SPAM / TCPA / GDPR compliance.
-- Every signup captures: email, phone, IP, user agent, consent text, timestamp.

CREATE TABLE IF NOT EXISTS acra_consent_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text NOT NULL,
  phone           text NOT NULL,
  consent_text    text NOT NULL,
  consented_at    timestamptz NOT NULL DEFAULT now(),
  ip_address      text,
  user_agent      text,
  supabase_user_id uuid,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Index for lookups by email or user
CREATE INDEX IF NOT EXISTS acra_consent_log_email_idx ON acra_consent_log (email);
CREATE INDEX IF NOT EXISTS acra_consent_log_user_idx  ON acra_consent_log (supabase_user_id);

-- RLS: service_role only — never expose consent records to client
ALTER TABLE acra_consent_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only" ON acra_consent_log
  USING (false)
  WITH CHECK (false);

COMMENT ON TABLE acra_consent_log IS
  'Legal consent records for ACRA signups. Stores IP, phone, consent text, and timestamp for CAN-SPAM/TCPA/GDPR compliance.';
