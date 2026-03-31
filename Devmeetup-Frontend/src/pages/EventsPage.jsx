import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEvents, bookEvent } from '../api/event'; // Adjust path to your event.js

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 font-['Satoshi']">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-black">
          Upcoming Events <span className="text-gray-400 font-normal ml-2">({events.length})</span>
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {events.map((event, index) => {
          // Logic for Bento Variety: 1st and 4th items are large
          const isLarge = index === 0 || index === 4;
          const isWide = index === 3 || index === 7;

          return (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-500 ${
                isLarge ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : "col-span-1"
              }`}
            >
              {/* Event Badge (Type) */}
              <div className="absolute top-5 left-5 z-20">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  event.location?.toLowerCase().includes('http') 
                  ? "bg-blue-50 text-blue-600" 
                  : "bg-black text-white"
                }`}>
                  {event.location?.toLowerCase().includes('http') ? "Virtual" : "Physical"}
                </span>
              </div>

              {/* Card Content */}
              <div className="h-full flex flex-col p-8">
                <div className="flex-1">
                  <p className="text-amber-500 font-bold text-sm mb-2">{event.date}</p>
                  <h3 className={`font-bold text-black leading-tight mb-3 ${isLarge ? "text-4xl" : "text-xl"}`}>
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Location</span>
                    <span className="text-sm font-bold text-black truncate max-w-37.5">
                      {event.location}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => bookEvent(event.id)}
                    className="p-3 bg-gray-50 group-hover:bg-amber-400 rounded-2xl transition-colors"
                  >
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Overlay Decoration */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full -mr-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsPage;