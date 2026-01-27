import axios from "../../../../services/axiosInstance";

export const getJobProgress = (jobId) => {
  return axios.get(`/jobs/progress/${jobId}`);
};

export const markCompleted = (jobId) => {
  return axios.put(`/jobs/complete/${jobId}`);
};
