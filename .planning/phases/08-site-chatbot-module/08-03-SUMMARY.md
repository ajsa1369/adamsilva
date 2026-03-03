---
phase: 08-site-chatbot-module
plan: 03
subsystem: api
tags: [vercel-ai-sdk, crm, tool-calling, hubspot, salesforce, pipedrive, zoho, gohighlevel, monday, freshsales, close, keap, activecampaign]

# Dependency graph
requires:
  - phase: 08-01
    provides: CRMAdapter interface + all tool result types (types.ts)
  - phase: 03-integration-catalog-pricing-engine
    provides: selectTier() from tier-selector.ts, calculatePricing() from calculator.ts
provides:
  - chatbotTools barrel (bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus)
  - getCRMAdapter() factory returning CRMAdapter by crmType string
  - 10 CRM adapter classes (HubSpot, Salesforce, Pipedrive, Zoho, GoHighLevel, Monday, Freshsales, Close, Keap, ActiveCampaign)
affects:
  - 08-04 (chatbot API route — imports chatbotTools for streamText)
  - 08-05 (chatbot widget — indirect via API route tool results)
  - 08-06 (chatbot channel adapters — indirect)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CRMAdapter interface pattern — all 10 adapters implement createContact(lead) returning Promise<CRMResult>
    - ADAPTERS registry in index.ts — keyed by lowercase crmType string, factory functions returning new instances
    - Vercel AI SDK v6 tool() with inputSchema (not parameters) — consistent with lib/intake/tools.ts pattern
    - AbortController for fetch timeouts — 5s timeout in lookupOrderStatus via setTimeout + abort signal
    - Non-fatal API key guards — all adapters return { success: false, error: 'KEY not configured' } pattern

key-files:
  created:
    - lib/chatbot/tools.ts
    - lib/chatbot/crm-adapters/index.ts
    - lib/chatbot/crm-adapters/hubspot.ts
    - lib/chatbot/crm-adapters/salesforce.ts
    - lib/chatbot/crm-adapters/pipedrive.ts
    - lib/chatbot/crm-adapters/zoho.ts
    - lib/chatbot/crm-adapters/gohighlevel.ts
    - lib/chatbot/crm-adapters/monday-sales.ts
    - lib/chatbot/crm-adapters/freshsales.ts
    - lib/chatbot/crm-adapters/close.ts
    - lib/chatbot/crm-adapters/keap.ts
    - lib/chatbot/crm-adapters/activecampaign.ts
  modified: []

key-decisions:
  - "Salesforce adapter deferred to TODO(v2) — full OAuth2 client credentials flow is complex; stub returns error with clear message rather than broken partial implementation"
  - "getCRMAdapter() returns null for unknown types — caller (createCRMLead tool) handles null check and returns { success: false, error } to LLM gracefully"
  - "bookAppointment returns static Calendly URL stub — CALENDLY_API_KEY integration deferred per CONTEXT.md; real booking deferred to v2"
  - "escalateToHuman uses console.warn with structured data — appears in Vercel serverless logs for immediate ops visibility without requiring external alerting"
  - "AbortController + setTimeout for 5s lookupOrderStatus timeout — fetch does not natively timeout, manual abort prevents hanging tool calls"
  - "calculateJobCost wraps selectTier+calculatePricing in try/catch — calculator throws on unknown package slug; catch returns { success: false, error } instead of crashing tool execution"
  - "Close CRM model maps lead + contacts — Close data model uses Lead as top-level entity; createContact creates a Lead with one contact, returns both dealId (lead id) and contactId"
  - "PIPEDRIVE_DOMAIN env var required separately from API token — Pipedrive uses per-account subdomain URLs"

patterns-established:
  - "CRM adapter pattern: class implementing CRMAdapter, env vars read in constructor, early return if missing, fetch with error text, typed response cast"
  - "Tool execute pattern: typed input directly, try/catch wrapping all async work, return typed result interface matching types.ts"
  - "Factory registry pattern: Record<string, () => CRMAdapter> with factory functions (not instances) — ensures fresh instance per call"

requirements-completed:
  - CHAT-02
  - CHAT-03

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 8 Plan 03: Chatbot Tools and CRM Adapters Summary

**5 Vercel AI SDK chatbot tools + 10 CRM adapter classes implementing CRMAdapter interface, with getCRMAdapter() factory; calculateJobCost reuses Phase 3 selectTier() + calculatePricing()**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T06:33:37Z
- **Completed:** 2026-03-03T06:36:30Z
- **Tasks:** 2
- **Files modified:** 12 (all created)

