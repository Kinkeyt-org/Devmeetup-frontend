import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Music as MusicIcon, Users } from "lucide-react";
import EventCard from "../../components/EventCard";

const MOCK_EVENTS = [
  {
    id: "m1",
    title: "Summer Electronic Festival",
    event_date_human: "Fri, Jul 28 • 5:00 PM",
    location: "Las Vegas, NV",
    image: "https://images.unsplash.com/photo-1540039155732-68b209e51c8a?w=800&q=80",
    type: "physical",
  },
  {
    id: "m2",
    title: "Intimate Acoustic Sessions",
    event_date_human: "Sun, Aug 14 • 7:00 PM",
    location: "Nashville, TN",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    type: "physical",
  },
  {
    id: "m3",
    title: "Music Production Masterclass",
    event_date_human: "Wed, Sep 07 • 6:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    type: "virtual",
  },
  {
    id: "m4",
    title: "Jazz Night Under The Stars",
    event_date_human: "Sat, Oct 15 • 8:00 PM",
    location: "New Orleans, LA",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    type: "physical",
  },
  {
    id: "m5",
    title: "Global Choir Performance",
    event_date_human: "Sun, Nov 20 • 3:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    type: "virtual",
  },
  {
    id: "m6",
    title: "Indie Rock Showcase",
    event_date_human: "Fri, Dec 09 • 9:00 PM",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    type: "physical",
  }
];

export default function Music() {
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = !!location.state?.backgroundLocation;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModal]);

  const handleClose = () => {
    navigate(-1);
  };

  const content = (
    <div className="w-full h-full flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      {/* Modal Close Button */}
      {isModal && (
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-60 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Music banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/80 to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6">Music</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <MusicIcon size={18} className="md:w-5 md:h-5" />
                <span><strong className="text-white">20K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="md:w-5 md:h-5" />
                <span><strong className="text-white">150K</strong> Fans</span>
              </div>
            </div>
            <p className="text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Feel the rhythm at live concerts, intimate acoustic sessions, and massive electronic festivals around the globe.
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
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Music Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-100 flex bg-neutral-50 dark:bg-[#111111]">
        <div className="w-full h-full relative">
          {content}
        </div>
      </div>
    );
  }

  // Regular Page Rendering
  return (
    <div className="min-h-screen pt-16">
      {content}
    </div>
  );
}
