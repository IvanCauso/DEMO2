import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
import Button from '../ui/Button';
interface ICPStepProps {
  icpData: {
    targetGeography: string;
    companySize: string;
    industry: string;
    targetRoles: string[];
    targetSystems: string[];
    painPoints: string[];
  };
  setIcpData: React.Dispatch<React.SetStateAction<{
    targetGeography: string;
    companySize: string;
    industry: string;
    targetRoles: string[];
    targetSystems: string[];
    painPoints: string[];
  }>>;
  onNext: () => void;
  onBack: () => void;
}
const ICPStep: React.FC<ICPStepProps> = ({
  icpData,
  setIcpData,
  onNext,
  onBack
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    // Simulate ICP analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  const handlePerfect = () => {
    onNext();
  };
  const handleEdit = () => {
    setShowEdit(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setIcpData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...icpData[field as keyof typeof icpData]] as string[];
    newArray[index] = value;
    setIcpData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };
  return <div className="p-8">
      <div className="flex items-start mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
          <span className="text-white font-bold">AI</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
          <p>
            Based on your company profile, I'll now identify your ideal customer
            profile (ICP). This will help us target the right prospects for your
            outreach campaigns.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Who are your ideal customers?
        </h2>
        <p className="text-gray-500">
          I've analyzed your business and identified the following ideal
          customer profile.
        </p>
      </div>
      {isAnalyzing ? <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
              <div className="absolute inset-3 rounded-full border-t-2 border-primary animate-spin" style={{
            animationDirection: 'reverse',
            animationDuration: '1.5s'
          }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Generating your ideal customer profile
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              I'm analyzing your industry, product, and value propositions to
              determine who would benefit most from your solution.
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
            <label htmlFor="targetGeography" className="text-sm font-medium text-gray-700 mb-1">
              Target Geography
            </label>
            <input type="text" id="targetGeography" name="targetGeography" value={icpData.targetGeography} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="companySize" className="text-sm font-medium text-gray-700 mb-1">
              Company Size
            </label>
            <select id="companySize" name="companySize" value={icpData.companySize} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="51-200 employees">51-200 employees</option>
              <option value="201-500 employees">201-500 employees</option>
              <option value="501-1000 employees">501-1000 employees</option>
              <option value="1000+ employees">1000+ employees</option>
              <option value="50-500 employees">50-500 employees</option>
            </select>
          </div>
          <div>
            <label htmlFor="industry" className="text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <input type="text" id="industry" name="industry" value={icpData.industry} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Target Roles
            </label>
            {icpData.targetRoles.map((role, index) => <div key={index} className="mb-2">
                <input type="text" value={role} onChange={e => handleArrayChange('targetRoles', index, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>)}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Target Systems
            </label>
            {icpData.targetSystems.map((system, index) => <div key={index} className="mb-2">
                <input type="text" value={system} onChange={e => handleArrayChange('targetSystems', index, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>)}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Pain Points
            </label>
            {icpData.painPoints.map((point, index) => <div key={index} className="mb-2">
                <input type="text" value={point} onChange={e => handleArrayChange('painPoints', index, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
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
            Your Ideal Customer Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Target Geography</p>
              <p className="font-medium">{icpData.targetGeography}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Size</p>
              <p className="font-medium">{icpData.companySize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-medium">{icpData.industry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Target Roles</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {icpData.targetRoles.map((role, index) => <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                    {role}
                  </span>)}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-2">Target Systems</p>
              <div className="flex flex-wrap gap-2">
                {icpData.targetSystems.map((system, index) => <span key={index} className="bg-primary bg-opacity-10 text-primary text-xs font-medium px-2.5 py-1 rounded">
                    {system}
                  </span>)}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-2">Pain Points</p>
              <ul className="space-y-1">
                {icpData.painPoints.map((point, index) => <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
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
export default ICPStep;