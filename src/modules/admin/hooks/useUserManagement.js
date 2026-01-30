import { useEffect, useState } from 'react';

// ✅ TRY THIS PATH (Goes up 3 levels to 'src/services')
import AdminService from '../../../services/adminService'; 

// IF the above fails, try with Capital 'A':
// import AdminService from '../../../services/AdminService';

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;

    try {
      await AdminService.updateUserStatus(userId, newStatus);
      setUsers(prev => prev.map(u => u.userId === userId ? { ...u, status: newStatus } : u));
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  return {
    users,
    loading,
    error,
    handleToggleStatus,
    refetch: fetchUsers
  };
};

export default useUserManagement;