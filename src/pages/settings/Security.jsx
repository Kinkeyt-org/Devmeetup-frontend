import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, Key, Smartphone, ChevronRight, Loader2 } from "lucide-react";

const Security = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
        <span className="text-[16px] font-semibold tracking-tight">Login & Security</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <div className="space-y-6">
          {/* PASSWORD SECTION */}
          <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100 dark:border-white/5">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Lock className="w-5 h-5 text-neutral-400" />
                Password
              </h2>
              <p className="text-sm text-neutral-500 mt-1">Change your password regularly to keep your account secure.</p>
            </div>
            
            <button className="w-full flex items-center justify-between p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl group-hover:bg-white dark:group-hover:bg-neutral-700 transition-all">
                  <Key className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Update Password</p>
                  <p className="text-xs text-neutral-500">Last changed 3 months ago</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300" />
            </button>
          </div>

          {/* TWO-FACTOR SECTION */}
          <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100 dark:border-white/5">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-neutral-400" />
                Two-Factor Authentication
              </h2>
              <p className="text-sm text-neutral-500 mt-1">Add an extra layer of security to your account.</p>
            </div>
            
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">SMS Authentication</p>
                  <p className="text-xs text-neutral-500">Currently enabled</p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <div className="w-11 h-6 bg-green-500 rounded-full transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform translate-x-5"></div>
              </div>
            </div>
          </div>

          {/* SESSIONS SECTION */}
          <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-100 dark:border-white/5">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-neutral-400" />
                Recent Devices
              </h2>
              <p className="text-sm text-neutral-500 mt-1">Check where you're currently logged in.</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Smartphone className="w-5 h-5 text-neutral-400 mt-1" />
                  <div>
                    <p className="font-medium">iPhone 15 Pro • London, UK</p>
                    <p className="text-xs text-neutral-500">Current Session</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-500/10 px-2 py-1 rounded">Online</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Security;
