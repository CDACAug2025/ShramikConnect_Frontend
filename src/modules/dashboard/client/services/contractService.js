import axios from "../../../../services/axiosInstance";

export const generateContract = (data) => {
  return axios.post("/contracts/create", data);
};

export const getContract = (jobId) => {
  return axios.get(`/contracts/job/${jobId}`);
};

export const signContract = (id) => {
  return axios.put(`/contracts/sign/${id}`);
};

export const downloadContract = (id) => {
  return axios.get(`/contracts/download/${id}`, {
    responseType: "blob"
  });
};
