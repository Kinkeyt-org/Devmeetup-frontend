import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const Upgrade = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Note: You would typically call an API like PATCH /api/user/upgrade here
    // Based on your Postman collection, organizers MUST have a profile picture
    
    try {
      // Logic to send profile_picture and update role to 'organizer'
      console.log("Upgrading with file:", file);
      
      // On success, update localStorage and redirect
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...storedUser, role: "organizer" };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      navigate("/events/create");
    } catch (err) {
      alert("Upgrade failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Become an Organizer" description="Upgrade your account to become an organizer on DevMeet and host events." />
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 font-['Satoshi']">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Become an Organizer</h2>
        <p className="text-neutral-500 mb-8">
          To host events on DevMeet, you need to upgrade your account. 
          Organizers are required to have a profile picture.
        </p>

        <form onSubmit={handleUpgrade} className="space-y-6">
          <div className="border-2 border-dashed border-neutral-200 p-6 rounded-2xl">
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-full font-bold transition-transform active:scale-95 disabled:bg-neutral-400"
          >
            {loading ? "Processing..." : "Upgrade Account"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Upgrade;