import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchSupervisorDashboard } from '../services/supervisorDashboardApi';

const SupervisorDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupervisorDashboard()
      .then(res => setData(res.data))
      .catch(err => console.error("Dashboard Sync Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" variant="danger" />
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* 🚀 Header & Overview */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
          <div>
            <h2 className="fw-bold text-dark mb-1">Operational Oversight</h2>
            <p className="text-muted mb-0">Manage workforce compliance and platform dispute resolution.</p>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
             <Button as={Link} to="/supervisor/kyc-list" variant="dark" className="rounded-pill px-4 fw-bold shadow-sm">
                Review KYCs
             </Button>
             <Button as={Link} to="/supervisor/disputes" variant="danger" className="rounded-pill px-4 fw-bold shadow-sm">
                Resolve Disputes
             </Button>
          </div>
        </div>

        {/* 📊 Critical Performance Metrics */}
        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100 text-white" style={{ background: '#0f172a' }}>
              <Card.Body className="p-4 d-flex align-items-center">
                <div className="bg-warning text-dark p-3 rounded-4 me-4">
                  <i className="bi bi-person-check-fill fs-3"></i>
                </div>
                <div>
                  <h6 className="opacity-75 small fw-bold text-uppercase">Pending KYC Requests</h6>
                  <h1 className="fw-bold mb-0">{data.pendingKycCount}</h1>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100 bg-white border-start border-5 border-danger">
              <Card.Body className="p-4 d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-4 me-4">
                  <i className="bi bi-exclamation-triangle-fill fs-3"></i>
                </div>
                <div>
                  <h6 className="text-muted small fw-bold text-uppercase">Active Disputes</h6>
                  <h1 className="fw-bold mb-0 text-dark">{data.activeDisputeCount}</h1>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 📋 Priority Work Queues */}
        <Row className="g-4">
          {/* Oldest Pending KYCs */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <Card.Header className="bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0 text-dark text-uppercase small">Priority KYC Queue</h6>
              </Card.Header>
              <ListGroup variant="flush">
                {data.oldestPendingKycs.length > 0 ? data.oldestPendingKycs.map(k => (
                  <ListGroup.Item key={k.kycId} className="p-3 border-light transition-hover">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold text-dark">{k.userName}</div>
                        <div className="text-muted extra-small"><i className="bi bi-file-earmark-text me-1"></i>{k.documentType}</div>
                      </div>
                      <Badge bg="warning" text="dark" pill className="extra-small fw-bold px-3">AWAITING REVIEW</Badge>
                    </div>
                  </ListGroup.Item>
                )) : (
                  <div className="p-5 text-center text-muted small">No pending verifications.</div>
                )}
              </ListGroup>
            </Card>
          </Col>

          {/* Oldest Disputes */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <Card.Header className="bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0 text-dark text-uppercase small">High-Priority Disputes</h6>
              </Card.Header>
              <ListGroup variant="flush">
                {data.oldestDisputes.length > 0 ? data.oldestDisputes.map(d => (
                  <ListGroup.Item key={d.disputeId} className="p-3 border-light transition-hover">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold text-dark">Raised by: {d.raisedBy}</div>
                        <div className="text-muted extra-small">Ref: DIS-{d.disputeId}</div>
                      </div>
                      <Badge pill className={`px-3 py-2 extra-small fw-bold ${
                        d.status === 'OPEN' ? 'bg-danger-subtle text-danger border border-danger' : 'bg-secondary-subtle text-secondary'
                      }`}>
                        {d.status}
                      </Badge>
                    </div>
                  </ListGroup.Item>
                )) : (
                  <div className="p-5 text-center text-muted small">Queue clear. All disputes resolved.</div>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <style>{`
        .extra-small { font-size: 0.7rem; letter-spacing: 0.5px; }
        .transition-hover:hover { background-color: #f8fafc; }
      `}</style>
    </div>
  );
};

export default SupervisorDashboardPage;