# Claude MCP Servers

Tags: #claude #mcp #tools

Config file: `C:\Users\Bev\.claude\settings.json`

MCP servers give Claude real-time access to external services. Say "use [server name]" to invoke them directly.

---

## Active MCP Servers

### context7
**Purpose:** Pulls the latest official docs for any library — no outdated training data.
**Command:** `npx -y @upstash/context7-mcp@latest`
**How to use:**
```
"Use context7 to get the latest Next.js 14 App Router docs"
"Use context7 for Supabase RLS documentation"
"Use context7 for Tailwind v4 migration guide"
```
**Tip:** Always say `resolve-library-id` first if the library name is ambiguous.
**Best for:** Next.js 14, Supabase, Tailwind v4, Remotion, Stripe SDK

---

### supabase
**Purpose:** Direct read/write access to the live Supabase project — run queries, manage tables, check migrations.
**Command:** `npx -y @supabase/mcp-server-supabase@latest`
**Project ref:** `cdifobufvgfpbcbvicjs`
**Access token:** `sbp_9763ae3189e29a7f5180816da338c4058e192d2a`
**How to use:**
```
"Use supabase to check what columns are in the orders table"
"Use supabase to run a query on contact_submissions"
"Use supabase to create a new migration"
```
**Best for:** Schema inspection, running SQL, checking live data, creating tables

---

### github
**Purpose:** Read/write GitHub repos, issues, PRs, commits without leaving Claude.
**Command:** `npx -y @modelcontextprotocol/server-github@latest`
**Token:** Set `GITHUB_PERSONAL_ACCESS_TOKEN` in settings ⚠️ currently empty
**Repo:** `https://github.com/ajsa1369/adamsilva`
**How to use:**
```
"Use github to create a PR from ASCv2 to main"
"Use github to check the latest commits"
"Use github to open an issue"
```

---

### playwright
**Purpose:** Real browser automation — opens Chrome, navigates pages, clicks, fills forms, takes screenshots.
**Command:** `npx -y @playwright/mcp@latest --browser chrome --headless false`
**How to use:**
```
"Use playwright to open the Stripe dashboard"
"Use playwright to test the checkout flow on the Vercel preview"
"Use playwright to take a screenshot of the homepage"
```
**Best for:** Testing live site, navigating dashboards that require login, visual QA

---

### notebooklm
**Purpose:** Google NotebookLM — create notebooks, add sources, generate summaries programmatically.
**Command:** `node C:/Users/Bev/mcp-servers/notebooklm-mcp-server/dist/index.js`
**API Key:** `AIzaSyCbKVi6ODSN3qYVWD4e5S2m8CNPj1EB2MA`
**How to use:**
```
"Use notebooklm to create a notebook from our blog articles"
"Use notebooklm to generate a summary of the ASC services"
```

---

## Related
- [[Claude Skills]] — skills/plugins installed in Claude Code
- [[00-Home]]
