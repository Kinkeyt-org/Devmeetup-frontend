import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api/event';

const ExploreEvents = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Tech', 'Design', 'Business', 'Music', 'Lifestyle'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    activeCategory === 'All'
      ? events
      : events.filter(e => e.tags?.includes(activeCategory));

  const featured = events[0];
  const trending = filteredEvents.slice(0, 6);

  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="aspect-4/5 bg-neutral-200 rounded-[2.5rem] mb-4" />
      <div className="h-3 w-24 bg-neutral-200 rounded mb-2" />
      <div className="h-4 w-32 bg-neutral-200 rounded" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] antialiased">

      {/* FEATURED HERO */}
      {!loading && featured && (
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-10">
          <div
            onClick={() => navigate(`/events/${featured.id}`)}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer"
          >
            <img
              src={featured.banner || featured.image}
              alt={featured.title}
              className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white max-w-xl">
              <p className="text-xs uppercase tracking-[0.25em] opacity-70 mb-2">
                Featured Event
              </p>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {featured.title}
              </h2>

              <p className="text-sm text-neutral-200 mt-2">
                {featured.location} • {featured.event_date_human || featured.event_date}
              </p>

              <button className="mt-5 px-6 py-3 bg-white text-black rounded-full font-bold">
                Explore
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY BAR */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-neutral-100 pt-20 pb-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
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

      {/* TRENDING SECTION */}
      {!loading && trending.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>

          <div className="flex gap-5 overflow-x-auto no-scrollbar">
            {trending.map(event => (
              <div
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="min-w-[260px] cursor-pointer group"
              >
                <div className="h-[320px] rounded-[2rem] overflow-hidden relative">
                  <img
                    src={event.banner || event.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-bold">{event.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ALL EVENTS GRID */}
      <section className="max-w-6xl mx-auto py-10 px-6">

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-[2.5rem] overflow-hidden h-[380px] shadow-sm">

                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black z-10">
                    {event.is_free ? "Free" : `₦${event.price || 0}`}
                  </div>

                  <img
                    src={event.banner || event.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 px-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">
                    {event.tags?.slice(0, 2).join(' • ') || "General"}
                  </p>

                  <p className="text-[10px] font-bold text-neutral-600">
                    {event.event_date_human || event.event_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredEvents.length === 0 && (
          <div className="py-40 text-center">
            <h3 className="text-2xl font-bold text-neutral-300">
              No events found
            </h3>
          </div>
        )}

      </section>
    </div>
  );
};

export default ExploreEvents;