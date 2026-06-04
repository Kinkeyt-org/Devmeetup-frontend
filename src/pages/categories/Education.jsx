import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, GraduationCap, Users } from "lucide-react";
import EventCard from "../../components/EventCard";
import SEO from "../../components/SEO";

const MOCK_EVENTS = [
  {
    id: "e1",
    title: "Future of EdTech Conference",
    event_date_human: "Wed, Aug 10 • 9:00 AM",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    type: "physical",
  },
  {
    id: "e2",
    title: "Global Student Symposium",
    event_date_human: "Fri, Sep 16 • 10:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    type: "virtual",
  },
  {
    id: "e3",
    title: "Ivy League Admissions Workshop",
    event_date_human: "Sat, Oct 08 • 2:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    type: "physical",
  },
  {
    id: "e4",
    title: "Machine Learning for Researchers",
    event_date_human: "Mon, Nov 14 • 1:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    type: "virtual",
  },
  {
    id: "e5",
    title: "Higher Ed Leadership Summit",
    event_date_human: "Thu, Dec 01 • 9:30 AM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    type: "physical",
  },
  {
    id: "e6",
    title: "Language Learning Mastery",
    event_date_human: "Tue, Jan 17 • 6:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    type: "virtual",
  }
];

export default function Education() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      <SEO 
        title="Education Events" 
        description="Discover educational events, academic workshops, language learning meetups, and student research seminars." 
        url="https://devmeetup-frontend.vercel.app/categories/education"
        keywords="education events, academic seminars, edtech conference, workshops, learning"
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
          src="https://images.pexels.com/photos/6193147/pexels-photo-6193147.jpeg"
          alt="Education banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-[#111111] dark:via-[#111111]/80 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">Education</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <GraduationCap size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">1.2K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">12K</strong> Students</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Expand your horizons, learn new skills, and connect with fellow learners through our curated educational workshops and seminars.
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
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Education Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
