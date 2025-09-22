import api from "./index";

export const fetchMenu = async () => {
  try {
    const response = await api.get("/menus");
    return response.data;
  } catch (error) {
    throw error;
  }
};
