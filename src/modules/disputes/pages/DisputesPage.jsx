import { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Badge,
  Row,
  Col,
  ButtonGroup,
  Form
} from 'react-bootstrap';
import { fetchDisputes, updateDisputeStatus } from '../services/disputeApi';

const DisputesPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const loadDisputes = async () => {
    const res = await fetchDisputes();
    setDisputes(res.data);
  };

  useEffect(() => {
    loadDisputes();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateDisputeStatus(id, status);
    loadDisputes();
  };

  const statusVariant = (status) => {
    switch (status) {
      case 'OPEN': return 'danger';
      case 'UNDER_REVIEW': return 'warning';
      case 'RESOLVED': return 'success';
      default: return 'secondary';
    }
  };

  const filteredDisputes = disputes.filter(d => {
    const matchesStatus =
      filter === 'ALL' ? true : d.status === filter;

    const matchesSearch =
      d.raisedBy.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-3">

      {/* 🔍 FILTER BAR */}
      <Row className="mb-4">
        <Col md={6}>
          <ButtonGroup>
            {['ALL', 'OPEN', 'UNDER_REVIEW', 'RESOLVED'].map(s => (
              <Button
                key={s}
                variant={filter === s ? 'primary' : 'outline-primary'}
                onClick={() => setFilter(s)}
              >
                {s.replace('_', ' ')}
              </Button>
            ))}
          </ButtonGroup>
        </Col>

        <Col md={6}>
          <Form.Control
            placeholder="Search by raised user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        {filteredDisputes.map(d => (
          <Col md={6} lg={4} key={d.disputeId} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Dispute #{d.disputeId}</strong>
                  <Badge bg={statusVariant(d.status)}>
                    {d.status.replace('_', ' ')}
                  </Badge>
                </div>

                <p className="mb-1">
                  <strong>Contract:</strong> {d.contractId}
                </p>

                <p className="mb-1">
                  <strong>Raised By:</strong> {d.raisedBy}
                </p>

                <p className="text-muted small mt-2">
                  <strong>Reason:</strong><br />
                  {d.reason}
                </p>

                <div className="d-flex gap-2 mt-3">
                  {d.status === 'OPEN' && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() =>
                        handleStatusChange(d.disputeId, 'UNDER_REVIEW')
                      }
                    >
                      Mark Under Review
                    </Button>
                  )}

                  {d.status === 'UNDER_REVIEW' && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() =>
                        handleStatusChange(d.disputeId, 'RESOLVED')
                      }
                    >
                      Resolve
                    </Button>
                  )}
                </div>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredDisputes.length === 0 && (
        <p className="text-muted text-center mt-4">
          No disputes match your filters.
        </p>
      )}
    </div>
  );
};

export default DisputesPage;
