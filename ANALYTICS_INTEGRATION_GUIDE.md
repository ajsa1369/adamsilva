# Analytics Integration Guide
## Comprehensive Tracking for SEO/AEO/GEO Performance

---

## 🎯 Overview

Proper analytics are **essential** for:
- Measuring SEO performance
- Tracking AEO citations
- Understanding user behavior
- Optimizing conversions
- Data-driven decisions

---

## 📈 Google Analytics 4 (Already Integrated)

### Current Setup
**Tracking ID**: `G-7NEYMM8B1R`

**Location**: `index.html`
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7NEYMM8B1R"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7NEYMM8B1R');
</script>
```

### ✅ What's Tracked Automatically
- Page views
- Session duration
- Bounce rate
- User demographics
- Traffic sources
- Device types
- Geographic location

---

## 🔍 Enhanced Event Tracking

### 1. Track Form Submissions

```tsx
// In your contact form component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Track event
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_submit', {
      event_category: 'Contact',
      event_label: 'Contact Form',
      value: 1
    });
  }
  
  // Submit form...
};
```

### 2. Track Button Clicks

```tsx
// Track CTA clicks
const handleCTAClick = (buttonName: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'cta_click', {
      event_category: 'Engagement',
      event_label: buttonName,
      value: 1
    });
  }
};

// Usage
<button onClick={() => handleCTAClick('Get Started')}>
  Get Started
</button>
```

### 3. Track Scroll Depth

```tsx
// Add to your main component
useEffect(() => {
  const trackScrollDepth = () => {
    const scrollPercentage = 
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 75 && !sessionStorage.getItem('scroll_75')) {
      sessionStorage.setItem('scroll_75', 'true');
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'scroll_depth', {
          event_category: 'Engagement',
          event_label: '75%',
          value: 75
        });
      }
    }
  };
  
  window.addEventListener('scroll', trackScrollDepth);
  return () => window.removeEventListener('scroll', trackScrollDepth);
}, []);
```

### 4. Track External Links

```tsx
// Track outbound links
const handleExternalLink = (url: string, label: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: 'Outbound Link',
      event_label: label,
      value: url
    });
  }
};

// Usage
<a 
  href="https://external-site.com"
  onClick={() => handleExternalLink('https://external-site.com', 'Partner Site')}
  target="_blank"
  rel="noopener noreferrer"
>
  Visit Partner
</a>
```

---

## 🤖 AEO-Specific Tracking

### Track AI Engine Referrals

Add to your analytics setup:

```tsx
// Detect AI engine referrals
useEffect(() => {
  const referrer = document.referrer.toLowerCase();
  
  const aiEngines = [
    { name: 'ChatGPT', domains: ['chat.openai.com', 'chatgpt.com'] },
    { name: 'Claude', domains: ['claude.ai'] },
    { name: 'Perplexity', domains: ['perplexity.ai'] },
    { name: 'Google AI', domains: ['gemini.google.com', 'bard.google.com'] },
    { name: 'Bing AI', domains: ['bing.com/chat'] }
  ];
  
  const aiEngine = aiEngines.find(engine => 
    engine.domains.some(domain => referrer.includes(domain))
  );
  
  if (aiEngine && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'ai_engine_referral', {
      event_category: 'AEO',
      event_label: aiEngine.name,
      value: 1
    });
  }
}, []);
```

### Track Search Queries from AI Engines

```tsx
// Track URL parameters from AI engines
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || urlParams.get('query');
  
  if (query && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'ai_search_query', {
      event_category: 'AEO',
      event_label: query,
      value: 1
    });
  }
}, []);
```

---

## 📄 Google Search Console Integration

### Already Connected
✅ Your site is verified in GSC
✅ Sitemaps submitted
✅ Coverage being monitored

### Key Metrics to Track Weekly

1. **Performance Report**
   - Total clicks
   - Total impressions
   - Average CTR
   - Average position

2. **Coverage Report**
   - Valid pages
   - Pages with warnings
   - Excluded pages
   - Error pages

3. **Enhancements**
   - Mobile usability
   - Core Web Vitals
   - AMP (if applicable)

4. **Links**
   - Top linking sites
   - Top linking pages
   - Internal links

---

## 📊 Custom Dashboards

### Create in Google Analytics 4

#### Dashboard 1: SEO Performance
**Metrics**:
- Organic traffic trend
- Top landing pages
- Bounce rate by page
- Average session duration
- Goal completions

#### Dashboard 2: AEO Performance
**Metrics**:
- AI engine referrals
- Traffic from AI engines
- Conversion rate from AI sources
- Top pages visited from AI engines

#### Dashboard 3: Conversion Tracking
**Metrics**:
- Form submissions
- CTA clicks
- Email signups
- Phone clicks
- Download events

---

## 🛠️ Implementation Guide

### Step 1: Create Analytics Utility

**File**: `src/utils/analytics.ts`

```typescript
// Analytics tracking utilities

export const trackEvent = (
  eventName: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-7NEYMM8B1R', {
      page_path: url
    });
  }
};

export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: 'G-7NEYMM8B1R/' + conversionName,
      value: value
    });
  }
};

export const trackAIReferral = (engine: string) => {
  trackEvent('ai_engine_referral', 'AEO', engine, 1);
};

export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'Contact', formName, 1);
};
```

### Step 2: Add to Your Components

```tsx
import { trackEvent, trackFormSubmission } from '../utils/analytics';

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the submission
    trackFormSubmission('Contact Form');
    
    // Process form...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Step 3: Track Page Views Automatically

Add to your `useSEO` hook:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

export function useSEO() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view
    trackPageView(location.pathname + location.search);
  }, [location]);
  
  // ... rest of hook
}
```

---

## 📝 Monthly Reporting Template

### SEO Metrics
- [ ] Organic traffic (vs last month)
- [ ] Keyword rankings (top 10)
- [ ] Pages indexed (vs last month)
- [ ] Average position
- [ ] Click-through rate
- [ ] Bounce rate

### AEO Metrics
- [ ] AI engine referrals
- [ ] Citations tracked (manual)
- [ ] Traffic from AI sources
- [ ] Conversion rate from AI

### Engagement Metrics
- [ ] Average session duration
- [ ] Pages per session
- [ ] New vs returning visitors
- [ ] Top landing pages
- [ ] Top exit pages

### Conversion Metrics
- [ ] Form submissions
- [ ] CTA clicks
- [ ] Goal completions
- [ ] Conversion rate
- [ ] Cost per acquisition

---

## ✅ Analytics Checklist

### Setup
- [x] Google Analytics 4 installed
- [x] Google Search Console connected
- [ ] Enhanced event tracking implemented
- [ ] Custom dashboards created
- [ ] Goals/conversions configured

### Weekly Tasks
- [ ] Review GA4 dashboard
- [ ] Check GSC performance
- [ ] Monitor Core Web Vitals
- [ ] Track AI engine referrals
- [ ] Review top pages

### Monthly Tasks
- [ ] Generate comprehensive report
- [ ] Analyze traffic trends
- [ ] Review conversion rates
- [ ] Identify optimization opportunities
- [ ] Update strategy based on data

---

## 🎯 Goals to Track

### Micro-Conversions
1. Email signup
2. PDF download
3. Video watch (50%+)
4. Scroll depth (75%+)
5. Time on site (3+ minutes)

### Macro-Conversions
1. Contact form submission
2. Phone call
3. Quote request
4. Service inquiry
5. Consultation booking

---

**Last Updated**: October 10, 2025
**Status**: Ready for Enhanced Implementation
**Priority**: MEDIUM