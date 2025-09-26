import api from "./index";

export async function checkPromoCode(promo: string , menuId: number[]) {
  try {
    const menuIdsQuery = menuId.join(',');
    const res = await api.get(`/promos/code/${promo}?menuIds=${menuIdsQuery}`);
    return res.data;
  } catch (error : any) {
    throw {
        valid: false,
        status: error.response.status,
        message: error.response.data?.error || "Terjadi kesalahan",
      };
  }
}
export async function getPromoStatus(status: string) {
  try {
    const res = await api.get(`/promos/status/${status}`);
    return res.data;
  } catch (error: any) {
    throw {
      valid: false,
      status: error.response.status,
      message: error.response.data?.error || "Terjadi kesalahan",
    };
  }
}
export async function getAllPromos() {
  try {
    const res = await api.get("/promos");
    return res.data;
  } catch (error) {
    console.error("Error fetching all promos:", error);
    return { valid: false, error: "Gagal ambil semua promo" };
  }
}
