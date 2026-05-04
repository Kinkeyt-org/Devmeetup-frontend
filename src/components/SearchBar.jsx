import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [location, setLocation] = useState("Your location");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  

  // Ask browser for location
  const getUserLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLoadingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        const data = await res.json();

        const city =
          data.city || data.locality || data.principalSubdivision || "Unknown";

        setLocation(city);
      } catch (err) {
        console.error(err);
        setLocation("Unknown location");
      }

      setLoadingLocation(false);
    },
    (err) => {
      console.error("Geolocation error:", err.message || err);
      setLocation("Unknown location");
      setLoadingLocation(false);
    },
    {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 300000,
    }
  );
};

  return (
    <div className="w-full">
      {/* SEARCH BAR */}
      <div
        className={`flex items-center rounded-full pl-6 pr-2 py-2 transition-all duration-300 border
        ${
          isFocused
            ? "bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-black/70 border-neutral-300 dark:border-neutral-600 ring-4 ring-black/5 dark:ring-white/5"
            : "bg-white/80 dark:bg-neutral-900/60 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 hover:shadow-md"
        } min-w-95 lg:min-w-137.5 mx-auto`}
      >
        {/* SEARCH INPUT */}
        <div className="flex items-center flex-1 pr-4">
          

          <input
            type="text"
            placeholder="Search events, creators, or topics..."
            className="w-full bg-transparent outline-none text-sm text-black dark:text-white placeholder-neutral-800 dark:placeholder-neutral-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {/* DIVIDER */}
        <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-2" />

        {/* LOCATION */}
        <div
          onClick={getUserLocation}
          className="flex items-center gap-2 px-3 cursor-pointer group"
        >
          <MapPin
            size={18}
            className={`transition-colors ${
              isFocused
                ? "text-black dark:text-white"
                : "text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white"
            }`}
          />

          <span className={`text-[15px] font-medium truncate max-w-30 transition-colors ${
              isFocused ? "text-black dark:text-white" : "text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white"
          }`}>
            {loadingLocation ? "Locating..." : location}
          </span>
        </div>

        {/* FILTER */}
        <button className="ml-1 p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
          <SlidersHorizontal
            size={18}
            className="text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors"
          />
        </button>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="
            ml-2 px-2 py-2 rounded-full text-[10px] 
            bg-black dark:bg-white text-white dark:text-black
            hover:shadow-lg dark:hover:shadow-white/10
            transition-all active:scale-95 hover:scale-[1.02]
          "
        >
          <Search
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;