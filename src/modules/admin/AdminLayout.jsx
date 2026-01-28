import React from 'react';
import { Outlet } from 'react-router-dom';

// 👇 CHECK THIS LINE
import AdminNavbar from './components/AdminNavbar'; 
// If your file is in src/shared/components, change it to:
// import AdminNavbar from '../../shared/components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />
      <div className="flex-grow-1 p-0">
        <Outlet /> 
      </div>
      <footer className="bg-light text-center py-2 border-top small">
         Admin Panel © 2026 ShramikConnect
      </footer>
    </div>
  );
};

export default AdminLayout;