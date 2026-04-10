import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, bookEvent } from "../api/event";

const ExploreEvents = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  const categories = ["All", "Tech", "Design", "Business", "Music", "Lifestyle"];

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

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.tags?.includes(activeCategory));

  const handleBook = async (eventId, e) => {
    e.stopPropagation();

    try {
      setBookingId(eventId);
      await bookEvent(eventId);

      // update UI instantly
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventId ? { ...ev, booked: true } : ev
        )
      );
    } catch (err) {
      console.error("Booking failed:", err);
    } finally {
      setBookingId(null);
    }
  };

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="bg-neutral-200 h-40 rounded-xl mb-4"></div>
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-neutral-200 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-neutral-200 rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi']">

      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-100 pt-24 pb-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EVENTS */}
      <section className="max-w-6xl mx-auto py-12 px-6">

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredEvents.map((event) => {
              const isBooking = bookingId === event.id;

              return (
                <div
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white border border-neutral-100 rounded-[2rem] p-5 transition hover:shadow-md">

                    {/* TOP META */}
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                        {event.tags?.[0] || "General"}
                      </p>

                      <span className="text-xs font-bold text-neutral-500">
                        {event.is_free || event.is_free === 1 || event.is_free === "1"
                          ? "Free"
                          : `₦${event.price || 0}`}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-bold tracking-tight leading-snug mb-2 text-[#1d1d1f] group-hover:text-neutral-500 transition">
                      {event.title}
                    </h3>

                    {/* META */}
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                      {event.location} • {event.event_date_human || event.event_date}
                    </p>

                    {/* IMAGE */}
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-5 bg-neutral-100">
                      <img
                        src={event.banner || event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={(e) => handleBook(event.id, e)}
                      disabled={isBooking || event.booked}
                      className={`w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition
                        ${
                          event.booked
                            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                            : "bg-black text-white hover:opacity-90"
                        }`}
                    >
                      {isBooking ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Booking
                        </>
                      ) : event.booked ? (
                        "Booked"
                      ) : (
                        "Book Event"
                      )}
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredEvents.length === 0 && (
          <div className="py-32 text-center text-neutral-300 text-xl font-bold">
            No events found.
          </div>
        )}

      </section>
    </div>
  );
};

export default ExploreEvents;