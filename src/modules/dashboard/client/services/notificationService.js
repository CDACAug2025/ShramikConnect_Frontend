import axios from "../../../../services/axiosInstance";

export const getNotifications = () => {
  return axios.get("/notifications");
};

export const markAsRead = (id) => {
  return axios.put(`/notifications/read/${id}`);
};
