import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Plus, Loader2 } from 'lucide-react';
import { updateProfile } from '../api/user'; // Adjust path as needed

const Profile = () => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Toggle states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  useEffect(() => {
    // Get user from localStorage (stored during login/register)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);
    
    try {
      setUploading(true);
      const response = await updateProfile(formData);
      
      // Update local state and storage with new user data (including new avatar)
      const updatedUser = { ...user, avatar: response.user.avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to update profile picture.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  const sections = [
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Edit Profile', type: 'link' },
        { label: 'Payment Methods', type: 'link' },
        { label: 'Saved Events', type: 'link' },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        { label: 'Push Notifications', type: 'toggle', state: pushNotifications, setter: setPushNotifications },
        { label: 'Email Updates', type: 'toggle', state: emailUpdates, setter: setEmailUpdates },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        { label: 'Help Center', type: 'link' },
        { label: 'Privacy Policy', type: 'link' },
        { label: 'Terms of Service', type: 'link' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto font-['Satoshi] text-gray-900 pb-10">
      {/* Header */}
      <div className="px-6 pt-15 pb-4">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500  text-xl">
                  {user.name?.substring(0, 2).toUpperCase()}
                </span>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 size={20} className="text-white animate-spin" />
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1 border-2 border-white hover:bg-gray-800 transition-colors"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
          
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <div className="mt-2">
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-gray-400 text-xs font-bold tracking-widest mb-4">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className={`flex items-center justify-between py-4 ${itemIdx !== section.items.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <span className="text-[15px] font-medium">{item.label}</span>
                  
                  {item.type === 'link' ? (
                    <ChevronRight size={18} className="text-gray-400" />
                  ) : (
                    <button 
                      onClick={() => item.setter(!item.state)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${item.state ? 'bg-black' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${item.state ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Logout Button */}
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full py-4 text-red-500 font-bold text-sm tracking-widest border-t border-gray-100 mt-4 hover:bg-red-50 transition-colors"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Profile;