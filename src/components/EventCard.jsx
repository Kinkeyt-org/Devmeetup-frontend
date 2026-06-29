import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Globe,
  Calendar,
  Loader2,
  CheckCircle2,
  Ticket,
  Tag
} from "lucide-react";
import { Badge } from "./ui/badge";

/* ================= EVENT CARD =================
   This component renders a single event card.
   It handles:
   - Navigation to event details
   - Free/paid display
   - Online/physical badge
   - Booking state (reserved / get ticket)
   - Event tags/categories
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

  /* Extract tags from event */
  const tags = event.tags || event.categories || [];

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
      className="group flex flex-row items-center gap-4 p-2 sm:p-3 cursor-pointer rounded-2xl border border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-15 w-15 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl">
        <img
          src={event.banner || event.image}
          alt={`Event banner for ${title}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="flex flex-col justify-center min-w-0">
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          {event.event_date_human}
        </p>

        <h3 className="text-base sm:text-base font-medium text-neutral-900 dark:text-white truncate mt-0.5">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 truncate">
          {isVirtual ? "Virtual Event" : event.location}
        </p>

        {/* TAGS SECTION */}
        {tags.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {tags.slice(0, 2).map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600"
              >
                {typeof tag === "string" ? tag : tag.name}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge
                variant="outline"
                className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600"
              >
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;