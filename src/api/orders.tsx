import api from "./index";

export const addOrder = async (orderData: any) => {
  try {
    const response = await api.post("/orders/add", orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllOrders = async () => {
  try {
    const response = await api.get("/orders/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderRange = async (startDate?: string, endDate?: string) => {
  try {
    const response = await api.get("/orders/history", {
      params: {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOrdersByUser = async () => {
  try {
    const response = await api.get("/orders/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHistoryPoint = async () => {
  try {
    const response = await api.get("/orders/history-point");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDailyOrders = async () => {
  try {
    const response = await api.get("/orders/daily");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: number,
  status: {
    status: string;
    cancellation_reason?: string;
    payment_method?: string;
  }
) => {
  try {
    const response = await api.put(`/orders/update/${orderId}`, status);
    return response.data;
  } catch (error) {
    throw error;
  }
};
