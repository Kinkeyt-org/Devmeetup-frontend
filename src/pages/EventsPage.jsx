import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEvents } from "../api/event";
import SEO from "../components/SEO";
import EventCard from "../components/EventCard";
import EventSkeleton from "../components/EventSkeleton";
import { Badge } from "../components/ui/badge";
// import FeaturedSlider from "../components/FeaturedSlider";
import {
  Cpu,
  Palette,
  Briefcase,
  Smile,
  Music as MusicIcon,
  GraduationCap,
  Heart,
  Users as UsersIcon,
  MapPin
} from "lucide-react";

const CATEGORIES = [
  { name: "Technology", path: "tech", icon: Cpu },
  { name: "Design", path: "design", icon: Palette },
  { name: "Business", path: "business", icon: Briefcase },
  { name: "Lifestyle", path: "lifestyle", icon: Smile },
  { name: "Music", path: "music", icon: MusicIcon },
  { name: "Education", path: "education", icon: GraduationCap },
  { name: "Health", path: "health", icon: Heart },
  { name: "Social", path: "social", icon: UsersIcon },
];

/* ================= PAGE ================= */
// EventsPage handles displaying the list of upcoming events and a category browser.
const EventsPage = () => {
  // state to hold the list of events returned from the API
  const [events, setEvents] = useState([]);
  // state to track if we are currently fetching data (used to show skeletons)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // FILTER STATE
  const [filter, setFilter] = useState("all");


  /* ================= FETCH EVENTS ================= */
  // This function hits the backend API to grab the latest upcoming events.
  const fetchEvents = async (isNewFilter = false) => {
    if (isNewFilter) {
      setLoading(true); // show skeletons if we are loading fresh data
    }

    try {
      // Fetch upcoming events from the API (page 1, up to 9 events)
      const data = await getEvents("upcoming", 1, 9);

      // Ensure the response is an array before setting it in state to prevent crashes
      const newEvents = Array.isArray(data.events) ? data.events : [];
      setEvents(newEvents.slice(0, 9)); // keep only the first 9
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // turn off loading skeletons once data is fetched (or if it fails)
    }
  };

  /* ================= TRIGGER FETCH ON PAGE/FILTER CHANGE ================= */
  // The useEffect hook runs when the component first loads, or whenever the 'filter' changes.
  useEffect(() => {
    fetchEvents(true);
  }, [filter]);

  /* ================= REAL-TIME EVENT UPDATES ================= */
  // Listen for newly created events via Laravel Echo / Pusher
  useEffect(() => {
    if (window.Echo) {
      const channel = window.Echo.channel("events")
        .listen(".event.created", (data) => {
          const newEvent = data.event;
          if (newEvent) {
            setEvents((prevEvents) => {
              // Avoid duplicate events
              if (prevEvents.some((e) => e.id === newEvent.id)) {
                return prevEvents;
              }
              const updated = [newEvent, ...prevEvents];
              return updated.slice(0, 9); // Keep only the first 9 events
            });
          }
        });

      return () => {
        channel.stopListening(".event.created");
      };
    }
  }, []);



  return (
    <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 font-sans pb-20">

      {/* SEO */}
      <SEO
        title="Explore Events"
        description="Discover and book upcoming events near you. Explore a wide range of experiences, from tech meetups to workshops, happening soon in your area."
        url="https://devmeetup-frontend.vercel.app/events"
      />

      {/* FEATURED EVENTS SLIDER
      <FeaturedSlider /> */}

      {/* HERO */}
      <section className="pt-20 md:pt-25 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Upcoming Events</h2>

          <p className="text-neutral-400 text-sm md:text-base mb-3">
            Discover experiences happening soon near you.
          </p>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section>
        <div className="max-w-7xl mx-auto px-6">

          {/* MOBILE VIEW: We use a horizontal scrolling row (overflow-x-auto) so users can swipe through cards on small screens */}
          <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
            {/* Loop through the fetched events and render an EventCard for each one */}
            {events.map((event) => (
              <div
                key={event.id}
                className="w-[280px] sm:w-[350px] shrink-0"
              >
                <EventCard event={event} />
              </div>
            ))}

            {/* MOBILE LOADING SKELETONS */}
            {loading &&
              Array.from({ length: 9 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="w-[280px] sm:w-[350px] shrink-0">
                  <EventSkeleton />
                </div>
              ))}
          </div>

          {/* DESKTOP VIEW: We use a standard 3-column grid layout (md:grid-cols-3) for larger screens */}
          <div className="hidden md:grid md:grid-cols-3 gap-3 pb-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="flex flex-col cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition"
              >
                <img
                  src={event.banner || event.image}
                  alt={event.title}
                  className="h-32 w-full object-cover rounded-t-xl"
                />

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-neutral-500 mb-0.5">
                      {event.event_date_human}
                    </p>
                    <h3 className="font-semibold line-clamp-2 text-sm">
                      {event.title}
                    </h3>
                    <p className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                      <MapPin size={10} className="shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>
                  </div>

                  {/* TAGS */}
                  {(event.tags || event.categories) && (event.tags || event.categories).length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {(event.tags || event.categories).slice(0, 2).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-[8px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 px-1.5 py-0"
                        >
                          {typeof tag === "string" ? tag : tag.name}
                        </Badge>
                      ))}
                      {(event.tags || event.categories).length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-[8px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 px-1.5 py-0"
                        >
                          +{(event.tags || event.categories).length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* DESKTOP LOADING SKELETONS */}
            {loading &&
              Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-[200px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse"
                />
              ))}
          </div>

          {/* EMPTY STATE */}
          {!loading && events.length === 0 && (
            <div className="text-center py-20 text-neutral-500 border border-dashed rounded-4xl border-neutral-200 dark:border-neutral-800">
              <p className="text-sm">No events found </p>
            </div>
          )}

        </div>
      </section>

      {/* CATEGORIES SECTION */}
      {/* This maps over the hardcoded CATEGORIES array to display clickable icons to filter events */}
      <section className="mt-20  border-neutral-100 dark:border-white/5 pt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Browse by Category</h2>
            <p className="text-neutral-500 text-sm">Find events that match your interests.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 ">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/categories/${cat.path}`}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition group"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <Icon size={20} className="text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;