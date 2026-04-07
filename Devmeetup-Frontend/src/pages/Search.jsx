import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import Fuse from "fuse.js";
import { getEvents } from "../api/event";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
  }, []);

  // Use useMemo to compute suggestions without triggering setState inside useEffect
  const suggestions = useMemo(() => {
    if (!query) return [];

    const fuse = new Fuse(events, {
      keys: ["title", "category", "location"],
      threshold: 0.3,
    });

    return fuse.search(query).map(r => r.item).slice(0, 5); // top 5 suggestions
  }, [query, events]);

  return (
    <div className="min-h-screen bg-white font-['Satoshi']">

      {/* SEARCH HEADER */}
      <div className="sticky top-0 z-40 bg-white pt-5 pb-4 px-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="flex items-center bg-neutral-100 rounded-full px-4 py-3">
              <IoMdSearch className="text-neutral-400 text-xl mr-2" />
              <input
                type="text"
                placeholder="Search events, location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-xl z-50 max-h-60 overflow-auto">
                {suggestions.map(event => (
                  <div
                    key={event.id}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.category} • {event.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-black"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      <div className="py-32 text-center">
        {!query ? (
          <h3 className="text-lg font-semibold text-neutral-400">
            Start typing to search events
          </h3>
        ) : suggestions.length === 0 ? (
          <h3 className="text-xl font-bold text-neutral-300">
            No results found.
          </h3>
        ) : null}
      </div>
    </div>
  );
};

export default Search;