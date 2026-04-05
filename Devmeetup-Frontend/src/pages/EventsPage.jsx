import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents, bookEvent } from '../api/event';
import { MoreHorizontal } from 'lucide-react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // 🔥 FETCH EVENTS WITH PAGINATION
  const fetchEvents = async (pageNumber = 1) => {
    try {
      const response = await getEvents(pageNumber);

      console.log("Full API Response:", response);

      const newEvents = response?.data || [];

      setEvents(prev =>
        pageNumber === 1 ? newEvents : [...prev, ...newEvents]
      );

      // pagination check
      if (response?.meta) {
        setHasMore(response.meta.current_page < response.meta.last_page);
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.error(error);
      showToast("Failed to load events", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchEvents(nextPage);
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
        <div className="animate-spin h-10 w-10 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] pt-15 pb-32">

      {/* TOAST */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-bold shadow-xl z-50 ${
              toast.type === "error" ? "bg-red-500" : "bg-black"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-4 space-y-8">

        {events.map((event) => {
          const isFree =
            event.is_free === 1 ||
            event.is_free === "1" ||
            event.is_free === true;

          const priceLabel = isFree
            ? "Free"
            : `₦${Number(event.price || 0).toLocaleString()}`;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* HEADER */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {event.organizer_name || "Organizer"}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {event.location}
                  </p>
                </div>

                <MoreHorizontal size={20} className="text-gray-400" />
              </div>

              {/* IMAGE */}
              <div className="aspect-video bg-gray-100">
                {event.banner ? (
                  <img
                    src={event.banner}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <p className="text-xs font-bold text-black/50 uppercase">
                  {event.event_date_human || event.event_date}
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {event.title}
                </h3>

                <button
                  onClick={() => handleBookEvent(event.id)}
                  disabled={bookingId === event.id}
                  className="w-full mt-5 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-amber-400 hover:text-black transition-all"
                >
                  {bookingId === event.id ? "Booking..." : priceLabel}
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* LOAD MORE */}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="w-full py-3 bg-gray-100 rounded-xl font-bold"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default EventsPage;