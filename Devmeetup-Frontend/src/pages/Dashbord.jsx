import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const MapPin = ({ size }) => <Icon size={size} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4z" />;
const Video = ({ size }) => <svg width={size || 18} height={size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
const Search = ({ size }) => <Icon size={size} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />;
const Bell = ({ size }) => <Icon size={size} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />;
const Plus = ({ size }) => <Icon size={size} d="M12 5v14M5 12h14" />;
const Star = ({ size, filled }) => <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Users = ({ size }) => <Icon size={size} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />;
const Ticket = ({ size }) => <Icon size={size} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />;
const Calendar = ({ size }) => <Icon size={size} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
const Heart = ({ size, filled }) => <svg width={size || 16} height={size || 16} viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const Share2 = ({ size }) => <Icon size={size} d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zM21 19a3 3 0 11-6 0 3 3 0 016 0z" />;
const MessageCircle = ({ size }) => <Icon size={size} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />;
const Filter = ({ size }) => <Icon size={size} d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
const ChevronDown = ({ size }) => <Icon size={size} d="M6 9l6 6 6-6" />;
const Flame = ({ size }) => <Icon size={size} d="M12 2c0 0-3 4-3 7a3 3 0 006 0c0-3-3-7-3-7zM5 19c0-4 3-7 7-8 4 1 7 4 7 8a7 7 0 01-14 0z" />;
const TrendingUp = ({ size }) => <Icon size={size} d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />;
const Globe = ({ size }) => <Icon size={size} d="M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />;
const Music = ({ size }) => <Icon size={size} d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" />;
const Code = ({ size }) => <Icon size={size} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />;
const Palette = ({ size }) => <Icon size={size} d="M12 22a10 10 0 110-20 10 10 0 010 20zm0 0c-1.66 0-3-1.34-3-3 0-1.66 3-8 3-8s3 6.34 3 8c0 1.66-1.34 3-3 3z" />;
const Coffee = ({ size }) => <Icon size={size} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-7v3m4-3v3m4-3v3" />;
const Bookmark = ({ size, filled }) => <svg width={size || 16} height={size || 16} viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "currentColor"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>;
const CheckCircle = ({ size }) => <Icon size={size} d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />;
const LogOut = ({ size }) => <Icon size={size} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />;
const BarChart2 = ({ size }) => <Icon size={size} d="M18 20V10M12 20V4M6 20v-6" />;
const Settings = ({ size }) => <Icon size={size} d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All Events", icon: <Globe size={15} /> },
  { id: "tech", label: "Tech", icon: <Code size={15} /> },
  { id: "music", label: "Music", icon: <Music size={15} /> },
  { id: "art", label: "Art & Design", icon: <Palette size={15} /> },
  { id: "business", label: "Business", icon: <TrendingUp size={15} /> },
  { id: "social", label: "Social", icon: <Coffee size={15} /> },
];

const TAGS = ["React", "Startup", "AI/ML", "Product", "Jazz", "Photography", "UX", "Blockchain", "NFT", "VC", "Lagos", "Abuja"];

const MOCK_EVENTS = [
  {
    id: 1, type: "physical",
    title: "Lagos Tech Summit 2026",
    organizer: "TechHub Lagos",
    avatar: "TH",
    avatarColor: "#f59e0b",
    category: "tech",
    tags: ["AI/ML", "Startup", "Product"],
    date: "Apr 12, 2026", time: "10:00 AM",
    location: "Eko Convention Centre, VI",
    cover: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #f59e0b22 100%)", // Kept covers dark for visual contrast
    coverEmoji: "🚀",
    price: "₦15,000",
    attendees: 842, maxAttendees: 1000,
    rating: 4.8, reviews: 124,
    liked: false, bookmarked: false, going: false,
    description: "The biggest tech gathering in West Africa. Speakers from Google, Meta, and leading African startups.",
    trending: true,
    comments: 38,
  },
  {
    id: 2, type: "virtual",
    title: "Figma + AI: The New Design Workflow",
    organizer: "DesignAfrica",
    avatar: "DA",
    avatarColor: "#8b5cf6",
    category: "art",
    tags: ["UX", "Product", "AI/ML"],
    date: "Apr 5, 2026", time: "3:00 PM",
    location: "Zoom Webinar",
    cover: "linear-gradient(135deg, #1a0533 0%, #3b0764 50%, #8b5cf622 100%)",
    coverEmoji: "🎨",
    price: "Free",
    attendees: 1243, maxAttendees: 2000,
    rating: 4.9, reviews: 89,
    liked: true, bookmarked: true, going: true,
    description: "Explore how AI is reshaping design tools. Live demos, Q&A, and hands-on Figma workshop.",
    trending: true,
    comments: 62,
  },
  {
    id: 3, type: "physical",
    title: "Afrobeats Night — Garden Edition",
    organizer: "SoundWave Events",
    avatar: "SW",
    avatarColor: "#10b981",
    category: "music",
    tags: ["Jazz", "Lagos"],
    date: "Apr 19, 2026", time: "8:00 PM",
    location: "The Landmark Beach, Lagos",
    cover: "linear-gradient(135deg, #022c22 0%, #065f46 50%, #10b98122 100%)",
    coverEmoji: "🎵",
    price: "₦25,000",
    attendees: 567, maxAttendees: 800,
    rating: 4.7, reviews: 203,
    liked: false, bookmarked: false, going: false,
    description: "An unforgettable evening of live Afrobeats under the stars. Open bar, food trucks, and 3 headline acts.",
    trending: false,
    comments: 91,
  },
  {
    id: 4, type: "virtual",
    title: "Startup Pitch: Demo Day Lagos",
    organizer: "VentureCapNG",
    avatar: "VC",
    avatarColor: "#ef4444",
    category: "business",
    tags: ["VC", "Startup", "Blockchain"],
    date: "Apr 8, 2026", time: "2:00 PM",
    location: "Google Meet",
    cover: "linear-gradient(135deg, #1c0404 0%, #450a0a 50%, #ef444422 100%)",
    coverEmoji: "💡",
    price: "Free",
    attendees: 321, maxAttendees: 500,
    rating: 4.6, reviews: 44,
    liked: false, bookmarked: true, going: false,
    description: "Watch 10 of Nigeria's most promising startups pitch live to a panel of top-tier VCs.",
    trending: false,
    comments: 27,
  },
  {
    id: 5, type: "physical",
    title: "Photography Masterclass",
    organizer: "Frame & Light Studio",
    avatar: "FL",
    avatarColor: "#0ea5e9",
    category: "art",
    tags: ["Photography", "UX"],
    date: "Apr 22, 2026", time: "9:00 AM",
    location: "Ikoyi Creative Hub, Lagos",
    cover: "linear-gradient(135deg, #020c14 0%, #0c2a4a 50%, #0ea5e922 100%)",
    coverEmoji: "📸",
    price: "₦8,000",
    attendees: 48, maxAttendees: 60,
    rating: 5.0, reviews: 17,
    liked: true, bookmarked: false, going: false,
    description: "An intimate hands-on class covering portraiture, street photography, and post-processing techniques.",
    trending: false,
    comments: 14,
  },
  {
    id: 6, type: "physical",
    title: "Networking Brunch — Tech Edition",
    organizer: "Founders Circle",
    avatar: "FC",
    avatarColor: "#f97316",
    category: "social",
    tags: ["Startup", "Lagos", "Product"],
    date: "Apr 27, 2026", time: "11:00 AM",
    location: "Nok by Alara, Lagos",
    cover: "linear-gradient(135deg, #1c0a00 0%, #431407 50%, #f9731622 100%)",
    coverEmoji: "☕",
    price: "₦5,000",
    attendees: 93, maxAttendees: 120,
    rating: 4.5, reviews: 66,
    liked: false, bookmarked: false, going: false,
    description: "Casual Sunday brunch for founders, makers, and creatives. Swap ideas over good food and great company.",
    trending: true,
    comments: 33,
  },
];

const STORIES = [
  { id: 1, name: "Your Story", avatar: "+", isAdd: true, color: "#f59e0b" },
  { id: 2, name: "TechHub", avatar: "TH", color: "#f59e0b", active: true },
  { id: 3, name: "SoundWave", avatar: "SW", color: "#10b981", active: true },
  { id: 4, name: "VentureNG", avatar: "VC", color: "#ef4444", active: false },
  { id: 5, name: "DesignAf", avatar: "DA", color: "#8b5cf6", active: true },
  { id: 6, name: "Frame&Lt", avatar: "FL", color: "#0ea5e9", active: false },
];

