import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import Button from '../components/ui/Button';
const Auth = () => {
  const [email, setEmail] = useState('jane@repairagent.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('Jane Doe');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    navigate('/ai-onboarding');
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <img src="/Group_1.svg" alt="Causo Logo" className="h-16" />
          </div>
          <p className="text-gray-500 text-sm mb-4">Clickable Demo</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-500 mt-2">
            Start your journey to better sales outreach
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter your full name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Create a password" required />
            </div>
            <Button type="submit" fullWidth>
              Create Account
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-1">Want to learn more about Causo?</p>
          <a href="https://www.causo.ai" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
            Visit our website and join the waitlist
          </a>
        </div>
      </div>
    </div>;
};
export default Auth;