-- Create public storage bucket for ACRA report screenshots
-- Screenshots are captured via headless Chrome during scan
INSERT INTO storage.buckets (id, name, public)
VALUES ('acra-screenshots', 'acra-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Allow service role to upload (API routes use service_role key)
-- Public read access is handled by the bucket being public
CREATE POLICY "Service role can upload screenshots"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'acra-screenshots');

CREATE POLICY "Anyone can view screenshots"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'acra-screenshots');
