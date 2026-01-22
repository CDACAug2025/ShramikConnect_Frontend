import { useState, useEffect } from 'react';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from '../services/inventoryApi';

const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await addProduct(newProduct);
      setProducts([...products, { ...newProduct, id: res.id, status: newProduct.stock > 0 ? "In Stock" : "Out of Stock" }]);
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    try {
      await updateProduct(id, { stock: newStock });
      setProducts(products.map(p => 
        p.id === id ? { ...p, stock: newStock, status: newStock > 0 ? "In Stock" : "Out of Stock" } : p
      ));
    } catch (err) {
      console.error("Update failed");
    }
  };

  return { products, loading, error, handleAddProduct, handleDeleteProduct, handleUpdateStock };
};

export default useInventory;