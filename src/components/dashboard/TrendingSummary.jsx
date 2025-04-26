import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiArrowUp, 
  HiArrowDown,
  HiExternalLink,
  HiHashtag
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const TrendingSummary = ({ platform, trends, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {Array(5).fill().map((_, i) => (
              <div key={i} className="flex justify-between animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  const getPlatformTitle = () => {
    switch (platform) {
      case 'twitter': return 'Twitter';
      case 'instagram': return 'Instagram';
      case 'tiktok': return 'TikTok';
      default: return platform;
    }
  };
  
  const getPlatformColor = () => {
    switch (platform) {
      case 'twitter': return 'text-blue-500';
      case 'instagram': return 'text-pink-500';
      case 'tiktok': return 'text-black';
      default: return 'text-gray-700';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden h-full"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className={`font-semibold ${getPlatformColor()}`}>
          {getPlatformTitle()} Trending
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {trends.slice(0, 5).map((trend, index) => (
            <Link 
              key={trend.hashtag} 
              to={`/trends/${trend.hashtag.substring(1)}`}
              className="flex justify-between items-center hover:bg-gray-50 -mx-3 px-3 py-1.5 rounded-md"
            >
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-2">{index + 1}</span>
                <div className="flex items-center">
                  <HiHashtag className={`h-4 w-4 mr-1 ${getPlatformColor()}`} />
                  <span className="font-medium line-clamp-1">
                    {trend.hashtag}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                {trend.change > 0 ? (
                  <span className="text-green-500 flex items-center text-sm">
                    <HiArrowUp className="h-4 w-4 mr-1" />
                    {trend.change}%
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center text-sm">
                    <HiArrowDown className="h-4 w-4 mr-1" />
                    {Math.abs(trend.change)}%
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Link
            to="/trends"
            className="text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
          >
            View all {getPlatformTitle()} trends
            <HiExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingSummary;