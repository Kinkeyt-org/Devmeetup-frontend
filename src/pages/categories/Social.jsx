import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Users } from "lucide-react";
import EventCard from "../../components/EventCard";

const MOCK_EVENTS = [
  {
    id: "s1",
    title: "Singles Mixer & Rooftop Party",
    event_date_human: "Fri, Jul 22 • 8:00 PM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    type: "physical",
  },
  {
    id: "s2",
    title: "Virtual Speed Networking",
    event_date_human: "Tue, Aug 09 • 7:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    type: "virtual",
  },
  {
    id: "s3",
    title: "Board Game Night",
    event_date_human: "Thu, Sep 01 • 6:00 PM",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?w=800&q=80",
    type: "physical",
  },
  {
    id: "s4",
    title: "Global Expats Meetup",
    event_date_human: "Sat, Oct 15 • 5:00 PM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    type: "physical",
  },
  {
    id: "s5",
    title: "Book Club: Fiction Lovers",
    event_date_human: "Sun, Nov 06 • 11:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    type: "virtual",
  },
  {
    id: "s6",
    title: "Holiday Charity Gala",
    event_date_human: "Fri, Dec 16 • 7:30 PM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    type: "physical",
  }
];

export default function Social() {
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
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
          alt="Social banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/80 to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6">Social</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="md:w-5 md:h-5" />
                <span><strong className="text-white">15K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="md:w-5 md:h-5" />
                <span><strong className="text-white">120K</strong> Members</span>
              </div>
            </div>
            <p className="text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Meet new people, find your community, and make lasting memories at exciting social gatherings and mixers.
            </p>
            <div className="flex flex-row w-full max-w-md">
              <input
                type="email"
                placeholder="me@email.com"
                className="flex-1 min-w-0 bg-white/10 text-white placeholder-neutral-400 px-4 py-3 md:px-5 md:py-4 rounded-l-full outline-none border border-white/20 focus:border-white/40 backdrop-blur-md text-sm md:text-base"
              />
              <button className="shrink-0 bg-white text-black px-5 py-3 md:px-8 md:py-4 font-semibold rounded-r-full hover:bg-neutral-200 text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Social Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
