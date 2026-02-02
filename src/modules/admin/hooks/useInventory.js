import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';

const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
  setLoading(true);
  try {
    // Resulting URL: http://localhost:8080/api/admin/products
    const response = await axiosInstance.get('/admin/products'); 
    setProducts(response.data);
  } catch (err) {
    console.error("403 Forbidden. Check: 1. Token exists, 2. User has ADMIN role in DB", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddProduct = async (formData) => {
    const response = await axiosInstance.post('/admin/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setProducts(prev => [...prev, response.data]);
  };

  const handleUpdateProduct = async (id, formData) => {
    const response = await axiosInstance.put(`/admin/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    // ✅ Use productId to match backend entity
    setProducts(prev => prev.map(p => p.productId === id ? response.data : p));
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this asset from database?")) return;
    try {
      await axiosInstance.delete(`/admin/products/${id}`);
      // ✅ Use productId to filter UI
      setProducts(prev => prev.filter(p => p.productId !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return { products, loading, handleAddProduct, handleUpdateProduct, handleDeleteProduct, fetchInventory };
};

export default useInventory;