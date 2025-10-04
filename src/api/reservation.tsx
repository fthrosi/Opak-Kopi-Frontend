import api from "./index";

export async function createReservation(data: { number_of_guest: number; reservation_time: string }) {
  try {
    const res = await api.post("/reservations/add", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchByUser(){
  try {
    const res = await api.get("/reservations/getByUser");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateReservationStatus(id: number, status: string) {
  try {
    const res = await api.put(`/reservations/update/${id}`, { status });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchReservationById(id: number) {
  try {
    const res = await api.get(`/reservations/getBy/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllReservations() {
  try {
    const res = await api.get("/reservations/getAll");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStatusReservasi(id: number,status: {status: string, cancellation_reason?: string}) {
  try {
    const res = await api.put(`/reservations/update/${id}`, status );
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function checkin(id: number,checkinCode: {checkinCode: string}) {
  try {
    const res = await api.put(`/reservations/checkin/${id}`, checkinCode);
    return res.data;
  } catch (error :any) {
    throw error.response.data.error;
  }
}

export const getReservationRange = async (startDate?: string, endDate?: string) => {
  try {
    const response = await api.get("/reservations/getByRange", {
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