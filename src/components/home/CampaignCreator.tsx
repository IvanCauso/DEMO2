import React, { useEffect, useState, useRef } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import Button from '../ui/Button';
const placeholders = ['Find SaaS founders who need better onboarding and book demos', 'Target healthcare startups struggling with compliance and schedule calls', 'Reach e-commerce brands spending >$10k/month on ads and book strategy sessions', 'Find Series A companies hiring engineers and schedule recruiting calls', 'Target marketing agencies with 10+ clients and book partnership meetings'];
const suggestionButtons = ['Book demos', 'Schedule sales calls', 'Generate leads', 'Find investors', 'Build partnerships'];
const CampaignCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Handle the auto-typing effect
  useEffect(() => {
    if (!isTyping) return;
    const currentText = placeholders[placeholderIndex];
    if (characterIndex < currentText.length) {
      // Still typing the current placeholder
      const timeout = setTimeout(() => {
        setCurrentPlaceholder(currentText.substring(0, characterIndex + 1));
        setCharacterIndex(characterIndex + 1);
      }, 50); // Speed of typing
      return () => clearTimeout(timeout);
    } else {
      // Finished typing, pause before erasing
      const timeout = setTimeout(() => {
        setCharacterIndex(0);
        setCurrentPlaceholder('');
        setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
      }, 3000); // Wait time before switching to next placeholder
      return () => clearTimeout(timeout);
    }
  }, [characterIndex, isTyping, placeholderIndex]);
  const handleInputFocus = () => {
    setIsTyping(false);
    setCurrentPlaceholder('');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would navigate or show a success message
    }, 1500);
  };
  return <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea ref={textareaRef} className="w-full px-5 py-4 bg-white text-secondary-dark placeholder-secondary border-0 focus:ring-2 focus:ring-primary focus:outline-none resize-none rounded-md" placeholder={isTyping ? `Ask Causo to ${currentPlaceholder}` : 'Ask Causo to...'} value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} rows={1} style={{
              minHeight: '60px'
            }} />
            </div>
            <div className="flex items-center justify-end mt-4">
              <Button type="submit" className="rounded-md px-6 py-3" disabled={isLoading} iconPosition="right" icon={isLoading ? null : <ArrowRightIcon className="w-4 h-4" />}>
                {isLoading ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span> : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* Suggestion buttons moved below the component */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {suggestionButtons.map((suggestion, index) => <button key={index} type="button" onClick={() => handleSuggestionClick(suggestion)} className="px-4 py-2 text-sm bg-secondary-light hover:bg-gray-200 text-secondary-dark rounded-full transition-colors duration-200">
            {suggestion}
          </button>)}
      </div>
    </div>;
};
export default CampaignCreator;