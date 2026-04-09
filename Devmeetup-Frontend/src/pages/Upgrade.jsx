import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
        <title>Become an Organizer</title>
        <meta
          name="description"
          content="Start hosting events and build your community."
        />
      </Helmet>

      <div className="min-h-screen bg-white text-[#1d1d1f] font-['Satoshi'] antialiased">

        {/* subtle top bar (optional but premium feel) */}
        <div className="w-full flex justify-between items-center px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-neutral-500 hover:text-black transition"
          >
            ← Back
          </button>

          <p className="text-xs tracking-[0.3em] uppercase text-neutral-300">
            onboarding
          </p>

          <div />
        </div>

        {/* HERO SECTION */}
        <section className="pt-16 pb-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            {/* TEXT */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
                Organizer Setup
              </p>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Host events that
                <br />
                <span className="text-neutral-300">people remember.</span>
              </h1>

              <p className="text-neutral-500 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                Turn ideas into real experiences. Build communities, grow your
                audience, and create events that matter on a platform built for creators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleContinue}
                  className="px-10 py-4 bg-black text-white rounded-full font-bold hover:scale-[1.02] active:scale-95 transition shadow-lg"
                >
                  Continue Setup
                </button>

                <button
                  onClick={() => navigate("/events")}
                  className="px-10 py-4 border border-neutral-200 rounded-full font-bold hover:bg-neutral-50 transition"
                >
                  Explore Events
                </button>
              </div>

              {/* micro trust line */}
              <p className="text-xs text-neutral-400 mt-6">
                Takes less than 2 minutes to get started.
              </p>
            </div>

            {/* HERO IMAGE */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="Event hosting"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-[0.2em] opacity-80">
                  Why host here?
                </p>
                <h3 className="text-2xl font-bold">
                  Simple. Powerful. Fast.
                </h3>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-7 rounded-3xl border border-neutral-100 hover:shadow-sm transition">
              <h3 className="font-bold text-xl mb-2">Reach people</h3>
              <p className="text-neutral-500">
                Get discovered by users actively looking for events like yours.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-neutral-100 hover:shadow-sm transition">
              <h3 className="font-bold text-xl mb-2">Easy setup</h3>
              <p className="text-neutral-500">
                Create and publish events in minutes with a clean workflow.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-neutral-100 hover:shadow-sm transition">
              <h3 className="font-bold text-xl mb-2">Build community</h3>
              <p className="text-neutral-500">
                Turn attendees into loyal followers and repeat participants.
              </p>
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default OrganizerOnboarding;