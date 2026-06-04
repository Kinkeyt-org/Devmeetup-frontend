import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Heart, Users } from "lucide-react";
import EventCard from "../../components/EventCard";
import SEO from "../../components/SEO";

const MOCK_EVENTS = [
  {
    id: "h1",
    title: "Global Wellness Summit",
    event_date_human: "Sat, Aug 20 • 8:00 AM",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    type: "physical",
  },
  {
    id: "h2",
    title: "Mental Health First Aid",
    event_date_human: "Mon, Sep 12 • 1:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1544027993-37dbd58eae8e?w=800&q=80",
    type: "virtual",
  },
  {
    id: "h3",
    title: "Nutrition & Dietetics Expo",
    event_date_human: "Fri, Oct 07 • 10:00 AM",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    type: "physical",
  },
  {
    id: "h4",
    title: "Yoga Instructor Training",
    event_date_human: "Sat, Nov 05 • 7:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    type: "virtual",
  },
  {
    id: "h5",
    title: "Medical Tech Innovations",
    event_date_human: "Wed, Dec 14 • 9:00 AM",
    location: "San Diego, CA",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    type: "physical",
  },
  {
    id: "h6",
    title: "Holistic Healing Workshop",
    event_date_human: "Sun, Jan 22 • 2:00 PM",
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    type: "physical",
  }
];

export default function Health() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      <SEO 
        title="Health & Wellness Events | Nexus" 
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
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Health Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
