import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CheckCircleIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const LeadFinding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  // Mock data for leads
  const leads = [{
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO & Founder',
    company: 'GrowthMetrics',
    location: 'San Francisco, CA',
    matchScore: 92,
    reason: 'Recently raised $2M seed round, expanding marketing team',
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
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    logo: 'https://logo.clearbit.com/salespro.io'
  }, {
    id: 5,
    name: 'Jennifer Lee',
    title: 'COO',
    company: 'OptimizeNow',
    location: 'Seattle, WA',
    matchScore: 87,
    reason: 'Recently expanded to new markets',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    logo: 'https://logo.clearbit.com/optimizenow.com'
  }, {
    id: 6,
    name: 'Robert Taylor',
    title: 'Founder',
    company: 'LaunchFast',
    location: 'Boston, MA',
    matchScore: 84,
    reason: 'Looking for growth solutions for early-stage startup',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    logo: 'https://logo.clearbit.com/launchfast.io'
  }];
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const toggleLeadSelection = (id: number) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]);
  };
  const handleNext = () => {
    navigate('/lead-approval');
  };
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                AI is finding your ideal prospects...
              </h2>
              <p className="text-gray-500">
                Analyzing millions of companies based on your criteria
              </p>
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
                  Lead Finding
                </h1>
                <p className="text-gray-500">
                  Found 247 potential leads for your campaign
                </p>
              </div>
              <Button onClick={handleNext} disabled={selectedLeads.length === 0}>
                Generate Campaigns for Selected Leads ({selectedLeads.length})
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filter Sidebar */}
              <div className="md:col-span-1">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <FilterIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="space-y-6">
                    {/* Industry Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </h4>
                      <div className="space-y-2">
                        {['SaaS', 'E-commerce', 'Agency', 'Fintech', 'Healthcare'].map(industry => <div key={industry} className="flex items-center">
                            <input type="checkbox" id={`industry-${industry.toLowerCase()}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                            <label htmlFor={`industry-${industry.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                              {industry}
                            </label>
                          </div>)}
                      </div>
                    </div>
                    {/* Company Size Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </h4>
                      <div className="space-y-2">
                        {['1-10', '11-50', '51-200', '201-500', '501+'].map(size => <div key={size} className="flex items-center">
                              <input type="checkbox" id={`size-${size}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                              <label htmlFor={`size-${size}`} className="ml-2 text-sm text-gray-700">
                                {size} employees
                              </label>
                            </div>)}
                      </div>
                    </div>
                    {/* Location Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Location
                      </h4>
                      <div className="space-y-2">
                        {['United States', 'Europe', 'Asia', 'Canada', 'Australia'].map(location => <div key={location} className="flex items-center">
                            <input type="checkbox" id={`location-${location.toLowerCase().replace(' ', '-')}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                            <label htmlFor={`location-${location.toLowerCase().replace(' ', '-')}`} className="ml-2 text-sm text-gray-700">
                              {location}
                            </label>
                          </div>)}
                      </div>
                    </div>
                    {/* Job Title Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </h4>
                      <div className="space-y-2">
                        {['CEO/Founder', 'CTO', 'Marketing Director', 'Sales Leader', 'Product Manager'].map(title => <div key={title} className="flex items-center">
                            <input type="checkbox" id={`title-${title.toLowerCase().replace('/', '-').replace(' ', '-')}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                            <label htmlFor={`title-${title.toLowerCase().replace('/', '-').replace(' ', '-')}`} className="ml-2 text-sm text-gray-700">
                              {title}
                            </label>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              {/* Lead Cards Grid */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leads.map(lead => <Card key={lead.id} className="overflow-hidden">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <img src={lead.image} alt={lead.name} className="w-10 h-10 rounded-full mr-3" />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {lead.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {lead.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant={lead.matchScore >= 90 ? 'success' : 'primary'}>
                            {lead.matchScore}% Match
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          {lead.logo ? <img src={lead.logo} alt={lead.company} className="w-6 h-6 rounded-full" /> : <span className="text-xs font-bold text-gray-500">
                              {lead.company.substring(0, 2).toUpperCase()}
                            </span>}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {lead.company}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lead.location}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-700">
                          <span className="font-medium">Why this lead?</span>{' '}
                          {lead.reason}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <Button variant={selectedLeads.includes(lead.id) ? 'primary' : 'outline'} fullWidth icon={selectedLeads.includes(lead.id) ? <CheckCircleIcon className="w-4 h-4" /> : undefined} onClick={() => toggleLeadSelection(lead.id)}>
                          {selectedLeads.includes(lead.id) ? 'Selected' : 'Select Lead'}
                        </Button>
                      </div>
                    </Card>)}
                </div>
                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing 1-6 of 247 leads
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
                      <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
                      2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
                      3
                    </button>
                    <span className="text-gray-500">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50">
                      25
                    </button>
                    <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
                      <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default LeadFinding;