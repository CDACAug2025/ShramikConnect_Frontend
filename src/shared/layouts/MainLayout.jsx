import React from 'react'; 
import AppNavbar from '../components/AppNavbar';
import ClientNavbar from '../../modules/dashboard/client/components/ClientNavbar';
import AppFooter from '../components/AppFooter';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const isClientRoute = location.pathname.startsWith('/client');




const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {isClientRoute ? <ClientNavbar /> : <AppNavbar />}

      <main className="flex-fill">
        {/* 2. Render {children} instead of <Outlet /> */}
        {children}
      </main>

      <AppFooter />
    </div>
  );
};

export default MainLayout;