import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Heart, Users } from "lucide-react";
import { getEvents } from "../../api/event";
import EventCard from "../../components/EventCard";
import EventSkeleton from "../../components/EventSkeleton";
import SEO from "../../components/SEO";
import SubscribeForm from "../../components/SubscribeForm";

export default function Health() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents("upcoming", 1, 11, { tag: "Health" });
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (err) {
        console.error("Failed to fetch Health events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      <SEO
        title="Health & Wellness Events"
        description="Discover wellness summits, mental health workshops, nutrition expos, and holistic healing gatherings."
        url="https://devmeetup-frontend.vercel.app/categories/health"
        keywords="health events, wellness summit, mental health workshop, nutrition, holistic healing"
      />
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-60 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all duration-300"
      >
        <X size={24} />
      </button>

      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[500px]">
        <img
          src="https://images.pexels.com/photos/8376307/pexels-photo-8376307.jpeg"
          alt="Health banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-[#111111] dark:via-[#111111]/80 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">Health</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Heart size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">9K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">75K</strong> Enthusiasts</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Focus on your well-being with fitness classes, mental health workshops, and groundbreaking medical symposiums.
            </p>
            <SubscribeForm className="max-w-md shadow-lg" />
          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Health Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <EventSkeleton key={`skeleton-${i}`} />
            ))}

          {!loading && events.length > 0 &&
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>

        {!loading && events.length === 0 && (
          <div className="text-center py-20 text-neutral-500 border border-dashed rounded-4xl border-neutral-200 dark:border-neutral-800">
            <p className="text-sm">No health events found yet. Be the first to create one!</p>
          </div>
        )}
      </section>
    </div>
  );
}
