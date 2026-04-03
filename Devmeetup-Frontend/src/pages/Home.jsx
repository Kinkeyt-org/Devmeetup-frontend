import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Users, ArrowRight, 
  Heart, Share2, Bookmark, MoreHorizontal 
} from 'lucide-react';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Hackathons', 'Workshops', 'Networking', 'Conferences', 'Webinars'];

  const events = [
    { 
      id: 1, 
      title: "Tech Lagos Summit 2026", 
      organizer: "TechForge Africa",
      organizerImg: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      location: "Civic Center, VI", 
      date: "Apr 12", 
      attendees: "1.2k", 
      price: "Free", 
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 2, 
      title: "UI/UX Masterclass: The Apple Aesthetic", 
      organizer: "Design Studio",
      organizerImg: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?w=100&h=100&fit=crop",
      location: "Virtual", 
      date: "Apr 15", 
      attendees: "450", 
      price: "₦15,000", 
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: 3, 
      title: "Startup Pitch Night", 
      organizer: "Enugu Tech Hub",
      organizerImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
      location: "The Hub, Enugu", 
      date: "Apr 18", 
      attendees: "80", 
      price: "Free", 
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" 
    },
  ];

  return (
    <div className="min-h-screen md:hidden bg-white font-['Satoshi'] pt-15 pb-32">
      <div className="max-w-2xl mx-auto px-4 lg:max-w-5xl lg:px-8">
        
        {/* 1. DISCOVER STORIES (IG Style Featured)
        <section className="mb-10 overflow-x-auto no-scrollbar flex gap-5 pb-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-linear-to-tr from-amber-400 to-orange-500">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-200">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                </div>
              </div>
              <span className="text-[11px] font-medium text-gray-500">Host_{i}</span>
            </div>
          ))}
        </section> */}

        {/* 2. CATEGORY SELECTOR (Twitter Style Pills) */}
        <div className="sticky top-14 z-30 bg-white backdrop-blur-md py-4 mb-6 border-b border-gray-100 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                  activeCategory === cat 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* MAIN FEED */}
          <div className="lg:col-span-2 space-y-8">

            {events.map((event) => (
            <div 
                key={event.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                {/* Card Header */}
                <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={event.organizerImg} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="" />
                    <div>
                    <h4 className="text-sm font-bold text-gray-900">{event.organizer}</h4>
                    <p className="text-[11px] text-gray-500 font-medium">{event.location}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-black transition-colors">
                    <MoreHorizontal size={20} />
                </button>
                </div>

                {/* Media */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img 
                    src={event.image} 
                    className="w-full h-full object-cover" 
                    alt={event.title} 
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[11px] font-bold">
                    {event.price}
                </div>
                </div>

                {/* Actions */}
                <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                    <button className="hover:text-red-500 transition-colors"><Heart size={24} /></button>
                    <button className="hover:text-amber-500 transition-colors"><Share2 size={22} /></button>
                    </div>
                    <button className="hover:text-black transition-colors"><Bookmark size={24} /></button>
                </div>

                <div className="space-y-1">
                    <p className="text-xs font-black text-amber-500 uppercase tracking-tighter">{event.date} • UPCOMING</p>
                    <h3 className="text-xl font-bold leading-tight text-gray-900">{event.title}</h3>
                    <div className="flex items-center gap-2 pt-2">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-6 h-6 rounded-full border-2 border-white" alt="" />
                        ))}
                    </div>
                    <span className="text-[12px] text-gray-500 font-medium">Joined by {event.attendees} people</span>
                    </div>
                </div>

                <button className="w-full mt-5 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-black active:scale-[0.98] transition-all">
                    Get Ticket
                </button>
                </div>
            </div>
            ))}
            
          </div>

          {/* SIDEBAR (Desktop Only - Twitter Style Trends) */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 sticky top-28">
              <h3 className="text-lg font-bold mb-4">Trending in Enugu</h3>
              <div className="space-y-4">
                {['#TechLagos', '#DesignMeetup', '#ReactDevs', '#SIWES2026'].map((tag) => (
                  <div key={tag} className="group cursor-pointer">
                    <p className="text-[11px] text-gray-400 font-bold">Trending</p>
                    <p className="text-sm font-bold group-hover:underline">{tag}</p>
                    <p className="text-[11px] text-gray-500">1.2k Events</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-amber-500 text-sm font-bold hover:underline">Show more</button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HomePage;