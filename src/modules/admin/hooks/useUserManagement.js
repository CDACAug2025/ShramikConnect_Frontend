import { useState, useEffect } from 'react';
import AdminService from '../../../services/AdminService';

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AdminService.getAllUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  // ✅ FIX: Update local state immediately after API success
  const updateUserStatus = async (id, newStatus) => {
    try {
      await AdminService.updateUserStatus(id, newStatus);
      
      // Instantly update the UI without refreshing
      setUsers(prevUsers => prevUsers.map(user => 
        // Handle id, userId, or _id
        (user.id || user.userId || user._id) === id ? { ...user, status: newStatus } : user
      ));
      
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  // ✅ FIX: Update local state for Roles too
  const updateUserRole = async (id, newRole) => {
    try {
      await AdminService.updateUserRole(id, newRole);
      
      setUsers(prevUsers => prevUsers.map(user => 
        (user.id || user.userId || user._id) === id ? { ...user, role: newRole } : user
      ));
      
    } catch (err) {
      alert("Failed to update role");
      console.error(err);
    }
  };

  return { users, loading, error, updateUserStatus, updateUserRole };
};

export default useUserManagement;