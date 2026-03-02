-- Chatbot sessions — full conversation history per client channel
-- Tracks messages, outcome, appointment bookings, and lead value estimates.
CREATE TABLE IF NOT EXISTS chatbot_sessions (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  client_id           TEXT        NOT NULL,
  channel             TEXT        NOT NULL DEFAULT 'web'
                        CHECK (channel IN ('web', 'sms', 'voice', 'whatsapp')),
  session_start       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  messages            JSONB       NOT NULL DEFAULT '[]'::jsonb,
  outcome             TEXT
                        CHECK (outcome IN ('qualified', 'unqualified', 'escalated', 'abandoned', 'booked', 'converted')),
  crm_contact_id      TEXT,
  appointment_booked  BOOLEAN     NOT NULL DEFAULT false,
  lead_value_estimate NUMERIC(10,2)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_client_id  ON chatbot_sessions(client_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_channel    ON chatbot_sessions(channel);
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_outcome    ON chatbot_sessions(outcome);
CREATE INDEX IF NOT EXISTS idx_chatbot_sessions_created_at ON chatbot_sessions(created_at DESC);

-- RLS
ALTER TABLE chatbot_sessions ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; all other roles denied by default
CREATE POLICY "service_role_all" ON chatbot_sessions
  FOR ALL USING (auth.role() = 'service_role');
