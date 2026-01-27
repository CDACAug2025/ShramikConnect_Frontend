import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const { login, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    login({
      email: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control name="username" placeholder="Email or Phone" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </Form.Group>

      <Button type="submit" className="w-100" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  );
};

export default LoginForm;
