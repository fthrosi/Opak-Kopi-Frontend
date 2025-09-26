import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Promise untuk track refresh process
let refreshPromise: Promise<any> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;
      
      // Jika belum ada refresh process, mulai refresh
      if (!refreshPromise) {
        console.log("Starting refresh token...");
        refreshPromise = api.post("/auth/refresh-token")
          .then((response) => {
            console.log("Refresh token success");
            refreshPromise = null; // Reset promise
            return response;
          })
          .catch((refreshError) => {
            console.error("Refresh token failed:", refreshError);
            refreshPromise = null; // Reset promise
            
            // Logout user
            localStorage.removeItem("auth");
            
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            
            throw refreshError;
          });
      }
      
      try {
        // Tunggu refresh selesai
        await refreshPromise;
        console.log("Retrying original request...");
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;