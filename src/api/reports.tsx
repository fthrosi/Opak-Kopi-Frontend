import api from "./index";

export const fetchLaporanPenjualan = async (
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await api.get("/reports/sales-report", {
      params: {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchLaporanMenu = async (
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await api.get("/reports/menu-report", {
      params: {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchLaporanPromo = async (
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await api.get("/reports/promo-report", {
      params: {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchLaporanReservasi = async (
  startDate?: string,
  endDate?: string
) => {
  try {
    const response = await api.get("/reports/reservation-report", {
      params: {
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
