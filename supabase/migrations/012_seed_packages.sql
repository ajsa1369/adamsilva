-- Migration 012: Seed packages
-- Purpose: Populate the packages table with all 6 package definitions.
-- The pricing engine (Phase 3) and proposal generator (Phase 4) read these rows
-- to build proposals and calculate slot availability.
-- Idempotent via ON CONFLICT (slug) DO NOTHING.
-- Depends on: 005_packages.sql (table must exist)

INSERT INTO packages (name, slug, base_setup, base_monthly, tier1_slots, tier2_slots, tier3_slots, features_json, is_legacy_only)
VALUES

  -- =====================================================================
  -- BRONZE — entry-level package, 3 Tier 1 integrations
  -- =====================================================================
  (
    'Bronze',
    'bronze',
    16000.00,
    3500.00,
    3, 0, 0,
    '["Up to 3 Tier 1 integrations", "Agentic commerce protocol compliance", "Basic chatbot (web only)", "Weekly content calendar", "Monthly authority map", "Email + chat support", "Proposal generation", "CRM connection (1)"]'::jsonb,
    false
  ),

  -- =====================================================================
  -- SILVER — mid-tier package, 6 Tier 1 + 1 Tier 2 integrations
  -- =====================================================================
  (
    'Silver',
    'silver',
    28000.00,
    6500.00,
    6, 1, 0,
    '["Up to 6 Tier 1 integrations + 1 Tier 2", "Full protocol stack (UCP + ACP + AP2)", "Chatbot with SMS channel (Twilio/Vonage)", "Bi-weekly blog production", "Monthly press release", "Monthly authority map", "Priority support", "Proposal generation", "CRM connection (up to 2)", "48-hour follow-up automation"]'::jsonb,
    false
  ),

  -- =====================================================================
  -- GOLD — premium package, 12 T1 + 3 T2 + 1 T3 integrations
  -- =====================================================================
  (
    'Gold',
    'gold',
    48000.00,
    12000.00,
    12, 3, 1,
    '["Up to 12 Tier 1 + 3 Tier 2 + 1 Tier 3 integrations", "Full protocol stack", "Multi-channel chatbot (Web + SMS + Voice + WhatsApp)", "Weekly blog production pipeline", "Weekly press releases", "Monthly authority map", "Dedicated account manager", "Proposal generation", "CRM connections (up to 5)", "48-hour follow-up + call scheduling automation", "Remotion video sidecars for all content"]'::jsonb,
    false
  ),

  -- =====================================================================
  -- CORE — enterprise package, unlimited integrations (slots=99)
  -- base_monthly=0 because retainer is negotiated separately
  -- =====================================================================
  (
    'Core',
    'core',
    75000.00,
    0.00,
    99, 99, 99,
    '["Unlimited integrations (all tiers)", "Full protocol stack", "Multi-channel chatbot — all channels", "Full content production pipeline", "Custom monthly retainer (negotiated separately)", "White-glove onboarding", "Dedicated engineering resources", "Custom SLA", "All CRM adapters included", "Executive reporting dashboard"]'::jsonb,
    false
  ),

  -- =====================================================================
  -- SHOPIFY STARTER — legacy platform package, 2 Tier 1 integrations
  -- is_legacy_only=true (Shopify-specific, not offered to headless clients)
  -- =====================================================================
  (
    'Shopify Starter',
    'shopify-starter',
    8500.00,
    2000.00,
    2, 0, 0,
    '["Up to 2 Tier 1 integrations", "Shopify-compatible protocol layer", "Basic chatbot (web only)", "Monthly content calendar", "Legacy platform optimizations", "Email support"]'::jsonb,
    true
  ),

  -- =====================================================================
  -- SHOPIFY GROWTH — legacy platform package, 4 Tier 1 + 1 Tier 2 integrations
  -- is_legacy_only=true (Shopify-specific, not offered to headless clients)
  -- =====================================================================
  (
    'Shopify Growth',
    'shopify-growth',
    16000.00,
    4000.00,
    4, 1, 0,
    '["Up to 4 Tier 1 integrations + 1 Tier 2", "Shopify-compatible protocol layer", "Chatbot with SMS channel", "Bi-weekly content calendar", "Monthly authority map", "Priority support", "CRM connection (1)"]'::jsonb,
    true
  )

ON CONFLICT (slug) DO NOTHING;
