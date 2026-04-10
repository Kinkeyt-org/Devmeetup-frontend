import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe, Users, Check } from "lucide-react";

const CreatePage = () => {
  const [tags, setTags] = useState([]);
  const PREDEFINED_TAGS = ["Technology", "Design", "Business", "Workshops", "Lifestyle", "Music"];
  const TAG_LIMIT = 5;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [eventType, setEventType] = useState("physical");
  const [pricingType, setPricingType] = useState("free");
  const [serverError, setServerError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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

      tags.forEach((tag, index) => {
        payload.append(`tags[${index}]`, tag);
      });

      const isFreeValue = pricingType === "free" ? "1" : "0";
      payload.append("is_free", isFreeValue);

      if (pricingType === "paid") {
        payload.append("price", formData.price);
      }

      if (formData.image) {
        payload.append("banner", formData.image);
      }

      await createEvent(payload);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Something went wrong, try again.";
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        setServerError(Object.values(validationErrors).flat()[0]);
      } else {
        setServerError(errorMsg);
      }

      setLoading(false);
    }
  };

  const toggleTag = (tag) => {
    setServerError("");

    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      if (tags.length < TAG_LIMIT) {
        setTags([...tags, tag]);
      } else {
        setServerError(`You can only select up to ${TAG_LIMIT} tags.`);
      }
    }
  };

  const ButtonContent = () => {
    if (loading) {
      return (
        <motion.div
          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 0.8 }}
        />
      );
    }

    if (success) {
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 text-green-600"
        >
          <Check size={18} />
          <span>Event created successfully</span>
        </motion.div>
      );
    }

    return "Publish Event";
  };

  return (
    <div className="min-h-screen pt-15 bg-white font-['Satoshi'] text-gray-900 flex flex-col relative">

      <header className="sticky top-0 z-10 px-6 py-4 backdrop-blur bg-white/70">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-bold text-gray-600 md:hidden hover:text-black"
        >
          ← Back
        </button>
      </header>

      <main className="flex-1 flex justify-center px-4 pb-24">
        <form onSubmit={handleSubmit} className="w-full max-w-xl md:max-w-5xl space-y-6">

          {/* IMAGE */}
          <div className="relative w-full h-56 md:h-80 bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-200">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 font-medium">Upload cover image</div>
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
            className="w-full text-2xl font-bold outline-none border-b pb-2"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Write something about your event..."
            className="w-full text-gray-600 outline-none"
            required
          />

          {/* EVENT TYPE */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {[
              { type: "physical", icon: MapPin },
              { type: "virtual", icon: Globe },
            ].map(({ type, icon: Icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => setEventType(type)}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold capitalize ${
                  eventType === type ? "bg-white shadow text-black" : "text-gray-500"
                }`}
              >
                <Icon size={16} />
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
                : "Meeting link (Zoom, Meet, etc.)"
            }
            className="w-full p-3 bg-gray-100 rounded-xl outline-none"
            required
          />

          {/* DATE + CAPACITY */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              className="p-3 bg-gray-100 rounded-xl outline-none"
              required
            />

            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="number"
                name="capacity"
                min="1"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="pl-10 p-3 w-full bg-gray-100 rounded-xl outline-none"
                required
              />
            </div>
          </div>

          {/* PRICING */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {["free", "paid"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPricingType(type)}
                className={`flex-1 py-2 rounded-lg font-semibold capitalize ${
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
                type="number"
                name="price"
                placeholder="Enter price (₦)"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-xl outline-none"
                required
              />
            )}
          </AnimatePresence>

          {/* ERROR */}
          {serverError && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {serverError}
            </p>
          )}

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {PREDEFINED_TAGS.map((tag) => {
              const isSelected = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || success}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center transition-all ${
              success ? "bg-green-600 text-white" : "bg-black text-white"
            }`}
          >
            <ButtonContent />
          </motion.button>
        </form>
      </main>
    </div>
  );
};

export default CreatePage;
