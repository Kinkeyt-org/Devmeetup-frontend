import React, { useState, useRef } from 'react';
import { updateProfile } from '../api/user';

const ProfileEdit = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('profile_picture', image);

    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
      // Optional: Redirect or close modal here
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-20 px-4 flex justify-center font-['Satoshi']">
      <div className="w-full max-w-sm bg-white ">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Clickable Avatar Area */}
          <div 
            className="relative group cursor-pointer mb-8"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center transition-all duration-200 group-hover:ring-4 group-hover:ring-gray-50">
              {preview ? (
                <img 
                  src={preview} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              
              {/* Dark Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Hidden Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </div>

          {/* Action Buttons */}
          <div className="w-full flex gap-3">
            {preview && (
              <button
                type="button"
                onClick={() => { setImage(null); setPreview(null); }}
                disabled={isUploading}
                className="flex-1 py-3 px-4 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit"
              disabled={!image || isUploading}
              className={`flex-1 py-3 px-4 rounded-full font-semibold text-white flex items-center justify-center transition-all duration-200 ${
                !image 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800 shadow-md hover:shadow-lg'
              }`}
            >
              {isUploading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />  : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;