import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 font-['Satoshi']">
      <div className="flex items-center justify-between h-20 px-4 md:px-6  gap-2">
        
        {/* Left: Menu & Search */}
        <div className="flex items-center flex-1 gap-2 md:gap-6">
          <button className="p-2 text-black transition-colors hover:bg-gray-100 cursor-pointer rounded-xl shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar - Adjusted for Mobile */}
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 md:pl-4 pointer-events-none">
              <svg className="w-4 h-4 md:w-5 h-5 text-gray-400 group-focus-within:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full py-2.5 md:py-3 pl-9 md:pl-11 pr-4 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 transition-all placeholder:text-gray-400"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Filter Button - Icon only on mobile */}
          <button className="flex items-center gap-2 px-3 md:px-5 cursor-pointer py-2.5 text-sm font-bold text-black border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden md:inline">Filter</span>
          </button>

          {/* Notifications */}
          <div className="relative p-2 text-black transition-colors border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-xl shrink-0">
            <svg className="w-5 md:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 border-2 border-white rounded-full"></span>
          </div>

          {/* Create Button - "Create" text hidden on small mobile */}
          <Link to="/events/create" className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 cursor-pointer font-bold text-black transition-all bg-amber-400 shadow-lg shadow-amber-400/20 rounded-2xl hover:bg-amber-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Create</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;