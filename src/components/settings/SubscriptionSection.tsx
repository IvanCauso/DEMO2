import React, { useState } from 'react';
import Button from '../ui/Button';
import { CheckIcon, AlertTriangleIcon, ArrowRightIcon, CreditCardIcon, XIcon } from 'lucide-react';
const SubscriptionSection = () => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const plans = [{
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Basic features for solo founders just getting started',
    features: ['1 outreach campaign', '50 prospects per month', 'Basic AI assistance', 'Email templates'],
    limitations: ['No advanced targeting', 'Limited analytics', 'No custom sequences'],
    cta: 'Current Plan',
    disabled: true
  }, {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    period: 'per month',
    description: 'Everything you need for serious outreach campaigns',
    features: ['Unlimited campaigns', '500 prospects per month', 'Advanced AI targeting', 'Custom email sequences', 'Full analytics dashboard', 'Priority support'],
    limitations: [],
    cta: 'Upgrade',
    disabled: false,
    highlight: true
  }, {
    id: 'business',
    name: 'Business',
    price: '$99',
    period: 'per month',
    description: 'For consultants with advanced needs and multiple clients',
    features: ['Everything in Pro', 'Unlimited prospects', 'Multi-user accounts', 'Client management', 'White-label reports', 'API access', 'Dedicated account manager'],
    limitations: [],
    cta: 'Upgrade',
    disabled: false
  }];
  // Simulate upgrading plan
  const handleUpgrade = (planId: string) => {
    setShowUpgradeModal(true);
  };
  return <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Subscription Management
        </h2>
        <p className="text-gray-500">
          Manage your subscription and billing information
        </p>
      </div>
      {currentPlan === 'free' && <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
          <div className="bg-primary bg-opacity-10 rounded-full p-2 mr-3 flex-shrink-0">
            <AlertTriangleIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              You're on the Free Plan
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Upgrade to unlock advanced features and increase your outreach
              capacity.
            </p>
            <Button size="sm" onClick={() => handleUpgrade('pro')}>
              Upgrade Now
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>}
      {/* Current Subscription Info */}
      <div className="bg-gray-50 rounded-lg p-5 mb-8 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Current Subscription</h3>
          {currentPlan !== 'free' && <Button variant="outline" size="sm">
              Manage Billing
            </Button>}
        </div>
        <div className="flex items-center mb-4">
          <div className={`w-3 h-3 rounded-full mr-2 ${currentPlan === 'free' ? 'bg-gray-400' : 'bg-success'}`}></div>
          <span className="font-medium">
            {plans.find(p => p.id === currentPlan)?.name} Plan
          </span>
          {currentPlan !== 'free' && <span className="ml-2 text-sm text-gray-500">
              - Renews on November 15, 2023
            </span>}
        </div>
        {currentPlan !== 'free' && <div className="text-sm text-gray-500 mb-3">
            <div className="flex items-center mb-1">
              <CreditCardIcon className="w-4 h-4 mr-2 text-gray-400" />
              <span>Visa ending in 4242</span>
            </div>
          </div>}
        <div className="text-sm">
          <span className="text-gray-500">
            {currentPlan === 'free' ? 'Usage: 10/50 prospects this month' : 'Usage: 120/500 prospects this month'}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className={`${currentPlan === 'free' ? 'bg-gray-400' : 'bg-primary'} h-2 rounded-full`} style={{
            width: currentPlan === 'free' ? '20%' : '24%'
          }}></div>
          </div>
        </div>
      </div>
      {/* Available Plans */}
      <h3 className="font-medium text-gray-900 mb-4">Available Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => <div key={plan.id} className={`border rounded-xl p-5 relative ${plan.highlight ? 'border-primary shadow-md' : 'border-gray-200'}`}>
            {plan.highlight && <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                RECOMMENDED
              </div>}
            <h4 className="font-semibold text-lg mb-1">{plan.name}</h4>
            <div className="flex items-baseline mb-3">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-1">/{plan.period}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <ul className="space-y-2 mb-5">
              {plan.features.map((feature, i) => <li key={i} className="flex items-start text-sm">
                  <CheckIcon className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>)}
              {plan.limitations.map((limitation, i) => <li key={i} className="flex items-start text-sm text-gray-500">
                  <XIcon className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{limitation}</span>
                </li>)}
            </ul>
            <Button variant={plan.id === currentPlan ? 'secondary' : 'primary'} fullWidth disabled={plan.disabled || plan.id === currentPlan} onClick={() => handleUpgrade(plan.id)}>
              {plan.id === currentPlan ? 'Current Plan' : plan.cta}
            </Button>
          </div>)}
      </div>
      {/* Cancellation Section */}
      {currentPlan !== 'free' && <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">
            Cancel Subscription
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            If you cancel, your plan will remain active until the end of your
            current billing period.
          </p>
          <Button variant="outline" size="sm">
            Cancel Subscription
          </Button>
        </div>}
    </div>;
};
export default SubscriptionSection;