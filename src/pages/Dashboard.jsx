import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Compass,
  TrendingUp,
} from "lucide-react";

import { getEvents } from "../api/event";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  const [loadingEvents, setLoadingEvents] = useState(true);

  // NEARBY EVENTS STATE
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, loading, success, error

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchEvents = async () => {
      try {
        // Fetch up to 6 events for a 3x2 grid on desktop
        const data = await getEvents("recent", 1, 6);
        const eventsList = Array.isArray(data.events) ? data.events : [];
        setEvents(eventsList.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  /* ================= REAL-TIME EVENTS FEED ================= */
  useEffect(() => {
    if (window.Echo) {
      const channel = window.Echo.channel("events")
        .listen(".event.created", (data) => {
          console.log("New Event Data Received:", data.event);
          const newEvent = data.event;
          if (newEvent) {
            setEvents((prevEvents) => {
              // Avoid duplicate events
              if (prevEvents.some((e) => e.id === newEvent.id)) {
                return prevEvents;
              }
              const updated = [newEvent, ...prevEvents];
              return updated.slice(0, 6); // Keep only the first 6 events
            });
          }
        });

      return () => {
        window.Echo.leaveChannel("events");
      };
    }
  }, []);


  const handleFindNearbyEvents = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");
    setLoadingNearby(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getEvents("upcoming", 1, 6, {
            lat: latitude,
            lng: longitude,
          });
          const fetchedEvents = Array.isArray(data.events) ? data.events : [];
          setNearbyEvents(fetchedEvents.slice(0, 6));
          setLocationStatus("success");
        } catch (err) {
          console.error(err);
          setLocationStatus("error");
        } finally {
          setLoadingNearby(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err.message || err);
        setLocationStatus("error");
        setLoadingNearby(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  }, []);

  useEffect(() => {
    handleFindNearbyEvents();
  }, [handleFindNearbyEvents]);

  return (
    <>
      <SEO
        title="Home"
        description="Nexus is an event discovery and management platform that helps users find, create, and book events, meetups, and networking opportunities around the world."
      />

      <main className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 pb-20">

        {/* HERO */}
        <section className="pt-28 pb-10 px-6">
          <div className="md:max-w-6xl md:mx-auto max-w-full mx-0">

            {/* HERO CONTENT */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div>
                <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {user?.name ? (
                    <>
                      {(() => {
                        const hour = new Date().getHours();
                        if (hour < 12) return "Good morning";
                        if (hour >= 12 && hour < 18) return "Good afternoon";
                        return "Good evening";
                      })()}, {user.name.split(" ")[0]}
                    </>
                  ) : (
                    "Welcome to Nexus"
                  )}
                </h1>

                <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-md">
                  Discover events, connect with people, and explore what's happening.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

            {/* MAIN */}
            <div className="flex-1 space-y-12">

              {/* EVENTS NEAR YOU */}
              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                      <Compass size={20} />Events Near You
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                      Discover what's happening around you.
                    </p>
                  </div>
                </div>

                {locationStatus === "idle" || locationStatus === "error" ? (
                  <div className="border border-dashed border-neutral-200 dark:border-white/10 rounded-2xl p-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                      <MapPin size={20} className="text-neutral-400" />
                    </div>
                    <p className="text-neutral-500 mb-2">
                      {locationStatus === "error"
                        ? "Could not access location. Please check your permissions."
                        : "Enable location to see events in your area."}
                    </p>
                    <button
                      onClick={handleFindNearbyEvents}
                      className="px-5 py-2.5 mt-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm hover:opacity-90 transition"
                    >
                      Find events near me
                    </button>
                  </div>
                ) : locationStatus === "loading" || loadingNearby ? (
                  <div className="grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:grid-cols-2 md:grid-cols-3 sm:grid-rows-none sm:grid-flow-row sm:overflow-x-visible">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-none w-[85vw] sm:w-full h-24 bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse snap-start"
                      />
                    ))}
                  </div>
                ) : nearbyEvents.length === 0 ? (
                  <div className="border border-dashed border-neutral-200 dark:border-white/10 rounded-2xl p-10 text-center">
                    <p className="text-neutral-500">
                      No upcoming events found near your location.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 sm:grid-rows-none sm:grid-flow-row sm:overflow-x-visible">
                    {nearbyEvents.map((event, i) => (
                      <div
                        key={event.id}
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="flex-none w-[80vw] sm:w-full snap-start flex flex-row cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 sm:hover:scale-[1.02] transition"
                      >
                        <img
                          src={event.banner || event.image}
                          alt={event.title}
                          className="h-20 w-20 object-cover shrink-0 rounded-xl m-1"
                        />

                        <div className="p-2 flex-1 flex flex-col justify-center">
                          <p className="text-[10px] text-neutral-500 mb-0.5">
                            {event.event_date_human}
                          </p>
                          <h3 className="font-semibold line-clamp-1 text-sm">
                            {event.title}
                          </h3>
                          <p className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                            <MapPin size={10} className="shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* TRENDING */}
              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                      <TrendingUp size={18} />
                      Trending
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                      What's popular around you.
                    </p>
                  </div>
                </div>

                <div className="grid grid-rows-2 grid-flow-col gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 sm:grid-rows-none sm:grid-flow-row sm:overflow-x-visible">
                  {loadingEvents
                    ? [...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-none w-[85vw] sm:w-full h-24 bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse snap-start"
                      />
                    ))
                    : events.map((event, i) => (
                      <div
                        key={event.id}
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="flex-none w-[80vw] sm:w-full snap-start flex flex-row cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 sm:hover:scale-[1.02] transition"
                      >
                        <img
                          src={event.banner || event.image}
                          alt={event.title}
                          className="h-20 w-20 object-cover shrink-0 rounded-xl m-1"
                        />

                        <div className="p-2 flex-1 flex flex-col justify-center">
                          <p className="text-[10px] text-neutral-500 mb-0.5">
                            {event.event_date_human}
                          </p>
                          <h3 className="font-semibold line-clamp-1 text-sm">
                            {event.title}
                          </h3>
                          <p className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                            <MapPin size={10} className="shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;