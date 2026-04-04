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

export const updateProfile = async (formData) => {
  const res = await api.post("/profile/updwate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //  update local user
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};