import axios from "../../../../services/axiosInstance";

// ✅ Completed Jobs
export const getCompletedJobs = () => {
  return axios.get("/history/jobs");
};

// ✅ Past Contracts
export const getPastContracts = () => {
  return axios.get("/history/contracts");
};

// ✅ Payment History
export const getPaymentHistory = () => {
  return axios.get("/history/payments");
};
