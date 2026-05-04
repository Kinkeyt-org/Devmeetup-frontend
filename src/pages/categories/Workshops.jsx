import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Wrench, Users } from "lucide-react";
import EventCard from "../../components/EventCard";

const MOCK_EVENTS = [
  {
    id: "w1",
    title: "Pottery & Ceramics Workshop",
    event_date_human: "Sat, Jul 09 • 11:00 AM",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    type: "physical",
  },
  {
    id: "w2",
    title: "Web Development Bootcamp",
    event_date_human: "Mon, Jul 18 • 6:00 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    type: "virtual",
  },
  {
    id: "w3",
    title: "DIY Furniture Building",
    event_date_human: "Sat, Aug 13 • 9:00 AM",
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1505063098288-fa901f4a485a?w=800&q=80",
    type: "physical",
  },
  {
    id: "w4",
    title: "Advanced Photography Lighting",
    event_date_human: "Sun, Sep 04 • 2:00 PM",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    type: "physical",
  },
  {
    id: "w5",
    title: "Creative Writing Intensive",
    event_date_human: "Thu, Oct 27 • 6:30 PM",
    location: "Online",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=800&q=80",
    type: "virtual",
  },
  {
    id: "w6",
    title: "Culinary Skills: Knife Work",
    event_date_human: "Tue, Nov 15 • 7:00 PM",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80",
    type: "physical",
  }
];

export default function Workshops() {
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Workshops banner"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent flex flex-col justify-end px-5 pb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Workshops</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300 font-medium mb-4">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Wrench size={14} />
                <span>5K Events</span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Users size={14} />
                <span>40K Learners</span>
              </div>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm mb-6 max-w-[280px] sm:max-w-sm">
              Level up your skills with hands-on workshops, training sessions, and interactive masterclasses.
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
              Workshops
            </h1>
            <div className="flex items-center gap-6 text-sm lg:text-base text-neutral-600 dark:text-neutral-400 font-medium mb-8">
              <div className="flex items-center gap-2">
                <Wrench size={20} />
                <span><strong className="text-neutral-900 dark:text-white">5K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span><strong className="text-neutral-900 dark:text-white">40K</strong> Learners</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-10 leading-relaxed">
              Level up your skills with hands-on workshops, intensive training sessions, and interactive masterclasses led by experts.
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
              <div className="w-12 h-12 rounded-xl bg-orange-600/20 border border-orange-500/20 flex items-center justify-center text-orange-500 z-10">
                <Wrench size={24} />
              </div>

              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                    alt="Hands-on Workshop"
                    className="w-full h-full object-cover mix-blend-overlay opacity-90"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                    alt="Hands-on Workshop"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)" }}
                  />
                </div>
              </div>

              {/* Vertical Text */}
              <div className="absolute right-6 top-8 bottom-8 w-6 flex flex-col items-center justify-between text-[10px] font-bold tracking-widest text-neutral-600 uppercase z-10" style={{ writingMode: "vertical-rl" }}>
                SKILLS • DIY • MASTERCLASS • TRAINING • HANDS-ON
              </div>

              {/* Footer Text */}
              <div className="flex justify-between items-end text-xs font-bold tracking-widest uppercase z-10">
                <span className="text-neutral-600">DISCOVER</span>
                <span className="text-orange-500">WORKSHOPS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular Workshops</h2>
        
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
