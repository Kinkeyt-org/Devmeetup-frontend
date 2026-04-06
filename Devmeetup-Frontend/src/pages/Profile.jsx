import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../api/event";
import { updateProfile } from "../api/user";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setNewName(storedUser?.name || "");

    if (storedUser?.role === "organizer") {
      fetchMyEvents(storedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMyEvents = async (userId) => {
    try {
      const events = await getEvents();
      const filtered = events.filter(e => e.organizer?.id === userId); 
      setMyEvents(filtered);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE FULL PROFILE UPDATE (Name & Photo) ---
  const handleUpdate = async (file = null) => {
    setIsUpdating(true);
    const formData = new FormData();
    
    // Always send the current or new name
    formData.append("name", newName);
    
    // If a file was passed (from the photo input), add it
    if (file) {
      formData.append("profile_picture", file);
    }

    try {
      const res = await updateProfile(formData);
      
      // Update local state and storage with response from server
      const updatedUser = { 
        ...user, 
        name: res.user?.name || newName,
        avatar: res.user?.avatar || user.avatar 
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUpdate(file); // Trigger update immediately on photo selection
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      setMyEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] pt-24 px-6 font-['Satoshi'] antialiased">
      <div className="max-w-5xl mx-auto">

        {/* --- USER INFO --- */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
          
          <div className="relative group">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt="avatar"
              className={`w-32 h-32 rounded-full object-cover shadow-lg ${isUpdating ? 'opacity-50' : ''}`}
            />
            <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition text-xs font-bold">
              {isUpdating ? "..." : "CHANGE"}
              <input type="file" className="hidden" onChange={handlePhotoChange} disabled={isUpdating} />
            </label>
          </div>

          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <div className="flex flex-col md:flex-row gap-2 mb-2">
                <input 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-2xl font-bold border-b-2 border-black outline-none bg-transparent"
                  autoFocus
                />
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => handleUpdate()} 
                    className="text-xs bg-black text-white px-3 py-1 rounded-full font-bold"
                  >
                    SAVE
                  </button>
                  <button 
                    onClick={() => { setIsEditing(false); setNewName(user.name); }} 
                    className="text-xs bg-neutral-200 px-3 py-1 rounded-full font-bold"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {user?.name}
                </h1>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-neutral-400 hover:text-black transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            )}
            
            <p className="text-neutral-500 mb-2">{user?.email}</p>

            <div className="flex gap-3 justify-center md:justify-start mb-4">
              <span className="px-4 py-1 bg-black text-white rounded-full text-xs font-bold uppercase tracking-tighter">
                {user?.role}
              </span>
              <span className="px-4 py-1 bg-neutral-100 rounded-full text-xs font-bold">
                Joined {user?.joined_at}
              </span>
            </div>
          </div>
        </div>

        {/* --- ORGANIZER SECTION (unchanged logic) --- */}
        {/* ... (keep your existing myEvents mapping logic here) ... */}
        
      </div>
    </div>
  );
};

export default Profile;