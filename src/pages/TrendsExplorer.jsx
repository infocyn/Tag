import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { HiFilter, HiSearch } from 'react-icons/hi';
import { fetchAllTrends } from '../api/trendsApi';
import PlatformTrends from '../components/trends/PlatformTrends';

const TrendsExplorer = () => {
  const { data, isLoading } = useQuery('allTrends', fetchAllTrends);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Trends Explorer</h1>
          <p className="mt-1 text-gray-600">
            Discover and analyze trending hashtags across all platforms
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search hashtags..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <HiFilter className="h-5 w-5 text-gray-500" />
              <select
                className="input"
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Platform trends */}
        {(filterPlatform === 'all' || filterPlatform === 'twitter') && (
          <PlatformTrends 
            platform="twitter" 
            trends={data?.twitter || []} 
            isLoading={isLoading}
          />
        )}
        
        {(filterPlatform === 'all' || filterPlatform === 'instagram') && (
          <PlatformTrends 
            platform="instagram" 
            trends={data?.instagram || []} 
            isLoading={isLoading}
          />
        )}
        
        {(filterPlatform === 'all' || filterPlatform === 'tiktok') && (
          <PlatformTrends 
            platform="tiktok" 
            trends={data?.tiktok || []} 
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TrendsExplorer;