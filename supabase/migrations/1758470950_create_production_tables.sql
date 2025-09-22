-- Migration: create_production_tables
-- Created at: 1758470950

-- Create newsletter signups table with updated schema
CREATE TABLE IF NOT EXISTS newsletter_signups (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    opted_in BOOLEAN DEFAULT true,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    service VARCHAR(255),
    message TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT false
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_processed ON contact_submissions(processed);

-- Enable RLS (Row Level Security)
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (needed for the forms)
CREATE POLICY IF NOT EXISTS "Enable insert for all users" ON newsletter_signups
    FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Enable insert for all users" ON contact_submissions
    FOR INSERT WITH CHECK (true);;