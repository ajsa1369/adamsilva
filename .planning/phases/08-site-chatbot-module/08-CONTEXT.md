# Phase 8: Site Chatbot Module — Context

**Gathered:** 2026-03-03
**Status:** Ready for planning
**Source:** PRD + live user decisions

<domain>
## Phase Boundary

Phase 8 delivers a fully deployable, CRM-connected site chatbot that any client can activate via a single `<script>` tag. The chatbot:
1. Loads via `public/chatbot-embed.js` — no framework required on the host site
2. Is powered by **Gemini 2.5 Flash Lite** for fast, low-latency responses
3. Uses **Supabase pgvector** (free, already in stack) as the knowledge base — RAG retrieval at query time
4. Executes 5 tool actions (bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus)
5. Connects to any of 10 CRMs via an adapter pattern (no core code changes per CRM)
6. Delivers across Web, SMS, Voice, WhatsApp — channel availability enforced by package tier
7. Persists every session to Supabase `chatbot_sessions` table

</domain>

<decisions>
## Implementation Decisions

### AI Model — Gemini 2.5 Flash Lite (USER DECISION)
- **Model**: `gemini-2.5-flash-lite-preview-06-17` (Google Gemini 2.5 Flash Lite)
- **Why**: Fastest response latency at near-zero cost — ideal for real-time chat
- **Implemented via**: New `getChatModel()` function in `lib/chatbot/model.ts`
  - Uses same `MODEL_PROVIDER` env routing pattern as `getIntakeModel()` — never hardcoded
  - Google provider: `createGoogleGenerativeAI()('gemini-2.5-flash-lite-preview-06-17')`
  - OpenAI fallback: `gpt-4o-mini` (fast, cheap)
  - Anthropic fallback: `claude-haiku-4-5-20251001`
- **Streaming**: Vercel AI SDK `streamText` — same pattern as `/api/intake/chat/route.ts`
- **Never import** `@google/generative-ai`, `anthropic`, or `openai` directly

### Vector Knowledge Base — Supabase pgvector (USER DECISION: free)
- **Database**: Supabase pgvector (already in stack — zero additional cost)
- **Table**: `chatbot_knowledge` — per-client knowledge chunks
  - Columns: `id uuid`, `client_id text`, `content text`, `metadata JSONB`, `embedding vector(1536)`, `source text`, `created_at timestamptz`
  - Index: `ivfflat` on `embedding` with cosine distance for fast ANN search
- **Embedding model**: Google `text-embedding-004` via Vercel AI SDK `embed()` — free tier
  - `lib/chatbot/embedder.ts` — `embedText(text): Promise<number[]>` wraps Vercel AI SDK embed
- **RAG pipeline** (`lib/chatbot/retriever.ts`):
  1. Embed incoming user message → `number[]`
  2. `SELECT content, metadata FROM chatbot_knowledge WHERE client_id = ? ORDER BY embedding <=> $query LIMIT 3`
  3. Inject top-3 chunks as `CONTEXT` block in system prompt
  4. Gemini 2.5 Flash Lite answers with retrieved context
- **Knowledge seeding**: `lib/chatbot/knowledge-seeder.ts`
  - Sources: site pages text, press releases feed, insights feed, client-specific config JSON
  - `POST /api/chatbot/[clientId]/seed` — upserts knowledge chunks with embeddings
  - Deduplication: hash-based (skip if content hash already exists for client)

### Chatbot Widget (CHAT-01)
- **Files**: `components/chatbot/ChatWidget.tsx`, `components/chatbot/ChatBubble.tsx`
- **Embed script**: `public/chatbot-embed.js` — vanilla JS, no dependencies
  - Loads React bundle from CDN, mounts `ChatWidget` into `#asc-chatbot-root` div
  - Activated by: `<script src="/chatbot-embed.js" data-client-id="[id]"></script>`
  - Works on any HTML page including Shopify themes
- **API route**: `app/api/chatbot/[clientId]/route.ts`
  - `runtime = 'nodejs'`; `streamText` with Gemini 2.5 Flash Lite
  - RAG retrieval injected into system prompt per request
  - Tool definitions passed to `streamText` tools object

### Tool Actions (CHAT-02)
5 tools defined in `lib/chatbot/tools.ts` (Vercel AI SDK tool format):
1. `bookAppointment` — creates calendar booking (stub + Calendly adapter)
2. `calculateJobCost` — uses Phase 3 pricing calculator
3. `createCRMLead` — calls active CRM adapter (from `lib/chatbot/crm-adapters/`)
4. `escalateToHuman` — sets session `outcome: 'escalated'`, triggers notification
5. `lookupOrderStatus` — queries client order system (configurable endpoint per client)

