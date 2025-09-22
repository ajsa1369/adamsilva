CREATE TABLE service_pages (
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