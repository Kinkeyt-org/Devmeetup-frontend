import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import Fuse from "fuse.js";
import { getEvents } from "../api/event"; 
import EventCard from "../components/EventCard";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [localQuery, setLocalQuery] = useState(query);
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents("upcoming", 1, 100);
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(events, {
        keys: ["title", "category", "location", "tags", "description"],
        threshold: 0.4,
      }),
    [events]
  );

  // ✅ FIXED: use localQuery instead of query
  useEffect(() => {
    if (!localQuery.trim()) {
      setResults([]);
      return;
    }

    const matched = fuse.search(localQuery).map(r => r.item);
    setResults(matched);
  }, [localQuery, fuse]);

  const handleSearchCommit = () => {
    setSearchParams(localQuery ? { q: localQuery } : {});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchCommit();
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pb-20">

      {/* SEARCH HEADER */}
      <div className="sticky top-0 z-40 bg-white dark:bg-neutral-950 pt-5 pb-4 px-4 border-b border-neutral-100 dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center gap-3 max-w-7xl mx-auto md:px-6">
          <div className="flex-1 relative">
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-full px-4 py-3">
              <button onClick={handleSearchCommit} aria-label="Search">
                <IoMdSearch className="text-neutral-400 dark:text-neutral-500 text-xl mr-2 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
              </button>

              <input
                type="text"
                placeholder="Search events, location..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none w-full text-sm dark:text-white"
              />
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">

        {!localQuery ? (
          <div className="py-32 text-center">
            <h3 className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
              Start typing to search for events, creators, or topics.
            </h3>
          </div>

        ) : loading ? (
          <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-72 w-70 lg:w-full shrink-0 rounded-[1.2rem] bg-neutral-100 dark:bg-neutral-900 animate-pulse"
              />
            ))}
          </div>

        ) : results.length === 0 ? (
          <div className="py-32 text-center">
            <h3 className="text-xl font-medium text-neutral-400 dark:text-neutral-500">
              No results found for "<span className="text-black dark:text-white">{localQuery}</span>"
            </h3>
          </div>

        ) : (
          <div>
            <div className="mb-6 border-b border-neutral-100 dark:border-white/5 pb-4">
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                Found{" "}
                <span className="text-black dark:text-white">{results.length}</span>{" "}
                Matches
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isBooking={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Search;