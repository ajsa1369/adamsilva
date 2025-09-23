# Troubleshooting Guide

**Adam Silva Consulting - Common Issues and Solutions**

This guide covers common deployment and operational issues with step-by-step solutions.

---

## 🚨 Critical Issues (Site Down)

### 🔴 Issue: Website Won't Load / 404 Error

**Symptoms:**
- Browser shows "This site can't be reached"
- 404 Not Found error
- Vercel shows "Deployment Failed"

**Quick Fixes:**

**1. Check Deployment Status**
```bash
# In Vercel dashboard
1. Go to Deployments tab
2. Look for failed deployments (red X)
3. Click on failed deployment
4. Review build logs for errors
```

**2. Common Deployment Fixes:**
```bash
# Fix: Missing index.html
- Ensure index.html is in root directory
- Check file naming (case-sensitive)
- Verify file uploaded to GitHub correctly

# Fix: Incorrect vercel.json
- Remove vercel.json temporarily
- Redeploy to test
- Add back with minimal configuration
```

**3. Emergency Rollback:**
```bash
# In Vercel dashboard
1. Go to Deployments tab
2. Find last working deployment
3. Click "..." menu
4. Select "Promote to Production"
```

### 🔴 Issue: Build Failures

**Symptoms:**
- Deployment status shows "Failed"
- Build logs show error messages
- Site doesn't update with new changes

**Solutions:**

**1. Check Build Logs:**
```bash
# In Vercel dashboard
1. Go to Deployments → Failed deployment
2. Click "View Function Logs"
3. Look for specific error messages
```

**2. Common Build Errors:**
```bash
# Error: "Module not found"
Solution: Check package.json dependencies
Action: Ensure all imports exist in files

# Error: "Out of memory"
Solution: Optimize large files/images
Action: Compress images, remove unused assets

# Error: "Build timeout"
Solution: Simplify build process
Action: Use pre-built static files
```

**3. Quick Fix for Static Sites:**
```bash
# Override build settings in Vercel
1. Go to Settings → General
2. Build & Output Settings:
   - Build Command: (leave empty)
   - Output Directory: ./
   - Install Command: (leave empty)
3. Redeploy
```

---

## ⚠️ High Priority Issues

### 🟠 Forms Not Working / Database Errors

**Symptoms:**
- Contact form shows "Submission failed"
- Newsletter signup doesn't work
- Console shows network errors

**Diagnosis Steps:**

**1. Check Environment Variables:**
```bash
# In Vercel Settings → Environment Variables
Required variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Verify:
- Exact spelling (case-sensitive)
- No extra spaces
- All environments selected (Production, Preview, Development)
```

**2. Test Supabase Connection:**
```bash
# Check Supabase project status
1. Go to supabase.com/dashboard
2. Find project: bogmboxekgfufesegdar
3. Check status:
   - Active: ✅ Good
   - Paused: ❌ Click "Resume"
   - Error: ❌ Contact Supabase support
```

**3. Database Table Issues:**
```sql
-- Check if tables exist
-- In Supabase SQL Editor:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contacts', 'newsletter_signups', 'chatbot_conversations');

-- Expected result: 3 tables
-- If missing, run the database setup SQL from BACKEND_SETUP.md
```

**Solutions:**

**Fix 1: Redeploy with Environment Variables**
```bash
1. Add missing environment variables
2. Go to Deployments → Redeploy
3. Wait for deployment completion
4. Test forms again
```

**Fix 2: Reactivate Supabase Project**
```bash
1. Login to Supabase dashboard
2. Go to project settings
3. Check billing status
4. Resume/restart project if needed
5. Wait 2-3 minutes for activation
```

**Fix 3: Recreate Database Tables**
```bash
1. Go to Supabase SQL Editor
2. Copy SQL from BACKEND_SETUP.md
3. Run the complete database setup script
4. Verify tables created successfully
```

### 🟠 AI Chatbot Not Responding

**Symptoms:**
- Chatbot shows "Thinking..." indefinitely
- No AI responses received
- Chatbot widget doesn't appear

