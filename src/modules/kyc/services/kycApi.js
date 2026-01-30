import axios from '@/services/axiosInstance';

export const fetchPendingKycs = () =>
  axios.get('/supervisor/kyc/pending');

export const decideKyc = (kycId, decision) =>
  axios.post(
    `/supervisor/kyc/${kycId}/decision?supervisorUserId=2`,
    { decision }
  );


  export const submitKycApi = async (payload) => {
  const { data } = await axios.post('/kyc/submit', payload);
  return data;
};