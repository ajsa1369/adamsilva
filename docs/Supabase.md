# Supabase

Tags: #supabase #database

## Project
- **Name:** adam-silva-consulting
- **Ref:** `cdifobufvgfpbcbvicjs`
- **Region:** us-east-1
- **URL:** https://cdifobufvgfpbcbvicjs.supabase.co
- **Dashboard:** https://app.supabase.com/project/cdifobufvgfpbcbvicjs
- **Org ID:** `uvojrpkwgekdjsmjedya`

## Tables

### `contact_submissions`
Migration: `supabase/migrations/001_contact_submissions.sql`
- `id` UUID PK
- `name`, `email`, `company`, `message`
- `created_at` TIMESTAMPTZ

### `leads`
Migration: `supabase/migrations/002_leads.sql`
- `id` UUID PK
- `email`, `source`, `metadata` JSONB
- `created_at` TIMESTAMPTZ

### `newsletter_signups`
Migration: `supabase/migrations/003_newsletter_signups.sql`
- `id` UUID PK
- `email` UNIQUE
- `created_at` TIMESTAMPTZ

### `orders`
Migration: `supabase/migrations/016_orders.sql`
- `id` UUID PK
- `customer_email`, `customer_name`, `company`
- `stripe_payment_intent_id`, `stripe_customer_id`
- `amount_cents` INT
- `status` TEXT
- `payment_method` TEXT — `'ach'` or `'card'`
- `terms_accepted_at` TIMESTAMPTZ — legal proof of ToS acceptance
- `items` JSONB
- `created_at` TIMESTAMPTZ

### `stripe_events`
Created via Management API (not in migration files)
- `id` UUID PK
- `event_id` TEXT UNIQUE — Stripe event ID for idempotency
- `event_type` TEXT
- `payload` JSONB
- `created_at` TIMESTAMPTZ

## Row Level Security
All tables have RLS enabled. `service_role` key has full access, `anon` key is restricted.

## Credentials
| Key | Usage |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client-side |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-side (restricted) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only (full access) |

## Edge Functions (written, not yet deployed)
- `email-service` — transactional emails
- `team-notifications` — internal Slack/email alerts
- `generate-guide` — AI-generated lead magnet

## Key Files
- `lib/supabase/server.ts` — SSR Supabase client
- `lib/supabase/service.ts` — Service role client (server only)

## Related
- [[Stripe Setup]] — stripe_events idempotency table
- [[Environment Variables]]
