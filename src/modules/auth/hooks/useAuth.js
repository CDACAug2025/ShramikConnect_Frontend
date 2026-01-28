import { useState } from 'react';
import { loginApi } from '../services/authApi';
import { saveToken, clearToken } from '@/shared/utils/tokenUtils';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginApi(credentials);
      saveToken(response.token);
      
      // Store user data in localStorage
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userName', response.fullName);
      
      console.log('Stored role:', response.role); // Debug log

      if (response.kycStatus === 'PENDING') {
        window.location.href = '/kyc-pending';
        return;
      }
      switch (response.role) {
        case 'WORKER':
          window.location.href = '/dashboard/worker';
          break;
        case 'CLIENT':
          window.location.href = '/client/dashboard';
          break;
        case 'ORGANIZATION':
          window.location.href = '/organization/home';
          break;
        case 'SUPERVISOR':
          window.location.href = '/dashboard/supervisor';
          break;
        default:
          window.location.href = '/';
      }
    } catch (err) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    clearToken();
    window.location.href = '/login';
  };

  return { login, logout, loading };
};
