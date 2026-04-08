import React, { useEffect, useState } from "react";
import { getEvents } from "../api/event";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Retrieve the user object from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // 2. If the user is an organizer, fetch their specific events
    if (storedUser?.role === "organizer") {
      fetchMyEvents(storedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMyEvents = async (userId) => {
    try {
      const events = await getEvents();
      // Filter the global events list to find events created by this user
      const filtered = events.filter(e => e.organizer?.id === userId);
      setMyEvents(filtered);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="pt-24 text-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] pt-24 px-6 font-['Satoshi'] antialiased">
      <div className="max-w-5xl mx-auto">

        {/* --- PROFILE HEADER --- */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
          <div className="relative">
            {/* The 'user.avatar' comes from your backend. 
               It contains the S3 URL for the image you uploaded.
            */}
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-lg border-2 border-neutral-50"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
              {user.name}
            </h1>
            <p className="text-neutral-500 mb-4">{user.email}</p>
            
            <div className="flex gap-3 justify-center md:justify-start">
              <span className="px-4 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                {user.role}
              </span>
              <span className="px-4 py-1 bg-neutral-100 rounded-full text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                Joined {new Date(user.created_at).getFullYear()}
              </span>
            </div>
          </div>
        </div>

        {/* --- ORGANIZER EVENTS SECTION --- */}
        {user.role === "organizer" && (
          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-xl font-bold mb-8 tracking-tight">Your Hosted Events</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-neutral-100 rounded-[2rem]" />
                ))}
              </div>
            ) : myEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map(event => (
                  <div key={event.id} className="group cursor-pointer">
                    <div className="aspect-video rounded-[2rem] overflow-hidden mb-4 shadow-sm">
                      <img 
                        src={event.banner || event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-1">{event.title}</h3>
                    <p className="text-sm text-neutral-400">{event.location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-400 italic">You haven't created any events yet.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;