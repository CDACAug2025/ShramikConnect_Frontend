import LoginForm from '../components/LoginForm';
import AuthCard from '../components/AuthCard';

const LoginPage = () => {
  return (
    <AuthCard title="Login to ShramikConnect">
      <LoginForm />
      <div className="text-center mt-2">
        <a href="/forgot-password">Forgot password?</a>
      </div>

    </AuthCard>
  );
};

export default LoginPage;
