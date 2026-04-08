import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper: config that lets axios auto-set multipart/form-data + boundary
const multipartConfig = {
  headers: { "Content-Type": undefined },
};

// --- EVENTS ---

export const getEvents = async () => {
  const res = await api.get("/events");
  // Response shape: { data: [...] }
  return res.data.data || [];
};

export const getEventDetails = async (id) => {
  const res = await api.get(`/events/${id}`);
  // Response shape: { data: { ... } }
  return res.data.data;
};

// Create event — always FormData (supports banner upload, tags, is_free, price)
// Response shape: { message: "...", details: { ... } }
export const createEvent = async (payload) => {
  const res = await api.post("/events", payload, multipartConfig);
  return res.data.details;
};

// Update event (organizers only) — supports both FormData and plain JSON
// Response shape: { message: "...", details: { ... } }
export const updateEvent = async (eventId, payload) => {
  if (payload instanceof FormData) {
    // Laravel doesn't support PUT with multipart, so we spoof it via POST + _method
    payload.append("_method", "PUT");
    const res = await api.post(`/events/${eventId}`, payload, multipartConfig);
    return res.data.details;
  }

  const res = await api.put(`/events/${eventId}`, payload);
  return res.data.details;
};

// Delete event (organizers only)
export const deleteEvent = async (eventId) => {
  const res = await api.delete(`/events/${eventId}`);
  return res.data;
};

// --- TICKETS ---

export const getMyTickets = async () => {
  const res = await api.get("/my-tickets");
  // Response shape: { data: [...] }
  return res.data.data || [];
};

export const bookEvent = async (eventId) => {
  const res = await api.post(`/event/${eventId}/book`);
  // Response shape: { message, "ticket-details": {...}, "capacity-left": N }
  return {
    message: res.data.message,
    tickets: res.data["ticket-details"],
    capacityLeft: res.data["capacity-left"],
  };
};

export const cancelEventTicket = async (ticketId) => {
  const res = await api.patch(`/tickets/${ticketId}/cancel`);
  return res.data;
};