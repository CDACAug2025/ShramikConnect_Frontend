import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';
import { LoginPage, RegisterPage} from '@/modules/auth';
import { HomePage, AboutPage, ContactPage } from '@/modules/home';
import SupervisorDashboardPage from '../modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import { DisputesPage } from '../modules/disputes'; 


// --- Admin Imports ---
=======
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
>>>>>>> main
import UsersPage from '../modules/admin/pages/UsersPage';
import MonitoringPage from '../modules/admin/pages/MonitoringPage';
import InventoryPage from '../modules/admin/pages/InventoryPage';
import PaymentsPage from '../modules/admin/pages/PaymentsPage';
import SubscriptionsPage from '../modules/admin/pages/SubscriptionsPage';
import SettingsPage from '../modules/admin/pages/SettingsPage';
<<<<<<< HEAD

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
  

        {/* --- Admin Dashboard Routes --- */}
        <Route path="/admin/users" element={<MainLayout><UsersPage /></MainLayout>} />
        <Route path="/admin/monitoring" element={<MainLayout><MonitoringPage /></MainLayout>} />
        <Route path="/admin/inventory" element={<MainLayout><InventoryPage /></MainLayout>} />
        <Route path="/admin/payments" element={<MainLayout><PaymentsPage /></MainLayout>} />
        <Route path="/admin/subscriptions" element={<MainLayout><SubscriptionsPage /></MainLayout>} />
        <Route path="/admin/settings" element={<MainLayout><SettingsPage /></MainLayout>} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/kyc-pending" element={<KycPendingPage />} />
          <Route path="/supervisor/dashboard" element={<SupervisorDashboardPage />} />
          <Route path="/supervisor/kyc-list" element={<KycListPage />} />
          <Route path='/supervisor/disputes' element={<DisputesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
=======
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
>>>>>>> main
  );
};

export default AppRoutes;