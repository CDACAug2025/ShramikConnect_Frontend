import { Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { registerApi } from '../services/authApi';
import { ROLES } from '@/shared/constants/roles';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const payload = {
      fullName: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      password: data.get('password'),
      role: data.get('role'),
    };

    try {
      setLoading(true);
      await registerApi(payload);

      // ✅ SHOW MODAL INSTEAD OF REDIRECT
      setShowSuccessModal(true);

    } catch (err) {
      alert('Registration failed');
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
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Control name="name" placeholder="Full Name" required />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Control type="email" name="email" placeholder="Email Address" required />
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3">
          <Form.Control name="phone" placeholder="Phone Number" required />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>

        {/* Role */}
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
          <p className="mb-2">
            Your account has been created successfully.
          </p>
          <p className="mb-0">
            📧 Please <strong>check your email</strong> and verify your account before logging in.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterForm;
