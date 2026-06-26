import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { initGA, trackPageView } from "./analytics";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { X, Bell } from "lucide-react";

import AuthForm from "./pages/Authform";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Profile from "./pages/Profile";
import MyTickets from "./pages/MyTickets";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import Upgrade from "./pages/Upgrade";
import OrganizerOnboarding from "./pages/OrganizerOnboarding";
import Tech from "./pages/categories/Tech";
import Design from "./pages/categories/Design";
import Business from "./pages/categories/Business";
import Lifestyle from "./pages/categories/Lifestyle";
import Education from "./pages/categories/Education";
import Health from "./pages/categories/Health";
import Music from "./pages/categories/Music";
import Social from "./pages/categories/Social";
import PersonalInfo from "./pages/settings/PersonalInfo";
import Security from "./pages/settings/Security";
import Payments from "./pages/settings/Payments";
import Notifications from "./pages/settings/Notifications";
import HelpCenter from "./pages/support/HelpCenter";
import Terms from "./pages/support/Terms";

import ScrollToTop from "./components/ScrollToTop";


/* ================= APP CONTENT ================= */
const AppContent = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem("token") || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      setUser(localStorage.getItem("token") || null);
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("userUpdate", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userUpdate", syncUser);
    };
  }, []);

  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/search",
    "/profile",
    "/upgrade",
    "/become-organizer",
    "/events/create",
    "/settings/personal-info",
    "/settings/security",
    "/settings/payments",
    "/settings/notifications",
    "/support/help",
    "/support/terms",
  ];

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/categories/");

  /* ================= REAL-TIME NOTIFICATIONS ================= */
  useEffect(() => {
    if (!user) return;

    if (window.Echo) {
      const channel = window.Echo.channel("notifications-channel")
        .listen(".NotificationEvent", (data) => {
          console.log("Notification Triggered:", data.title);

          let link = data.link || data.url;
          if (!link) {
            const eventId = data.event_id || data.eventId || data.event?.id;
            if (eventId) {
              link = `/events/${eventId}`;
            }
          }

          const newNotification = {
            id: Date.now(),
            title: data.title || "New Notification",
            message: data.message || "You received a real-time update.",
            time: "Just now",
            read: false,
            type: data.type || "live",
            link: link || null,
          };

          // Save to localStorage
          try {
            const stored = JSON.parse(localStorage.getItem("notifications")) || [];
            const updated = [newNotification, ...stored];
            localStorage.setItem("notifications", JSON.stringify(updated));
          } catch (e) {
            console.error("Error updating notifications in localStorage", e);
          }

          // Dispatch custom event to sync with UI components (like Notifications dropdown)
          window.dispatchEvent(
            new CustomEvent("new-notification", { detail: newNotification })
          );

          // Trigger toast notification
          const imageUrl = data.picture || data.image || data.image_url;
          if (imageUrl) {
            toast.custom((t) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => {
                  if (newNotification.link) navigate(newNotification.link);
                  toast.dismiss(t.id);
                }}
                className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl overflow-hidden p-1.5 flex items-center justify-center max-w-sm pointer-events-auto cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden w-64 h-64 bg-neutral-100 dark:bg-neutral-950">
                  <img
                    src={imageUrl}
                    alt="Notification"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.dismiss(t.id);
                    }}
                    className="absolute top-2.5 right-2.5 bg-neutral-900/60 hover:bg-neutral-950 text-white rounded-full p-1.5 transition backdrop-blur-xs shadow-md cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </motion.div>
            ), {
              duration: 5000,
            });
          } else {
            toast((t) => (
              <div
                onClick={() => {
                  if (newNotification.link) navigate(newNotification.link);
                  toast.dismiss(t.id);
                }}
                className="flex items-center gap-3 w-full text-left"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                    {newNotification.title}
                  </p>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {newNotification.message}
                  </p>
                </div>
              </div>
            ), {
              duration: 4000,
              className: "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl cursor-pointer p-4 shadow-md pointer-events-auto",
            });
          }
        });

      return () => {
        window.Echo.leaveChannel("notifications-channel");
      };
    }
  }, [user]);

  /* ================= INIT GA ON FIRST LOAD ================= */
  useEffect(() => {
    initGA();
  }, []);

  /* ================= TRACK PAGE VIEWS ================= */
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative z-10">
        {!shouldHideNavbar && <Navbar />}

        <Routes location={backgroundLocation || location}>
          <Route
            path="/"
            element={
              user ? (
                <Dashboard />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/home"
            element={
              !user ? (
                <Home />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/search" element={<Search />} />
          <Route path="/events/create" element={<CreatePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories/tech" element={<Tech />} />
          <Route path="/categories/design" element={<Design />} />
          <Route path="/categories/business" element={<Business />} />
          <Route path="/categories/lifestyle" element={<Lifestyle />} />
          <Route path="/categories/education" element={<Education />} />
          <Route path="/categories/health" element={<Health />} />
          <Route path="/categories/music" element={<Music />} />
          <Route path="/categories/social" element={<Social />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/become-organizer" element={<OrganizerOnboarding />} />
          <Route path="/settings/personal-info" element={<PersonalInfo />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/payments" element={<Payments />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/support/help" element={<HelpCenter />} />
          <Route path="/support/terms" element={<Terms />} />
        </Routes>
      </div>
    </>
  );
};

/* ================= ROOT APP ================= */
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;