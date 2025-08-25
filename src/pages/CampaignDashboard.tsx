import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { PlusIcon, InboxIcon, ArrowUpIcon, ArrowDownIcon, BarChart3Icon, MailIcon, BuildingIcon, InfoIcon, ChevronRightIcon, UsersIcon, SendIcon, XIcon, ArrowRightIcon } from 'lucide-react';
const CampaignDashboard = () => {
  const navigate = useNavigate();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showExpandFlow, setShowExpandFlow] = useState(false);
  const [expandCompanyCount, setExpandCompanyCount] = useState(25);
  // Mock campaign data
  const campaigns = [{
    id: 1,
    name: 'London Estate Agencies - Call Handling',
    status: 'active',
    startDate: '2023-09-01',
    totalProspects: 328,
    emailsSent: 126,
    opens: 836,
    responses: 41,
    openRate: 85,
    responseRate: 32.4,
    trend: 'up',
    audienceMatch: 85
  }];
  // Handle expand campaign
  const handleExpandCampaign = () => {
    setShowExpandFlow(true);
  };
  // Handle expansion submission
  const handleExpansionSubmit = () => {
    // Add logic to handle the expansion
    setShowExpandFlow(false);
    // Show success message or navigate
  };
  // Close expand flow
  const handleCloseExpandFlow = () => {
    setShowExpandFlow(false);
  };
  if (showEmptyState) {
    return <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Your Campaigns
                  </h1>
                  <p className="text-gray-500">
                    Create and manage your outreach campaigns
                  </p>
                </div>
              </div>
              {/* Empty State */}
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <InboxIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No campaigns yet
                </h2>
                <p className="text-gray-500 mb-8 max-w-md">
                  Create your first campaign to start finding and connecting
                  with prospects who need your solution
                </p>
                <Button icon={<PlusIcon className="w-5 h-5" />} onClick={() => navigate('/ai-campaign-builder')} size="lg">
                  Create New Campaign
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Your Campaigns
                </h1>
                <p className="text-gray-500">
                  Manage your outreach to target prospects
                </p>
              </div>
              <Button icon={<PlusIcon className="w-4 h-4 mr-2" />} onClick={() => navigate('/ai-campaign-builder')}>
                Create New Campaign
              </Button>
            </div>
            {/* Campaigns List */}
            <div className="space-y-6">
              {campaigns.map(campaign => <Card key={campaign.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">
                            {campaign.name}
                          </h3>
                          <Badge variant={campaign.status === 'active' ? 'success' : 'default'}>
                            {campaign.status === 'active' ? 'Active' : 'Draft'}
                          </Badge>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          Started {campaign.startDate} •{' '}
                          {campaign.totalProspects} prospects
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-primary bg-opacity-10 text-primary text-sm font-medium px-3 py-1 rounded-full flex items-center mr-3">
                          <BuildingIcon className="w-3.5 h-3.5 mr-1" />
                          <span>Match: {campaign.audienceMatch}%</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/campaigns/${campaign.id}/details`)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Email Metrics */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm">
                            Prospects Contacted
                          </span>
                          {campaign.trend === 'up' && <ArrowUpIcon className="w-4 h-4 text-success" />}
                          {campaign.trend === 'down' && <ArrowDownIcon className="w-4 h-4 text-error" />}
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900">
                            17
                          </span>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm">
                            Emails Sent
                          </span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900">
                            126
                          </span>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm">
                            Open Rate
                          </span>
                          {campaign.openRate > 80 && <ArrowUpIcon className="w-4 h-4 text-success" />}
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900">
                            {campaign.openRate}%
                          </span>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm">
                            Response Rate
                          </span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900">
                            {campaign.responseRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Campaign Actions Footer */}
                  <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-4">
                        Campaign Quality:
                      </span>
                      <div className="flex items-center">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                          <div className={`h-full ${campaign.audienceMatch > 90 ? 'bg-success' : campaign.audienceMatch > 80 ? 'bg-warning' : 'bg-error'}`} style={{
                        width: `${campaign.audienceMatch}%`
                      }}></div>
                        </div>
                        <span className="font-medium text-sm">
                          {campaign.audienceMatch / 10}/10
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" icon={<BarChart3Icon className="w-4 h-4 mr-1" />} onClick={() => navigate(`/analytics?campaign=${campaign.id}`)}>
                        Analytics
                      </Button>
                      <Button size="sm" onClick={handleExpandCampaign} icon={<ChevronRightIcon className="w-4 h-4 ml-1" />} iconPosition="right">
                        Expand campaign
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>
        </main>
      </div>
      {/* Expand Campaign Modal */}
      {showExpandFlow && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Expand Campaign
              </h3>
              <button onClick={handleCloseExpandFlow} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                How many more companies would you like to add to your London
                Estate Agencies campaign?
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {expandCompanyCount}
                  </span>
                  <span className="text-sm text-gray-500 block">
                    = {expandCompanyCount} credits
                  </span>
                </div>
                <div className="mb-4">
                  <input type="range" min="10" max="200" step="5" value={expandCompanyCount} onChange={e => setExpandCompanyCount(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Fewer companies (10)</span>
                    <span>More companies (200)</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-4 mb-6">
                <h5 className="font-medium text-gray-900 mb-2">
                  What happens next?
                </h5>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRightIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">
                      We'll find {expandCompanyCount} more London estate
                      agencies with similar profiles
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRightIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">
                      You'll be able to review and approve the new prospects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRightIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">
                      Your campaign will continue with the same messaging and
                      settings
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleExpansionSubmit} className="flex-1" icon={<SendIcon className="w-4 h-4 mr-2" />}>
                  Expand to {expandCompanyCount} more companies
                </Button>
                <Button variant="outline" onClick={handleCloseExpandFlow}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default CampaignDashboard;