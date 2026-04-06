import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdSearch, IoMdOptions } from "react-icons/io";

const ExploreEvents = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Music', 'Technology', 'Design', 'Business', 'Lifestyle'];

  const allEvents = [
    { id: 1, title: "Tech Lagos Summit", date: "Apr 24", category: "Technology", price: "Free", location: "Victoria Island", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Afro-Beats Night", date: "May 02", category: "Music", price: "₦5,000", location: "Landmark Beach", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Product Design Mixer", date: "May 15", category: "Design", price: "Free", location: "Lekki Phase 1", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Startup Grind", date: "June 01", category: "Business", price: "₦2,000", location: "Yaba, Lagos", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Code & Coffee", date: "June 10", category: "Technology", price: "Free", location: "Enugu Tech Hub", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, title: "Midnight Jazz", date: "June 12", category: "Music", price: "₦15,000", location: "Ikoyi", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop" },
  ];

  const filteredEvents = activeCategory === 'All' 
    ? allEvents 
    : allEvents.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] antialiased">
      
      {/* HEADER & FILTERS */}
      <div className="sticky top-0 z-40 bg-white  border-b border-neutral-100 pt-24 pb-4 px-6">
        <div className="max-w-6xl md:pt-10 mx-auto">
          

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EVENTS GRID */}
      <section className="max-w-6xl mx-auto py-10 px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] md:aspect-[4/5] bg-neutral-100 rounded-[2.5rem] mb-4 overflow-hidden relative shadow-sm border border-neutral-100">
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black shadow-sm z-10">
                    {event.price}
                  </div>
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Bottom info on Image for "Premium" look */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">{event.location}</p>
                    <h3 className="text-xl font-bold leading-tight tracking-tight">{event.title}</h3>
                  </div>
                </div>
                
                <div className="flex justify-between items-center px-2">
                   <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{event.category} • {event.date}</p>
                   <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17l9-9M7 8h9v9"/></svg>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="py-40 text-center">
            <h3 className="text-2xl font-bold text-neutral-300 italic">No events found in this category.</h3>
          </div>
        )}
      </section>

    
    </div>
  );
};

export default ExploreEvents;