import React, { useState, useEffect } from 'react';
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

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Tag icon resolver — maps common tag strings to Lucide icons
const getTagIcon = (tag) => {
  const t = tag.toLowerCase().trim();
  if (t.includes('music') || t.includes('concert') || t.includes('dj') || t.includes('live')) return Music;
  if (t.includes('tech') || t.includes('code') || t.includes('dev')) return TagIcon;
  return TagIcon;
};

const EventDetails = () => {
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

  if (loading) {
    return <EventDetailsSkeleton />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 dark:text-white/40 text-sm">Event not found</p>
      </div>
    );
  }

  const bannerSrc = event.banner || event.image || event.avatar;

  return (
    <>
      <Helmet>
        <title>{event.title} | DevMeet</title>
        <meta name="description" content={event.description || "Join this amazing event on DevMeet."} />
      </Helmet>

      <div id="event-details-page" className="min-h-screen relative overflow-x-hidden font-sans bg-white dark:bg-[#0a0a0f]">

        <div className="relative z-10 max-w-7xl mx-auto min-h-screen pb-32 px-5 md:px-8 lg:px-12">

          <div className="flex items-center justify-between pt-4 md:pt-12 pb-4">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-neutral-100 dark:bg-white/8">
              <ArrowLeft size={18} className="text-neutral-700 dark:text-white" />
            </button>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button onClick={() => setShowMenu(v => !v)} className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-white/8">
                  <MoreHorizontal size={18} className="text-neutral-700 dark:text-white" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-11 z-50 min-w-[180px] rounded-2xl border border-neutral-200 dark:border-white/10 overflow-hidden bg-white dark:bg-neutral-900/95 backdrop-blur-2xl">
                    <button
                      onClick={handleDownloadPng}
                      disabled={isDownloading}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-white/10 transition disabled:opacity-50"
                    >
                      <ImageDown size={15} />
                      {isDownloading ? 'Downloading...' : 'Download as PNG'}
                    </button>
                  </div>
                )}
              </div>

              <button onClick={handleShare} className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-white/8">
                <ExternalLink size={16} className="text-neutral-700 dark:text-white" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-2xl border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/4 overflow-hidden" style={{ height: 250 }}>
              {coords.lat && coords.lng ? (
                <div className="relative w-full h-full">

                  <iframe
                    title="Event Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=17&output=embed`}
                    className="w-full h-full"
                  />

                  {/* Mapcn-style marker */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute h-12 w-12 animate-ping rounded-full bg-black/10 dark:bg-white/10" />
                      <div className="relative h-7 w-7 rounded-full border-[5px] border-neutral-900 dark:border-white bg-white dark:bg-neutral-900 shadow-xl" />
                    </div>
                  </div>

                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {isGeocoding ? (
                    <p className="text-xs text-neutral-400">Locating venue...</p>
                  ) : (
                    <p className="text-xs text-neutral-300">Map preview unavailable</p>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EventDetails;