import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event"; 
import { motion } from "framer-motion";

const CreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("physical"); // "physical" or "virtual"
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "", // Used for Address or Meeting Link
    capacity: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity),
        // Adding a prefix to location for virtual events if your backend 
        // only has one location field, or just sending the link directly.
        location: eventType === "virtual" ? `Virtual: ${formData.location}` : formData.location
      };
      await createEvent(payload);
      navigate("/events"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Satoshi'] text-black flex flex-col">
      <header className="p-6">
        <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer gap-2 text-sm font-bold hover:opacity-60 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
            <p className="text-gray-500">Is your event happening in-person or online?</p>
          </div>

          {/* Event Type Toggle */}
          <div className="flex p-1 mb-8 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setEventType("physical")}
              className={`flex-1 py-3 text-sm font-bold cursor-pointer rounded-xl transition-all ${eventType === "physical" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Physical
            </button>
            <button
              onClick={() => setEventType("virtual")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl cursor-pointer transition-all ${eventType === "virtual" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Virtual
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">Event Title</label>
              <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-amber-400 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-amber-400 transition-all resize-none" />
            </div>

            {/* Dynamic Location/Link Field */}
            <div>
              <label className="block text-sm font-bold mb-2">
                {eventType === "physical" ? "Venue Location" : "Meeting Link (Zoom/Google Meet)"}
              </label>
              <input 
                required 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder={eventType === "physical" ? "e.g. Eko Hotel, Lagos" : "https://zoom.us/j/..."}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-amber-400 transition-all" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Date</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-amber-400 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Capacity</label>
                <input required type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-amber-400 transition-all" />
              </div>
            </div>

            <button 
                type="submit" 
                disabled={loading} 
                // Added: flex items-center justify-center
                className="w-full py-4 mt-4 cursor-pointer font-bold text-black bg-amber-400 rounded-2xl shadow-lg shadow-amber-400/20 hover:bg-amber-500 transition-all flex items-center justify-center"
                >
                {loading ? (
                    <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                    ></circle>
                    <path
                        className="opacity-90"
                        fill="none" // Changed to none because you are using stroke
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    ></path>
                    </svg>
                ) : (
                    "Create Event"
                )}
                </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default CreatePage;