import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  MapPin: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  QrCode: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 11v1m4-12h1m0 4h1m-9 4h1m4 0h1m-4 4h1m-9-4h1m1 4h1M4 12h1m0 4h1m4-12h1m0 4h1M4 8h1M4 4h1m11 0h1m-1 4h1m-5 4h1m-4 0h1" /></svg>
};

const MyTickets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const tickets = [
    {
      id: "TIX-8821",
      event: "Tech Nexus Summit 2026",
      date: "April 15, 2026",
      time: "10:00 AM",
      location: "Innovation Hub, San Francisco",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "TIX-4402",
      event: "Midnight Jazz Festival",
      date: "May 02, 2026",
      time: "08:00 PM",
      location: "The Blue Room, NYC",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const filteredTickets = tickets.filter(t => t.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50/50 font-['Satoshi'] pb-20">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <button 
          onClick={() => navigate('/home')}
          className="group flex items-center gap-2 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors mb-8"
        >
          <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all">
            <Icons.ArrowLeft />
          </div>
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Tickets</h1>
            <p className="text-gray-500 font-medium mt-2">Manage your bookings and event entries.</p>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex p-1 bg-gray-200/50 backdrop-blur-sm rounded-2xl w-fit">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all capitalize ${
                  activeTab === tab 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TICKETS LIST */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="wait">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col md:flex-row bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-amber-900/5 transition-all overflow-hidden"
                >
                  {/* Left: Event Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={ticket.image} 
                      alt={ticket.event} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Center: Info */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">
                        Confirmed
                      </span>
                      <span className="text-xs font-bold text-gray-400">#{ticket.id}</span>
                    </div>
                    
                    <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                      {ticket.event}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                        <Icons.Calendar />
                        {ticket.date} • {ticket.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                        <Icons.MapPin />
                        {ticket.location}
                      </div>
                    </div>
                  </div>

                  {/* Right: QR Section (Dashed Divider) */}
                  <div className="relative border-t md:border-t-0 md:border-l border-dashed border-gray-200 p-8 flex flex-col items-center justify-center bg-gray-50/50 w-full md:w-48">
                    {/* Ticket Notch Effects */}
                    <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 bg-gray-50/50 rounded-full border border-gray-100" />
                    <div className="hidden md:block absolute -bottom-4 -left-4 w-8 h-8 bg-gray-50/50 rounded-full border border-gray-100" />

                    <div className="w-20 h-20 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
                      <Icons.QrCode />
                    </div>
                    <button className="text-[10px] font-black text-amber-600 uppercase tracking-tighter hover:underline">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Icons.QrCode />
                </div>
                <h3 className="text-lg font-black text-gray-900">No tickets found</h3>
                <p className="text-gray-400 font-medium">Looks like you haven't booked any events yet.</p>
                <button 
                  onClick={() => navigate('/home')}
                  className="mt-6 px-8 py-3 bg-amber-400 text-gray-900 font-black rounded-2xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
                >
                  Explore Events
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default MyTickets;