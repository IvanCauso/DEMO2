import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusIcon, GlobeIcon, MessageSquareIcon, BuildingIcon, UsersIcon, ChevronRightIcon, XIcon } from 'lucide-react';
// Mock data for audiences
const mockAudiences = [{
  id: 1,
  name: 'UK Property Management Companies',
  companyCount: 2847,
  contactCount: 8453,
  lastUpdated: '2023-06-15',
  description: 'Property management firms in the UK with 50+ properties under management'
}, {
  id: 2,
  name: 'London Estate Agencies',
  companyCount: 1253,
  contactCount: 3728,
  lastUpdated: '2023-06-10',
  description: 'Estate agencies in London with maintenance services'
}, {
  id: 3,
  name: 'Student Housing Providers',
  companyCount: 487,
  contactCount: 1245,
  lastUpdated: '2023-06-05',
  description: 'Companies managing student housing with high maintenance call volumes'
}];
const Audiences = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Audiences</h1>
                <p className="text-gray-500">
                  Create and manage target audiences for your campaigns
                </p>
              </div>
              <Button icon={<PlusIcon className="w-4 h-4 mr-2" />} onClick={() => setShowCreateModal(true)}>
                Create New Audience
              </Button>
            </div>
            {/* Audiences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockAudiences.map(audience => <Card key={audience.id} className="flex flex-col">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {audience.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {audience.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center">
                        <BuildingIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {audience.companyCount.toLocaleString()} companies
                        </span>
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {audience.contactCount.toLocaleString()} decision
                          makers
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">
                          Last updated: {audience.lastUpdated}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" fullWidth onClick={() => navigate(`/audiences/${audience.id}`)} icon={<ChevronRightIcon className="w-4 h-4 ml-1" />} iconPosition="right">
                      View Details
                    </Button>
                  </div>
                </Card>)}
            </div>
          </div>
        </main>
      </div>
      {/* Create Audience Modal */}
      {showCreateModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Audience
              </h2>
              <button className="text-gray-400 hover:text-gray-500" onClick={() => setShowCreateModal(false)}>
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-500 mb-6">
                Choose how you'd like to create your target audience
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-xl p-5 hover:border-primary cursor-pointer transition-all" onClick={() => {
              setShowCreateModal(false);
              // Navigate to website analysis page (would be implemented in a real app)
              // navigate('/audiences/create/website');
            }}>
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <GlobeIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Generate audience from my website
                  </h3>
                  <p className="text-sm text-gray-500">
                    Let AI analyze your site to find ideal customers
                  </p>
                </div>
                <div className="border border-gray-200 rounded-xl p-5 hover:border-primary cursor-pointer transition-all" onClick={() => {
              setShowCreateModal(false);
              // Navigate to custom audience creation (would be implemented in a real app)
              // navigate('/audiences/create/custom');
            }}>
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquareIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Create custom audience
                  </h3>
                  <p className="text-sm text-gray-500">
                    Describe your target customers in plain language
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default Audiences;