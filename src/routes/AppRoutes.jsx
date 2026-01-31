import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';

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

// Organization
import OrganizationDashboard from '../modules/dashboard/organization/pages/OrganizationDashboard';
import OrganizationProfile from '../modules/dashboard/organization/pages/OrganizationProfile';
import OrganizationHome from '../modules/dashboard/organization/pages/OrganizationHome';
import OrganizationPostJob from '../modules/dashboard/organization/pages/PostJob';
import OrganizationApplications from '../modules/dashboard/organization/pages/OrganizationApplications';
import ContractWelcome from '../modules/dashboard/organization/pages/ContractWelcome';

// Client
import ClientDashboardPage from '../modules/dashboard/client/pages/ClientDashboardPage';
import ClientProfile from '../modules/dashboard/client/pages/ClientProfile';
import PostJob from '../modules/dashboard/client/pages/PostJob';
import MyJobs from '../modules/dashboard/client/pages/MyJobs';
import WorkerApplications from '../modules/dashboard/client/pages/WorkerApplications';

// Admin
import UsersPage from '../modules/admin/pages/UsersPage';
import MonitoringPage from '../modules/admin/pages/MonitoringPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/kyc-pending" element={<KycPendingPage />} />

          {/* Supervisor */}
          <Route
            path="/supervisor/dashboard"
            element={<SupervisorDashboardPage />}
          />
          <Route path="/supervisor/kyc-list" element={<KycListPage />} />
          <Route path="/supervisor/disputes" element={<DisputesPage />} />

          {/* Organization */}
          <Route
            path="/organization/dashboard"
            element={<OrganizationDashboard />}
          />
          <Route path="/organization/home" element={<OrganizationHome />} />
          <Route
            path="/organization/profile"
            element={<OrganizationProfile />}
          />
          <Route
            path="/organization/post-job"
            element={<OrganizationPostJob />}
          />
          <Route
            path="/organization/applications"
            element={<OrganizationApplications />}
          />
          <Route
            path="/organization/contract/:applicationId"
            element={<ContractWelcome />}
          />

          {/* Client */}
          <Route path="/client/dashboard" element={<ClientDashboardPage />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/post-job" element={<PostJob />} />
          <Route path="/client/my-jobs" element={<MyJobs />} />
          <Route path="/client/applications" element={<WorkerApplications />} />

          {/* Admin */}
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/monitoring" element={<MonitoringPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
