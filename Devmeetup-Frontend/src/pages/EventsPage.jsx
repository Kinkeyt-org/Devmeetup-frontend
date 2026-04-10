import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, bookEvent } from "../api/event";

/* ─── Accent bar ─────────────────────────────────────────────────────────── */
const AccentBar = ({ isFree }) => (
  <div
    style={{
      height: "3px",
      background: isFree
        ? "linear-gradient(90deg,#34d399,#059669)"
        : "linear-gradient(90deg,#f5a623,#ff8c42)",
    }}
  />
);

/* ─── Event Card ─────────────────────────────────────────────────────────── */
const EventCard = ({ event, onBook, isBooking }) => {
  const navigate = useNavigate();

  const isFree =
    event.is_free === true || event.is_free === 1 || event.is_free === "1";

  const handleCardClick = () => navigate(`/events/${event.id}`);
  const handleBookClick = (e) => {
    e.stopPropagation();
    if (!event.booked && !isBooking) onBook(event.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="event-card"
      style={{
        background: "var(--card-bg, #fff)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        fontFamily: "'DM Sans', 'Satoshi', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <AccentBar isFree={isFree} />

      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "180px",
          background: "var(--color-background-tertiary)",
          overflow: "hidden",
        }}
      >
        {event.banner || event.image ? (
          <img
            src={event.banner || event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              display: "block",
            }}
            className="event-card__img"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              opacity: 0.12,
            }}
          >
            ⚡
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px" }}>
        {/* Tag + Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
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
              background: isFree
                ? "rgba(52,211,153,0.12)"
                : "rgba(245,166,35,0.12)",
              color: isFree ? "#059669" : "#cc8800",
            }}
          >
            {event.tags?.[0] || "General"}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: isFree ? "#059669" : "var(--color-text-secondary)",
            }}
          >
            {isFree ? "Free" : `₦${Number(event.price || 0).toLocaleString()}`}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            lineHeight: 1.3,
            marginBottom: "8px",
            letterSpacing: "-0.2px",
          }}
        >
          {event.title}
        </h3>

        {/* Location + Date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "var(--color-text-tertiary)",
          }}
        >
          <span>{event.location}</span>
          <span
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "var(--color-border-secondary)",
              flexShrink: 0,
            }}
          />
          <span>{event.event_date_human || event.event_date}</span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "0.5px",
            background: "var(--color-border-tertiary)",
            margin: "14px 0",
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <span
            style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}
          >
            {event.attendees_count ? `${event.attendees_count} going` : ""}
          </span>

          <button
            onClick={handleBookClick}
            disabled={isBooking || event.booked}
            style={{
              border: "none",
              cursor: event.booked ? "default" : "pointer",
              fontSize: "12px",
              fontWeight: 600,
              padding: "9px 18px",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
              ...(event.booked
                ? {
                    background: "rgba(52,211,153,0.1)",
                    color: "#059669",
                  }
                : isFree
                ? {
                    background: "rgba(52,211,153,0.1)",
                    color: "#059669",
                  }
                : {
                    background: "#f5a623",
                    color: "#1a1000",
                  }),
            }}
          >
            {isBooking ? (
              <>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    border: "2px solid currentColor",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.6s linear infinite",
                  }}
                />
                Booking…
              </>
            ) : event.booked ? (
              "✓ Booked"
            ) : isFree ? (
              "RSVP Free"
            ) : (
              "Book Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div
    style={{
      background: "var(--color-background-primary)",
      border: "0.5px solid var(--color-border-tertiary)",
      borderRadius: "20px",
      overflow: "hidden",
      padding: "0 0 18px",
    }}
  >
    <div
      style={{ height: "3px", background: "var(--color-background-tertiary)" }}
    />
    <div
      className="skeleton-pulse"
      style={{
        height: "180px",
        background: "var(--color-background-tertiary)",
        marginBottom: "16px",
      }}
    />
    <div style={{ padding: "0 18px" }}>
      <div
        className="skeleton-pulse"
        style={{
          height: "12px",
          borderRadius: "6px",
          width: "40%",
          marginBottom: "12px",
          background: "var(--color-background-tertiary)",
        }}
      />
      <div
        className="skeleton-pulse"
        style={{
          height: "18px",
          borderRadius: "6px",
          width: "85%",
          marginBottom: "8px",
          background: "var(--color-background-tertiary)",
        }}
      />
      <div
        className="skeleton-pulse"
        style={{
          height: "12px",
          borderRadius: "6px",
          width: "60%",
          marginBottom: "22px",
          background: "var(--color-background-tertiary)",
        }}
      />
      <div
        className="skeleton-pulse"
        style={{
          height: "38px",
          borderRadius: "100px",
          background: "var(--color-background-tertiary)",
        }}
      />
    </div>
  </div>
);

/* ─── Empty State ────────────────────────────────────────────────────────── */
const EmptyState = ({ category }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px",
      gap: "12px",
      color: "var(--color-text-tertiary)",
      textAlign: "center",
    }}
  >
    <span style={{ fontSize: "40px", opacity: 0.3 }}>🔍</span>
    <p style={{ fontSize: "16px", fontWeight: 500 }}>
      No {category !== "All" ? category : ""} events yet
    </p>
    <p style={{ fontSize: "13px", opacity: 0.7 }}>
      Check back soon or try a different category
    </p>
  </div>
);

/* ─── Main Page ──────────────────────────────────────────────────────────── */
const EventsPage = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState(null);

  const categories = ["All", "Tech", "Design", "Business", "Music", "Lifestyle"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Couldn't load events. Please try again.");
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

  const handleBook = async (eventId) => {
    try {
      setBookingId(eventId);
      await bookEvent(eventId);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventId ? { ...ev, booked: true } : ev))
      );
    } catch (err) {
      console.error("Booking failed:", err);
    } finally {
      setBookingId(null);
    }
  };

  return (
    <>
      {/* Inline CSS for hover scale on card images + skeleton pulse + spinner */}
      <style>{`
        .event-card:hover .event-card__img { transform: scale(1.04); }
        @keyframes skeleton-shimmer {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .skeleton-pulse { animation: skeleton-shimmer 1.4s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-background-tertiary)",
          fontFamily: "'DM Sans', 'Satoshi', sans-serif",
        }}
      >
        {/* ── Filter Bar ─────────────────────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "var(--color-background-primary)",
            borderBottom: "0.5px solid var(--color-border-tertiary)",
            paddingTop: "72px", // accounts for global navbar height
          }}
        >
          <div
            style={{
              maxWidth: "1152px",
              margin: "0 auto",
              padding: "12px 24px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "2px",
              }}
              className="no-scrollbar"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: "0.5px solid",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    ...(activeCategory === cat
                      ? {
                          background: "var(--color-text-primary)",
                          color: "var(--color-background-primary)",
                          borderColor: "transparent",
                        }
                      : {
                          background: "var(--color-background-primary)",
                          color: "var(--color-text-secondary)",
                          borderColor: "var(--color-border-secondary)",
                        }),
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Events Grid ─────────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "32px 24px 64px",
          }}
        >
          {/* Error */}
          {error && !loading && (
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "12px",
                background: "rgba(239,68,68,0.08)",
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "24px",
                border: "0.5px solid rgba(239,68,68,0.2)",
              }}
            >
              {error}
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Events */}
          {!loading && filteredEvents.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBook={handleBook}
                  isBooking={bookingId === event.id}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredEvents.length === 0 && !error && (
            <EmptyState category={activeCategory} />
          )}
        </section>
      </div>
    </>
  );
};

export default EventsPage;