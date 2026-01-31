import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <>
      {/* We removed <AppNavbar /> from here because 
         MainLayout.jsx and AdminLayout.jsx already handle the navbars.
      */}
      <AppRoutes />
    </>
  );
};

export default App;
