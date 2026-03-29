import axios from "axios"; // Importing axios for making HTTP requests why? Because it simplifies the process of sending asynchronous HTTP requests to REST endpoints and performing CRUD operations. It also provides features like interceptors, automatic JSON data transformation, and better error handling compared to the native fetch API.

// Base URL now points to your production backend
const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api"; // Use environment variable for API base URL, fallback to production URL if not set

// Axios instance that automatically attaches Bearer token
const api = axios.create({ // Create an axios instance with default configuration
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage if available
api.interceptors.request.use(config => { // Interceptor to add Authorization header with Bearer token if it exists in localStorage
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// LOGIN
export const login = async (email, password) => { // Function to handle user login, sends email and password to the backend and stores the returned token in localStorage
  const res = await api.post("/login", { email, password });
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

// SIGNUP
export const signup = async (name, email, password, password_confirmation) => {// Function to handle user registration, sends name, email, password, and password confirmation to the backend and returns the response data
  const res = await api.post("/register", { name, email, password, password_confirmation });
  return res.data;
};

// LOGOUT
export const logout = async () => { // Function to handle user logout, simply removes the token from localStorage
  localStorage.removeItem("token");
};