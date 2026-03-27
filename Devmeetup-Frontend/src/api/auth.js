// auth.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Always send cookies across domains
axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  // 1. Initialize CSRF protection
  await axios.get(`${API_URL}/sanctum/csrf-cookie`);

  // 2. Perform Login
  const res = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true } // ensure cookies are sent
  );

  return res.data;
};

export const signup = async (name, email, password, password_confirmation) => {
  // 1. Initialize CSRF protection
  await axios.get(`${API_URL}/sanctum/csrf-cookie`);

  // 2. Perform Signup
  const res = await axios.post(
    `${API_URL}/register`,
    { name, email, password, password_confirmation },
    { withCredentials: true }
  );

  return res.data;
};