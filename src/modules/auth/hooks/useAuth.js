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

      // 🔐 SAVE TOKEN
      saveToken(data.token);

      // 👤 SAVE USER DATA (CRITICAL)
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.fullName || '');
      localStorage.setItem('userId', data.userId);

      // 🚦 ACCOUNT STATUS CHECK
      if (data.accountStatus !== 'ACTIVE') {
        navigate('/kyc-pending');
        return;
      }

      // 🚀 ROLE BASED REDIRECT
      switch (data.role) {
        case 'WORKER':
          navigate('/worker/dashboard');
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
        default:
          navigate('/');
      }
    } catch (err) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearToken();
    clearAuth();
    navigate('/login');
  };

  return { login, logout, loading };
};
