import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Palette, Users } from "lucide-react";
import EventCard from "../../components/EventCard";
import SEO from "../../components/SEO";
import SubscribeForm from "../../components/SubscribeForm";

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
    image: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "physical",
  }
];

export default function Design() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      <SEO 
        title="Design Events" 
        description="Discover creative design events, UI/UX workshops, and typography meetups. Connect with top creators." 
        url="https://devmeetup-frontend.vercel.app/categories/design"
        keywords="design events, UI/UX, product design, creative meetups, graphic design"
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
          src="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Design banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-[#111111] dark:via-[#111111]/80 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">Design</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Palette size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">2.5K</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">25K</strong> Creators</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              Connect with fellow creatives, explore the latest UI/UX trends, and elevate your design skills in the industry's top events.
            </p>
            <SubscribeForm className="max-w-md shadow-lg" />
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
}
