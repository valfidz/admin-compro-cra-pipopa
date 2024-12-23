import React, { useEffect, useState } from "react";

const Failed = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Show the popup when the component mounts
    const timer = setTimeout(() => setVisible(false), 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Popup Container */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md transform transition-all duration-300 ease-in-out 
          ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3 text-red-600 font-semibold">Error</span>
          </div>
          <button
            onClick={() => setVisible(false)} // Close button
            className="text-gray-500 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <p className="mt-4 text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Failed;
