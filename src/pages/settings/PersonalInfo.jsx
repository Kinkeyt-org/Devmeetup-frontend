import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Shield, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        bio: parsedUser.bio || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLoading(false);
      // In a real app, you'd call an API here
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
        <span className="text-[16px] font-semibold tracking-tight">Personal Information</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-neutral-400" />
              Basic Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-500 cursor-not-allowed"
                />
                <p className="mt-1.5 text-xs text-neutral-400 ml-1 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Email cannot be changed directly for security.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5 ml-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default PersonalInfo;
