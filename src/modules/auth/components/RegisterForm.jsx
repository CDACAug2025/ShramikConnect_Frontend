import { Form, Button, Modal, InputGroup, Row, Col } from 'react-bootstrap';
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
      confirmPassword: data.get('confirmPassword'),
      role: data.get('role'),
    };

    try {
      setLoading(true);
      await registerApi(payload);
      setShowSuccessModal(true);
    } catch (err) {
      alert('Registration failed. Please try again.');
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
        {/* Full Name */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-secondary">Full Name</Form.Label>
          <InputGroup className="bg-light rounded-3 p-1">
            <InputGroup.Text className="bg-transparent border-0"><i className="bi bi-person"></i></InputGroup.Text>
            <Form.Control name="name" className="bg-transparent border-0 py-2" placeholder="Enter full name" required />
          </InputGroup>
        </Form.Group>

        <Row>
          <Col md={6}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">Email</Form.Label>
              <InputGroup className="bg-light rounded-3 p-1">
                <Form.Control type="email" name="email" className="bg-transparent border-0 py-2" placeholder="Email" required />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">Phone</Form.Label>
              <InputGroup className="bg-light rounded-3 p-1">
                <Form.Control name="phone" className="bg-transparent border-0 py-2" placeholder="Phone" required />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-secondary">Password</Form.Label>
          <InputGroup className="bg-light rounded-3 p-1">
            <InputGroup.Text className="bg-transparent border-0"><i className="bi bi-lock"></i></InputGroup.Text>
            <Form.Control type="password" name="password" className="bg-transparent border-0 py-2" placeholder="••••••••" required />
          </InputGroup>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-secondary">Confirm Password</Form.Label>
          <InputGroup className="bg-light rounded-3 p-1">
            <InputGroup.Text className="bg-transparent border-0"><i className="bi bi-lock-fill"></i></InputGroup.Text>
            <Form.Control type="password" name="confirmPassword" className="bg-transparent border-0 py-2" placeholder="••••••••" required />
          </InputGroup>
        </Form.Group>

        {/* Role Selection */}
        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-secondary">I want to register as a:</Form.Label>
          <Form.Select name="role" className="bg-light border-0 py-2 rounded-3" style={{ fontSize: '0.9rem' }} required>
            <option value="">Choose your role...</option>
            <option value={ROLES.WORKER}>Skilled Worker (Find Jobs)</option>
            <option value={ROLES.CLIENT}>Individual Client (Hire Workers)</option>
            <option value={ROLES.ORGANIZATION}>Organization (Business Hire)</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="w-100 py-3 fw-bold rounded-3 shadow-sm border-0" 
                style={{ background: '#facc15', color: '#000' }} disabled={loading}>
          {loading ? 'Processing...' : 'Create My Account'}
        </Button>
      </Form>

      {/* ✅ SUCCESS MODAL (Professional Style) */}
      <Modal show={showSuccessModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Body className="p-5 text-center">
          <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4 text-success">
            <i className="bi bi-check-circle fs-1"></i>
          </div>
          <h3 className="fw-bold mb-3">Registration Successful! 🎉</h3>
          <p className="text-muted mb-4">
            Your account is ready. We've sent a <strong>verification email</strong>. Please verify your address before logging in.
          </p>
          <Button variant="dark" className="w-100 py-2 rounded-3" onClick={handleCloseModal}>
            Back to Login
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterForm;