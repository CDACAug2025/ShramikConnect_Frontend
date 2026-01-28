import { useState, useEffect } from 'react';
import AdminService from '../../../services/AdminService';

const useInventory = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            // Note: If you don't have getOrders backend yet, comment that line out
            const [prodRes] = await Promise.all([
                AdminService.getProducts()
            ]);
            setProducts(prodRes.data);
            // setOrders(orderRes.data); 
        } catch (err) { 
            console.error("Error loading data:", err); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const res = await AdminService.addProduct(newProduct);
            setProducts(prev => [...prev, res.data]); 
            alert("Product added successfully!");
        } catch (err) { console.error(err); alert("Failed to add product"); }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await AdminService.deleteProduct(id);
            setProducts(prev => prev.filter(p => (p.id || p.productId || p._id) !== id));
        } catch (err) { console.error(err); alert("Delete failed"); }
    };

    const handleUpdateStock = async (id, newStock) => {
        try {
            await AdminService.updateProductStock(id, newStock);
            setProducts(prev => prev.map(p => (p.id || p.productId || p._id) === id ? { ...p, stock: newStock } : p));
        } catch (err) { console.error(err); alert("Update failed"); }
    };

    const handleUpdateProduct = async (id, updatedData) => {
        try {
            await AdminService.updateProduct(id, updatedData);
            setProducts(prev => prev.map(p => (p.id || p.productId || p._id) === id ? { ...p, ...updatedData } : p));
            alert("Product updated!");
        } catch (err) { console.error(err); alert("Update failed"); }
    };

    return { products, orders, loading, handleAddProduct, handleDeleteProduct, handleUpdateStock, handleUpdateProduct };
};

export default useInventory;