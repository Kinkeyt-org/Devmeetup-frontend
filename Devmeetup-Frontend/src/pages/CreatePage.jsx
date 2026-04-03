import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";
import { motion, AnimatePresence } from "framer-motion";

const CreatePage = () => {
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
      payload.append("capacity", Number(formData.capacity));
      payload.append("location", formData.location);
      payload.append("eventType", eventType);
      payload.append("pricingType", pricingType);

      if (pricingType === "paid") payload.append("price", Number(formData.price));
      if (formData.image) payload.append("image", formData.image);

      await createEvent(payload);

      // Show toast instead of instant navigation
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/"); // Navigate after toast disappears
      }, 2000);

    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
        <div className="w-full max-w-xl space-y-6">

          {/* IMAGE UPLOAD */}
          <div className="relative w-full h-56 bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center">
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event title..."
            className="w-full text-2xl font-bold outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Write something about your event..."
            className="w-full text-gray-600 outline-none resize-none"
          />

          {/* EVENT TYPE */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {["physical", "virtual"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEventType(type)}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  eventType === type ? "bg-white shadow" : "text-gray-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* LOCATION */}
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={
              eventType === "physical"
                ? "Venue (e.g. Eko Hotel)"
                : "Meeting link"
            }
            className="w-full p-3 bg-gray-100 rounded-xl outline-none"
          />

          {/* DATE + CAPACITY */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              className="p-3 bg-gray-100 rounded-xl"
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="p-3 bg-gray-100 rounded-xl"
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
                  className={`flex-1 py-2 rounded-lg font-semibold ${
                    pricingType === type ? "bg-white shadow" : "text-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {pricingType === "paid" && (
                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  type="number"
                  name="price"
                  placeholder="Enter price (₦)"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded-xl"
                />
              )}
            </AnimatePresence>
          </div>

          {/* ERROR */}
          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          {/* SUBMIT */}
          <motion.button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "Publish Event"
            )}
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;