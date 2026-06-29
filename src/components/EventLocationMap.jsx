import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const EventLocationMap = ({ lat, lng, label = "Event location" }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!lat || !lng) return null;

  return (
    <>
      {!mapLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#111118]">
          <div className="w-6 h-6 border-2 border-neutral-200 dark:border-white/10 border-t-neutral-500 dark:border-t-white/50 rounded-full animate-spin" />
          <p className="text-xs text-neutral-400 dark:text-white/35 mt-3">Loading map...</p>
        </div>
      )}
      <iframe
        title={label}
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
        className={`w-full h-full border-0 transition-opacity duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          filter: isDark
            ? "grayscale(1) invert(1) brightness(0.85) contrast(1.15)"
            : "grayscale(1) contrast(1.1)",
        }}
        onLoad={() => setMapLoaded(true)}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
};

export default EventLocationMap;
