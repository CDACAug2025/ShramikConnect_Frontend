import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar'; // ✅ Use the centralized navbar

const WorkerLayout = () => {
  return (
    <>
      <AppNavbar /> 
      <div className="container-fluid py-4">
        {/* ✅ This renders Ajay's Dashboard, Wallet, etc. */}
        <Outlet /> 
      </div>
    </>
  );
};

export default WorkerLayout;