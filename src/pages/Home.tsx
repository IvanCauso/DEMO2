import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircleIcon, CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import CampaignCreator from '../components/home/CampaignCreator';
const Home = () => {
  return <div className="min-h-screen bg-white">
      <Header isLanding={true} />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Get replies, not unsubscribes.
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Tell us what you sell. We'll find prospects who actually want it
                and write emails that get responses.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                While others blast 1,000 emails and watch their sender
                reputation tank, Causo finds 50 prospects most likely to buy —
                89% open rates, 23% reply rates.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/auth">
                  <Button size="lg">Start Getting Replies</Button>
                </Link>
                <Button variant="outline" size="lg" icon={<PlayCircleIcon className="w-5 h-5" />}>
                  Watch 2-min Demo
                </Button>
              </div>
            </div>
            {/* Dashboard image */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Causo Dashboard" className="w-full h-auto" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary rounded-full opacity-10 z-0"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-success rounded-full opacity-10 z-0"></div>
            </div>
          </div>
          {/* Campaign Creator component */}
          <div className="mt-16">
            <CampaignCreator />
          </div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 font-medium mb-8">
            Join 2,500+ founders closing more deals
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {/* LemonSqueezy */}
            <div className="h-8 flex items-center justify-center">
              <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M18.9 5.4C18.2 4.7 17.3 4.3 16.3 4.3C15.3 4.3 14.4 4.7 13.7 5.4C13 6.1 12.6 7 12.6 8C12.6 9 13 9.9 13.7 10.6C14.4 11.3 15.3 11.7 16.3 11.7C17.3 11.7 18.2 11.3 18.9 10.6C19.6 9.9 20 9 20 8C20 7 19.6 6.1 18.9 5.4Z" fill="#FFC233" />
                <path d="M23.6 0H9C4 0 0 4 0 9V19C0 24 4 28 9 28H23.6C28.6 28 32.6 24 32.6 19V9C32.6 4 28.6 0 23.6 0ZM25.1 17.5C24.9 17.9 24.6 18.2 24.2 18.4L8.6 26.3C8.5 26.4 8.3 26.4 8.2 26.4C8 26.4 7.8 26.3 7.6 26.2C7.3 25.9 7.1 25.5 7.1 25.1V9.2C7.1 8.8 7.3 8.4 7.6 8.1C7.9 7.8 8.3 7.7 8.7 7.8L24.3 15.7C24.7 15.9 25 16.2 25.2 16.6C25.3 16.9 25.3 17.2 25.1 17.5Z" fill="#FFC233" />
              </svg>
            </div>
            {/* Ghost */}
            <div className="h-8 flex items-center justify-center">
              <svg width="80" height="28" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M14 0C6.3 0 0 6.3 0 14C0 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM22.7 9.9H19.8C19.5 8.7 19.1 7.5 18.6 6.4C20.4 7.3 21.8 8.5 22.7 9.9ZM14 2.9C14.8 4.1 15.5 5.4 16 6.9H12C12.5 5.4 13.2 4.1 14 2.9Z" fill="#738A94" />
              </svg>
            </div>
            {/* Cal.com */}
            <div className="h-8 flex items-center justify-center">
              <svg width="100" height="28" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M14 0C6.3 0 0 6.3 0 14C0 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM14 25.7C7.6 25.7 2.3 20.4 2.3 14C2.3 7.6 7.6 2.3 14 2.3C20.4 2.3 25.7 7.6 25.7 14C25.7 20.4 20.4 25.7 14 25.7Z" fill="#100F0F" />
                <path d="M14 4.7C8.9 4.7 4.7 8.9 4.7 14C4.7 19.1 8.9 23.3 14 23.3C19.1 23.3 23.3 19.1 23.3 14C23.3 8.9 19.1 4.7 14 4.7ZM14 21C10.2 21 7 17.8 7 14C7 10.2 10.2 7 14 7C17.8 7 21 10.2 21 14C21 17.8 17.8 21 14 21Z" fill="#100F0F" />
              </svg>
            </div>
            {/* Framer */}
            <div className="h-8 flex items-center justify-center">
              <svg width="90" height="28" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M14 0H0V9.33333H14V0Z" fill="#0055FF" />
                <path d="M0 9.33333H14V18.6667H7L0 9.33333Z" fill="#0055FF" />
                <path d="M0 18.6667H7V28L0 18.6667Z" fill="#0055FF" />
              </svg>
            </div>
            {/* Gumroad */}
            <div className="h-8 flex items-center justify-center">
              <svg width="100" height="28" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M14 0C6.3 0 0 6.3 0 14C0 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM14 4.7C8.9 4.7 4.7 8.9 4.7 14C4.7 19.1 8.9 23.3 14 23.3C19.1 23.3 23.3 19.1 23.3 14C23.3 8.9 19.1 4.7 14 4.7Z" fill="#FF90E8" />
                <path d="M14 9.3C11.5 9.3 9.3 11.5 9.3 14C9.3 16.5 11.5 18.7 14 18.7C16.5 18.7 18.7 16.5 18.7 14C18.7 11.5 16.5 9.3 14 9.3Z" fill="#FF90E8" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 px-6 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why founders choose Causo
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Stop wasting time on cold outreach that doesn't work. Causo uses
              AI to find the right prospects and craft personalized messages
              that get responses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI-powered prospect finding
              </h3>
              <p className="text-gray-600">
                Our AI analyzes millions of companies to find the ones most
                likely to need your solution right now.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Personalized email sequences
              </h3>
              <p className="text-gray-600">
                Get custom email sequences that reference your prospect's
                specific pain points and recent company news.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart campaign optimization
              </h3>
              <p className="text-gray-600">
                Our system continuously learns from what works, automatically
                improving your campaigns over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary bg-opacity-5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to get more results with less effort?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of founders who've switched to smarter outreach with
            Causo.
          </p>
          <div className="flex justify-center">
            <Link to="/auth">
              <Button size="lg" icon={<ArrowRightIcon className="w-5 h-5 ml-2" />} iconPosition="right">
                Start Getting Replies
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};
export default Home;