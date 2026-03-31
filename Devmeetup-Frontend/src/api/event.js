import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// EVENTS
export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data.data || [];
};

export const getMyTickets = async () => {
  const res = await api.get("/my-tickets");
  return res.data.data || [];
};

export const bookEvent = async (eventId) => {
  const res = await api.post(`/event/${eventId}/book`);
  return res.data;
};

export const cancelEventTicket = async (ticketId) => {
  const res = await api.patch(`/tickets/${ticketId}/cancel`);
  return res.data;
};

export const createEvent = async (payload) => {
  const res = await api.post("/events", payload);
  return res.data;
};