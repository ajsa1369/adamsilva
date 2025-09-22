CREATE TABLE authority_hub_pages (
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