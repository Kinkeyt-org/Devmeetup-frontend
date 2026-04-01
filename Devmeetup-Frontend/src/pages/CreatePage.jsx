import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event"; 
import { motion, AnimatePresence } from "framer-motion";

const CreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("physical"); 
  const [serverError, setServerError] = useState(""); // Replaces the native alert
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "", 
    capacity: "",
    date: "",
  });

  // Get today's date in YYYY-MM-DD format to prevent past scheduling
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setServerError(""); // Clear errors when the user starts typing again
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        capacity: Number(formData.capacity),
        location: eventType === "virtual" ? formData.location : formData.location
      };
      
      await createEvent(payload);
      navigate("/home"); // Redirecting to your home feed on success
    } catch (error) {
      console.error("Creation Error:", error.response?.data);
      // Inline error handling instead of alert()
      setServerError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-['Satoshi'] text-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 px-6 py-5 bg-transparent backdrop-blur-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center cursor-pointer gap-2 px-3 py-2 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition-all w-max"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex items-start justify-center px-4 pt-4 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-xl bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black mb-2 tracking-tight text-gray-900">Create Event</h1>
            <p className="text-gray-500 font-medium">Is your event happening in-person or online?</p>
          </div>

          {/* Premium iOS-style Toggle */}
          <div className="flex p-1.5 mb-8 bg-gray-100/80 rounded-[1.25rem] relative">
            {['physical', 'virtual'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEventType(type)}
                className={`relative flex-1 py-3 text-sm cursor-pointer font-bold capitalize z-10 transition-colors duration-300 ${
                  eventType === type ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {eventType === type && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {type}
              </button>
            ))}
          </div>

          {/* Inline Error Banner */}
          <AnimatePresence>
            {serverError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {serverError}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Event Title</label>
              <input 
                id="title"
                required 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Web3 Dev Conference"
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-gray-900 placeholder:text-gray-400" 
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Description</label>
              <textarea 
                id="description"
                required 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="4" 
                placeholder="What will you be discussing?"
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none" 
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                {eventType === "physical" ? "Venue Location" : "Meeting Link"}
              </label>
              <input 
                id="location"
                required 
                name="location" 
                type={eventType === "virtual" ? "url" : "text"}
                value={formData.location} 
                onChange={handleChange} 
                placeholder={eventType === "physical" ? "e.g. Eko Hotel, Lagos" : "https://zoom.us/j/..."}
                className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-gray-900 placeholder:text-gray-400" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Date</label>
                <input 
                  id="date"
                  required 
                  type="date" 
                  name="date" 
                  min={today} // Prevents past dates
                  value={formData.date} 
                  onChange={handleChange} 
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-gray-900" 
                />
              </div>
              <div>
                <label htmlFor="capacity" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Capacity</label>
                <input 
                  id="capacity"
                  required 
                  type="number" 
                  min="1" // Prevents zero or negative seats
                  name="capacity" 
                  value={formData.capacity} 
                  onChange={handleChange} 
                  placeholder="e.g. 100"
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-gray-900 placeholder:text-gray-400" 
                />
              </div>
            </div>

            <motion.button 
              type="submit" 
              disabled={loading} 
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 mt-6 font-bold cursor-pointer text-gray-900 bg-amber-400 rounded-2xl shadow-xl shadow-amber-400/20 hover:bg-amber-300 hover:shadow-amber-400/30 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Publish Event"
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default CreatePage;