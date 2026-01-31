import axiosInstance from '@/services/axiosInstance';

export const loginApi = async (payload) => {
  const { data } = await axiosInstance.post('/auth/login', {
    username: payload.username, // ✅ not email anymore
    password: payload.password,
  });
  return data;
};

export const registerApi = async (payload) => {
  const { data } = await axiosInstance.post('/auth/register', payload);
  return data;
};

export const forgotPasswordApi = (email) =>
  axiosInstance.post("/auth/forgot-password", { email });

export const resetPasswordApi = (token, newPassword, confirmPassword) =>
  axiosInstance.post("/auth/reset-password", {
    token,
    newPassword,
    confirmPassword,
  });

