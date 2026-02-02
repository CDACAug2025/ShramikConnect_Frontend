import axiosInstance from '@/services/axiosInstance';

export const loginApi = async (payload) => {
  // ✅ Backend AuthService looks for "username"
  const { data } = await axiosInstance.post('/auth/login', {
    username: payload.username, 
    password: payload.password,
  });
  return data;
};

export const registerApi = async (payload) => {
  const { data } = await axiosInstance.post('/auth/register', payload);
  return data;
};

// Forgot Password
export const forgotPasswordApi = (email) => {
  return axiosInstance.post('/auth/forgot-password', { email });
};

// Reset Password
export const resetPasswordApi = (token, newPassword, confirmPassword) => {
  return axiosInstance.post('/auth/reset-password', {
  token,
  newPassword,
  confirmPassword,
});

};