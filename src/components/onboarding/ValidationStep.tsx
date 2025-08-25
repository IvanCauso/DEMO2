import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, RefreshCwIcon, ArrowRightIcon } from 'lucide-react';
import Button from '../ui/Button';
interface Company {
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  fit: string;
}
interface ValidationStepProps {
  companies: Company[];
  approvedCompanies: string[];
  rejectedCompanies: string[];
  onCompanyApproval: (companyName: string, approved: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
}
const ValidationStep: React.FC<ValidationStepProps> = ({
  companies,
  approvedCompanies,
  rejectedCompanies,
  onCompanyApproval,
  onComplete,
  onBack
}) => {
  const [isRefining, setIsRefining] = useState(false);
  const handleRefineICP = () => {
    setIsRefining(true);
    // Simulate refining
    setTimeout(() => {
      setIsRefining(false);
    }, 2000);
  };
  const handleApprove = (companyName: string) => {
    onCompanyApproval(companyName, true);
  };
  const handleReject = (companyName: string) => {
    onCompanyApproval(companyName, false);
  };
  return <div className="p-8">
      <div className="flex items-start mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
          <span className="text-white font-bold">AI</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none max-w-[80%]">
          <p>
            Based on your ideal customer profile, I've found these companies
            that match your criteria. Please review and approve the ones you'd
            like to target.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Here are companies that match your ICP
        </h2>
        <p className="text-gray-500">
          Review these potential prospects and approve or reject them to help me
          understand your preferences better.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {companies.map(company => <div key={company.name} className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${approvedCompanies.includes(company.name) ? 'border-success shadow-sm' : rejectedCompanies.includes(company.name) ? 'border-gray-200 opacity-60' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">{company.name}</h3>
                <div className="flex space-x-1">
                  <button onClick={() => handleApprove(company.name)} className={`p-1 rounded-full ${approvedCompanies.includes(company.name) ? 'bg-success text-white' : 'text-gray-400 hover:text-success'}`} aria-label="Approve">
                    <CheckCircleIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleReject(company.name)} className={`p-1 rounded-full ${rejectedCompanies.includes(company.name) ? 'bg-gray-200 text-gray-500' : 'text-gray-400 hover:text-gray-500'}`} aria-label="Reject">
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Industry:</span>
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Size:</span>
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Location:</span>
                  <span>{company.location}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">
                    Why they fit:
                  </span>
                  <span className="text-xs">{company.fit}</span>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Summary</h3>
          <Button variant="outline" size="sm" onClick={handleRefineICP} disabled={isRefining} icon={isRefining ? <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCwIcon className="w-4 h-4 mr-2" />}>
            {isRefining ? 'Refining...' : 'Refine ICP'}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Approved companies</span>
              <span className="font-medium text-success">
                {approvedCompanies.length}
              </span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{
              width: `${approvedCompanies.length / companies.length * 100}%`
            }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Rejected companies</span>
              <span className="font-medium text-gray-500">
                {rejectedCompanies.length}
              </span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400" style={{
              width: `${rejectedCompanies.length / companies.length * 100}%`
            }}></div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          {approvedCompanies.length === 0 ? <p>Please approve at least one company to continue.</p> : <p>
              Based on your approvals, I'll find similar companies for your
              outreach campaigns.
            </p>}
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onComplete} disabled={approvedCompanies.length === 0}>
          Continue to Dashboard
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>;
};
export default ValidationStep;