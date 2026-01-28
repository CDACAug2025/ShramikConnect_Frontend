import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/authApi';
import { saveToken, clearToken } from '@/shared/utils/tokenUtils';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      setLoading(true);
      // const response = await loginApi(credentials);
      // saveToken(response.token);
      
      // // Store user data in localStorage
      // localStorage.setItem('userRole', response.role);
      // localStorage.setItem('userId', response.userId);
      // localStorage.setItem('userName', response.fullName);
      
      // console.log('Stored role:', response.role); // Debug log

      const data = await loginApi(credentials);
       

      saveToken(data.token);

      // status check
      if (data.accountStatus !== 'ACTIVE'){navigate('/kyc-pending'); return;};


      // // 🚦 KYC CHECK
      // if (data.kycStatus === 'PENDING') {
      //   navigate('/kyc-pending');
      //   return;
      // }

      // 🚦 ROLE-BASED REDIRECT
      console.log('User Role:', data.role);
      switch (data.role) {
        case 'WORKER':
          navigate('/dashboard/worker');
          break;
        case 'CLIENT':
          navigate('/dashboard/client');
          break;
        case 'ORGANIZATION':
          navigate('/dashboard/organization');
        //   window.location.href = '/client/dashboard';
        //   break;
        // case 'ORGANIZATION':
        //   window.location.href = '/organization/home';
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
    navigate('/login');
  };

  return { login, logout, loading };
};
