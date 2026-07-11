import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/event";

/* ================= FEATURED SLIDER =================
   Fetches featured/recent events from the API and
   renders them as a full-width animated hero slider.
   Falls back gracefully on load errors or empty data.
 ==================================================== */

/** Map a raw API event object to the shape this slider expects */
function mapEventToSlide(event) {
  // Resolve image: prefer banner, then image, then a neutral fallback
  const image =
    event.banner ||
    event.image ||
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070";

  return {
    id: event.id,
    image,
  };
}

/* ==================== SKELETON ==================== */
function SliderSkeleton() {
  return (
    <section className="max-w-7xl mx-auto p-5 pt-24 pb-6">
      <div className="relative h-[300px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-800 animate-pulse">
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 md:max-w-xl space-y-3">
          <div className="h-5 w-24 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="h-8 w-3/4 rounded-lg bg-neutral-300 dark:bg-neutral-700" />
          <div className="h-4 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="h-4 w-2/3 rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="flex gap-4 pt-2">
            <div className="h-4 w-28 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-4 w-24 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
          <div className="pt-2 h-9 w-32 rounded-lg bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>
    </section>
  );
}

/* ==================== MAIN COMPONENT ==================== */
export default function FeaturedSlider() {
  const navigate = useNavigate();

  // Slider state
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const timerRef = useRef(null);

  /* ---- Fetch featured events on mount ---- */
  useEffect(() => {
    let cancelled = false;

    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Use "featured" sort type; fall back to "recent" if the API doesn't support it
        const data = await getEvents("featured", 3, 5);
        let events = Array.isArray(data.events) ? data.events : [];

        // If "featured" returned nothing, fall back to recent events
        if (events.length === 0) {
          const fallback = await getEvents("recent", 3, 5);
          events = Array.isArray(fallback.events) ? fallback.events : [];
        }

        if (!cancelled) { 
          setSlides(events.slice(0, 5).map(mapEventToSlide));
          setCurrent(0); // reset index whenever data refreshes
        }
      } catch (err) {
        console.error("[FeaturedSlider] Failed to fetch events:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFeatured();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- Auto-advance timer ---- */
  const startTimer = () => {
    stopTimer();
    if (slides.length < 2) return; // no point cycling a single slide
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Start timer once slides are loaded
  useEffect(() => {
    if (slides.length > 0) startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);

  const handleNext = () => {
    stopTimer();
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    startTimer();
  };

  const handlePrev = () => {
    stopTimer();
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  };

  const handleDotClick = (index) => {
    stopTimer();
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startTimer();
  };

  /* ---- Animation variants ---- */
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  /* ---- Render states ---- */
  if (loading) return <SliderSkeleton />;
  if (slides.length === 0) return null; // nothing to show

  const activeSlide = slides[current];

  return (
    <section
      className="max-w-7xl mx-auto p-5 pt-24 pb-6 relative group overflow-hidden select-none"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <div className="relative h-[300px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-900 bg-neutral-900">

        {/* SLIDE IMAGE */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover brightness-[0.7] scale-105"
            />
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent md:bg-linear-to-r md:from-black/90 md:via-black/40 md:to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* CONTROLS (ARROWS) — only show if more than one slide */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/30 hover:bg-white hover:text-black border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/30 hover:bg-white hover:text-black border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* CONTENT CARD OVERLAY */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 md:max-w-xl text-white">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="space-y-3"
          >

            {/* CTA BUTTON */}
            <div className="pt-4">
              <button
                onClick={() => navigate(`/events/${activeSlide.id}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-black/20"
              >
                Learn More
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* DOTS INDICATORS — only if more than one slide */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 right-1/2 translate-x-1/2 md:right-12 md:translate-x-0 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === current
                    ? "w-6 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
