import React from 'react';

const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg 
        className="w-16 h-16 mb-4 text-gray-400" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path d="M8 10h.01M12 10h.01M16 10h.01M7 7h10M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h1m10 0a9 9 0 100 6H5a2 2 0 01-2-2v-6a2 2 0 012-2h14a2 2 0 012 2z"></path>
      </svg>
      <p className="text-lg text-gray-600">Hozircha bu yerda hech qanday xabarlar yo'q.</p>
    </div>
  );
};

export default ChatEmptyState;
