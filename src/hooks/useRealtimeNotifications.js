import { useEffect } from "react";
import toast from "react-hot-toast";

/**
 * useRealtimeNotifications
 *
 * Attaches Laravel Echo / Pusher listeners at the App level so they
 * stay alive on every route — including pages where the Navbar (and
 * the bell component) are hidden (e.g. /events/create).
 *
 * Fires a toast whenever:
 *  - A new event is published  → 'events' channel / '.event.created'
 *  - A generic notification fires → 'notifications-channel' / '.NotificationEvent'
 *
 * Also persists incoming notifications to localStorage so the bell
 * can read them on next render.
 */
const useRealtimeNotifications = () => {
  useEffect(() => {
    if (!window.Echo) return;

    // ── helper ──────────────────────────────────────────────────────────────
    const pushNotification = (title, message) => {
      console.log("[useRealtimeNotifications]", { title, message });

      const notification = {
        id: Date.now(),
        title: title || "New Notification",
        message: message || "You received a real-time update.",
        time: "Just now",
        read: false,
        type: "live",
      };

      // Persist to localStorage so the bell badge updates
      const stored = JSON.parse(localStorage.getItem("notifications")) || [];
      localStorage.setItem(
        "notifications",
        JSON.stringify([notification, ...stored])
      );

      // Fire a toast that is visible on any page
      toast(`🔔 ${notification.title}: ${notification.message}`, {
        duration: 4000,
        className:
          "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl",
      });

      // Let the bell component know it should re-read localStorage
      window.dispatchEvent(new Event("notificationsUpdated"));
    };

    // ── channels ─────────────────────────────────────────────────────────────

    // 1. New event created by anyone
    const eventsChannel = window.Echo.channel("events").listen(
      ".event.created",
      (data) => {
        const event = data.event || data;
        pushNotification(
          `New Event: ${event.title}`,
          `by ${event.organizer?.name || "someone"} · ${event.location || ""}`.trim()
        );
      }
    );

    // 2. Generic backend notifications
    const notifChannel = window.Echo.channel("notifications-channel").listen(
      ".NotificationEvent",
      (data) => {
        pushNotification(data.title, data.message);
      }
    );

    // ── cleanup ───────────────────────────────────────────────────────────────
    return () => {
      eventsChannel.stopListening(".event.created");
      notifChannel.stopListening(".NotificationEvent");
    };
  }, []);
};

export default useRealtimeNotifications;
