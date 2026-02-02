import { Container, Card, Button, Form, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitKycApi } from '../services/kycApi';
import { toast } from 'react-toastify';

const KycPendingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const payload = {
      documentType: data.get('documentType'),
      documentNumber: data.get('documentNumber'),
    };

    try {
      setLoading(true);
      await submitKycApi(payload);
      toast.success('KYC synchronization successful. Professional verification in progress.');
      navigate('/'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification submission failed. Check network connectivity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            {/* 🛡️ Header Identity Section */}
            <div className="text-center mb-4">
              <div className="bg-dark d-inline-block p-3 rounded-circle mb-3 shadow-sm border border-warning border-2">
                <i className="bi bi-shield-lock-fill text-warning fs-2"></i>
              </div>
              <h2 className="fw-bold text-dark mb-1">Identity Compliance</h2>
              <p className="text-muted">Validate your professional profile to unlock high-budget contracts.</p>
            </div>

            {/* 📝 The Professional Form Card */}
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="p-1" style={{ background: 'linear-gradient(90deg, #0f172a 0%, #facc15 100%)' }}></div>
              <Card.Body className="p-4 p-lg-5 bg-white">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.5px' }}>
                      Primary Identity Document
                    </Form.Label>
                    <Form.Select 
                      name="documentType" 
                      required 
                      className="py-2 border-light bg-light rounded-3 shadow-none fw-bold"
                    >
                      <option value="">Select Official ID...</option>
                      <option value="AADHAR">Aadhar Card (UIDAI)</option>
                      <option value="PAN">PAN Card (Income Tax Dept)</option>
                      <option value="GST_CERTIFICATE">GST Registration Certificate</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.5px' }}>
                      Document ID Number
                    </Form.Label>
                    <Form.Control
                      name="documentNumber"
                      placeholder="Enter the alphanumeric ID precisely"
                      required
                      className="py-2 border-light bg-light rounded-3 shadow-none fw-bold"
                    />
                    <Form.Text className="text-muted extra-small d-block mt-2">
                      <i className="bi bi-info-circle me-1 text-primary"></i>
                      Your data is encrypted and stored in a secure government-compliant vault.
                    </Form.Text>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="warning" 
                    className="w-100 py-3 fw-bold rounded-pill shadow-sm border-0" 
                    style={{ color: '#000' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Synchronizing Registry...
                      </>
                    ) : (
                      'Authorize & Submit Verification'
                    )}
                  </Button>
                  
                  <div className="text-center mt-4 pt-3 border-top border-light">
                    <Badge bg="light" text="dark" className="border px-3 py-2 rounded-pill">
                      <i className="bi bi-clock-history me-2 text-warning"></i>
                      Expected review time: 24-48 hours
                    </Badge>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <Button 
                variant="link" 
                className="text-decoration-none text-muted small fw-bold" 
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left me-2"></i>Return to Dashboard
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <style>{`.extra-small { font-size: 0.7rem; }`}</style>
    </div>
  );
};

export default KycPendingPage;