const SUGGESTIONS = [
  { id: 1, name: "ByteBuilders", avatar: "BB", color: "#6366f1", followers: "2.1k", category: "Tech" },
  { id: 2, name: "ArtSpace NG", avatar: "AS", color: "#ec4899", followers: "8.4k", category: "Art" },
  { id: 3, name: "GrowthHQ", avatar: "GH", color: "#14b8a6", followers: "1.3k", category: "Business" },
];

const UPCOMING = [
  { id: 2, title: "Figma + AI Workshop", date: "Apr 5", time: "3PM", color: "#8b5cf6" },
  { id: 1, title: "Lagos Tech Summit", date: "Apr 12", time: "10AM", color: "#f59e0b" },
  { id: 3, title: "Afrobeats Night", date: "Apr 19", time: "8PM", color: "#10b981" },
];

// ─── Stars ────────────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => <Star key={i} filled={i <= Math.round(rating)} />)}
    </span>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event, onToggleLike, onToggleBookmark, onToggleGoing }) {
  const pct = Math.round((event.attendees / event.maxAttendees) * 100);
  const almostFull = pct >= 80;

  return (
    <article
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 transition-all duration-300 group shadow-sm"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden" style={{ background: event.cover }}>
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:opacity-30 transition-opacity select-none">
          {event.coverEmoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.type === "virtual" ? (
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/30">
              <Video size={11} /> Virtual
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30">
              <MapPin size={11} /> In-Person
            </span>
          )}
          {event.trending && (
            <span className="flex items-center gap-1 bg-red-500/30 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-red-500/30">
              <Flame size={11} /> Hot
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${event.price === "Free" ? "bg-emerald-500/90 text-white shadow-sm" : "bg-white text-neutral-900 shadow-sm"}`}>
            {event.price}
          </span>
        </div>

        {/* Organizer */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20" style={{ background: event.avatarColor }}>
            {event.avatar}
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-md">{event.organizer}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {event.tags.slice(0, 2).map(t => (
            <span key={t} className="text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">#{t}</span>
          ))}
        </div>

        <h3 className="text-neutral-900 font-bold text-base leading-tight mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-neutral-500 text-xs leading-relaxed mb-3 line-clamp-2">{event.description}</p>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium">
            <Calendar size={13} />
            <span>{event.date} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium">
            {event.type === "virtual" ? <Video size={13} /> : <MapPin size={13} />}
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={event.rating} />
          <span className="text-amber-500 text-xs font-bold">{event.rating}</span>
          <span className="text-neutral-400 text-xs font-medium">({event.reviews})</span>
        </div>

        {/* Capacity bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="flex items-center gap-1 text-neutral-500 text-xs font-medium">
              <Users size={12} /> {event.attendees.toLocaleString()} going
            </span>
            <span className={`text-xs font-semibold ${almostFull ? "text-red-500" : "text-neutral-500"}`}>
              {almostFull ? `Only ${event.maxAttendees - event.attendees} left!` : `${pct}% full`}
            </span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: almostFull ? "#ef4444" : event.avatarColor }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onToggleLike(event.id)} className="flex items-center gap-1.5 text-neutral-500 hover:text-red-500 transition-colors text-xs font-medium">
              <Heart size={15} filled={event.liked} />
              <span className={event.liked ? "text-red-500" : ""}>{event.liked ? "Liked" : "Like"}</span>
            </button>
            <button className="flex items-center gap-1.5 text-neutral-500 hover:text-blue-500 transition-colors text-xs font-medium">
              <MessageCircle size={15} />
              <span>{event.comments}</span>
            </button>
            <button className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 transition-colors text-xs font-medium">
              <Share2 size={15} />
            </button>
            <button onClick={() => onToggleBookmark(event.id)} className="flex items-center gap-1.5 text-neutral-500 hover:text-amber-500 transition-colors text-xs font-medium">
              <Bookmark size={15} filled={event.bookmarked} />
            </button>
          </div>
          <button
            onClick={() => onToggleGoing(event.id)}
            className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-200 ${
              event.going
                ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200"
                : "bg-amber-400 hover:bg-amber-500 text-black shadow-md shadow-amber-400/20"
            }`}
          >
            {event.going ? (
              <span className="flex items-center gap-1"><CheckCircle size={12} /> Going</span>
            ) : "RSVP"}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Create Event Modal ───────────────────────────────────────────────────────
function CreateEventModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", category: "tech", type: "physical", date: "", time: "", location: "", price: "", description: "" });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white border border-neutral-200 rounded-2xl w-full max-w-lg shadow-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100">
          <div>
            <h2 className="text-neutral-900 font-bold text-lg">Create Event</h2>
            <p className="text-neutral-500 text-xs mt-0.5">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-800 transition-colors text-xl leading-none">×</button>
        </div>

        {/* Progress */}
        <div className="flex gap-1 px-5 pt-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-neutral-100">
              <div className="h-full bg-amber-400 transition-all duration-500 rounded-full" style={{ width: step >= i ? "100%" : "0%" }} />
            </div>
          ))}
        </div>

        <div className="p-5 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Event Title</label>
                <input value={form.title} onChange={e => update("title", e.target.value)} placeholder="Give your event a memorable name"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.slice(1).map(c => (
                    <button key={c.id} onClick={() => update("category", c.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${form.category === c.id ? "bg-amber-50 border-amber-400 text-amber-600" : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100"}`}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Event Type</label>
                <div className="flex gap-3">
                  {["physical","virtual"].map(t => (
                    <button key={t} onClick={() => update("type", t)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.type === t ? "bg-amber-50 border-amber-400 text-amber-600" : "bg-neutral-50 border-neutral-200 text-neutral-600"}`}>
                      {t === "physical" ? <MapPin size={14} /> : <Video size={14} />}
                      {t === "physical" ? "In-Person" : "Virtual"}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Date</label>
                  <input type="date" value={form.date} onChange={e => update("date", e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Time</label>
                  <input type="time" value={form.time} onChange={e => update("time", e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">
                  {form.type === "physical" ? "Venue Address" : "Meeting Link"}
                </label>
                <input value={form.location} onChange={e => update("location", e.target.value)}
                  placeholder={form.type === "physical" ? "Enter full address for map integration" : "Zoom / Google Meet / Teams link"}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
              </div>
              {form.type === "physical" && (
                <div className="h-32 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-center gap-2 text-neutral-400 text-sm font-medium">
                  <MapPin size={16} /> Map preview will appear here
                </div>
              )}
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Ticket Price</label>
                <div className="flex gap-3">
                  <button onClick={() => update("price","Free")} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.price === "Free" ? "bg-amber-50 border-amber-400 text-amber-600" : "bg-neutral-50 border-neutral-200 text-neutral-600"}`}>Free</button>
                  <input value={form.price !== "Free" ? form.price : ""} onChange={e => update("price", e.target.value)}
                    placeholder="₦ Set price"
                    className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Event Description</label>
                <textarea value={form.description} onChange={e => update("description", e.target.value)}
                  placeholder="Tell people what makes your event special..."
                  rows={4}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5 font-bold uppercase tracking-wide">Add Tags</label>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(t => (
                    <button key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all">
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <p className="text-neutral-900 font-bold text-sm mb-1">{form.title || "Your Event Title"}</p>
                <p className="text-neutral-500 text-xs font-medium">{form.date || "Date TBD"} · {form.location || "Location TBD"} · {form.price || "Price TBD"}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between px-5 pb-5 gap-3">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
            className="flex-1 py-3 rounded-xl text-sm font-bold border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-all">
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button onClick={() => step < 3 ? setStep(s => s + 1) : onClose()}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-500 text-black transition-all shadow-md shadow-amber-400/20">
            {step === 3 ? "🚀 Publish Event" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [followed, setFollowed] = useState({});
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const toggleLike = (id) => setEvents(ev => ev.map(e => e.id === id ? { ...e, liked: !e.liked } : e));
  const toggleBookmark = (id) => setEvents(ev => ev.map(e => e.id === id ? { ...e, bookmarked: !e.bookmarked } : e));
  const toggleGoing = (id) => setEvents(ev => ev.map(e => e.id === id ? { ...e, going: !e.going, attendees: e.going ? e.attendees - 1 : e.attendees + 1 } : e));
  const toggleFollow = (id) => setFollowed(f => ({ ...f, [id]: !f[id] }));

  const filtered = events.filter(e => {
    const matchCat = activeCategory === "all" || e.category === activeCategory;
    const matchType = filterType === "all" || e.type === filterType;
    const matchSearch = !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) || e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === "discover" || (activeTab === "going" && e.going) || (activeTab === "saved" && e.bookmarked);
    return matchCat && matchType && matchSearch && matchTab;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f9fafb" }} className="min-h-screen text-neutral-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f9fafb; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .feed-scroll::-webkit-scrollbar { display: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} />}

      {/* Mobile Sidebar Overlay */}
      {mobileSidebar && <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileSidebar(false)} />}

      {/* ── Layout ── */}
      <div className="flex h-screen overflow-hidden">

        {/* ── Left Sidebar ── */}
        <aside className={`fixed lg:relative z-40 top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 flex flex-col transition-transform duration-300 ${mobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-5 py-5 border-b border-neutral-100">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-md shadow-amber-400/30">
              <Ticket size={18} />
            </div>
            <span className="text-neutral-900 font-bold text-lg tracking-tight">EventHub</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {[
              { id: "discover", label: "Discover", icon: <Globe size={16} /> },
              { id: "going", label: "My Events", icon: <Ticket size={16} /> },
              { id: "saved", label: "Saved", icon: <Bookmark size={16} /> },
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileSidebar(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? "bg-amber-50 text-amber-600 border border-amber-200/50" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"}`}>
                {item.icon} {item.label}
              </button>
            ))}

            <div className="pt-6 pb-2 px-1">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Explore</p>
            </div>
            {CATEGORIES.slice(1).map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeCategory === c.id ? "bg-amber-50 text-amber-600 border border-amber-200/50" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"}`}>
                {c.icon} {c.label}
              </button>
            ))}

            {/* Upcoming */}
            <div className="pt-6 pb-2 px-1">
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Upcoming</p>
            </div>
            {UPCOMING.map(u => (
              <div key={u.id} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-all group">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: u.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-800 truncate group-hover:text-amber-600 transition-colors">{u.title}</p>
                  <p className="text-xs text-neutral-500">{u.date} · {u.time}</p>
                </div>
              </div>
            ))}
          </nav>
          
          {/* User Profile Area (Sidebar Footer) */}
          <div className="p-4 border-t border-neutral-100">
             <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all">
                <LogOut size={16} /> Logout
             </button>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
             <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden p-2 -ml-2 text-neutral-500" onClick={() => setMobileSidebar(true)}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <div className="relative max-w-md w-full hidden sm:block">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                     <Search size={18} />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Search events, tags, or locations..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 border-none rounded-xl text-sm font-medium text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-amber-400/50 transition-all outline-none"
                   />
                </div>
             </div>

             <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors">
                   <Bell size={18} />
                </button>
                <button onClick={() => setShowCreate(true)} className="hidden sm:flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors shadow-sm">
                   <Plus size={16} /> Create Event
                </button>
             </div>
          </header>

          {/* Feed Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 feed-scroll">
             {/* Stories Section */}
             <div className="flex gap-4 overflow-x-auto pb-6 mb-2 snap-x">
               {STORIES.map(story => (
                 <div key={story.id} className="flex flex-col items-center gap-2 snap-start shrink-0 cursor-pointer">
                   <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${story.isAdd ? 'bg-neutral-100 border-2 border-dashed border-neutral-300 text-neutral-400' : 'bg-white text-white'}`}
                        style={!story.isAdd ? { backgroundColor: story.color, border: story.active ? `3px solid ${story.color}` : '3px solid transparent', padding: '2px', backgroundClip: 'content-box' } : {}}>
                     {story.avatar}
                   </div>
                   <span className="text-xs font-semibold text-neutral-600">{story.name}</span>
                 </div>
               ))}
             </div>

             <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-neutral-900 capitalize">
                  {activeTab === 'discover' ? 'Explore Events' : activeTab === 'going' ? 'My RSVPs' : 'Saved Events'}
                </h1>
                
                <div className="flex gap-2">
                   {["all", "physical", "virtual"].map(type => (
                      <button 
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${filterType === type ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}
                      >
                         {type}
                      </button>
                   ))}
                </div>
             </div>

             {/* Events Grid */}
             {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   {filtered.map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        onToggleLike={toggleLike}
                        onToggleBookmark={toggleBookmark}
                        onToggleGoing={toggleGoing}
                      />
                   ))}
                </div>
             ) : (
                <div className="text-center py-20">
                   <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                      <Search size={24} />
                   </div>
                   <h3 className="text-lg font-bold text-neutral-900 mb-1">No events found</h3>
                   <p className="text-neutral-500 text-sm">Try adjusting your filters or search terms.</p>
                </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
}