import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead
} from "../services/notificationService";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } finally {
      setLoading(false);
    }
  };

  const readNotification = async (id) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return {
    notifications,
    loading,
    readNotification
  };
};
