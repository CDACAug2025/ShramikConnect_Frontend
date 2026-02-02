import { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  Button, 
  Badge, 
  Row, 
  Col, 
  ButtonGroup, 
  Form, 
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { fetchDisputes, updateDisputeStatus } from '../services/disputeApi';
import { toast } from 'react-toastify';

const DisputesPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadDisputes = async () => {
    try {
      setLoading(true);
      const res = await fetchDisputes();
      setDisputes(res.data || []);
    } catch (err) {
      toast.error("Failed to synchronize dispute registry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDisputes();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDisputeStatus(id, status);
      toast.success(`Dispute status updated to ${status.replace('_', ' ')}`);
      loadDisputes();
    } catch (err) {
      toast.error("Status update failed. Verify network connectivity.");
    }
  };

  const statusConfig = (status) => {
    switch (status) {
      case 'OPEN': return { bg: 'danger', label: '● HIGH PRIORITY', variant: 'danger' };
      case 'UNDER_REVIEW': return { bg: 'warning', label: '● INVESTIGATING', variant: 'warning' };
      case 'RESOLVED': return { bg: 'success', label: '● CLOSED', variant: 'success' };
      default: return { bg: 'secondary', label: status, variant: 'secondary' };
    }
  };

  const filteredDisputes = disputes.filter(d => {
    const matchesStatus = filter === 'ALL' ? true : d.status === filter;
    const matchesSearch = d.raisedBy.toLowerCase().includes(search.toLowerCase()) || 
                          d.contractId.toString().includes(search);
    return matchesStatus && matchesSearch;
  });

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" variant="danger" />
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* 🚀 Header & Global Filters */}
        <div className="mb-5">
          <h2 className="fw-bold text-dark mb-1">Dispute Resolution Center</h2>
          <p className="text-muted">Review arbitration requests and maintain platform integrity.</p>
        </div>

        <Card className="border-0 shadow-sm rounded-4 mb-5 overflow-hidden">
          <Card.Body className="p-4" style={{ background: '#0f172a' }}>
            <Row className="align-items-center g-3">
              <Col lg={7}>
                <ButtonGroup className="w-100 shadow-sm rounded-pill overflow-hidden border border-secondary">
                  {['ALL', 'OPEN', 'UNDER_REVIEW', 'RESOLVED'].map(s => (
                    <Button
                      key={s}
                      variant={filter === s ? 'warning' : 'dark'}
                      className="py-2 fw-bold small text-uppercase"
                      onClick={() => setFilter(s)}
                      style={filter === s ? { color: '#000' } : { color: '#94a3b8' }}
                    >
                      {s.replace('_', ' ')}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
              <Col lg={5}>
                <InputGroup className="shadow-sm rounded-pill overflow-hidden border-0">
                  <InputGroup.Text className="bg-dark border-0">
                    <i className="bi bi-search text-warning"></i>
                  </InputGroup.Text>
                  <Form.Control
                    className="bg-dark border-0 text-white py-2 shadow-none"
                    placeholder="Search by User or Contract ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* 📋 Dispute Feed */}
        <Row className="g-4">
          {filteredDisputes.map(d => (
            <Col md={6} lg={4} key={d.disputeId}>
              <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden card-hover-subtle">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg={statusConfig(d.status).bg} className={`px-3 py-2 rounded-pill extra-small fw-bold ${d.status === 'UNDER_REVIEW' ? 'text-dark' : ''}`}>
                      {statusConfig(d.status).label}
                    </Badge>
                    <span className="text-muted small fw-bold">REF-DIS-{d.disputeId}</span>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted d-block fw-bold text-uppercase extra-small mb-1">Affected Contract</small>
                    <div className="fw-bold text-primary fs-5">
                      <i className="bi bi-file-earmark-medical me-2"></i>#{d.contractId}
                    </div>
                  </div>

                  <div className="mb-4">
                    <small className="text-muted d-block fw-bold text-uppercase extra-small mb-1">Arbitration Raised By</small>
                    <div className="fw-bold text-dark">
                      <i className="bi bi-person-circle me-2 text-secondary"></i>{d.raisedBy}
                    </div>
                  </div>

                  <div className="bg-light p-3 rounded-4 mb-4 border border-light">
                    <small className="text-muted d-block fw-bold text-uppercase extra-small mb-2">Claim Reason</small>
                    <p className="text-secondary small mb-0 lh-base line-clamp-3">
                      {d.reason}
                    </p>
                  </div>

                  <div className="d-grid gap-2">
                    {d.status === 'OPEN' && (
                      <Button
                        variant="dark"
                        className="fw-bold rounded-pill py-2 shadow-sm"
                        onClick={() => handleStatusChange(d.disputeId, 'UNDER_REVIEW')}
                      >
                        Initiate Investigation
                      </Button>
                    )}

                    {d.status === 'UNDER_REVIEW' && (
                      <Button
                        variant="success"
                        className="fw-bold rounded-pill py-2 shadow-sm"
                        onClick={() => handleStatusChange(d.disputeId, 'RESOLVED')}
                      >
                        Confirm Resolution
                      </Button>
                    )}
                    
                    {d.status === 'RESOLVED' && (
                      <Button variant="outline-secondary" disabled className="rounded-pill py-2 fw-bold opacity-50">
                        <i className="bi bi-check-all me-2"></i>Case Closed
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredDisputes.length === 0 && (
          <div className="text-center py-5 bg-white rounded-5 shadow-sm border mt-4">
            <i className="bi bi-shield-check display-1 text-muted opacity-25"></i>
            <h4 className="text-muted mt-3">Dispute queue is clear.</h4>
            <p className="small text-muted">No active claims matching your current filters.</p>
          </div>
        )}
      </Container>
      <style>{`
        .extra-small { font-size: 0.7rem; letter-spacing: 0.5px; }
        .card-hover-subtle { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover-subtle:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default DisputesPage;