import { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserStatus, updateUserRole } from '../services/userApi';

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateUserStatus(id, newStatus);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      ));
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      alert('Error updating role');
    }
  };

  return { users, loading, error, handleStatusChange, handleRoleChange };
};

export default useUserManagement;