import RegisterForm from '../components/RegisterForm';
import AuthCard from '../components/AuthCard';

const RegisterPage = () => {
  return (
    <AuthCard title="Create Your Account">
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