**Diagnosis:**

**1. Check API Configuration:**
```bash
# Verify Gemini API key
1. Check VITE_GEMINI_API_KEY in Vercel
2. Test key at ai.google.dev
3. Check API quotas and limits
```

**2. Test Chatbot Endpoint:**
```bash
# Manual API test
curl -X POST https://bogmboxekgfufesegdar.supabase.co/functions/v1/ai-chatbot \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

**Solutions:**

**Fix 1: API Key Issues**
```bash
1. Get new Gemini API key from ai.google.dev
2. Add to Vercel environment variables
3. Redeploy site
4. Test chatbot functionality
```

**Fix 2: Fallback Mode**
```bash
# Chatbot will work without Gemini API
# Uses pre-programmed responses
# Check browser console for specific errors
```

---

## 🟡 Medium Priority Issues

### 🟡 Slow Performance / Poor PageSpeed Scores

**Symptoms:**
- PageSpeed Insights score below 80
- Slow loading times
- Poor user experience

**Quick Fixes:**

**1. Image Optimization:**
```bash
# Compress large images
1. Identify large images in /images/ folder
2. Compress using tools like TinyPNG
3. Replace in GitHub repository
4. Commit changes to trigger redeployment
```

**2. Caching Configuration:**
```json
// Add to vercel.json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**3. Preload Critical Resources:**
```html
<!-- Add to index.html head -->
<link rel="preload" href="/images/logo-clear.png" as="image">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

### 🟡 Mobile Display Issues

**Symptoms:**
- Layout broken on mobile devices
- Text too small or large
- Buttons not clickable

**Solutions:**

**1. Viewport Configuration:**
```html
<!-- Ensure this is in index.html head -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**2. CSS Media Queries:**
```css
/* Check responsive styles are working */
@media (max-width: 768px) {
  /* Mobile styles */
}
```

**3. Touch Target Sizes:**
```css
/* Ensure buttons are at least 44px */
button, .clickable {
  min-height: 44px;
  min-width: 44px;
}
```

### 🟡 SEO Issues

**Symptoms:**
- Poor search engine visibility
- Missing meta tags
- Indexing problems

**Quick SEO Fixes:**

**1. Essential Meta Tags:**
```html
<!-- Verify these exist in index.html -->
<title>Adam Silva Consulting - AI-Powered Digital Marketing</title>
<meta name="description" content="Professional AI-powered digital marketing solutions...">
<meta property="og:title" content="Adam Silva Consulting">
<meta property="og:description" content="...">
<meta property="og:image" content="/images/og-image.png">
```

**2. Sitemap and Robots:**
```bash
# Ensure these files exist:
/sitemap.xml
/robots.txt

# Check accessibility:
curl https://your-domain.com/sitemap.xml
curl https://your-domain.com/robots.txt
```

---

## 🟢 Low Priority Issues

### 🟢 Email Notifications Not Working

**Symptoms:**
- Forms submit but no emails received
- Email service errors in logs

**Solutions:**

**1. Check API Keys:**
```bash
# Verify email service configuration
- RESEND_API_KEY or SENDGRID_API_KEY
- Test keys in respective dashboards
- Check billing and quota limits
```

**2. Email Service Setup:**
```bash
# For Resend:
1. Go to resend.com dashboard
2. Verify domain authentication
3. Check sending limits
4. Review delivery logs

# For SendGrid:
1. Go to SendGrid dashboard
2. Verify sender authentication
3. Check reputation and delivery stats
```

### 🟢 Analytics Not Tracking

**Symptoms:**
- No visitor data in analytics
- Tracking codes not firing

**Solutions:**

