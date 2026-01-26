import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchSupervisorDashboard } from '../services/supervisorDashboardApi';

const SupervisorDashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSupervisorDashboard().then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <Container className="py-4">
      <h3 className="mb-4">Supervisor Dashboard</h3>

      {/* Counts */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h6>Pending KYC Requests</h6>
            <h2>{data.pendingKycCount}</h2>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h6>Active Disputes</h6>
            <h2>{data.activeDisputeCount}</h2>
          </Card>
        </Col>
      </Row>

      {/* Oldest KYCs */}
      <Row>
        <Col md={6}>
          <h5>Oldest Pending KYCs</h5>
          {data.oldestPendingKycs.map(k => (
            <Card key={k.kycId} className="p-2 mb-2">
              <strong>{k.userName}</strong>
              <div>{k.documentType}</div>
            </Card>
          ))}
        </Col>

        <Col md={6}>
          <h5>Oldest Disputes</h5>
          {data.oldestDisputes.map(d => (
            <Card key={d.disputeId} className="p-2 mb-2">
              <strong>{d.raisedBy}</strong>
              <div>Status: {d.status}</div>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SupervisorDashboardPage;
