import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../api/auth";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "../components/SearchBar";
import Notifications from "./Notifications";
import {
  Home,
  Search,
  Bell,
  Plus,
  Ticket,
  TicketCheck,
  Menu,
  X,
  LogOut,
  ArrowRight,
  ArrowUp,
  ArrowUpRight
} from "lucide-react";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEventDetails = location.pathname.match(/^\/events\/[^\/]+$/);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    const syncUser = () => {
      try {
        const saved = localStorage.getItem("user");
        setUser(saved ? JSON.parse(saved) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("storage", syncUser);
    window.addEventListener("userUpdate", syncUser);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userUpdate", syncUser);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    window.dispatchEvent(new Event("userUpdate"));
    navigate("/");
    closeMenu();
  };

  const avatarSrc =
    user?.avatar ||
    user?.profile_picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}`;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 text-neutral-900 dark:text-neutral-100 ${isEventDetails ? 'hidden' : ''}`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 z-50" onClick={closeMenu}>
            <div className="w-9 h-9  flex items-center justify-center">
              <Ticket className="w-5 h-5 text-black dark:text-white" />
            </div>
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <SearchBar />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-4 z-50">

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-3 mr-2">
              <Link
                className="px-3 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                to="/"
              >
                Home
              </Link>

              <Link
                className="px-3 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                to="/events/create"
              >
                Create
              </Link>

              {user && (
                <Link
                  className="px-3 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                  to="/my-tickets"
                >
                  Tickets
                </Link>
              )}
            </div>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <button
              onClick={() => navigate("/events")}
              className="hidden md:flex w-40 py-2 cursor-pointer items-center justify-center gap-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
            >
              Explore Events <ArrowRight size={16} />
            </button>

            {/* USER */}
            {user ? (
              <>
                <Notifications classname='cursor-pointer'/>

                <Link
                  to="/profile"
                  className="hidden md:block w-9 h-9 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800"
                >
                  <img src={avatarSrc} className="w-full h-full object-cover" />
                </Link>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                  to="/login"
                >
                  Log in
                </Link>

                <Link
                  className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                  to="/login"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* MOBILE BUTTON */}
            {!user?(
                <Link
                  className="px-4 md:hidden py-2 text-sm font-medium rounded-full flex gap-1  items-center bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                  to="/login"
                >
                  sign in <ArrowUpRight size={12}/>
                </Link>
              ):(
              <div className="flex md:hidden items-center gap-2">

                <ThemeToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

              </div>
              )
            
              }
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
            onClick={closeMenu}
          />

          <div className="fixed top-0 left-0 right-0 bg-white dark:bg-neutral-950 z-30 pt-[72px] pb-4 px-4 shadow-xl md:hidden rounded-b-2xl border-b border-white/10">

            <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto">

              {/* SEARCH */}
              <div className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    readOnly
                    onClick={() => {
                      closeMenu();
                      navigate("/search");
                    }}
                    placeholder="Search events..."
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-100 dark:bg-neutral-900 dark:text-white rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* EXPLORE */}
              <button
                onClick={() => {
                  closeMenu();
                  navigate("/events");
                }}
                className="w-full py-3 mb-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition flex items-center justify-center gap-2 text-sm"
              >
                Explore Events <ArrowRight size={16} />
              </button>

              {/* LINKS */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <MenuLink to="/" icon={Home} label="Home" onClick={closeMenu} current={location.pathname === "/" || location.pathname === "/home"} />
                <MenuLink to="/search" icon={Search} label="Explore" onClick={closeMenu} current={location.pathname === "/search"} />
                <MenuLink to="/events/create" icon={Plus} label="Create" onClick={closeMenu} current={location.pathname === "/events/create"} />
                <MenuLink to="/my-tickets" icon={TicketCheck} label="Tickets" onClick={closeMenu} current={location.pathname === "/my-tickets"} />
              </div>

              <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-2" />

              {/* USER */}
              {user ? (
                <div className="flex flex-col gap-2">

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    <img src={avatarSrc} className="w-10 h-10 rounded-full object-cover border dark:border-neutral-800" />
                    <div>
                      <p className="text-sm dark:text-white font-medium">{user.name}</p>
                      <p className="text-xs text-neutral-500">View profile</p>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-500"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-500/20">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Log out</span>
                  </button>

                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link to="/login" onClick={closeMenu} className="py-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl dark:text-white text-center text-sm font-medium">
                    Log in
                  </Link>
                  <Link to="/login" onClick={closeMenu} className="py-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl dark:text-white text-center text-sm font-medium">
                    Sign up
                  </Link>
                </div>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
};

const MenuLink = ({ to, icon: Icon, label, onClick, current }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-2.5 p-3 rounded-xl transition ${
      current
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default Navbar;