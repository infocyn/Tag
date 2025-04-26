import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, change, isLoading, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-700',
    secondary: 'bg-secondary-50 text-secondary-700',
    accent: 'bg-accent-50 text-accent-700',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-700',
  };
  
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="animate-pulse flex space-x-4">
          <div className={`h-12 w-12 rounded-lg ${colorClasses.primary}`}></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-md h-full"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-bold text-gray-900">{value}</div>
              {change && (
                <div className={`flex items-baseline text-sm font-semibold ${
                  parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(change) >= 0 ? (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  )}
                  {Math.abs(parseFloat(change))}%
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;