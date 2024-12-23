// components/alerts/successAlert.js
import React from 'react';

const Success = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Alert content */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 animate-fade-in">
        <div className="flex items-center">
          {/* Success icon */}
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
            <svg 
              className="w-6 h-6 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          {/* Message */}
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;