import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';
import { LoginPage, RegisterPage} from '@/modules/auth';
import { HomePage, AboutPage, ContactPage } from '@/modules/home';
import SupervisorDashboardPage from '../modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import { DisputesPage } from '../modules/disputes'; 


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
  );
};

export default AppRoutes;