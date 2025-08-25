import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CheckIcon, XIcon, ChevronDownIcon, ArrowUpDownIcon } from 'lucide-react';
const LeadApproval = () => {
  const navigate = useNavigate();
  const [selectedLeads, setSelectedLeads] = useState<number[]>([1, 2, 4]);
  const [skippedLeads, setSkippedLeads] = useState<number[]>([]);
  // Mock data for leads
  const leads = [{
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO & Founder',
    company: 'GrowthMetrics',
    location: 'San Francisco, CA',
    matchScore: 92,
    reason: 'Recently raised $2M seed round, expanding marketing team',
    news: 'Published article on scaling B2B SaaS companies',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    logo: 'https://logo.clearbit.com/growthmetrics.io'
  }, {
    id: 2,
    name: 'Michael Chen',
    title: 'CTO',
    company: 'DevScale',
    location: 'Austin, TX',
    matchScore: 88,
    reason: 'Growing engineering team, looking for automation tools',
    news: 'Recently mentioned automation as a key focus for 2023',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    logo: 'https://logo.clearbit.com/devscale.io'
  }, {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Marketing Director',
    company: 'BrandBoost',
    location: 'New York, NY',
    matchScore: 85,
    reason: 'Recently published article about scaling outreach',
    news: 'Company just announced expansion to European markets',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    logo: 'https://logo.clearbit.com/brandboost.com'
  }, {
    id: 4,
    name: 'David Wilson',
    title: 'Head of Sales',
    company: 'SalesPro',
    location: 'Chicago, IL',
    matchScore: 90,
    reason: 'Looking for sales automation solutions',
    news: 'Spoke at SalesConf about optimizing outreach strategies',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    logo: 'https://logo.clearbit.com/salespro.io'
  }];
  const toggleLeadSelection = (id: number) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]);
    if (skippedLeads.includes(id)) {
      setSkippedLeads(prev => prev.filter(leadId => leadId !== id));
    }
  };
  const skipLead = (id: number) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(prev => prev.filter(leadId => leadId !== id));
    }
    setSkippedLeads(prev => prev.includes(id) ? prev : [...prev, id]);
  };
  const handleNext = () => {
    navigate('/email-campaign');
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Review & Approve Your Lead List
                </h1>
                <p className="text-gray-500">
                  247 leads found for your campaign
                </p>
              </div>
              <Button onClick={handleNext} disabled={selectedLeads.length === 0}>
                Approve Selected Leads & Create Emails ({selectedLeads.length})
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                {/* Bulk Actions */}
                <Card className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id="select-all" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                      <label htmlFor="select-all" className="ml-2 text-sm font-medium text-gray-700">
                        Select All
                      </label>
                      <div className="ml-6 flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          Filter by Score
                        </span>
                        <button className="flex items-center text-sm text-gray-700 hover:text-primary">
                          <span>All Scores</span>
                          <ChevronDownIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    <button className="flex items-center text-sm text-gray-700 hover:text-primary">
                      <ArrowUpDownIcon className="w-4 h-4 mr-1" />
                      <span>Sort by Relevance</span>
                    </button>
                  </div>
                </Card>
                {/* Lead Cards */}
                <div className="space-y-4">
                  {leads.map(lead => <Card key={lead.id} className={`border-l-4 ${selectedLeads.includes(lead.id) ? 'border-l-primary' : skippedLeads.includes(lead.id) ? 'border-l-gray-300 opacity-60' : 'border-l-transparent'}`}>
                      <div className="flex">
                        <div className="mr-4">
                          <img src={lead.image} alt={lead.name} className="w-16 h-16 rounded-full" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {lead.name}
                              </h3>
                              <p className="text-gray-500">
                                {lead.title} at {lead.company}
                              </p>
                              <p className="text-sm text-gray-500">
                                {lead.location}
                              </p>
                            </div>
                            <Badge variant={lead.matchScore >= 90 ? 'success' : 'primary'} size="md">
                              Match Score: {lead.matchScore}%
                            </Badge>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">
                                  Why this lead?
                                </span>{' '}
                                {lead.reason}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">
                                  Recent news:
                                </span>{' '}
                                {lead.news}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end space-x-3">
                        <Button variant="outline" size="sm" icon={<XIcon className="w-4 h-4" />} onClick={() => skipLead(lead.id)}>
                          Skip
                        </Button>
                        <Button variant={selectedLeads.includes(lead.id) ? 'primary' : 'outline'} size="sm" icon={selectedLeads.includes(lead.id) ? <CheckIcon className="w-4 h-4" /> : undefined} onClick={() => toggleLeadSelection(lead.id)}>
                          {selectedLeads.includes(lead.id) ? 'Approved' : 'Approve'}
                        </Button>
                      </div>
                    </Card>)}
                </div>
              </div>
              {/* Stats Sidebar */}
              <div>
                <Card className="sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Lead Summary
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Selected</span>
                        <span className="font-medium text-primary">
                          {selectedLeads.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{
                        width: `${selectedLeads.length / leads.length * 100}%`
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Skipped</span>
                        <span className="font-medium text-gray-500">
                          {skippedLeads.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{
                        width: `${skippedLeads.length / leads.length * 100}%`
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Remaining</span>
                        <span className="font-medium text-gray-500">
                          {leads.length - selectedLeads.length - skippedLeads.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full" style={{
                        width: `${(leads.length - selectedLeads.length - skippedLeads.length) / leads.length * 100}%`
                      }}></div>
                      </div>
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-700 mb-4">
                        <span className="font-medium">Estimated results:</span>{' '}
                        With {selectedLeads.length} approved leads, you can
                        expect approximately{' '}
                        {Math.round(selectedLeads.length * 0.15)} meetings.
                      </p>
                      <Button fullWidth onClick={handleNext} disabled={selectedLeads.length === 0}>
                        Continue to Email Creation
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default LeadApproval;