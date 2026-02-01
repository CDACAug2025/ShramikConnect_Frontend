import LoginForm from '../components/LoginForm';
import AuthCard from '../components/AuthCard';
import { Link} from 'react-router-dom';

const LoginPage = () => {
  return (
    <AuthCard title="Login to ShramikConnect">
      <LoginForm />
      <Link to="/forgot-password" className="text-decoration-none small">
        Forgot password?
      </Link>

    </AuthCard>
  );
};

export default LoginPage;
