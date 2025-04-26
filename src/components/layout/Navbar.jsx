import React from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt2, HiBell, HiSearch, HiOutlineUser } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';

const Navbar = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  
  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
      <button
        type="button"
        className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <HiMenuAlt2 className="h-6 w-6" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <div className="max-w-lg w-full lg:max-w-xs relative">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search hashtags"
                type="search"
              />
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notification button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className="sr-only">View notifications</span>
            <HiBell className="h-6 w-6" />
          </motion.button>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {user?.name || 'User'}
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </motion.div>
                <button 
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/settings"
                className="flex items-center text-gray-500 hover:text-gray-900"
              >
                <HiOutlineUser className="h-6 w-6 mr-1" />
                <span className="text-sm font-medium hidden md:block">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;