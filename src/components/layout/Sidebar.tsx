import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboardIcon, SendIcon, UsersIcon, BarChartIcon, SettingsIcon } from 'lucide-react';
const Sidebar = () => {
  const navItems = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboardIcon className="w-5 h-5" />
  }, {
    name: 'Campaigns',
    path: '/campaigns',
    icon: <SendIcon className="w-5 h-5" />
  }, {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChartIcon className="w-5 h-5" />
  }, {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon className="w-5 h-5" />
  }];
  return <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <span className="text-sm font-medium text-secondary">MENU</span>
      </div>
      <nav className="flex-1">
        {navItems.map(item => <NavLink key={item.name} to={item.path} className={({
        isActive
      }) => `flex items-center py-3 px-6 ${isActive ? 'bg-primary bg-opacity-10 text-primary border-r-4 border-primary' : 'text-secondary hover:bg-gray-50'}`}>
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>)}
      </nav>
      <div className="p-6 border-t border-gray-200">
        <div className="bg-secondary-light rounded-lg p-4">
          <p className="text-sm font-medium text-secondary-dark">Need help?</p>
          <p className="text-xs text-secondary mt-1">
            Contact our support team
          </p>
          <button className="mt-3 text-primary text-sm font-medium">
            Get Support
          </button>
        </div>
      </div>
    </aside>;
};
export default Sidebar;