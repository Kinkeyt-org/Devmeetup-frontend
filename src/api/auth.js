import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// -----------------------------
// REQUEST INTERCEPTOR (attach token)
// -----------------------------
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -----------------------------
// RESPONSE INTERCEPTOR (handle 401 globally)
// -----------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - token expired or invalid");

      // Clear stored auth
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// -----------------------------
// SIGNUP
// -----------------------------
export const signup = async (formData) => {
  const res = await api.post("/register", formData);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  if (res.data.user) {
    const user = {
      ...res.data.user,
      avatar: res.data.user.avatar || res.data.user.profile_picture || null,
      profile_picture: res.data.user.profile_picture || res.data.user.avatar || null,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  return res.data;
};

// -----------------------------
// LOGIN
// -----------------------------
export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  if (res.data.user) {
    const normalizedUser = {
      ...res.data.user,
      avatar: res.data.user.avatar || res.data.user.profile_picture || null,
      profile_picture: res.data.user.profile_picture || res.data.user.avatar || null,
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    res.data.user = normalizedUser;
  }

  return res.data;
};

// -----------------------------
// LOGOUT
// -----------------------------
export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {
    console.error(
      "Server-side logout failed:",
      error.response?.data || error.message
    );
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};