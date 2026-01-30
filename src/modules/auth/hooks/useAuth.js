// hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/authApi';
import { saveToken, clearToken } from '@/shared/utils/tokenUtils';
import { clearAuth } from '@/shared/utils/authUtils';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      setLoading(true);

      const data = await loginApi(credentials);
      
      // ✅ Log the incoming role to debug redirects
      console.log("Login Successful. Role detected:", data.role);

      // 🔐 SAVE TOKEN
      saveToken(data.token);

      // 👤 SAVE USER DATA (CRITICAL)
      localStorage.setItem('token', data.token); // Ensure token is accessible for workerDashboardApi
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.fullName || '');
      localStorage.setItem('userId', data.userId);

      // 🚦 ACCOUNT STATUS CHECK
      if (data.accountStatus !== 'ACTIVE') {
        navigate('/kyc-pending');
        return;
      }

      // 🚀 ROLE BASED REDIRECT
      // Make sure these strings ('WORKER', 'ORGANIZATION') match your Database EXACTLY
      switch (data.role) {
        case 'WORKER':
          navigate('/worker/dashboard'); // ✅ standalone route
          break;
        case 'CLIENT':
          navigate('/client/dashboard');
          break;
        case 'ORGANIZATION':
          navigate('/organization/dashboard');
          break;
        case 'SUPERVISOR':
          navigate('/supervisor/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/users');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert('Invalid credentials or Server Error');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearToken();
    clearAuth();
    localStorage.clear(); // Ensure all worker data is wiped on logout
    navigate('/login');
  };

  return { login, logout, loading };
};