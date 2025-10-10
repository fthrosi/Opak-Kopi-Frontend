import api from "./index";

export const fetchMenu = async () => {
  try {
    const response = await api.get("/menus");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMenuStatus = async (
  id: number,
  status: { status: string }
) => {
  try {
    const response = await api.put(`/menus/update/${id}`, status);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMenu = async (id: number, menuData: FormData) => {
  try {
    const response = await api.put(`/menus/update/${id}`, menuData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMenu = async (menuData: FormData) => {
  try {
    const response = await api.post("/menus/add", menuData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenu = async (id: number) => {
  try {
    const response = await api.put(`/menus/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const topMenus = async () => {
  try {
    const response = await api.get("/dashboard/top-menus");
    return response.data;
  } catch (error) {
    throw error;
  }
};
