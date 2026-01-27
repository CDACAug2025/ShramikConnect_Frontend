import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage
} from "../services/chatService";

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const loadMessages = async () => {
    const res = await getMessages(roomId);
    setMessages(res.data);
  };

  const send = async () => {
    if (!text.trim()) return;
    await sendMessage({ roomId, message: text });
    setText("");
    loadMessages();
  };

  useEffect(() => {
    if (roomId) loadMessages();
  }, [roomId]);

  return {
    messages,
    text,
    setText,
    send
  };
};
