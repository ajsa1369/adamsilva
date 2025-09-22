CREATE TABLE site_configuration (
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
);