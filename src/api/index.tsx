import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Jika error 401, coba refresh token
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        // Ulangi request setelah refresh
        return api(originalRequest);
      } catch (err) {
        // Jika gagal refresh, bisa logout user di sini
        return Promise.reject(err);
      }
    }
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;