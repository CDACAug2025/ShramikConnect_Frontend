import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';

// --- FIXED IMPORTS (Using direct paths) ---
import HomePage from '../modules/home/pages/HomePage';
import AboutPage from '../modules/home/pages/AboutPage';
import ContactPage from '../modules/home/pages/ContactPage';

import LoginPage from '../modules/auth/pages/LoginPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import KycPendingPage from '../modules/auth/pages/KycPendingPage';

// --- Admin Imports ---
import UsersPage from '../modules/admin/pages/UsersPage';
import MonitoringPage from '../modules/admin/pages/MonitoringPage';
import InventoryPage from '../modules/admin/pages/InventoryPage';
import PaymentsPage from '../modules/admin/pages/PaymentsPage';
import SubscriptionsPage from '../modules/admin/pages/SubscriptionsPage';
import SettingsPage from '../modules/admin/pages/SettingsPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- Public & Main Routes --- */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        
        {/* --- Auth Routes --- */}
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />
        <Route path="/kyc-pending" element={<MainLayout><KycPendingPage /></MainLayout>} />

        {/* --- Admin Dashboard Routes --- */}
        <Route path="/admin/users" element={<MainLayout><UsersPage /></MainLayout>} />
        <Route path="/admin/monitoring" element={<MainLayout><MonitoringPage /></MainLayout>} />
        <Route path="/admin/inventory" element={<MainLayout><InventoryPage /></MainLayout>} />
        <Route path="/admin/payments" element={<MainLayout><PaymentsPage /></MainLayout>} />
        <Route path="/admin/subscriptions" element={<MainLayout><SubscriptionsPage /></MainLayout>} />
        <Route path="/admin/settings" element={<MainLayout><SettingsPage /></MainLayout>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;