import api from "./index";

export const login = async (formData: { email: string; password: string; }) => {
  try {
    const response = await api.post('/auth/login', formData);
    return response.data;
  } catch (error) {
    console.error('Login gagal:', error);
    throw error;
  }
};
export const register = async (formData : { email: string; password: string; name: string; }) => {
  try {
    const response = await api.post('/auth/register', formData);
    return response.data;
  } catch (error) {
    console.error('Registrasi gagal:', error);
    throw error;
  }
};