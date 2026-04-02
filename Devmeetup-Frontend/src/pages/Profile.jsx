import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Icons = {
  // ADDED: ArrowLeft Icon
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  Mail: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Shield: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
};

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    role: "Event Organizer",
    joined: "March 2024",
    bio: "Passionate about creating community-driven tech events and music festivals.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-['Satoshi'] pb-20">
      
      {/* ADDED: TOP NAVIGATION BAR */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button 
          onClick={() => navigate('/home')}
          className="group flex items-center gap-2 text-sm font-black text-gray-500 hover:text-gray-900 transition-colors"
        >
          <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:border-amber-200 group-hover:bg-amber-50 transition-all">
            <Icons.ArrowLeft />
          </div>
          Back to Home
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-50">
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-2 right-2 p-2.5 bg-amber-400 text-gray-900 rounded-full shadow-lg hover:bg-amber-300 transition-colors border-2 border-white">
                <Icons.Edit />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left mb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <p className="text-gray-500 font-medium mt-1">{user.email}</p>
            </div>

            {/* Edit Button */}
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
              >
                Edit Profile
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <main className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg"><Icons.Calendar /></div>
                <span className="text-sm font-bold">Joined {user.joined}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg"><Icons.Shield /></div>
                <span className="text-sm font-bold">Verified Account</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-black text-gray-900 mb-4">About Me</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{user.bio}</p>
            </motion.div>

            {/* Account Settings */}
            <div className="bg-white overflow-hidden rounded-4xl border border-gray-100 shadow-sm">
              <div className="flex border-b border-gray-50">
                <button className="flex-1 py-4 text-sm font-black text-amber-500 border-b-2 border-amber-500">Security</button>
                <button className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Notifications</button>
                <button className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Payments</button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-gray-900">Email Address</p>
                    <p className="text-sm text-gray-500 font-medium">Your primary contact email</p>
                  </div>
                  <button className="text-sm font-bold text-amber-600 hover:underline">Change</button>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div>
                    <p className="font-black text-gray-900">Password</p>
                    <p className="text-sm text-gray-500 font-medium">Last changed 3 months ago</p>
                  </div>
                  <button className="text-sm font-bold text-amber-600 hover:underline">Update</button>
                </div>

                <div className="pt-6 border-t border-gray-50">
                   <button 
                    onClick={() => logout().then(() => navigate('/'))}
                    className="text-sm font-black text-red-500 hover:text-red-600 transition-colors"
                   >
                     Deactivate Account
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;