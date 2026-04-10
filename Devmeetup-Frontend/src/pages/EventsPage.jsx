import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, bookEvent } from "../api/event";

const EventsPage = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [bookingId, setBookingId] = useState(null);

  const categories = ["All", "Tech", "Design", "Business", "Music", "Lifestyle"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.tags?.includes(activeCategory));

  const handleBook = async (id) => {
    try {
      setBookingId(id);
      await bookEvent(id);

      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === id ? { ...ev, booked: true } : ev
        )
      );
    } catch (err) {
      console.error("Booking failed:", err);
    } finally {
      setBookingId(null);
    }
  };

  const isFree = (event) =>
    event.is_free === true ||
    event.is_free === 1 ||
    event.is_free === "1";

  /* ---------------- CARD ---------------- */
  const EventCard = ({ event }) => (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#0e0e0e",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          height: "3px",
          background: isFree(event)
            ? "linear-gradient(90deg,#34d399,#059669)"
            : "linear-gradient(90deg,#f5a623,#ff8c42)",
        }}
      />

      {/* Image */}
      <div style={{ width: "100%", height: "200px", background: "#181818" }}>
        {event.banner || event.image ? (
          <img
            src={event.banner || event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.7s ease",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.1,
              fontSize: "60px",
              color: "#fff",
            }}
          >
            ⚡
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        {/* Tag + Price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "100px",
              background: isFree(event)
                ? "rgba(52,211,153,0.12)"
                : "rgba(245,166,35,0.12)",
              color: isFree(event) ? "#34d399" : "#f5a623",
            }}
          >
            {event.tags?.[0] || "General"}
          </span>

          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: isFree(event) ? "#34d399" : "rgba(255,255,255,0.9)",
            }}
          >
            {isFree(event)
              ? "Free"
              : `₦${Number(event.price || 0).toLocaleString()}`}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "10px",
            lineHeight: 1.25,
          }}
        >
          {event.title}
        </h3>

        {/* Meta */}
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.4)" }}>
            {event.location}
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.4)" }}>
            {event.event_date_human || event.event_date}
          </span>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            margin: "16px 0",
          }}
        />

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            {event.attendees_count
              ? `${event.attendees_count} going`
              : ""}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBook(event.id);
            }}
            disabled={bookingId === event.id || event.booked}
            style={{
              border: "none",
              cursor: event.booked ? "default" : "pointer",
              fontSize: "12.5px",
              fontWeight: 700,
              padding: "10px 18px",
              borderRadius: "100px",
              background: event.booked
                ? "rgba(52,211,153,0.1)"
                : isFree(event)
                ? "rgba(52,211,153,0.12)"
                : "#f5a623",
              color: event.booked
                ? "#34d399"
                : isFree(event)
                ? "#34d399"
                : "#0e0e0e",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {bookingId === event.id ? (
              <>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    border: "2px solid rgba(0,0,0,0.3)",
                    borderTopColor: "#000",
                    borderRadius: "50%",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Booking
              </>
            ) : event.booked ? (
              "✓ Booked"
            ) : isFree(event) ? (
              "RSVP Free"
            ) : (
              "Book Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  /* ---------------- SKELETON ---------------- */
  const SkeletonCard = () => (
    <div
      style={{
        borderRadius: "20px",
        background: "#0e0e0e",
        border: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <div style={{ height: "200px", background: "#1a1a1a" }} />
      <div style={{ padding: "18px" }}>
        <div style={{ height: "10px", width: "40%", background: "#1f1f1f", marginBottom: "10px" }} />
        <div style={{ height: "14px", width: "70%", background: "#1f1f1f", marginBottom: "10px" }} />
        <div style={{ height: "10px", width: "60%", background: "#1f1f1f" }} />
        <div style={{ height: "40px", background: "#1f1f1f", borderRadius: "100px", marginTop: "20px" }} />
      </div>
    </div>
  );

  /* ---------------- UI ---------------- */
  return (
    <div style={{ minHeight: "100vh", background: "#000", padding: "40px" }}>
      {/* FILTER */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              background: activeCategory === cat ? "#fff" : "#1a1a1a",
              color: activeCategory === cat ? "#000" : "#aaa",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
      </div>

      {/* spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EventsPage;