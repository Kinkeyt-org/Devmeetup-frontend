import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getEvents, bookEvent } from '../api/event';

const ExploreEvents = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null); // Tracks which event is being booked

  const categories = ['All', 'Tech', 'Design', 'Business', 'Music', 'Lifestyle'];

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

  const handleBookTicket = async (e, eventId) => {
    e.stopPropagation(); // Prevent navigating to details page
    
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { state: { from: "/events" } });
      return;
    }

    setBookingId(eventId);
    try {
      const res = await bookEvent(eventId);
      alert(res.message || "Ticket booked successfully!");
      // Optionally update local state if capacity change needs to be reflected immediately
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Could not complete booking. Please try again.");
    } finally {
      setBookingId(null);
    }
  };

  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter(e => e.tags?.includes(activeCategory));

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="aspect-4/5 bg-neutral-100 rounded-[2.5rem] mb-4"></div>
      <div className="px-2 space-y-2">
        <div className="h-3 w-24 bg-neutral-100 rounded-full"></div>
        <div className="h-6 w-48 bg-neutral-100 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Explore Events | DevMeet</title>
      </Helmet>

      <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi'] antialiased">
        
        {/* PREMIUM STICKY HEADER */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 pt-24 pb-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">Marketplace</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Explore <span className="text-neutral-300">Experiences.</span></h1>
              </div>
              
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-black text-white shadow-lg scale-105'
                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* EVENTS GRID */}
        <section className="max-w-6xl mx-auto py-12 px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode='popLayout'>
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="group cursor-pointer"
                  >
                    {/* IMAGE CONTAINER */}
                    <div className="aspect-4/5 bg-neutral-100 rounded-[2.5rem] mb-5 overflow-hidden relative shadow-sm border border-neutral-50">
                      <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black shadow-sm z-10">
                        {event.is_free ? "FREE" : `₦${Number(event.price).toLocaleString()}`}
                      </div>

                      <img
                        src={event.banner || event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />

                      {/* HOVER OVERLAY WITH BOOKING BUTTON */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <button
                          onClick={(e) => handleBookTicket(e, event.id)}
                          disabled={bookingId === event.id}
                          className="px-8 py-3 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 hover:bg-neutral-100 active:scale-95"
                        >
                          {bookingId === event.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Book Ticket"
                          )}
                        </button>
                      </div>
                      
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* CONTENT */}
                    <div className="px-2">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
                          {event.tags?.[0] || "General"}
                        </p>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                          {event.event_date_human}
                        </p>
                      </div>
                      
                      <h3 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-neutral-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1 line-clamp-1">{event.location}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* EMPTY STATE */}
          {!loading && filteredEvents.length === 0 && (
            <div className="py-40 text-center">
              <h3 className="text-3xl font-bold text-neutral-200 italic tracking-tight">
                No events found in {activeCategory}.
              </h3>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ExploreEvents;