import React from 'react'; // Ensure React is imported
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';
// You can remove 'Outlet' since you aren't using nested routing here

// 1. Add { children } here to accept the page component
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