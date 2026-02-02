import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // ✅ Fixed relative import

// Layouts
import MainLayout from "../shared/layouts/MainLayout";
import WorkerLayout from "../shared/layouts/WorkerLayout";
import ClientLayout from "../shared/layouts/ClientLayout";

// Auth & Public
import { LoginPage, RegisterPage } from "@/modules/auth";
import ForgotPassword from '@/modules/auth/pages/ForgotPassword';
import ResetPassword from '@/modules/auth/pages/ResetPassword';
import { HomePage, AboutPage, ContactPage } from "@/modules/home";

import ContractsPage from '@/modules/contracts/pages/ContractsPage';
import CreateContractModal from '@/modules/contracts/components/CreateContractModal';

// Module Imports
import KycPendingPage from "@/modules/kyc/pages/KycPendingPage";
import KycListPage from "@/modules/kyc/pages/KycListPage";
import SupervisorDashboardPage from "../modules/dashboard/supervisor/pages/SupervisorDashboardPage";
import { DisputesPage } from "../modules/disputes";
import WorkerDashboardPage from "../modules/dashboard/worker/pages/WorkerDashboardPage";
import FindJobsPage from "../modules/dashboard/worker/pages/FindJobsPage";
import MyApplicationsPage from "../modules/dashboard/worker/pages/MyApplicationsPage";
import WorkerProfilePage from "../modules/dashboard/worker/pages/WorkerProfilePage";
import WorkerSkillsPage from "../modules/dashboard/worker/pages/WorkerSkillsPage";
import RaiseDisputePage from "../modules/dashboard/worker/pages/RaiseDisputePage";
import WalletPage from "../modules/dashboard/worker/pages/WalletPage";
import WorkerJobHistoryPage from "../modules/dashboard/worker/pages/WorkerJobHistoryPage";
import ActiveJobsPage from "../modules/dashboard/worker/pages/ActiveJobsPage";
import OrganizationDashboard from "../modules/dashboard/organization/pages/OrganizationDashboard";
import OrganizationProfile from "../modules/dashboard/organization/pages/OrganizationProfile";
import OrganizationHome from "../modules/dashboard/organization/pages/OrganizationHome";
import OrganizationPostJob from "../modules/dashboard/organization/pages/PostJob";
import OrganizationApplications from "../modules/dashboard/organization/pages/OrganizationApplications";
import ContractWelcome from "../modules/dashboard/organization/pages/ContractWelcome";
import OrganizationPayments from "../modules/dashboard/organization/pages/OrganizationPayments";
import ClientDashboardPage from "../modules/dashboard/client/pages/ClientDashboardPage";
import ClientProfile from "../modules/dashboard/client/pages/ClientProfile";
import PostJob from "../modules/dashboard/client/pages/PostJob";
import MyJobs from "../modules/dashboard/client/pages/MyJobs";
// import WorkerApplications from "../modules/dashboard/client/pages/WorkerApplications";
// import ClientContracts from "../modules/dashboard/client/pages/ClientContracts";
// import CreateClientContract from "../modules/dashboard/client/pages/CreateClientContract";
import ClientApplications from "../modules/dashboard/client/pages/ClientApplications";
import JobHistory from "../modules/dashboard/client/pages/JobHistory";
import UsersPage from "../modules/admin/pages/UsersPage";
import MonitoringPage from "../modules/admin/pages/MonitoringPage";
import InventoryPage from "../modules/admin/pages/InventoryPage";
import PaymentsPage from "../modules/admin/pages/PaymentsPage";
import SubscriptionsPage from "../modules/admin/pages/SubscriptionsPage";
import SettingsPage from "../modules/admin/pages/SettingsPage";
import WorkerStorePage from "../modules/dashboard/worker/pages/WorkerStorePage";
import WorkerOrdersPage from "../modules/dashboard/worker/pages/WorkerOrdersPage";
import AdminOrdersPage from "../modules/admin/pages/AdminOrdersPage";
import CheckoutPage from "../modules/dashboard/worker/pages/CheckoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🟢 PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* 👷 WORKER PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['WORKER']} />}>
        <Route element={<WorkerLayout />}>
          <Route path="/worker/dashboard" element={<WorkerDashboardPage />} />
          <Route path="/worker/profile" element={<WorkerProfilePage />} />
          <Route path="/worker/skills" element={<WorkerSkillsPage />} />
          <Route path="/worker/find-jobs" element={<FindJobsPage />} />
          <Route path="/worker/my-applications" element={<MyApplicationsPage />} />
          <Route path="/worker/active-jobs" element={<ActiveJobsPage />} />
          <Route path="/worker/contracts" element={<ContractsPage />} />
          <Route path="/worker/history" element={<WorkerJobHistoryPage />} />
          <Route path="/worker/raise-dispute" element={<RaiseDisputePage />} />
          <Route path="/worker/wallet" element={<WalletPage />} />
          <Route path="/kyc-pending" element={<KycPendingPage />} />
          <Route path="/worker/store" element={<WorkerStorePage />} />
          <Route path="/worker/my-orders" element={<WorkerOrdersPage />} />
          <Route path="/worker/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      {/* 🤝 CLIENT PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT']} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboardPage />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/post-job" element={<PostJob />} />
          <Route path="/client/my-jobs" element={<MyJobs />} />
          <Route path="/client/applications" element={<ClientApplications />} />
          <Route path="/client/contracts" element={<ContractsPage />} />
          <Route path="/client/contracts/create" element={<CreateContractModal />} />
          <Route path="/client/job-history" element={<JobHistory />} />
        </Route>
      </Route>

      {/* 🏢 ORGANIZATION PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['ORGANIZATION']} />}>
        <Route element={<MainLayout />}>
          <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
          <Route path="/organization/home" element={<OrganizationHome />} />
          <Route path="/organization/profile" element={<OrganizationProfile />} />
          <Route path="/organization/post-job" element={<OrganizationPostJob />} />
          <Route path="/organization/applications" element={<OrganizationApplications />} />
          <Route path="/organization/contracts" element={<ContractsPage />} />
          <Route path="/organization/contracts/create" element={<CreateContractModal />} />
          <Route path="/organization/payments" element={<OrganizationPayments />} />
          <Route path="/organization/contract/:applicationId" element={<ContractWelcome />} />
        </Route>
      </Route>

      {/* 👨‍✈️ SUPERVISOR PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['SUPERVISOR']} />}>
        <Route element={<MainLayout />}>
          <Route path="/supervisor/dashboard" element={<SupervisorDashboardPage />} />
          <Route path="/supervisor/kyc-list" element={<KycListPage />} />
          <Route path="/supervisor/disputes" element={<DisputesPage />} />
        </Route>
      </Route>

      {/* 🛡️ ADMIN PROTECTED ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<MonitoringPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/inventory" element={<InventoryPage />} />
          <Route path="/admin/payments" element={<PaymentsPage />} />
          <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Route>
      </Route>

      {/* 🚀 FALLBACKS */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;