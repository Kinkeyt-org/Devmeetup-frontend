import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
});

// attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- USER PROFILE ---
export const updateProfile = async (payload) => {
  let config = {};
  if (payload instanceof FormData) {
    // If updating a photo, we use multipart
    config.headers = { "Content-Type": undefined };
  }
  
  const res = await api.patch("/update", payload, config); //
  return res.data;
};