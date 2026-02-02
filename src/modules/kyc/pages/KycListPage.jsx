import { useEffect, useState } from 'react';
import { Table, Button, Container, Card, Badge, Spinner, InputGroup, Form } from 'react-bootstrap';
import { fetchPendingKycs, decideKyc } from '../services/kycApi';
import { toast } from 'react-toastify';

const KycListPage = () => {
  const [kycs, setKycs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadKycs = async () => {
    try {
      setLoading(true);
      const res = await fetchPendingKycs();
      setKycs(res.data || []);
    } catch (err) {
      toast.error("Failed to sync KYC registry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKycs();
  }, []);

  const handleDecision = async (kycId, decision, name) => {
    const confirmMsg = `Are you sure you want to ${decision.toLowerCase()} ${name}'s identity?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await decideKyc(kycId, decision);
      toast.success(`Identity ${decision === 'APPROVED' ? 'Verified' : 'Rejected'} for ${name}`);
      loadKycs();
    } catch (err) {
      toast.error("Action failed. Verification sync error.");
    }
  };

  const filteredKycs = kycs.filter(k => 
    k.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.documentNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" variant="danger" />
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* 🚀 Header & Search Utility */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Identity Verification Registry</h2>
            <p className="text-muted mb-0">Authorize or decline professional identity documents for the ShramikConnect ecosystem.</p>
          </div>
          
          <InputGroup className="shadow-sm rounded-3 overflow-hidden" style={{ maxWidth: '350px' }}>
            <InputGroup.Text className="bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </InputGroup.Text>
            <Form.Control 
              placeholder="Search by name or document..." 
              className="border-start-0 ps-0 py-2 shadow-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        {/* 📊 The Compliance Table */}
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <Table hover align="middle" className="mb-0">
              <thead className="bg-light">
                <tr className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                  <th className="ps-4 py-3">User Identity</th>
                  <th>Document Type</th>
                  <th>Document Reference</th>
                  <th className="text-end pe-4">Compliance Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredKycs.length > 0 ? filteredKycs.map(k => (
                  <tr key={k.kycId} className="border-bottom border-light">
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '42px', height: '42px' }}>
                          {(k.userName || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{k.userName}</div>
                          <div className="text-muted extra-small">{k.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg="info" className="px-3 py-2 rounded-pill fw-bold extra-small text-uppercase">
                        <i className="bi bi-file-earmark-person me-2"></i>{k.documentType}
                      </Badge>
                    </td>
                    <td>
                      <code className="text-primary fw-bold">{k.documentNumber}</code>
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group shadow-sm rounded-pill overflow-hidden border bg-white">
                        <Button
                          variant="white"
                          className="px-4 py-2 small fw-bold text-success hover-success-bg border-end"
                          onClick={() => handleDecision(k.kycId, 'APPROVED', k.userName)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="white"
                          className="px-4 py-2 small fw-bold text-danger hover-danger-bg"
                          onClick={() => handleDecision(k.kycId, 'REJECTED', k.userName)}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      <i className="bi bi-shield-check display-4 opacity-25 d-block mb-3"></i>
                      Compliance queue is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

      <style>{`
        .extra-small { font-size: 0.7rem; }
        .hover-success-bg:hover { background-color: #198754 !important; color: #fff !important; }
        .hover-danger-bg:hover { background-color: #dc3545 !important; color: #fff !important; }
        .table tbody tr:hover { background-color: #f8fafc; transition: 0.2s; }
      `}</style>
    </div>
  );
};

export default KycListPage;