-- Migration: create_content_management_tables
-- Created at: 1758497733

-- Create service pages table for dynamic content management
CREATE TABLE IF NOT EXISTS service_pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  subtitle TEXT,
  business_pain_point TEXT,
  asc_solution TEXT,
  key_features JSONB,
  benefits JSONB,
  how_it_works JSONB,
  hero_icon VARCHAR(100),
  social_share_image_url VARCHAR(500),
  aeo_faq_section JSONB,
  related_services JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create authority hub pages table
CREATE TABLE IF NOT EXISTS authority_hub_pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  subtitle TEXT,
  description TEXT,
  content_sections JSONB,
  frameworks JSONB,
  implementation_steps JSONB,
  metrics JSONB,
  capabilities JSONB,
  advantages JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create site configuration table
CREATE TABLE IF NOT EXISTS site_configuration (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255),
  site_description TEXT,
  default_og_image VARCHAR(500),
  primary_navigation JSONB,
  footer_links JSONB,
  social_media JSONB,
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);;