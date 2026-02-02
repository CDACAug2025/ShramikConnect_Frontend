// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAuth } from '@/shared/utils/authUtils';

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = getAuth(); // This 'role' comes from localStorage.getItem('userRole')
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verify the role against the allowed list
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;