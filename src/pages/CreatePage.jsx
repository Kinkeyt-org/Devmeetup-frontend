import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/event";
import SEO from "../components/SEO";
import MeetingLinkPreview from "../components/MeetingLinkPreview";
import { motion } from "framer-motion";
import {
  MapPin,
  Globe,
  Users,
  Image as ImageIcon,
  Tag,
  DollarSign,
  UploadCloud,
  X,
  Loader2,
  Calendar,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Palette,
  Briefcase,
  Smile,
  Music as MusicIcon,
  GraduationCap,
  Heart,
  Users as UsersIcon,
  Loader
} from "lucide-react";

const CreatePage = () => {
  const navigate = useNavigate(); //this allows us to navigate to different pages
  const fileInputRef = useRef(null); //this allows us to reference the file input element
  const [coords, setCoords] = useState({ lat: null, lng: null }); //sets the coordinates of the event location, latitude and longitude
  const [isVerifying, setIsVerifying] = useState(false); //sets the verification state of the event location
  const [userLocation, setUserLocation] = useState(null); //user's GPS for proximity bias



  //Grab user's GPS once on mount - used to bias search results toward their area
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lng: pos.coords.longitude, lat: pos.coords.latitude }),//this gets the user's GPS location
        () => { }, // silently fail - proximity will fall back to IP-based
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 300000,
        }
      );
    }
  }, []);

  const [tags, setTags] = useState([]); //this allows us to store the tags that the user selects
  const [loading, setLoading] = useState(false); //this allows us to show a loading spinner while the event is being created
  const [success, setSuccess] = useState(false); //this allows us to show a success message after the event is created
  const [serverError, setServerError] = useState(""); //this allows us to show an error message if something goes wrong
  const [imagePreview, setImagePreview] = useState(null); //this allows us to show a preview of the image that the user uploaded

  const [eventType, setEventType] = useState("physical"); //sets the type of event, either physical or online
  const [pricingType, setPricingType] = useState("free"); //sets the type of pricing, either free or paid

  const PREDEFINED_TAGS = [
    { name: "Technology", icon: Cpu },
    { name: "Design", icon: Palette },
    { name: "Business", icon: Briefcase },
    { name: "Lifestyle", icon: Smile },
    { name: "Music", icon: MusicIcon },
    { name: "Education", icon: GraduationCap },
    { name: "Health", icon: Heart },
    { name: "Social", icon: UsersIcon },
  ];
  const TAG_LIMIT = 5; //limits the number of tags to 5

  const today = new Date().toISOString().split("T")[0]; //gets the current date in the format yyyy-mm-dd

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    date: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    setServerError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showMeetingPreview = eventType === "virtual" && formData.location.trim().length > 0;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setServerError("Image must be under 2MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Automatically geocode the address as the user types (debounced)
  useEffect(() => {
    if (eventType !== "physical" || !formData.location || formData.location.length < 3) {
      if (eventType === "physical") setCoords({ lat: null, lng: null });
      return;
    }

    // If we already have coords and the location matches what we geocoded, don't re-run
    // This prevents infinite loops if we update formData.location with the formatted name
    
    const timeout = setTimeout(async () => { 
      setIsVerifying(true);
      const token = import.meta.env.VITE_MAPBOX_TOKEN;
      if (!token) return;

      const proximity = userLocation
        ? `&proximity=${userLocation.lng},${userLocation.lat}`
        : "";

      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(formData.location)}.json?access_token=${token}&limit=1&country=ng${proximity}`
        );
        const data = await response.json();

        if (data.features?.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          setCoords({ lat, lng });
          console.log("📍 Verified:", data.features[0].place_name, lat, lng);
        } else {
          setCoords({ lat: null, lng: null });
        }
      } catch (error) {
        console.error("Geocoding failed", error);
        setCoords({ lat: null, lng: null });
      } finally {
        setIsVerifying(false);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [formData.location, eventType]);

  const toggleTag = (tag) => {
    setServerError("");

    if (tags.includes(tag.name)) {
      setTags(tags.filter((t) => t !== tag.name));
      return;
    }

    if (tags.length >= TAG_LIMIT) {
      setServerError(`You can only select ${TAG_LIMIT} tags.`);
      return;
    }

    setTags((prev) => [...prev, tag.name]);
  };

  const handleSubmit = async (e) => {//we use async because we are making an API call which can be time consuming and may fail, so we need to use async/await
    e.preventDefault(); //prevents the default form submission
    setLoading(true); //sets the loading state to true
    setServerError(""); //clears the server error

    try {
      const payload = new FormData(); //creates a new FormData object

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "image" && key !== "price") {
          payload.append(key, value);
        }
      });

      payload.append("tags", JSON.stringify(tags));
      payload.append("is_free", pricingType === "free" ? "1" : "0");

      if (pricingType === "paid") {
        payload.append("price", formData.price);
      }

      if (formData.image) {
        payload.append("banner", formData.image);
      }

      // Send event type so backend/frontend can distinguish physical vs virtual
      payload.append("event_type", eventType);

      //I send the coords from frontend to backend so it can save the exact location of the event
      if (eventType === "physical" && coords.lat && coords.lng) {
        payload.append("latitude", coords.lat);
        payload.append("longitude", coords.lng);
      }

      await createEvent(payload); //Calls the createEvent function from the api/event.js file

      setSuccess(true); //sets the success state to true
      setLoading(false); //sets the loading state to false

      setTimeout(() => navigate("/"), 1600); //redirects to the home page after 1.6 seconds
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something went wrong while creating the event.";//gets the error message from the response or sets a default message

      setServerError(msg); //sets the server error
      setLoading(false); //sets the loading state to false
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-300/40">
      <SEO title="Create Event" description="Host your own event and reach a wider audience." />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-950/70 py-4 px-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-black cursor-pointer  p-2 dark:text-white transition"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="w-16"></div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Host something remarkable
          </h1>
          <p className="text-neutral-500 text-sm max-w-lg">
            Fill in the details to publish your event. Keep things clear and simple.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6">

            {/* Title + Description */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 space-y-5">
              <div>
                <label className="text-xs text-neutral-500 mb-1 block">
                  Event Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Design Leadership Summit 2026"
                  className="w-full text-lg font-medium bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white pb-2 outline-none placeholder:text-neutral-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500 mb-1 block">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What should attendees expect?"
                  className="w-full text-sm bg-neutral-100 dark:bg-neutral-950 p-4 rounded-xl outline-none border border-transparent focus:border-neutral-400 transition"
                  required
                />
              </div>
            </div>

            {/* Date + Capacity */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-neutral-500 mb-2 flex items-center gap-2">
                  <Calendar size={14} /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 outline-none border border-transparent focus:border-neutral-400 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500 mb-2 flex items-center gap-2">
                  <Users size={14} /> Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 outline-none border border-transparent focus:border-neutral-400 text-sm"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex bg-neutral-100 dark:bg-neutral-950 p-1 rounded-xl">
                {["physical", "virtual"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setEventType(type);
                      // Clear location & coords when switching types to avoid stale data
                      setFormData(prev => ({ ...prev, location: "" }));
                      setCoords({ lat: null, lng: null });
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm transition ${eventType === type
                      ? "bg-white dark:bg-neutral-800 shadow text-neutral-900 dark:text-white"
                      : "text-neutral-500"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  name="location"
                  value={formData.location}
                  onChange={(e) => {
                    handleChange(e);
                    setCoords({ lat: null, lng: null }); //reset coords when user edits
                  }}
                  placeholder={eventType === "physical" ? "Search for a venue..." : "Meeting link"}
                  className="w-full p-3 pr-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 outline-none border border-transparent focus:border-neutral-400 text-sm transition"
                  required
                  autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  {isVerifying ? (
                    <Loader2 size={16} className="text-neutral-400 animate-spin" />
                  ) : eventType === "virtual" ? (
                    <Globe size={16} className="text-neutral-400" />
                  ) : eventType === "physical" && formData.location.length >= 3 && !coords.lat ? (
                    <MapPin size={16} className="text-neutral-400" />
                  ) : null}
                </div>
              </div>

              {showMeetingPreview && (
                <MeetingLinkPreview link={formData.location} actionLabel="Preview" />
              )}

              {coords.lat && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 mt-1.5 px-1"
                >
                  <CheckCircle2 size={14} />
                  Verified location found
                </motion.p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 space-y-6">

            {/* Upload */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-52 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-center cursor-pointer"
              >
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <UploadCloud size={20} className="text-neutral-400" />
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" required/>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex bg-neutral-100 dark:bg-neutral-950 p-1 rounded-xl">
                {["free", "paid"].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPricingType(type)}
                    className={`flex-1 py-2 rounded-lg text-sm ${pricingType === type
                      ? "bg-white dark:bg-neutral-800 shadow"
                      : "text-neutral-500"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {pricingType === "paid" && (
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Amount (₦)"
                  className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 outline-none border border-transparent focus:border-neutral-400 text-sm"
                  required
                />
              )}
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-xs text-neutral-500">
                Categories ({tags.length}/{TAG_LIMIT})
              </div>

              <div className="flex flex-wrap gap-2">
                {PREDEFINED_TAGS.map(tag => {
                  const active = tags.includes(tag.name);
                  const Icon = tag.icon;
                  return (
                    <button
                      key={tag.name}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition ${active
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        }`}
                    >
                      <Icon size={12} />
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {serverError && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 rounded-xl flex justify-center text-sm font-medium transition ${success
                ? "bg-green-500 text-white"
                : "bg-black text-white dark:bg-white dark:text-black"
                }`}
            >
              {loading ? <Loader className="animate-spin"/> : success ? "Event Published!" : "Publish Event"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default CreatePage;