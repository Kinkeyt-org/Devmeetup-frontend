import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, bookEvent } from '../api/event';

const ExploreEvents = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  const categories = ['All', 'Tech', 'Design', 'Business', 'Music', 'Lifestyle'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    activeCategory === 'All'
      ? events
      : events.filter((e) => e.tags?.includes(activeCategory));

  const handleBook = async (eventId, e) => {
    e.stopPropagation();

    try {
      setBookingId(eventId);
      await bookEvent(eventId);

      // Optional UX: update UI instantly
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventId ? { ...ev, booked: true } : ev
        )
      );
    } catch (err) {
      console.error("Booking failed", err);
    } finally {
      setBookingId(null);
    }
  };

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="aspect-4/5 bg-neutral-200 rounded-3xl mb-4"></div>
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
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
                    ? 'bg-black text-white'
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
      <section className="max-w-6xl mx-auto py-12 px-6">

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

                  {/* IMAGE */}
                  <div className="aspect-4/5 bg-neutral-100 rounded-[2.5rem] overflow-hidden relative mb-4">

                    {/* PRICE */}
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black z-10">
                      {event.is_free ? "Free" : `₦${event.price || 0}`}
                    </div>

                    <img
                      src={event.banner || event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-4 left-5 text-white">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-xs opacity-80">{event.location}</p>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="px-1 space-y-3">

                    <p className="text-xs text-neutral-400 uppercase tracking-widest">
                      {event.tags?.[0] || "General"} • {event.event_date_human || event.event_date}
                    </p>

                    {/* BOOK BUTTON */}
                    <button
                      onClick={(e) => handleBook(event.id, e)}
                      disabled={isBooking || event.booked}
                      className={`w-full py-3 rounded-full font-bold text-sm transition flex items-center justify-center gap-2
                        ${
                          event.booked
                            ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                            : 'bg-black text-white hover:scale-[1.02] active:scale-95'
                        }`}
                    >
                      {isBooking ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Booking...
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