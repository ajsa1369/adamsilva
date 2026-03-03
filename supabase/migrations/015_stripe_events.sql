-- 015_stripe_events.sql
-- Idempotency table for Stripe webhook events.
-- Prevents duplicate processing when Stripe retries webhook delivery.
-- Service-role access only — public users cannot read/write this table.

CREATE TABLE IF NOT EXISTS stripe_events (
  event_id    TEXT        PRIMARY KEY,                      -- Stripe event ID (evt_...)
  event_type  TEXT        NOT NULL,                         -- e.g., 'payment_intent.succeeded'
  payload     JSONB       NOT NULL,                         -- Full event payload for debugging and audit
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for cleanup queries (prune events older than 90 days)
CREATE INDEX IF NOT EXISTS idx_stripe_events_created_at
  ON stripe_events(created_at);

-- RLS: service role only — webhook handler writes; public users never access this table
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON stripe_events
  FOR ALL USING (auth.role() = 'service_role');
