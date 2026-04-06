import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProfile } from '../api/user';
import { IoMdCheckmarkCircle, IoMdCloudUpload } from "react-icons/io";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({ 
        name: parsedUser.name || '', 
        email: parsedUser.email || '', 
        bio: parsedUser.bio || 'Tech enthusiast & event lover.' 
      });
      setPreview(parsedUser.avatar);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    if (fileInputRef.current.files[0]) {
      data.append('avatar', fileInputRef.current.files[0]);
    }

    try {
      const response = await updateProfile(data);
      setUser(response.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-32 px-6 font-['Satoshi']">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic">Settings</h1>
            <p className="text-neutral-500 font-medium">Manage your DevMeet identity.</p>
          </div>
          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-full border border-green-100"
              >
                <IoMdCheckmarkCircle /> Saved
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Avatar Section */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src={preview || `https://ui-avatars.com/api/?name=${formData.name}`} 
                  className="w-full h-full object-cover" 
                  alt="Avatar" 
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <IoMdCloudUpload className="text-white text-3xl" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
            <h3 className="mt-4 font-bold text-xl">{user?.name}</h3>
            <p className="text-neutral-400 text-sm font-medium">{user?.email}</p>
          </div>

          {/* Form Fields */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-neutral-100 space-y-6">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-neutral-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-400 transition-all font-bold"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Bio</label>
              <textarea 
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-neutral-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-400 transition-all font-medium leading-relaxed"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Danger Zone / Preferences Placeholder */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-[2rem] border border-neutral-100">
                <p className="text-[10px] font-black uppercase text-neutral-400 mb-1">Status</p>
                <p className="font-bold text-green-500">Active Member</p>
             </div>
             <div className="bg-white p-6 rounded-[2rem] border border-neutral-100">
                <p className="text-[10px] font-black uppercase text-neutral-400 mb-1">Joined</p>
                <p className="font-bold">2026</p>
             </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-black text-white rounded-full font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:bg-neutral-300 disabled:scale-100"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;