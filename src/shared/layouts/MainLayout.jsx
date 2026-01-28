// layout/MainLayout.jsx
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-fill">{children}</main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
