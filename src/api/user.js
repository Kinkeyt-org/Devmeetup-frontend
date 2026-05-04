import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    // FIX: Add default headers to match auth.js — ensures Laravel always
    // returns JSON and not an HTML error page for non-multipart requests
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// UPDATE PROFILE

// api/user.js
export const updateProfile = async (payload) => {
  try {
    if (payload instanceof FormData) {
      payload.append("_method", "PATCH");
      
      // FIX: Explicitly set multipart/form-data so it overrides the default application/json
      const res = await api.post("/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newImageUrl =
        res.data.user?.profile_picture ||
        res.data.user?.avatar ||
        res.data.profile_picture ||
        null;

      return { ...res.data, _resolvedAvatarUrl: newImageUrl };
    }

    // For text-only updates...
    const res = await api.patch("/update", payload);
    return { 
      ...res.data, 
      _resolvedAvatarUrl: res.data.user?.profile_picture || res.data.user?.avatar 
    };
  } catch (error) {
    if (error.response?.status === 422) {
      // FIX: Stringify the errors object so you can actually read what Laravel is complaining about in the console
      console.error("Validation Errors:", JSON.stringify(error.response.data.errors, null, 2));
    }
    throw error;
  }
};