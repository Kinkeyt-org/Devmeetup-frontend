import React, { useEffect, useState } from "react";
import {  getEvents, deleteEvent } from "../api/event";
import {updateProfile} from "../api/user" // adjust path if needed

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user from localStorage (based on your login response)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?.role === "organizer") {
      fetchMyEvents(storedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMyEvents = async (userId) => {
  try {
    const events = await getEvents();
    // Use optional chaining because some events might have null organizers
    const filtered = events.filter(e => e.organizer?.id === userId); 
    setMyEvents(filtered);
  } catch (err) {
    console.error("Fetch Error:", err);
  } finally {
    setLoading(false);
  }
};
  // --- HANDLE PROFILE UPDATE (PHOTO) ---
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const res = await updateProfile(formData);
      const updatedUser = { ...user, avatar: res.user?.avatar };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };

  // --- DELETE EVENT ---
  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setMyEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 px-6 animate-pulse">
        <div className="max-w-5xl mx-auto">

          {/* --- USER SKELETON --- */}
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
            
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-neutral-200" />

            {/* Info */}
            <div className="w-full space-y-4">
              <div className="h-8 w-48 bg-neutral-200 rounded-full" />
              <div className="h-4 w-64 bg-neutral-200 rounded-full" />

              <div className="flex gap-3">
                <div className="h-6 w-20 bg-neutral-200 rounded-full" />
                <div className="h-6 w-32 bg-neutral-200 rounded-full" />
              </div>

              <div className="h-4 w-80 bg-neutral-200 rounded-full" />
            </div>
          </div>

          {/* --- EVENTS SKELETON --- */}
          <div>
            <div className="mb-8 space-y-2">
              <div className="h-6 w-40 bg-neutral-200 rounded-full" />
              <div className="h-4 w-56 bg-neutral-200 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  
                  {/* Card */}
                  <div className="aspect-[4/5] bg-neutral-200 rounded-3xl mb-4" />

                  {/* Text */}
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-neutral-200 rounded-full" />
                    <div className="h-5 w-40 bg-neutral-200 rounded-full" />

                    <div className="flex gap-3 mt-2">
                      <div className="h-8 w-20 bg-neutral-200 rounded-full" />
                      <div className="h-8 w-20 bg-neutral-200 rounded-full" />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] pt-24 px-6 font-['Satoshi'] antialiased">
      <div className="max-w-5xl mx-auto">

        {/* --- USER INFO --- */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
          
          {/* Avatar */}
          <div className="relative group">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />

            <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition">
              Change
              <input
                type="file"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {user?.name}
            </h1>
            <p className="text-neutral-500 mb-2">{user?.email}</p>

            <div className="flex gap-3 justify-center md:justify-start mb-4">
              <span className="px-4 py-1 bg-black text-white rounded-full text-xs font-bold uppercase">
                {user?.role}
              </span>
              <span className="px-4 py-1 bg-neutral-100 rounded-full text-xs font-bold">
                Joined {user?.joined_at}
              </span>
            </div>

            <p className="text-neutral-400 text-sm max-w-md">
              Manage your profile, events, and track your activity on DevMeet.
            </p>
          </div>
        </div>

        {/* --- ORGANIZER SECTION --- */}
        {user?.role === "organizer" && (
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold">My Created Events</h2>
                <p className="text-neutral-500 text-sm">
                  Manage and update your events
                </p>
              </div>
            </div>

            {myEvents.length === 0 ? (
              <p className="text-neutral-400">No events created yet.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {myEvents.map((event) => (
                  <div key={event.id} className="group">
                    
                    {/* Card */}
                    <div className="aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden shadow-sm mb-4 relative">
                      
                      <img
                        src={event.banner || "https://via.placeholder.com/400"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />

                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Info */}
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">
                        {event.date}
                      </p>

                      <h3 className="text-lg font-bold italic tracking-tight mb-2">
                        {event.title}
                      </h3>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm border rounded-full hover:bg-neutral-100 transition">
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(event.id)}
                          className="px-4 py-2 text-sm bg-black text-white rounded-full hover:scale-95 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;