import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';
import WorkerLayout from '../shared/layouts/WorkerLayout';

// Auth
import { LoginPage, RegisterPage } from '@/modules/auth';

// Public
import { HomePage, AboutPage, ContactPage } from '@/modules/home';

// KYC
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';

// Supervisor
import SupervisorDashboardPage from '../modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import { DisputesPage } from '../modules/disputes';

// ✅ Worker Dashboard & Sub-Page Imports
import WorkerDashboardPage from '../modules/dashboard/worker/pages/WorkerDashboardPage';
import FindJobsPage from '../modules/dashboard/worker/pages/FindJobsPage';
import MyApplicationsPage from '../modules/dashboard/worker/pages/MyApplicationsPage';
import WorkerProfilePage from '../modules/dashboard/worker/pages/WorkerProfilePage';
import WorkerSkillsPage from '../modules/dashboard/worker/pages/WorkerSkillsPage';
import RaiseDisputePage from '../modules/dashboard/worker/pages/RaiseDisputePage';
import WalletPage from '../modules/dashboard/worker/pages/WalletPage';
import WorkerJobHistoryPage from '../modules/dashboard/worker/pages/WorkerJobHistoryPage';
import ActiveJobsPage from '../modules/dashboard/worker/pages/ActiveJobsPage';

// Organization
import OrganizationDashboard from '../modules/dashboard/organization/pages/OrganizationDashboard';
import OrganizationProfile from '../modules/dashboard/organization/pages/OrganizationProfile';
import OrganizationHome from '../modules/dashboard/organization/pages/OrganizationHome';
import OrganizationPostJob from '../modules/dashboard/organization/pages/PostJob';

// Client
import ClientDashboardPage from '../modules/dashboard/client/pages/ClientDashboardPage';
import ClientProfile from '../modules/dashboard/client/pages/ClientProfile';
import PostJob from '../modules/dashboard/client/pages/PostJob';
import MyJobs from '../modules/dashboard/client/pages/MyJobs';
import WorkerApplications from '../modules/dashboard/client/pages/WorkerApplications';

// Admin
import UsersPage from '../modules/admin/pages/UsersPage';
import MonitoringPage from '../modules/admin/pages/MonitoringPage';
import InventoryPage from '../modules/admin/pages/InventoryPage';
import PaymentsPage from '../modules/admin/pages/PaymentsPage';
import SubscriptionsPage from '../modules/admin/pages/SubscriptionsPage';
import SettingsPage from '../modules/admin/pages/SettingsPage';

const AppRoutes = () => {
  return (
    // ✅ CORRECT: Only <Routes> here. NO <BrowserRouter>.
    <Routes>

      {/* -------------------------------------------------------------------
          GROUP 1: Public & User Pages (Uses MainLayout with Public Navbar) 
         ------------------------------------------------------------------- */}


      <Route element={<WorkerLayout />}>
          <Route path="/worker/dashboard" element={<WorkerDashboardPage />} />
          
          {/* Module 1: Profile & KYC */}
          <Route path="/worker/profile" element={<WorkerProfilePage />} /> 
          <Route path="/worker/skills" element={<WorkerSkillsPage />} />
          
          {/* Module 2: Job Discovery */}
          <Route path="/worker/find-jobs" element={<FindJobsPage />} />
          <Route path="/worker/my-applications" element={<MyApplicationsPage />} />
          
          {/* ✅ Module 3: Active Jobs & History */}
          {/* Updated this route to point to ActiveJobsPage instead of WorkerDashboardPage */}
          <Route path="/worker/active-jobs" element={<ActiveJobsPage />} />
          <Route path="/worker/history" element={<WorkerJobHistoryPage />} />
          
          {/* ✅ Module 5 & 6: Wallet and Disputes */}
          <Route path="/worker/raise-dispute" element={<RaiseDisputePage />} />
          <Route path="/worker/wallet" element={<WalletPage />} />
        </Route>
      <Route element={<MainLayout />}>
        
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* User Flows */}
        <Route path="/kyc-pending" element={<KycPendingPage />} />

        {/* Supervisor */}
        <Route path="/supervisor/dashboard" element={<SupervisorDashboardPage />} />
        <Route path="/supervisor/kyc-list" element={<KycListPage />} />
        <Route path="/supervisor/disputes" element={<DisputesPage />} />

        {/* Organization */}
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
        <Route path="/organization/home" element={<OrganizationHome />} />
        <Route path="/organization/profile" element={<OrganizationProfile />} />
        <Route path="/organization/post-job" element={<OrganizationPostJob />} />

        {/* Client */}
        <Route path="/client/dashboard" element={<ClientDashboardPage />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/client/post-job" element={<PostJob />} />
        <Route path="/client/my-jobs" element={<MyJobs />} />
        <Route path="/client/applications" element={<WorkerApplications />} />
      </Route>


      {/* -------------------------------------------------------------------
          GROUP 2: Admin Pages (Standalone - They have their own Layout)
          We DO NOT wrap these in MainLayout to avoid double navbars.
         ------------------------------------------------------------------- */}
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/monitoring" element={<MonitoringPage />} />
      <Route path="/admin/inventory" element={<InventoryPage />} />
      <Route path="/admin/payments" element={<PaymentsPage />} />
      <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />

      {/* Default Redirect for Admin Root */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      {/* Route for /admin/dashboard mapped to Monitoring or a dedicated page */}
      <Route path="/admin/dashboard" element={<MonitoringPage />} />

    </Routes>
  );
};

export default AppRoutes;