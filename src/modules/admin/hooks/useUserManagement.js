import { useState, useEffect, useMemo } from 'react';
import { fetchAllUsers, updateUserStatus, updateUserRole } from '../services/userApi';

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW: Search & Filter State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

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
    await updateUserStatus(id, newStatus);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const handleRoleChange = async (id, newRole) => {
    await updateUserRole(id, newRole);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  // --- NEW: Filtering Logic ---
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // 1. Search (Name, Email, or Phone - assuming phone exists)
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Role Filter
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;

      // 3. Status Filter
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  return { 
    users: filteredUsers, // Return filtered list instead of raw list
    loading, 
    error, 
    handleStatusChange, 
    handleRoleChange,
    // Export setters for UI
    searchQuery, setSearchQuery,
    roleFilter, setRoleFilter,
    statusFilter, setStatusFilter
  };
};

export default useUserManagement;