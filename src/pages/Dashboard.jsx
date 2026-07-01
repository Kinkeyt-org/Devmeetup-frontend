import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import {
  ArrowRight,
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
        // Fetch up to 6 events for a 3x2 grid on desktop
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
              return updated.slice(0, 9); // Keep only the first 12 events
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
                  <>
                    {/* Mobile Skeletons */}
                    <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[280px] sm:w-[350px] shrink-0">
                          <EventSkeleton />
                        </div>
                      ))}
                    </div>
                    {/* Desktop Skeletons */}
                    <div className="hidden md:grid md:grid-rows-2 md:grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[320px] lg:w-[360px] shrink-0">
                          <EventSkeleton />
                        </div>
                      ))}
                    </div>
                  </>
                ) : nearbyEvents.length === 0 ? (
                  <div className="border border-dashed border-neutral-200 dark:border-white/10 rounded-2xl p-10 text-center">
                    <p className="text-neutral-500">
                      No upcoming events found near your location.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Mobile View: Horizontal Swipe */}
                    <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {nearbyEvents.map((event) => (
                        <div key={event.id} className="w-[280px] sm:w-[350px] shrink-0">
                          <EventCard event={event} />
                        </div>
                      ))}
                    </div>
                    {/* Desktop View: Swipeable 2-row × 3-col */}
                    <div className="hidden md:grid md:grid-rows-2 md:grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {nearbyEvents.map((event) => (
                        <div key={event.id} className="w-[320px] lg:w-[360px] shrink-0">
                          <EventCard event={event} />
                        </div>
                      ))}
                    </div>
                  </>
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

                {loadingEvents ? (
                  <>
                    {/* Mobile Skeletons */}
                    <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[280px] sm:w-[350px] shrink-0">
                          <EventSkeleton />
                        </div>
                      ))}
                    </div>
                    {/* Desktop Skeletons */}
                    <div className="hidden md:grid md:grid-rows-2 md:grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[320px] lg:w-[360px] shrink-0">
                          <EventSkeleton />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Mobile View: Horizontal Swipe */}
                    <div className="md:hidden grid grid-rows-3 grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {events.map((event) => (
                        <div key={event.id} className="w-[280px] sm:w-[350px] shrink-0">
                          <EventCard event={event} />
                        </div>
                      ))}
                    </div>
                    {/* Desktop View: Swipeable 2-row × 3-col */}
                    <div className="hidden md:grid md:grid-rows-2 md:grid-flow-col gap-x-6 gap-y-4 overflow-x-auto scrollbar-hide pb-6">
                      {events.map((event) => (
                        <div key={event.id} className="w-[320px] lg:w-[360px] shrink-0">
                          <EventCard event={event} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;