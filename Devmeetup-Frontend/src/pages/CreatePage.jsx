import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";
import { motion, AnimatePresence } from "framer-motion";

const CreatePage = () => {
  const [tags, setTags] = useState([]);
  const PREDEFINED_TAGS = ["Technology", "Design", "Business", "Workshops", "Lifestyle", "Music"];
  const TAG_LIMIT = 5;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("physical");
  const [pricingType, setPricingType] = useState("free");
  const [serverError, setServerError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    date: "",
    price: "",
    image: null,
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setServerError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setServerError("Image size should be less than 2MB.");
      return;
    }
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("date", formData.date);
      payload.append("capacity", formData.capacity);
      payload.append("location", formData.location);

      
     

      // Backend expects 'is_free' as 1 (True/Free) or 0 (False/Paid)
      const isFreeValue = pricingType === "free" ? "1" : "0";
      payload.append("is_free", isFreeValue);

      if (pricingType === "paid") {
        payload.append("price", formData.price);
      }

      // FIX: Backend uses the key 'banner' for the event image
      if (formData.image) {
        payload.append("banner", formData.image);
      }

     const result = await createEvent(payload);
     console.log("Create Result:", result);

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/"); 
      }, 2000);

    } catch (error) {
      // Logic to extract specific validation errors or general messages
      const errorMsg = error.response?.data?.message || "Something went wrong, try again.";
      const validationErrors = error.response?.data?.errors;
      
      if (validationErrors) {
        setServerError(Object.values(validationErrors).flat()[0]);
      } else {
        setServerError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag) => {
    setServerError(""); // Clear errors when they interact
    
    if (tags.includes(tag)) {
      // Remove if already selected
      setTags(tags.filter((t) => t !== tag));
    } else {
      // Add if under limit
      if (tags.length < TAG_LIMIT) {
        setTags([...tags, tag]);
      } else {
        setServerError(`You can only select up to ${TAG_LIMIT} tags.`);
      }
    }
  };

  return (
    <div className="min-h-screen pt-15 bg-white font-['Satoshi'] text-gray-900 flex flex-col relative">

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-2xl shadow-lg z-50 font-semibold"
          >
            🎉 Event created successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-10 px-6 py-4 backdrop-blur bg-white/70">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-bold text-gray-600 hover:text-black"
        >
          ← Back
        </button>
      </header>

      <main className="flex-1 flex justify-center px-4 pb-24">
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">

          {/* IMAGE UPLOAD */}
          <div className="relative w-full h-56 bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-gray-400 transition-colors">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l-4 4m4-4l4 4"
                  />
                </svg>
                <span>Upload cover image</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* TITLE */}
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event title..."
            className="w-full text-2xl font-bold outline-none border-b border-transparent focus:border-gray-200 pb-2"
          />

          {/* DESCRIPTION */}
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Write something about your event..."
            className="w-full text-gray-600 outline-none resize-none"
          />

          {/* EVENT TYPE (Front-end only context) */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {["physical", "virtual"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEventType(type)}
                className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-all ${
                  eventType === type ? "bg-white shadow text-black" : "text-gray-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* LOCATION */}
          <input
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={
              eventType === "physical"
                ? "Venue (e.g. Eko Hotel)"
                : "Meeting link (Zoom, Meet, etc.)"
            }
            className="w-full p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
          />

          {/* DATE + CAPACITY */}
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              className="p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
              required
              type="number"
              name="capacity"
              min="1"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* PRICING */}
          <div className="space-y-3">
            <div className="flex p-1 bg-gray-100 rounded-xl">
              {["free", "paid"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPricingType(type)}
                  className={`flex-1 py-2 rounded-lg font-semibold capitalize transition-all ${
                    pricingType === type ? "bg-white shadow text-black" : "text-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {pricingType === "paid" && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  required
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="Enter price (₦)"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 overflow-hidden"
                />
              )}
            </AnimatePresence>
          </div>

          {/* ERROR DISPLAY */}
          {serverError && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg"
            >
              ⚠️ {serverError}
            </motion.p>
          )}

          {/* TAGS SECTION */}
        
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-700">Event Category</label>
              <span className="text-xs text-gray-400">{tags.length} / {TAG_LIMIT} selected</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_TAGS.map((tag) => {
                const isSelected = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                      isSelected
                        ? "bg-black border-black text-white shadow-md"
                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {tag}
                    {isSelected && <span className="ml-2">✕</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center disabled:bg-gray-400 transition-colors"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "Publish Event"
            )}
          </motion.button>
        </form>
      </main>
    </div>
  );
};

export default CreatePage;