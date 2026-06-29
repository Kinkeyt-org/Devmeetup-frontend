import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/event";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { filterUpcomingEvents } from "../lib/utils";

const HERO_IMAGE = "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?q=80&w=2087&auto=format&fit=crop";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [specialEvents, setSpecialEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialLoading, setSpecialLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser)); 

    const fetchEvents = async () => {
      try {
        const data = await getEvents("upcoming", 1); 
        const visibleEvents = filterUpcomingEvents(data.events || []);
        setFeaturedEvents(visibleEvents.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSpecial = async () => {
      try {
        const data = await getEvents();
        const visibleEvents = filterUpcomingEvents(data.events || []);
        setSpecialEvents(visibleEvents.slice(4, 5));
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

  // Dynamic origin calculation to prevent breaking schemas on staging/preview deploys
  const siteUrl = window.location.origin || "https://devmeetup-frontend.vercel.app";

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "name": "Nexus",
        "alternateName": ["Nexus App"],
        "url": siteUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Nexus",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/icon.png`
        }
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#navigation`,
        "name": "Main Navigation",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Explore Events",
            "url": `${siteUrl}/events`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Search Events",
            "url": `${siteUrl}/search`
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Help Center",
            "url": `${siteUrl}/support/help`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO
        title="Nexus - Discover & Host Events and Conferences"
        description="Find and book local tech events, workshops, and conferences on Nexus. Connect with developers and grow your tech community worldwide."
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
                    if (e.key === "Enter" || e.key === " ") navigate(`/events/${specialEvents[0].id}`);
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
                    <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 mb-3 inline-block">
                      Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium">{specialEvents[0].title}</h2>
                    <div className="mt-4 flex gap-3 text-xs text-white/80">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {specialEvents[0].event_date_human}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {specialEvents[0].location}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-120 flex items-center justify-center text-neutral-500">No featured event</div>
              )}
            </div>

            {/* MOBILE IMAGE */}
            <div className="md:hidden rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10">
              <img src={HERO_IMAGE} alt="Event attendees enjoying a meetup" className="h-56 w-full object-cover" />
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="py-12 md:py-20 border-t border-neutral-100 dark:border-white/5" aria-label="Upcoming events">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-medium">Happening soon</h2>
                <p className="text-neutral-500 text-sm mt-1">Discover what's trending around you.</p>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="text-[0.7rem] cursor-pointer px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                View all
              </button>
            </div>

            {loading ? (
              <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-72 md:min-w-0 snap-start rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900 animate-pulse flex-shrink-0"
                  >
                    <div className="h-44 w-full bg-neutral-200 dark:bg-neutral-800" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                      <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                          <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                          <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-2">
                {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    role="link"
                    tabIndex={0}
                    onClick={() => navigate(`/events/${event.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") navigate(`/events/${event.id}`);
                    }}
                    className="group cursor-pointer min-w-72 md:min-w-0 snap-start rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/8 bg-white dark:bg-neutral-900/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex-shrink-0 flex flex-col"
                  >
                    {/* Card image with overlay */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={event.banner || event.image}
                        alt={event.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Category / type badge */}
                      {event.category && (
                        <span className="absolute top-3 left-3 text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20">
                          {event.category}
                        </span>
                      )}
                      {/* Price badge */}
                      <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white">
                        {event.price === 0 || event.price === "0" || !event.price ? "Free" : `$${event.price}`}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-sm leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-amber-500 transition-colors duration-200">
                        {event.title}
                      </h3>

                      <div className="mt-3 space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-amber-500 flex-shrink-0" />
                          <span className="truncate">{event.event_date_human}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={11} className="text-amber-500 flex-shrink-0" />
                          <span className="truncate">
                            {event.location?.length > 28 ? event.location.substring(0, 28) + "…" : event.location}
                          </span>
                        </span>
                      </div>

                      {/* Footer row */}
                      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                          {event.attendees_count ? `${event.attendees_count} going` : "Open"}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-amber-500 group-hover:gap-2 transition-all duration-200">
                          View <ArrowRight size={11} />
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
          <div className="max-w-5xl mx-auto text-center bg-white dark:bg-neutral-950 border shadow-sm rounded-3xl p-10 md:p-20">
            <h2 className="text-3xl md:text-5xl text-black dark:text-white font-medium">Build your community</h2>
            <p className="mt-4 text-black/60 dark:text-white/60 max-w-xl mx-auto">Host events, sell tickets, and grow your audience.</p>
            <button onClick={handleHostEvent} className="mt-8 px-6 py-3 rounded-xl border cursor-pointer border-neutral-200 dark:border-white/5 bg-black text-white dark:bg-white dark:text-black text-sm hover:opacity-90 transition">
              Host an Event
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;