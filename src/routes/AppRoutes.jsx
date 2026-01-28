import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';
import { LoginPage, RegisterPage} from '@/modules/auth';
import { HomePage, AboutPage, ContactPage } from '@/modules/home';
import SupervisorDashboardPage from '../modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import { DisputesPage } from '../modules/disputes'; 
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
//import JobProgress from '../modules/dashboard/client/pages/JobProgress';
//import Contract from '../modules/dashboard/client/pages/Contract';


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
          <Route path="/supervisor/dashboard" element={<SupervisorDashboardPage />} />
          <Route path="/supervisor/kyc-list" element={<KycListPage />} />
          <Route path='/supervisor/disputes' element={<DisputesPage />} />
          
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
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
