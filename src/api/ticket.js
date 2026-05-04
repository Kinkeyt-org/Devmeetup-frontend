import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Book a ticket for an event.
 * POST /api/event/:eventId/book
 *
 * Response shape (from Postman):
 * {
 *   message: "Ticket has been created",
 *   "ticket-details": [{ id, event_id, attendee_id, ticket_code, status, created_at, updated_at }],
 *   "capacity-left": 99
 * }
 *
 * NOTE: `number` is required by the backend (defaults to 1 for single-ticket booking).
 */
export const bookEvent = async (eventId, number = 1) => {
  const res = await api.post(`/event/${eventId}/book`, { number });
  return {
    message: res.data.message,
    tickets: res.data["ticket-details"],   // hyphenated key — bracket notation required
    capacityLeft: res.data["capacity-left"],
  };
};

/**
 * Fetch all tickets belonging to the logged-in user.
 * GET /api/my-tickets
 *
 * Response shape (from Postman):
 * {
 *   message: "Tickets fetched Successfully",
 *   data: [
 *     {
 *       id, event_id, attendee_id, ticket_code, status,
 *       created_at, updated_at,
 *       event: { id, organizer_id, title, description, location, capacity, date, ... }
 *     }
 *   ]
 * }
 */
export const getMyTickets = async () => {
  const res = await api.get("/my-tickets");
  return res.data.data || [];
};

/**
 * Cancel a ticket.
 * PATCH /api/tickets/:ticketId/cancel
 *
 * Response shape (from Postman):
 * { message: "Ticket has been successfully cancelled", capacity_left: 99 }
 */
export const cancelEventTicket = async (ticketId) => {
  const res = await api.patch(`/tickets/${ticketId}/cancel`);
  return res.data;
};