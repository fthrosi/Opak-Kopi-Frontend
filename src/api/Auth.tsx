import api from "./index";

export const login = async (formData: { email: string; password: string; }) => {
  try {
    const response = await api.post('/auth/login', formData);
    return response.data;
  } catch (error : any) {
    throw error.response?.data?.error;
  }
};
export const registerUser = async (formData : { email: string; password: string; name: string; }) => {
  try {
    const response = await api.post('/auth/register', formData);
    return response.data;
  } catch (error : any) {
    throw error.response?.data?.error || "Registrasi gagal. Silakan coba lagi.";
  }
};
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await api.post('/auth/request-password-reset', { email });
    return response.data;
  } catch (error : any) {
    console.error(error);
    throw error.response?.data?.error || "Permintaan reset kata sandi gagal. Silakan coba lagi.";
  }
};
export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error : any) {
    throw error.response?.data?.error || "Verifikasi OTP gagal. Silakan coba lagi.";
  }
};
export const resetPassword = async (resetToken: string, newPassword: string) => {
  try {
    const response = await api.post('/auth/reset-password', { resetToken, newPassword });
    return response.data;
  } catch (error : any) {
    throw error.response?.data?.error || "Reset kata sandi gagal. Silakan coba lagi.";
  }
};
