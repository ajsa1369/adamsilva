# Adam Silva Consulting — ASCv2 Project Context

## Stack (bleeding-edge)
- **Next.js 14** App Router — SSR, Server Components, API Routes, ISR
- **Tailwind CSS v4** — CSS-first config (`@import "tailwindcss"` + `@theme {}`)
- **Supabase** — `@supabase/ssr` (NOT `@supabase/auth-helpers-nextjs`)
- **Strapi v5** — self-hosted on VPS, REST API, ISR revalidate=3600
- **Remotion** — blog video summaries (excluded from tsconfig for Next.js build)
- **TypeScript strict mode**

## MCP Servers Available
- **context7** — Use for up-to-date Next.js 14, Supabase SSR, Tailwind v4, Remotion, Strapi v5 docs. Always use `use_mcp_tool context7 resolve-library-id` before writing code against any library.
- **supabase** — Direct DB operations (needs SUPABASE_ACCESS_TOKEN + project-ref in .claude/settings.json)
- **github** — PR creation, issue management for ajsa1369/adamsilva (needs GITHUB_PERSONAL_ACCESS_TOKEN)
- **playwright** — Browser testing against Vercel preview URL

## Key Conventions
- `@/*` maps to project root (not `src/`)
- All schema objects live in `lib/schemas/` — never inline JSON-LD in page files
- Client components: `'use client'` + no server imports (no `next/headers`, no server-only)
- Server components default — only use `'use client'` when state/effects needed
- CSS variables: `var(--color-accent)`, `var(--color-base)` — never hardcode hex in JSX
- Utility classes: `.card`, `.btn-primary`, `.btn-secondary`, `.section`, `.container`, `.badge-ucp`, `.badge-acp`, `.badge-ap2`, `.speakable-answer`, `.schema-viewer`

## Critical Files
- `lib/schemas/organization.ts` — SITE_URL, ORG_ID, organizationSchema (import these everywhere)
- `lib/data/services.ts` — SERVICES array (10 services)
- `lib/data/protocols.ts` — PROTOCOLS object
- `lib/strapi/queries.ts` — FALLBACK_POSTS (10 static posts for when Strapi offline)
- `app/globals.css` — Tailwind v4 @theme + all utility class definitions
- `next.config.mjs` (NOT .ts — Next.js 14 doesn't support TypeScript config files)

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRAPI_URL=http://72.60.127.124:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_SITE_URL=https://www.adamsilvaconsulting.com
RESEND_API_KEY=
```

## VPS
- Host: 72.60.127.124 (Hostinger)
- Strapi admin: http://72.60.127.124:1337/admin
- Strapi path: /var/www/strapi/cms
- PostgreSQL: strapi user, strapi_prod database

## GitHub
- Repo: https://github.com/ajsa1369/adamsilva
- Branch: ASCv2 → merge to main after QA
- Username: ajsa1369

## Build command
```bash
cd C:\Users\Bev\Downloads\ASCW\adamsilva && npm run build
```
Build must produce 0 TypeScript errors. Currently: 52 pages, all static/ISR.

## Common Pitfalls
1. Never use `next.config.ts` — must be `.mjs` for Next.js 14
2. `remotion/` excluded from tsconfig (Remotion types conflict)
3. `lib/` directory was gitignored by Python template — fixed with `!/lib/` negation in .gitignore
4. `'use client'` files cannot import server-only modules or export `metadata`
5. `Set<string>` iteration requires ES2015+ — use manual dedup loop instead
6. Supabase `setAll` cookie type must be explicit `{ name, value, options? }[]`
