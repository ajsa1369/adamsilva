---
phase: 08-site-chatbot-module
plan: 06
subsystem: ui
tags: [chatbot, embed, iframe, react, ai-sdk, useChat, vanilla-js]

# Dependency graph
requires:
  - phase: 08-01
    provides: getChatModel, retrieveContext, ChatMessage type
  - phase: 08-03
    provides: chatbotTools, CRM adapters
  - phase: 08-04
    provides: /api/chatbot/[clientId] streaming endpoint

provides:
  - components/chatbot/ChatWidget.tsx — floating button + chat panel React component
  - app/chatbot-widget/page.tsx — iframe-target Next.js route (no header/footer)
  - public/chatbot-embed.js — vanilla JS IIFE embed script for any HTML page

affects:
  - All client-facing pages that embed the chatbot via script tag
  - Shopify themes and external sites using data-client-id embed pattern
  - Phase 10 (/.well-known/ routes may reference chatbot widget)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "useChat from @ai-sdk/react with DefaultChatTransport — body passed inside transport, not useChat"
    - "iframe embed pattern: embed.js creates floating button + iframe panel pointing to /chatbot-widget"
    - "sessionId via useRef(crypto.randomUUID()) — stable for widget lifetime, passed in transport body"
    - "Inline SVG icons in ChatWidget — no lucide-react dependency in iframe context"
    - "Suspense wrapper for useSearchParams() in Next.js 14 App Router client components"

key-files:
  created:
    - components/chatbot/ChatWidget.tsx
    - app/chatbot-widget/page.tsx
    - public/chatbot-embed.js
  modified:
    - .env.example

key-decisions:
  - "body goes inside DefaultChatTransport, not useChat — ai@6 UseChatOptions has no body field (Rule 1 auto-fix)"
  - "iframe embed pattern (not web component or React portal) — works on Shopify without framework dependency"
  - "Inline hex colors in embed.js (#4D8EC0, #1B2E4B) — globals.css not loaded on external host pages"
  - "CSS variables (var(--color-*)) in ChatWidget.tsx — globals.css IS loaded in Next.js iframe route"
  - "Mobile panel: 100vw width, right:-24px, 70vh height, top-only border-radius — full-width on small screens"
  - "Escape key handled in both embed.js (vanilla) and ChatWidget.tsx (React useEffect)"

patterns-established:
  - "ChatWidget self-contained with sessionId via useRef — no prop drilling for session management"
  - "data-site-url attribute on script tag — allows embed on staging vs production without code change"

requirements-completed: [CHAT-01, CHAT-04]

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 8 Plan 06: ChatWidget Embed Script Summary

**Embeddable chatbot delivered via vanilla JS script tag + React iframe widget — add `<script src="/chatbot-embed.js" data-client-id="[id]">` to any HTML page to show a floating branded chat button**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T06:44:39Z
- **Completed:** 2026-03-03T06:48:15Z
- **Tasks:** 2 of 2 (paused at checkpoint:human-verify)
- **Files modified:** 4

## Accomplishments

- ChatWidget React component with floating button + 360x500px chat panel using `useChat` from `@ai-sdk/react`, `DefaultChatTransport`, `ChatBubble` + `Button` from `@/components/ui`, session ID via `useRef(crypto.randomUUID())`
- Vanilla JS IIFE embed script (`public/chatbot-embed.js`) — reads `data-client-id` from script tag, creates `#asc-chatbot-root` floating button + iframe panel, works on Shopify / any HTML page with zero framework dependency
- `/chatbot-widget` Next.js route as iframe target — minimal full-height layout, reads `clientId` from `useSearchParams()`, wrapped in `Suspense` per Next.js 14 App Router requirements
- `.env.example` Phase 8 block: `CHATBOT_SEED_SECRET` + all 10 CRM adapter API keys + commented multi-channel TODO(v2) vars

## Task Commits

Each task was committed atomically:

1. **Task 1: ChatWidget.tsx** - `3dc3dc4` (feat)
2. **Task 2: iframe route + embed.js + .env.example** - `ee0d87e` (feat)

## Files Created/Modified

- `components/chatbot/ChatWidget.tsx` — Floating chat widget: toggle button, panel with messages list, input form; `useChat` streams from `/api/chatbot/[clientId]`
- `app/chatbot-widget/page.tsx` — Minimal iframe route; reads `clientId` from searchParams; Suspense-wrapped for Next.js 14
- `public/chatbot-embed.js` — Vanilla JS IIFE; reads `data-client-id`; creates floating toggle button + iframe panel; Escape closes; mobile full-width
- `.env.example` — Phase 8 block with `CHATBOT_SEED_SECRET` + all CRM env vars

## Decisions Made

- **`body` inside `DefaultChatTransport` not `useChat`:** `UseChatOptions` in ai@6 has no `body` field — body must be passed to `DefaultChatTransport({ body: {...} })`. Auto-fixed Rule 1.
- **Iframe embed pattern:** Simpler than web components, works on Shopify without any framework dependency, no CORS issues, no bundle required on host page.
- **Inline hex in embed.js:** `#4D8EC0` / `#1B2E4B` hardcoded as per plan spec — `globals.css` is not loaded on external pages; CSS vars only used in ChatWidget.tsx where Next.js globals.css IS loaded.
- **Mobile panel adjustments:** `100vw` width, `right: -24px` to extend to screen edge, `70vh` height, top-only border-radius for full-width feel.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed `body` placement in useChat — moved into DefaultChatTransport**
- **Found during:** Task 1 (ChatWidget.tsx)
- **Issue:** Plan spec showed `body: { sessionId, channel }` directly in `useChat({...})`, but `UseChatOptions` in ai@6 has no `body` property — TypeScript error TS2353
- **Fix:** Moved `body` inside `new DefaultChatTransport({ api, body })` — `HttpChatTransportInitOptions` accepts `body?: Resolvable<object>`
- **Files modified:** `components/chatbot/ChatWidget.tsx`
- **Verification:** `npx tsc --noEmit` exits 0
- **Committed in:** `3dc3dc4` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug)
**Impact on plan:** Essential correctness fix. No scope creep.

## Issues Encountered

None beyond the Rule 1 auto-fix above.

## User Setup Required

Manual verification needed (checkpoint:human-verify paused here):

1. Create a test HTML file with:
   ```html
   <!DOCTYPE html><html><body>
     <h1>Test page</h1>
     <script src="http://localhost:3000/chatbot-embed.js"
             data-client-id="silver-test"
             data-site-url="http://localhost:3000"></script>
   </body></html>
   ```
2. Run `npm run dev` and open the test HTML file in a browser
3. Verify: blue floating button in bottom-right corner
4. Click: iframe panel opens with chat widget
5. Send message: response streams back
6. Press Escape: panel closes

## Next Phase Readiness

- Complete embed chain built: `embed.js` → `iframe` → `/chatbot-widget` → `ChatWidget` → `/api/chatbot/[clientId]`
- CHAT-01 (script tag embed) and CHAT-04 (session persistence in API) requirements met
- Plan 08-05 (channel router / SMS) is the remaining plan in Phase 8

---
*Phase: 08-site-chatbot-module*
*Completed: 2026-03-03*
