import api from "./index";

export async function createReservation(data: { number_of_guest: number; reservation_time: string }) {
  try {
    const res = await api.post("/reservations/add", data);
    return res.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}

export async function fetchByUser(){
  try {
    const res = await api.get("/reservations/getByUser");
    return res.data;
  } catch (error) {
    console.error("Error fetching reservations by user:", error);
    throw error;
  }
}

export async function updateReservationStatus(id: number, status: string) {
  try {
    const res = await api.put(`/reservations/update/${id}`, { status });
    return res.data;
  } catch (error) {
    console.error("Error updating reservation status:", error);
    throw error;
  }
}