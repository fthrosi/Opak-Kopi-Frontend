import api from "./index";
import type { Rating } from "../types/rating";

export const submitRating = async (data: Rating[]) => {
  try {
    const response = await api.post("/reviews", data);
    return response.data;
    } catch (error) {
    throw error;
  }
};
export const getRatingsMenu = async (menuId: number[]) => {
  try {
    const menuIdsQuery = menuId.join(',');
    const response = await api.get(`/reviews/ratings?menuIds=${menuIdsQuery}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};