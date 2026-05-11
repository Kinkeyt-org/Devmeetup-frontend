import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Smile, Users } from "lucide-react";
import EventCard from "../../components/EventCard";

const MOCK_EVENTS = [
  {
    id: "l1",
    title: "Morning Yoga Retreat",
    event_date_human: "Sat, Jul 02 • 7:00 AM",
    location: "Malibu, CA",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    type: "physical",
  },
  {
    id: "l2",
    title: "Urban Photography Walk",
    event_date_human: "Sun, Jul 10 • 4:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80",
    type: "physical",
  },
  {
    id: "l3",
    title: "Mindfulness & Meditation Online",
    event_date_human: "Wed, Aug 05 • 8:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
    type: "virtual",
  },
  {
    id: "l4",
    title: "Gourmet Cooking Masterclass",
    event_date_human: "Fri, Sep 15 • 6:30 PM",
    location: "Paris, FR",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80",
    type: "physical",
  },
  {
    id: "l5",
    title: "Minimalist Living Workshop",
    event_date_human: "Thu, Oct 20 • 7:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80",
    type: "virtual",
  },
  {
    id: "l6",
    title: "Coffee Tasting Experience",
    event_date_human: "Sat, Nov 12 • 10:00 AM",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    type: "physical",
  }
];

export default function Lifestyle() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
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
          src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lifestyle banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-[#111111] dark:via-[#111111]/80 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">Lifestyle</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Smile size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">12K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">90K</strong> Enthusiasts</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Enrich your daily life with wellness retreats, incredible culinary experiences, culture trips, and mindful gatherings.
            </p>
            <div className="flex flex-row w-full max-w-md shadow-lg rounded-full overflow-hidden border border-neutral-200 dark:border-white/10">
              <input
                type="email"
                placeholder="me@email.com"
                className="flex-1 min-w-0 bg-white/70 dark:bg-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 px-4 py-3 md:px-5 md:py-4 outline-none backdrop-blur-md text-sm md:text-base"
              />
              <button className="shrink-0 bg-black dark:bg-white text-white dark:text-black px-5 py-3 md:px-8 md:py-4 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Lifestyle Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
