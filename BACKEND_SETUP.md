# Backend Setup and Activation Guide

**Adam Silva Consulting - Supabase Backend Configuration**

This guide covers the backend setup required for full website functionality including contact forms, newsletter signup, and AI chatbot.

---

## 📋 Backend Overview

### Current Status
- **Frontend**: Fully functional static website
- **Backend**: Supabase-powered with database and edge functions
- **Lead Capture**: Contact forms and newsletter signup
- **AI Features**: Intelligent chatbot with Gemini AI
- **Email**: Automated notifications for form submissions

### What Backend Provides
- ✅ Contact form submissions storage
- ✅ Newsletter signup management
- ✅ AI chatbot conversations
- ✅ Email notifications
- ✅ Admin dashboard for leads
- ✅ Analytics and reporting

---

## 🚀 Quick Backend Activation

### Prerequisites
- Vercel deployment completed
- Environment variables configured
- Supabase project access

### Step 1: Verify Supabase Project Status

1. Go to [Supabase Dashboard](https://app.supabase.com/projects)
2. Find project: `bogmboxekgfufesegdar`
3. Check status:
   - ✅ **Active**: Proceed to Step 2
   - ❌ **Paused**: Click "Resume" and wait for activation
   - ❌ **Missing**: Contact support for project restoration

### Step 2: Database Schema Setup

**Option A: Using Supabase Dashboard (Recommended)**

1. In Supabase project, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create core tables for website functionality
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    service TEXT,
    message TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    postal_address TEXT,
    opted_in BOOLEAN NOT NULL DEFAULT true,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chatbot_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    ai_provider TEXT DEFAULT 'gemini',
    confidence_score DECIMAL(3,2),
    user_intent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_session ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_created ON chatbot_conversations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (controlled by application logic)
CREATE POLICY "Enable insert for all users" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON newsletter_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON chatbot_conversations FOR INSERT WITH CHECK (true);

-- Create policies for reading (admin access)
CREATE POLICY "Enable read for service role" ON contacts FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Enable read for service role" ON newsletter_signups FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Enable read for service role" ON chatbot_conversations FOR SELECT USING (auth.role() = 'service_role');
```

4. Click **"Run"**
5. Verify "Success" message

**Option B: Using Command Line**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to project
supabase link --project-ref bogmboxekgfufesegdar

# Apply database migrations
supabase db push
```

### Step 3: Deploy Edge Functions

The website includes several edge functions for enhanced functionality:

**Functions to Deploy:**
1. **Contact Form Handler** - Processes contact submissions
2. **Newsletter Signup** - Manages email subscriptions
3. **AI Chatbot** - Handles intelligent conversations
4. **Email Service** - Sends notifications

**Deployment Commands:**

```bash
# Navigate to your project directory
cd vercel-deployment-package

# Deploy contact form handler
supabase functions deploy contact-form

# Deploy newsletter signup
supabase functions deploy newsletter-signup

# Deploy AI chatbot
supabase functions deploy ai-chatbot

# Deploy email service
supabase functions deploy email-service
```

**Alternative: Manual Deployment via Dashboard**

1. Go to Supabase Dashboard → **Edge Functions**
2. Click **"Create a new function"**
3. Upload each function from `supabase/functions/` directory
4. Deploy each function

---

## 📊 Testing Backend Functionality

### Test Contact Form

1. Visit your website: `https://adam-silva-consulting-ajsa1369.vercel.app`
2. Navigate to Contact page
3. Fill out form with test data:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Company**: Test Company
   - **Service**: AI Engine Optimization
   - **Message**: Testing contact form functionality
4. Submit form
5. Verify success message appears
6. Check Supabase Dashboard → **Table Editor** → `contacts` table
7. Confirm new row appears with submission data

### Test Newsletter Signup

1. Find newsletter signup form (usually in footer)
2. Enter test email: `newsletter@example.com`
3. Submit form
4. Verify confirmation message
5. Check Supabase Dashboard → **Table Editor** → `newsletter_signups` table
6. Confirm new subscription recorded

### Test AI Chatbot

1. Look for chatbot widget (usually bottom-right corner)
2. Click to open chat interface
3. Send test message: "What services do you offer?"
4. Verify AI response appears
5. Check Supabase Dashboard → **Table Editor** → `chatbot_conversations` table
6. Confirm conversation logged

---

## 🛠️ Troubleshooting Backend Issues

### Database Connection Errors

**Symptoms:**
- Forms show "Failed to submit" error
- Console shows "Network Error" or "Connection timeout"

**Solutions:**
1. Check Supabase project status (might be paused)
2. Verify environment variables in Vercel
3. Confirm database URL is correct
4. Test connection using Supabase Dashboard

### Edge Functions Not Working

**Symptoms:**
- API endpoints return 404 errors
- Functions timeout or fail

**Solutions:**
1. Verify functions are deployed
2. Check function logs in Supabase Dashboard
3. Ensure environment variables are set for functions
4. Redeploy functions if necessary

### AI Chatbot Not Responding

**Symptoms:**
- Chatbot shows "Thinking..." indefinitely
- No response from AI

**Solutions:**
1. Check `VITE_GEMINI_API_KEY` environment variable
2. Verify Gemini API quota not exceeded
3. Test API key in Google AI Studio
4. Check function logs for errors

### Email Notifications Not Sent

**Symptoms:**
- Forms submit successfully but no emails received
- Email service errors in logs

**Solutions:**
1. Verify `RESEND_API_KEY` or `SENDGRID_API_KEY`
2. Check email service quota and billing
3. Verify sender domain configuration
4. Test API key in email service dashboard

---

## 📈 Monitoring and Analytics

### Supabase Dashboard Monitoring

**Database Activity:**
1. Go to Supabase Dashboard → **Reports**
2. Monitor:
   - Total requests per day
   - Database size usage
   - API response times
   - Error rates

**Table Data:**
1. Go to **Table Editor**
2. Review:
   - `contacts` - New lead submissions
   - `newsletter_signups` - Email subscriptions
   - `chatbot_conversations` - AI interactions

### Function Logs

1. Go to **Edge Functions**
2. Click on function name
3. View **Logs** tab
4. Monitor for errors or performance issues

### Usage Limits

**Supabase Free Tier:**
- 500MB database storage
- 50,000 monthly active users
- 2GB bandwidth
- 500,000 Edge Function invocations

**Upgrade Triggers:**
- Database approaching 400MB
- High traffic causing rate limits
- Need for additional features

---

## 🔄 Backup and Recovery

### Database Backup

**Automatic Backups:**
- Supabase automatically backs up Pro plan databases
- Free tier: Manual backup recommended

**Manual Backup:**
```bash
# Export database to SQL file
supabase db dump > backup-$(date +%Y%m%d).sql

# Export specific table
supabase db dump --table contacts > contacts-backup.sql
```

### Data Export

**CSV Export:**
1. Go to Supabase Dashboard → **Table Editor**
2. Select table (`contacts`, `newsletter_signups`, etc.)
3. Click **"Export"** → **"CSV"**
4. Download file for external backup

### Function Backup

All function code is already backed up in your GitHub repository in the `supabase/functions/` directory.

---

## 👥 Admin Access and Management

### Accessing Lead Data

1. **Supabase Dashboard**: Direct database access
2. **SQL Queries**: Custom reporting
3. **API Access**: Programmatic data retrieval

### Example Admin Queries

**Recent Contacts (Last 7 Days):**
```sql
SELECT name, email, company, service, created_at 
FROM contacts 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

**Newsletter Signup Statistics:**
```sql
SELECT COUNT(*) as total_signups,
       COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days
FROM newsletter_signups;
```

**Chatbot Engagement:**
```sql
SELECT DATE(created_at) as date, COUNT(*) as conversations
FROM chatbot_conversations
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🔄 Maintenance Tasks

### Weekly Tasks
- [ ] Review new contact submissions
- [ ] Check newsletter signup stats
- [ ] Monitor AI chatbot performance
- [ ] Review error logs

### Monthly Tasks
- [ ] Export data backups
- [ ] Review usage metrics
- [ ] Check API quotas and billing
- [ ] Update environment variables if needed

### Quarterly Tasks
- [ ] Security audit of RLS policies
- [ ] Performance optimization review
- [ ] Backup strategy evaluation
- [ ] Feature usage analysis

---

**🎉 Backend activation complete! Your website now has full database functionality with contact forms, newsletter signup, and AI chatbot capabilities.**

**Quick Verification:**
1. Test contact form submission
2. Verify data appears in Supabase
3. Test AI chatbot interaction
4. Confirm newsletter signup works

**Support Contacts:**
- Supabase Support: [support@supabase.com](mailto:support@supabase.com)
- Vercel Support: [vercel.com/help](https://vercel.com/help)
- Google AI Support: [ai.google.dev/support](https://ai.google.dev/support)