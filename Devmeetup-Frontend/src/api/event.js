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
//get specific event details
export const getEventDetails = async (id) => {
  const res = await api.get(`/events/${id}`);
  return  res.data.data;
};

export const getMyTickets = async () => {
  const res = await api.get("/my-tickets");
  return res.data.data || [];
};

export const bookEvent = async (eventId) => {
  const res = await api.post(`/event/${eventId}/book`);

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

// Create event
export const createEvent = async (payload) => {
  const res = await api.post("/events", payload);
  return res.data.data;
};

//Update event for organizers only
export const updateEvent = async (eventId, payload) => {
  const config = {
    headers: { "Content-Type": undefined }
  };

  if (payload instanceof FormData) {
    // TRICK: Send as POST but tell Laravel it is a PUT
    payload.append("_method", "PUT");
    const res = await api.post(`/events/${eventId}`, payload, config);
    return res.data;
  }

  // Standard JSON update
  const res = await api.put(`/events/${eventId}`, payload);
  return res.data;
};

// Delete event for organizers only
export const deleteEvent = async (eventId) => {
  const res = await api.delete(`/events/${eventId}`);
  return res.data;
};