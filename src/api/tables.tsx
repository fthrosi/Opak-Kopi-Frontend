import api from "./index";

export const fetchtables = async () => {
  try {
    const response = await api.get("/tables");
    return response.data;
  } catch (error) {
    throw error;
  }
};