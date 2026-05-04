import React, { useEffect, useState, useRef, useCallback } from "react";
import { getEvents } from "../api/event";
import { Helmet } from "react-helmet-async";
import EventCard from "../components/EventCard";
import EventSkeleton from "../components/EventSkeleton";
import {
  Cpu,
  Palette,
  Briefcase,
  Wrench,
  Smile,
  Music as MusicIcon,
  GraduationCap,
  Heart,
  Users as UsersIcon
} from "lucide-react";

const CATEGORIES = [
  { name: "Technology", icon: Cpu },
  { name: "Design", icon: Palette },
  { name: "Business", icon: Briefcase },
  { name: "Workshops", icon: Wrench },
  { name: "Lifestyle", icon: Smile },
  { name: "Music", icon: MusicIcon },
  { name: "Education", icon: GraduationCap },
  { name: "Health", icon: Heart },
  { name: "Social", icon: UsersIcon },
];

/* ================= PAGE ================= */
const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [filter, setFilter] = useState("all");


  /* ================= FETCH EVENTS ================= */
  const fetchEvents = async (isNewFilter = false) => {
    if (isNewFilter) {
      setLoading(true);
    }

    try {
      const options = filter !== "all" ? { category: filter } : {};
      const data = await getEvents("upcoming", 1, 20, options);
      // Update state with fetched events
      let newEvents = Array.isArray(data.events) ? data.events : [];

      // Fallback: If backend ignored category parameter, perform local filtering
      if (filter !== "all") {
        const isBackendFiltering = newEvents.length === 0 || newEvents.every(e => 
          (e.category && e.category.toLowerCase() === filter.toLowerCase()) || 
          (e.tags && (typeof e.tags === 'string' ? e.tags.toLowerCase().includes(filter.toLowerCase()) : e.tags.includes(filter)))
        );
        
        if (!isBackendFiltering) {
          newEvents = newEvents.filter(e => {
            const titleMatch = e.title?.toLowerCase().includes(filter.toLowerCase());
            const descMatch = e.description?.toLowerCase().includes(filter.toLowerCase());
            const catMatch = e.category?.toLowerCase() === filter.toLowerCase();
            const tagMatch = e.tags && (typeof e.tags === 'string' ? e.tags.toLowerCase().includes(filter.toLowerCase()) : e.tags.includes(filter));
            return titleMatch || descMatch || catMatch || tagMatch;
          });
        }
      }

      setEvents(newEvents.slice(0, 9));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= TRIGGER FETCH ON PAGE/FILTER CHANGE ================= */
  useEffect(() => {
    fetchEvents(true);
  }, [filter]);



  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 font-sans pb-20">

      {/* SEO */}
      <Helmet>
        <title>DevMeetup | Upcoming Events Near You</title>
        <meta
          name="description"
          content="Discover and book upcoming events near you. Explore a wide range of experiences, from tech meetups to workshops, happening soon in your area."
        />
        <link rel="canonical" href="https://devmeetup-frontend.vercel.app/events" />

        {/* Open Graph */}
        <meta property="og:title" content="Upcoming Events | Explore Events Near You" />
        <meta
          property="og:description"
          content="Discover and book upcoming events near you. Explore a wide range of experiences, from tech meetups to workshops, happening soon in your area."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devmeetup-frontend.vercel.app/events" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
        />
      </Helmet>

      {/* HERO */}
      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Upcoming Events</h2>

          <p className="text-neutral-400 text-sm md:text-base mb-3">
            Discover experiences happening soon near you.
          </p>
        </div>
      </section>

      {/* EVENTS */}
      <section>
        <div className="max-w-7xl mx-auto px-6">
          {/* 3x3 HORIZONTAL GRID (LIMITED TO 9) */}
          <div className="grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="w-[280px] sm:w-[350px] md:w-[400px] shrink-0"
              >
                <EventCard event={event} />
              </div>
            ))}

            {/* INITIAL LOADING SKELETONS */}
            {loading &&
              Array.from({ length: 9 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="w-[280px] sm:w-[350px] md:w-[400px] shrink-0">
                  <EventSkeleton />
                </div>
              ))}
          </div>

          {/* EMPTY STATE */}
          {!loading && events.length === 0 && (
            <div className="text-center py-20 text-neutral-500 border border-dashed rounded-4xl border-neutral-200 dark:border-neutral-800">
              <p className="text-sm">No events found matching this filter.</p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 text-xs text-black dark:text-white underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-20 border-t border-neutral-100 dark:border-white/5 pt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Browse by Category</h2>
            <p className="text-neutral-500 text-sm">Find events that match your interests.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setFilter(filter === cat.name ? "all" : cat.name)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition group ${
                    filter === cat.name 
                      ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-white/10" 
                      : "border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <Icon size={20} className="text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <span className={`text-xs font-medium ${
                    filter === cat.name ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;