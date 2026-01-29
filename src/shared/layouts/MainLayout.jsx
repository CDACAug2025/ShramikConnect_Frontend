import React from 'react'; 
<<<<<<< HEAD
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';



const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />

      <main className="flex-fill">
        {/* 2. Render {children} instead of <Outlet /> */}
        {children}
=======
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
>>>>>>> main
      </main>

      <AppFooter />
    </div>
  );
};

export default MainLayout;