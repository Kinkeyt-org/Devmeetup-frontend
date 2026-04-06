import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdSearch} from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const allEvents = [
    { id: 1, title: "Tech Lagos Summit", date: "Apr 24", category: "Technology", price: "Free", location: "Victoria Island", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Afro-Beats Night", date: "May 02", category: "Music", price: "₦5,000", location: "Landmark Beach", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Product Design Mixer", date: "May 15", category: "Design", price: "Free", location: "Lekki Phase 1", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Startup Grind", date: "June 01", category: "Business", price: "₦2,000", location: "Yaba, Lagos", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Code & Coffee", date: "June 10", category: "Technology", price: "Free", location: "Enugu Tech Hub", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, title: "Midnight Jazz", date: "June 12", category: "Music", price: "₦15,000", location: "Ikoyi", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop" },
  ];

  // Filter logic
  const filteredEvents = query.trim() === ""
  ? []
  : allEvents.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase()) ||
      event.category.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white font-['Satoshi']">

      {/* SEARCH HEADER */}
      <div className="sticky top-0 z-40 bg-white  pt-5 pb-4 px-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">

          {/* Search Input */}
          <div className="flex-1 flex items-center bg-neutral-100 rounded-full px-4 py-3">
            <IoMdSearch className="text-neutral-400 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search events, location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
           <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-black"
          >
            Cancel
          </button>
         
        </div>
      </div>

      {/* RESULTS */}
      <section className="px-4 py-6">
        <motion.div layout className="space-y-6">

          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >

                {/* Card */}
                <div className="relative rounded-3xl overflow-hidden h-52 bg-neutral-100 shadow-sm">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black">
                    {event.price}
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-[10px] uppercase font-black opacity-80">
                      {event.location}
                    </p>
                    <h3 className="text-lg font-bold leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-center mt-2 px-1">
                  <p className="text-[10px] font-black text-amber-500 uppercase">
                    {event.category} • {event.date}
                  </p>

                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M7 17l9-9M7 8h9v9"/>
                    </svg>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {query.trim() === "" ? (
            <div className="py-32 text-center">
              <h3 className="text-lg font-semibold text-neutral-400">
                Start typing to search events
              </h3>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-32 text-center">
              <h3 className="text-xl font-bold text-neutral-300">
                No results found.
              </h3>
            </div>
          ) : null
        }
      </section>

    </div>
  );
};

export default Search;