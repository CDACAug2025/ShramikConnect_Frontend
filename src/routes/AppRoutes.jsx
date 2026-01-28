import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../shared/layouts/MainLayout';
import AdminLayout from '../modules/admin/AdminLayout'; // Ensure this file exists!

// Public Pages
import { LoginPage, RegisterPage } from '@/modules/auth';
import { HomePage, AboutPage, ContactPage } from '@/modules/home';

// Supervisor Pages
import SupervisorDashboardPage from '../modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import { DisputesPage } from '../modules/disputes';

// Admin Pages
import UsersPage from '../modules/admin/pages/UsersPage';
import MonitoringPage from '../modules/admin/pages/MonitoringPage';
import InventoryPage from '../modules/admin/pages/InventoryPage';
import PaymentsPage from '../modules/admin/pages/PaymentsPage';
import SubscriptionsPage from '../modules/admin/pages/SubscriptionsPage';
import SettingsPage from '../modules/admin/pages/SettingsPage';
import AdminDashboardPage from '../modules/admin/pages/AdminDashboardPage'; // You need this

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC & SUPERVISOR (Main Layout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Supervisor Routes */}
        <Route path="/supervisor/dashboard" element={<SupervisorDashboardPage />} />
        <Route path="/supervisor/kyc-list" element={<KycListPage />} />
        <Route path="/supervisor/disputes" element={<DisputesPage />} />
        <Route path="/kyc-pending" element={<KycPendingPage />} />
      </Route>

      {/* ADMIN PANEL (Admin Layout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="monitoring" element={<MonitoringPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;