## Accomplishments
- Created `lib/chatbot/tools.ts` with 5 Vercel AI SDK v6 tools using `inputSchema` pattern (bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus) + chatbotTools barrel export
- Created 10 CRM adapter classes in `lib/chatbot/crm-adapters/` each implementing the `CRMAdapter` interface from Plan 01 types.ts
- Created `lib/chatbot/crm-adapters/index.ts` with `getCRMAdapter()` factory covering all 10 CRM type strings
- calculateJobCost reuses `selectTier()` from `lib/pricing/tier-selector.ts` and `calculatePricing()` from `lib/pricing/calculator.ts` (Phase 3 engine)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create lib/chatbot/tools.ts — 5 tool definitions** - `08a7525` (feat)
2. **Task 2: Create 10 CRM adapters + index.ts factory** - `3ab609c` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `lib/chatbot/tools.ts` - chatbotTools barrel with 5 Vercel AI SDK v6 tool definitions
- `lib/chatbot/crm-adapters/index.ts` - getCRMAdapter() factory, ADAPTERS registry for 10 CRM types
- `lib/chatbot/crm-adapters/hubspot.ts` - HubSpotAdapter: POST /crm/v3/objects/contacts via Bearer token
- `lib/chatbot/crm-adapters/salesforce.ts` - SalesforceAdapter: deferred stub with TODO(v2) OAuth2 note
- `lib/chatbot/crm-adapters/pipedrive.ts` - PipedriveAdapter: POST /api/v1/persons via PIPEDRIVE_API_TOKEN + domain
- `lib/chatbot/crm-adapters/zoho.ts` - ZohoAdapter: POST /crm/v2/Contacts via Zoho-oauthtoken
- `lib/chatbot/crm-adapters/gohighlevel.ts` - GoHighLevelAdapter: POST /v1/contacts/ via Bearer
- `lib/chatbot/crm-adapters/monday-sales.ts` - MondaySalesAdapter: GraphQL create_item mutation via MONDAY_API_KEY + MONDAY_BOARD_ID
- `lib/chatbot/crm-adapters/freshsales.ts` - FreshsalesAdapter: POST Freshworks domain API via Token auth
- `lib/chatbot/crm-adapters/close.ts` - CloseAdapter: POST /api/v1/lead/ via Basic auth (maps Lead+Contact model)
- `lib/chatbot/crm-adapters/keap.ts` - KeapAdapter: POST /crm/rest/v1/contacts via Bearer KEAP_API_KEY
- `lib/chatbot/crm-adapters/activecampaign.ts` - ActiveCampaignAdapter: POST /api/3/contacts via Api-Token header + base URL

## Decisions Made
- Salesforce adapter deferred to TODO(v2) — full OAuth2 client credentials flow is complex; stub returns descriptive error rather than broken partial implementation
- getCRMAdapter() returns null for unknown types — caller handles null with graceful { success: false, error } to LLM
- bookAppointment returns static Calendly URL stub — CALENDLY_API_KEY integration deferred per CONTEXT.md
- escalateToHuman uses console.warn with structured ticket data — visible in Vercel serverless logs without external alerting required
- AbortController + setTimeout for 5s lookupOrderStatus timeout — fetch has no native timeout, prevents hanging tool calls
- calculateJobCost wraps selectTier+calculatePricing in try/catch — calculator throws on unknown package slug; catch prevents tool execution crash

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

New environment variables required for CRM adapters (add to .env.local as needed):

- `HUBSPOT_API_KEY` — HubSpot CRM access
- `SALESFORCE_CLIENT_ID`, `SALESFORCE_CLIENT_SECRET`, `SALESFORCE_INSTANCE_URL` — Salesforce (OAuth2, v2 TODO)
- `PIPEDRIVE_API_TOKEN`, `PIPEDRIVE_DOMAIN` — Pipedrive (domain = subdomain, e.g. "mycompany")
- `ZOHO_ACCESS_TOKEN` — Zoho CRM (hourly expiry; OAuth2 refresh is v2 TODO)
- `GOHIGHLEVEL_API_KEY` — GoHighLevel
- `MONDAY_API_KEY`, `MONDAY_BOARD_ID` — Monday.com Sales CRM
- `FRESHSALES_API_KEY`, `FRESHSALES_DOMAIN` — Freshsales (domain = subdomain)
- `CLOSE_API_KEY` — Close CRM (uses Basic auth)
- `KEAP_API_KEY` — Keap (Infusionsoft)
- `ACTIVECAMPAIGN_API_KEY`, `ACTIVECAMPAIGN_BASE_URL` — ActiveCampaign (base URL = account URL)

All adapters gracefully return `{ success: false, error: 'KEY not configured' }` when env vars are absent.

## Next Phase Readiness

- Plan 04 (chatbot API route) can immediately consume `chatbotTools` from `lib/chatbot/tools.ts` for `streamText` tools object
- All 10 CRM adapters are ready; client's CRM type from `chatbot_sessions` or `ChatClientConfig.crmType` routes to correct adapter
- Salesforce requires v2 OAuth implementation before production use for Salesforce clients

---
*Phase: 08-site-chatbot-module*
*Completed: 2026-03-03*
