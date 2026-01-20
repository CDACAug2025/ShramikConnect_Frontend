import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const KycPendingPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow" style={{ maxWidth: 500 }}>
        <Card.Body className="text-center">
          <h4 className="mb-3">KYC Verification Pending</h4>

          <p className="text-muted">
            Your account has been created successfully, but your identity
            verification is still under review.
          </p>

          <p className="text-muted">
            A supervisor will verify your documents shortly. You will be
            notified once the verification is complete.
          </p>

          <div className="d-grid gap-2 mt-4">
            <Button variant="outline-secondary" onClick={logout}>
              Logout
            </Button>

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
