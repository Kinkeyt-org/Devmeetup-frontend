import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { updateProfile } from '../api/user';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      setUploading(true);
      const response = await updateProfile(formData);
      const updatedUser = { ...user, avatar: response.user.avatar };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div className="flex h-screen items-center justify-center bg-white"><Loader2 className="animate-spin text-gray-300" /></div>;

  const sections = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', type: 'link' },
        { label: 'Payment Methods', type: 'link' },
        { label: 'Saved Events', type: 'link' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Push Notifications', type: 'toggle', state: pushNotifications, setter: setPushNotifications },
        { label: 'Email Updates', type: 'toggle', state: emailUpdates, setter: setEmailUpdates },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', type: 'link' },
        { label: 'Privacy Policy', type: 'link' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-['Satoshi'] antialiased pb-20">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:opacity-60 transition-opacity">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="font-semibold text-[17px] tracking-tight">Profile</span>
        <div className="w-10" /> {/* Spacer for centering */}
      </nav>

      {/* Hero Header */}
      <header className="flex flex-col items-center pt-10 pb-8 bg-white border-b border-gray-100">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gray-50 overflow-hidden border border-gray-100 shadow-sm">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl font-medium">
                {user.name?.charAt(0)}
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-black" />
              </div>
            )}
          </div>
          
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute -bottom-1 -right-1 bg-white border border-gray-100 shadow-sm rounded-full p-2 hover:scale-105 active:scale-95 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight">{user.name}</h1>
        <p className="text-[#86868B] text-[15px]">{user.email}</p>
      </header>

      {/* Settings Grid */}
      <div className="max-w-md mx-auto mt-8 px-4 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="px-4 text-[13px] font-semibold text-[#86868B] uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="relative">
                  <div className={`flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer`}>
                    <span className="text-[16px] font-medium tracking-tight">{item.label}</span>
                    
                    {item.type === 'link' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    ) : (
                      <button
                        onClick={() => item.setter(!item.state)}
                        className={`w-11 h-6 rounded-full transition-all duration-300 relative ${item.state ? 'bg-black' : 'bg-[#E9E9EA]'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${item.state ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    )}
                  </div>
                  {itemIdx !== section.items.length - 1 && (
                    <div className="ml-4 border-b border-gray-50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          className="w-full py-4 bg-white rounded-2xl border border-gray-100 text-[#FF3B30] font-semibold text-[16px] hover:bg-red-50/50 transition-colors mt-4"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;