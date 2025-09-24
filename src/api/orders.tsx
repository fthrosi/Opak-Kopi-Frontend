import api from "./index";

export const addOrder = async (orderData: any) => {
  try {
    const response = await api.post("/orders/add", orderData);
    return response.data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};
