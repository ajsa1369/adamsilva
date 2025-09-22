CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    business_email VARCHAR(255) NOT NULL,
    company_website VARCHAR(500) NOT NULL,
    selected_guides TEXT[] NOT NULL,
    advertising_budget VARCHAR(100),
    website_analysis_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);