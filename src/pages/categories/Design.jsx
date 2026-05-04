import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Palette, Users } from "lucide-react";
import EventCard from "../../components/EventCard";

const MOCK_EVENTS = [
  {
    id: "d1",
    title: "Global UI/UX Summit 2024",
    event_date_human: "Sat, Jun 22 • 10:00 AM",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    type: "physical",
  },
  {
    id: "d2",
    title: "Figma Advanced Masterclass",
    event_date_human: "Wed, Jul 15 • 9:00 AM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    type: "virtual",
  },
  {
    id: "d3",
    title: "The Typography Conference",
    event_date_human: "Fri, Aug 12 • 6:00 PM",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?w=800&q=80",
    type: "physical",
  },
  {
    id: "d4",
    title: "Brand Identity Workshop",
    event_date_human: "Mon, Sep 05 • 2:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    type: "virtual",
  },
  {
    id: "d5",
    title: "Creative Directors Meetup",
    event_date_human: "Thu, Oct 10 • 7:00 PM",
    location: "Berlin, DE",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    type: "physical",
  },
  {
    id: "d6",
    title: "Future of Product Design",
    event_date_human: "Tue, Nov 22 • 10:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1507238692062-5a042e987975?w=800&q=80",
    type: "physical",
  }
];

export default function Design() {
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
          className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full">
        {/* MOBILE HERO (Image Background with Overlay Text) */}
        <div className="md:hidden relative w-full h-[85vh] min-h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
            alt="Design banner"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent flex flex-col justify-end px-5 pb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Design</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300 font-medium mb-4">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Palette size={14} />
                <span>2.5K Events</span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Users size={14} />
                <span>25K Creators</span>
              </div>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm mb-6 max-w-[280px] sm:max-w-sm">
              Connect with fellow creatives, explore the latest UI/UX trends, and elevate your design skills.
            </p>
            <div className="flex flex-col sm:flex-row w-full max-w-[280px] sm:max-w-sm gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="me@email.com"
                className="w-full sm:flex-1 bg-white/10 text-white placeholder-neutral-400 px-4 py-3.5 rounded-full sm:rounded-r-none sm:rounded-l-full outline-none border border-white/10 focus:border-white/30 backdrop-blur-md text-sm"
              />
              <button className="w-full sm:w-auto bg-white text-black px-6 py-3.5 font-semibold rounded-full sm:rounded-l-none sm:rounded-r-full hover:bg-neutral-200 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP HERO */}
        <div className="hidden md:flex max-w-7xl mx-auto px-6 pt-24 pb-16 items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6">
              Design
            </h1>
            <div className="flex items-center gap-6 text-sm lg:text-base text-neutral-600 dark:text-neutral-400 font-medium mb-8">
              <div className="flex items-center gap-2">
                <Palette size={20} />
                <span><strong className="text-neutral-900 dark:text-white">2.5K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span><strong className="text-neutral-900 dark:text-white">25K</strong> Creators</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-10 leading-relaxed">
              Connect with fellow creatives, explore the latest UI/UX trends, and elevate your design skills in the industry's top events.
            </p>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="me@email.com"
                className="flex-1 bg-white dark:bg-white/5 text-neutral-900 dark:text-white placeholder-neutral-500 px-5 py-4 rounded-l-full outline-none border border-neutral-200 dark:border-white/10 focus:border-neutral-300 dark:focus:border-white/30"
              />
              <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-8 py-4 font-semibold rounded-r-full hover:bg-neutral-800 dark:hover:bg-neutral-200">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Image Card */}
          <div className="flex-1 max-w-lg relative">
            <div className="w-full aspect-[4/3] lg:aspect-square bg-neutral-900 rounded-[2rem] p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-500/20 flex items-center justify-center text-pink-500 z-10">
                <Palette size={24} />
              </div>

              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full overflow-hidden bg-gradient-to-br from-pink-500/20 to-indigo-500/20 backdrop-blur-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
                    alt="Design Inspiration"
                    className="w-full h-full object-cover mix-blend-overlay opacity-90"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
                    alt="Design Inspiration"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)" }}
                  />
                </div>
              </div>

              {/* Vertical Text */}
              <div className="absolute right-6 top-8 bottom-8 w-6 flex flex-col items-center justify-between text-[10px] font-bold tracking-widest text-neutral-600 uppercase z-10" style={{ writingMode: "vertical-rl" }}>
                UI/UX • TYPOGRAPHY • BRANDING • FIGMA • GRAPHIC DESIGN
              </div>

              {/* Footer Text */}
              <div className="flex justify-between items-end text-xs font-bold tracking-widest uppercase z-10">
                <span className="text-neutral-600">DISCOVER</span>
                <span className="text-pink-500">DESIGN EVENTS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Design Events</h2>
        
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
      <div className="fixed inset-0 z-[100] flex bg-neutral-50 dark:bg-[#111111]">
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
