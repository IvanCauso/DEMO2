import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon, SendIcon, AlertTriangleIcon, LoaderIcon, PlusCircleIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import PaywallModal from '../components/modals/PaywallModal';
// Types for chat messages
type MessageType = 'ai' | 'user' | 'system' | 'companyProfile' | 'campaignIdeas';
interface ChatMessage {
  id: string;
  type: MessageType;
  content: string | React.ReactNode;
  companyData?: {
    name: string;
    industry: string;
    product: string;
    description: string;
    valueProps: string[];
    painPoints?: string[];
  };
  campaignIdeas?: {
    target: string;
    angle: string;
  }[];
  isLoading?: boolean;
}
const AIOnboarding = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Personal Information (auto-detected)
  const personalInfo = {
    name: 'Jane Doe',
    email: 'janedoe@repairagent.co.uk',
    linkedin: 'linkedin.com/in/janedoe',
    company: 'RepairAgent'
  };
  // Company Profile (auto-detected)
  const [companyProfile, setCompanyProfile] = useState({
    name: 'RepairAgent',
    industry: 'PropTech / Real Estate Technology',
    product: 'AI-powered voice assistant for property management',
    description: "RepairAgent's voice AI connects to property management systems, handling tenant maintenance calls 24/7. It automatically categorizes issues and helps tenants resolve problems or book repairs.",
    valueProps: ['Handles maintenance calls 24/7 without human intervention', 'Reduces property management costs by up to 40%', 'Improves tenant satisfaction with instant response', 'Seamlessly integrates with existing property management systems'],
    painPoints: ['Tenants struggle to report maintenance issues outside business hours', 'Property managers lose track of repair requests and status updates', 'Emergency repairs often go unaddressed, leading to tenant dissatisfaction', 'Manual coordination between tenants, property managers, and contractors creates delays']
  });
  // Campaign ideas
  const campaignIdeas = [{
    target: 'London-based estate agencies with poor tenant reviews about repairs',
    angle: 'Target companies with negative repair-related reviews on Google/Trustpilot'
  }, {
    target: 'Property management companies with 50+ units and basic websites',
    angle: 'Target larger property managers with outdated digital presence indicating operational inefficiencies'
  }, {
    target: 'Estate agents in university towns with high tenant turnover',
    angle: 'Target agencies in student areas where rapid tenant changes create more maintenance coordination challenges'
  }];
  // Scroll to position the latest message at the top of the viewport
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      // Force scroll to bottom first to ensure we have the latest content
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTop = scrollHeight;
      // Now find the last message element
      const lastMessage = chatContainerRef.current.lastElementChild;
      if (lastMessage) {
        // Set a timeout to ensure DOM has updated
        setTimeout(() => {
          // Get the position of the last message relative to the scroll container
          const containerTop = chatContainerRef.current.getBoundingClientRect().top;
          const messageTop = lastMessage.getBoundingClientRect().top;
          const offset = messageTop - containerTop;
          // Adjust the scroll position
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollTop - offset;
        }, 0);
      }
    }
  }, [messages, isTyping]);
  // Focus input when edit mode is shown
  useEffect(() => {
    if (showEditInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEditInput]);
  // Initial greeting message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        id: '1',
        type: 'ai',
        content: `Welcome to Causo, Jane! Let's set up your account. We've already detected some information about you from your email. Let's get your account set up`
      }]);
      // Show detected personal info
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: '2',
            type: 'ai',
            content: `I can see you're from ${personalInfo.company} (${personalInfo.email}). I've also found your LinkedIn profile at ${personalInfo.linkedin}.`
          }]);
          // Start analyzing website
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, {
                id: '3',
                type: 'ai',
                content: `Let me analyze your company website at repairagent.co.uk to understand your business better.`
              }]);
              // Show loading message
              setMessages(prev => [...prev, {
                id: '4',
                type: 'system',
                content: 'Analyzing website data...',
                isLoading: true
              }]);
              // Show company data after "analysis"
              setTimeout(() => {
                setMessages(prev => prev.filter(msg => !msg.isLoading));
                setMessages(prev => [...prev, {
                  id: '5',
                  type: 'companyProfile',
                  content: 'Here is your profile:',
                  companyData: companyProfile
                }]);
                // Show action buttons instead of asking for confirmation
                setShowActionButtons(true);
              }, 3000);
            }, 1500);
          }, 1000);
        }, 1500);
      }, 1000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  // Handle "Looks Good" button click
  const handleLooksGood = () => {
    setShowActionButtons(false);
    setIsResearching(true);
    // Add researching message
    setMessages(prev => [...prev, {
      id: 'researching',
      type: 'system',
      content: 'Researching campaign angles...',
      isLoading: true
    }]);
    // After 2 seconds, show campaign ideas
    setTimeout(() => {
      // Remove researching message
      setMessages(prev => prev.filter(msg => msg.id !== 'researching'));
      // Add AI message introducing campaign ideas
      setMessages(prev => [...prev, {
        id: 'campaign-intro',
        type: 'ai',
        content: 'Here are 3 campaign ideas for you:'
      }]);
      // Add campaign ideas
      setMessages(prev => [...prev, {
        id: 'campaign-ideas',
        type: 'campaignIdeas',
        content: 'Campaign Ideas',
        campaignIdeas: campaignIdeas
      }]);
      setIsResearching(false);
    }, 2000);
  };
  // Handle "Let me adjust" button click
  const handleAdjust = () => {
    setShowActionButtons(false);
    setShowEditInput(true);
    // Add AI message asking for adjustments
    setMessages(prev => [...prev, {
      id: `ai-adjust-prompt`,
      type: 'ai',
      content: 'What would you like to adjust about your company profile? Feel free to describe the changes in your own words.'
    }]);
  };
  // Handle edit message submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMessage.trim()) return;
    // Add user message
    setMessages(prev => [...prev, {
      id: `user-edit-${Date.now()}`,
      type: 'user',
      content: editMessage
    }]);
    // Clear input and hide it
    setEditMessage('');
    setShowEditInput(false);
    // Show typing indicator
    setIsTyping(true);
    // Simulate AI processing the edit request
    setTimeout(() => {
      setIsTyping(false);
      // Update company profile based on user's request
      // In a real implementation, this would use AI to interpret the changes
      const updatedProfile = processEditRequest(editMessage, companyProfile);
      setCompanyProfile(updatedProfile);
      // Add AI confirmation message
      setMessages(prev => [...prev, {
        id: `ai-edit-confirmation-${Date.now()}`,
        type: 'ai',
        content: "I've updated your company profile based on your feedback. Here's the revised profile:"
      }]);
      // Add updated company profile card
      setMessages(prev => [...prev, {
        id: `updated-profile-${Date.now()}`,
        type: 'companyProfile',
        content: 'Updated profile:',
        companyData: updatedProfile
      }]);
      // Show action buttons again
      setShowActionButtons(true);
    }, 2000);
  };
  // Process edit request (simulated AI interpretation)
  const processEditRequest = (request: string, currentProfile: typeof companyProfile) => {
    // This is a simplified simulation of AI processing
    // In a real implementation, this would use AI to interpret the changes
    const updatedProfile = {
      ...currentProfile
    };
    // Simple keyword-based updates
    const requestLower = request.toLowerCase();
    if (requestLower.includes('saas') || requestLower.includes('software')) {
      updatedProfile.industry = 'SaaS / Property Management Software';
    }
    if (requestLower.includes('cost reduction') || requestLower.includes('save money')) {
      const costIndex = updatedProfile.valueProps.findIndex(vp => vp.toLowerCase().includes('cost') || vp.toLowerCase().includes('reduc'));
      if (costIndex >= 0) {
        updatedProfile.valueProps[costIndex] = 'Reduces property management costs by up to 60%';
      }
    }
    if (requestLower.includes('integration') || requestLower.includes('connect')) {
      const integrateIndex = updatedProfile.valueProps.findIndex(vp => vp.toLowerCase().includes('integrat'));
      if (integrateIndex >= 0) {
        updatedProfile.valueProps[integrateIndex] = 'Seamlessly integrates with 20+ property management systems including Yardi and AppFolio';
      }
    }
    if (requestLower.includes('24/7') || requestLower.includes('always on')) {
      const availabilityIndex = updatedProfile.valueProps.findIndex(vp => vp.toLowerCase().includes('24/7'));
      if (availabilityIndex >= 0) {
        updatedProfile.valueProps[availabilityIndex] = 'Handles maintenance calls 24/7/365, even during holidays and peak periods';
      }
    }
    if (requestLower.includes('description') || requestLower.includes('about')) {
      updatedProfile.description = "RepairAgent's advanced AI voice assistant revolutionizes property management by automating tenant maintenance requests 24/7. Our solution categorizes issues, provides instant troubleshooting, and seamlessly schedules repairs when needed, dramatically reducing operational costs while improving tenant satisfaction.";
    }
    // Return the updated profile
    return updatedProfile;
  };
  // Handle "Create Campaign" button click
  const handleCreateCampaign = () => {
    setShowPaywallModal(true);
  };
  // Render different message types
  const renderMessage = (message: ChatMessage, index: number) => {
    // Set ref for the latest message
    const isLatestMessage = index === messages.length - 1;
    const messageRef = isLatestMessage ? latestMessageRef : null;
    switch (message.type) {
      case 'ai':
        return <div ref={messageRef} className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
              <p>{message.content}</p>
            </div>
          </div>;
      case 'user':
        return <div className="flex items-start justify-end mb-6">
            <div className="bg-primary bg-opacity-10 p-4 rounded-lg rounded-tr-none max-w-[80%]">
              <p>{message.content}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
              <span className="font-medium text-gray-600">JD</span>
            </div>
          </div>;
      case 'system':
        return <div className="flex justify-center mb-6">
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 flex items-center">
              {message.isLoading && <div className="mr-2 w-4 h-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>}
              <span>{message.content}</span>
            </div>
          </div>;
      case 'companyProfile':
        return <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
              <p className="mb-3">{message.content}</p>
              <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Company name</p>
                    <p className="font-medium">{message.companyData?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">
                      {message.companyData?.industry}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Product / Service</p>
                    <p className="font-medium">
                      {message.companyData?.product}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">
                      {message.companyData?.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      Key Value Propositions
                    </p>
                    <ul className="space-y-1">
                      {message.companyData?.valueProps.map((prop, index) => <li key={index} className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span>{prop}</span>
                        </li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2 text-error">
                      Customer Pain Points
                    </p>
                    <ul className="space-y-1">
                      {message.companyData?.painPoints?.map((point, index) => <li key={index} className="flex items-start">
                          <AlertTriangleIcon className="w-4 h-4 text-error mr-2 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>
              {showActionButtons && <div className="mt-4 flex space-x-3 justify-center">
                  <Button variant="outline" onClick={handleAdjust}>
                    Let me adjust
                  </Button>
                  <Button onClick={handleLooksGood}>Looks good</Button>
                </div>}
            </div>
          </div>;
      case 'campaignIdeas':
        return <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="text-white font-bold">AI</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
              <div className="space-y-4">
                {message.campaignIdeas?.map((idea, index) => <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {idea.target}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">{idea.angle}</p>
                    <Button size="sm" onClick={handleCreateCampaign}>
                      Create Campaign
                    </Button>
                  </div>)}
                <div className="flex justify-center mt-2">
                  <Button variant="ghost" size="sm" onClick={handleCreateCampaign} icon={<PlusCircleIcon className="w-4 h-4 mr-2" />}>
                    Create custom campaign
                  </Button>
                </div>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Causo</div>
        </div>
      </div>
      <main className="flex-1 p-6 flex flex-col">
        <div className="max-w-[80%] mx-auto w-full flex-1">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[calc(100vh-160px)] flex flex-col">
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-6" style={{
            height: 'calc(100% - 80px)'
          }}>
              {messages.map((message, index) => <div key={message.id}>{renderMessage(message, index)}</div>)}
              {isTyping && <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none inline-flex">
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
              <div ref={messagesEndRef} />
            </div>
            {/* Edit Message Input */}
            {showEditInput && <form onSubmit={handleEditSubmit} className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-medium text-gray-600">JD</span>
                </div>
                <div className="flex-1 relative">
                  <input ref={inputRef} type="text" value={editMessage} onChange={e => setEditMessage(e.target.value)} placeholder="Describe how you'd like to adjust your profile..." className="w-full py-3 px-4 pr-12 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark" disabled={!editMessage.trim()}>
                    <SendIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>}
          </div>
        </div>
      </main>
      {/* Paywall Modal */}
      <PaywallModal isOpen={showPaywallModal} onClose={() => setShowPaywallModal(false)} />
    </div>;
};
export default AIOnboarding;