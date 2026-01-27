import axios from '@/services/axiosInstance';

export const fetchPendingKycs = () =>
  axios.get('/supervisor/kyc/pending');

export const decideKyc = (kycId, decision) =>
  axios.post(
    `/supervisor/kyc/${kycId}/decision?supervisorUserId=2`,
    { decision }
  );


  export const submitKycApi = (userId, payload) => {
  return axios.post(`/kyc/submit?userId=${userId}`, payload);
};