-- 016_orders.sql
-- Orders table for tracking purchases made through the checkout system.
-- Supports one-time payments, subscriptions, and free services (ACRA).
-- Service-role access only — API routes and webhooks read/write; public users never access.

CREATE TABLE IF NOT EXISTS orders (
  id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_customer_id      TEXT,                                   -- Stripe customer ID (cus_...) or 'free'
  stripe_payment_intent_id TEXT,                                  -- For one-time payments (pi_...)
  stripe_subscription_id  TEXT,                                   -- For subscriptions (sub_...)
  customer_name           TEXT        NOT NULL,
  customer_email          TEXT        NOT NULL,
  customer_company        TEXT,
  items                   JSONB       NOT NULL DEFAULT '[]',      -- Array of { id, type, name }
  setup_total             INTEGER     NOT NULL DEFAULT 0,         -- Cents
  monthly_total           INTEGER     NOT NULL DEFAULT 0,         -- Cents
  currency                TEXT        NOT NULL DEFAULT 'usd',
  status                  TEXT        NOT NULL DEFAULT 'pending', -- pending, paid, active, failed, cancelled, refunded
  payment_type            TEXT        NOT NULL DEFAULT 'one_time',-- one_time, subscription, free
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_pi ON orders(stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_stripe_sub ON orders(stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- RLS: service role only
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON orders
  FOR ALL USING (auth.role() = 'service_role');

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();
