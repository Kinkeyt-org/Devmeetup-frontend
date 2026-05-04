import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Settings, ArrowLeft } from "lucide-react";

const OrganizerOnboarding = () => {
  const navigate = useNavigate();

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const handleContinue = () => {
    const user = getUser();

    if (!user) {
      navigate("/login", { state: { from: "/become-organizer" } });
      return;
    }

    if (user.role !== "organizer") {
      navigate("/upgrade");
      return;
    }

    navigate("/events/create");
  };

  return (
    <>
      <Helmet>
        <title>Become an Event Organizer</title>
      </Helmet>

      <main className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100">
        
        {/* PAGE CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">

          {/* TOP BAR */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          {/* HERO */}
          <section className="mt-10 md:mt-20 grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                Host events people <br />
                <span className="bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  actually remember.
                </span>
              </h1>

              <p className="mt-5 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0">
                Turn your ideas into real experiences. Build your audience and create meaningful events.
              </p>

              {/* ACTIONS */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleContinue}
                  className="px-5 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black text-sm flex items-center gap-2 hover:opacity-90 transition"
                >
                  Start Setup <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/events")}
                  className="px-5 py-3 rounded-full border border-neutral-200 dark:border-white/10 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                >
                  Explore Events
                </button>
              </div>

              <p className="text-xs text-neutral-400 mt-5 flex items-center justify-center lg:justify-start gap-2">
                <Settings size={12} /> Takes less than 2 minutes
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden md:block relative rounded-3xl overflow-hidden border border-white/10 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop"
                alt="Event"
                className="h-[500px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-0 p-8 text-white">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                  Why host
                </span>
                <h3 className="mt-3 text-2xl font-medium">
                  Simple. Powerful. Fast.
                </h3>
              </div>
            </div>

            {/* MOBILE IMAGE */}
            <div className="md:hidden rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60"
                alt="Event"
                className="h-56 w-full object-cover"
              />
            </div>

          </section>
        </div>
      </main>
    </>
  );
};

export default OrganizerOnboarding;