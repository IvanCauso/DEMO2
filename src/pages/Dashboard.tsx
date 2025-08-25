import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { BarChart3Icon, TrendingUpIcon, MessageSquareIcon, CheckCircleIcon, ArrowRightIcon, PlusIcon, CalendarIcon, ClockIcon, BuildingIcon, UsersIcon, ArrowUpIcon, ArrowDownIcon, ExternalLinkIcon, BellIcon, MailIcon } from 'lucide-react';
const Dashboard = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back to Causo</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => navigate('/analytics')} icon={<BarChart3Icon className="w-4 h-4 mr-2" />}>
                  Analytics
                </Button>
                <Button onClick={() => navigate('/ai-campaign-builder')} icon={<PlusIcon className="w-4 h-4 mr-2" />}>
                  New Campaign
                </Button>
              </div>
            </div>
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">
                      Emails Sent (30d)
                    </span>
                    <Badge variant="success">+18%</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      2,847
                    </span>
                    <span className="text-gray-500 text-sm ml-2">emails</span>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Open Rate</span>
                    <Badge variant="success">+5%</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      52%
                    </span>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Response Rate</span>
                    <Badge variant="success">+3.5%</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      18.5%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Campaign Performance */}
              <div className="lg:col-span-2">
                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Campaign Performance
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {[{
                      id: 1,
                      name: 'UK Property Management - Maintenance Automation',
                      status: 'active',
                      emails: 456,
                      responses: 89,
                      responseRate: 19.5,
                      trend: 'up'
                    }, {
                      id: 2,
                      name: 'London Estate Agencies - Call Handling',
                      status: 'active',
                      emails: 312,
                      responses: 58,
                      responseRate: 18.6,
                      trend: 'stable'
                    }].map(campaign => <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-900 mr-2">
                                  {campaign.name}
                                </h4>
                                <Badge variant={campaign.status === 'active' ? 'success' : 'default'} size="sm">
                                  {campaign.status === 'active' ? 'Active' : 'Draft'}
                                </Badge>
                              </div>
                            </div>
                            {campaign.trend === 'up' && <ArrowUpIcon className="w-4 h-4 text-success" />}
                            {campaign.trend === 'down' && <ArrowDownIcon className="w-4 h-4 text-error" />}
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Emails Sent
                              </span>
                              <span className="font-medium">
                                {campaign.emails}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Responses
                              </span>
                              <span className="font-medium">
                                {campaign.responses}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Response Rate
                              </span>
                              <span className="font-medium">
                                {campaign.responseRate}%
                              </span>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </Card>
              </div>
              {/* Recent Activity */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <MessageSquareIcon className="w-4 h-4 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          New email response
                        </p>
                        <p className="text-xs text-gray-500">
                          From Sarah at TechFlow Solutions
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          10 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                        <UsersIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          New prospect added
                        </p>
                        <p className="text-xs text-gray-500">
                          Marketing Director at GrowthCorp
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <MailIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Campaign launched
                        </p>
                        <p className="text-xs text-gray-500">
                          E-commerce Founders sequence
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          5 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <CheckCircleIcon className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          High-quality response
                        </p>
                        <p className="text-xs text-gray-500">
                          From CTO at DataWorks Inc
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                        <BuildingIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          New company added
                        </p>
                        <p className="text-xs text-gray-500">
                          SaaS Analytics Platform Inc.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" fullWidth className="mt-4">
                    View All Activity
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default Dashboard;