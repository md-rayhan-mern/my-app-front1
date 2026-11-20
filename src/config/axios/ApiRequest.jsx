import axios from "axios";
import { store } from "../../store/store.js";
import { setCredentials, logout } from "../../features/auth/authSlice.js";

// ১. .env থেকে কমা (,) দিয়ে দুটি URL আলাদা করা হলো
const urls = import.meta.env.VITE_BASE_URL?.split(",") || [];
const refreshUrls = import.meta.env.VITE_REFRESHTOKEN_URL?.split(",") || [];
// ২. প্রোডাকশন (Vercel) হলে ২য় URL নেবে, আর লোকাল হলে ১ম URL নেবে
const baseUrl = import.meta.env.PROD
  ? ""
  : urls?.trim() || "http://localhost:4000";

// ২. প্রোডাকশন (Vercel) হলে ২য় URL নেবে, আর লোকাল হলে ১ম URL নেবে
const refreshTokenUrl = import.meta.env.PROD
  ? "/api/v1/refresh-token"
  : refreshUrls?.trim() || "http://localhost:4000/api/v1/refresh-token";

console.log(refreshTokenUrl);

const api = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.token;
    console.log(accessToken);

    // const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    //console.log(response);

    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const isAuthRequest =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/register") ||
      originalRequest?.url?.includes("/refresh-token");
    // যদি 401 এরর আসে এবং রিকোয়েস্টটি আগে রি-ট্রাই (retry) করা না হয়ে থাকে
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true; // ইনফিনিট লুপ আটকানোর জন্য ফ্ল্যাগ
      try {
        // ব্যাকএন্ডে রিফ্রেশ টোকেন রিকোয়েস্ট পাঠানো (কুকি অটোমেটিক যাবে)
        // নোট: এখানে মূল axios ব্যবহার করা ভালো, যাতে ইন্টারসেপ্টর লুপে না পড়ে
        const response = await axios.post(
          refreshTokenUrl,
          {},
          { withCredentials: true },
        );
        console.log(response);

        const newAccessToken = response.data.data.accessToken;
        console.log(newAccessToken);
        // নতুন Access Token দিয়ে Redux Store আপডেট করা
        store.dispatch(setCredentials({ token: newAccessToken }));
        // ফেইল হওয়া রিকোয়েস্টের হেডারে নতুন টোকেন বসানো
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // রিফ্রেশ টোকেনও এক্সপায়ার হয়ে গেলে ইউজারকে লগআউট করে দেওয়া
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
