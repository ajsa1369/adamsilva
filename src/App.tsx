import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { Contact } from './pages/Contact';
import { OmnichannelPage } from './pages/services/OmnichannelPage';
import { WebsiteLandingPage } from './pages/services/WebsiteLandingPage';
import { CampaignManagementPage } from './pages/services/CampaignManagementPage';
import { SEOPPCPage } from './pages/services/SEOPPCPage';
import { ContentCreationPage } from './pages/services/ContentCreationPage';
import { LeadManagementPage } from './pages/services/LeadManagementPage';
import { OutreachPage } from './pages/services/OutreachPage';
import { SecurityCompliancePage } from './pages/services/SecurityCompliancePage';
import { AnalyticsPage } from './pages/services/AnalyticsPage';
import { IntentTargetingPage } from './pages/services/IntentTargetingPage';
import { CompetitorMonitoringPage } from './pages/services/CompetitorMonitoringPage';
import { InsightsIndex } from './pages/insights/InsightsIndex';
import { InsightsPage } from './pages/insights/InsightsPage';
import { Sitemap } from './pages/Sitemap';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/insights" element={<InsightsIndex />} />
          <Route path="/insights/the-ai-authority-imperative-gartners-50-traffic-decline-prediction" element={<InsightsPage />} />
          <Route path="/services/omnichannel-platforms" element={<OmnichannelPage />} />
          <Route path="/services/website-landing-pages" element={<WebsiteLandingPage />} />
          <Route path="/services/campaign-management" element={<CampaignManagementPage />} />
          <Route path="/services/seo-ppc" element={<SEOPPCPage />} />
          <Route path="/services/content-creation" element={<ContentCreationPage />} />
          <Route path="/services/lead-management" element={<LeadManagementPage />} />
          <Route path="/services/outreach" element={<OutreachPage />} />
          <Route path="/services/security-compliance" element={<SecurityCompliancePage />} />
          <Route path="/services/analytics" element={<AnalyticsPage />} />
          <Route path="/services/intent-targeting" element={<IntentTargetingPage />} />
          <Route path="/services/competitor-monitoring" element={<CompetitorMonitoringPage />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;