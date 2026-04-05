import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getEvents, bookEvent } from '../api/event';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const location = useLocation();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const fetchEvents = async (pageNum = 1) => {
    try {
      const response = await getEvents(pageNum);
      const newEvents = response.data || [];

      setEvents(prev => pageNum === 1 ? newEvents : [...prev, ...newEvents]);
      setHasMore(pageNum < response.last_page);
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Failed to load events", "error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Re-fetches fresh every time you navigate to this page
  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchEvents(1);
  }, [location.key]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoadingMore(true);
    fetchEvents(nextPage);
  };

  const handleBookEvent = async (eventId) => {
    setBookingId(eventId);
    try {
      const response = await bookEvent(eventId);
      showToast(response.message || "Ticket booked!");

      // Update is_sold_out locally if capacity-left hits 0
      setEvents(prev =>
        prev.map(e =>
          e.id === eventId && response["capacity-left"] === 0
            ? { ...e, is_sold_out: true }
            : e
        )
      );
    } catch (error) {
      showToast(error.response?.data?.message || "Booking failed", "error");
    } finally {
      setBookingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
      </div>
    );
  }

  return (
    <div className="px-6 py-12 font-['Satoshi'] max-w-7xl mx-auto">

      {/* Toast */}
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

      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-black tracking-tight">Discover Events</h2>
        <p className="text-gray-400 mt-2">
          {events.length} events loaded
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-semibold">
          No events available
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const isFree =
                event.is_free === 1 ||
                event.is_free === "1" ||
                event.is_free === true;

              const priceLabel = isFree
                ? "Free"
                : `₦${Number(event.price || 0).toLocaleString()}`;

              const isVirtual = event.location?.toLowerCase().includes("http");
              const isSoldOut = event.is_sold_out === true;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Banner */}
                  <div className="h-48 w-full bg-gray-100">
                    {event.banner ? (
                      <img
                        src={event.banner}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">

                    {/* Type badge */}
                    <span className={`text-xs font-bold uppercase w-fit px-3 py-1 rounded-full mb-3 ${
                      isVirtual ? "bg-blue-100 text-blue-600" : "bg-gray-900 text-white"
                    }`}>
                      {isVirtual ? "Virtual Event" : "Physical Event"}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-black leading-tight mb-2">
                      {event.title}
                    </h3>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mb-3">
                      {event.event_date_human || event.event_date}
                    </p>

                    {/* Location */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 uppercase mb-1">
                        {isVirtual ? "Link" : "Venue"}
                      </p>
                      <p className="text-sm font-semibold truncate">
                        {event.location}
                      </p>
                    </div>

                    <div className="flex-1" />

                    {/* Ticket section */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="text-lg font-bold">
                          {isSoldOut ? "Sold Out" : priceLabel}
                        </p>
                      </div>

                      <button
                        onClick={() => handleBookEvent(event.id)}
                        disabled={bookingId === event.id || isSoldOut}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                          isSoldOut
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-black text-white hover:bg-amber-400 hover:text-black"
                        }`}
                      >
                        {bookingId === event.id
                          ? "Booking..."
                          : isSoldOut
                          ? "Unavailable"
                          : "Get Ticket"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-10 py-3 bg-black text-white rounded-xl font-bold hover:bg-amber-400 hover:text-black transition disabled:opacity-50"
              >
                {loadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Loading...
                  </div>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;