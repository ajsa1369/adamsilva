# Claude Skills (Plugins)

Tags: #claude #skills #tools

Skills are slash commands that give Claude specialized capabilities beyond base coding.
Invoke with `/skill-name` in Claude Code chat.

Config: `C:\Users\Bev\.claude\settings.json` → `enabledPlugins`

---

## Active Skills

### stripe
Plugin: `stripe@claude-plugins-official`
| Skill | Command | Use for |
|-------|---------|---------|
| Explain error | `/stripe:explain-error` | Decode any Stripe error code instantly |
| Test cards | `/stripe:test-cards` | Get test card numbers for checkout QA |
| Best practices | `/stripe:stripe-best-practices` | Validate our Stripe integration patterns |

**ASC use cases:**
- Debug payment failures in live mode
- Verify ACH/us_bank_account setup
- Check webhook signature verification

---

### supabase
Plugin: `supabase@claude-plugins-official`
Specialized guidance for Supabase schema design, RLS policies, edge functions, and migrations.
**ASC use cases:** Orders table, stripe_events idempotency, newsletter signups

---

### playwright
Plugin: `playwright@claude-plugins-official`
Browser automation skills for testing and UI interaction.
**ASC use cases:** Test checkout flow, QA service pages, screenshot comparisons

---

### github
Plugin: `github@claude-plugins-official`
PR reviews, issue management, branch operations.
**ASC use cases:** Create PRs from ASCv2 → main, review diffs before merging

---

### frontend-design
Plugin: `frontend-design@claude-plugins-official`
High-quality UI/UX design intelligence — 50 styles, 21 palettes, font pairings, component patterns.
**ASC use cases:** New page layouts, component design, dark mode improvements

---

### posthog
Plugin: `posthog@claude-plugins-official`
| Skill | Use for |
|-------|---------|
| `/posthog:insights` | Analytics queries |
| `/posthog:errors` | Error tracking |
| `/posthog:flags` | Feature flags |
| `/posthog:posthog-instrumentation` | Add tracking to checkout funnel |

**ASC use cases:** Track checkout conversion, monitor errors on live site

---

### slack
Plugin: `slack@claude-plugins-official`
| Skill | Use for |
|-------|---------|
| `/slack:channel-digest` | Catch up on channels |
| `/slack:draft-announcement` | Draft client communications |
| `/slack:standup` | Generate standup from activity |

---

### context7
Plugin: `context7@claude-plugins-official`
Latest library documentation fetched in real-time.
**ASC use cases:** Always-current Next.js 14, Tailwind v4, Supabase docs

---

### document-skills
Plugin: `document-skills@anthropic-agent-skills`
| Skill | Use for |
|-------|---------|
| `/document-skills:pdf` | Read/extract from PDFs |
| `/document-skills:docx` | Create/edit Word docs |
| `/document-skills:pptx` | Build slide decks |
| `/document-skills:xlsx` | Spreadsheet work |
| `/document-skills:frontend-design` | Production-grade UI components |
| `/document-skills:webapp-testing` | Playwright-based UI testing |
| `/document-skills:canvas-design` | Visual art, posters, graphics |

**ASC use cases:** Client proposal decks, service one-pagers, contract PDFs

---

### firebase
Plugin: `firebase@claude-plugins-official`
Not currently used in ASC stack but available if needed.

---

### linear
Plugin: `linear@claude-plugins-official`
Project management / issue tracking integration.

---

### asana
Plugin: `asana@claude-plugins-official`
Task management integration.

---

## GSD Skills (Workflow)
The GSD (Get Stuff Done) system is installed and provides structured project execution:
| Command | Use for |
|---------|---------|
| `/gsd:plan-phase` | Plan a new feature with full research + verification |
| `/gsd:execute-phase` | Execute a planned phase with atomic commits |
| `/gsd:debug` | Systematic bug investigation with state tracking |
| `/gsd:progress` | Check what's done and what's next |
| `/gsd:quick` | Fast task execution with GSD guarantees |

**Hooks running every session:**
- `SessionStart` → GSD update check
- `PostToolUse` → Context monitor

---

## How to Use Skills Together (Power Combos)

### Debug a payment issue
1. `/stripe:explain-error` — decode the error
2. Use `supabase` MCP — check orders table for the failed order
3. Use `playwright` MCP — reproduce the checkout flow
4. `/stripe:stripe-best-practices` — verify the fix

### Ship a new page
1. `/gsd:plan-phase` — plan the implementation
2. Use `context7` MCP — get latest Next.js/Tailwind docs
3. `/frontend-design` — design the component
4. `/gsd:execute-phase` — build with atomic commits
5. Use `playwright` MCP — visual QA on Vercel preview

### Client presentation
1. `/document-skills:pptx` — build the slide deck
2. Use `supabase` MCP — pull live order/conversion data
3. `/document-skills:pdf` — export as PDF

---

## Related
- [[Claude MCP Servers]] — MCP server configs and usage
- [[00-Home]]
