import axios from "../../../../services/axiosInstance";

export const createEscrowOrder = (jobId) => {
  return axios.post(`/payments/escrow/create/${jobId}`);
};

export const getPaymentStatus = (jobId) => {
  return axios.get(`/payments/status/${jobId}`);
};

export const releasePayment = (jobId) => {
  return axios.put(`/payments/release/${jobId}`);
};
