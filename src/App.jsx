import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TrendsExplorer from './pages/TrendsExplorer';
import TrendDetails from './pages/TrendDetails';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trends" element={<TrendsExplorer />} />
          <Route path="trends/:hashtag" element={<TrendDetails />} />
          <Route 
            path="settings" 
            element={
              isAuthenticated ? <Settings /> : <Navigate to="/" replace />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;