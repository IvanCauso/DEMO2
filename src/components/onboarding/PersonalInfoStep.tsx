import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from 'lucide-react';
import Button from '../ui/Button';
interface PersonalInfoProps {
  personalInfo: {
    name: string;
    email: string;
    linkedin: string;
    company: string;
  };
  setPersonalInfo: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    linkedin: string;
    company: string;
  }>>;
  onNext: () => void;
}
const PersonalInfoStep: React.FC<PersonalInfoProps> = ({
  personalInfo,
  setPersonalInfo,
  onNext
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [website, setWebsite] = useState('');
  useEffect(() => {
    // Simulate AI detection
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="p-8">
      <div className="flex items-start mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
          <span className="text-white font-bold">AI</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
          <p>
            Hi there! I'm Causo AI, and I'll help you set up your outreach
            campaigns. Let's start by getting to know you a bit.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Let's get to know you
        </h2>
        <p className="text-gray-500">
          I'll use this information to personalize your experience and help you
          connect with prospects.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            Full Name
            {isAnalyzing ? <div className="ml-2 flex items-center text-xs text-gray-500">
                <div className="flex space-x-1 ml-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '0ms'
              }}></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '300ms'
              }}></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '600ms'
              }}></div>
                </div>
                <span className="ml-1">Detecting</span>
              </div> : <div className="ml-2 flex items-center text-xs text-success">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Detected automatically
              </div>}
          </label>
          <input type="text" id="name" name="name" value={personalInfo.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            Email Address
            {isAnalyzing ? <div className="ml-2 flex items-center text-xs text-gray-500">
                <div className="flex space-x-1 ml-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '0ms'
              }}></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '300ms'
              }}></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '600ms'
              }}></div>
                </div>
                <span className="ml-1">Detecting</span>
              </div> : <div className="ml-2 flex items-center text-xs text-success">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Detected automatically
              </div>}
          </label>
          <input type="email" id="email" name="email" value={personalInfo.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="company" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            Company Name
            {isAnalyzing ? <div className="ml-2 flex items-center text-xs text-gray-500">
                <div className="flex space-x-1 ml-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '0ms'
              }}></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '300ms'
              }}></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{
                animationDelay: '600ms'
              }}></div>
                </div>
                <span className="ml-1">Detecting</span>
              </div> : <div className="ml-2 flex items-center text-xs text-success">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Detected from email domain
              </div>}
          </label>
          <input type="text" id="company" name="company" value={personalInfo.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your company name" />
        </div>
        <div>
          <label htmlFor="linkedin" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
            {!isAnalyzing && <div className="ml-2 flex items-center text-xs text-success">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Found profile
              </div>}
          </label>
          <input type="text" id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="linkedin.com/in/yourprofile" />
        </div>
        <div>
          <label htmlFor="website" className="text-sm font-medium text-gray-700 mb-1">
            Company Website
          </label>
          <input type="text" id="website" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://www.example.com" />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={onNext} disabled={isAnalyzing}>
          Continue
        </Button>
      </div>
    </div>;
};
export default PersonalInfoStep;