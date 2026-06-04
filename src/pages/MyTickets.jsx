import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { X, Printer, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { getMyTickets, cancelEventTicket } from "../api/ticket";
import toast from "react-hot-toast";

// react-qr-code exports differently depending on version — handle both
const QRCodeComponent = QRCode.default ?? QRCode;

/**
 * Maps a raw ticket from GET /api/my-tickets into a flat UI-friendly shape.
 *
 * Live API response shape (May 2026):
 * {
 *   id, ticket_code, status ("BOOKED" | "CANCELLED"), booked_at,
 *   event_info: { name, banner, is_free, price, event_date, location }
 * }
 *
 * NOTE: event_id is not returned — card navigation is disabled until
 * Emma adds it to the response.
 */
const parseTicket = (t) => {
  const info = t.event_info || {};
  return {
    id: t.id,
    title: info.name || "Untitled Event",
    image:
      info.banner ||
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    date: info.event_date || "TBA",
    location: info.location || "Venue TBA",
    isFree: info.is_free ?? true,
    price: info.price,
    // status comes uppercase from API — normalise to lowercase
    status: (t.status || "booked").toLowerCase(),
    code: String(t.ticket_code || t.id),
    bookedAt: t.booked_at || null,
  };
};

const SkeletonCard = () => (
  <div className="flex flex-row gap-4 p-3 rounded-2xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/50 overflow-hidden">
    <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
    <div className="flex flex-col justify-center min-w-0 flex-1 py-1 space-y-2">
      <div className="h-3 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
    </div>
  </div>
);

const MyTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTicket, setActiveTicket] = useState(null);
  const [user, setUser] = useState(null);
  const [cancelConfirmId, setCancelConfirmId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Passed from the booking flow to auto-open the newly booked ticket
  const newlyBookedId = location.state?.newlyBookedId;

  // Fetch tickets on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    const fetchTickets = async () => {
      try {
        const data = await getMyTickets();
        if (data?.length) {
          setTickets(data);
          localStorage.setItem("tickets", JSON.stringify(data));
        } else {
          const cached = localStorage.getItem("tickets");
          setTickets(cached ? JSON.parse(cached) : []);
        }
      } catch {
        const cached = localStorage.getItem("tickets");
        setTickets(cached ? JSON.parse(cached) : []);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchTickets();
  }, []);

  // Auto-open the newly booked ticket once the list is loaded
  useEffect(() => {
    if (!newlyBookedId || !tickets.length || activeTicket) return;

    const raw = tickets.find((t) => t.id === newlyBookedId);
    if (raw) {
      setActiveTicket(parseTicket(raw));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [tickets, newlyBookedId, activeTicket, navigate, location.pathname]);

  const handleCancelTicket = (id, e) => {
    e.stopPropagation();
    setCancelConfirmId(id);
  };

  const performCancelTicket = async () => {
    if (!cancelConfirmId) return;
    setIsCancelling(true);
    try {
      await cancelEventTicket(cancelConfirmId);
      toast.success("Ticket cancelled");
      // Optimistic update — flip status locally without a refetch
      setTickets((prev) =>
        prev.map((t) =>
          t.id === cancelConfirmId ? { ...t, status: "CANCELLED" } : t
        )
      );
    } catch {
      toast.error("Could not cancel ticket. Try again.");
    } finally {
      setIsCancelling(false);
      setCancelConfirmId(null);
    }
  };

  const parsed = tickets.map(parseTicket);

  const TicketCard = ({ t }) => (
    // Navigation disabled — event_id not returned by API yet
    <div className="group flex flex-row gap-4 p-3 rounded-2xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-900/50 transition-all overflow-hidden">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl">
        <img
          src={t.image}
          alt={t.title}
          className="h-full w-full object-cover"
        />
        {/* Cancelled overlay badge */}
        {t.status === "cancelled" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <span className="text-[10px] font-semibold text-white tracking-wider uppercase">
              Cancelled
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center min-w-0 flex-1">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          {t.date}
        </p>
        <h3 className="text-base font-medium text-neutral-900 dark:text-white truncate mt-0.5">
          {t.title}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate">
          {t.location}
        </p>

        <div className="flex flex-nowrap items-center justify-between gap-2 mt-3 pt-1 overflow-hidden">
          <span className="text-[10px] font-mono text-neutral-500 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/5 truncate min-w-0">
            {t.code}
          </span>

          <div className="flex gap-2 shrink-0">
            {t.status !== "cancelled" && (
              <button
                onClick={(e) => handleCancelTicket(t.id, e)}
                className="text-xs px-2.5 py-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => setActiveTicket(t)}
              className="text-xs px-3 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md hover:opacity-90 transition-opacity font-medium"
            >
              View Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>My Tickets – Nexus</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <h1 className="text-2xl font-semibold mb-6 dark:text-white">
          My Tickets
        </h1>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : parsed.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            You haven't booked any tickets yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {parsed.map((t) => (
              <TicketCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </div>

      {/* Ticket modal */}
      <AnimatePresence>
        {activeTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveTicket(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full overflow-hidden relative"
            >
              <img
                src={activeTicket.image}
                className="h-40 w-full object-cover"
                alt={activeTicket.title}
              />
              <button
                onClick={() => setActiveTicket(null)}
                className="absolute top-3 right-3 p-1 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="p-6 text-center space-y-3">
                <h2 className="text-xl font-bold dark:text-white">
                  {activeTicket.title}
                </h2>
                <p className="text-sm text-neutral-500">
                  {activeTicket.date} · {activeTicket.location}
                </p>

                {/* Printed ticket specific details (visible on screen and print) */}
                <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 dark:border-white/10 text-left text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Ticket Holder:</span>
                    <span>{user?.name || "Attendee"}</span>
                  </div>
                  {activeTicket.bookedAt && (
                    <div className="flex justify-between">
                      <span className="font-medium">Time of Purchase:</span>
                      <span>{new Date(activeTicket.bookedAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-center py-4">
                  <QRCodeComponent value={activeTicket.code} size={160} />
                </div>

                <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                  {activeTicket.code}
                </p>

                <button
                  onClick={() => window.print()}
                  className="w-full mt-3 py-2 border border-neutral-200 dark:border-white/10 rounded-lg flex items-center justify-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Printer size={16} />
                  Print Ticket
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancellation confirmation modal */}
      <AnimatePresence>
        {cancelConfirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4"
            onClick={() => !isCancelling && setCancelConfirmId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-neutral-200 dark:border-white/5"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-500 mb-4">
                <AlertTriangle size={24} />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Cancel Ticket?
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                Are you sure you want to cancel this ticket? This action cannot
                be undone and you may lose your spot.
              </p>

              <div className="flex gap-3">
                <button
                  disabled={isCancelling}
                  onClick={() => setCancelConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  Keep Ticket
                </button>
                <button
                  disabled={isCancelling}
                  onClick={performCancelTicket}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isCancelling ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Confirm Cancel"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MyTickets;