**1. Google Analytics:**
```html
<!-- Verify tracking code in index.html -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**2. Test Tracking:**
```bash
# Use Google Analytics DebugView
1. Open browser dev tools
2. Go to your website
3. Check for gtag events in console
4. Verify in GA4 DebugView
```

---

## 🔍 Diagnostic Tools

### Browser Developer Tools

**Console Errors:**
```bash
1. Press F12 to open dev tools
2. Go to Console tab
3. Look for red error messages
4. Note specific error details
5. Check Network tab for failed requests
```

**Network Analysis:**
```bash
1. Open Network tab in dev tools
2. Reload page
3. Look for:
   - Failed requests (red)
   - Slow requests (>3s)
   - 404 errors
   - CORS errors
```

### External Testing Tools

**Performance Testing:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

**SEO Analysis:**
- [Google Search Console](https://search.google.com/search-console)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

**Security Testing:**
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

---

## 🆘 Emergency Procedures

### Complete Site Restoration

**If Everything Breaks:**

**1. Rollback to Last Working Version:**
```bash
# In Vercel dashboard
1. Go to Deployments
2. Find last successful deployment
3. Click "..." → "Promote to Production"
4. Wait for rollback completion
```

**2. Fresh Deployment:**
```bash
# If rollback doesn't work
1. Download original deployment package
2. Create new Vercel project
3. Upload files to new GitHub repository
4. Configure environment variables
5. Test functionality
```

### Database Recovery

**If Database Issues Persist:**

**1. Reset Database:**
```sql
-- In Supabase SQL Editor
-- WARNING: This deletes all data
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS newsletter_signups;
DROP TABLE IF EXISTS chatbot_conversations;

-- Then run the setup SQL from BACKEND_SETUP.md
```

**2. Backup Current Data:**
```bash
# Before any major changes
1. Go to Supabase Table Editor
2. Export each table to CSV
3. Save backups locally
4. Proceed with fixes
```

---

## 📩 Getting Help

### Support Channels

**Vercel Support:**
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Support: Pro plans get priority support

**Supabase Support:**
- Documentation: [supabase.com/docs](https://supabase.com/docs)
- Discord: [discord.supabase.com](https://discord.supabase.com)
- GitHub Issues: [github.com/supabase/supabase](https://github.com/supabase/supabase)

**GitHub Support:**
- Help Center: [support.github.com](https://support.github.com)
- Community: [github.community](https://github.community)
- Status: [githubstatus.com](https://githubstatus.com)

### Creating Support Tickets

**Information to Include:**

```
1. Exact error message (copy/paste)
2. Steps to reproduce the issue
3. Browser and device information
4. Screenshots of errors
5. Time when issue started
6. Any recent changes made
7. Live URL and affected pages
```

**Template for Support Requests:**

```
Subject: [URGENT] Adam Silva Consulting Website Issue

Problem: [Brief description]

Steps to reproduce:
1. Go to [URL]
2. Click [button/link]
3. Expected: [what should happen]
4. Actual: [what actually happens]

Error messages:
[Copy exact error text]

Environment:
- Browser: Chrome 120.0.0.0
- Device: Desktop/Mobile
- URL: https://adam-silva-consulting-ajsa1369.vercel.app
- Time: [when issue occurred]

Recent changes:
[Any updates made in last 24 hours]

Attachments:
- Screenshot of error
- Browser console log
- Network request details
```

---

## 📅 Maintenance Schedule

### Daily Monitoring
- [ ] Check website loads correctly
- [ ] Verify forms are working
- [ ] Monitor error logs

### Weekly Tasks
- [ ] Review performance metrics
- [ ] Check Supabase usage
- [ ] Test all interactive features
- [ ] Backup critical data

### Monthly Tasks
- [ ] Update dependencies
- [ ] Review security settings
- [ ] Analyze traffic patterns
- [ ] Optimize performance

### Quarterly Tasks
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Content accuracy verification
- [ ] Technology stack updates

---

**🛠️ Remember: Most issues can be resolved quickly with systematic troubleshooting. Start with the simplest solutions first, and escalate to support channels only when necessary.**

**Emergency Contact Priority:**
1. Check this troubleshooting guide first
2. Search official documentation
3. Test solutions in staging/preview environment
4. Contact appropriate support channel
5. Document resolution for future reference