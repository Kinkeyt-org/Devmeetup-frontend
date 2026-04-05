import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents, bookEvent } from '../api/event';
import { MoreHorizontal } from 'lucide-react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(Array.isArray(response) ? response : []);
      } catch (error) {
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
      const res = await bookEvent(eventId, 1);
      showToast(res.message || "Booked!");
    } catch (error) {
      showToast(error.response?.data?.message || "Booking failed", "error");
    } finally {
      setBookingId(null);
    }
  };

  // 🔥 Format date properly
  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    const date = new Date(dateString);
    return date.toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔥 PREMIUM LOADING
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 border-4 border-black border-t-transparent rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-500 text-sm font-medium"
        >
          Loading events...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] pt-20 pb-32 px-4">

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-bold ${
              toast.type === "error" ? "bg-red-500" : "bg-black"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-black">Discover Events</h2>
        <p className="text-gray-400 mt-2">{events.length} events available</p>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No events available</p>
      ) : (
        <div className="max-w-6xl mx-auto">

          {/* 🔥 MOBILE: stacked | DESKTOP: grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => {
              const isFree =
                event.is_free === 1 ||
                event.is_free === "1" ||
                event.is_free === true;

              const priceLabel = isFree
                ? "Free"
                : `₦${Number(event.price || 0).toLocaleString()}`;

              const image = event.banner || "https://via.placeholder.com/800x400";

              const isVirtual = event.location?.startsWith("http");

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >

                  {/* Header */}
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold">
                        {event.organizer || "Event Organizer"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {isVirtual ? "Virtual Event" : event.location}
                      </p>
                    </div>

                    <MoreHorizontal size={20} className="text-gray-400" />
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={image}
                      className="w-full h-full object-cover"
                      alt={event.title}
                    />

                    <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                      {priceLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">

                    <p className="text-xs text-gray-400 font-bold uppercase">
                      {formatDate(event.event_date)}
                    </p>

                    <h3 className="text-lg font-bold mt-1">
                      {event.title}
                    </h3>

                    {/* Attendees UI */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/100?img=${i}`}
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        People attending
                      </span>
                    </div>

                    <div className="flex-1" />

                    {/* Button */}
                    <button
                      onClick={() => handleBookEvent(event.id)}
                      disabled={bookingId === event.id}
                      className="w-full mt-5 py-3 bg-black text-white rounded-xl font-bold text-sm active:scale-[0.98] hover:bg-gray-900 transition"
                    >
                      {bookingId === event.id ? "Booking..." : "Get Ticket"}
                    </button>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;