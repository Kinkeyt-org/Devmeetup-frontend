import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/event"; // your API call

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setAllEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on query
  const filteredEvents =
    query.trim() === ""
      ? []
      : allEvents.filter(
          (event) =>
            event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase()) ||
            event.category.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-white font-['Satoshi']">
      {/* SEARCH HEADER */}
      <div className="sticky top-0 z-40 bg-white pt-5 pb-4 px-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
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
        {loading ? (
          <div className="py-32 text-center text-neutral-400">Loading...</div>
        ) : (
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
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  {/* Card */}
                  <div className="relative rounded-3xl overflow-hidden h-52 bg-neutral-100 shadow-sm">
                    <img
                      src={event.banner || event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black">
                      {event.is_free || event.price === 0 ? "Free" : `₦${event.price}`}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-[10px] uppercase font-black opacity-80">
                        {event.location}
                      </p>
                      <h3 className="text-lg font-bold leading-tight">{event.title}</h3>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-center mt-2 px-1">
                    <p className="text-[10px] font-black text-amber-500 uppercase">
                      {event.category} • {event.event_date_human || event.event_date}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M7 17l9-9M7 8h9v9" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* EMPTY STATE */}
            {query.trim() !== "" && filteredEvents.length === 0 && (
              <div className="py-32 text-center">
                <h3 className="text-xl font-bold text-neutral-300">
                  No results found.
                </h3>
              </div>
            )}
          </motion.div>
        )}
        {query.trim() === "" && !loading && (
          <div className="py-32 text-center">
            <h3 className="text-lg font-semibold text-neutral-400">
              Start typing to search events
            </h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;