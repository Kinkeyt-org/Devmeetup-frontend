import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  ArrowRight,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SLIDES = [
  {
    id: "fs1",
    title: "NextGen AI & Tech Summit 2026",
    category: "Technology",
    date: "June 15 - 18, 2026",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
    description: "Join 10,000+ developers, innovators, and leaders defining the next decade of spatial computing, generative models, and decentralized systems.",
  },
  {
    id: "fs2",
    title: "Global Design Forum & Awards",
    category: "Design",
    date: "July 20 - 22, 2026",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=2070",
    description: "The premier gathering for visual architects, brand thinkers, and product designers. Celebrating aesthetic excellence and future interactive trends.",
  },
  {
    id: "fs3",
    title: "Vanguard Music & Arts Festival",
    category: "Music",
    date: "August 12 - 15, 2026",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070",
    description: "Experience three days of boundary-pushing audio-visual showcases, international headline acts, and immersive installation art.",
  },
  {
    id: "fs4",
    title: "World Business Innovation Congress",
    category: "Business",
    date: "September 05 - 08, 2026",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    description: "Reimagining business models for a sustainable tomorrow. Network with executive minds, venture capitals, and high-growth founders.",
  }
];

export default function FeaturedSlider() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handleNext = () => {
    stopTimer();
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    startTimer();
  };

  const handlePrev = () => {
    stopTimer();
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  const handleDotClick = (index) => {
    stopTimer();
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startTimer();
  };

  // Animation variants
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

  const activeSlide = SLIDES[current];

  return (
    <section 
      className="max-w-7xl mx-auto hidden md:flex pt-24 pb-6 relative group overflow-hidden select-none"
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

        {/* CONTROLS (ARROWS) */}
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

        {/* CONTENT CARD OVERLAY */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 md:max-w-xl text-white">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="space-y-3"
          >
            {/* CATEGORY TAG */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
              {activeSlide.category}
            </div>

            {/* TITLE */}
            <h3 className="text-xl md:text-3.5xl font-bold leading-tight tracking-tight">
              {activeSlide.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-normal line-clamp-2 md:line-clamp-none">
              {activeSlide.description}
            </p>

            {/* META ROW */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-[11px] md:text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-amber-500" />
                {activeSlide.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-amber-500" />
                {activeSlide.location}
              </span>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-4">
              <button
                onClick={() => navigate(`/events`)} // Standard redirect or modal
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-black/20"
              >
                Learn More
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* DOTS INDICATORS */}
        <div className="absolute bottom-4 right-1/2 translate-x-1/2 md:right-12 md:translate-x-0 z-20 flex gap-2">
          {SLIDES.map((_, index) => (
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

      </div>
    </section>
  );
}
