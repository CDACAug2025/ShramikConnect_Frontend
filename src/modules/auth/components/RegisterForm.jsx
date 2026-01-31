import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { registerApi } from '../services/authApi';
import { ROLES } from '@/shared/constants/roles';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = new FormData(e.target);

    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    const email = data.get('email');

    // ✅ FRONTEND VALIDATION
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const payload = {
      fullName: data.get('name'),
      email,
      phone: data.get('phone'),
      password,
      confirmPassword,
      role: data.get('role'),
    };

    try {
      setLoading(true);
      await registerApi(payload);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Control name="name" placeholder="Full Name" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="email" name="email" placeholder="Email Address" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="phone" placeholder="Phone Number" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>

        <ul className="small text-muted mb-3">
          <li>Minimum 8 characters</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
        </ul>

        <Form.Group className="mb-3">
          <Form.Select name="role" required>
            <option value="">Select Role</option>
            <option value={ROLES.WORKER}>Worker</option>
            <option value={ROLES.CLIENT}>Client</option>
            <option value={ROLES.ORGANIZATION}>Organization</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </Form>

      {/* ✅ SUCCESS MODAL */}
      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your account has been created.</p>
          <p>
            📧 Please <strong>verify your email</strong> before logging in.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Go to Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterForm;
