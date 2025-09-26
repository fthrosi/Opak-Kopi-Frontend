import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ← TAMBAH: Queue untuk pending requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// ← TAMBAH: Function untuk process queue
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

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
      
      // ← JIKA sedang refresh, queue request ini
      if (isRefreshing) {
        console.log("Queueing request while refreshing...");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          console.log("Retrying queued request...");
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log("Starting refresh token...");
      
      try {
        const response = await api.post("/auth/refresh-token");
        console.log("Refresh token success");
        
        // ← Process semua queued requests
        processQueue(null, response.data.token);
        
        // ← Retry original request
        console.log("Retrying original request...");
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        
        // ← Process queue with error
        processQueue(refreshError, null);
        
        // Logout user
        localStorage.removeItem("auth");
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // ← Reset flag
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;