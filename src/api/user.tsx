import api from "./index";
import type { User, updateEmail, updatePassword } from "../types/user";

export const updateDataUser = async (data: Partial<User>) => {
  try {
    const response = await api.put("/user/update", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfilePicture = async (formData: FormData) => {
  try {
    const response = await api.put("/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDataEmail = async (data: updateEmail) => {
  try {
    const response = await api.put("/user/updateEmail", data);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response.status,
      message: error.response.data?.error || "Terjadi kesalahan",
    };
  }
};

export const changeUserPassword = async (data: updatePassword) => {
  try {
    const response = await api.put("/user/changePassword", data);
    return response.data;
  } catch (error: any) {
    throw {
      status: error.response.status,
      message: error.response.data?.error || "Terjadi kesalahan",
    };
  }
};
