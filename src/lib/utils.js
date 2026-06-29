import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function filterUpcomingEvents(events = [], now = new Date()) {
  return (Array.isArray(events) ? events : []).filter((event) => {
    if (event?.hidden === true) return false;

    const rawDate = event?.date || event?.event_date || event?.startDate || event?.start_date;
    if (!rawDate) return true;

    const eventDate = new Date(rawDate);
    if (Number.isNaN(eventDate.getTime())) return true;

    return eventDate >= now;
  });
}
