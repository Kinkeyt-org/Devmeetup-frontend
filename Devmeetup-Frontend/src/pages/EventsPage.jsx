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
        console.log("API Response:", response);

        // Since your API already returns array, no need to overcomplicate
        setEvents(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error(error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] pt-16 pb-32 px-4">

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
      <h2 className="text-3xl font-black mb-6">Discover Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No events available</p>
      ) : (
        <div className="space-y-8 max-w-2xl mx-auto">

          {events.map((event) => {
            const isFree =
              event.is_free === 1 ||
              event.is_free === "1" ||
              event.is_free === true;

            const priceLabel = isFree
              ? "Free"
              : `₦${Number(event.price || 0).toLocaleString()}`;

            const image = event.banner || "https://via.placeholder.com/800x400";

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition"
              >

                {/* Header */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold">
                      {event.organizer || "Event Organizer"}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {event.location}
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
                <div className="p-4">

                  <p className="text-xs text-gray-400 font-bold uppercase">
                    {event.event_date_human || event.event_date}
                  </p>

                  <h3 className="text-lg font-bold mt-1">
                    {event.title}
                  </h3>

                  {/* Fake attendees UI (you can connect real later) */}
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

                  {/* Button */}
                  <button
                    onClick={() => handleBookEvent(event.id)}
                    disabled={bookingId === event.id}
                    className="w-full mt-5 py-3 bg-black text-white rounded-xl font-bold text-sm active:scale-[0.98]"
                  >
                    {bookingId === event.id ? "Booking..." : "Get Ticket"}
                  </button>

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