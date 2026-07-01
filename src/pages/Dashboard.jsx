import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Compass,
  TrendingUp,
  MapPin,
} from "lucide-react";

import { getEvents } from "../api/event";
import EventCard from "../components/EventCard";
import EventSkeleton from "../components/EventSkeleton";

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
        // Fetch up to 9 events for a clean row balance matching EventsPage layout
        const data = await getEvents("recent", 1, 9);
        const eventsList = Array.isArray(data.events) ? data.events : [];
        setEvents(eventsList.slice(0, 9));
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
      const channel = window.Echo.channel("events");
      
      channel.listen(".event.created", (data) => {
        console.log("New Event Data Received:", data.event);
        const newEvent = data.event;
        if (newEvent) {
          setEvents((prevEvents) => {
            if (prevEvents.some((e) => e.id === newEvent.id)) {
              return prevEvents;
            }
            const updated = [newEvent, ...prevEvents];
            return updated.slice(0, 9);
          });
        }
      });

      return () => {
        channel.stopListening(".event.created");
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
          const data = await getEvents("upcoming", 1, 9, {
            lat: latitude,
            lng: longitude,
          });
          const fetchedEvents = Array.isArray(data.events) ? data.events : [];
          setNearbyEvents(fetchedEvents.slice(0, 9));
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

      <main className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 font-sans pb-20">

        {/* HERO SECTION */}
        <section className="pt-24 md:pt-28 pb-10">
          <div className="max-w-6xl mx-auto px-6">
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

            <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-sm md:text-base max-w-md">
              Discover events, connect with people, and explore what's happening.
            </p>
          </div>
        </section>

        {/* CONTENT SECTIONS CONTAINER */}
        <div className="space-y-16">

          {/* EVENTS NEAR YOU */}
          <section>
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                  <Compass size={22} />Events Near You
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                  Discover what's happening around you.
                </p>
              </div>

              {locationStatus === "idle" || locationStatus === "error" ? (
                <div className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-10 text-center max-w-7xl mx-auto">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mx-auto mb-4">
                    <MapPin size={20} className="text-neutral-400" />
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
                    {locationStatus === "error"
                      ? "Could not access location. Please check your permissions."
                      : "Enable location to see events in your area."}
                  </p>
                  <button
                    onClick={handleFindNearbyEvents}
                    className="px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-90 transition"
                  >
                    Find events near me
                  </button>
                </div>
              ) : (
                <>
                  {/* Empty State */}
                  {!loadingNearby && nearbyEvents.length === 0 && locationStatus === "success" && (
                    <div className="text-center py-16 text-neutral-500 border border-dashed rounded-3xl border-neutral-200 dark:border-neutral-800">
                      <p className="text-sm">No upcoming events found near your location.</p>
                    </div>
                  )}

                  {/* Mobile View: Horizontal Swipe */}
                  {(nearbyEvents.length > 0 || loadingNearby) && (
                    <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {nearbyEvents.map((event) => (
                        <div key={event.id} className="w-[280px] sm:w-[350px] shrink-0">
                          <EventCard event={event} />
                        </div>
                      ))}
                      
                      {loadingNearby &&
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={`nearby-skeleton-mob-${i}`} className="w-[280px] sm:w-[350px] shrink-0">
                            <EventSkeleton />
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Desktop View: Swipeable grid layout */}
                  {(nearbyEvents.length > 0 || loadingNearby) && (
                    <div className="hidden md:grid md:grid-rows-2 md:grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {nearbyEvents.map((event) => (
                        <div key={event.id} className="w-[320px] lg:w-[360px] shrink-0">
                          <EventCard event={event} />
                        </div>
                      ))}

                      {loadingNearby &&
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={`nearby-skeleton-desk-${i}`} className="w-[320px] lg:w-[360px] shrink-0">
                            <EventSkeleton />
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* TRENDING SECTION */}
          <section>
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                  <TrendingUp size={22} />Trending
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                  What's popular around you.
                </p>
              </div>

              {/* Empty State */}
              {!loadingEvents && events.length === 0 && (
                <div className="text-center py-16 text-neutral-500 border border-dashed rounded-3xl border-neutral-200 dark:border-neutral-800">
                  <p className="text-sm">No trending events found</p>
                </div>
              )}

              {/* Mobile View: Horizontal Swipe */}
              <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                {events.map((event) => (
                  <div key={event.id} className="w-[280px] sm:w-[350px] shrink-0">
                    <EventCard event={event} />
                  </div>
                ))}

                {loadingEvents &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={`trending-skeleton-mob-${i}`} className="w-[280px] sm:w-[350px] shrink-0">
                      <EventSkeleton />
                    </div>
                  ))}
              </div>

              {/* Desktop View: Swipeable grid layout */}
              <div className="hidden md:grid md:grid-rows-2 md:grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                {events.map((event) => (
                  <div key={event.id} className="w-[320px] lg:w-[360px] shrink-0">
                    <EventCard event={event} />
                  </div>
                ))}

                {loadingEvents &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={`trending-skeleton-desk-${i}`} className="w-[320px] lg:w-[360px] shrink-0">
                      <EventSkeleton />
                    </div>
                  ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default Dashboard;