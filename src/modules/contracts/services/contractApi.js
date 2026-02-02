import axiosInstance from '@/services/axiosInstance';

export const createContractApi = (payload) =>
  axiosInstance.post('/contracts', payload);

export const getMyContractsApi = () =>
  axiosInstance.get('/contracts/my');

export const updateContractStatusApi = (id, status) =>
  axiosInstance.put(`/contracts/${id}/status`, null, {
    params: { status },
  });
