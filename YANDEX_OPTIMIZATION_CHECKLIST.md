# Yandex Webmaster Optimization Checklist

## ✅ COMPLETED

### Site Setup
- [x] Site verified in Yandex Webmaster (DNS verification 09/23/2025)
- [x] Owner access granted
- [x] All 8 sitemaps submitted and crawling
- [x] robots.txt fixed and synced (Oct 7, 2025)
- [x] Yandex bot allowed in robots.txt
- [x] Fresh sitemap dates triggering recrawl

### Latest Crawl Status (as of 10/07/2025)
- [x] sitemap-authority.xml - OK (4 links, last loaded 10/03)
- [x] sitemap-content.xml - OK (10 links, last loaded 10/07)
- [x] sitemap-images.xml - OK (3 links, last loaded 10/03)
- [x] sitemap-index.xml - OK (6 links, last loaded 10/05)
- [x] sitemap-services.xml - OK (22 links, last loaded 10/03)
- [x] sitemap.xml - OK (7 links, last loaded 10/03)
- [x] sitemap-news.xml - Missing from robots.txt (added Oct 7)
- ⚠️ sitemap-mainpages.xml - 1 error (investigating)

---

## ⚠️ YANDEX RECOMMENDATIONS TO ADDRESS

Based on your Yandex Webmaster notifications (from Image 3):

### 1. Add Image for Search Results (High Priority)

**What Yandex Wants:** A representative image for your site in search results

**Action:** Add/verify Open Graph image tags in index.html

