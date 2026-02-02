import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';

export const useWorkerProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      // ✅ axiosInstance hits http://localhost:8080/api/worker/products
      const res = await axiosInstance.get('/worker/products');
      setItems(res.data); // This now contains real DB records
    } catch (err) {
      console.error("Failed to fetch live database products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, refresh: fetchItems };
};