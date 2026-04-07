import React, { useState, useEffect } from 'react';
import { getEventDetails } from '../api/event';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDetails = await getEventDetails(id);
        setEvent(eventDetails);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-white px-6 py-20 animate-pulse">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-[400px] bg-neutral-200 rounded-3xl mb-6"></div>
          <div className="h-6 w-1/2 bg-neutral-200 rounded mb-4"></div>
          <div className="h-4 w-3/4 bg-neutral-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-400">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Satoshi']">
      
      {/* HERO IMAGE */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <img
          src={event.banner || event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold shadow"
        >
          ← Back
        </button>

        {/* Title */}
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            {event.title}
          </h1>
          <p className="text-sm opacity-80 mt-1">
            {event.location}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        {/* TAGS + PRICE */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {event.tags?.length > 0 ? (
              event.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-black text-amber-500 uppercase"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs font-black text-amber-500 uppercase">
                General
              </span>
            )}
          </div>

          <div className="text-sm font-bold bg-black text-white px-4 py-2 rounded-full">
            {event.is_free ? "Free" : `₦${event.price || 0}`}
          </div>
        </div>

        {/* DATE */}
        <p className="text-sm text-neutral-500 mb-6">
          {event.event_date_human || event.event_date}
        </p>

        {/* DESCRIPTION */}
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>{event.description}</p>
        </div>

        {/* EXTRA INFO */}
        <div className="mt-10 grid grid-cols-2 gap-6 text-sm">
          <div className="bg-neutral-100 p-4 rounded-2xl">
            <p className="text-neutral-500">Capacity</p>
            <p className="font-bold text-lg">{event.capacity}</p>
          </div>

          <div className="bg-neutral-100 p-4 rounded-2xl">
            <p className="text-neutral-500">Location</p>
            <p className="font-bold text-lg">{event.location}</p>
          </div>
        </div>

        {/* CTA BUTTON */}
        <button className="mt-10 w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition">
          Book Event
        </button>
      </motion.div>
    </div>
  );
};

export default EventDetails;