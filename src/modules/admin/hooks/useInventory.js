import { useState, useEffect } from 'react';
import { fetchProducts, fetchOrders, addProduct, deleteProduct, updateProduct } from '../services/inventoryApi';

const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // New State for Orders
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodData, orderData] = await Promise.all([
        fetchProducts(),
        fetchOrders()
      ]);
      setProducts(prodData);
      setOrders(orderData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    // Simulate Image Upload (use placeholder if no image)
    const productWithImage = { 
      ...newProduct, 
      image: "https://via.placeholder.com/40" 
    };
    
    const res = await addProduct(productWithImage);
    setProducts([...products, { ...productWithImage, id: res.id }]);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Remove this item?")) return;
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateStock = async (id, newStock) => {
    await updateProduct(id, { stock: newStock });
    setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  return { products, orders, loading, handleAddProduct, handleDeleteProduct, handleUpdateStock };
};

export default useInventory;