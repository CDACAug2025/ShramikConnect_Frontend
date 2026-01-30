// src/modules/dashboard/worker/services/workerDashboardApi.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const workerApi = {
    getProfile: () => apiClient.get('/worker/profile'),
    getDashboardStats: () => apiClient.get('/worker/dashboard-stats'),
    getJobFeed: (district) => apiClient.get('/jobs/feed', { params: { district } }),
    applyToJob: (jobId) => apiClient.post(`/applications/apply/${jobId}`),
    getMyApplications: () => apiClient.get('/applications/my-status'), 
    getActiveJobs: () => apiClient.get('/worker/active-jobs'),
    
    // ✅ ADD THIS MISSING METHOD TO FIX THE ERROR
    getHistory: () => apiClient.get('/worker/history'),
    
    getMyContracts: () => apiClient.get('/worker/contracts'),
    getWalletStats: () => apiClient.get('/worker/wallet'),
};