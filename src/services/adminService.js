import axiosInstance from './axiosInstance';

const AdminService = {

  // --- USER MANAGEMENT ---
  getAllUsers: (params = {}) =>
    axiosInstance.get('/admin/users', { params }),

  searchUsers: (query) =>
    axiosInstance.get('/admin/users', {
      params: { search: query }
    }),

  updateUserStatus: (userId, status) =>
    axiosInstance.patch(`/admin/users/${userId}/status?status=${status}`),

  updateUserRole: (userId, roleId) =>
    axiosInstance.patch(`/admin/users/${userId}/role?roleId=${roleId}`),

  // --- DASHBOARD ---
  getDashboardStats: () =>
    axiosInstance.get('/admin/dashboard/stats'),
};

export default AdminService;
