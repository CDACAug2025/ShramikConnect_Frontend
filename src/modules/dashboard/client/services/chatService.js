import axios from "../../../../services/axiosInstance";

export const getMessages = (roomId) => {
  return axios.get(`/chat/${roomId}`);
};

export const sendMessage = (data) => {
  return axios.post("/chat/send", data);
};

export const askBot = (question) => {
  return axios.post("/chatbot/ask", { question });
};
