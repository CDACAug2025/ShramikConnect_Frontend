import { useEffect, useState } from 'react';
import AdminService from '../../../services/adminService';

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getAllUsers();
      setUsers(res.data);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (userId, status) => {
    await AdminService.updateUserStatus(userId, status);
    setUsers(prev =>
      prev.map(u =>
        u.userId === userId ? { ...u, status } : u
      )
    );
  };

  const updateUserRole = async (userId, roleId) => {
    await AdminService.updateUserRole(userId, roleId);
    setUsers(prev =>
      prev.map(u =>
        u.userId === userId
          ? { ...u, role: { ...u.role, roleId } }
          : u
      )
    );
  };

  return {
    users,
    loading,
    error,
    updateUserStatus,
    updateUserRole,
  };
};

export default useUserManagement;
