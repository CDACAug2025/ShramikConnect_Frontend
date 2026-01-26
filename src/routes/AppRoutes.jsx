import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';
import { LoginPage, RegisterPage} from '@/modules/auth';
import { HomePage, AboutPage, ContactPage } from '@/modules/home';
import SupervisorDashboardPage from '../modules/dashboard/supervisor/pages/SupervisorDashboardPage';
import KycListPage from '@/modules/kyc/pages/KycListPage';
import KycPendingPage from '@/modules/kyc/pages/KycPendingPage';
import { DisputesPage } from '../modules/disputes'; 


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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
