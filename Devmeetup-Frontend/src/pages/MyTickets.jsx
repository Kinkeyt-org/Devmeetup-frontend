import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mock for now — replace with API later
    const fetchTickets = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(stored);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const upcoming = tickets.filter(t => new Date(t.date) >= new Date());
  const past = tickets.filter(t => new Date(t.date) < new Date());

  const TicketCard = ({ ticket }) => (
    <div
      onClick={() => navigate(`/events/${ticket.eventId}`)}
      className="group cursor-pointer bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black">
          {ticket.isFree ? "Free" : `₦${ticket.price}`}
        </div>

        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-xs uppercase tracking-widest opacity-70">
            {ticket.location}
          </p>
          <h3 className="text-lg font-bold leading-tight">
            {ticket.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">
            Date
          </p>
          <p className="font-bold text-sm">
            {ticket.dateHuman || ticket.date}
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition">
          →
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>My Tickets</title>
        <meta name="description" content="Your booked event experiences" />
      </Helmet>

      <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi'] antialiased">

        {/* HEADER */}
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            My Tickets
          </h1>
          <p className="text-neutral-500 mt-3">
            All your upcoming experiences in one place.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!loading && tickets.length === 0 && (
          <div className="text-center py-32">
            <h2 className="text-2xl font-bold text-neutral-300">
              No tickets yet
            </h2>
            <p className="text-neutral-500 mt-2">
              Explore events and book your first experience.
            </p>

            <button
              onClick={() => navigate("/events")}
              className="mt-6 px-8 py-3 bg-black text-white rounded-full font-bold"
            >
              Explore Events
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[300px] bg-neutral-100 animate-pulse rounded-[2.5rem]"
              />
            ))}
          </div>
        )}

        {/* UPCOMING */}
        {!loading && upcoming.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <h2 className="text-xl font-bold mb-6">Upcoming</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {upcoming.map((ticket, i) => (
                <TicketCard key={i} ticket={ticket} />
              ))}
            </div>
          </section>
        )}

        {/* PAST */}
        {!loading && past.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-xl font-bold mb-6 text-neutral-400">
              Past Events
            </h2>

            <div className="grid md:grid-cols-3 gap-6 opacity-70">
              {past.map((ticket, i) => (
                <TicketCard key={i} ticket={ticket} />
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
};

export default MyTickets;