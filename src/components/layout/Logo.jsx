import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Link to="/">
      <motion.div 
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center rounded-md bg-accent-500 h-8 w-8 flex-shrink-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-2 text-white text-xl font-bold">InfoCyn</div>
      </motion.div>
    </Link>
  );
};

export default Logo;