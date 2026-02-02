import { Card, Badge, Button, Row, Col } from "react-bootstrap";

const ClientContractCard = ({ contract, onStatusChange }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE': return { bg: 'success-subtle', text: 'text-success', label: '● ONGOING' };
      case 'COMPLETED': return { bg: 'primary-subtle', text: 'text-primary', label: '● FINISHED' };
      case 'DISPUTED': return { bg: 'danger-subtle', text: 'text-danger', label: '● UNDER REVIEW' };
      default: return { bg: 'secondary-subtle', text: 'text-secondary', label: status };
    }
  };

  const styles = getStatusBadge(contract.status);

  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden card-hover-subtle">
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col lg={8}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <Badge className={`${styles.bg} ${styles.text} px-3 py-2 rounded-pill extra-small fw-bold`}>
                {styles.label}
              </Badge>
              <span className="text-muted small">
                <i className="bi bi-calendar-check me-1"></i> Term: {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
              </span>
            </div>

            <h4 className="fw-bold text-dark mb-1">{contract.jobTitle || "Standard Service Engagement"}</h4>
            <p className="text-primary fw-bold small mb-3">
              <i className="bi bi-person-badge-fill me-2"></i>Worker: {contract.workerName || `ID: ${contract.workerId}`}
            </p>
            
            <div className="bg-light p-3 rounded-3 border-start border-4 border-warning mb-0">
              <small className="text-muted d-block fw-bold mb-1 extra-small">CONTRACT TERMS</small>
              <p className="small text-secondary mb-0 line-clamp-2">{contract.contractTerms}</p>
            </div>
          </Col>

          <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
            <div className="mb-3">
              <small className="text-muted d-block fw-bold extra-small">ESCROWED AMOUNT</small>
              <h3 className="fw-bold text-dark mb-0">₹{contract.agreedAmount?.toLocaleString('en-IN')}</h3>
            </div>
            
            {contract.status === 'ACTIVE' && (
              <div className="d-flex gap-2 justify-content-lg-end">
                <Button 
                  variant="warning" 
                  className="fw-bold px-4 rounded-pill shadow-sm"
                  onClick={() => onStatusChange(contract.contractId, 'COMPLETED')}
                >
                  Authorize Release
                </Button>
                <Button 
                  variant="outline-danger" 
                  className="fw-bold px-4 rounded-pill"
                  onClick={() => onStatusChange(contract.contractId, 'DISPUTED')}
                >
                  Dispute
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
      <style>{`
        .extra-small { font-size: 0.7rem; letter-spacing: 0.5px; }
        .card-hover-subtle { transition: transform 0.2s ease; }
        .card-hover-subtle:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </Card>
  );
};

export default ClientContractCard;