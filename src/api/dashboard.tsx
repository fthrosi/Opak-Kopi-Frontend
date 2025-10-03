import api from "./index";

export const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  } catch (error) {
    throw error;
  }
};