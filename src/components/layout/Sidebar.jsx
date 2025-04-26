import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiX, 
  HiHome, 
  HiHashtag, 
  HiCog, 
  HiChartBar,
  HiBookmark
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import Logo from './Logo';

const navItems = [
  { name: 'Dashboard', icon: HiHome, path: '/' },
  { name: 'Trends Explorer', icon: HiHashtag, path: '/trends' },
  { name: 'Analytics', icon: HiChartBar, path: '/analytics' },
  { name: 'Saved Hashtags', icon: HiBookmark, path: '/saved' },
  { name: 'Settings', icon: HiCog, path: '/settings' },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 flex flex-col z-30 w-72 max-w-xs bg-primary-900 transform transition duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-primary-800">
          <Logo />
          <button
            className="h-10 w-10 flex items-center justify-center rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 h-0 overflow-y-auto">
          <nav className="mt-5 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-3 text-base font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary-800 text-white'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon 
                  className={`mr-4 h-6 w-6 ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-primary-300 group-hover:text-white'
                  }`} 
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-900">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-800">
              <Logo />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                        location.pathname === item.path
                          ? 'bg-primary-800 text-white'
                          : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                      }`}
                    >
                      <item.icon 
                        className={`mr-3 h-6 w-6 ${
                          location.pathname === item.path
                            ? 'text-white'
                            : 'text-primary-300 group-hover:text-white'
                        }`} 
                      />
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;