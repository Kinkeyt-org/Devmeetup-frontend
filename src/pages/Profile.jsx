import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Loader2,
  Camera,
  ChevronRight,
  Settings,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  FileText,
  CalendarDays,
  BarChart,
  Settings2,
  ArrowLeft
} from "lucide-react";
import { updateProfile } from "../api/user";
import { logout } from "../api/auth";

const MENU_ITEMS = [
  { icon: Settings, label: "Personal Information", path: "/settings/personal-info" },
  { icon: Shield, label: "Login & Security", path: "/settings/security" },
  { icon: CreditCard, label: "Payments & Payouts", path: "/settings/payments" },
  { icon: Bell, label: "Notifications", path: "/settings/notifications" },
];

const SUPPORT_ITEMS = [
  { icon: HelpCircle, label: "Help Center", path: "/support/help" },
  { icon: FileText, label: "Terms & Privacy", path: "/support/terms" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      setUploading(true);
      const res = await updateProfile(formData);
      const newImageUrl = res._resolvedAvatarUrl;

      if (newImageUrl) {
        const updatedUser = {
          ...user,
          avatar: newImageUrl,
          profile_picture: newImageUrl,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.dispatchEvent(new Event("userUpdate"));
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9F9FB] dark:bg-neutral-950">
        <Loader2 className="animate-spin text-neutral-300 dark:text-neutral-600 w-8 h-8" />
      </div>
    );
  }

  const avatarSrc =
    user.avatar ||
    user.profile_picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "U")}`;

  const isOrganizer = user.role === "organizer";

  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 font-sans pb-24 selection:bg-neutral-200 dark:selection:bg-neutral-800">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>

        <span className="text-[16px] font-semibold tracking-tight">Profile</span>

        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 md:px-6">
        
        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center mt-8 mb-10">
          <div className="relative">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-neutral-900 shadow-xl bg-neutral-100 dark:bg-neutral-800 transition-all"
            >
              <img
                src={avatarSrc}
                alt={`${user.name}'s Profile`}
                className="w-full h-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="animate-spin w-7 h-7 text-black dark:text-white" />
                </div>
              )}
            </motion.div>

            <button
              onClick={() => !uploading && fileInputRef.current.click()}
              disabled={uploading}
              className="absolute bottom-1 right-1 p-2.5 md:p-3 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 active:scale-95 transition-all ring-4 ring-[#F9F9FB] dark:ring-[#0a0a0a]"
              aria-label="Upload profile picture"
            >
              <Camera className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white text-center">
            {user.name}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base mt-1 text-center">
            {user.email}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {isOrganizer ? "Organizer Account" : "Standard Account"}
          </div>
        </div>

        {/* ORGANIZER SECTION */}
        {isOrganizer ? (
          <div className="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-500/20 rounded-[1.5rem] p-5 md:p-6 mb-8 hover:shadow-lg hover:shadow-purple-500/5 transition-shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400">
                <Settings2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Organizer Dashboard</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage your events and attendees</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 bg-transparent">
              <button
                onClick={() => navigate("/")}
                className="group flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-white/5 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <CalendarDays className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                <span className="text-sm font-medium">Manage Events</span>
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="group flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-white/5 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <BarChart className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
            <button
              onClick={() => navigate("/events/create")}
              className="mt-3 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
            >
              Create New Event
            </button>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-linear-to-br from-neutral-900 to-black dark:from-white dark:to-neutral-200 rounded-[1.5rem] p-6 md:p-8 mb-8 text-white dark:text-black shadow-xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 dark:bg-black/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="font-semibold text-lg md:text-xl mb-2">Become an Organizer</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed max-w-[90%]">
                Host your own events, sell tickets, manage attendees, and grow your community seamlessly.
              </p>
              <button
                onClick={() => navigate("/become-organizer")}
                className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-black text-black dark:text-white rounded-xl text-sm font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Start Hosting
              </button>
            </div>
          </div>
        )}

        {/* ACCOUNT SETTINGS */}
        <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-4 px-4">
          Account Settings
        </h2>
        <div className="bg-white dark:bg-neutral-900/50 rounded-[1.5rem] border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden mb-8 shadow-sm">
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <button 
                className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors group"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:bg-white dark:group-hover:bg-neutral-700 group-hover:shadow-sm transition-all">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-medium text-[15px]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
              </button>
              {index < MENU_ITEMS.length - 1 && (
                <div className="h-px bg-neutral-100 dark:bg-neutral-800/60 ml-16" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* SUPPORT */}
        <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-4 px-4 mt-4">
          Support & About
        </h2>
        <div className="bg-white dark:bg-neutral-900/50 rounded-[1.5rem] border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden mb-8 shadow-sm">
          {SUPPORT_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <button 
                className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors group"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:bg-white dark:group-hover:bg-neutral-700 group-hover:shadow-sm transition-all">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-medium text-[15px]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors" />
              </button>
              {index < SUPPORT_ITEMS.length - 1 && (
                <div className="h-px bg-neutral-100 dark:bg-neutral-800/60 ml-16" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="px-2">
          <button
            onClick={handleLogout}
            className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-transparent dark:border-neutral-800/60 text-red-600 dark:text-red-500 text-[15px] font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-100 dark:hover:border-red-500/20 active:scale-[0.98] transition-all shadow-sm"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
          
          <p className="text-center text-xs text-neutral-400 mt-6 pb-6">
            DevMeet v1.0.0
          </p>
        </div>

      </main>
    </div>
  );
};

export default Profile;