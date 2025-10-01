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
    throw { error };
  }
}
export async function getPromoAllWithCount() {
  try {
    const res = await api.get("/promos/with-claim-count");
    return res.data;
  } catch (error) {
    console.error("Error fetching all promos with count:", error);
    throw { error };
  }
}

export async function updatePromo(id: number, formData: FormData) {
  try {
    const res = await api.put(`/promos/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating promo:", error);
    throw { error };
  }

}

export async function updatePromoStatus(id: number, status: string) {
  try {
    const res = await api.put(`/promos/update/${id}`, { status });
    return res.data;
  } catch (error) {
    console.error("Error updating promo status:", error);
    throw { error };
  }
}

export async function deletePromo(id: number) {
  try {
    const res = await api.put(`/promos/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting promo:", error);
    throw { error };
  }
}
export async function createPromo(formData: FormData) {
  try {
    const res = await api.post("/promos/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating promo:", error);
    throw { error };
  }
}