### CRM Adapters (CHAT-03)
- **Pattern**: All 10 adapters implement `CRMAdapter` interface: `createContact(lead): Promise<CRMResult>`
- **Adapters** in `lib/chatbot/crm-adapters/`:
  - `hubspot.ts`, `salesforce.ts`, `pipedrive.ts`, `zoho.ts`, `gohighlevel.ts`
  - `monday-sales.ts`, `freshsales.ts`, `close.ts`, `keap.ts`, `activecampaign.ts`
- **Selection**: Client config in Supabase specifies which CRM; adapter loaded dynamically
- **Env vars**: `HUBSPOT_API_KEY`, `SALESFORCE_CLIENT_ID/SECRET`, etc. — scaffolded with TODO where undocumented

### Session Persistence (CHAT-04)
- **Table**: `chatbot_sessions` — already in schema from Phase 2 migration (verify exists)
- **Schema**: `id`, `client_id`, `channel`, `messages JSONB`, `outcome text`, `crm_lead_id text`, `created_at`, `updated_at`
- **Upsert**: After each AI response, session record updated in real time
- **RLS**: Service role only (chatbot backend writes, never public client)

### Multi-Channel Delivery (CHAT-05)
- **Web** (all tiers): Default `ChatWidget.tsx` embed
- **SMS** (Silver+): `lib/chatbot/channels/sms.ts` — Twilio + Vonage adapters
  - Inbound webhook: `POST /api/chatbot/[clientId]/sms`
  - Tier check: client package enforced server-side (non-Gold returns HTTP 403)
- **Voice** (Gold+): `lib/chatbot/channels/voice.ts` — Bland.ai + Vapi adapters
  - Webhook: `POST /api/chatbot/[clientId]/voice`
- **WhatsApp** (Gold+): `lib/chatbot/channels/whatsapp.ts` — 360dialog adapter
  - Webhook: `POST /api/chatbot/[clientId]/whatsapp`
- **Channel router**: `lib/chatbot/channel-router.ts` — reads client tier from Supabase `packages` table, returns allowed channels, rejects unauthorized channel requests

### Supabase Tables (Phase 8 migration)
- `chatbot_knowledge` (NEW): pgvector knowledge base — migration `014_chatbot_knowledge.sql`
- `chatbot_sessions` (VERIFY/CREATE): session persistence — if missing from Phase 2, create in same migration
- RLS: service role only for knowledge; anon read allowed for session init (write requires service role)

### Claude's Discretion
- Gemini 2.5 Flash Lite exact model ID string — use `gemini-2.5-flash-lite-preview-06-17`; if unavailable at runtime, fall back to `gemini-2.0-flash` (already default)
- vector dimensions: use `1536` (OpenAI compat); if Google text-embedding-004 returns 768, adjust migration accordingly — make configurable constant
- Embed script bundling: simplest working approach — can be inline React with CDN or prebuilt bundle at `public/chatbot-embed.js`
- Calendly adapter for bookAppointment: stub with TODO — real Calendly API key deferred
- Voice adapter details (Bland.ai/Vapi): scaffold with TODO — credentials deferred

</decisions>

<specifics>
## Specific Requirements from Roadmap

- CHAT-01: Single `<script>` tag deploy, works on Shopify — `public/chatbot-embed.js`
- CHAT-02: 5 tool actions — bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus
- CHAT-03: 10 CRM adapters — HubSpot, Salesforce, Pipedrive, Zoho, GoHighLevel, Monday Sales, Freshsales, Close, Keap, ActiveCampaign
- CHAT-04: Supabase `chatbot_sessions` persistence with messages + channel + outcome
- CHAT-05: Web (all) / SMS Twilio+Vonage (Silver+) / Voice Bland.ai+Vapi (Gold+) / WhatsApp 360dialog (Gold+)

### Key Architecture Principle
The chatbot must be knowledge-aware, not just reactive. RAG via Supabase pgvector means the bot answers using ASC's actual content (press releases, insights, site pages, client config) rather than hallucinating. Every response is grounded in embedded knowledge chunks retrieved at query time.

</specifics>

<deferred>
## Deferred Ideas

- Live Calendly API integration (bookAppointment stub only — API key not yet obtained)
- Full Bland.ai/Vapi/360dialog live credentials (adapters scaffolded; credentials deferred)
- Client Portal configuration UI (CHAT-CLIENT-03 — deferred to Phase 9 concept)
- Automated knowledge re-seeding cron (deferred to Phase 10 MCP integration)
- Analytics dashboard for chatbot engagement (MON-01 — deferred to v2)

</deferred>

---

*Phase: 08-site-chatbot-module*
*Context gathered: 2026-03-03 via PRD Express Path + user decisions*
