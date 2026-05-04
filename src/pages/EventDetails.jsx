import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getEventDetails } from '../api/event';
import { bookEvent } from '../api/ticket';
import { useParams, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-hot-toast';
import {
  ArrowLeft, Calendar, MapPin, Banknote, Tag as TagIcon,
  Music, Share2, MoreHorizontal, ExternalLink, Compass, ImageDown
} from 'lucide-react';
import { Helmet } from "react-helmet-async";
import EventDetailsSkeleton from '../components/EventDetailsSkeleton';
import { toPng } from 'html-to-image';



// Tag icon resolver — maps common tag strings to Lucide icons
const getTagIcon = (tag) => {
  const t = tag.toLowerCase().trim();
  if (t.includes('music') || t.includes('concert') || t.includes('dj') || t.includes('live')) return Music;
  if (t.includes('tech') || t.includes('code') || t.includes('dev')) return TagIcon;
  return TagIcon;
};

const EventDetails = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [dominantColor, setDominantColor] = useState('20, 10, 40');
  const [showMenu, setShowMenu] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleDownloadPng = async () => {
    setShowMenu(false);
    setIsDownloading(true);
    try {
      const node = document.getElementById('event-details-page');
      const dataUrl = await toPng(node, { cacheBust: true, quality: 1 });
      const link = document.createElement('a');
      link.download = `${event?.title?.replace(/\s+/g, '-') || 'event'}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Page downloaded!');
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Could not download page.');
    } finally {
      setIsDownloading(false);
    }
  };

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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getEventDetails(id);
        setEvent(eventData);

        const eventLat = eventData.lat || eventData.latitude;
        const eventLng = eventData.lng || eventData.longitude;

        if (eventLat && eventLng) {
          setCoords({ lat: parseFloat(eventLat), lng: parseFloat(eventLng) });
        } else if (eventData.location) {
          geocodeLocation(eventData.location);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

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

  const handleShare = async () => {
    const shareData = {
      title: event?.title || 'Check out this event!',
      text: event?.description?.substring(0, 100) + '...',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const parsedTags = event?.tags
    ? (typeof event.tags === 'string' ? event.tags.split(',') : event.tags)
    : [];

  // Loading skeleton
  if (loading) {
    return <EventDetailsSkeleton />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 dark:text-white/40 text-sm">Event not found</p>
      </div>
    );
  }  const bannerSrc = event.banner || event.image || event.avatar;

  return (
    <>
      <Helmet>
        <title>{event.title} | DevMeet</title>
        <meta name="description" content={event.description || "Join this amazing event on DevMeet."} />
      </Helmet>

      <div id="event-details-page" className="min-h-screen relative overflow-x-hidden font-sans bg-white dark:bg-[#0a0a0f]">

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
                    <button
                      onClick={handleDownloadPng}
                      disabled={isDownloading}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-white/10 transition disabled:opacity-50"
                    >
                      <ImageDown size={15} className="shrink-0" />
                      {isDownloading ? 'Downloading...' : 'Download as PNG'}
                    </button>
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
                  <div key={i} className="flex items-center gap-2.5">
                    <Icon
                      size={14}
                      strokeWidth={2}
                      className="text-neutral-400 dark:text-white/45 shrink-0"
                    />
                    <span className="text-[12px] md:text-[13.5px] font-normal text-neutral-600 dark:text-white/70 leading-[1.4]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* DESCRIPTION */}
              {event.description && (
                <div className="mt-6 lg:mt-8">
                  <p className="text-xs md:text-sm font-normal text-neutral-500 dark:text-white/60 leading-[1.7] lg:text-[15px]">
                    {event.description}
                  </p>
                </div>
              )}

              {/* MAP SECTION */}
              <div className="mt-8 lg:mt-10">
                <div className="flex items-center gap-2 mb-3">
                  <Compass size={14} className="text-neutral-400 dark:text-white/40" />
                  <span className="text-[11px] md:text-[13px] font-semibold text-neutral-500 dark:text-white/50 tracking-[0.06em] uppercase">
                    Location
                  </span>
                </div>
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
          className="fixed bottom-0 left-0 right-0 z-20 flex justify-center md:hidden bg-gradient-to-t from-white/98 dark:from-[#0a0a0f]/98 via-white/80 dark:via-[#0a0a0f]/80 to-transparent"
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