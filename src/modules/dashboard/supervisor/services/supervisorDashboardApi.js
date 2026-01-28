import axios from '@/services/axiosInstance';

export const fetchSupervisorDashboard = () => {
  return axios.get('/supervisor/dashboard');
};
