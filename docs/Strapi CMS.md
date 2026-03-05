# Strapi CMS

Tags: #strapi #cms #vps

## Server
- **VPS:** Hostinger — `root@72.60.127.124`
- **Live URL:** https://cms.adamsilvaconsulting.com
- **Admin:** https://cms.adamsilvaconsulting.com/admin
- **Install path:** `/var/www/strapi/cms`
- **Port:** 1337 (proxied via Nginx → 443/80)
- **Process manager:** PM2 (`process name: "strapi"`)

## Database
- PostgreSQL on same VPS
- User: `strapi`
- DB: `strapi_prod`
- Pass: `strapi_secure_2024!`

## PM2 Commands
```bash
ssh root@72.60.127.124
pm2 status              # check if running
pm2 restart strapi      # restart
pm2 logs strapi         # view logs
```

## Content Types (pending setup)
Create in admin after logging in:
- **Article**: `title`, `slug`, `content` (richtext), `excerpt`, `author`, `category`, `schema_json` (json), `images` (json), `publishedAt`

## API Token
Set in `.env.local` as `STRAPI_API_TOKEN`
Generate at: https://cms.adamsilvaconsulting.com/admin → Settings → API Tokens

## Next.js Integration
- `NEXT_PUBLIC_STRAPI_URL=https://cms.adamsilvaconsulting.com`
- Insights/blog pages pull from Strapi API
- `lib/strapi/` client functions

## Status
- ✅ VPS live, DNS + SSL active
- ⏳ Need to: create admin account, create Article content type, generate API token, add 10 blog articles

## Related
- [[Environment Variables]]
- [[Pending Work]]
