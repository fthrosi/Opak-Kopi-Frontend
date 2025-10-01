import api from "./index";

export const fetchKategoriMenu = async () => {
  try {
    const response = await api.get("/menu-categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const findAllWithCount = async () => {
  try {
    const response = await api.get("/menu-categories/with-count");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateKategoriMenu = async (id: number, name: string) => {
  try {
    const response = await api.put(`/menu-categories/update/${id}`, { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteKategoriMenu = async (id: number) => {
  try {
    const response = await api.put(`/menu-categories/delete/${id}`);
    return response.data;
  } catch (error : any) {
    throw error?.response?.data.message;
  }
};
export const createKategoriMenu = async (name: string) => {
  try {
    const response = await api.post("/menu-categories/add", { name });
    return response.data;
  } catch (error : any) {
    throw error?.response?.data.message;
  }
};
