import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ChevronRightIcon, MessageSquareIcon, SettingsIcon, CheckIcon, ChevronDownIcon, CheckCircleIcon, BuildingIcon, UserIcon, TrendingUpIcon, NewspaperIcon, CodeIcon, PlusIcon } from 'lucide-react';
const CampaignSetup = () => {
  const navigate = useNavigate();
  const [setupType, setSetupType] = useState<'ai' | 'manual' | null>(null);
  const [aiStep, setAiStep] = useState(1);
  const [contactCount, setContactCount] = useState(250);
  const [followUpCount, setFollowUpCount] = useState(3);
  const [campaignDuration, setCampaignDuration] = useState('2-weeks');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('existing');
  const [targetIndustry, setTargetIndustry] = useState('');
  const [targetCompanySize, setTargetCompanySize] = useState<string[]>([]);
  const [targetGeography, setTargetGeography] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [sequenceTone, setSequenceTone] = useState('professional');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // Mock data for ICP from onboarding
  const savedICP = {
    industry: 'SaaS / Technology',
    companySize: '11-50 employees',
    geography: 'United States',
    role: 'Founder / CEO'
  };
  const handleNext = () => {
    if (setupType === 'ai') {
      if (aiStep < 6) {
        setAiStep(aiStep + 1);
      } else {
        // Find prospects
        navigate('/lead-finding');
      }
    } else {
      // Manual form complete
      navigate('/lead-finding');
    }
  };
  const handleBack = () => {
    if (setupType === 'ai') {
      if (aiStep > 1) {
        setAiStep(aiStep - 1);
      } else {
        setSetupType(null);
      }
    } else {
      setSetupType(null);
    }
  };
  const startAISetup = () => {
    setSetupType('ai');
  };
  const startManualSetup = () => {
    setSetupType('manual');
  };
  const handleSignalToggle = (signal: string) => {
    if (selectedSignals.includes(signal)) {
      setSelectedSignals(selectedSignals.filter(s => s !== signal));
    } else {
      setSelectedSignals([...selectedSignals, signal]);
    }
  };
  const handleCompanySizeToggle = (size: string) => {
    if (targetCompanySize.includes(size)) {
      setTargetCompanySize(targetCompanySize.filter(s => s !== size));
    } else {
      setTargetCompanySize([...targetCompanySize, size]);
    }
  };
  const findProspects = () => {
    navigate('/lead-finding');
  };
  // Initial choice screen
  if (!setupType) {
    return <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  Create New Campaign
                </h1>
                <p className="text-gray-500">
                  Choose how you'd like to set up your campaign
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AI Campaign Builder Option */}
                <Card className="relative flex flex-col h-full">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="flex-1 pt-6">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <MessageSquareIcon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 text-center mb-3">
                      AI Campaign Builder
                    </h2>
                    <p className="text-gray-500 text-center mb-6">
                      Chat with our AI to create the perfect campaign strategy
                      based on your goals
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Button fullWidth onClick={startAISetup}>
                      Start AI Builder
                    </Button>
                  </div>
                </Card>
                {/* Manual Setup Option */}
                <Card className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex justify-center mb-6 pt-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <SettingsIcon className="w-8 h-8 text-gray-500" />
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 text-center mb-3">
                      Manual Campaign Setup
                    </h2>
                    <p className="text-gray-500 text-center mb-6">
                      Configure your campaign settings yourself with detailed
                      form controls
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" fullWidth onClick={startManualSetup}>
                      Manual Setup
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>;
  }
  // AI Campaign Builder Flow
  if (setupType === 'ai') {
    return <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Campaign Builder
                </h1>
                <p className="text-gray-500">
                  Let our AI help you create the perfect outreach campaign
                </p>
              </div>
              <Card className="mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <div className="font-medium">Causo AI</div>
                </div>
                <div className="space-y-6">
                  {/* AI Chat Messages */}
                  <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                    <p>
                      Hi! Let's create your campaign. First, what's your main
                      goal?
                    </p>
                  </div>
                  {aiStep === 1 && <div className="ml-auto bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                      <div className="space-y-2">
                        {['Book demo meetings', 'Schedule discovery calls', 'Generate leads', 'Build awareness', 'Other'].map(goal => <Button key={goal} size="sm" variant={campaignGoal === goal ? 'primary' : 'outline'} className="mr-2 mb-2" onClick={() => {
                      setCampaignGoal(goal);
                      setAiStep(2);
                    }}>
                            {goal}
                          </Button>)}
                      </div>
                    </div>}
                  {aiStep >= 2 && <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>
                        Great! I see from your onboarding that your ideal
                        customer profile is:
                      </p>
                      <div className="bg-white p-3 rounded-md border border-gray-200 mt-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Industry</p>
                            <p className="font-medium">{savedICP.industry}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Company Size
                            </p>
                            <p className="font-medium">
                              {savedICP.companySize}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Geography</p>
                            <p className="font-medium">{savedICP.geography}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Target Role</p>
                            <p className="font-medium">{savedICP.role}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3">
                        Do you want to target this same audience or a different
                        type of customer?
                      </p>
                    </div>}
                  {aiStep === 2 && <div className="ml-auto bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => {
                      setTargetAudience('existing');
                      setAiStep(4); // Skip to intent signals
                    }}>
                          Same audience
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                      setTargetAudience('different');
                      setAiStep(3);
                    }}>
                          Different customer type
                        </Button>
                      </div>
                    </div>}
                  {aiStep === 3 && targetAudience === 'different' && <>
                      <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                        <p>
                          Tell me about this new target customer - what
                          industry, company size, and role are you targeting?
                        </p>
                      </div>
                      <div className="ml-auto bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Industry
                            </label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value={targetIndustry} onChange={e => setTargetIndustry(e.target.value)}>
                              <option value="">Select industry</option>
                              <option value="saas">SaaS</option>
                              <option value="ecommerce">E-commerce</option>
                              <option value="agency">Agency</option>
                              <option value="fintech">Fintech</option>
                              <option value="healthcare">Healthcare</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Size
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {['1-10', '11-50', '51-200', '201-1000', '1000+'].map(size => <div key={size} className={`px-3 py-1 rounded-full text-sm cursor-pointer ${targetCompanySize.includes(size) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleCompanySizeToggle(size)}>
                                  {size}
                                </div>)}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Geography
                            </label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value={targetGeography} onChange={e => setTargetGeography(e.target.value)}>
                              <option value="">Select geography</option>
                              <option value="us">United States</option>
                              <option value="europe">Europe</option>
                              <option value="asia">Asia</option>
                              <option value="global">Global</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Target Role
                            </label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., Marketing Director, CTO" value={targetRole} onChange={e => setTargetRole(e.target.value)} />
                          </div>
                          <Button size="sm" onClick={() => setAiStep(4)} disabled={!targetIndustry || targetCompanySize.length === 0 || !targetGeography || !targetRole}>
                            Continue
                          </Button>
                        </div>
                      </div>
                    </>}
                  {aiStep >= 4 && <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>
                        What signals make a prospect more likely to buy from
                        you? Based on your profile, I suggest:
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-start">
                          <BuildingIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                          <p className="text-sm">
                            Recently funded companies (if targeting startups)
                          </p>
                        </div>
                        <div className="flex items-start">
                          <UserIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                          <p className="text-sm">
                            Companies with new job postings (if selling
                            HR/recruiting tools)
                          </p>
                        </div>
                        <div className="flex items-start">
                          <TrendingUpIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                          <p className="text-sm">
                            Companies showing rapid growth (if selling scaling
                            solutions)
                          </p>
                        </div>
                        <div className="flex items-start">
                          <NewspaperIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                          <p className="text-sm">
                            Recent news mentions or awards
                          </p>
                        </div>
                      </div>
                      <p className="mt-3">
                        Which of these interest you, or do you have other
                        signals in mind?
                      </p>
                    </div>}
                  {aiStep === 4 && <div className="ml-auto bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                      <div className="space-y-2">
                        {[{
                      id: 'funding',
                      label: 'Recently funded companies',
                      icon: <BuildingIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'hiring',
                      label: 'Currently hiring',
                      icon: <UserIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'growth',
                      label: 'High growth companies',
                      icon: <TrendingUpIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'news',
                      label: 'Recent news/awards',
                      icon: <NewspaperIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'tech',
                      label: 'Technology adoption',
                      icon: <CodeIcon className="w-4 h-4 mr-1" />
                    }].map(signal => <div key={signal.id} className="flex items-center">
                            <input type="checkbox" id={`signal-${signal.id}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" checked={selectedSignals.includes(signal.id)} onChange={() => handleSignalToggle(signal.id)} />
                            <label htmlFor={`signal-${signal.id}`} className="ml-2 flex items-center text-sm">
                              {signal.icon} {signal.label}
                            </label>
                          </div>)}
                        <div className="pt-2">
                          <Button size="sm" onClick={() => setAiStep(5)} disabled={selectedSignals.length === 0}>
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>}
                  {aiStep >= 5 && <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>
                        For email sequence, I recommend: 3 emails over 2 weeks
                        with a professional but friendly tone. Want to adjust
                        the cadence or tone?
                      </p>
                    </div>}
                  {aiStep === 5 && <div className="ml-auto bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => setAiStep(6)}>
                            Perfect!
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                        setFollowUpCount(5);
                        setCampaignDuration('1-week');
                        setAiStep(6);
                      }}>
                            Make it more aggressive
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                        setFollowUpCount(3);
                        setCampaignDuration('1-month');
                        setAiStep(6);
                      }}>
                            Make it gentler
                          </Button>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Change tone:
                          </label>
                          <div className="flex gap-2">
                            {['Professional', 'Casual', 'Friendly'].map(tone => <div key={tone} className={`px-3 py-1 rounded-full text-sm cursor-pointer ${sequenceTone === tone.toLowerCase() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setSequenceTone(tone.toLowerCase())}>
                                  {tone}
                                </div>)}
                          </div>
                        </div>
                      </div>
                    </div>}
                  {aiStep >= 6 && <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>
                        Perfect! Your campaign strategy is ready. I'll now find
                        your prospects.
                      </p>
                      <div className="bg-white p-3 rounded-md border border-gray-200 mt-3">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Campaign Summary
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Goal:</span>
                            <span className="font-medium">{campaignGoal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Target:</span>
                            <span className="font-medium">
                              {targetAudience === 'existing' ? 'Existing ICP' : 'Custom audience'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Email sequence:
                            </span>
                            <span className="font-medium">
                              {followUpCount} emails
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Duration:</span>
                            <span className="font-medium">
                              {campaignDuration === '1-week' ? '1 week' : campaignDuration === '2-weeks' ? '2 weeks' : '1 month'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tone:</span>
                            <span className="font-medium capitalize">
                              {sequenceTone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>}
                  {aiStep === 6 && <div className="ml-auto bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                      <Button onClick={findProspects}>Find My Prospects</Button>
                    </div>}
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                {aiStep < 6 && <Button onClick={handleNext} disabled={aiStep === 1 && !campaignGoal || aiStep === 3 && targetAudience === 'different' && (!targetIndustry || targetCompanySize.length === 0 || !targetGeography || !targetRole) || aiStep === 4 && selectedSignals.length === 0}>
                    Skip to Next
                  </Button>}
              </div>
            </div>
          </main>
        </div>
      </div>;
  }
  // Manual Campaign Setup Flow
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Manual Campaign Setup
              </h1>
              <p className="text-gray-500">
                Configure your campaign settings with detailed controls
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                {/* Campaign Goals */}
                <Card className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Campaign Goals
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Name
                      </label>
                      <input type="text" id="campaign-name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., Q2 SaaS Founders Outreach" />
                    </div>
                    <div>
                      <label htmlFor="campaign-objective" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Objective
                      </label>
                      <select id="campaign-objective" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value={campaignGoal} onChange={e => setCampaignGoal(e.target.value)}>
                        <option value="">Select an objective</option>
                        <option value="Book demo meetings">
                          Book meetings
                        </option>
                        <option value="Schedule discovery calls">
                          Generate leads
                        </option>
                        <option value="Build awareness">Build awareness</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="success-metric" className="block text-sm font-medium text-gray-700 mb-1">
                        Success Metric
                      </label>
                      <input type="text" id="success-metric" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., 10 meetings booked" />
                    </div>
                  </div>
                </Card>
                {/* Target Audience */}
                <Card className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Target Audience
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                          <input type="radio" id="existing-icp" name="target-audience" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" checked={targetAudience === 'existing'} onChange={() => setTargetAudience('existing')} />
                          <label htmlFor="existing-icp" className="ml-2 text-sm text-gray-700">
                            Use my existing ICP
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="different-customers" name="target-audience" className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" checked={targetAudience === 'different'} onChange={() => setTargetAudience('different')} />
                          <label htmlFor="different-customers" className="ml-2 text-sm text-gray-700">
                            Target different customers
                          </label>
                        </div>
                      </div>
                    </div>
                    {targetAudience === 'existing' && <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Your Ideal Customer Profile
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Industry</p>
                            <p className="text-sm font-medium">
                              {savedICP.industry}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              Company Size
                            </p>
                            <p className="text-sm font-medium">
                              {savedICP.companySize}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Geography</p>
                            <p className="text-sm font-medium">
                              {savedICP.geography}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Target Role</p>
                            <p className="text-sm font-medium">
                              {savedICP.role}
                            </p>
                          </div>
                        </div>
                      </div>}
                    {targetAudience === 'different' && <div className="space-y-4">
                        <div>
                          <label htmlFor="target-industry" className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                          </label>
                          <select id="target-industry" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value={targetIndustry} onChange={e => setTargetIndustry(e.target.value)}>
                            <option value="">Select industry</option>
                            <option value="saas">SaaS</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="agency">Agency</option>
                            <option value="fintech">Fintech</option>
                            <option value="healthcare">Healthcare</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Size
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['1-10', '11-50', '51-200', '201-1000', '1000+'].map(size => <div key={size} className="flex items-center">
                                <input type="checkbox" id={`company-size-${size}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" checked={targetCompanySize.includes(size)} onChange={() => handleCompanySizeToggle(size)} />
                                <label htmlFor={`company-size-${size}`} className="ml-2 text-sm text-gray-700">
                                  {size}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="target-geography" className="block text-sm font-medium text-gray-700 mb-1">
                            Geography
                          </label>
                          <select id="target-geography" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value={targetGeography} onChange={e => setTargetGeography(e.target.value)}>
                            <option value="">Select geography</option>
                            <option value="us">United States</option>
                            <option value="europe">Europe</option>
                            <option value="asia">Asia</option>
                            <option value="global">Global</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="target-roles" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Roles
                          </label>
                          <input type="text" id="target-roles" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., Marketing Director, CTO" value={targetRole} onChange={e => setTargetRole(e.target.value)} />
                        </div>
                      </div>}
                  </div>
                </Card>
                {/* Intent Signals */}
                <Card className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Intent Signals
                  </h2>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Select signals that make a prospect more likely to buy
                      from you:
                    </p>
                    <div className="space-y-3">
                      {[{
                      id: 'funding',
                      label: 'Recently funded companies',
                      icon: <BuildingIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'hiring',
                      label: 'Currently hiring',
                      icon: <UserIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'growth',
                      label: 'High growth companies (>30% YoY)',
                      icon: <TrendingUpIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'news',
                      label: 'Recent news/awards',
                      icon: <NewspaperIcon className="w-4 h-4 mr-1" />
                    }, {
                      id: 'tech',
                      label: 'Technology adoption signals',
                      icon: <CodeIcon className="w-4 h-4 mr-1" />
                    }].map(signal => <div key={signal.id} className="flex items-center">
                          <input type="checkbox" id={`intent-${signal.id}`} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" checked={selectedSignals.includes(signal.id)} onChange={() => handleSignalToggle(signal.id)} />
                          <label htmlFor={`intent-${signal.id}`} className="ml-2 flex items-center text-sm text-gray-700">
                            {signal.icon} {signal.label}
                          </label>
                        </div>)}
                      <div className="flex items-center">
                        <input type="checkbox" id="intent-other" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" checked={selectedSignals.includes('other')} onChange={() => handleSignalToggle('other')} />
                        <label htmlFor="intent-other" className="ml-2 flex items-center text-sm text-gray-700">
                          <PlusIcon className="w-4 h-4 mr-1" /> Other
                        </label>
                      </div>
                      {selectedSignals.includes('other') && <div className="ml-6">
                          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Describe other intent signals" />
                        </div>}
                    </div>
                  </div>
                </Card>
                {/* Email Sequence */}
                <Card>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Email Sequence
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Sequence Length
                      </label>
                      <div className="flex space-x-4">
                        {[3, 5, 7].map(count => <div key={count} className="flex items-center">
                            <input type="radio" id={`follow-up-${count}`} name="follow-up" checked={followUpCount === count} onChange={() => setFollowUpCount(count)} className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" />
                            <label htmlFor={`follow-up-${count}`} className="ml-2 text-sm text-gray-700">
                              {count} emails
                            </label>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="campaign-duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Duration
                      </label>
                      <select id="campaign-duration" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value={campaignDuration} onChange={e => setCampaignDuration(e.target.value)}>
                        <option value="1-week">1 week</option>
                        <option value="2-weeks">2 weeks</option>
                        <option value="1-month">1 month</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Tone Selection
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Professional', 'Casual', 'Friendly'].map(tone => <div key={tone} className="relative">
                            <input type="radio" name="tone" id={`tone-${tone.toLowerCase()}`} className="sr-only peer" checked={sequenceTone === tone.toLowerCase()} onChange={() => setSequenceTone(tone.toLowerCase())} />
                            <label htmlFor={`tone-${tone.toLowerCase()}`} className="block border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:bg-opacity-5">
                              <span className="text-sm font-medium">
                                {tone}
                              </span>
                            </label>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="send-frequency" className="block text-sm font-medium text-gray-700 mb-1">
                        Send Frequency
                      </label>
                      <select id="send-frequency" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="daily">Daily</option>
                        <option value="2-days">Every 2 days</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
              {/* Campaign Summary */}
              <div>
                <Card className="sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Campaign Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target contacts:</span>
                      <span className="font-medium">{contactCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Follow-ups:</span>
                      <span className="font-medium">
                        {followUpCount} emails
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">
                        {campaignDuration === '1-week' ? '1 week' : campaignDuration === '2-weeks' ? '2 weeks' : '1 month'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tone:</span>
                      <span className="font-medium capitalize">
                        {sequenceTone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Estimated results:</span>
                      <span className="font-medium text-success">
                        ~15 meetings
                      </span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-200">
                      <Button fullWidth icon={<ChevronRightIcon className="w-4 h-4" />} onClick={findProspects} disabled={!campaignGoal || targetAudience === 'different' && (!targetIndustry || targetCompanySize.length === 0 || !targetGeography || !targetRole) || selectedSignals.length === 0}>
                        Find My Prospects
                      </Button>
                    </div>
                  </div>
                </Card>
                <div className="mt-6">
                  <Button variant="outline" fullWidth onClick={handleBack}>
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default CampaignSetup;