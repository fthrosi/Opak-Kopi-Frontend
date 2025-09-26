import api from "./index";

export const login = async (formData: { email: string; password: string; }) => {
  try {
    const response = await api.post('/auth/login', formData);
    return response.data;
  } catch (error : any) {
    console.error('Login gagal:', error.response?.data?.error);
    throw error.response?.data?.error;
  }
};
export const registerUser = async (formData : { email: string; password: string; name: string; }) => {
  try {
    const response = await api.post('/auth/register', formData);
    return response.data;
  } catch (error : any) {
    console.error('Registrasi gagal:', error.response?.data?.error);
    throw error.response?.data?.error || "Registrasi gagal. Silakan coba lagi.";
  }
};
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout gagal:', error);
    throw error;
  }
};
