import React from 'react';
import { useQuery } from 'react-query';
import { HiHashtag, HiTrendingUp, HiEye, HiHeart } from 'react-icons/hi';
import { fetchAllTrends } from '../api/trendsApi';
import TrendingSummary from '../components/dashboard/TrendingSummary';
import StatsCard from '../components/dashboard/StatsCard';
import TrendsChart from '../components/dashboard/TrendsChart';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { data, isLoading } = useQuery('allTrends', fetchAllTrends);
  
  // Generate mock data for chart
  const chartData = React.useMemo(() => {
    const dates = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      dates.push({
        date: date.toISOString().split('T')[0],
        twitter: Math.floor(Math.random() * 50000) + 10000,
        instagram: Math.floor(Math.random() * 80000) + 20000,
        tiktok: Math.floor(Math.random() * 120000) + 30000,
      });
    }
    
    return dates;
  }, []);
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Get real-time insights into trending hashtags across social platforms
          </p>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total Active Hashtags" 
            value={isLoading ? "-" : "4,328"}
            icon={<HiHashtag className="h-6 w-6" />}
            change="+12.5"
            isLoading={isLoading}
            color="primary"
          />
          <StatsCard 
            title="Trending Now" 
            value={isLoading ? "-" : "286"}
            icon={<HiTrendingUp className="h-6 w-6" />}
            change="+8.1"
            isLoading={isLoading}
            color="accent"
          />
          <StatsCard 
            title="Total Impressions" 
            value={isLoading ? "-" : "24.5M"}
            icon={<HiEye className="h-6 w-6" />}
            change="+18.2"
            isLoading={isLoading}
            color="secondary"
          />
          <StatsCard 
            title="Engagement Rate" 
            value={isLoading ? "-" : "3.8%"}
            icon={<HiHeart className="h-6 w-6" />}
            change="-1.4"
            isLoading={isLoading}
            color="success"
          />
        </div>
        
        {/* Chart */}
        <div className="mb-6">
          <TrendsChart data={chartData} isLoading={isLoading} />
        </div>
        
        {/* Platform trends summaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TrendingSummary 
            platform="twitter" 
            trends={data?.twitter || []} 
            isLoading={isLoading} 
          />
          <TrendingSummary 
            platform="instagram" 
            trends={data?.instagram || []} 
            isLoading={isLoading} 
          />
          <TrendingSummary 
            platform="tiktok" 
            trends={data?.tiktok || []} 
            isLoading={isLoading} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;