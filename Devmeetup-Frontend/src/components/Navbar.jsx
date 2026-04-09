import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdSearch } from "react-icons/io";
import { logout } from '../api/auth';

// Simplified Icons
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" /><path d="M9 22V12h6v10" /><path d="M2 10.6L12 2l10 8.6" /></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  Ticket: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><line x1="9" y1="9" x2="9" y2="15" /><line x1="15" y1="9" x2="15" y2="15" /></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>

};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
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
    navigate('/login');
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 font-['Satoshi']`}>
        <div className={`flex items-center justify-between md:justify-around transition-all duration-500 p-2 px-4 ${scrolled ? 'bg-white' : ''}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
            </div>
            
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative group border border-neutral-200 rounded-2xl focus-within:border-amber-400 transition-all">
              <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full bg-neutral-100/50 border border-transparent rounded-2xl py-3 pl-12 pr-4 text-[15px] focus:outline-none focus:bg-white focus:border-neutral-200 focus:shadow-sm transition-all font-medium"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notification */}
                <button className="p-3 hover:text-black hover:bg-neutral-100 rounded-full transition-all relative">
                  <Icons.Bell />
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Create Event */}
                <Link to="/events/create" className="hidden md:flex">
                  <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100">
                    <Icons.Plus />
                  </motion.div>
                </Link>

                {/* My Tickets */}
                <Link to="/my-tickets" className="hidden md:flex">
                  <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100">
                    <Icons.Ticket />
                  </motion.div>
                </Link>

                {/* Profile */}
                <Link
                  to=""
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-amber-400 transition-all"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE DOCK */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-100">
        <div className="bg-white p-2 flex items-center justify-between">
          <MobileNavItem to="/" icon={<Icons.Home />} active={location.pathname === "/"} />
          <MobileNavItem to="/search" icon={<Icons.Search />} active={location.pathname === "/search"} />
          <Link to="/events/create">
            <motion.div whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <Icons.Plus />
            </motion.div>
          </Link>
          <MobileNavItem to={user ? "/my-tickets" : "/login"} icon={<Icons.Ticket />} active={location.pathname === "/my-tickets"} />
          <MobileNavItem to={user ? "/profile" : "/login"} icon={<Icons.User />} active={location.pathname === "/profile"} />
        </div>
      </div>
    </>
  );
};

const MobileNavItem = ({ to, icon, active }) => (
  <Link to={to} className="p-3 transition-all">
    <span className={`${active ? 'text-black ' : 'text-neutral-400'} transition-all inline-block`}>
      {icon}
    </span>
  </Link>
);

export default Navbar;