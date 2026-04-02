import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zM9 11V7a3 3 0 016 0v4" /></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Globe: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
};

const Settings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [hasChanges, setHasChanges] = useState(false);

  const menuItems = [
    { id: 'account', label: 'Account', icon: <Icons.User /> },
    { id: 'security', label: 'Security', icon: <Icons.Lock /> },
    { id: 'notifications', label: 'Notifications', icon: <Icons.Bell /> },
    { id: 'language', label: 'Language & Region', icon: <Icons.Globe /> },
  ];

  const handleInputChange = () => setHasChanges(true);

  return (
    <div className="min-h-screen bg-gray-50/50 font-['Satoshi'] pb-32">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-4 pt-8 mb-10">
        <button 
          onClick={() => navigate('/home')}
          className="group flex items-center gap-2 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors mb-6"
        >
          <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all">
            <Icons.ArrowLeft />
          </div>
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Settings</h1>
      </div>

      <main className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-sm transition-all ${
                  activeSection === item.id 
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-200" 
                  : "text-gray-500 hover:bg-white hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </aside>

          {/* SETTINGS CONTENT AREA */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12"
              >
                {activeSection === 'account' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-1">Account Information</h2>
                      <p className="text-gray-500 font-medium text-sm">Update your personal details and public profile.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Alex Thompson"
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 outline-none transition-all font-bold text-gray-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="alex@nexus.com"
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 outline-none transition-all font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Bio</label>
                      <textarea 
                        rows="4"
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 outline-none transition-all font-bold text-gray-900 resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-1">Security Settings</h2>
                      <p className="text-gray-500 font-medium text-sm">Manage your password and account security.</p>
                    </div>

                    <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-400 text-gray-900 rounded-2xl"><Icons.Lock /></div>
                        <div>
                          <p className="font-black text-gray-900">Two-Factor Authentication</p>
                          <p className="text-xs text-amber-700 font-bold">Highly recommended for organizers</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 bg-white text-gray-900 font-black text-xs rounded-xl shadow-sm border border-amber-200">Enable</button>
                    </div>

                    <button className="text-sm font-black text-amber-600 hover:text-amber-700 transition-colors ml-1">
                      Change account password →
                    </button>
                  </div>
                )}
                
                {/* Add other sections as needed */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* FLOATING SAVE BAR */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
          >
            <div className="bg-gray-900 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between">
              <p className="text-sm font-bold ml-4">You have unsaved changes</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setHasChanges(false)}
                  className="px-5 py-2.5 text-sm font-black text-gray-400 hover:text-white transition-colors"
                >
                  Discard
                </button>
                <button 
                  onClick={() => setHasChanges(false)}
                  className="px-6 py-2.5 bg-amber-400 text-gray-900 text-sm font-black rounded-2xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;