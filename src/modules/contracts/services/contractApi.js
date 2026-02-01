import axiosInstance from '@/services/axiosInstance';

export const createContractApi = (payload) =>
  axiosInstance.post('/contracts', payload);

export const getMyContractsApi = () =>
  axiosInstance.get('/contracts/my');

export const updateContractStatusApi = (contractId, status) =>
  axiosInstance.put(`/contracts/${contractId}/status`, null, {
    params: { status },
  });
