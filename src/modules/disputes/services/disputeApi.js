import axiosInstance from '@/services/axiosInstance';

export const fetchDisputes = () =>
  axiosInstance.get('/supervisor/disputes');

export const updateDisputeStatus = (id, status) =>
  axiosInstance.put(`/supervisor/disputes/${id}/status`, { status });
