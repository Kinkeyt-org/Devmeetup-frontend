import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import { logout } from "../api/auth";

import {
  Home,
  Search,
  Bell,
  Plus,
  Ticket,
  User,
  TicketCheck
} from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {}
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const MobileNavItem = ({ to, icon, active }) => (
    <Link to={to} className="p-3 transition-all">
      <span className={`${active ? "text-black" : "text-neutral-400"}`}>
        {icon}
      </span>
    </Link>
  );

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 font-['Satoshi']">
        <div
          className={`flex items-center justify-between md:justify-around transition-all duration-500 p-2 px-4 ${
            scrolled ? "bg-white shadow-sm" : ""
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-70">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <Ticket className="text-white w-5 h-5" />
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative group border border-neutral-200 rounded-2xl focus-within:border-black transition-all">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full bg-neutral-100/50 rounded-2xl py-3 pl-12 pr-4 text-[15px] focus:outline-none focus:bg-white focus:border-neutral-200 font-medium"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                <button className="p-3 hover:bg-neutral-100 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-amber-500 rounded-full" />
                </button>

                {/* Create */}
                <Link to="/events/create" className="hidden md:flex">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </Link>

                {/* Tickets */}
                <Link to="/my-tickets" className="hidden md:flex">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100"
                  >
                    <TicketCheck className="w-5 h-5" />
                  </motion.div>
                </Link>

                {/* Profile */}
                <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full overflow-hidden border hover:border-black"
                >
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                    className="w-full h-full object-cover"
                  />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE DOCK */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white p-2 flex items-center justify-between">
          <MobileNavItem
            to="/"
            icon={<Home className="w-6 h-6" />}
            active={location.pathname === "/"}
          />
          <MobileNavItem
            to="/search"
            icon={<Search className="w-6 h-6" />}
            active={location.pathname === "/search"}
          />

          <Link to="/events/create">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg"
            >
              <Plus className="w-5 h-5 text-white" />
            </motion.div>
          </Link>

          <MobileNavItem
            to={user ? "/my-tickets" : "/login"}
            icon={<TicketCheck className="w-6 h-6" />}
            active={location.pathname === "/my-tickets"}
          />
          <MobileNavItem
            to={user ? "/profile" : "/login"}
            icon={<User className="w-6 h-6" />}
            active={location.pathname === "/profile"}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;