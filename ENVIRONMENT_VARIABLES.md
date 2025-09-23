# Environment Variables Reference Sheet

**Adam Silva Consulting - Vercel Deployment**

This document provides a complete reference for all environment variables needed for the Adam Silva Consulting website deployment.

---

## 🔑 Required Variables (Core Functionality)

These variables are **essential** for basic website functionality:

### Supabase Database Connection

```env
VITE_SUPABASE_URL=https://bogmboxekgfufesegdar.supabase.co
```
- **Purpose**: Connects frontend to Supabase backend
- **Used for**: Contact forms, newsletter signup, data storage
- **Required**: Yes
- **Environment**: Production, Preview, Development

```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZ21ib3hla2dmdWZlc2VnZGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjQ4NDUsImV4cCI6MjA2NzUwMDg0NX0.vtRFssTRLsMQRIDgJrbq6BlbJtVJSCYq7KNL8mQDWxQ
```
- **Purpose**: Public API key for Supabase authentication
- **Used for**: Frontend database operations
- **Required**: Yes
- **Environment**: Production, Preview, Development
- **Security**: Safe to expose (public key)

---

## 🎆 Optional Variables (Enhanced Features)

These variables add enhanced functionality but are not required for basic operation:

### AI Chatbot Enhancement

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
- **Purpose**: Enables intelligent AI chatbot responses
- **Used for**: Enhanced chatbot conversations
- **Required**: No (falls back to mock responses)
- **How to get**: [Google AI Studio](https://makersuite.google.com/)
- **Cost**: Free tier available
- **Fallback**: Uses pre-programmed responses without this key

### Email Notifications

```env
RESEND_API_KEY=your_resend_api_key_here
```
- **Purpose**: Sends email notifications for form submissions
- **Used for**: Contact form and newsletter notifications
- **Required**: No (forms still work without email alerts)
- **How to get**: [Resend.com](https://resend.com/)
- **Cost**: Free tier: 3,000 emails/month
- **Alternative**: Can use SendGrid, Mailgun, or other providers

### Maps Integration

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```
- **Purpose**: Displays interactive maps (if location features added)
- **Used for**: Contact page maps, location services
- **Required**: No (not currently used)
- **How to get**: [Google Cloud Console](https://console.cloud.google.com/)
- **Cost**: Free tier available

### Alternative Email Services

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
```
- **Purpose**: Alternative email service provider
- **Used for**: Email notifications (alternative to Resend)
- **Required**: No
- **How to get**: [SendGrid.com](https://sendgrid.com/)

---

## 🚀 Quick Setup Instructions

### Step 1: Add Required Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these two required variables:

```env
VITE_SUPABASE_URL=https://bogmboxekgfufesegdar.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZ21ib3hla2dmdWZlc2VnZGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjQ4NDUsImV4cCI6MjA2NzUwMDg0NX0.vtRFssTRLsMQRIDgJrbq6BlbJtVJSCYq7KNL8mQDWxQ
```

4. Select all environments: **Production**, **Preview**, **Development**
5. Click **Save**
6. **Redeploy** your site

### Step 2: Add Optional Variables (Later)

Add these as needed for enhanced functionality:

```env
# For AI chatbot enhancement
VITE_GEMINI_API_KEY=your_api_key

# For email notifications
RESEND_API_KEY=your_api_key
```

---

## 📝 Variable Naming Conventions

### Frontend Variables (Client-Side)
- **Prefix**: `VITE_`
- **Purpose**: Accessible in browser JavaScript
- **Security**: Only use for non-sensitive data
- **Examples**: `VITE_SUPABASE_URL`, `VITE_GEMINI_API_KEY`

### Backend Variables (Server-Side)
- **No prefix**: Standard environment variables
- **Purpose**: Server-side functions only
- **Security**: Can contain sensitive data
- **Examples**: `RESEND_API_KEY`, `SENDGRID_API_KEY`

---

## 🔒 Security Best Practices

### Safe to Expose (Public Keys)
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ `VITE_GOOGLE_MAPS_API_KEY`
- ✅ `VITE_GEMINI_API_KEY`

### Keep Private (Server-Side Only)
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ `RESEND_API_KEY`
- ❌ `SENDGRID_API_KEY`
- ❌ Database passwords

### Important Notes
- Frontend variables (`VITE_` prefix) are visible in browser
- Never put sensitive keys in frontend variables
- Use Row Level Security (RLS) in Supabase for data protection
- Rotate API keys regularly

---

## 🛠️ Troubleshooting Environment Variables

### Variables Not Working?

**✅ Check Variable Names**
- Verify exact spelling and case
- Ensure `VITE_` prefix for frontend variables
- No spaces in variable names

**✅ Check Environment Selection**
- Variables set for Production AND Preview
- Development environment if testing locally

**✅ Redeploy After Changes**
- Environment variables require redeployment
- Go to Deployments → Redeploy latest

**✅ Verify Values**
- Check for trailing spaces
- Ensure complete API keys
- Test keys in respective service dashboards

### Common Error Messages

**"Supabase client not initialized"**
- Missing `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY`
- Check variable names and values

**"Network Error"**
- Incorrect Supabase URL
- Project might be paused (check Supabase dashboard)

**"API Key Invalid"**
- Wrong or expired API key
- Regenerate key in service provider dashboard

---

## 📊 Getting API Keys

### Google Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create new project or select existing
3. Enable Gemini API
4. Create API key
5. Copy key for `VITE_GEMINI_API_KEY`

### Resend Email API Key
1. Sign up at [Resend.com](https://resend.com/)
2. Verify your domain (optional for testing)
3. Go to API Keys section
4. Create new API key
5. Copy key for `RESEND_API_KEY`

### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Maps JavaScript API
4. Create credentials → API Key
5. Restrict key to your domain
6. Copy key for `VITE_GOOGLE_MAPS_API_KEY`

---

## 📈 Usage Limits and Monitoring

### Supabase (Database)
- **Free Tier**: 500MB database, 50K monthly active users
- **Monitoring**: Supabase dashboard → Usage
- **Upgrade**: $25/month for Pro plan

### Google Gemini AI
- **Free Tier**: 60 requests/minute, 1,500 requests/day
- **Monitoring**: Google AI Studio → Quotas
- **Upgrade**: Pay-per-use pricing

### Resend (Email)
- **Free Tier**: 3,000 emails/month
- **Monitoring**: Resend dashboard → Usage
- **Upgrade**: $20/month for 50,000 emails

### Google Maps
- **Free Tier**: $200 credit/month (~28,500 map loads
- **Monitoring**: Google Cloud Console → Billing
- **Cost Control**: Set usage limits

---

**📝 Quick Reference**

**Minimum Required (2 variables):**
```env
VITE_SUPABASE_URL=https://bogmboxekgfufesegdar.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZ21ib3hla2dmdWZlc2VnZGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjQ4NDUsImV4cCI6MjA2NzUwMDg0NX0.vtRFssTRLsMQRIDgJrbq6BlbJtVJSCYq7KNL8mQDWxQ
```

**Full Feature Set (4 variables):**
```env
VITE_SUPABASE_URL=https://bogmboxekgfufesegdar.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZ21ib3hla2dmdWZlc2VnZGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjQ4NDUsImV4cCI6MjA2NzUwMDg0NX0.vtRFssTRLsMQRIDgJrbq6BlbJtVJSCYq7KNL8mQDWxQ
VITE_GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```