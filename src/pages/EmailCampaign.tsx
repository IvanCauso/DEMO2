import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ArrowLeftIcon, SendIcon, SaveIcon, ChevronRightIcon, SparklesIcon, BarChart3Icon, MailIcon, CheckCircleIcon, RefreshCwIcon, ClockIcon, TargetIcon, UsersIcon, TrendingUpIcon, CheckIcon, ShieldCheckIcon, UserIcon, XIcon } from 'lucide-react';
const EmailCampaign = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('sarah');
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [regenerationPrompt, setRegenerationPrompt] = useState('');
  // Email templates data for different recipients
  const emailTemplates = {
    sarah: {
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
    },
    james: {
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
    },
    emma: {
      recipient: 'Emma Thompson (Knight Frank)',
      initials: 'ET',
      role: 'Head of Property Management at Knight Frank',
      subject: "Knight Frank's after-hours maintenance solution?",
      body: `Hi Emma,
I was looking at Knight Frank's property management services and noticed you highlight "responsive maintenance" as a key benefit - but I'm curious how you handle after-hours calls?
Most property managers I speak with struggle with:
- Weekend/evening maintenance emergencies
- Tenants frustrated by long wait times
- Staff burnout from constant on-call rotations
RepairAgent is an AI voice assistant that handles maintenance calls 24/7. It books appointments, orders parts, and only escalates real emergencies to your team.
We've helped several London property managers reduce after-hours escalations by 65%.
Would you be open to a quick 15-minute call to see how it works?
Best,
{{user_name}}
P.S. - We recently helped a company similar to Knight Frank eliminate their after-hours on-call rotation completely.`
    }
  };
  // Get current email data based on selected recipient
  const emailData = emailTemplates[selectedRecipient as keyof typeof emailTemplates];
  const openRegenerationPrompt = () => {
    setShowPromptModal(true);
  };
  const closeRegenerationPrompt = () => {
    setShowPromptModal(false);
    setRegenerationPrompt('');
  };
  const generateEmail = () => {
    setIsGenerating(true);
    setShowPromptModal(false);
    // Here we would use the regenerationPrompt in a real implementation
    console.log('Regenerating with prompt:', regenerationPrompt);
    setTimeout(() => {
      setIsGenerating(false);
      setRegenerationPrompt('');
    }, 1500);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleLaunchCampaign = () => {
    navigate('/campaigns');
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button className="flex items-center text-gray-500 hover:text-gray-700 mr-4" onClick={handleBack}>
                  <ArrowLeftIcon className="w-4 h-4 mr-1" />
                  Back
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Email Sequence Builder
                  </h1>
                  <p className="text-gray-500">
                    Craft personalized emails for your property management
                    campaign
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button size="sm" icon={<ChevronRightIcon className="w-4 h-4 ml-1" />} iconPosition="right" onClick={handleLaunchCampaign}>
                  Launch Campaign
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Email Editor - 70% */}
              <div className="lg:col-span-7">
                <Card className="mb-6">
                  <div className="p-6">
                    <div className="flex items-center mb-5">
                      <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">
                          {emailData.initials}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {emailData.recipient}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {emailData.role}
                        </p>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject Line
                      </label>
                      <input type="text" id="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base" value={emailData.subject} onChange={() => {}} />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="email-body" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Body
                      </label>
                      <div className="relative">
                        <textarea id="email-body" rows={18} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-base leading-relaxed" value={emailData.body} onChange={() => {}}></textarea>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                          <span>Reading time: ~45 seconds</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ShieldCheckIcon className="w-4 h-4 mr-1.5 text-success" />
                          <span>Deliverability Score: 9.2/10</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" icon={<SparklesIcon className="w-4 h-4 mr-1.5" />} onClick={openRegenerationPrompt} disabled={isGenerating}>
                        {isGenerating ? 'Generating...' : 'Generate Alternative'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              {/* Right Column - 30% */}
              <div className="lg:col-span-3">
                {/* Email Toggle Component */}
                <Card className="mb-6">
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Campaign Recipients
                    </h3>
                  </div>
                  <div className="p-3">
                    <div className="space-y-2">
                      {/* Sarah Mitchell */}
                      <div className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedRecipient === 'sarah' ? 'bg-primary bg-opacity-10 border border-primary border-opacity-20' : 'hover:bg-gray-50'}`} onClick={() => setSelectedRecipient('sarah')}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedRecipient === 'sarah' ? 'bg-primary bg-opacity-20' : 'bg-gray-100'}`}>
                          <span className={`font-medium text-sm ${selectedRecipient === 'sarah' ? 'text-primary' : 'text-gray-600'}`}>
                            SM
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${selectedRecipient === 'sarah' ? 'text-primary' : 'text-gray-800'}`}>
                            Sarah Mitchell
                          </p>
                          <p className="text-xs text-gray-500">Foxtons</p>
                        </div>
                        {selectedRecipient === 'sarah' && <Badge variant="primary" size="sm">
                            Current
                          </Badge>}
                      </div>
                      {/* James Wilson */}
                      <div className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedRecipient === 'james' ? 'bg-primary bg-opacity-10 border border-primary border-opacity-20' : 'hover:bg-gray-50'}`} onClick={() => setSelectedRecipient('james')}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedRecipient === 'james' ? 'bg-primary bg-opacity-20' : 'bg-gray-100'}`}>
                          <span className={`font-medium text-sm ${selectedRecipient === 'james' ? 'text-primary' : 'text-gray-600'}`}>
                            JW
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${selectedRecipient === 'james' ? 'text-primary' : 'text-gray-800'}`}>
                            James Wilson
                          </p>
                          <p className="text-xs text-gray-500">Savills</p>
                        </div>
                        {selectedRecipient === 'james' && <Badge variant="primary" size="sm">
                            Current
                          </Badge>}
                      </div>
                      {/* Emma Thompson */}
                      <div className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedRecipient === 'emma' ? 'bg-primary bg-opacity-10 border border-primary border-opacity-20' : 'hover:bg-gray-50'}`} onClick={() => setSelectedRecipient('emma')}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedRecipient === 'emma' ? 'bg-primary bg-opacity-20' : 'bg-gray-100'}`}>
                          <span className={`font-medium text-sm ${selectedRecipient === 'emma' ? 'text-primary' : 'text-gray-600'}`}>
                            ET
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${selectedRecipient === 'emma' ? 'text-primary' : 'text-gray-800'}`}>
                            Emma Thompson
                          </p>
                          <p className="text-xs text-gray-500">Knight Frank</p>
                        </div>
                        {selectedRecipient === 'emma' && <Badge variant="primary" size="sm">
                            Current
                          </Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 pt-0">
                    <Button variant="ghost" size="sm" fullWidth icon={<UserIcon className="w-3.5 h-3.5 mr-1.5" />}>
                      View All Recipients (48)
                    </Button>
                  </div>
                </Card>
                {/* AI Analysis */}
                <Card>
                  <div className="p-5 border-b border-gray-200 bg-primary bg-opacity-5">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                        <SparklesIcon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        AI Analysis - Why This Email Works
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-primary bg-opacity-10 p-1.5 rounded-full mr-3 mt-0.5">
                          <TargetIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            Personal Pain Point
                          </h4>
                          <p className="text-sm text-gray-600">
                            Opens with specific maintenance issue (boiler calls)
                            that resonates with the recipient's daily challenges
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary bg-opacity-10 p-1.5 rounded-full mr-3 mt-0.5">
                          <UsersIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            Social Proof
                          </h4>
                          <p className="text-sm text-gray-600">
                            Mentions competitor results (78% reduction for
                            Savills), creating FOMO and credibility
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary bg-opacity-10 p-1.5 rounded-full mr-3 mt-0.5">
                          <CheckIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            Soft Pitch
                          </h4>
                          <p className="text-sm text-gray-600">
                            Positions as helpful solution, not hard sell, making
                            it easier for prospect to engage
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary bg-opacity-10 p-1.5 rounded-full mr-3 mt-0.5">
                          <ClockIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            Clear CTA
                          </h4>
                          <p className="text-sm text-gray-600">
                            Simple 15-minute call request - low commitment, high
                            value proposition
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-primary bg-opacity-10 p-1.5 rounded-full mr-3 mt-0.5">
                          <TrendingUpIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            Industry Relevance
                          </h4>
                          <p className="text-sm text-gray-600">
                            Speaks directly to property management challenges,
                            showing you understand their specific industry
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Regeneration Prompt Modal */}
      {showPromptModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <SparklesIcon className="w-5 h-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Generate Alternative Email
                </h3>
              </div>
              <button onClick={closeRegenerationPrompt} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to change in this email?
              </label>
              <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base min-h-[120px]" placeholder="e.g., 'Make it more direct' or 'Add more social proof' or 'Mention specific cost savings'" value={regenerationPrompt} onChange={e => setRegenerationPrompt(e.target.value)}></textarea>
              <div className="mt-5 flex justify-end space-x-3">
                <Button variant="outline" size="sm" onClick={closeRegenerationPrompt}>
                  Cancel
                </Button>
                <Button size="sm" icon={<SparklesIcon className="w-4 h-4 mr-1.5" />} onClick={generateEmail} disabled={!regenerationPrompt.trim()}>
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default EmailCampaign;