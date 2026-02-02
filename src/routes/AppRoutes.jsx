import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/shared/layouts/MainLayout';

// ================= AUTH =================
import { LoginPage, RegisterPage, ForgotPassword, ResetPassword } from '@/modules/auth';

// ================= PUBLIC =================
import { HomePage, AboutPage, ContactPage } from '@/modules/home';

// ================= KYC =================
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';

// ================= SUPERVISOR =================
import SupervisorDashboardPage from '@/modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import { DisputesPage } from '@/modules/disputes';

// ================= WORKER =================
import WorkerDashboardPage from '@/modules/dashboard/worker/pages/WorkerDashboardPage';
import FindJobsPage from '@/modules/dashboard/worker/pages/FindJobsPage';
import MyApplicationsPage from '@/modules/dashboard/worker/pages/MyApplicationsPage';
import ActiveJobsPage from '@/modules/dashboard/worker/pages/ActiveJobsPage';
import WorkerProfilePage from '@/modules/dashboard/worker/pages/WorkerProfilePage';
import WorkerSkillsPage from '@/modules/dashboard/worker/pages/WorkerSkillsPage';
import WorkerJobHistoryPage from '@/modules/dashboard/worker/pages/WorkerJobHistoryPage';
import RaiseDisputePage from '@/modules/dashboard/worker/pages/RaiseDisputePage';
import WalletPage from '@/modules/dashboard/worker/pages/WalletPage';

// ================= ORGANIZATION =================
import OrganizationDashboard from '@/modules/dashboard/organization/pages/OrganizationDashboard';
import OrganizationProfile from '@/modules/dashboard/organization/pages/OrganizationProfile';
import OrganizationHome from '@/modules/dashboard/organization/pages/OrganizationHome';
import OrganizationPostJob from '@/modules/dashboard/organization/pages/PostJob';
import OrganizationApplications from '@/modules/dashboard/organization/pages/OrganizationApplications';
import OrganizationPayments from '@/modules/dashboard/organization/pages/OrganizationPayments';

// ================= CLIENT =================
import ClientDashboardPage from '@/modules/dashboard/client/pages/ClientDashboardPage';
import ClientProfile from '@/modules/dashboard/client/pages/ClientProfile';
import PostJob from '@/modules/dashboard/client/pages/PostJob';
import MyJobs from '@/modules/dashboard/client/pages/MyJobs';
import ClientApplications from '@/modules/dashboard/client/pages/ClientApplications';
import JobHistory from '@/modules/dashboard/client/pages/JobHistory';


// ================= CONTRACTS (SHARED) =================
import ContractsPage from '@/modules/contracts/pages/ContractsPage';
import CreateContractModal from '@/modules/contracts/components/CreateContractModal';

// ================= ADMIN =================
import UsersPage from '@/modules/admin/pages/UsersPage';
import MonitoringPage from '@/modules/admin/pages/MonitoringPage';
import InventoryPage from '@/modules/admin/pages/InventoryPage';
import PaymentsPage from '@/modules/admin/pages/PaymentsPage';
import SubscriptionsPage from '@/modules/admin/pages/SubscriptionsPage';
import SettingsPage from '@/modules/admin/pages/SettingsPage';

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PASSWORD RESET ================= */}
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= MAIN LAYOUT (NAVBAR + FOOTER) ================= */}
      <Route element={<MainLayout />}>

        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ---------- AUTH ---------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ---------- KYC ---------- */}
        <Route path="/kyc-pending" element={<KycPendingPage />} />

        {/* ---------- SUPERVISOR ---------- */}
        <Route path="/supervisor/dashboard" element={<SupervisorDashboardPage />} />
        <Route path="/supervisor/kyc-list" element={<KycListPage />} />
        <Route path="/supervisor/disputes" element={<DisputesPage />} />

        {/* ---------- WORKER ---------- */}
        <Route path="/worker/dashboard" element={<WorkerDashboardPage />} />
        <Route path="/worker/find-jobs" element={<FindJobsPage />} />
        <Route path="/worker/my-applications" element={<MyApplicationsPage />} />
        <Route path="/worker/active-jobs" element={<ActiveJobsPage />} />
        <Route path="/worker/contracts" element={<ContractsPage />} />
        <Route path="/worker/profile" element={<WorkerProfilePage />} />
        <Route path="/worker/skills" element={<WorkerSkillsPage />} />
        <Route path="/worker/history" element={<WorkerJobHistoryPage />} />
        <Route path="/worker/raise-dispute" element={<RaiseDisputePage />} />
        <Route path="/worker/wallet" element={<WalletPage />} />

        {/* ---------- ORGANIZATION ---------- */}
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
        <Route path="/organization/home" element={<OrganizationHome />} />
        <Route path="/organization/profile" element={<OrganizationProfile />} />
        <Route path="/organization/post-job" element={<OrganizationPostJob />} />
        <Route path="/organization/applications" element={<OrganizationApplications />} />
        <Route path="/organization/contracts" element={<ContractsPage />} />
        <Route path="/organization/contracts/create" element={<CreateContractModal />} />
        <Route path="/organization/payments" element={<OrganizationPayments />} />

        {/* ---------- CLIENT ---------- */}
        <Route path="/client/dashboard" element={<ClientDashboardPage />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/client/post-job" element={<PostJob />} />
        <Route path="/client/my-jobs" element={<MyJobs />} />
        <Route path="/client/applications" element={<ClientApplications />} />
        <Route path="/client/contracts" element={<ContractsPage />} />
        <Route path="/client/contracts/create" element={<CreateContractModal />} />
        <Route path="/client/job-history" element={<JobHistory />} />

        {/* ---------- ADMIN ---------- */}
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/monitoring" element={<MonitoringPage />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
        <Route path="/admin/payments" element={<PaymentsPage />} />
        <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/dashboard" element={<MonitoringPage />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
