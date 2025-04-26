import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTrendsStore } from '../stores/trendsStore';
import { useAuthStore } from '../stores/authStore';
import { HiTrash, HiOutlineBell, HiOutlineUser, HiOutlineGlobe, HiHashtag } from 'react-icons/hi';

const Settings = () => {
  const { history, clearHistory, favorites, removeFromFavorites } = useTrendsStore();
  const { user, updateUser } = useAuthStore();
  
  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notificationsEnabled: true,
    dailyReportsEnabled: true,
    weeklyReportsEnabled: true,
    language: 'en',
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formState);
    alert('Settings saved successfully!');
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <HiOutlineUser className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    User Settings
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <HiOutlineBell className="h-6 w-6 text-primary-500 mr-2" />
                      <h3 className="text-md font-semibold text-gray-900">
                        Notification Settings
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notificationsEnabled"
                          name="notificationsEnabled"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formState.notificationsEnabled}
                          onChange={handleChange}
                        />
                        <label htmlFor="notificationsEnabled" className="ml-2 block text-sm text-gray-700">
                          Enable push notifications
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="dailyReportsEnabled"
                          name="dailyReportsEnabled"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formState.dailyReportsEnabled}
                          onChange={handleChange}
                        />
                        <label htmlFor="dailyReportsEnabled" className="ml-2 block text-sm text-gray-700">
                          Receive daily trend reports
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="weeklyReportsEnabled"
                          name="weeklyReportsEnabled"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formState.weeklyReportsEnabled}
                          onChange={handleChange}
                        />
                        <label htmlFor="weeklyReportsEnabled" className="ml-2 block text-sm text-gray-700">
                          Receive weekly trend insights
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <HiOutlineGlobe className="h-6 w-6 text-primary-500 mr-2" />
                      <h3 className="text-md font-semibold text-gray-900">
                        Language & Region
                      </h3>
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        className="input"
                        value={formState.language}
                        onChange={handleChange}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorites */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <HiHashtag className="h-5 w-5 text-primary-500 mr-2" />
                  <h2 className="text-md font-semibold text-gray-900">
                    Favorite Hashtags
                  </h2>
                </div>
              </div>
              
              <div className="p-4">
                {favorites.length === 0 ? (
                  <p className="text-sm text-gray-500">No favorite hashtags yet.</p>
                ) : (
                  <div className="space-y-2">
                    {favorites.map((fav) => (
                      <div 
                        key={fav.hashtag} 
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center">
                          <HiHashtag className="h-4 w-4 text-primary-500 mr-1" />
                          <span className="text-sm font-medium">{fav.hashtag}</span>
                        </div>
                        <button
                          onClick={() => removeFromFavorites(fav.hashtag)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* History */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary-500 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <h2 className="text-md font-semibold text-gray-900">
                      Recent History
                    </h2>
                  </div>
                  
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {history.length === 0 ? (
                  <p className="text-sm text-gray-500">No recent history.</p>
                ) : (
                  <div className="space-y-2">
                    {history.slice(0, 5).map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center py-2"
                      >
                        <HiHashtag className="h-4 w-4 text-primary-500 mr-1" />
                        <span className="text-sm">{item.hashtag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;