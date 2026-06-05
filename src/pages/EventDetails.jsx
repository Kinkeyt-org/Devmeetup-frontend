import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getEventDetails } from '../api/event';
import { bookEvent } from '../api/ticket';
import { useParams, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-hot-toast';
import {
  ArrowLeft, Calendar, MapPin, Banknote, Tag as TagIcon,  Share2, MoreHorizontal, ExternalLink, Compass, Globe, Video,
  Plus, BadgeCheck
} from 'lucide-react';
import SEO from "../components/SEO";
import EventDetailsSkeleton from '../components/EventDetailsSkeleton';
import { generateCalendarLinks } from '../utils/calendar';

// EventDetails Component: This is the main page where users view all the info about a specific event.
// It fetches the data, handles RSVPing, and figures out if we need to show a map or a virtual link!
const EventDetails = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { id } = useParams();
  const navigate = useNavigate();

  // state to hold the event data from the API
  const [event, setEvent] = useState(null);
  // state for the loading skeleton
  const [loading, setLoading] = useState(true);
  // state to disable the RSVP button while the API request is happening
  const [isBooking, setIsBooking] = useState(false);
  // state for the map coordinates (latitude and longitude)
  const [coords, setCoords] = useState({ lat: null, lng: null });
  // state to show a small loader while we translate a text location into map coordinates
  const [isGeocoding, setIsGeocoding] = useState(false);
  // state to toggle the "Add to Calendar" dropdown menu
  const [showMenu, setShowMenu] = useState(false);
  // state to track when the Google Maps iframe finishes loading
  const [mapLoaded, setMapLoaded] = useState(false);
  const [follow, setFollow] = useState(false)
  // Let's handle booking an event. We'll show a nice toast when it succeeds and redirect the user.
  const handleBookEvent = async () => {
    setIsBooking(true);
    try {
      const response = await bookEvent(id);
      toast.success('Event booked successfully!');
      const newTicketId = response.tickets && response.tickets.length > 0 ? response.tickets[0].id : null;
      navigate('/my-tickets', { state: { newlyBookedId: newTicketId } });
    } catch (error) {
      console.error('Error booking event:', error);
      let errMsg = 'Failed to book event. Please try again.';
      if (error?.response?.data) {
        if (error.response.data.errors) {
          const firstErr = Object.values(error.response.data.errors)[0];
          errMsg = Array.isArray(firstErr) ? firstErr[0] : firstErr;
        } else if (error.response.data.message) {
          errMsg = error.response.data.message;
        } else if (error.response.data.error) {
          errMsg = error.response.data.error;
        }
      }
      toast.error(`${errMsg}`);
      alert(`Booking Failed: ${errMsg}`);
    } finally {
      setIsBooking(false);
    }
  };

  // This useEffect runs once when the component mounts (or if the 'id' changes).
  // It fetches the event data and decides if we need to hit the Mapbox API for coordinates.
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getEventDetails(id);
        setEvent(eventData);

        // Check if the API already returned exact coordinates
        const eventLat = eventData.lat || eventData.latitude;
        const eventLng = eventData.lng || eventData.longitude;

        if (eventLat && eventLng) {
          setCoords({ lat: parseFloat(eventLat), lng: parseFloat(eventLng) });
        } else if (eventData.location) {
          // Skip geocoding if this is a virtual event or the location is a URL
          const loc = eventData.location.toLowerCase().trim();
          const isVirtual = eventData.event_type === 'virtual' || eventData.event_type === 'online' || /^https?:\/\//i.test(loc);
          if (!isVirtual) {
            geocodeLocation(eventData.location);
          }
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    // Time to fetch the coordinates if it's a physical event so we can drop a pin on the map.
    const geocodeLocation = async (locationName) => {
      const token = import.meta.env.VITE_MAPBOX_TOKEN;
      if (!token) return;
      setIsGeocoding(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${token}&limit=1&country=ng`
        );
        const data = await response.json();
        if (data.features?.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          setCoords({ lat, lng });
        }
      } catch (error) {
        console.error("Geocoding failed:", error);
      } finally {
        setIsGeocoding(false);
      }
    };

    if (id) fetchEventDetails();
  }, [id]);

  // Handle sharing the event (uses native Web Share API on mobile, or copies link to clipboard on desktop)
  const handleShare = async () => {
    const shareText = `${event?.title}\n📍 ${event?.location || 'Online'}\n📅 ${event?.event_date_human || ''}`;
    
    const shareData = {
      title: event?.title || 'Check out this event!',
      text: shareText,
      url: window.location.href,
    };

    

    try {
      if (navigator.share) {
        // Try to include image if possible
        if (bannerSrc && navigator.canShare && navigator.canShare({ files: [] })) {
          try {
            const response = await fetch(bannerSrc);
            const blob = await response.blob();
            const file = new File([blob], 'event-preview.jpg', { type: blob.type });
            
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                ...shareData,
                files: [file],
              });
              toast.success('Shared successfully!');
              return;
            }
          } catch (imgErr) {
            console.error('Could not fetch image for sharing:', imgErr);
            // Fallback to text-only share below
          }
        }

        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        toast.success('Link and details copied!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        toast.error('Sharing failed');
      }
    }
  };

  // Clever logic to detect if this is an online/virtual event.
  // It checks explicit types, lack of coordinates, or known URL structures (like zoom.us)
  const isOnlineEvent = (() => {
    // If the event explicitly has an event_type field set to virtual
    if (event?.event_type === 'virtual' || event?.event_type === 'online') return true;
    // If there are exact map coordinates, it's definitely a physical event
    if (coords.lat && coords.lng) return false;
    // Check if the location string looks like a URL or contains known virtual platform keywords
    const loc = (event?.location || '').toLowerCase().trim();
    if (!loc) return false;
    const urlPattern = /^https?:\/\//i;
    const platformKeywords = ['zoom.us', 'meet.google', 'teams.microsoft', 'discord.gg', 'discord.com', 'twitch.tv', 'youtube.com', 'webex', 'whereby.com', 'streamyard', 'hopin.com'];
    if (urlPattern.test(loc)) return true;
    return platformKeywords.some(keyword => loc.includes(keyword));
  })();

  // Loading skeleton
  if (loading) {
    return <EventDetailsSkeleton />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-neutral-400 dark:text-white/40 text-sm">Event not found</p>
      </div>
    );
  }  const bannerSrc = event.banner || event.image || event.avatar;

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description || "Join this amazing event on DevMeet.",
    "image": bannerSrc,
    "startDate": event.date || event.event_date || new Date().toISOString(),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": isOnlineEvent 
      ? "https://schema.org/OnlineEventAttendanceMode" 
      : "https://schema.org/OfflineEventAttendanceMode",
    "location": isOnlineEvent ? {
      "@type": "VirtualLocation",
      "url": event.location && /^https?:\/\//i.test(event.location.trim()) ? event.location.trim() : window.location.href
    } : {
      "@type": "Place",
      "name": event.location || "TBA",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location || "TBA"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": event.is_free ? "0" : (event.price || "0"),
      "priceCurrency": "NGN",
      "availability": "https://schema.org/InStock",
      "url": window.location.href
    },
    "organizer": {
      "@type": "Person",
      "name": event?.user?.name || event?.organizer || "DevMeet Organizer"
    }
  };

  return (
    <>
      <SEO 
        title={`${event.title}`}
        description={event.description || "Join this amazing event on DevMeet."}
        image={bannerSrc}
        url={window.location.href}
        schema={eventSchema}
      />

      <div className="min-h-screen relative overflow-x-hidden font-sans bg-background">

        {/* Scrollable content */}
        <div className="relative z-10 max-w-7xl mx-auto min-h-screen pb-32 px-5 md:px-8 lg:px-12">

          <div className="flex items-center justify-between pt-4 md:pt-12 pb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-neutral-100 dark:bg-white/8"
            >
              <ArrowLeft size={18} className="text-neutral-700 dark:text-white" />
            </button>
            <div className="flex items-center gap-2">
              {/* MORE MENU */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(v => !v)}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-white/8"
                >
                  <MoreHorizontal size={18} className="text-neutral-700 dark:text-white" />
                </button>
                {showMenu && (
                  <div
                    className="absolute right-0 top-11 z-50 min-w-[180px] rounded-2xl border border-neutral-200 dark:border-white/10 overflow-hidden bg-white dark:bg-neutral-900/95 backdrop-blur-2xl"
                  >

                    <div className="px-4 py-2 text-[10px] font-semibold text-neutral-400 dark:text-white/30 uppercase tracking-wider">
                      Add to Calendar
                    </div>
                    {generateCalendarLinks(event).map((cal) => (
                      <a
                        key={cal.name}
                        href={cal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-white/10 transition"
                      >
                        <Calendar size={15} className="shrink-0" />
                        {cal.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-white/8"
              >
                <ExternalLink size={16} className="text-neutral-700 dark:text-white" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-10 lg:gap-16 mt-4 md:mt-8">
            
            {/* LEFT: HERO IMAGE */}
            <div className="w-full md:w-[45%] lg:w-[42%] shrink-0">
              <div
                className="w-full overflow-hidden"
                style={{ borderRadius: 20, aspectRatio: '4 / 3', maxHeight: 380 }}
              >
                {bannerSrc ? (
                  <img
                    src={bannerSrc}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="text-white/20 text-sm">No image</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="flex-1 flex flex-col mt-6 md:mt-0 md:pt-2">
              
              {/* TITLE */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <h1 className="text-neutral-900 dark:text-white leading-tight flex-1 font-semibold text-xl md:text-2xl lg:text-3xl tracking-tight">
                  {event.title}
                </h1>
              </div>

              {/* META ROW — location / date / price */}
              <div className="mt-6 space-y-3">
                {[
                  { Icon: MapPin, value: event.location || 'Online' },
                  { Icon: Calendar, value: event.event_date_human || 'TBA' },
                  {
                    Icon: Banknote,
                    value: event.is_free
                      ? 'Free event'
                      : `₦${Number(event.price || 0).toLocaleString()}`
                  },
                ].map(({ Icon, value }, i) => (
                  <div key={i} className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={14}
                        strokeWidth={2}
                        className="text-neutral-400 dark:text-white/45 shrink-0"
                      />
                      <span className="text-[12px] md:text-[13.5px] font-normal text-neutral-600 dark:text-white/70 leading-[1.4]">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Organizer Profile - Shows who's hosting with that sweet verified badge and a follow button! */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden shrink-0">
                    <img 
                      src={event?.user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Organizer"} 
                      alt="Organizer avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[15px] font-semibold text-neutral-900 dark:text-white leading-none">
                        {event?.user?.name || event?.organizer || "Jane Doe"}
                      </p>
                      <BadgeCheck size={15} className="text-neutral-500 fill-neutral-100 dark:fill-neutral-900/30" />
                    </div>
                    <p className="text-[13px] text-neutral-500 dark:text-white/50 mt-1">
                      Event Organizer 
                    </p>
                  </div>
                </div>
                <button 
                onClick={() => setFollow(!follow)}
                className={`${follow ? 'text-green-600 dark:text-green-500': 'text-neutral-900 dark:text-white'} cursor-pointer px-5 py-2 rounded-full bg-neutral-100 dark:bg-white/10  text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors active:scale-95`}>
                  {follow? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Event Description - The meat and potatoes of the event details */}
              {event.description && (
                <div className="mt-3">
                  <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-white/60 leading-[1.7] lg:text-[15px]">
                    {event.description}
                  </p>
                </div>
              )}

              {/* LOCATION SECTION — Map for physical, Join UI for online */}
              <div className="mt-8 lg:mt-10">
                <div className="flex items-center gap-2 mb-3">
                  {isOnlineEvent ? (
                    <Globe size={14} className="text-neutral-400 dark:text-white/40" />
                  ) : (
                    <Compass size={14} className="text-neutral-400 dark:text-white/40" />
                  )}
                  <span className="text-[11px] md:text-[13px] font-semibold text-neutral-500 dark:text-white/50 tracking-[0.06em] uppercase">
                    {isOnlineEvent ? 'Virtual Event' : 'Location'}
                  </span>
                </div>

                {isOnlineEvent ? (
                  /* ── ONLINE EVENT — Join UI ── */
                  <div
                    className="rounded-2xl border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/4 overflow-hidden relative"
                    style={{ height: 250 }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-6">
                      {/* Animated rings background */}
                      <div className="relative">
                        <div className="absolute inset-0 -m-6 rounded-full border border-neutral-200/50 dark:border-white/5 animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-0 -m-3 rounded-full border border-neutral-200/30 dark:border-white/5 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                        <div className="w-14 h-14 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center">
                          <Video size={22} className="text-white dark:text-neutral-900" />
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-1">
                          This event is hosted online
                        </p>
                        <p className="text-[11px] text-neutral-400 dark:text-white/35 max-w-[260px] leading-relaxed">
                          Join from anywhere using the link provided by the organizer
                        </p>
                      </div>

                      {/* Show the meeting link if it looks like a URL */}
                      {event.location && /^https?:\/\//i.test(event.location.trim()) && (
                        <a
                          href={event.location.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity active:scale-[0.98]"
                        >
                          <ExternalLink size={13} />
                          Join Event
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  /* ── PHYSICAL EVENT — Map ── */
                  <div
                    className="rounded-2xl border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/4 overflow-hidden relative"
                    style={{ height: 250 }}
                  >
                    {coords.lat && coords.lng ? (
                      <>
                        {!mapLoaded && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#111118]">
                            <div className="w-6 h-6 border-2 border-neutral-200 dark:border-white/10 border-t-neutral-500 dark:border-t-white/50 rounded-full animate-spin" />
                            <p className="text-xs text-neutral-400 dark:text-white/35 mt-3">Loading map...</p>
                          </div>
                        )}
                        <iframe
                          title="Event Location"
                          src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=17&output=embed`}
                          className={`w-full h-full border-0 transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
                          style={{
                            filter: isDark
                              ? 'grayscale(1) invert(1) brightness(0.85) contrast(1.15)'
                              : 'grayscale(1) contrast(1.1)'
                          }}
                          onLoad={() => setMapLoaded(true)}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isGeocoding ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
                            <p className="text-xs text-neutral-400 dark:text-white/35">Locating venue...</p>
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-300 dark:text-white/25">Map preview unavailable</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RSVP BUTTON (Desktop/Tablet) */}
              <div className="hidden md:block mt-10">
                <button
                  onClick={handleBookEvent}
                  disabled={isBooking}
                  className={`w-full flex items-center justify-center transition-opacity hover:opacity-90 active:scale-[0.98] font-semibold text-[15px] tracking-[0.06em] uppercase rounded-[14px] h-[54px] border-none bg-neutral-900 dark:bg-white text-white dark:text-[#0a0a0f] ${isBooking ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isBooking ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    'RSVP'
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* FIXED BOTTOM — RSVP BUTTON (Mobile Only) */}
        <div
          className="fixed bottom-0 left-0 right-0 z-20 flex justify-center md:hidden bg-linear-to-t from-background/98 via-background/80 to-transparent"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <div className="w-full px-5 pb-8 pt-6">
            <button
              onClick={handleBookEvent}
              disabled={isBooking}
              className={`w-full flex items-center justify-center transition-opacity active:scale-[0.98] font-semibold text-[15px] tracking-[0.06em] uppercase rounded-[14px] h-[54px] border-none bg-neutral-900 dark:bg-white text-white dark:text-[#0a0a0f] ${isBooking ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isBooking ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                'RSVP'
              )}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default EventDetails;