import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Globe,
  Calendar,
  Loader2,
  CheckCircle2,
  Ticket,
  Tag as TagIcon,
  Users
} from "lucide-react";

/* ================= EVENT CARD =================
   This component renders a single event card.
   It handles:
   - Navigation to event details
   - Free/paid display
   - Online/physical badge
   - Booking state (reserved / get ticket)
   - Event tags/categories
   - Attendee count
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

  /* Parse tags (can be array or JSON string) */
  const parseTags = () => {
    if (!event.tags) return [];
    if (Array.isArray(event.tags)) return event.tags;
    try {
      const parsed = JSON.parse(event.tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const tags = parseTags();

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
      <div className="flex flex-col justify-center min-w-0 flex-1">
        {/* Date and Type Badge */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            {event.event_date_human}
          </p>
          {isVirtual && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100/70 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-medium">
              <Globe size={12} />
              Virtual
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-base font-medium text-neutral-900 dark:text-white truncate">
          {title}
        </h3>

        {/* Location / Virtual */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 truncate">
          {isVirtual ? "Online Event" : event.location}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100/70 dark:bg-white/8 text-neutral-600 dark:text-white/70 text-[10px] font-medium hover:bg-neutral-200 dark:hover:bg-white/15 transition-colors"
              >
                <TagIcon size={10} />
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-100/70 dark:bg-white/8 text-neutral-600 dark:text-white/70 text-[10px] font-medium">
                +{tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Attendees Count */}
        {event.attendees_count && (
          <div className="flex items-center gap-1 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Users size={12} />
            {event.attendees_count} attendee{event.attendees_count !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;