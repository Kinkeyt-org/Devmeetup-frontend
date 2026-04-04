import axios from "axios";

//  Base URL should be consistent with Postman's API endpoint
const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

// Create an axios instance with default headers why? To ensure all requests have the correct content type and accept headers, which can help prevent issues with API responses and ensure proper communication with the backend.
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// attach token to every request if available, ensuring authenticated requests to protected endpoints
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// EVENTS
export const getEvents = async () => {
  const res = await api.get("/events");
  // FIX: In your Postman success, events are under .data
  return res.data.data || [];
};

export const getMyTickets = async () => {
  const res = await api.get("/my-tickets");
  return res.data.data || [];
};

export const bookEvent = async (eventId) => {
  // FIX: Ensuring URL matches Postman's singular "event" route
  const res = await api.post(`/event/${eventId}/book`);
  return res.data;
};

export const cancelEventTicket = async (ticketId) => {
  const res = await api.patch(`/tickets/${ticketId}/cancel`);
  return res.data;
};

export const createEvent = async (payload) => {
  //  Ensuring URL matches Postman's singular "event" route and handling both JSON and FormData payloads
  const res = await api.post("/events", payload, {
    //  Dynamically set Content-Type based on payload type to handle both JSON and FormData correctly
    headers:{
      //  If payload is FormData, set to multipart/form-data, otherwise default to application/json
      "Content-Type": payload instanceof FormData ? "multipart/form-data" : "application/json",
    }
  });
  //  Postman shows single created event is under .details
  return res.data.details || res.data;
};