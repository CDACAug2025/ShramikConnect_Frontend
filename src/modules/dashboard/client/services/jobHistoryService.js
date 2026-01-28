import axios from "../../../../services/axiosInstance";

export const getCompletedJobs = () => {
  return axios.get("/jobs/completed");
};

export const getPastContracts = () => {
  return axios.get("/contracts/history");
};

export const getPaymentHistory = () => {
  return axios.get("/payments/history");
};
