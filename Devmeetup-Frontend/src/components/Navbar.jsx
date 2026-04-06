import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdSearch } from "react-icons/io";
import { logout } from '../api/auth';
import { updateProfile } from '../api/user';

// Simplified & Refined Icons (Keeping your logic, but cleaner sizing)
const Icons = {
  Home: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Bell: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Plus: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>,
  Ticket: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2m0 10v2m0-8v2"/></svg>,
  LogOut: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  User: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Pencil: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
};

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLogout = async () => {
    try { await logout(); } catch (e) {}
    localStorage.clear();
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 font-['Satoshi'] 
        ${scrolled ? 'py-0' : 'py-0'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 p-2 px-4 
          ${scrolled ? 'bg-white  ' : ''}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-lg">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
            </div>
            <span className="hidden lg:block font-bold text-xl tracking-tight">EventHub</span>
          </Link>

          {/* Search Bar - Subtle & Focused */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative group border border-neutral-200 rounded-2xl focus-within:border-amber-400 transition-all">
              <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full bg-neutral-100/50 border border-transparent rounded-2xl py-3 pl-12 pr-4 text-[15px] focus:outline-none focus:bg-white focus:border-neutral-200 focus:shadow-sm transition-all font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 opacity-40 pointer-events-none">
                <kbd className="text-[10px] font-bold border rounded px-1.5 py-0.5 bg-neutral-50">⌘ K</kbd>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-3 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-all relative">
              <Icons.Bell />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-amber-400 transition-all active:scale-95"
                >
                  <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} alt="Profile" className="w-full h-full object-cover" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0" onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-4 w-72 bg-white rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden"
                      >
                        <div className="p-6 text-center bg-neutral-50/50 border-b border-neutral-100">
                          <div className="relative w-16 h-16 mx-auto mb-3">
                            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-full h-full rounded-full border-4 border-white shadow-sm" alt="Avatar" />
                            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-neutral-100 hover:scale-110 transition-transform">
                              <Icons.Pencil />
                            </button>
                          </div>
                          <h4 className="font-bold text-neutral-900">{user?.name}</h4>
                          <p className="text-xs text-neutral-400 font-medium">{user?.email}</p>
                        </div>
                        <div className="p-2 hidden md:block">
                          <DropdownItem icon={<Icons.User />} label="My Profile"  />
                          <DropdownItem icon={<Icons.Ticket />} label="Tickets" />
                        </div>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500 rounded-2xl transition-all font-bold text-[14px]">
                            <Icons.LogOut /> Sign Out
                          </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE DOCK (Floating Island Style) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-100 ">
        <div className="bg-white  p-2 flex items-center justify-between ">
          <MobileNavItem to="/" icon={<Icons.Home />} active={location.pathname === "/"} />
          <MobileNavItem to="/search" icon={<Icons.Search />} active={location.pathname === "/search"} />
          
          <Link to="/events/create">
            <motion.div whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <Icons.Plus />
            </motion.div>
          </Link>

          <MobileNavItem to="/my-tickets" icon={<Icons.Ticket />} active={location.pathname === "/my-tickets"} />
          <MobileNavItem to={user ? "/profile" : "/login"} icon={<Icons.User />} active={location.pathname === "/profile"} />
        </div>
      </div>
      
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
    </>
  );
};

const DropdownItem = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 rounded-2xl transition-all font-semibold text-neutral-600 hover:text-black text-[14px]">
    {icon} {label}
  </button>
);

const MobileNavItem = ({ to, icon, active }) => (
  <Link to={to} className="p-3 transition-all">
    <span className={`${active ? 'text-black scale-110' : 'text-neutral-400'} transition-all inline-block`}>
      {icon}
    </span>
  </Link>
);

export default Navbar;