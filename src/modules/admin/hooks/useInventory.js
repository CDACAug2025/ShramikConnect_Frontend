import { useState, useEffect } from 'react';

// ✅ STEP 1: Changed Port to 8080 (Default for Spring Boot)
const API_URL = "http://localhost:8080/products"; 
// Note: Verify if your backend controller path is "/products" or "/api/products"

const useInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. FETCH PRODUCTS ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch failed:", err);
      // alert("Could not connect to backend! Is Spring Boot running on port 8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 2. ADD PRODUCT (Strict - No Mocking) ---
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const savedProduct = await response.json();
      
      // Only update UI if DB save was successful
      setProducts(prev => [...prev, savedProduct]);
      alert("✅ Product Saved to Database!");
    } catch (err) {
      console.error("Add failed:", err);
      alert("❌ Failed to save! Check console for CORS or Server errors.");
    }
  };

  // --- 3. DELETE PRODUCT (Strict) ---
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }
      
      setProducts(prev => prev.filter(p => p.id !== id));
      alert("Item deleted from Database.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Delete failed! Check backend connection.");
    }
  };

  // --- 4. UPDATE PRODUCT (Strict) ---
  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
      }

      const savedProduct = await response.json();
      
      setProducts(prev => prev.map(p => p.id === id ? savedProduct : p));
      alert("✅ Product Updated in Database!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Update failed! Check backend connection.");
    }
  };

  return { products, loading, handleDeleteProduct, handleAddProduct, handleUpdateProduct };
};

export default useInventory;