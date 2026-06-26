import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Mail, Smartphone, Globe, Ticket, Trash2 } from "lucide-react";

// Converts an ISO timestamp (or legacy "Just now" string) to a relative label
const formatTime = (time) => {
  if (!time) return "";
  if (isNaN(Date.parse(time))) return time;
  const diff = Math.floor((Date.now() - new Date(time).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
};

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    marketing: true,
  });

  // Load notifications from local storage and sync real-time changes
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);

    const handleNewNotification = (e) => {
      if (e.detail) {
        setNotifications((prev) => {
          if (prev.some((n) => n.id === e.detail.id)) return prev;
          return [e.detail, ...prev];
        });
      }
    };

    window.addEventListener("new-notification", handleNewNotification);
    return () => {
      window.removeEventListener("new-notification", handleNewNotification);
    };
  }, []);

  const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

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

  const deleteOne = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
        <span className="text-sm md:text-[16px] font-semibold tracking-tight">Notifications</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List (takes 2 columns on large screen) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-neutral-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base md:text-xl font-semibold flex items-center gap-2">
                    <Bell className="w-5 h-5 text-neutral-400" />
                    Recent Activity
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-500 mt-1">
                    Stay up to date with your event invitations and updates.
                  </p>
                </div>
                
                {notifications.length > 0 && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-xs font-medium text-red-500 hover:text-red-650 cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 transition"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-white/5">
                {notifications.length === 0 ? (
                  <div className="py-16 text-center text-sm text-neutral-500 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                      <Bell className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="font-medium text-neutral-900 dark:text-white">No notifications yet</p>
                    <p className="text-xs text-neutral-500 mt-1">We'll let you know when something new comes up.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markOneAsRead(n.id)}
                      className={`
                        w-full text-left flex gap-4 p-6 cursor-pointer
                        hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors group relative
                        ${!n.read ? "bg-neutral-50/40 dark:bg-neutral-800/25" : ""}
                      `}
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pr-8">
                        <div className="flex items-center gap-2">
                          <p className="text-sm md:text-base font-semibold text-neutral-900 dark:text-white truncate">
                            {n.title}
                          </p>
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          )}
                        </div>

                        <p className="text-xs md:text-sm text-neutral-500 mt-1 wrap-break-word">
                          {n.message}
                        </p>

                        <p className="text-[10px] uppercase tracking-wider font-semibold text-blue-500 mt-2">
                          {formatTime(n.time)}
                        </p>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOne(n.id);
                        }}
                        className="absolute right-6 top-6 p-2 rounded-lg text-neutral-450 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Preferences Column (takes 1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-neutral-100 dark:border-white/5">
                <h2 className="text-base md:text-xl font-semibold flex items-center gap-2">
                  <Bell className="w-5 h-5 text-neutral-400" />
                  Preferences
                </h2>
                <p className="text-xs md:text-sm text-neutral-500 mt-1">Control how you want to be notified about events.</p>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-white/5">
                <NotificationToggle 
                  icon={<Mail className="w-5 h-5" />} 
                  title="Email Notifications" 
                  desc="Receive ticket confirmations and updates via email."
                  enabled={settings.email}
                  onToggle={() => toggle('email')}
                />
                <NotificationToggle 
                  icon={<Smartphone className="w-5 h-5" />} 
                  title="Push Notifications" 
                  desc="Get instant alerts on your mobile device."
                  enabled={settings.push}
                  onToggle={() => toggle('push')}
                />
                <NotificationToggle 
                  icon={<Globe className="w-5 h-5" />} 
                  title="Marketing Updates" 
                  desc="Occasional news and special offers."
                  enabled={settings.marketing}
                  onToggle={() => toggle('marketing')}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NotificationToggle = ({ icon, title, desc, enabled, onToggle }) => (
  <div className="p-6 flex items-center justify-between">
    <div className="flex gap-4">
      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-300">
        {icon}
      </div>
      <div>
        <p className="text-sm md:text-base font-semibold">{title}</p>
        <p className="text-[10px] md:text-xs text-neutral-500 max-w-[200px]">{desc}</p>
      </div>
    </div>
    <button 
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default Notifications;
