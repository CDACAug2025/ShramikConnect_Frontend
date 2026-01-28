import axios from 'axios';
import { getToken } from '../shared/utils/tokenUtils'; 

const API_URL = "http://localhost:8080/api/admin";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Helper for File Uploads
const createFormData = (data, file) => {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (file) formData.append('image', file);
    return formData;
};

const AdminService = {
    // --- DASHBOARD & LOGS ---
    getDashboardStats: () => api.get('/dashboard/stats'),
    // ✅ NEW: Added missing function
    getSystemLogs: () => api.get('/system-logs'),

    // --- USER MANAGEMENT ---
    getAllUsers: () => api.get('/users'),
    updateUserStatus: (id, status) => api.put(`/users/${id}/status?status=${status}`),
    
    // --- INVENTORY ---
    getProducts: () => api.get('/inventory/products'),
    addProduct: (product, image) => api.post('/inventory/products', createFormData(product, image), { headers: { 'Content-Type': 'multipart/form-data' }}),
    updateProduct: (id, product, image) => api.put(`/inventory/products/${id}`, createFormData(product, image), { headers: { 'Content-Type': 'multipart/form-data' }}),
    deleteProduct: (id) => api.delete(`/inventory/products/${id}`),
    updateProductStock: (id, stock) => api.patch(`/inventory/products/${id}/stock?stock=${stock}`),
};

export default AdminService;