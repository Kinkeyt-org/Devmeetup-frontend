import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { initGA, trackPageView } from "./analytics";

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
import Workshops from "./pages/categories/Workshops";
import Education from "./pages/categories/Education";
import Health from "./pages/categories/Health";
import Music from "./pages/categories/Music";
import Social from "./pages/categories/Social";


/* ================= APP CONTENT ================= */
const AppContent = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

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
    "/search",
    "/profile",
    "/upgrade",
    "/become-organizer",
    "/events/create",
  ];

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

      <div className="relative z-10">
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

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
          <Route path="/search" element={<Search />} />
          <Route path="/events/create" element={<CreatePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories/tech" element={<Tech />} />
          <Route path="/categories/design" element={<Design />} />
          <Route path="/categories/business" element={<Business />} />
          <Route path="/categories/lifestyle" element={<Lifestyle />} />
          <Route path="/categories/workshops" element={<Workshops />} />
          <Route path="/categories/education" element={<Education />} />
          <Route path="/categories/health" element={<Health />} />
          <Route path="/categories/music" element={<Music />} />
          <Route path="/categories/social" element={<Social />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/become-organizer" element={<OrganizerOnboarding />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path="/categories/tech" element={<Tech />} />
            <Route path="/categories/design" element={<Design />} />
            <Route path="/categories/business" element={<Business />} />
            <Route path="/categories/lifestyle" element={<Lifestyle />} />
            <Route path="/categories/workshops" element={<Workshops />} />
            <Route path="/categories/education" element={<Education />} />
            <Route path="/categories/health" element={<Health />} />
            <Route path="/categories/music" element={<Music />} />
            <Route path="/categories/social" element={<Social />} />
          </Routes>
        )}
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