import axios from "axios";

// Base URL now points to your production backend
const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

// Axios instance that automatically attaches Bearer token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// LOGIN
export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

// SIGNUP
export const signup = async (name, email, password, password_confirmation) => {
  const res = await api.post("/register", { name, email, password, password_confirmation });
  return res.data;
};

// LOGOUT
export const logout = async () => {
  localStorage.removeItem("token");
};