// auth.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Important: This allows cookies to be sent/received across domains (ngrok)
axios.defaults.withCredentials = true;

const axiosConfig = {
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
};

export const login = async (email, password) => {
  // 1. Initialize CSRF protection
  await axios.get(`${API_URL}`, axiosConfig);

  // 2. Perform Login
  const res = await axios.post(`${API_URL}/login`, { email, password }, axiosConfig);
  return res.data;
};

export const signup = async (name, email, password, password_confirmation) => {
  // 1. Initialize CSRF protection
  await axios.get(`${API_URL}`, axiosConfig);

  // 2. Perform Signup
  const res = await axios.post(
    `${API_URL}/register`,
    { name, email, password, password_confirmation},
    axiosConfig
  );
  return res.data;
};