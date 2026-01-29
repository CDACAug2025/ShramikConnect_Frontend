import axiosInstance from './axiosInstance';

const AdminService = {

  // --- USER MANAGEMENT ---
  getAllUsers: (params = {}) => 
    axiosInstance.get('/admin/users', { params }),

  updateUserStatus: (userId, status) =>
    axiosInstance.patch(`/admin/users/${userId}/status`, null, {
        params: { status }
    }),

  updateUserRole: (userId, roleId) =>
    axiosInstance.patch(`/admin/users/${userId}/role`, null, {
        params: { roleId }
    }),

  // --- DASHBOARD ---
  getDashboardStats: () =>
    axiosInstance.get('/admin/dashboard/stats'),

  // ✅ UPDATED URL to match your Controller
  getSystemLogs: () => 
    axiosInstance.get('/admin/dashboard/logs'), 
};

export default AdminService;