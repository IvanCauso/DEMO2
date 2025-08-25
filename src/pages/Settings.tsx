import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ProfileSection from '../components/settings/ProfileSection';
import SubscriptionSection from '../components/settings/SubscriptionSection';
import { UserIcon, CreditCardIcon } from 'lucide-react';
const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription'>('profile');
  // Mock data that would normally come from API/context
  const [userProfile, setUserProfile] = useState({
    name: 'Jane Doe',
    email: 'janedoe@repairagent.co.uk',
    company: 'RepairAgent',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'repairagent.co.uk',
    profileImage: null
  });
  return <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button onClick={() => setActiveTab('profile')} className={`flex items-center px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button onClick={() => setActiveTab('subscription')} className={`flex items-center px-6 py-4 text-sm font-medium ${activeTab === 'subscription' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}>
                  <CreditCardIcon className="w-4 h-4 mr-2" />
                  Subscription
                </button>
              </div>
              <div className="p-6">
                {activeTab === 'profile' && <ProfileSection profile={userProfile} onProfileUpdate={updatedProfile => setUserProfile(updatedProfile)} />}
                {activeTab === 'subscription' && <SubscriptionSection />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default Settings;