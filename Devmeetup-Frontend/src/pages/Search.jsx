// Search.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const Icons = {
    Search: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  };

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    setQuery('');
    navigate(-1); // go back to previous page
  };

  return (
    <div className="pt-4 px-4 min-h-screen bg-gray-50">
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icons.Search />
          </div>
            <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-gray-100/80 border border-black/15 rounded-4xl py-2.5 pl-12 pr-4 text-[15px] focus:outline-none focus:border-amber-400 focus:bg-gray-200/50 transition-all placeholder:text-gray-500 font-medium"
            />  
        </div>

        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <span className="text-xl font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span>
        </button>
      </div>

      {/* Optional: show search results */}
      {query && (
        <div className="mt-4">
          <p className="text-gray-500 text-sm">
            Searching for: <strong>{query}</strong>
          </p>
          {/* Map over your results here */}
        </div>
      )}
    </div>
  );
};

export default Search;