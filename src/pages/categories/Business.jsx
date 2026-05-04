import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Briefcase, Users } from "lucide-react";
import EventCard from "../../components/EventCard";

const MOCK_EVENTS = [
  {
    id: "b1",
    title: "Global Entrepreneurship Summit",
    event_date_human: "Sat, Jun 25 • 9:00 AM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=800&q=80",
    type: "physical",
  },
  {
    id: "b2",
    title: "Startup Pitch & Networking",
    event_date_human: "Thu, Jul 14 • 6:30 PM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    type: "physical",
  },
  {
    id: "b3",
    title: "Venture Capital Insider Q&A",
    event_date_human: "Mon, Aug 01 • 1:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    type: "virtual",
  },
  {
    id: "b4",
    title: "Corporate Strategy Masterclass",
    event_date_human: "Wed, Sep 21 • 10:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    type: "virtual",
  },
  {
    id: "b5",
    title: "Fintech Innovators Conference",
    event_date_human: "Fri, Oct 14 • 8:30 AM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    type: "physical",
  },
  {
    id: "b6",
    title: "B2B Marketing Strategies",
    event_date_human: "Tue, Nov 08 • 4:00 PM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80",
    type: "physical",
  }
];

export default function Business() {
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
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Business banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-[#111111]/80 to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6">Business</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Briefcase size={18} className="md:w-5 md:h-5" />
                <span><strong className="text-white">8K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="md:w-5 md:h-5" />
                <span><strong className="text-white">65K</strong> Professionals</span>
              </div>
            </div>
            <p className="text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Discover opportunities, expand your network, and scale your career through exclusive business and entrepreneurship events.
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
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Business Events</h2>
        
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
