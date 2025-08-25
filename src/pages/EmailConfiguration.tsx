import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ArrowLeftIcon, InfoIcon, CheckCircleIcon, ChevronRightIcon, SaveIcon } from 'lucide-react';
const EmailConfiguration = () => {
  const navigate = useNavigate();
  // Form state
  const [campaignGoal, setCampaignGoal] = useState('');
  const [signatureType, setSignatureType] = useState('gmail');
  const [customSignature, setCustomSignature] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [goalError, setGoalError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // Handle back navigation
  const handleBack = () => {
    navigate('/audiences/1');
  };
  // Handle form submission
  const handleGenerateEmails = () => {
    // Validate form
    if (!campaignGoal.trim()) {
      setGoalError('Please describe what you want recipients to do');
      return;
    }
    // Set loading state
    setIsGenerating(true);
    // Force immediate navigation with a more direct approach
    window.location.href = '/email-campaign';
    // We don't need the timeout since we're using window.location
    // which will cause a full page reload
  };
  // Validate goal input on change
  const handleGoalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCampaignGoal(e.target.value);
    if (e.target.value.trim()) {
      setGoalError('');
    }
    // Reset saved state when input changes
    if (isSaved) {
      setIsSaved(false);
    }
  };
  // Handle save button click
  const handleSaveGoal = () => {
    if (!campaignGoal.trim()) {
      setGoalError('Please describe what you want recipients to do');
      return;
    }
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      // Reset saved state after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1000);
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <button className="flex items-center text-gray-500 hover:text-gray-700 mb-4" onClick={handleBack}>
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Audience Review
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Email Configuration
                </h1>
                <p className="text-gray-500">
                  Configure your campaign settings before generating
                  personalized emails
                </p>
              </div>
            </div>
            {/* Campaign Summary Card */}
            <Card className="mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Campaign Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Campaign Name</p>
                    <p className="font-medium text-gray-900">
                      London Estate Agencies - Repair Issues
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Target Audience
                    </p>
                    <p className="font-medium text-gray-900">
                      48 contacts from estate agencies with repair review issues
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <div className="flex items-center">
                      <Badge variant="primary" size="sm" className="flex items-center">
                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                        Ready to configure emails
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {/* Campaign Goal Section */}
            <Card className="mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    What do you want recipients to do?
                  </h3>
                  <div className="relative group">
                    <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute right-0 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
                      <p className="text-xs text-gray-600">
                        Describe what action you want recipients to take and
                        include any links you want in the emails. Our AI will
                        craft the messaging around your goal.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Describe your campaign goal and include any relevant links
                </p>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <div className="flex-grow">
                      <textarea className={`w-full px-4 py-3 border ${goalError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent min-h-[120px]`} placeholder="e.g., 'Schedule a 15-minute discovery call to discuss how we can reduce your maintenance response times. Book here: https://calendly.com/yourname/discovery'" value={campaignGoal} onChange={handleGoalChange}></textarea>
                    </div>
                    <div className="flex flex-col justify-start pt-1">
                      <Button variant="outline" size="sm" icon={<SaveIcon className="w-4 h-4 mr-1" />} onClick={handleSaveGoal} disabled={isSaving || !campaignGoal.trim()}>
                        {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save'}
                      </Button>
                    </div>
                  </div>
                  {goalError && <p className="text-sm text-red-500">{goalError}</p>}
                </div>
              </div>
            </Card>
            {/* Email Signature Section */}
            <Card className="mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Email signature
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Choose how to sign your emails
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input type="radio" id="gmail-signature" name="signature-type" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600 mt-1" checked={signatureType === 'gmail'} onChange={() => setSignatureType('gmail')} />
                    <label htmlFor="gmail-signature" className="ml-2 block">
                      <span className="text-sm font-medium text-gray-900">
                        Use my Gmail signature
                      </span>
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input type="radio" id="custom-signature" name="signature-type" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600 mt-1" checked={signatureType === 'custom'} onChange={() => setSignatureType('custom')} />
                    <label htmlFor="custom-signature" className="ml-2 block w-full">
                      <span className="text-sm font-medium text-gray-900">
                        Create custom signature for this campaign
                      </span>
                      {signatureType === 'custom' && <textarea className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent min-h-[100px]" placeholder="Best regards,&#10;[Your Name]&#10;[Your Title]&#10;[Company]&#10;[Contact info]" value={customSignature} onChange={e => setCustomSignature(e.target.value)}></textarea>}
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input type="radio" id="no-signature" name="signature-type" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600 mt-1" checked={signatureType === 'none'} onChange={() => setSignatureType('none')} />
                    <label htmlFor="no-signature" className="ml-2 block">
                      <span className="text-sm font-medium text-gray-900">
                        No signature
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} icon={<ArrowLeftIcon className="w-4 h-4 mr-1" />}>
                Back to Audience
              </Button>
              <Button onClick={handleGenerateEmails} disabled={!campaignGoal.trim() || isGenerating} icon={isGenerating ? undefined : <ChevronRightIcon className="w-4 h-4 ml-1" />} iconPosition="right">
                {isGenerating ? 'Generating personalized emails...' : 'Generate Emails'}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default EmailConfiguration;