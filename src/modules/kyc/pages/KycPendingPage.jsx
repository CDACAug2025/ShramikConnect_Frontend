import { Container, Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitKycApi } from '../services/kycApi';

const KycPendingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const userId = data.get('userId'); // 👈 TEMP
    const payload = {
      documentType: data.get('documentType'),
      documentNumber: data.get('documentNumber'),
    };

    try {
      setLoading(true);
      await submitKycApi(userId, payload);
      alert('KYC submitted successfully');
    } catch (err) {
      alert('Failed to submit KYC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow w-100" style={{ maxWidth: 500 }}>
        <Card.Body>
          <h4 className="mb-3 text-center">KYC Verification Pending</h4>

          <p className="text-muted text-center">
            Please submit your identity document for verification.
          </p>

          <Form onSubmit={handleSubmit}>

            {/* TEMP USER ID INPUT */}
            <Form.Group className="mb-3">
              <Form.Label>User ID (Temporary)</Form.Label>
              <Form.Control
                name="userId"
                placeholder="Enter your User ID"
                required
              />
              <small className="text-muted">
                Temporary input (will be auto-filled after login)
              </small>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Document Type</Form.Label>
              <Form.Select name="documentType" required>
                <option value="">Select Document</option>
                <option value="AADHAR">Aadhar</option>
                <option value="PAN">PAN</option>
                <option value="GST_CERTIFICATE">GST Certificate</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Document Number</Form.Label>
              <Form.Control
                name="documentNumber"
                placeholder="Enter document number"
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit KYC'}
            </Button>
          </Form>

          <div className="d-grid gap-2 mt-3">
            <Button variant="link" onClick={() => navigate('/')}>
              Go to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default KycPendingPage;
