import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Globe, Bookmark } from "lucide-react";

/* ================= EVENT CARD =================
   This component renders a single event card.
   It handles:
   - Navigation to event details
   - Free/paid display with pricing (shown as a badge on the banner)
   - Bookmark toggle state persisted in localStorage
   - Attendee avatars and registration count
   - Virtual/location status badge
 ============================================= */

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  /* Check if event is online */
  const isVirtual =
    event.type === "virtual" ||
    event.type === "online" ||
    event.is_online === true ||
    event.is_virtual === true;

  const title = event.title || "Untitled Event";

  /* Determine if event is paid and get price */
  const isPaid = event.price || event.ticket_price || event.is_paid;
  const price = event.price || event.ticket_price;

  /* Get attendees/registrations info */
  const attendeeCount = event.total_registrations || event.registrations_count || event.attendees_count || 0;
  const attendees = event.attendees || event.registered_users || [];

  /* Generate avatar display (show up to 4 avatars) */
  const displayAvatars = attendees.length > 0
    ? attendees.slice(0, 4)
    : attendeeCount > 0
      ? Array.from({ length: Math.min(4, attendeeCount) }).map((_, idx) => ({
          avatar: `https://ui-avatars.com/api/?name=User+${idx+1}&background=random&color=fff`,
          name: `User ${idx+1}`
        }))
      : [];

  /* Handle bookmark state persistence in localStorage */
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = localStorage.getItem("bookmarked_events");
      if (saved) {
        const ids = JSON.parse(saved);
        return Array.isArray(ids) && ids.includes(event.id);
      }
    } catch (e) {
      console.error("Failed to parse bookmarked events:", e);
    }
    return false;
  });

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setIsBookmarked((prev) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem("bookmarked_events");
        let ids = saved ? JSON.parse(saved) : [];
        if (!Array.isArray(ids)) ids = [];
        if (next) {
          if (!ids.includes(event.id)) ids.push(event.id);
        } else {
          ids = ids.filter((id) => id !== event.id);
        }
        localStorage.setItem("bookmarked_events", JSON.stringify(ids));
      } catch (err) {
        console.error("Failed to save bookmarked events:", err);
      }
      return next;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate(`/events/${event.id}`);
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`Open event: ${title}`}
      onClick={() => navigate(`/events/${event.id}`)}
      onKeyDown={handleKeyDown}
      className="group flex flex-row items-center p-2.5 sm:p-3 cursor-pointer rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 bg-white dark:bg-neutral-900/50 transition-all gap-3 w-full"
    >
      {/* IMAGE SECTION */}
      <div className="relative w-18 h-18 sm:w-28 sm:h-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <img
          src={event.banner || event.image}
          alt={`Event banner for ${title}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
      </div>

      {/* CONTENT SECTION */}
      <div className="flex flex-col justify-between flex-1 min-w-0 self-stretch">
        {/* DATE AND TIME & BOOKMARK */}
        <div className="flex items-center justify-between gap-1.5">
          <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
            {event.event_date_human}
          </p>
          <button
            onClick={handleBookmarkClick}
            className="p-1 -m-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 shrink-0"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark event"}
          >
            <Bookmark
              size={14}
              className={isBookmarked ? "fill-neutral-950 dark:fill-white text-neutral-950 dark:text-white" : ""}
            />
          </button>
        </div>

        {/* TITLE */}
        <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white line-clamp-1 sm:line-clamp-2 leading-snug my-0.5">
          {title}
        </h3>

        {/* ATTENDEES & VIRTUAL/LOCATION STATUS */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1.5">
          {/* Attendees */}
          <div className="flex items-center gap-1 min-w-0">
            {displayAvatars.length > 0 && (
              <div className="flex items-center -space-x-1.5 shrink-0">
                {displayAvatars.map((attendee, idx) => (
                  <img
                    key={idx}
                    src={attendee.avatar || attendee.profile_picture || `https://ui-avatars.com/api/?name=${attendee.name || "User"}&background=random`}
                    alt={attendee.name || "Attendee"}
                    className="h-5 w-5 rounded-full border border-white dark:border-neutral-900 object-cover"
                  />
                ))}
              </div>
            )}
            <span className="text-[10px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 font-medium truncate">
              {attendeeCount > 0
                ? attendeeCount === 1
                  ? "1 person registered"
                  : `${attendeeCount}+ registered`
                : "No registrations"}
            </span>
          </div>

          {/* Virtual / Location Badge */}
          <span className="flex items-center gap-0.5 text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 shrink-0">
            {isPaid ? "Paid" : "Free"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;