import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents, bookEvent } from '../api/event';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null); // Track which event is being booked
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        showToast("Failed to load events", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleBookEvent = async (eventId) => {
    setBookingId(eventId);
    try {
      const response = await bookEvent(eventId);
      showToast(response.message || "Ticket booked successfully! 🎉");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Booking failed. Try again.";
      showToast(errorMsg, "error");
    } finally {
      setBookingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 font-['Satoshi'] max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl font-bold text-white ${
              toast.type === "error" ? "bg-red-500" : "bg-black"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-black text-black tracking-tight">
          Upcoming Events 
          <span className="text-gray-300 font-medium ml-3 text-xl">({events.length})</span>
        </h2>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">No events found. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
          {events.map((event, index) => {
            const isLarge = index === 0 || index === 4;
            const isWide = index === 3 || index === 7;
            
            // Format price based on backend 'is_free' status
            const priceLabel = event.is_free === 1 || event.is_free === "1" 
              ? "FREE" 
              : `₦${Number(event.price).toLocaleString()}`;

            return (
              <motion.div
                key={event.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative group overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:border-amber-400 transition-all duration-500 flex flex-col ${
                  isLarge ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : "col-span-1"
                }`}
              >
                {/* Banner Image Rendering */}
                {event.banner_url && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={event.banner_url} 
                      alt="" 
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    event.location?.toLowerCase().includes('http') 
                    ? "bg-blue-500 text-white" 
                    : "bg-black text-white"
                  }`}>
                    {event.location?.toLowerCase().includes('http') ? "Virtual" : "Physical"}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-400 text-black shadow-sm">
                    {priceLabel}
                  </span>
                </div>

                {/* Card Body */}
                <div className="relative z-10 flex-1 flex flex-col p-8">
                  <div className="flex-1">
                    <p className="text-amber-600 font-black text-sm mb-3 tracking-tighter uppercase">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className={`font-black text-black leading-[1.1] mb-4 group-hover:text-amber-600 transition-colors ${
                      isLarge ? "text-5xl" : "text-2xl"
                    }`}>
                      {event.title}
                    </h3>
                    <p className={`text-gray-500 font-medium leading-relaxed line-clamp-3 ${isLarge ? "text-lg max-w-md" : "text-sm"}`}>
                      {event.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100/50">
                    <div className="flex flex-col overflow-hidden mr-4">
                      <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Venue</span>
                      <span className="text-sm font-bold text-black truncate italic">
                        {event.location}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleBookEvent(event.id)}
                      disabled={bookingId === event.id}
                      className="relative flex-shrink-0 w-14 h-14 bg-gray-900 group-hover:bg-amber-400 rounded-2xl transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg hover:scale-110 active:scale-95 disabled:bg-gray-200"
                    >
                      {bookingId === event.id ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      ) : (
                        <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsPage;