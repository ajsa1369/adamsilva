# Obsidian Plugins

Tags: #obsidian #tools #setup

Install via: Obsidian → Settings → Community Plugins → Browse

---

## 🔴 Install First (Core)

### Dataview
**Install name:** `Dataview`
Treats your vault like a database. Query notes by tags, properties, and status.
**For ASC:** Auto-generate live tables of pending work, service configs, Stripe prices.
```dataview
TABLE status, priority FROM "docs"
WHERE status = "pending"
SORT priority DESC
```
**Config:** Add front matter to every note: `status:`, `tags:`, `priority:`

---

### Tasks
**Install name:** `Tasks`
Full task management with due dates, priorities, recurring tasks.
**For ASC:** Track Stripe activation, Strapi blog articles, edge function deployments.
```
- [ ] Complete Stripe live account verification 🔴 📅 2026-03-15
- [ ] Create Strapi Article content type 🟡
- [ ] Deploy Supabase edge functions 🟡
```

---

### Kanban
**Install name:** `Obsidian Kanban`
Drag-and-drop board inside a markdown note.
**For ASC:** Visual sprint board — Backlog → In Progress → QA → Done.
Create board at: `docs/Sprint Board.md`

---

### Excalidraw
**Install name:** `Excalidraw`
Draw architecture diagrams, flowcharts, system maps inside Obsidian.
**For ASC:** Visualize checkout flow, API architecture, service dependency maps.
Embeds directly in notes: `![[architecture-diagram.excalidraw]]`

---

### Advanced Tables
**Install name:** `Advanced Tables`
Visual table editor — no manual markdown table syntax needed.
**For ASC:** Edit the service catalog, pricing tables, env var reference tables easily.

---

## 🟡 Install Second (Power Up)

### Breadcrumbs
**Install name:** `Breadcrumbs`
Typed links with hierarchy visualization — better than the default graph view.
**For ASC:** Map service → component → file relationships. Show what depends on what.
Link types to use: `documents`, `depends-on`, `integrates-with`, `api-for`

---

### Code Styler
**Install name:** `Code Styler`
Syntax highlighting for 300+ languages in both edit and preview mode.
**For ASC:** Display TypeScript, SQL, bash snippets in docs with proper highlighting.

---

### Link Embed
**Install name:** `Link Embed`
Converts URLs into rich preview cards (title, description, favicon).
**For ASC:** Embed live previews of Stripe dashboard, Supabase, GitHub, Vercel in notes.
```
https://dashboard.stripe.com/products
→ becomes a rich card with title + description
```

---

### Git
**Install name:** `Obsidian Git`
Auto-commits vault to a Git repo on a schedule. Full version history.
**For ASC:** Keep the `docs/` folder versioned alongside the source code — already in the same repo.
**Config:** Auto-commit interval: 30 min. Commit message: `docs: vault auto-save`

---

### Templater
**Install name:** `Templater`
Powerful note templates with variables, dates, dynamic content.
**For ASC:** New service note template, new decision log template, new bug report template.
Example template for a new service:
```
---
status: pending
tags: [service, stripe]
created: <% tp.date.now() %>
---
# <% tp.file.title %>
## Pricing
## Stripe Product ID
## Related
```

---

## 🟢 Nice to Have

### Auto Link Title
**Install name:** `Auto Link Title`
Automatically fetches the page title when you paste a URL.
**For ASC:** Paste Stripe/GitHub/Vercel URLs and get proper link titles automatically.

---

### Quiet Outline
**Install name:** `Quiet Outline`
Better outline panel — shows H1-H6 hierarchy with search.
**For ASC:** Navigate long notes like Services Catalog or Environment Variables quickly.

---

### Meld Encrypt
**Install name:** `Meld Encrypt`
Encrypt sensitive text blocks inline — decrypted only in memory.
**For ASC:** Store API keys and passwords safely in the vault without plain text on disk.
⚠️ Use for: VPS password, Stripe secret keys, Supabase service role key

---

### Omnivore
**Install name:** `Omnivore`
Save articles from the web and sync highlights into Obsidian.
**For ASC:** Save Stripe docs, Next.js articles, agentic commerce research into the vault.

---

### Colored Tags
**Install name:** `Colored Tags Wrangler`
Color-code your tags for visual organization in the tag panel.
**For ASC:** Red = blocked, Green = done, Yellow = in-progress, Blue = architecture

---

## Plugin Power Combos

### Second Brain for Claude
`Dataview` + `Templater` + `Git` = structured, versioned, queryable knowledge base that gives Claude consistent context every session.

### Architecture Documentation
`Excalidraw` + `Breadcrumbs` + `Code Styler` = visual diagrams + typed relationship maps + code snippets all in one note.

### Project Management
`Kanban` + `Tasks` + `Dataview` = visual board + task tracking + live dashboard queries.

### Secure Reference
`Meld Encrypt` + `Dataview` + `Advanced Tables` = encrypted credentials + queryable service catalog.

---

## Setup Order
1. Install **Dataview, Tasks, Kanban, Excalidraw, Advanced Tables**
2. Restart Obsidian
3. Install **Breadcrumbs, Code Styler, Link Embed, Git, Templater**
4. Add front matter to all existing `docs/` notes
5. Create `docs/Sprint Board.md` as Kanban board
6. Install remaining as needed

---

## Related
- [[Claude MCP Servers]] — Claude's external tool access
- [[Claude Skills]] — Claude slash command skills
- [[00-Home]]
