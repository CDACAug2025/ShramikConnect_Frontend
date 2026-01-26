import { useState, useEffect } from 'react';
import AdminService from '../../../services/adminService';

const useUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await AdminService.getAllUsers();
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch users.");
            setLoading(false);
        }
    };

    // Block or Activate a User
    const updateUserStatus = async (id, status) => {
        try {
            await AdminService.updateUserStatus(id, status);
            // Optimistic Update (Update UI instantly without refreshing)
            setUsers(users.map(user => 
                user.id === id ? { ...user, status: status } : user
            ));
            return { success: true };
        } catch (err) {
            alert("Failed to update status");
            return { success: false };
        }
    };

    return { users, loading, error, fetchUsers, updateUserStatus };
};

export default useUserManagement;