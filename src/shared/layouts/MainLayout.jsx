import React from 'react'; 
import { Outlet } from 'react-router-dom'; // 👈 1. Import Outlet
//import AppNavbar from '../components/AppNavbar'; // Or PublicNavbar (see step 2)
import AppFooter from '../components/AppFooter';
import PublicNavbar from '../components/PublicNavbar.jsx';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
    
     <PublicNavbar />

      <main className="flex-fill">
        {/* 👇 2. REPLACE {children} WITH <Outlet /> */}
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
};

export default MainLayout;