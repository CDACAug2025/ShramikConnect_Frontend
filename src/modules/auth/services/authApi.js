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
