import axios from "axios";

// Try to get API URL from environment (production),
// if not available, fall back to your dev server
const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://devmeetup.duckdns.org/api";

// Create a custom axios instance so we don’t repeat base URL and headers everywhere
const api = axios.create({
  baseURL: API_URL, // every request will automatically start from this
  headers: {
    "Content-Type": "application/json", // we mostly send JSON
    "Accept": "application/json", // we expect JSON back
  },
});

// This runs before every request goes out
// If a user is logged in, attach their token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // grab token from storage

  if (token) {
    // attach token so backend can authenticate user
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // continue request as normal
});

// For file uploads, we let the browser set the Content-Type itself
// (important for FormData, otherwise uploads can break)
const multipartConfig = {
  headers: { "Content-Type": undefined },
};

// ==================== EVENT ROUTES ====================

// Fetch events (supports sorting, pagination, and optional location filtering)
export const getEvents = async (
  type = "recent",
  page = 1,
  perPage = 10,
  options = {}
) => {
  const { lat, lng, radius, tag } = options;

  // Start building the request URL with basic params
  let url = `/events?sort=${type}&page=${page}&perPage=${perPage}`;

  // Filter by tag/category if specified
  if (tag) {
    url += `&tag=${encodeURIComponent(tag)}`;
  }

  // If user location is available, send it so backend can return nearby events
  if (lat && lng) {
    url += `&lat=${lat}&lng=${lng}`;
  }

  // If a radius is specified, include it (for distance filtering)
  if (radius) {
    url += `&radius=${radius}`;
  }

  // Make the API request
  const res = await api.get(url);

  // Extract events safely (fallback to empty array if undefined)
  let events = res.data.data || [];


  return {
    events: events, // final event list (possibly filtered)
    links: res.data.links, // pagination links (next, prev, etc.)
    meta: res.data.meta, // pagination info (current page, total, etc.)
  };
};

// Fetch details for a single event
export const getEventDetails = async (id) => {
  const res = await api.get(`/events/${id}`);

  // Backend sometimes returns different shapes, so we handle both cases
  return res.data.data?.details || res.data.data;
};

// Create a new event (supports images/files via FormData)
export const createEvent = async (payload) => {
  const res = await api.post("/events", payload, multipartConfig);

  // Return the created event details
  return res.data.details;
};

// Update an existing event
export const updateEvent = async (eventId, payload) => {
  // If we're sending FormData (e.g. updating image/banner)
  if (payload instanceof FormData) {
    // Laravel workaround: fake PUT request using POST
    payload.append("_method", "PUT");

    const res = await api.post(
      `/events/${eventId}`,
      payload,
      multipartConfig
    );

    return res.data.details;
  }

  // If it's just normal JSON, use a proper PUT request
  const res = await api.put(`/events/${eventId}`, payload);

  return res.data.details;
};

// Delete an event
export const deleteEvent = async (eventId) => {
  const res = await api.delete(`/events/${eventId}`);

  // Usually returns a success message or status
  return res.data;
};