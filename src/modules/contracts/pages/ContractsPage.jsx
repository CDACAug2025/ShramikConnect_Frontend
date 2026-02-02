import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { 
  getMyContractsApi, 
  updateContractStatusApi 
} from '../services/contractApi';
import { getAuth } from '@/shared/utils/authUtils';
import { 
  FileCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  IndianRupee, 
  Briefcase,
  Signature
} from 'lucide-react';
import { toast } from 'react-toastify';

const ContractsPage = () => {
  const { role } = getAuth();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadContracts = async () => {
    try {
      setLoading(true);
      const res = await getMyContractsApi();
      setContracts(res.data || []);
    } catch (err) {
      toast.error("Failed to load contracts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateContractStatusApi(id, status);
      toast.success(`Status updated to ${status}`);
      loadContracts();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const getStatusStyle = (status) => {
    const config = {
      NEGOTIATION: { bg: 'warning', text: 'dark', icon: <Clock size={14} className="me-1" /> },
      SIGNED: { bg: 'info', text: 'white', icon: <FileCheck size={14} className="me-1" /> },
      ACTIVE: { bg: 'success', text: 'white', icon: <CheckCircle size={14} className="me-1" /> },
      COMPLETED: { bg: 'primary', text: 'white', icon: <CheckCircle size={14} className="me-1" /> },
      CANCELLED: { bg: 'danger', text: 'white', icon: <AlertCircle size={14} className="me-1" /> },
    };
    return config[status] || { bg: 'secondary', text: 'white', icon: null };
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold text-dark mb-1">Contract Management</h2>
          <p className="text-muted">Review, sign, and track your professional engagements</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-4 shadow-sm border d-flex align-items-center">
            <span className="text-muted small fw-bold text-uppercase me-3">Total Contracts</span>
            <span className="h4 fw-bold text-primary mb-0">{contracts.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Retrieving contract records...</p>
        </div>
      ) : contracts.length === 0 ? (
        <Card className="border-0 shadow-sm rounded-4 p-5 text-center">
          <FileCheck size={48} className="text-muted mb-3 mx-auto" />
          <h5 className="text-muted">No contracts found in your dashboard</h5>
        </Card>
      ) : (
        <Row className="g-4">
          {contracts.map((c) => {
            const style = getStatusStyle(c.status);
            return (
              <Col md={6} key={c.contractId}>
                <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden hover-up transition-all">
                  <Card.Header className="bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3 text-primary">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <h5 className="fw-bold text-dark mb-0">{c.jobTitle}</h5>
                            <small className="text-muted">ID: #CON-{c.contractId}</small>
                        </div>
                    </div>
                    <Badge bg={style.bg} text={style.text} className="px-3 py-2 rounded-pill d-flex align-items-center">
                      {style.icon} {c.status}
                    </Badge>
                  </Card.Header>

                  <Card.Body className="px-4 pb-4">
                    <Row className="mt-3 mb-4 g-3">
                        <Col xs={6}>
                            <div className="p-3 bg-light rounded-3">
                                <small className="text-muted d-block mb-1">Agreement Value</small>
                                <span className="fw-bold text-dark h5 mb-0 d-flex align-items-center">
                                    <IndianRupee size={16} className="me-1" /> {c.agreedAmount}
                                </span>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="p-3 bg-light rounded-3 h-100">
                                <small className="text-muted d-block mb-1">Next Step</small>
                                <span className="text-dark small fw-semibold">
                                    {c.status === 'NEGOTIATION' ? 'Awaiting Signature' : 'Work in Progress'}
                                </span>
                            </div>
                        </Col>
                    </Row>

                    {/* ACTION HUB */}
                    <div className="d-grid gap-2">
                      {/* WORKER Actions */}
                      {role === 'WORKER' && c.status === 'NEGOTIATION' && (
                        <Button 
                          variant="success" 
                          className="rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                          onClick={() => updateStatus(c.contractId, 'SIGNED')}
                        >
                          <Signature size={18} /> Sign & Finalize Contract
                        </Button>
                      )}

                      {role === 'WORKER' && c.status === 'ACTIVE' && (
                        <Button 
                          variant="primary" 
                          className="rounded-pill py-2 fw-bold"
                          onClick={() => updateStatus(c.contractId, 'COMPLETED')}
                        >
                          Mark Job as Completed
                        </Button>
                      )}

                      {/* EMPLOYER Actions */}
                      {(role === 'ORGANIZATION' || role === 'CLIENT') && c.status === 'SIGNED' && (
                        <Button 
                          variant="warning" 
                          className="rounded-pill py-2 fw-bold text-dark"
                          onClick={() => updateStatus(c.contractId, 'ACTIVE')}
                        >
                          Authorize & Start Work
                        </Button>
                      )}

                      {/* Informational Status */}
                      {(role === 'ORGANIZATION' || role === 'CLIENT') && c.status === 'ACTIVE' && (
                        <div className="text-center py-2 bg-success bg-opacity-10 rounded-pill text-success fw-bold small border border-success border-opacity-25">
                            Work currently in progress
                        </div>
                      )}

                      <Button variant="link" className="text-muted small text-decoration-none py-0">
                        View Detailed Agreement
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <style>{`
        .hover-up:hover {
            transform: translateY(-4px);
            box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08) !important;
        }
        .transition-all {
            transition: all 0.3s ease;
        }
      `}</style>
    </Container>
  );
};

export default ContractsPage;