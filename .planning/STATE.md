# GSD State — ASC Commercial Platform

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-03-02 — Milestone v1.0 started

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-02)

**Core value:** Every prospect gets an instant, accurate, branded proposal — no sales calls required to qualify.
**Current focus:** Requirements definition → Roadmap creation

## Accumulated Context

### ASCv2 Baseline (completed pre-milestone)
- 52 pages, TypeScript clean, all committed to ASCv2 branch on GitHub
- Supabase tables: contact_submissions, leads, newsletter_signups
- Remotion BlogSummaryVideo scaffolded (remotion/)
- Strapi v5 live on VPS (http://72.60.127.124:1337)
- All /.well-known/ routes static (will become dynamic in Phase 10)
- lib/schemas/* — full JSON-LD schema library
- Vercel build passing

### Key Environment Variables Needed (not yet set)
- MODEL_PROVIDER — LLM provider for intake + chatbot
- ANTHROPIC_API_KEY / OPENAI_API_KEY (depending on MODEL_PROVIDER)
- RESEND_API_KEY — email delivery
- CRM_WEBHOOK_URL — configurable CRM endpoint
- VERCEL_BLOB_* — blob storage for images/videos

### Known Blockers
- Strapi admin account not yet created (post-build task)
- Vercel preview URL for ASCv2 branch not yet confirmed
- DNS: cms.adamsilvaconsulting.com A record not yet pointing to VPS
