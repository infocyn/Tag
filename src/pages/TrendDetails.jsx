import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { fetchTrendDetails } from '../api/trendsApi';
import { useTrendsStore } from '../stores/trendsStore';
import {
  HiArrowNarrowLeft,
  HiHashtag,
  HiHeart,
  HiOutlineHeart,
  HiChartBar,
  HiTrendingUp,
  HiUsers,
  HiOutlineDocumentDownload,
} from 'react-icons/hi';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const TrendDetails = () => {
  const { hashtag } = useParams();
  const { data, isLoading } = useQuery(['trendDetails', hashtag], () => fetchTrendDetails(hashtag));
  
  const { addToHistory, addToFavorites, removeFromFavorites, favorites } = useTrendsStore();
  
  const isFavorite = favorites.some(fav => fav.hashtag === `#${hashtag}`);
  
  useEffect(() => {
    if (hashtag) {
      addToHistory(`#${hashtag}`);
    }
  }, [hashtag, addToHistory]);
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(`#${hashtag}`);
    } else {
      addToFavorites(`#${hashtag}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md h-32"></div>
          <div className="bg-white p-6 rounded-xl shadow-md h-32"></div>
          <div className="bg-white p-6 rounded-xl shadow-md h-32"></div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 h-64"></div>
        <div className="bg-white p-6 rounded-xl shadow-md h-64"></div>
      </div>
    );
  }
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const PLATFORM_COLORS = {
    twitter: '#1DA1F2',
    instagram: '#E1306C',
    tiktok: '#000000',
  };
  
  const getPlatformLabel = (platform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };
  
  const ageDemographicsData = Object.entries(data?.demographics.age || {}).map(([age, value]) => ({
    name: age,
    value,
  }));
  
  const genderDemographicsData = Object.entries(data?.demographics.gender || {}).map(([gender, value]) => ({
    name: gender.charAt(0).toUpperCase() + gender.slice(1),
    value,
  }));
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-6">
          <Link to="/trends" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <HiArrowNarrowLeft className="h-5 w-5 mr-1" />
            Back to Trends
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HiHashtag className="h-8 w-8 text-primary-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">
                {hashtag}
              </h1>
            </div>
            <button
              onClick={handleFavoriteToggle}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                isFavorite 
                  ? 'bg-accent-50 text-accent-600 hover:bg-accent-100' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isFavorite ? (
                <>
                  <HiHeart className="h-5 w-5 mr-2" />
                  Favorited
                </>
              ) : (
                <>
                  <HiOutlineHeart className="h-5 w-5 mr-2" />
                  Add to Favorites
                </>
              )}
            </button>
          </div>
          
          <div className="flex flex-wrap items-center mt-2 text-gray-600">
            {Object.entries(data?.platforms || {}).map(([platform, exists]) => 
              exists && (
                <span 
                  key={platform}
                  className={`mr-3 inline-flex items-center text-sm font-medium`}
                  style={{ color: PLATFORM_COLORS[platform] }}
                >
                  {getPlatformLabel(platform)}
                </span>
              )
            )}
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary-50 text-primary-700">
                <HiChartBar className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat().format(data?.volume)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${
                parseFloat(data?.growth) >= 0 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                <HiTrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Growth (24h)</p>
                <p className={`text-2xl font-bold ${
                  parseFloat(data?.growth) >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {parseFloat(data?.growth) >= 0 ? '+' : ''}{data?.growth}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-accent-50 text-accent-700">
                <HiUsers className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Sentiment Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data?.sentiment.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Volume Trend Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Volume Trend (7 Days)</h2>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <HiOutlineDocumentDownload className="h-5 w-5 mr-1" />
              <span className="text-sm">Export</span>
            </button>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data?.history}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => {
                    return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                  formatter={(value) => [new Intl.NumberFormat().format(value), 'Volume']}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    });
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  name="Volume"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Age Demographics */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Age Demographics</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ageDemographicsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Gender Demographics */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDemographicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderDemographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Related Hashtags */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Hashtags</h2>
          <div className="flex flex-wrap gap-2">
            {data?.relatedHashtags.map((tag) => (
              <Link
                key={tag}
                to={`/trends/${tag.substring(1)}`}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-800 transition-colors"
              >
                <HiHashtag className="h-4 w-4 mr-1 text-primary-500" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrendDetails;