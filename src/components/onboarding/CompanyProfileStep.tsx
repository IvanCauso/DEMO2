import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
import Button from '../ui/Button';
interface CompanyProfileProps {
  companyProfile: {
    name: string;
    industry: string;
    product: string;
    description: string;
    valueProps: string[];
  };
  setCompanyProfile: React.Dispatch<React.SetStateAction<{
    name: string;
    industry: string;
    product: string;
    description: string;
    valueProps: string[];
  }>>;
  onNext: () => void;
  onBack: () => void;
}
const CompanyProfileStep: React.FC<CompanyProfileProps> = ({
  companyProfile,
  setCompanyProfile,
  onNext,
  onBack
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    // Simulate website analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const handlePerfect = () => {
    onNext();
  };
  const handleEdit = () => {
    setShowEdit(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setCompanyProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleValuePropChange = (index: number, value: string) => {
    const newValueProps = [...companyProfile.valueProps];
    newValueProps[index] = value;
    setCompanyProfile(prev => ({
      ...prev,
      valueProps: newValueProps
    }));
  };
  return <div className="p-8">
      <div className="flex items-start mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
          <span className="text-white font-bold">AI</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
          <p>
            Great! Now I'll analyze your company website to understand your
            business better.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Understanding your business
        </h2>
        <p className="text-gray-500">
          I'll automatically extract key information about your company to help
          target the right prospects.
        </p>
      </div>
      {isAnalyzing ? <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Analyzing your website
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              I'm scanning your website to understand your product, value
              proposition, and target market.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse"></div>
              </div>
              <span className="text-sm text-gray-500">Please wait...</span>
            </div>
          </div>
        </div> : showEdit ? <div className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input type="text" id="name" name="name" value={companyProfile.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="industry" className="text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <input type="text" id="industry" name="industry" value={companyProfile.industry} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="product" className="text-sm font-medium text-gray-700 mb-1">
              Product / Service
            </label>
            <input type="text" id="product" name="product" value={companyProfile.product} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea id="description" name="description" rows={3} value={companyProfile.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Key Value Propositions
            </label>
            {companyProfile.valueProps.map((prop, index) => <div key={index} className="mb-2">
                <input type="text" value={prop} onChange={e => handleValuePropChange(index, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>)}
          </div>
        </div> : <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 relative">
          <div className="absolute top-4 right-4 bg-primary bg-opacity-10 text-primary text-xs font-medium px-2 py-1 rounded-full flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Generated
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {companyProfile.name}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-medium">{companyProfile.industry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Product / Service</p>
              <p className="font-medium">{companyProfile.product}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">{companyProfile.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Key Value Propositions
              </p>
              <ul className="space-y-1">
                {companyProfile.valueProps.map((prop, index) => <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>{prop}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        {!isAnalyzing && !showEdit && <div className="flex space-x-3">
            <Button variant="outline" onClick={handleEdit}>
              Let me adjust
            </Button>
            <Button onClick={handlePerfect}>
              Perfect!
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>}
        {showEdit && <Button onClick={onNext}>Continue</Button>}
      </div>
    </div>;
};
export default CompanyProfileStep;