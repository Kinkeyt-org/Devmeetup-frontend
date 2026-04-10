import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json", // ADDED — tells Laravel to return JSON not HTML
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
  
  localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data for profile display
  return res.data;
};


// SIGNUP - Needs to handle profile pictures
export const signup = async (formData) => {
  // Use POST with multipart/form-data for the profile picture
  const res = await api.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

// LOGOUT
export const logout = async () => {
  try {
    await api.get("/logout"); //  ADDED — tell Laravel to invalidate the token
  } finally {
    localStorage.removeItem("token"); // Always clear local token even if request fails
  }
};