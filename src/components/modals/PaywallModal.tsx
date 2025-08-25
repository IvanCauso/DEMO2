import React, { useEffect, useRef } from 'react';
import { X as CloseIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface PlanProps {
  name: string;
  price: string;
  credits: number;
  reach: string;
  isPopular?: boolean;
}
const plans: PlanProps[] = [{
  name: 'Starter',
  price: '$79',
  credits: 100,
  reach: 'Reach 50-100 contacts'
}, {
  name: 'Growth',
  price: '$179',
  credits: 200,
  reach: 'Reach 100-200 contacts',
  isPopular: true
}, {
  name: 'Pro',
  price: '$299',
  credits: 500,
  reach: 'Reach 200+ contacts'
}];
const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  // Handle clicking outside to close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Handle escape key to close
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  // Handle plan selection
  const handlePlanSelect = (plan: PlanProps) => {
    // In a real app, you would save the selected plan
    console.log(`Selected plan: ${plan.name}`);
    onClose();
    navigate('/ai-campaign-builder');
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity animate-fade-in">
      <div ref={modalRef} className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl mx-4 md:mx-auto" style={{
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    }}>
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Close">
          <CloseIcon className="w-5 h-5 text-gray-500" />
        </button>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Choose Your Plan
          </h2>
        </div>
        {/* Content */}
        <div className="p-6">
          {/* Credit Explanation Box */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              How Credits Work
            </h3>
            <p className="text-gray-600 text-sm">
              1 credit = sending a complete 3-email sequence to one approved
              contact. Credits reset monthly and unused add-on credits remain
              valid for 90 days.
            </p>
          </div>
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {plans.map(plan => <div key={plan.name} className={`relative cursor-pointer rounded-xl p-5 border-2 transition-all duration-200 hover:shadow-lg hover:border-primary ${plan.isPopular ? 'border-primary bg-gradient-to-b from-[#fff5f3] to-white' : 'border-gray-200 hover:border-primary'}`} style={{
            boxShadow: plan.isPopular ? '0 4px 12px rgba(255, 87, 34, 0.1)' : '',
            transform: 'scale(1)'
          }} onClick={() => handlePlanSelect(plan)} onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 87, 34, 0.1)';
          }} onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = plan.isPopular ? '0 4px 12px rgba(255, 87, 34, 0.1)' : '';
          }}>
                {/* Popular Badge */}
                {plan.isPopular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>}
                {/* Plan Content */}
                <div className={`text-center ${plan.isPopular ? 'pt-2' : ''}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    {plan.credits} credits (reset monthly)
                  </p>
                  <p className="text-gray-700 text-sm">{plan.reach}</p>
                </div>
              </div>)}
          </div>
          {/* Call-to-Action Section */}
          <div className="text-center">
            <button onClick={() => handlePlanSelect(plans[1])} // Default to Growth plan
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start with Growth Plan
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default PaywallModal;