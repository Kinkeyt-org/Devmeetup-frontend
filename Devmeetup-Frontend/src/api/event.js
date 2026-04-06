import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    // Content-Type here is a default; axios overrides it for FormData automatically
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Attach token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- EVENTS ---

export const getEvents = async () => {
  const res = await api.get("/events");
  // Per Postman: the array is nested in .data.data
  return res.data.data || [];
};

export const getMyTickets = async () => {
  const res = await api.get("/my-tickets");
  return res.data.data || [];
};

export const bookEvent = async (eventId, number = 1) => {
  const res = await api.post(`/event/${eventId}/book`, {
    number,
  });

  return res.data;
};

export const cancelEventTicket = async (ticketId) => {
  const res = await api.patch(`/tickets/${ticketId}/cancel`);
  return res.data;
};

export const createEvent = async (payload) => {
  /**
   * FIX for 413/CORS Error:
   * Note: If payload is FormData, DO NOT manually set "Content-Type". 
   * If you set it to "multipart/form-data" manually, the "boundary" 
   * string (which the server needs to parse the file) will be missing.
   * Axios handles this automatically if you leave the header out for FormData.
   */
  const config = {};
  if (!(payload instanceof FormData)) {
    config.headers = { "Content-Type": "application/json" };
  } else {
    // Deleting the default application/json to let the browser set the boundary
    config.headers = { "Content-Type": undefined };
  }

  const res = await api.post("/events", payload, config);

  // Per Postman: success responses use .details or .data
  return res.data.details || res.data.data || res.data;
};

//Update zevent for organizers only
export const updateEvent = async (eventId, payload) => {
  const config = {};

  if (!(payload instanceof FormData)) {
    config.headers = { "Content-Type": "application/json" };
  } else {
    config.headers = { "Content-Type": undefined };
  }

  const res = await api.put(`/events/${eventId}`, payload, config);

  return res.data;
};

// Delete event for organizers only
export const deleteEvent = async (eventId) => {
  const res = await api.delete(`/events/${eventId}`);
  return res.data;
};