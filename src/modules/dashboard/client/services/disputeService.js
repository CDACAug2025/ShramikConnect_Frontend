import axios from "../../../../services/axiosInstance";

export const raiseDispute = (data) => {
  return axios.post("/disputes/create", data);
};

export const getDisputeByJob = (jobId) => {
  return axios.get(`/disputes/job/${jobId}`);
};
