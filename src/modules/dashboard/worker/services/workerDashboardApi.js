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
    
    getJobFeed: (district, category) => apiClient.get('/jobs/feed', { params: { district, category } }),
    
    applyToJob: (jobId) => apiClient.post(`/applications/apply/${jobId}`),
    
    getMyApplications: () => apiClient.get('/applications/my-status'), 
    
    // ✅ Fetches real data: Electrical (#1) and Plumbing (#2)
    getMyContracts: () => apiClient.get('/worker/contracts'),
    
    // ✅ Sums real escrow: ₹5,500 for your signed work
    getWalletStats: () => apiClient.get('/worker/wallet'),
    
    // ✅ FIXED: Removed extra "/worker" to match @RequestMapping("/api/worker")
    raiseDispute: (data) => apiClient.post('/worker/disputes/raise', data),
};