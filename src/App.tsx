import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
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
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/omnichannel-communication" element={<OmnichannelPage />} />
            <Route path="/services/website-landing-pages" element={<WebsiteLandingPage />} />
            <Route path="/services/campaign-management" element={<CampaignManagementPage />} />
            <Route path="/services/seo-ppc" element={<SEOPPCPage />} />
            <Route path="/services/content-creation" element={<ContentCreationPage />} />
            <Route path="/services/lead-management" element={<LeadManagementPage />} />
            <Route path="/services/outreach-partnerships" element={<OutreachPage />} />
            <Route path="/services/security-compliance" element={<SecurityCompliancePage />} />
            <Route path="/services/analytics-reporting" element={<AnalyticsPage />} />
            <Route path="/services/intent-targeting" element={<IntentTargetingPage />} />
            <Route path="/services/competitor-monitoring" element={<CompetitorMonitoringPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;