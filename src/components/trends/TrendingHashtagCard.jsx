import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowUp, HiArrowDown, HiHashtag } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useTrendsStore } from '../../stores/trendsStore';

const TrendingHashtagCard = ({ trend, platform }) => {
  const { addToHistory, addToFavorites, favorites } = useTrendsStore();
  
  const isFavorite = favorites.some(fav => fav.hashtag === trend.hashtag);
  
  const handleClick = () => {
    addToHistory(trend.hashtag);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToFavorites(trend.hashtag);
  };
  
  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };
  
  const getPlatformColor = () => {
    switch (platform) {
      case 'twitter': return 'bg-blue-100 text-blue-800';
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'tiktok': return 'bg-black text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={`/trends/${trend.hashtag.substring(1)}`}
        className="card flex flex-col h-full"
        onClick={handleClick}
      >
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <HiHashtag className="h-5 w-5 text-primary-500 mr-1" />
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {trend.hashtag}
                </h3>
              </div>
              
              <div className="flex items-center mt-1 space-x-2">
                <span className="badge badge-success">
                  {new Intl.NumberFormat().format(trend.volume)} posts
                </span>
                <span className={`flex items-center ${getChangeColor(trend.change)}`}>
                  {trend.change > 0 ? (
                    <HiArrowUp className="h-4 w-4 mr-1" />
                  ) : trend.change < 0 ? (
                    <HiArrowDown className="h-4 w-4 mr-1" />
                  ) : null}
                  {Math.abs(trend.change)}%
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleFavoriteClick}
              className={`h-8 w-8 flex items-center justify-center rounded-full ${
                isFavorite 
                  ? 'text-accent-500 bg-accent-50' 
                  : 'text-gray-400 hover:text-accent-500 hover:bg-accent-50'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={isFavorite ? "0" : "1.5"}
              >
                <path 
                  fillRule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
          
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500" 
              style={{ width: `${trend.sentiment}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Sentiment: {trend.sentiment.toFixed(1)}%
          </div>
        </div>
        
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
          <span className={`badge ${getPlatformColor()}`}>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default TrendingHashtagCard;