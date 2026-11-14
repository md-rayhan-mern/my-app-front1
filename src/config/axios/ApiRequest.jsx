import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser?.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("user");

      // ৩. লগইন পেজে থাকলে যেন অযথা পেজ রিলোড না হয়
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
