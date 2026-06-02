import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Calendar, Users } from "lucide-react";
import EventCard from "../../components/EventCard";
import SEO from "../../components/SEO";

const MOCK_EVENTS = [
  {
    id: "m1",
    title: "AI & Machine Learning Summit 2024",
    event_date_human: "Sat, Jun 15 • 10:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "physical",
  },
  {
    id: "m2",
    title: "React Developer Conference",
    event_date_human: "Wed, Jul 10 • 9:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    type: "virtual",
  },
  {
    id: "m3",
    title: "Web3 Hackathon: Building the Future",
    event_date_human: "Fri, Aug 05 • 6:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    type: "physical",
  },
  {
    id: "m4",
    title: "Cybersecurity Best Practices Workshop",
    event_date_human: "Mon, Sep 12 • 2:00 PM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    type: "physical",
  },
  {
    id: "m5",
    title: "Tech Startup Pitch Night",
    event_date_human: "Thu, Oct 20 • 7:00 PM",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    type: "physical",
  },
  {
    id: "m6",
    title: "Cloud Computing Expo",
    event_date_human: "Tue, Nov 15 • 10:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    type: "virtual",
  }
];

export default function Tech() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      <SEO 
        title="Tech Events | DevMeet" 
        description="Discover popular Tech events, workshops, hackathons, and meetups. Join the builder community today." 
        url="https://devmeetup-frontend.vercel.app/categories/tech"
        keywords="tech events, programming, hackathons, developer meetups, software engineering"
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
          src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop"
          alt="Tech banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-[#111111] dark:via-[#111111]/80 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">Tech</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Calendar size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">4K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">38K</strong> Subscribers</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Join a hackathon, jam on product design, and meet fellow tinkerers in the industry of tomorrow.
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
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Tech Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
