import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <svg 
          className="w-32 h-32 text-primary-500 mb-6 animate-float"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary px-6 py-3 text-lg"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;