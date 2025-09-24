import api from ".";

export const addFavoriteMenu = async (id_menu : number) => {
  try {
    const response = await api.post(`/user/favoritemenu/add/${id_menu}`);
    return response.data;
    } catch (error) {
    console.error("Error adding favorite menu:", error);
    throw error;
    }
};

export const removeFavoriteMenu = async (menuId: number) => {
  try {
    const response = await api.delete(`/user/favoritemenu/delete/${menuId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing favorite menu:", error);
    throw error;
  }
};
export const getFavoriteMenus = async () => {
  try {
    const response = await api.get(`/user/favoritemenu/getAll`);
    return response.data;
    } catch (error) {
    console.error("Error fetching favorite menus:", error);
    throw error;
    }
};