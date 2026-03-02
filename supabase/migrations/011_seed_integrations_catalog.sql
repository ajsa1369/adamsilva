-- Migration 011: Seed integrations_catalog
-- Purpose: Populate integrations_catalog with all known tools from the intake flow.
-- The pricing engine (Phase 3) and intake agent (Phase 4) look up tools by name to
-- retrieve tier classification and costs. Idempotent via ON CONFLICT (name) DO NOTHING.
-- Depends on: 004_integrations_catalog.sql (table must exist)

INSERT INTO integrations_catalog (name, category, tier, setup_cost, monthly_cost, api_available, connector_type, notes)
VALUES

  -- =====================================================================
  -- CRM: Tier 1 — pre-built connectors / well-documented REST APIs
  -- =====================================================================
  ('HubSpot',          'crm', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Salesforce',       'crm', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Pipedrive',        'crm', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('GoHighLevel',      'crm', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('ActiveCampaign',   'crm', 1, 750.00,  150.00, true,  'pre-built',   NULL),

  -- CRM: Tier 2 — REST API requiring custom mapping or limited docs
  ('Zoho CRM',         'crm', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Monday Sales CRM', 'crm', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Freshsales',       'crm', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Close',            'crm', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Keap',             'crm', 2, 1500.00, 250.00, true,  'custom-rest', NULL),

  -- =====================================================================
  -- BOOKING: Tier 1 — pre-built connectors
  -- =====================================================================
  ('Calendly',         'booking', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Google Calendar',  'booking', 1, 750.00,  150.00, true,  'pre-built',   NULL),

  -- BOOKING: Tier 2 — REST API with custom mapping
  ('Acuity Scheduling','booking', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Outlook Calendar', 'booking', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('SimplyBook.me',    'booking', 2, 1500.00, 250.00, true,  'custom-rest', NULL),

  -- BOOKING: Tier 3 — legacy / limited API
  ('ServiceTitan',     'booking', 3, 4000.00, 500.00, false, 'legacy',      'Requires custom integration or limited API access'),
  ('Mindbody',         'booking', 3, 4000.00, 500.00, false, 'legacy',      'Requires custom integration or limited API access'),
  ('Vagaro',           'booking', 3, 4000.00, 500.00, false, 'legacy',      'Requires custom integration or limited API access'),
  ('Jobber',           'booking', 3, 4000.00, 500.00, false, 'legacy',      'Requires custom integration or limited API access'),
  ('Housecall Pro',    'booking', 3, 4000.00, 500.00, false, 'legacy',      'Requires custom integration or limited API access'),

  -- =====================================================================
  -- EMAIL: Tier 1 — pre-built connectors
  -- =====================================================================
  ('Mailchimp',        'email',   1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Klaviyo',          'email',   1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('ConvertKit',       'email',   1, 750.00,  150.00, true,  'pre-built',   NULL),

  -- EMAIL: Tier 2 — custom REST mapping
  ('Brevo',            'email',   2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Drip',             'email',   2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Beehiiv',          'email',   2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('ActiveCampaign Email', 'email', 2, 1500.00, 250.00, true, 'custom-rest', 'ActiveCampaign used in email-only mode (CRM listed separately)'),

  -- =====================================================================
  -- PAYMENT: Tier 1 — pre-built connectors
  -- =====================================================================
  ('Stripe',           'payment', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Square',           'payment', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('PayPal',           'payment', 1, 750.00,  150.00, true,  'pre-built',   NULL),

  -- PAYMENT: Tier 2 — custom REST mapping
  ('Adyen',            'payment', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Authorize.net',    'payment', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('QuickBooks Payments', 'payment', 2, 1500.00, 250.00, true, 'custom-rest', NULL),

  -- =====================================================================
  -- HELPDESK: Tier 1 — pre-built connectors
  -- =====================================================================
  ('Zendesk',          'helpdesk', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Intercom',         'helpdesk', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('HubSpot Service',  'helpdesk', 1, 750.00,  150.00, true,  'pre-built',   NULL),

  -- HELPDESK: Tier 2 — custom REST mapping
  ('Freshdesk',        'helpdesk', 2, 1500.00, 250.00, true,  'custom-rest', NULL),

  -- =====================================================================
  -- ACCOUNTING: Tier 1 — pre-built connectors
  -- =====================================================================
  ('QuickBooks Online','accounting', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Xero',             'accounting', 1, 750.00,  150.00, true,  'pre-built',   NULL),

  -- ACCOUNTING: Tier 2 — custom REST mapping
  ('FreshBooks',       'accounting', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Wave',             'accounting', 2, 1500.00, 250.00, true,  'custom-rest', NULL),

  -- =====================================================================
  -- ERP: Tier 3 — no public API or legacy enterprise system
  -- =====================================================================
  ('SAP',              'erp', 3, 4000.00, 500.00, false, 'no-api', 'Enterprise ERP — requires custom build or middleware'),
  ('NetSuite',         'erp', 3, 4000.00, 500.00, false, 'no-api', 'Enterprise ERP — requires custom build or middleware'),
  ('Oracle ERP',       'erp', 3, 4000.00, 500.00, false, 'no-api', 'Enterprise ERP — requires custom build or middleware'),
  ('Microsoft Dynamics','erp', 3, 4000.00, 500.00, false, 'no-api', 'Enterprise ERP — requires custom build or middleware'),

  -- =====================================================================
  -- PLATFORM: used for platform detection (not billed as integrations)
  -- Tier reflects agentic protocol compliance capability
  -- =====================================================================
  ('Shopify',          'platform', 2, 1500.00, 250.00, true,  'custom-rest', 'Limited API for agentic protocols — partial compliance'),
  ('WooCommerce',      'platform', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('WordPress',        'platform', 2, 1500.00, 250.00, true,  'custom-rest', NULL),
  ('Webflow',          'platform', 1, 750.00,  150.00, true,  'pre-built',   NULL),
  ('Wix',              'platform', 3, 4000.00, 500.00, false, 'no-api',      'Closed platform — limited protocol compliance'),
  ('Squarespace',      'platform', 3, 4000.00, 500.00, false, 'no-api',      'Closed platform'),
  ('Magento',          'platform', 3, 4000.00, 500.00, true,  'legacy',      'Requires enterprise integration'),
  ('Next.js Custom',   'platform', 1, 750.00,  150.00, true,  'pre-built',   'Full headless — native protocol support')

ON CONFLICT (name) DO NOTHING;
