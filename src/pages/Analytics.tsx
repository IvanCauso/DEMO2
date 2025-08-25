import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { BarChart3Icon, TrendingUpIcon, CalendarIcon, UsersIcon, MessageSquareIcon, ArrowUpIcon, ArrowDownIcon, ChevronDownIcon, InfoIcon, MailIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon } from 'lucide-react';
// Mock data for charts
const mockChartData = {
  outreachVolume: [76, 84, 92, 88, 105, 98, 112, 95, 108, 115, 125, 118, 109, 130, 124, 135, 128, 142, 138, 145, 152, 148, 155, 162, 158, 168, 172, 165, 175, 182],
  responseQuality: {
    positive: 67,
    neutral: 25,
    negative: 8
  },
  conversionFunnel: {
    emails: 2847,
    opens: 1398,
    responses: 527,
    qualifiedLeads: 183
  },
  topCampaigns: [{
    name: 'Student Housing Providers - Maintenance Efficiency',
    sent: 425,
    responses: 98,
    rate: 23.1,
    trend: 'up'
  }, {
    name: 'Estate Agency Directors - Call Volume Reduction',
    sent: 512,
    responses: 107,
    rate: 20.9,
    trend: 'up'
  }, {
    name: 'Housing Association Managers - Tenant Satisfaction',
    sent: 378,
    responses: 68,
    rate: 18.0,
    trend: 'stable'
  }, {
    name: 'Property Portfolio Owners - 24/7 Repair Logging',
    sent: 456,
    responses: 79,
    rate: 17.3,
    trend: 'stable'
  }, {
    name: 'Facilities Managers - Emergency Response',
    sent: 398,
    responses: 62,
    rate: 15.6,
    trend: 'down'
  }]
};
const Analytics = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('30d');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState(['all']);
  // Function to render a simple bar chart
  const renderBarChart = (data: number[], height = 100, color = '#2563EB') => {
    const max = Math.max(...data);
    return <div className="flex items-end h-[100px] gap-1">
        {data.map((value, index) => <div key={index} className="flex-1 bg-opacity-20 rounded-t-sm relative group" style={{
        height: `${value / max * height}px`,
        backgroundColor: color
      }}>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
              {value}
            </div>
          </div>)}
      </div>;
  };
  // Function to render response quality chart
  const renderResponseQualityChart = () => {
    const {
      positive,
      neutral,
      negative
    } = mockChartData.responseQuality;
    return <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Positive</span>
            <span className="text-sm text-gray-500">{positive}%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-success" style={{
            width: `${positive}%`
          }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Neutral</span>
            <span className="text-sm text-gray-500">{neutral}%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400" style={{
            width: `${neutral}%`
          }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Negative</span>
            <span className="text-sm text-gray-500">{negative}%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-error" style={{
            width: `${negative}%`
          }}></div>
          </div>
        </div>
      </div>;
  };
  // Function to render conversion funnel
  const renderConversionFunnel = () => {
    const {
      emails,
      opens,
      responses,
      qualifiedLeads
    } = mockChartData.conversionFunnel;
    return <div className="space-y-4">
        <div className="relative">
          <div className="w-full h-16 bg-primary bg-opacity-10 rounded-t-lg flex items-center justify-center">
            <div className="text-center">
              <div className="font-semibold text-primary">
                {emails.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Emails Sent</div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-primary border-opacity-10"></div>
        </div>
        <div className="relative">
          <div className="w-[85%] mx-auto h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="font-semibold text-primary">
                {opens.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Opens</div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary border-opacity-20"></div>
        </div>
        <div className="relative">
          <div className="w-[65%] mx-auto h-12 bg-primary bg-opacity-30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="font-semibold text-primary">
                {responses.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Responses</div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary border-opacity-30"></div>
        </div>
        <div>
          <div className="w-[40%] mx-auto h-10 bg-primary bg-opacity-40 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="font-semibold text-primary">
                {qualifiedLeads.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Qualified Leads</div>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-500">
                  Track and analyze your sales outreach performance
                </p>
              </div>
              <div className="flex space-x-3">
                <div className="relative">
                  <Button variant="outline" size="sm" icon={<CalendarIcon className="w-4 h-4 mr-2" />} iconRight={<ChevronDownIcon className="w-4 h-4 ml-2" />}>
                    {timeframe === '7d' ? 'Last 7 days' : timeframe === '30d' ? 'Last 30 days' : timeframe === '90d' ? 'Last 90 days' : 'Custom'}
                  </Button>
                </div>
                <div className="relative">
                  <Button variant="outline" size="sm" icon={<BarChart3Icon className="w-4 h-4 mr-2" />} iconRight={<ChevronDownIcon className="w-4 h-4 ml-2" />}>
                    {selectedCampaigns.includes('all') ? 'All Campaigns' : `${selectedCampaigns.length} Selected`}
                  </Button>
                </div>
                <Button variant={compareMode ? 'primary' : 'outline'} size="sm" onClick={() => setCompareMode(!compareMode)}>
                  Compare
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">
                      Total Campaigns
                    </span>
                    <Badge variant="success">+12%</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">47</span>
                    <span className="text-gray-500 text-sm ml-2">
                      campaigns
                    </span>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Response Rate</span>
                    <Badge variant="success">+5.2%</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      18.5%
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Outreach Volume (Last 30 Days)
                  </h3>
                  <p className="text-gray-500 mb-6">Total emails sent: 2,847</p>
                  {renderBarChart(mockChartData.outreachVolume)}
                  <div className="flex justify-between mt-4 text-xs text-gray-500">
                    <span>Nov 1</span>
                    <span>Nov 15</span>
                    <span>Nov 30</span>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Response Quality
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Sentiment analysis of prospect responses
                  </p>
                  {renderResponseQualityChart()}
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Email Conversion Funnel
                  </h3>
                  <p className="text-gray-500 mb-6">
                    From outreach to qualified leads
                  </p>
                  {renderConversionFunnel()}
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Performing Campaigns
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Campaigns with highest response rates
                  </p>
                  <div className="space-y-4">
                    {mockChartData.topCampaigns.map((campaign, index) => <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {campaign.name}
                            </span>
                            {campaign.trend === 'up' && <ArrowUpIcon className="w-3 h-3 text-success ml-1" />}
                            {campaign.trend === 'down' && <ArrowDownIcon className="w-3 h-3 text-error ml-1" />}
                          </div>
                          <span className="text-sm text-gray-500">
                            {campaign.rate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{
                        width: `${campaign.rate / 25 * 100}%`
                      }}></div>
                        </div>
                        <div className="flex justify-between mt-1 mb-3">
                          <span className="text-xs text-gray-500">
                            {campaign.responses} / {campaign.sent} responses
                          </span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </Card>
            </div>

            {/* Weekly Performance */}
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Weekly Performance Comparison
                  </h3>
                  <Button variant="outline" size="sm" icon={<ArrowRightIcon className="w-4 h-4 ml-1" />} iconPosition="right">
                    View Detailed Report
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Week
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Emails Sent
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Open Rate
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Response Rate
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Qualified Leads
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Nov 27 - Dec 3
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          645
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-success flex items-center">
                            <ArrowUpIcon className="w-3 h-3 mr-1" />
                            52.8%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-success flex items-center">
                            <ArrowUpIcon className="w-3 h-3 mr-1" />
                            19.2%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          42
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Nov 20 - Nov 26
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          582
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          48.5%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          18.3%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          36
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Nov 13 - Nov 19
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          528
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          46.2%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          17.8%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          32
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Nov 6 - Nov 12
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          495
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-error flex items-center">
                            <ArrowDownIcon className="w-3 h-3 mr-1" />
                            42.8%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="text-error flex items-center">
                            <ArrowDownIcon className="w-3 h-3 mr-1" />
                            16.5%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          28
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>;
};
export default Analytics;