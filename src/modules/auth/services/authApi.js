import axiosInstance from '@/services/axiosInstance';

export const loginApi = async (payload) => {
  console.log('Login payload:', payload);
  console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
  try {
    const { data } = await axiosInstance.post('/auth/login', payload);
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
