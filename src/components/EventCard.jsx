import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Globe, Calendar, Loader2, CheckCircle2, Ticket } from "lucide-react";

/* ================= EVENT CARD =================
   This component renders a single event card.
   It handles:
   - Navigation to event details
   - Free/paid display with pricing
   - Attendee avatars and registration count
   - Online/physical badge
   - Booking state (reserved / get ticket)
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

  /* Generate avatar display (show up to 3 avatars) */
  const displayAvatars = attendees.slice(0, 3);

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
      className="group flex flex-col p-4 sm:p-5 cursor-pointer rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 bg-white dark:bg-neutral-900/50 transition-all"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl mb-4">
        <img
          src={event.banner || event.image}
          alt={`Event banner for ${title}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="flex flex-col justify-between flex-1">
        {/* DATE AND TIME */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-2">
          {event.event_date_human}
        </p>

        {/* TITLE */}
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2 mb-3">
          {title}
        </h3>

        {/* ATTENDEES SECTION */}
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar Stack */}
          <div className="flex items-center">
            {displayAvatars.map((attendee, idx) => (
              <img
                key={idx}
                src={attendee.avatar || attendee.profile_picture || `https://ui-avatars.com/api/?name=${attendee.name || "User"}&background=random`}
                alt={attendee.name || "Attendee"}
                className="h-8 w-8 rounded-full border-2 border-white dark:border-neutral-800 -ml-2 first:ml-0 object-cover"
              />
            ))}
          </div>

          {/* Registration Count */}
          <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium">
            {attendeeCount > 0
              ? attendeeCount === 1
                ? "1 person registered"
                : `${attendeeCount}+ people registered`
              : "No registrations yet"}
          </span>
        </div>

        {/* FREE / PAID BADGE */}
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-white/10">
          <div>
            {isPaid ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold">
                Paid • ${price}
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs sm:text-sm font-semibold">
                Free
              </span>
            )}
          </div>

          {/* Virtual / Location Badge */}
          <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium">
            {isVirtual ? (
              <>
                <Globe size={14} />
                Virtual
              </>
            ) : (
              <>
                <MapPin size={14} />
                <span className="truncate">{event.location || "Location TBA"}</span>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;