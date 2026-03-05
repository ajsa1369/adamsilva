-- ACRA: Agentic Commerce Readiness Assessment tables
-- Migration 017

-- Scan requests (one per URL submission)
create table if not exists acra_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  url text not null,
  company_name text,
  industry text,
  monthly_revenue_range text, -- '$0-50k','$50k-250k','$250k-1M','$1M-10M','$10M+'
  status text not null default 'pending', -- pending | processing | complete | failed
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Report data (populated when scan completes)
create table if not exists acra_reports (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references acra_scans(id) on delete cascade not null unique,
  user_id uuid references auth.users(id) on delete cascade not null,

  -- Overall score (0-100)
  overall_score integer not null default 0,
  overall_grade text not null default 'F', -- A, B, C, D, F

  -- 9 Pillar scores (0-100 each)
  score_protocol_compliance integer default 0,
  score_structured_data integer default 0,
  score_aeo integer default 0,
  score_geo integer default 0,
  score_seo_foundation integer default 0,
  score_social_authority integer default 0,
  score_press_coverage integer default 0,
  score_ai_authority integer default 0,
  score_llm_recommendation integer default 0,

  -- Revenue impact
  projected_monthly_loss_usd integer default 0,
  projected_annual_loss_usd integer default 0,
  ai_traffic_share_percent numeric(5,2) default 0,
  competitor_ai_share_percent numeric(5,2) default 0,

  -- LLM-specific scores (0-100 each)
  llm_chatgpt integer default 0,
  llm_perplexity integer default 0,
  llm_claude integer default 0,
  llm_gemini integer default 0,
  llm_copilot integer default 0,

  -- Detected signals (JSON arrays)
  schema_types_found jsonb default '[]',
  well_known_endpoints jsonb default '[]',
  social_profiles_found jsonb default '[]',
  press_sources_found jsonb default '[]',
  missing_schema_types jsonb default '[]',

  -- Prioritized recommendations (JSON)
  recommendations jsonb default '[]',

  -- Raw scan metadata
  scan_meta jsonb default '{}',

  created_at timestamptz default now()
);

-- Row-level security
alter table acra_scans enable row level security;
alter table acra_reports enable row level security;

create policy "Users see own scans" on acra_scans
  for all using (auth.uid() = user_id);

create policy "Users see own reports" on acra_reports
  for all using (auth.uid() = user_id);

-- Indexes
create index if not exists idx_acra_scans_user on acra_scans(user_id, created_at desc);
create index if not exists idx_acra_reports_scan on acra_reports(scan_id);
create index if not exists idx_acra_reports_user on acra_reports(user_id, created_at desc);
