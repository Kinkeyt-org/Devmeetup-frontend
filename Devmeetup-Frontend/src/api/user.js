import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://devmeetup.duckdns.org";

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
  const config = {
    headers: {
      "Accept": "application/json",
    }
  };

  if (payload instanceof FormData) {
    // 1. Let the browser set the multipart/form-data boundary automatically
    config.headers["Content-Type"] = undefined;

    /**
     * 2. METHOD SPOOFING: 
     * Many backends (Laravel/PHP) cannot read files on a PATCH request.
     * We send it as a POST but add the '_method' field so the 
     * server handles it as a PATCH.
     */
    payload.append("_method", "PATCH");

    const res = await api.post("/update", payload, config);
    return res.data;
  }

  // If it's just a regular JSON update (no files), standard PATCH works fine
  const res = await api.patch("/update", payload);
  return res.data;
};
