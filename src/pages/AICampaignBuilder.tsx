import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SendIcon, UserIcon, CheckIcon, ArrowLeftIcon, SparklesIcon, BuildingIcon, PhoneIcon, CalendarIcon, BarChart3Icon, ClockIcon, MailIcon, ChevronRightIcon, InfoIcon, XIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
// Types for chat messages
type MessageType = 'ai' | 'user' | 'system' | 'audienceCard' | 'campaignPreview' | 'exclusionsInput' | 'scaleSlider' | 'toneCard' | 'scheduleCard' | 'loadingState' | 'budgetCard';
interface ChatMessage {
  id: string;
  type: MessageType;
  content: string | React.ReactNode;
  audienceData?: {
    industry: string;
    companySize: string;
    geography: string;
    targetRoles: string[];
    painPoints: string[];
  };
  campaignData?: {
    name: string;
    audienceSize: number;
    emailCount: number;
    duration: string;
    startDate: string;
    expectedResults: {
      opens: number;
      replies: number;
      meetings: number;
    };
  };
  isTyping?: boolean;
  exclusions?: string;
  companyCount?: number;
  tone?: {
    name: string;
    description: string;
    example: string;
  };
  schedule?: {
    timeWindow: string;
    days: string;
  };
  loadingStep?: number;
  budget?: {
    credits: number;
    companyCount: number;
  };
}
declare global {
  interface Window {
    askScheduleTimeout?: number;
    loadingStateTimeout?: number;
  }
}
const AICampaignBuilder = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [exclusions, setExclusions] = useState('');
  const [companyCount, setCompanyCount] = useState(25);
  const [campaignName, setCampaignName] = useState('London Estate Agencies - Repair Issues');
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Initial message when component mounts
  useEffect(() => {
    startCampaignFlow();
  }, []);
  // Auto-scroll to position the latest message at the top of the viewport
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      // Simple scroll to bottom to ensure latest message is visible
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages, isTyping]);
  // Start the campaign flow
  const startCampaignFlow = () => {
    setIsTyping(true);
    // Simulate typing effect for first message
    setTimeout(() => {
      setMessages([{
        id: 'ai-1',
        type: 'ai',
        content: "Perfect! I'll help you set up your campaign targeting London-based estate agencies with poor tenant reviews about repairs. We'll find companies with negative repair-related reviews on Google/Trustpilot and create personalized outreach for each one. Let's get started!"
      }]);
      setIsTyping(false);
      // Move to step 1 after initial message
      setTimeout(() => {
        setCurrentStep(1);
        askAboutExclusions();
      }, 1000);
    }, 1500);
  };
  // Step 1: Ask about company exclusions
  const askAboutExclusions = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-2',
        type: 'ai',
        content: "First, are there any types of companies or specific companies you'd like me to exclude from this campaign? For example, you might want to avoid enterprise companies or exclude existing customers."
      }, {
        id: 'exclusions-input',
        type: 'exclusionsInput',
        content: 'Exclusions input'
      }]);
      setIsTyping(false);
    }, 1500);
  };
  // Handle exclusions submission
  const handleExclusionsSubmit = () => {
    // Add user message with exclusions
    setMessages(prev => [...prev, {
      id: `user-exclusions-${Date.now()}`,
      type: 'user',
      content: exclusions || 'No exclusions needed',
      exclusions: exclusions
    }]);
    // Move to step 2
    setCurrentStep(2);
    askAboutCampaignScale();
  };
  // Step 2: Ask about campaign scale
  const askAboutCampaignScale = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-3',
        type: 'ai',
        content: 'Great! Now, how many companies would you like me to target for this campaign? I recommend starting with 20-50 companies for your first campaign.'
      }, {
        id: 'scale-slider',
        type: 'scaleSlider',
        content: 'Scale slider',
        companyCount: companyCount
      }]);
      setIsTyping(false);
    }, 1500);
  };
  // Handle campaign scale submission
  const handleScaleSubmit = () => {
    // Add user message with company count
    setMessages(prev => [...prev, {
      id: `user-scale-${Date.now()}`,
      type: 'user',
      content: `I want to target ${companyCount} companies`,
      companyCount: companyCount
    }]);
    // Move to step 3
    setCurrentStep(3);
    askAboutTone();
  };
  // Step 3: Ask about tone of voice
  const askAboutTone = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-4',
        type: 'ai',
        content: 'Perfect! Based on your industry and company profile, I recommend using a professional yet approachable tone. This works well for estate agents as it builds trust while being personable enough to encourage responses. Does this sound right, or would you like me to adjust it?'
      }, {
        id: 'tone-card',
        type: 'toneCard',
        content: 'Tone card',
        tone: {
          name: 'Professional yet approachable',
          description: 'Builds credibility with property managers while remaining personable and trustworthy',
          example: "I noticed you've been handling some challenging maintenance situations..."
        }
      }]);
      setIsTyping(false);
    }, 1500);
  };
  // Handle tone submission
  const handleToneSubmit = (customTone?: string) => {
    // Add user message with tone selection
    setMessages(prev => [...prev, {
      id: `user-tone-${Date.now()}`,
      type: 'user',
      content: customTone || "I'll use the recommended tone"
    }]);
    // Move to step 4
    setCurrentStep(4);
    askAboutSchedule();
  };
  // Step 4: Ask about send schedule
  const askAboutSchedule = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-5',
        type: 'ai',
        content: 'Great! I recommend sending emails between 9:00 AM - 11:00 AM on weekdays when property managers typically check their email. This timing gets good response rates in the real estate industry.'
      }, {
        id: 'schedule-card',
        type: 'scheduleCard',
        content: 'Schedule card',
        schedule: {
          timeWindow: '9:00 AM - 11:00 AM',
          days: 'Monday - Friday'
        }
      }]);
      setIsTyping(false);
    }, 1500);
  };
  // Handle schedule submission
  const handleScheduleSubmit = (customSchedule?: {
    timeWindow: string;
    days: string;
  }) => {
    // Add user message with schedule selection
    setMessages(prev => [...prev, {
      id: `user-schedule-${Date.now()}`,
      type: 'user',
      content: customSchedule ? `I'll use a custom schedule: ${customSchedule.timeWindow} on ${customSchedule.days}` : "I'll use the recommended schedule"
    }]);
    // Move to step 5
    setCurrentStep(5);
    showLoadingState();
  };
  // Step 5: Show loading state
  const showLoadingState = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-6',
        type: 'ai',
        content: "Excellent! Now I'll search for London-based estate agencies with poor repair reviews. This might take a moment..."
      }, {
        id: 'loading-state',
        type: 'loadingState',
        content: 'Loading state',
        loadingStep: loadingStep
      }]);
      setIsTyping(false);
      // Simulate loading steps
      simulateLoading();
    }, 1500);
  };
  // Simulate loading steps
  const simulateLoading = () => {
    const loadingSteps = ['Searching Google & Trustpilot reviews...', 'Analyzing repair-related complaints...', 'Finding decision makers...', 'Personalizing outreach angles...'];
    let currentLoadingStep = 0;
    const loadingInterval = setInterval(() => {
      if (currentLoadingStep < loadingSteps.length) {
        setLoadingStep(currentLoadingStep);
        currentLoadingStep++;
        // Update the loading message
        setMessages(prev => prev.map(msg => msg.id === 'loading-state' ? {
          ...msg,
          loadingStep: currentLoadingStep - 1
        } : msg));
      } else {
        clearInterval(loadingInterval);
        setLoadingComplete(true);
        // Remove the loading state message from the messages array
        setMessages(prev => prev.filter(msg => msg.id !== 'loading-state'));
        // Move to step 6
        setCurrentStep(6);
        showCampaignPreview();
      }
    }, 2000);
  };
  // Step 6: Show campaign preview
  const showCampaignPreview = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-7',
        type: 'ai',
        content: `Found ${companyCount} companies that match your criteria! Here's your campaign preview:`
      }, {
        id: 'campaign-preview',
        type: 'campaignPreview',
        content: 'Campaign Preview',
        campaignData: {
          name: campaignName,
          audienceSize: companyCount,
          emailCount: 3,
          duration: '2 weeks',
          startDate: new Date(Date.now() + 86400000).toLocaleDateString(),
          expectedResults: {
            opens: Math.round(companyCount * 0.9),
            replies: Math.round(companyCount * 0.2),
            meetings: Math.round(companyCount * 0.06)
          }
        }
      }]);
      setIsTyping(false);
      // Move to step 7
      setTimeout(() => {
        setCurrentStep(7);
        showBudgetConfirmation();
      }, 1000);
    }, 1500);
  };
  // Step 7: Show budget confirmation
  const showBudgetConfirmation = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-8',
        type: 'ai',
        content: `Your campaign budget will be ${companyCount} credits for ${companyCount} companies.`
      }, {
        id: 'budget-card',
        type: 'budgetCard',
        content: 'Budget card',
        budget: {
          credits: companyCount,
          companyCount: companyCount
        }
      }]);
      setIsTyping(false);
    }, 1500);
  };
  // Handle campaign creation
  const handleCreateCampaign = () => {
    // Add user message confirming campaign creation
    setMessages(prev => [...prev, {
      id: `user-create-${Date.now()}`,
      type: 'user',
      content: 'Create this campaign'
    }]);
    // Show final AI message
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'ai-final',
        type: 'ai',
        content: 'Great! Your campaign has been created. You can now review your audience and make any final adjustments before launching.'
      }]);
      setIsTyping(false);
      // Navigate to audience review page
      setTimeout(() => {
        navigate('/audiences/1');
      }, 2000);
    }, 1500);
  };
  const handleBack = () => {
    navigate(-1);
  };
  // Render different message types
  const renderMessage = (message: ChatMessage, index: number) => {
    // Set ref for the latest message
    const isLatestMessage = index === messages.length - 1;
    const messageRef = isLatestMessage ? latestMessageRef : null;
    switch (message.type) {
      case 'ai':
        return <div ref={messageRef} className="flex items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[85%]">
              <p className="text-gray-800 whitespace-pre-line">
                {message.content}
              </p>
            </div>
          </div>;
      case 'user':
        return <div className="flex items-start justify-end mb-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded-lg rounded-tr-none max-w-[85%]">
              <p className="text-gray-800">{message.content}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0">
              <UserIcon className="w-4 h-4 text-gray-600" />
            </div>
          </div>;
      case 'system':
        return <div className="flex justify-center mb-4">
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 flex items-center">
              <span>{message.content}</span>
            </div>
          </div>;
      case 'exclusionsInput':
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Companies or types to exclude
              </label>
              <div className="flex items-center">
                <input type="text" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mr-2" placeholder="e.g., 'No enterprise companies' or 'Exclude ACME Corp'" value={exclusions} onChange={e => setExclusions(e.target.value)} />
                <Button onClick={handleExclusionsSubmit} icon={<SendIcon className="w-4 h-4" />}>
                  Submit
                </Button>
              </div>
              <div className="mt-3 flex justify-center">
                <Button variant="outline" size="sm" onClick={() => {
                setExclusions('');
                handleExclusionsSubmit();
              }}>
                  No exclusions needed
                </Button>
              </div>
            </div>
          </div>;
      case 'scaleSlider':
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {companyCount}
                </span>
                <span className="text-sm text-gray-500 block">
                  = {companyCount} credits
                </span>
              </div>
              <div className="mb-4">
                <input type="range" min="10" max="200" step="5" value={companyCount} onChange={e => setCompanyCount(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Fewer companies (10)</span>
                  <span>More companies (200)</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleScaleSubmit}>
                  Set target to {companyCount} companies
                </Button>
              </div>
            </div>
          </div>;
      case 'toneCard':
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <SparklesIcon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-medium text-gray-900">Recommended Tone</h4>
              </div>
              <div className="mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 mb-1">
                    {message.tone?.name}
                  </h5>
                  <p className="text-sm text-gray-600 mb-3">
                    {message.tone?.description}
                  </p>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-sm italic text-gray-600">
                      "{message.tone?.example}"
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <Button onClick={() => handleToneSubmit()}>
                  Use this tone
                </Button>
                <Button variant="outline" onClick={() => {
                // In a real implementation, this would open a tone editor
                // For now, we'll just simulate with a custom tone
                handleToneSubmit("I'd like a more casual, friendly tone");
              }}>
                  Modify tone
                </Button>
              </div>
            </div>
          </div>;
      case 'scheduleCard':
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <ClockIcon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-medium text-gray-900">
                  Recommended Send Schedule
                </h4>
              </div>
              <div className="mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900">Time Window</h5>
                      <p className="text-lg">{message.schedule?.timeWindow}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Days</h5>
                      <p className="text-lg">{message.schedule?.days}</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 border border-blue-200 rounded p-2">
                    <InfoIcon className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">
                      Causo sends emails at a human pace throughout this time
                      window, not all at once. This looks more natural and
                      improves deliverability.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <Button onClick={() => handleScheduleSubmit()}>
                  Use this schedule
                </Button>
                <Button variant="outline" onClick={() => {
                // In a real implementation, this would open a schedule editor
                // For now, we'll just simulate with a custom schedule
                handleScheduleSubmit({
                  timeWindow: '2:00 PM - 4:00 PM',
                  days: 'Tuesday, Thursday'
                });
              }}>
                  Adjust timing
                </Button>
              </div>
            </div>
          </div>;
      case 'loadingState':
        const loadingSteps = ['Searching Google & Trustpilot reviews...', 'Analyzing repair-related complaints...', 'Finding decision makers...', 'Personalizing outreach angles...'];
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="text-center font-medium text-gray-700">
                {loadingSteps[message.loadingStep || 0]}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div className="bg-primary h-1.5 rounded-full" style={{
                width: `${((message.loadingStep || 0) + 1) * 25}%`
              }}></div>
              </div>
            </div>
          </div>;
      case 'campaignPreview':
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MailIcon className="w-4 h-4 text-primary mr-2" />
                  <h4 className="font-medium text-gray-900">
                    Campaign Preview
                  </h4>
                </div>
                <div className="flex">
                  <input type="text" className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Target Companies</p>
                    <p className="font-medium">
                      {message.campaignData?.audienceSize} companies found
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Targeting Strategy</p>
                    <p className="font-medium">
                      Agencies with negative repair reviews on Google/Trustpilot
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Tone</p>
                    <p className="font-medium">Professional yet approachable</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Send Schedule</p>
                    <p className="font-medium">
                      9:00 AM - 11:00 AM, Monday - Friday
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Targeted Roles</p>
                    <p className="font-medium">
                      Head of Property Management, Head of Lettings, and similar
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Exclusions</p>
                    <p className="font-medium">
                      {exclusions || 'No exclusions specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      case 'budgetCard':
        return <div className="mb-4 pl-11">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {message.budget?.credits}
                </span>
                <span className="text-lg text-gray-700 ml-2">credits</span>
                <div className="flex items-center justify-center mt-1">
                  <InfoIcon className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">
                    This is your campaign budget
                  </span>
                </div>
              </div>
              <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-gray-900 mb-2">
                  Budget Breakdown
                </h5>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">
                      Maximum budget: {message.budget?.credits} credits
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">
                      You can review and reject companies before sending
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-4 h-4 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">
                      No charges for companies without valid contacts
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                <Button variant="outline" onClick={() => {
                // Go back to step 2 (campaign scale)
                setCurrentStep(2);
                askAboutCampaignScale();
              }}>
                  Adjust Settings
                </Button>
              </div>
            </div>
          </div>;
      case 'audienceCard':
        return <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="mb-3">{message.content}</p>
              <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">
                      {message.audienceData?.industry}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Company Size</p>
                    <p className="font-medium">
                      {message.audienceData?.companySize}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Geography</p>
                    <p className="font-medium">
                      {message.audienceData?.geography}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Target Roles</p>
                    <div className="flex flex-wrap gap-1">
                      {message.audienceData?.targetRoles.map((role, idx) => <Badge key={idx} variant="primary" className="text-xs">
                          {role}
                        </Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Pain Points</p>
                    <ul className="space-y-1">
                      {message.audienceData?.painPoints.map((point, idx) => <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
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
                  AI Campaign Builder
                </h1>
                <p className="text-gray-500">
                  Let Causo AI help you create the perfect outreach campaign
                </p>
              </div>
            </div>
            <div className="max-w-[80%] mx-auto w-full">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[900px]">
                <div 
                  ref={chatContainerRef} 
                  className="flex-1 overflow-y-auto mb-6 min-h-0" 
                >
                  {messages.map((message, index) => <div key={message.id}>{renderMessage(message, index)}</div>)}
                  {isTyping && <div className="flex items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white font-bold text-sm">AI</span>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none inline-flex">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce mr-1" style={{
                        animationDelay: '0ms'
                      }}></span>
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce mr-1" style={{
                        animationDelay: '150ms'
                      }}></span>
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{
                        animationDelay: '300ms'
                      }}></span>
                        </span>
                      </div>
                    </div>}
                  <div ref={latestMessageRef} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default AICampaignBuilder;