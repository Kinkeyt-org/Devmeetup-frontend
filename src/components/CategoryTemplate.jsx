import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, Users, Mail, ArrowRight, Sparkles } from "lucide-react";
import EventCard from "./EventCard";
import SEO from "./SEO";

const CategoryTemplate = ({
  name,
  seoDescription,
  seoKeywords,
  heroImage,
  description,
  accentGradient, // e.g. "from-cyan-500 to-blue-600"
  accentColor,    // e.g. "text-cyan-500"
  accentGlow,     // e.g. "shadow-cyan-500/20"
  statIcon: StatIcon, // Lucide icon for stats
  statCount = "1.5K",
  statLabel = "Events",
  subCount = "10K",
  subLabel = "Subscribers",
  events = []
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 overflow-y-auto scrollbar-hide overflow-x-hidden relative font-sans transition-colors duration-150">
      <SEO 
        title={`${name} Events`} 
        description={seoDescription} 
        url={`https://devmeetup-frontend.vercel.app/categories/${name.toLowerCase()}`}
        keywords={seoKeywords}
      />

      {/* Floating Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-white/80 dark:bg-neutral-900/80 hover:scale-105 active:scale-95 text-neutral-800 dark:text-white rounded-full shadow-lg border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md transition-all duration-300 cursor-pointer"
        aria-label="Close category"
      >
        <X size={20} />
      </button>

      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[550px] shrink-0">
        <img
          src={heroImage}
          alt={`${name} banner`}
          className="w-full h-full object-cover"
        />
        {/* Soft radial overlay glow */}
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-neutral-950/20 to-neutral-950/70" />
        
        {/* Main Linear Fade to Background */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-50 via-neutral-50/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20 relative z-10">
            
            {/* Category Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 dark:bg-neutral-900/40 border border-white/20 dark:border-neutral-800/40 backdrop-blur-md text-xs font-semibold text-neutral-900 dark:text-white w-fit mb-4">
              <Sparkles size={12} className={`${accentColor} fill-current`} />
              <span>Category</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              <span className={`text-transparent bg-clip-text bg-linear-to-r ${accentGradient}`}>
                {name}
              </span>
            </h1>

            {/* Stats Cards Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-neutral-900/30 border border-white/30 dark:border-neutral-800/30 backdrop-blur-md text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <div className={`p-1.5 rounded-lg bg-white/60 dark:bg-neutral-800/50 ${accentColor}`}>
                  <StatIcon size={16} />
                </div>
                <span><strong className="text-neutral-900 dark:text-white">{statCount}</strong> {statLabel}</span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-neutral-900/30 border border-white/30 dark:border-neutral-800/30 backdrop-blur-md text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <div className={`p-1.5 rounded-lg bg-white/60 dark:bg-neutral-800/50 ${accentColor}`}>
                  <Users size={16} />
                </div>
                <span><strong className="text-neutral-900 dark:text-white">{subCount}</strong> {subLabel}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-2xl leading-relaxed">
              {description}
            </p>

            {/* Premium Subscribe Box */}
            <form onSubmit={handleSubscribe} className="relative w-full max-w-md">
              <div className={`flex rounded-2xl bg-white/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 p-1.5 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-neutral-950 transition duration-300 shadow-xl backdrop-blur-md ${accentGlow}`}>
                <div className="flex items-center pl-3 text-neutral-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Subscribe for updates..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent border-0 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-0"
                />
                <button 
                  type="submit"
                  className="shrink-0 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all text-xs md:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {subscribed ? "Subscribed!" : (
                    <>
                      Subscribe <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
              Popular {name} Events
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Handpicked experiences curated for you.
            </p>
          </div>
        </div>
        
        {events.length === 0 ? (
          <div className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl p-16 text-center">
            <p className="text-neutral-500">No events found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className="hover:scale-[1.02] hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryTemplate;
