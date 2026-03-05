-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  opted_in BOOLEAN DEFAULT true,
  confirmed BOOLEAN DEFAULT false,
  confirmation_token TEXT,
  source TEXT DEFAULT 'website',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_opted_in ON newsletter_signups(opted_in);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_signups(created_at DESC);

-- RLS
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "service_role_all" ON newsletter_signups
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public insert (for newsletter signup form)
CREATE POLICY "public_insert" ON newsletter_signups
  FOR INSERT WITH CHECK (true);
