import api from "./index";

export async function checkPromoCode(promo: string) {
  try {
    const res = await api.get(`/promos/code/${promo}`);
    return res.data;
  } catch (error) {
    console.error("Error checking promo code:", error);
    return { valid: false, error: "Gagal cek promo" };
  }
}