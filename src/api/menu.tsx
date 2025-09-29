import api from "./index";

export const fetchMenu = async () => {
  try {
    const response = await api.get("/menus");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMenuStatus = async (id: number, status: {status : string}) => {
  try {
    const response = await api.put(`/menus/update/${id}`, status);
    return response.data;
  } catch (error) {
    throw error;
  }
};
