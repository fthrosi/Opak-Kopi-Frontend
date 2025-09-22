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