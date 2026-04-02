import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../api/auth';

// Premium Icon Set (Lucide-inspired)
const Icons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Bell: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Ticket: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>,
  LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
};

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect for Apple-style blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const user = { 
    name: "Alex Doe", 
    email: "alex.doe@icloud.com",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" 
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate('/');
    } catch (e) {
      navigate('/');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 font-['Satoshi']
      ${scrolled ? 'bg-white/70 backdrop-blur-md border-b border-gray-200/50 py-2' : 'bg-white py-4'}`}>
      
      <div className=" px-6 flex items-center justify-between gap-8">
        
        {/* LEFT: BRAND */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:block">PLATFORM.</span>
        </Link>

        {/* CENTER: SEARCH BAR */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400  transition-colors">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-gray-100/80 border border-black/15 rounded-xl py-2.5 pl-12 pr-4 text-[15px] focus:outline-none focus:border-amber-400 focus:bg-gray-200/50 transition-all placeholder:text-gray-500 font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-gray-300 bg-white px-1.5 font-sans text-[10px] font-medium text-gray-400">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full transition-all relative">
            <Icons.Bell />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="hidden sm:flex items-center gap-2 cursor-pointer bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95">
            <Icons.Plus />
            <span><Link to="/events/create">Create</Link></span>
          </button>
          <button className="md:hidden flex items-center gap-2 cursor-pointer bg-black text-white px-2 py-2 rounded-3xl text-sm  hover:bg-gray-800 transition-all active:scale-95">
            <Link to="/events/create"><Icons.Plus /></Link>
          </button>

          {/* PROFILE DROPDOWN (Google/Premium Style) */}
          <div className="relative ml-2">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="group flex items-center gap-2 p-1 pr-3 cursor-pointer rounded-full transition-all"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-gray-200 transition-all">
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="hidden lg:block text-left">
                <Icons.ChevronDown />
              </div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="absolute right-0 mt-4 w-[320px] bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 border border-gray-100 overflow-hidden"
                  >
                    {/* Google-Style Account Header */}
                    <div className="p-6 text-center border-b border-gray-50 bg-gray-50/50">
                      <p className="text-xs font-bold text-gray-500 mb-4 tracking-widest uppercase">Personal Account</p>
                      <div className="relative inline-block mb-3">
                        <img src={user.image} className="w-20 h-20 rounded-full border-4 border-white shadow-sm mx-auto" alt="Avatar" />
                        <div className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50">
                          <Icons.Settings />
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      
                      <button className="mt-4 px-6 py-2 border border-gray-200 rounded-full text-sm font-semibold hover:bg-white transition-all">
                        Manage Account
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <DropdownItem icon={<Icons.User />} label="View Profile" onClick={() => setIsProfileOpen(false)} />
                      <DropdownItem icon={<Icons.Ticket />} label="Orders & Tickets" onClick={() => setIsProfileOpen(false)} />
                      <DropdownItem icon={<Icons.Settings />} label="Display & Settings" onClick={() => setIsProfileOpen(false)} />
                    </div>

                    {/* Footer / Logout */}
                    <div className="p-2 bg-gray-50 border-t border-gray-100">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                      >
                        <Icons.LogOut />
                        Sign Out of Platform
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

// Sub-component for clean dropdown items
const DropdownItem = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-100 rounded-2xl transition-all group"
  >
    <span className="text-gray-400 group-hover:text-black transition-colors">{icon}</span>
    <span className="text-[15px] font-medium text-gray-700 group-hover:text-black transition-colors">{label}</span>
  </button>
);

export default Navbar;