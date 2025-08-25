import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CampaignSetup from './pages/CampaignSetup';
import Audiences from './pages/Audiences';
import AudienceDetail from './pages/AudienceDetail';
import EmailConfiguration from './pages/EmailConfiguration';
import EmailCampaign from './pages/EmailCampaign';
import Analytics from './pages/Analytics';
import CampaignDashboard from './pages/CampaignDashboard';
import CampaignDetail from './pages/CampaignDetail';
import Auth from './pages/Auth';
import AIOnboarding from './pages/AIOnboarding';
import AICampaignBuilder from './pages/AICampaignBuilder';
import Settings from './pages/Settings';
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/landing" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaign-setup" element={<CampaignSetup />} />
        <Route path="/ai-campaign-builder" element={<AICampaignBuilder />} />
        <Route path="/audiences" element={<Audiences />} />
        <Route path="/audiences/:id" element={<AudienceDetail />} />
        <Route path="/email-configuration" element={<EmailConfiguration />} />
        <Route path="/email-campaign" element={<EmailCampaign />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/campaigns" element={<CampaignDashboard />} />
        <Route path="/campaigns/:id/details" element={<CampaignDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/ai-onboarding" element={<AIOnboarding />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>;
}