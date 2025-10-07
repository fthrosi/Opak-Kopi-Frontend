import axios from "axios";
import useAuthStore from "@/components/store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setCheckingAuth, logout, login } = useAuthStore.getState();

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {

      originalRequest._retry = true;

      try {
        setCheckingAuth(true);
        const response = await api.post("/auth/refresh-token");
        
        if(response.data?.user){
          login(response.data.user);
        }
        return api(originalRequest);
      } catch (refreshError) {
        // ← Process queue with error
       logout();
       return Promise.reject(refreshError);
      } finally {
        setCheckingAuth(false);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
