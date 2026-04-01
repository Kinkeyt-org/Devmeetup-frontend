import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ADDED: useNavigate
import { motion, AnimatePresence } from 'framer-motion';
// ADDED: Import your logout function (adjust the path as needed for your folder structure)
import { logout } from '../api/auth'; 

// 1. EXTRACT ICONS: Keeps the main component incredibly clean and readable.
const Icons = {
  Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Bell: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  Profile: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Ticket: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" /></svg>,
  Settings: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Sun: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 4.636M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>,
  Moon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>,
  LogOut: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
};

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // ADDED: Hook for redirecting

  // 2. ROBUST DATA HANDLING: Fallbacks for empty auth states
  const user = { 
    name: "", 
    email: "",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
  };
  
  const displayName = user.name || "Guest User";
  const userInitial = displayName.charAt(0).toUpperCase(); 

  const profileActions = [
    { name: 'My Profile', path: '/profile', icon: <Icons.Profile /> },
    { name: 'My Tickets', path: '/my-tickets', icon: <Icons.Ticket /> },
    { name: 'Settings', path: '/dashboard', icon: <Icons.Settings /> },
  ];

  // ADDED: Logout Handler
  const handleLogout = async () => {
    try {
      await logout(); // Calls your API and clears localStorage
      setIsProfileOpen(false); // Close the dropdown
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the API call fails, your auth.js ensures the token is cleared locally.
      // We still want to redirect them away from protected areas.
      setIsProfileOpen(false);
      navigate('/login');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 font-['Satoshi']">
      <div className="flex items-center justify-between h-20 px-4 md:px-8 gap-4">
        
        {/* MOBILE SEARCH OVERLAY */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 z-60 bg-white px-4 flex items-center gap-4 sm:hidden"
            >
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500">
                  <Icons.Search />
                </div>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search events..."
                  className="w-full py-3.5 pl-12 pr-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-400 outline-none text-sm font-medium"
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)} 
                className="text-sm font-black text-gray-500 p-2 hover:bg-gray-50 rounded-xl transition-colors"
              >
                CANCEL
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEFT: MENU & SEARCH */}
        <div className="flex items-center flex-1 gap-3 md:gap-6">
          {!isSearchOpen && (
            <button aria-label="Open menu" className="p-2.5 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors shrink-0">
              <Icons.Menu />
            </button>
          )}

          {/* Desktop Search */}
          <div className="relative w-full max-w-md hidden sm:block group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">
              <Icons.Search />
            </div>
            <input
              type="text"
              className="w-full py-3 pl-11 pr-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 outline-none transition-all text-sm"
              placeholder="Search for events"
            />
          </div>

          {/* Mobile Search Toggle */}
          {!isSearchOpen && (
            <button aria-label="Open search" onClick={() => setIsSearchOpen(true)} className="sm:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl">
              <Icons.Search />
            </button>
          )}
        </div>

        {/* RIGHT: ACTIONS & PROFILE */}
        <div className="flex items-center gap-3 md:gap-5">
          
          <button aria-label="Notifications" className="relative p-2.5 text-gray-600 hover:bg-gray-50 border border-gray-100 cursor-pointer rounded-xl hidden xs:block transition-colors">
            <Icons.Bell />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-amber-500 border-2 border-white rounded-full"></span>
          </button>

          {/* Create Buttons */}
          <Link to="/events/create" className="hidden md:block">
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="px-6 py-3 font-bold cursor-pointer text-gray-900 bg-amber-400 rounded-2xl shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-all">
              Create Event
            </motion.button>
          </Link>
          <Link to="/events/create" className="block md:hidden">
            <motion.button aria-label="Create Event" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="p-3 font-bold cursor-pointer text-gray-900 bg-amber-400 rounded-[1.25rem] shadow-lg shadow-amber-400/20 hover:bg-amber-500 transition-all">
               <Icons.Plus />
            </motion.button>
          </Link>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <motion.button 
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer gap-2 focus:outline-none shrink-0"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-amber-400 p-0.5 shadow-sm transition-transform hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                   <img 
                    src={user.image} 
                    alt={displayName} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                   />
                   {/* Fallback Initial */}
                   <span className="absolute inset-0 flex items-center justify-center font-black text-gray-400 bg-gray-50 text-sm">
                    {userInitial}
                   </span>
                </div>
              </div>
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  {/* Invisible backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  
                  <motion.div
                    style={{ originX: 1, originY: 0 }}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-4xl shadow-2xl z-20 overflow-hidden p-2"
                  >
                    {/* User Header */}
                    <div className="px-4 py-4 mb-2 bg-gray-50/80 rounded-3xl">
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tighter truncate">
                        {displayName}
                      </p>
                      {user.email && (
                        <p className="text-xs text-gray-500 truncate font-medium mt-0.5">{user.email}</p>
                      )}
                    </div>

                    {/* Actions */}
                    {profileActions.map((action) => (
                      <Link
                        key={action.name}
                        to={action.path}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-2xl transition-all group"
                      >
                        <span className="text-gray-400 group-hover:text-amber-500 transition-colors">
                          {action.icon}
                        </span>
                        {action.name}
                      </Link>
                    ))}

                    <div className="mt-2 pt-2 border-t border-gray-50">
                      {/* ADDED: Attached handleLogout to the onClick event */}
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <Icons.LogOut />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;