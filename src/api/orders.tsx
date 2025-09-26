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
export const getOrdersByUser = async () => {
  try {
    const response = await api.get("/orders/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getHistoryPoint = async () => {
  try {
    const response = await api.get("/orders/history-point");
    return response.data;
  } catch (error) {
    console.error("Error fetching point history:", error);
    throw error;
  }
};