**Check if already present:**
```html
<meta property="og:image" content="https://www.adamsilvaconsulting.com/images/social/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**If missing, add these to index.html:**
- Image size: 1200x630px (optimal for social sharing)
- Format: JPG or PNG
- File size: < 1MB
- Content: Professional branding, logo, or service overview

**Yandex Requirements:**
- Minimum 200x200px
- Maximum 5MB
- URL must be accessible (not blocked by robots.txt)

**Status:** Need to verify og-image.jpg exists at `/images/social/og-image.jpg`

---

### 2. Speed Up Indexing (Medium Priority)

**What Yandex Wants:** Faster page discovery and indexing

**Already Done:**
- ✅ Sitemaps updated with fresh dates
- ✅ robots.txt optimized
- ✅ All pages submitted via sitemap

**Additional Actions:**

**a) Enable Turbo Pages (Yandex's AMP equivalent)**
- Go to: Yandex Webmaster → Tools → Turbo Pages
- Enable for mobile optimization
- Similar to Google AMP but Yandex-specific
- **Impact:** Faster mobile loading, priority indexing

**b) Sitemap Priority Settings**
- In Yandex Webmaster → Indexing → Sitemaps
- Set "Check for updates" frequency: Daily for news, Weekly for services

**c) Use Yandex.Metrica**
- Install Yandex.Metrica (Russian Google Analytics)
- Signals active site to Yandex crawler
- Setup: https://metrica.yandex.com/

---

### 3. Specify Region of the Site (Medium Priority)

**What Yandex Wants:** Geographic targeting for search results

**Action in Yandex Webmaster:**
1. Go to: Settings → Indexing
2. Set "Geographic Region": 
   - If targeting US: Select "United States"
   - If global: Select "Other countries"
3. Set "City" if targeting specific location

**Additional Regional Signals:**
- Add `hreflang` tags if multi-language
- Use local phone numbers (if applicable)
- Add address in schema markup

**For Global Business:**
```json
{
  "@type": "Organization",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  }
}
```

Already in your schema ✓

---

### 4. Fix robots.txt Errors (COMPLETED)

**Previous Issue (09/30/2025):** 
- Old robots.txt missing AI bots
- sitemap-main-pages.xml not listed

**Fixed (10/07/2025):**
- ✅ Added Yandex bot with crawl-delay: 1
- ✅ Added all AI bots (GPTBot, ClaudeBot, etc.)
- ✅ Added sitemap-main-pages.xml to sitemap list
- ✅ Synced public/robots.txt with root robots.txt

**Yandex will recheck robots.txt on next crawl** (within 24-48 hours)

---

## 🔍 INVESTIGATE: sitemap-mainpages.xml Error

**Issue:** Shows "1 error" in Yandex Webmaster (Image 2)

**Possible Causes:**
1. **URL returns 404** - One of the 6 URLs doesn't exist yet
2. **Redirect chain** - URL redirects instead of serving content directly
3. **Blocked by robots.txt** - URL accidentally blocked
4. **Duplicate URL** - Same URL in multiple sitemaps
5. **Slow response** - Page takes too long to load

**URLs in sitemap-main-pages.xml:**
- https://www.adamsilvaconsulting.com/
- https://www.adamsilvaconsulting.com/services
- https://www.adamsilvaconsulting.com/about
- https://www.adamsilvaconsulting.com/contact
- https://www.adamsilvaconsulting.com/insights
- https://www.adamsilvaconsulting.com/case-studies

**Action Required:**
1. Click on "sitemap-mainpages.xml" error in Yandex Webmaster
2. View detailed error message
3. Fix the specific URL causing the issue
4. Re-validate in Yandex

**Common Fix:** If a URL redirects (e.g., /services → /services/), update sitemap with final URL

---

## 🚀 YANDEX-SPECIFIC OPTIMIZATIONS

### Yandex.Metrica Installation (Recommended)

**Why:** Yandex's equivalent of Google Analytics
- Signals active site to Yandex
- Provides detailed analytics
- Improves crawl priority

**Setup:**
1. Go to: https://metrica.yandex.com/
2. Create counter for adamsilvaconsulting.com
3. Get tracking code
4. Add to `<head>` section of index.html

**Tracking code format:**
```html
<!-- Yandex.Metrica counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/XXXXXX" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrica counter -->
```
(Replace XXXXXX with your counter ID)

---

### Yandex.Webmaster Features to Enable

**1. Search Queries Report**
- Path: Search queries → Settings
- Enable to see Yandex search performance
- Similar to Google Search Console performance

**2. Site Quality Score**
- Path: Site quality → Enable monitoring
- Yandex's quality assessment (similar to Core Web Vitals)
- Focus on: Speed, Mobile usability, Security

**3. Important Pages**
- Path: Indexing → Important pages
- Mark priority pages for faster indexing
- Limit: 100 pages for free accounts

**Pages to mark as important:**
- Homepage
- Main services page
- About page
- Top 3 service offerings
- Best case studies

**4. Monitoring & Alerts**
- Path: Settings → Notifications
- Enable alerts for:
  - Indexing problems
  - Site availability issues
  - Security problems
  - Search query changes

---

## 📊 MONITORING YANDEX PERFORMANCE

### Weekly Checks (5 minutes)
- [ ] Check sitemap status (all should show "ok")
- [ ] Review "Site quality" score
- [ ] Check "Indexing" → "Pages in search" count
- [ ] Review any new notifications

### Monthly Reviews (15 minutes)
- [ ] Analyze "Search queries" report
- [ ] Compare Yandex vs Google traffic
- [ ] Review regional performance
- [ ] Check mobile vs desktop split

### Key Metrics to Track
- **Pages indexed:** Target 51/51 (same as Google)
- **Search impressions:** Track growth month-over-month
- **Site quality score:** Target 80+ (Yandex scale)
- **Mobile usability:** Target 100% "good" pages

---

## 🌍 YANDEX MARKET CONTEXT

### When Yandex Matters
- **Primary markets:** Russia, Belarus, Kazakhstan, Ukraine
- **Search share:** 60-65% in Russia, 90%+ in Kazakhstan
- **User base:** 50M+ daily users
- **B2B presence:** Strong for technical/consulting services

### If NOT Targeting Russian Market
- **Effort:** Low priority but maintain presence
- **Benefit:** International SEO diversity, additional traffic source
- **Time:** 15 minutes quarterly maintenance

### If Targeting Russian Market
- **High Priority Actions:**
  1. Add Russian language version of site
  2. Enable Yandex.Metrica
  3. Create Yandex.Direct ads (PPC)
  4. Submit to Yandex.Catalog directory
  5. Build .ru domain (optional but preferred)
  6. Optimize for Cyrillic keywords

---

## ✅ QUICK ACTION CHECKLIST

### This Week (30 minutes)
- [ ] Click sitemap-mainpages.xml error to see details
- [ ] Fix the specific URL causing error
- [ ] Set geographic region in Yandex Webmaster settings
- [ ] Verify og:image exists and is accessible
- [ ] Mark 5-10 important pages in Yandex Webmaster

### Next 2 Weeks (1 hour)
- [ ] Install Yandex.Metrica if targeting Russian market
- [ ] Enable Turbo Pages for mobile optimization
- [ ] Set sitemap update frequency (daily/weekly)
- [ ] Configure notification alerts

### Monthly (15 minutes)
- [ ] Review Yandex search queries report
- [ ] Check site quality score
- [ ] Monitor indexing progress
- [ ] Compare performance vs previous month

---

## 🎯 EXPECTED RESULTS

### Week 1
- robots.txt errors cleared
- All sitemaps showing "ok" status
- Site quality score baseline established

### Month 1
- 30-40 pages indexed
- First search impressions appearing
- Mobile usability optimized

### Month 3
- 51/51 pages indexed
- Consistent search traffic (if targeting region)
- Quality score 80+

---

## 🔗 USEFUL YANDEX RESOURCES

- **Yandex Webmaster:** https://webmaster.yandex.com/
- **Yandex Metrica:** https://metrica.yandex.com/
- **Yandex Help:** https://yandex.com/support/webmaster/
- **Yandex Search API:** https://tech.yandex.com/xml/
- **Yandex Catalog:** https://yandex.com/catalog/

---

**Current Status:** ✅ Verified, ✅ Sitemaps submitted, ⚠️ 1 error to investigate  
**Priority:** Medium (unless targeting Russian market, then High)  
**Next Action:** Investigate sitemap-mainpages.xml error in Yandex Webmaster  
**Last Updated:** October 7, 2025