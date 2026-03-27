// auth.js
import axios from "axios";

// Make sure this matches your ngrok URL + API prefix if any (e.g., /api)
const API_URL = import.meta.env.VITE_API_BASE_URL || "https://decrescent-commemoratory-asuncion.ngrok-free.dev";

// Always send cookies with cross-origin requests
axios.defaults.withCredentials = true;

// Initialize CSRF token
const getCsrfToken = async () => {
  try {
    await axios.get(`${API_URL}/sanctum/csrf-cookie`);
  } catch (err) {
    console.error("CSRF Init Error:", err);
    throw new Error("Could not initialize CSRF token");
  }
};

// LOGIN
export const login = async (email, password) => {
  try {
    // Step 1: Get CSRF token
    await getCsrfToken();

    // Step 2: Call login endpoint
    const res = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true } // ensures cookies are sent
    );

    return res.data;
  } catch (err) {
    console.error("Login Error:", err);
    // Grab message from backend if available
    throw err.response?.data?.message || "Login failed";
  }
};

// SIGNUP
export const signup = async (name, email, password, password_confirmation) => {
  try {
    // Step 1: Get CSRF token
    await getCsrfToken();

    // Step 2: Call register endpoint
    const res = await axios.post(
      `${API_URL}/register`,
      { name, email, password, password_confirmation },
      { withCredentials: true }
    );

    return res.data;
  } catch (err) {
    console.error("Signup Error:", err);
    throw err.response?.data?.message || "Signup failed";
  }
};

// LOGOUT
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("token");
  } catch (err) {
    console.error("Logout Error:", err);
    throw err.response?.data?.message || "Logout failed";
  }
};