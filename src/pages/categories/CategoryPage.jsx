import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  X,
  Cpu,
  Palette,
  Briefcase,
  Smile,
  Music as MusicIcon,
  GraduationCap,
  Heart,
  Users as UsersIcon,
  Calendar,
  Users
} from "lucide-react";
import { getEvents } from "../../api/event";
import EventCard from "../../components/EventCard";
import SEO from "../../components/SEO";
import SubscribeForm from "../../components/SubscribeForm";

const CATEGORY_CONFIGS = {
  tech: {
    name: "Technology",
    tagName: "Technology",
    icon: Cpu,
    banner: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop",
    eventsStat: "4K",
    usersStat: "38K",
    userType: "Subscribers",
    description: "Join a hackathon, jam on product design, and meet fellow tinkerers in the industry of tomorrow.",
    seoTitle: "Tech Events",
    seoDescription: "Discover popular Tech events, workshops, hackathons, and meetups. Join the builder community today.",
    keywords: "tech events, programming, hackathons, developer meetups, software engineering"
  },
  design: {
    name: "Design",
    tagName: "Design",
    icon: Palette,
    banner: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1632&auto=format&fit=crop",
    eventsStat: "2.5K",
    usersStat: "25K",
    userType: "Creators",
    description: "Connect with fellow creatives, explore the latest UI/UX trends, and elevate your design skills in the industry's top events.",
    seoTitle: "Design Events",
    seoDescription: "Discover creative design events, UI/UX workshops, and typography meetups. Connect with top creators.",
    keywords: "design events, UI/UX, product design, creative meetups, graphic design"
  },
  business: {
    name: "Business",
    tagName: "Business",
    icon: Briefcase,
    banner: "https://images.unsplash.com/photo-1474377207190-a7d8b3334068?q=80&w=2070&auto=format&fit=crop",
    eventsStat: "8K",
    usersStat: "65K",
    userType: "Professionals",
    description: "Discover opportunities, expand your network, and scale your career through exclusive business and entrepreneurship events.",
    seoTitle: "Business Events",
    seoDescription: "Discover professional business events, startup pitch nights, and networking meetups. Scale your career.",
    keywords: "business events, networking, startup pitch, entrepreneurship, professional development"
  },
  lifestyle: {
    name: "Lifestyle",
    tagName: "Lifestyle",
    icon: Smile,
    banner: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1169&auto=format&fit=crop",
    eventsStat: "12K",
    usersStat: "90K",
    userType: "Enthusiasts",
    description: "Enrich your daily life with wellness retreats, incredible culinary experiences, culture trips, and mindful gatherings.",
    seoTitle: "Lifestyle Events",
    seoDescription: "Discover local lifestyle events, cooking masterclasses, wellness retreats, and coffee tasting meetups.",
    keywords: "lifestyle events, wellness, cooking masterclass, coffee tasting, local gatherings"
  },
  music: {
    name: "Music",
    tagName: "Music",
    icon: MusicIcon,
    banner: "https://i.pinimg.com/736x/31/81/17/31811734d6d0f3d1250dec1442093a99.jpg",
    eventsStat: "20K",
    usersStat: "150K",
    userType: "Fans",
    description: "Feel the rhythm at live concerts, intimate acoustic sessions, and massive electronic festivals around the globe.",
    seoTitle: "Music Events & Concerts",
    seoDescription: "Discover electronic music festivals, acoustic sessions, jazz nights, and music production masterclasses.",
    keywords: "music events, concerts, live music, jazz night, music production, festivals"
  },
  education: {
    name: "Education",
    tagName: "Education",
    icon: GraduationCap,
    banner: "https://images.pexels.com/photos/6193147/pexels-photo-6193147.jpeg",
    eventsStat: "1.2K",
    usersStat: "12K",
    userType: "Students",
    description: "Expand your horizons, learn new skills, and connect with fellow learners through our curated educational workshops and seminars.",
    seoTitle: "Education Events",
    seoDescription: "Discover educational events, academic workshops, language learning meetups, and student research seminars.",
    keywords: "education events, academic seminars, edtech conference, workshops, learning"
  },
  health: {
    name: "Health",
    tagName: "Health",
    icon: Heart,
    banner: "https://images.pexels.com/photos/8376307/pexels-photo-8376307.jpeg",
    eventsStat: "9K",
    usersStat: "75K",
    userType: "Enthusiasts",
    description: "Focus on your well-being with fitness classes, mental health workshops, and groundbreaking medical symposiums.",
    seoTitle: "Health & Wellness Events",
    seoDescription: "Discover wellness summits, mental health workshops, nutrition expos, and holistic healing gatherings.",
    keywords: "health events, wellness summit, mental health workshop, nutrition, holistic healing"
  },
  social: {
    name: "Social",
    tagName: "Social",
    icon: UsersIcon,
    banner: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    eventsStat: "15K",
    usersStat: "120K",
    userType: "Members",
    description: "Meet new people, find your community, and make lasting memories at exciting social gatherings and mixers.",
    seoTitle: "Social Events & Meetups",
    seoDescription: "Discover social gatherings, speed networking mixers, expat meetups, and board game nights near you.",
    keywords: "social events, mixers, networking, board game night, community gatherings"
  }
};

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = CATEGORY_CONFIGS[category];

  useEffect(() => {
    if (!config) return;

    const fetchAndFilterEvents = async () => {
      setLoading(true);
      try {
        // Fetch real-time upcoming events
        const data = await getEvents("upcoming", 1, 100);
        const allEvents = Array.isArray(data.events) ? data.events : [];
        
        // Filter events where tag matches the category's tagName (case-insensitive)
        const filtered = allEvents.filter((event) => {
          let eventTags = [];
          if (Array.isArray(event.tags)) {
            eventTags = event.tags;
          } else if (typeof event.tags === "string") {
            try {
              eventTags = JSON.parse(event.tags);
            } catch (e) {
              eventTags = [event.tags];
            }
          }
          
          const targetTag = config.tagName.toLowerCase();
          return Array.isArray(eventTags)
            ? eventTags.some((t) => typeof t === "string" && t.toLowerCase() === targetTag)
            : typeof eventTags === "string" && eventTags.toLowerCase() === targetTag;
        });
        
        setEvents(filtered);
      } catch (err) {
        console.error("Error fetching category events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterEvents();
  }, [category, config]);

  const handleClose = () => {
    navigate(-1);
  };

  if (!config) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#111111] text-neutral-900 dark:text-white">
        <h2 className="text-xl font-semibold">Category not found</h2>
        <button onClick={handleClose} className="mt-4 px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-50 dark:bg-[#111111] overflow-y-auto scrollbar-hide overflow-x-hidden relative">
      <SEO 
        title={config.seoTitle} 
        description={config.seoDescription} 
        url={`https://devmeetup-frontend.vercel.app/categories/${category}`}
        keywords={config.keywords}
      />
      
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-60 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer"
      >
        <X size={24} />
      </button>

      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[500px]">
        <img
          src={config.banner}
          alt={`${config.name} banner`}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-[#111111] dark:via-[#111111]/80 dark:to-transparent">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-end px-6 pb-12 md:pb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">{config.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium mb-4 md:mb-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Icon size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">{config.eventsStat}</strong> Events</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Users size={18} className="text-neutral-500 dark:text-neutral-400 md:w-5 md:h-5" />
                <span><strong className="text-neutral-900 dark:text-white">{config.usersStat}</strong> {config.userType}</span>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-lg mb-8 max-w-md md:max-w-xl leading-relaxed">
              {config.description}
            </p>
            <SubscribeForm className="max-w-md shadow-lg" />
          </div>
        </div>
      </section>

      {/* EVENTS LISTING */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Popular {config.name} Events</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-neutral-500 border border-dashed rounded-2xl border-neutral-200 dark:border-neutral-800">
            <p className="text-lg">No events found for this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
