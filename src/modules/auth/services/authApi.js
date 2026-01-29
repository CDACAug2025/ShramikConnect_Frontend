import axiosInstance from '@/services/axiosInstance';

export const loginApi = async (payload) => {
  console.log('Login payload:', payload);
  try {
    const loginData = {
      username: payload.email,
      password: payload.password
    };
    const { data } = await axiosInstance.post('/auth/login', loginData);
    console.log('Login response:', data);
    return data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const registerApi = async (payload) => {
  const { data } = await axiosInstance.post('/auth/register', payload);
  return data;
};
