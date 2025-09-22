import api from "./index";

export const fetchKategoriMenu = async () => {
  try {
    const response = await api.get("/menu-categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};
