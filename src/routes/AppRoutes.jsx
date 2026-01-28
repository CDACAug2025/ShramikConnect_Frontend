import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';
import { LoginPage, RegisterPage, KycPendingPage } from '@/modules/auth';
import { HomePage, AboutPage, ContactPage } from '@/modules/home';
import OrganizationDashboard from '../modules/dashboard/organization/pages/OrganizationDashboard';
import OrganizationProfile from '../modules/dashboard/organization/pages/OrganizationProfile';
import OrganizationHome from '../modules/dashboard/organization/pages/OrganizationHome';
import OrganizationPostJob from '../modules/dashboard/organization/pages/PostJob';


// Client Dashboard Pages
import ClientProfile from '../modules/dashboard/client/pages/ClientProfile';
import ClientDashboardPage from '../modules/dashboard/client/pages/ClientDashboardPage';
import PostJob from '../modules/dashboard/client/pages/PostJob';
import MyJobs from '../modules/dashboard/client/pages/MyJobs';
import WorkerApplications from '../modules/dashboard/client/pages/WorkerApplications';
import JobProgress from '../modules/dashboard/client/pages/JobProgress';
import Contract from '../modules/dashboard/client/pages/Contract';
import EscrowPayment from '../modules/dashboard/client/pages/EscrowPayment';
import JobHistory from '../modules/dashboard/client/pages/JobHistory';
import Chat from '../modules/dashboard/client/pages/Chat';
import Notifications from '../modules/dashboard/client/pages/Notifications';
import Dispute from '../modules/dashboard/client/pages/Dispute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/kyc-pending" element={<KycPendingPage />} />
          
          {/* ORGANIZATION DASHBOARD ROUTES */}
          <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
          <Route path="/organization/home" element={<OrganizationHome />} />
          <Route path="/organization/profile" element={<OrganizationProfile />} />
          <Route path="/organization/post-job" element={<OrganizationPostJob />} />

          
          {/* CLIENT DASHBOARD ROUTES */}
          <Route path="/client/dashboard" element={<ClientDashboardPage />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/post-job" element={<PostJob />} />
          <Route path="/client/my-jobs" element={<MyJobs />} />
          <Route path="/client/applications" element={<WorkerApplications />} />
          <Route path="/client/job-progress" element={<JobProgress />} />
          <Route path="/client/contract" element={<Contract />} />
          <Route path="/client/escrow" element={<EscrowPayment />} />
          <Route path="/client/history" element={<JobHistory />} />
          <Route path="/client/chat" element={<Chat />} />
          <Route path="/client/notifications" element={<Notifications />} />
          <Route path="/client/dispute" element={<Dispute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
