// shared/utils/authUtils.js
import { getToken } from './tokenUtils';

export const getAuth = () => ({
  token: getToken(),
  role: localStorage.getItem('userRole'),
  name: localStorage.getItem('userName'),
  userId: localStorage.getItem('userId'),
});

export const clearAuth = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
};
