import axios from 'axios';

// Base URL matches your Spring Boot Port
const API_URL = "http://localhost:8080/api/admin";

// Axios Instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

const AdminService = {
    
    // --- 1. USER MANAGEMENT ---
    getAllUsers: () => api.get('/users'),
    searchUsers: (query) => api.get(`/users?search=${query}`),
    updateUserStatus: (id, status) => api.patch(`/users/${id}/status?status=${status}`),
    updateUserRole: (id, role) => api.patch(`/users/${id}/role?role=${role}`),

    // --- 2. PLATFORM MONITORING ---
    getDashboardStats: () => api.get('/dashboard/stats'),
    getSystemLogs: () => api.get('/dashboard/logs'),

    // --- 3. INVENTORY (STORE) ---
    getProducts: () => api.get('/inventory/products'),
    addProduct: (product) => api.post('/inventory/products', product),
    updateProductStock: (id, stock) => api.patch(`/inventory/products/${id}/stock`, { stock }),
    deleteProduct: (id) => api.delete(`/inventory/products/${id}`),
    getOrders: () => api.get('/inventory/orders'),

    // --- 4. PAYMENTS & FINANCIALS ---
    getTransactions: () => api.get('/payments'),
    getFinancialStats: () => api.get('/payments/stats'),
    releaseEscrow: (id) => api.patch(`/payments/${id}/release`),

    // --- 5. SUBSCRIPTIONS ---
    getPlans: () => api.get('/subscriptions/plans'),
    createPlan: (plan) => api.post('/subscriptions/plans', plan),
    updatePlan: (id, plan) => api.patch(`/subscriptions/plans/${id}`, plan),
    getSubscribers: () => api.get('/subscriptions/subscribers'),

    // --- 6. SYSTEM CONFIGURATION ---
    getSettings: () => api.get('/config/settings'),
    updateSetting: (key, value) => api.patch(`/config/settings/${key}`, { value }),
    getAnnouncements: () => api.get('/config/announcements'),
    postAnnouncement: (announcement) => api.post('/config/announcements', announcement),
    deleteAnnouncement: (id) => api.delete(`/config/announcements/${id}`)
};

export default AdminService;