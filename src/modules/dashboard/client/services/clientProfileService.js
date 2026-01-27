import axios from "../../../../services/axiosInstance";

export const getClientProfile = () => {
  return axios.get("/client/profile");
};

export const updateClientProfile = (data) => {
  return axios.put("/client/profile/update", data);
};
