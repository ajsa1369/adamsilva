# GitHub Repository Update Guide

## Quick Fix Status ✅
Your `package.json` file has been successfully updated with the `"next": "latest"` dependency that was causing the Vercel deployment failure.

## Method 1: Quick Update via GitHub Web Interface (Recommended)

### Step 1: Update package.json Directly
1. Go to your GitHub repository: `https://github.com/ajsa1369/adamsilva`
2. Navigate to the `package.json` file
3. Click the **Edit** (pencil) icon
4. Replace the entire content with this corrected version:

```json
{
  "name": "adam-silva-consulting",
  "version": "1.0.0",
  "description": "Adam Silva Consulting - AI-Powered Digital Marketing Solutions",
  "main": "index.html",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export"
  },
  "keywords": [
    "digital-marketing",
    "ai-consulting",
    "seo",
    "content-automation",
    "lead-generation"
  ],
  "author": "Adam Silva Consulting",
  "license": "MIT",
  "dependencies": {
    "next": "latest",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "serve": "^14.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

5. Scroll down and commit the changes with message: "Fix: Add missing Next.js dependency for Vercel deployment"

### Step 2: Test Vercel Deployment
1. Go back to your Vercel dashboard
2. Click "Deploy" to retry the deployment
3. The deployment should now succeed with the Next.js dependency properly configured

## Method 2: Complete Repository Update (If you want all latest files)

### If you want to update your entire repository with all the latest files:

1. Download the updated project: `adam-silva-consulting-updated.zip`
2. Extract the zip file to your local computer
3. Replace the contents of your local Git repository with these new files
4. Commit and push all changes:

```bash
git add .
git commit -m "Update project with fixed package.json and latest features"
git push origin main
```

## What Was Fixed

The key issue was in the `dependencies` section of `package.json`:
- **Before**: Missing `"next"` dependency
- **After**: Added `"next": "latest"` 

This dependency is essential for Vercel to properly deploy Next.js applications.

## Next Steps

1. Try redeploying on Vercel after updating the `package.json`
2. If deployment succeeds, your site should be live with:
   - All images properly loaded
   - Interactive lead capture functionality on `/authority-hub/guides`
   - Full backend integration with Supabase

## Environment Variables Reminder

Ensure these environment variables are still configured in your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` (for email functionality)

The quick Method 1 should resolve your deployment issue immediately!