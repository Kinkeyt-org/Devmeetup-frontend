import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/event";
import { ArrowRight, Calendar, MapPin, Navigation } from "lucide-react";
import { useLocation } from "../hooks/useLocation";
import Map from "../components/Map";

const HERO_IMAGE = "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=2087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [specialEvents, setSpecialEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialLoading, setSpecialLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser)); // Load user from localStorage on mount

    const fetchEvents = async () => {
      try {
        const data = await getEvents("upcoming", 1); // Fetch first page of upcoming events for homepage
        setFeaturedEvents(data.events.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSpecial = async () => {
      try {
        const data = await getEvents();
        setSpecialEvents(data.events.slice(4, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setSpecialLoading(false);
      }
    };

    fetchEvents();
    fetchSpecial();
  }, []);

  const handleHostEvent = () => {
    if (!user) return navigate("/login");
    if (user.role !== "organizer") return navigate("/become-organizer");
    navigate("/events/create");
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://devmeetup-frontend.vercel.app/#website",
        "name": "Nexus",
        "alternateName": ["Nexus", "Nexus App"],
        "url": "https://devmeetup-frontend.vercel.app",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://devmeetup-frontend.vercel.app/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://devmeetup-frontend.vercel.app/#organization",
        "name": "Nexus",
        "url": "https://devmeetup-frontend.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://devmeetup-frontend.vercel.app/icon.png"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://devmeetup-frontend.vercel.app/#navigation",
        "name": "Main Navigation",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Explore Events",
            "url": "https://devmeetup-frontend.vercel.app/events"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Search Events",
            "url": "https://devmeetup-frontend.vercel.app/search"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Help Center",
            "url": "https://devmeetup-frontend.vercel.app/support/help"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Terms & Privacy",
            "url": "https://devmeetup-frontend.vercel.app/support/terms"
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Home" 
        description="Discover events, connect with people, and host unforgettable moments happening around you." 
        schema={homeSchema}
      />

      <main className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden" role="main">

        {/* HERO */}
        <section className="relative pt-28 md:pt-40 pb-16 md:pb-24" aria-label="Hero section">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
                Discover events<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                  that move you.
                </span>
              </h1>

              <p className="mt-5 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0">
                Find experiences, connect with people, and host unforgettable moments.
              </p>

              <div className="mt-6 flex justify-center lg:justify-start">
              </div>
            </div>

            {/* RIGHT DESKTOP FEATURE */}
            <div className="hidden md:block relative rounded-3xl overflow-hidden border border-white/10 shadow-xl">
              {specialLoading ? (
                <div className="h-120 bg-neutral-900 animate-pulse" />
              ) : specialEvents.length > 0 ? (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`View featured event: ${specialEvents[0].title}`}
                  onClick={() => navigate(`/events/${specialEvents[0].id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/events/${specialEvents[0].id}`);
                    }
                  }}
                  className="cursor-pointer group relative"
                >
                  <img
                    src={specialEvents[0].banner || specialEvents[0].image}
                    alt={`Featured event banner for ${specialEvents[0].title}`}
                    className="h-120 w-full object-cover group-hover:scale-105 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 p-8 text-white">
                    <div className="flex gap-2 mb-3">
                      <span className="text-[10px] px-3 py-1 rounded-full bg-white/10">
                        Featured
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-medium">
                      {specialEvents[0].title}
                    </h2>

                    <div className="mt-4 flex gap-3 text-xs text-white/80">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {specialEvents[0].event_date_human}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {specialEvents[0].location}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-120 flex items-center justify-center text-neutral-500">
                  No featured event
                </div>
              )}
            </div>

            {/* MOBILE IMAGE */}
            <div className="md:hidden rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10">
              <img src={HERO_IMAGE} alt="Event attendees enjoying a meetup" className="h-56 w-full object-cover" />
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="py-12 md:py-20 border-t border-neutral-100 dark:border-white/5" aria-label="Upcoming events">
          <div className="max-w-7xl mx-auto px-6">

            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-medium">
                  Happening soon
                </h2>
                <p className="text-neutral-500 text-sm mt-1">
                  Discover what's trending around you.
                </p>
              </div>

              <button
                onClick={() => navigate("/events")}
                aria-label="View all upcoming events"
                className="text-[0.7rem] cursor-pointer px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                View all
              </button>
            </div>

            {loading ? (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-65 h-50 rounded-2xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-2">
                {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    role="link"
                    tabIndex={0}
                    aria-label={`View event details for ${event.title}`}
                    onClick={() => navigate(`/events/${event.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate(`/events/${event.id}`);
                      }
                    }}
                    className="cursor-pointer min-w-65 md:min-w-0 snap-start rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 hover:scale-[1.02] transition"
                  >
                    <img
                      src={event.banner || event.image}
                      alt={`Event banner for ${event.title}`}
                      className="h-25 md:h-30 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-medium">{event.title}</h3>

                      <div className="text-xs text-neutral-500 mt-2 flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {event.event_date_human}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {event.location.length > 20 ? event.location.substring(0, 20) + "..." : event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6" aria-label="Call to action">
          <div className="max-w-5xl mx-auto text-center bg-white dark:bg-neutral-950 border shadow-sm text-white rounded-3xl p-10 md:p-20">
            <h2 className="text-3xl md:text-5xl text-black dark:text-white font-medium">
              Build your community
            </h2>
            <p className="mt-4 text-black/60 dark:text-white/60 max-w-xl mx-auto">
              Host events, sell tickets, and grow your audience.
            </p>

            <button
              onClick={handleHostEvent}
              aria-label="Start hosting an event"
              className="mt-8 px-3 py-3 rounded-xl border cursor-pointer border-neutral-200 dark:border-white/5 bg-white text-black text-sm hover:opacity-90 transition"
            >
              Host an Event
            </button>
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;