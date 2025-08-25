import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';
interface HeaderProps {
  isLanding?: boolean;
}
const Header: React.FC<HeaderProps> = ({
  isLanding = false
}) => {
  if (isLanding) {
    return <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between fixed w-full z-10">
        <div className="flex items-center">
          <Link to="/landing" className="text-2xl font-bold text-primary">
            Causo
          </Link>
          <nav className="hidden md:flex ml-10">
            <Link to="/landing" className="mx-3 text-secondary hover:text-secondary-dark">
              Product
            </Link>
            <Link to="/landing" className="mx-3 text-secondary hover:text-secondary-dark">
              Pricing
            </Link>
            <Link to="/landing" className="mx-3 text-secondary hover:text-secondary-dark">
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link to="/dashboard" className="text-secondary hover:text-secondary-dark mr-6">
            Sign In
          </Link>
          <Link to="/" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200">
            Start Getting Replies
          </Link>
        </div>
      </header>;
  }
  return <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-primary">
          Causo
        </Link>
        <div className="ml-10 relative hidden md:block"></div>
      </div>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <BellIcon className="w-6 h-6 text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="ml-6 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <span className="ml-3 hidden md:inline text-secondary-dark font-medium">
            John Doe
          </span>
          <ChevronDownIcon className="w-4 h-4 text-secondary ml-2" />
        </div>
      </div>
    </header>;
};
export default Header;