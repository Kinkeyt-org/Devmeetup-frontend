import React, { useState, useEffect, useRef } from "react";
import { Bell, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // -----------------------------
  // Load notifications & re-sync when hook fires a new one
  // -----------------------------
  useEffect(() => {
    // Read from localStorage on mount
    const readFromStorage = () => {
      const stored = JSON.parse(localStorage.getItem("notifications")) || [];
      if (stored.length === 0) {
        const demo = [
          {
            id: 1,
            title: "Welcome to Nexus!",
            message: "Discover and book tech events near you.",
            time: "Just now",
            read: false,
            type: "system",
          },
        ];
        setNotifications(demo);
        localStorage.setItem("notifications", JSON.stringify(demo));
      } else {
        setNotifications(stored);
      }
    };

    readFromStorage();

    // Re-read whenever the global hook writes a new notification
    window.addEventListener("notificationsUpdated", readFromStorage);
    return () => window.removeEventListener("notificationsUpdated", readFromStorage);
  }, []);

  // -----------------------------
  // Close on outside click
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markOneAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 flex items-center justify-center rounded-full
                   hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="
              fixed sm:absolute
              left-3 md:left-auto md:right-3
              top-14 sm:mt-3
              sm:origin-top-right

              w-[calc(100vw-24px)] sm:w-80
              max-w-sm

              bg-white dark:bg-neutral-900
              border border-neutral-200 dark:border-neutral-800
              rounded-2xl shadow-xl overflow-hidden
              z-50
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Notifications
              </h3>

              <button
                onClick={markAllAsRead}
                className="text-xs text-neutral-500 hover:text-black dark:hover:text-white transition"
              >
                Mark all read
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[320px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-10 text-center text-sm text-neutral-500">
                  No notifications yet
                </div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markOneAsRead(n.id)}
                    className={`
                      w-full text-left flex gap-3 px-4 py-3
                      border-b border-neutral-100 dark:border-neutral-800
                      hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition
                      ${!n.read ? "bg-neutral-50/40 dark:bg-neutral-800/30" : ""}
                    `}
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {n.title}
                      </p>

                      <p className="text-[13px] text-neutral-500 line-clamp-2">
                        {n.message}
                      </p>

                      <p className="text-[10px] uppercase tracking-wider font-semibold text-blue-500 mt-1">
                        {n.time}
                      </p>
                    </div>

                    {/* unread dot */}
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-900/60 text-center">
              <button className="text-xs font-medium text-neutral-500 hover:text-black dark:hover:text-white transition">
                View all activity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;