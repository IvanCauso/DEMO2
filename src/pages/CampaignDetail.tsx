import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ArrowLeftIcon, BuildingIcon, UserIcon, MailIcon, ClockIcon, SparklesIcon, TargetIcon, CheckIcon, SendIcon, CalendarIcon, ArrowRightIcon, PencilIcon, BarChart3Icon, ChevronRightIcon } from 'lucide-react';
const CampaignDetail = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('companies');
  // Mock campaign data
  const campaignData = {
    id: id,
    name: 'London Estate Agencies - Call Handling',
    status: 'active',
    startDate: '2023-09-01',
    contacts: 48,
    emailsSent: 126,
    responseRate: 32.4,
    companies: [{
      name: 'Foxtons',
      location: 'London',
      size: '250-500',
      reviewScore: 2.4
    }, {
      name: 'Savills',
      location: 'London',
      size: '1000+',
      reviewScore: 3.2
    }, {
      name: 'Knight Frank',
      location: 'London',
      size: '500-1000',
      reviewScore: 2.8
    }, {
      name: 'Hamptons',
      location: 'London',
      size: '250-500',
      reviewScore: 2.5
    }, {
      name: 'Dexters',
      location: 'London',
      size: '100-250',
      reviewScore: 2.3
    }, {
      name: 'Marsh & Parsons',
      location: 'London',
      size: '100-250',
      reviewScore: 2.7
    }, {
      name: 'Chestertons',
      location: 'London',
      size: '100-250',
      reviewScore: 2.6
    }, {
      name: 'Winkworth',
      location: 'London',
      size: '250-500',
      reviewScore: 2.9
    }],
    decisionMakers: [{
      name: 'Sarah Mitchell',
      role: 'Operations Manager',
      company: 'Foxtons',
      email: 's.mitchell@foxtons.co.uk'
    }, {
      name: 'James Wilson',
      role: 'Maintenance Director',
      company: 'Savills',
      email: 'j.wilson@savills.com'
    }, {
      name: 'Emma Thompson',
      role: 'Head of Property Management',
      company: 'Knight Frank',
      email: 'emma.thompson@knightfrank.com'
    }, {
      name: 'David Roberts',
      role: 'Property Management Director',
      company: 'Hamptons',
      email: 'd.roberts@hamptons.co.uk'
    }, {
      name: 'Jessica Brown',
      role: 'Head of Lettings',
      company: 'Dexters',
      email: 'j.brown@dexters.co.uk'
    }, {
      name: 'Michael Johnson',
      role: 'Operations Director',
      company: 'Marsh & Parsons',
      email: 'm.johnson@marshandparsons.co.uk'
    }, {
      name: 'Olivia Smith',
      role: 'Head of Property Management',
      company: 'Chestertons',
      email: 'o.smith@chestertons.com'
    }, {
      name: 'Robert Davies',
      role: 'Maintenance Manager',
      company: 'Winkworth',
      email: 'r.davies@winkworth.co.uk'
    }],
    campaignSettings: {
      tone: 'Professional yet approachable',
      sendWindow: '9:00 AM - 11:00 AM, Monday - Friday',
      angle: 'Poor maintenance review scores and response times',
      targetRoles: ['Head of Property Management', 'Operations Manager', 'Maintenance Director'],
      painPoints: ['Slow response times to maintenance requests', 'Poor tenant reviews about repairs', 'High call volume for maintenance issues', 'After-hours emergency call handling']
    },
    emailTemplates: [{
      recipient: 'Sarah Mitchell (Foxtons)',
      initials: 'SM',
      role: 'Operations Manager at Foxtons Property Management',
      subject: "Saw Foxtons' 2-star maintenance reviews - here's how to fix it",
      body: `Hi Sarah,
I was researching property management companies in London and came across some... interesting reviews about Foxtons' maintenance response times.
"Called 6 times about a broken boiler, finally got through to someone who put me on hold for 20 minutes" - Your tenant from last month.
Look, I'm not here to pile on. Every property manager knows maintenance calls are the worst part of the job. But what if they weren't?
RepairAgent is an AI voice assistant that handles maintenance calls 24/7. It books appointments, orders parts, and only escalates real emergencies to your team.
Savills reduced their maintenance call load by 78% in 8 weeks.
Worth a 15-minute call to see how it works?
Best,
{{user_name}}
P.S. - Happy to show you exactly which reviews I'm referring to. Some are... brutal.`
    }, {
      recipient: 'James Wilson (Savills)',
      initials: 'JW',
      role: 'Maintenance Director at Savills Residential',
      subject: "Maintenance call volumes up 32% this year? Here's how to reduce them",
      body: `Hi James,
I noticed Savills has been posting more maintenance coordinator positions recently - usually a sign that call volumes are increasing.
Property maintenance calls are up 32% industry-wide since last year, and I'm guessing your team is feeling that strain.
RepairAgent is an AI voice assistant that handles maintenance calls 24/7. It books appointments, orders parts, and only escalates real emergencies to your team.
One of your competitors reduced their maintenance call load by 78% in 8 weeks using our system.
Would a 15-minute call make sense to see if this could work for Savills?
Best,
{{user_name}}
P.S. - We've worked with several large property managers in London and can share some anonymous case studies.`
    }]
  };
  const handleBack = () => {
    navigate('/campaigns');
  };
  const renderCompaniesTab = () => {
    return <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Score
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignData.companies.map((company, index) => <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`${company.reviewScore < 3 ? 'text-error' : 'text-success'}`}>
                      {company.reviewScore}/5
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>;
  };
  const renderDecisionMakersTab = () => {
    return <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaignData.decisionMakers.map((person, index) => <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {person.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      View Emails
                    </Button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>;
  };
  const renderEmailTemplates = () => {
    return <div className="space-y-6 mt-6">
        {campaignData.emailTemplates.map((template, index) => <Card key={index}>
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">
                    {template.initials}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {template.recipient}
                  </h2>
                  <p className="text-sm text-gray-500">{template.role}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg text-base">
                  {template.subject}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg font-mono text-sm whitespace-pre-line min-h-[200px]">
                  {template.body}
                </div>
              </div>
            </div>
          </Card>)}
      </div>;
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <button className="flex items-center text-gray-500 hover:text-gray-700 mr-4" onClick={handleBack}>
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {campaignData.name}
                </h1>
                <p className="text-gray-500">
                  Campaign started on {campaignData.startDate}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" icon={<BarChart3Icon className="w-4 h-4 mr-1.5" />} onClick={() => navigate(`/analytics?campaign=${id}`)}>
                  Analytics
                </Button>
                <Button size="sm" icon={<ChevronRightIcon className="w-4 h-4 ml-1" />} iconPosition="right">
                  Expand Campaign
                </Button>
              </div>
            </div>
            {/* Campaign Overview */}
            <Card className="mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Campaign Overview
                  </h2>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Contacts</p>
                    <p className="text-xl font-semibold">
                      {campaignData.contacts}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Emails Sent</p>
                    <p className="text-xl font-semibold">
                      {campaignData.emailsSent}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Response Rate</p>
                    <p className="text-xl font-semibold">
                      {campaignData.responseRate}%
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">
                      Meetings Booked
                    </p>
                    <p className="text-xl font-semibold">6</p>
                  </div>
                </div>
              </div>
            </Card>
            {/* Campaign Settings */}
            <Card className="mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Campaign Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Tone of Voice
                        </p>
                        <div className="flex items-center">
                          <SparklesIcon className="w-4 h-4 text-primary mr-2" />
                          <p className="font-medium">
                            {campaignData.campaignSettings.tone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Sending Window
                        </p>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 text-primary mr-2" />
                          <p className="font-medium">
                            {campaignData.campaignSettings.sendWindow}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Campaign Angle
                        </p>
                        <div className="flex items-center">
                          <TargetIcon className="w-4 h-4 text-primary mr-2" />
                          <p className="font-medium">
                            {campaignData.campaignSettings.angle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Target Roles</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {campaignData.campaignSettings.targetRoles.map((role, index) => <Badge key={index} variant="primary" className="text-xs">
                            {role}
                          </Badge>)}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Pain Points</p>
                    <ul className="space-y-1">
                      {campaignData.campaignSettings.painPoints.map((point, index) => <li key={index} className="flex items-start text-sm">
                            <CheckIcon className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
            {/* Tabs */}
            <div className="mb-4 border-b border-gray-200">
              <div className="flex">
                <button className={`py-3 px-6 font-medium text-sm ${activeTab === 'companies' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('companies')}>
                  Companies ({campaignData.companies.length})
                </button>
                <button className={`py-3 px-6 font-medium text-sm ${activeTab === 'decisionMakers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('decisionMakers')}>
                  Decision Makers ({campaignData.decisionMakers.length})
                </button>
              </div>
            </div>
            {/* Tab Content */}
            <Card>
              <div className="p-6">
                {activeTab === 'companies' ? renderCompaniesTab() : renderDecisionMakersTab()}
              </div>
            </Card>
            {/* Sample Emails */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Sample Emails
              </h2>
              {renderEmailTemplates()}
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default CampaignDetail;