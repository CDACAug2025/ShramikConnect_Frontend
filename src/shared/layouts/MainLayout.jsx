import React from 'react'; 
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';



const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />

      <main className="flex-fill">
        {/* 2. Render {children} instead of <Outlet /> */}
        {children}
      </main>

      <AppFooter />
    </div>
  );
};

export default MainLayout;