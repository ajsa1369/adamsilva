---
type: home
status: active
---

# Adam Silva Consulting — Project Hub

> "Global Infrastructure for Agentic Commerce"

---

## Project Docs
| Note | What's in it |
|------|-------------|
| [[Architecture]] | Tech stack, file structure, deployment, TS gotchas |
| [[Services Catalog]] | All 18 services + 5 packages with pricing |
| [[Stripe Setup]] | Live keys, 22 products, webhook, ACH/card flow |
| [[Supabase]] | Tables, migrations, RLS, edge functions |
| [[Strapi CMS]] | VPS setup, PM2, content types, API tokens |
| [[Environment Variables]] | Every env var and where it lives |
| [[Pending Work]] | Prioritized backlog — what's next |

## Claude AI Tools
| Note | What's in it |
|------|-------------|
| [[Claude MCP Servers]] | context7, supabase, github, playwright, notebooklm |
| [[Claude Skills]] | All slash commands — Stripe, Supabase, frontend, GSD |
| [[Obsidian Plugins]] | Best plugins to install + power combos |

---

## Project Status
| Area | Status | Notes |
|------|--------|-------|
| Next.js build | ✅ Done | 52 pages, 0 TS errors |
| Stripe live mode | ✅ Done | ACH pending account verification |
| Supabase | ✅ Live | orders + stripe_events tables active |
| Strapi VPS | ✅ Live | Needs admin account + content type setup |
| Vercel | ✅ ASCv2 deployed | Merge to main after QA |
| Privacy + Terms pages | ✅ Done | GDPR, CCPA, legal@ email |
| Buy Now button | ✅ Done | Direct checkout from service pages |
| Services page Sandler redesign | ✅ Done | Pain-first, infographics, negative reverse CTA |
| Services overview video | ✅ Done | Remotion + Deepgram TTS narration |

---

## Live URLs
- **Site:** https://www.adamsilvaconsulting.com
- **CMS Admin:** https://cms.adamsilvaconsulting.com/admin
- **Supabase:** https://app.supabase.com/project/cdifobufvgfpbcbvicjs
- **Stripe:** https://dashboard.stripe.com
- **Vercel:** https://vercel.com/ajs-projects-06333daa/adamsilva
- **GitHub:** https://github.com/ajsa1369/adamsilva (branch: `ASCv2`)

---

## Key Firm Rules (never break these)
- **No refunds** — all sales final, enforced in Terms + checkout UI
- **4% card convenience fee** — ACH preferred, card adds 4%
- **Terms acceptance required** — checkbox + timestamp before payment
- **Enterprise positioning** — "our team" never "Adam will"
- **legal@adamsilvaconsulting.com** — all legal pages use this email

---

## How to Use Claude + This Vault
1. Open this vault in Obsidian before starting a Claude session
2. Tell Claude: *"Check docs/ for project context"*
3. Claude reads the relevant note instead of you re-explaining
4. After changes, Claude updates the relevant doc automatically
5. Obsidian Git auto-commits every 30 min (once plugin installed)
