import React from "react";

const CATEGORY_COLORS = {
  conference: "bg-blue-50 text-blue-600 border-blue-100",
  workshop: "bg-purple-50 text-purple-600 border-purple-100",
  hackathon: "bg-green-50 text-green-600 border-green-100",
  virtual: "bg-cyan-50 text-cyan-600 border-cyan-100",
  meetup: "bg-orange-50 text-orange-600 border-orange-100",
};

export default function Dashboard({ event, onClick }) {
  const spotsLeft = event.totalTickets - event.ticketsSold;
  const isSoldOut = spotsLeft <= 0;
  const isAlmostGone = spotsLeft > 0 && spotsLeft <= 10;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-NG", { weekday: "short", month: "short", day: "numeric" });
  };

  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div
      onClick={() => onClick(event)}
      className="group cursor-pointer bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden bg-neutral-100">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border backdrop-blur-sm ${CATEGORY_COLORS[event.category] || "bg-neutral-50 text-neutral-600 border-neutral-200"}`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm border ${
            event.type === "virtual"
              ? "bg-cyan-50/90 text-cyan-700 border-cyan-200"
              : "bg-white/90 text-neutral-700 border-neutral-200"
          }`}>
            {event.type === "virtual" ? "🌐 Virtual" : "📍 Physical"}
          </span>
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <span className={`text-sm font-bold px-3 py-1.5 rounded-xl ${
            event.price === 0
              ? "bg-green-500 text-white"
              : "bg-amber-400 text-black"
          }`}>
            {formatPrice(event.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-black text-base mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{event.description}</p>

        {/* Meta */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{event.type === "virtual" ? "Online event" : event.location}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div className="text-xs text-neutral-400">by <span className="font-medium text-neutral-600">{event.organizer}</span></div>
          {isSoldOut ? (
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg">Sold out</span>
          ) : isAlmostGone ? (
            <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg">{spotsLeft} left!</span>
          ) : (
            <span className="text-xs text-neutral-400">{spotsLeft} spots left</span>
          )}
        </div>
      </div>
    </div>
  );
}