import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents } from '../api/event'; // adjust path if needed

const ExploreEvents = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Music', 'Technology', 'Design', 'Business', 'Lifestyle'];

  // 🔥 Fetch real events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter logic
  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter(e => e.category === activeCategory);

  const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-16/10 md:aspect-4/5 bg-neutral-200 rounded-[2.5rem] mb-4"></div>
    
    <div className="flex justify-between items-center px-2">
      <div className="h-3 w-24 bg-neutral-200 rounded-full"></div>
      <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] antialiased">

      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-100 pt-24 pb-4 px-6">
        <div className="max-w-6xl md:pt-10 mx-auto">

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* EVENTS */}
      <section className="max-w-6xl mx-auto py-10 px-6">

        {/* Loading State */}
        {loading && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && (
          <motion.div
            layout
            

            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredEvents.map((event) => (
                <div key={event.id} className="group cursor-pointer">
                  
                  <div className="aspect-[16/10] md:aspect-[4/5] bg-neutral-100 rounded-[2.5rem] mb-4 overflow-hidden relative shadow-sm border border-neutral-100">
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black shadow-sm z-10">
                      {event.price || "Free"}
                    </div>

                    <img
                      src={event.banner || event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
                        {event.location}
                      </p>
                      <h3 className="text-xl font-bold leading-tight tracking-tight">
                        {event.title}
                      </h3>
                    </div>

                  </div>

                  <div className="flex justify-between items-center px-2">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                      {event.category} • {event.date}
                    </p>

                    <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M7 17l9-9M7 8h9v9"/>
                      </svg>
                    </div>
                  </div>

                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ❌ Empty State */}
        {!loading && filteredEvents.length === 0 && (
          <div className="py-40 text-center">
            <h3 className="text-2xl font-bold text-neutral-300 italic">
              No events yet. Create one.
            </h3>
          </div>
        )}

      </section>
    </div>
  );
};

export default ExploreEvents;