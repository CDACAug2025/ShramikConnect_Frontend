import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrgData } from '../hooks/useOrgData';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const OrganizationDashboard = () => {
    const { orgName } = useOrgData();
    const navigate = useNavigate();

    return (
        <Container fluid className="py-4 px-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-bold text-dark mb-1">Organization Dashboard</h1>
                    <p className="text-muted lead">Welcome back, <strong>{orgName}</strong></p>
                </div>
                <Button 
                    onClick={() => navigate('/organization/payments')} 
                    variant="primary" 
                    className="shadow-sm fw-bold px-4 py-2 rounded-pill"
                >
                    💰 Fund Project Escrow
                </Button>
            </div>

            <Row className="g-4">
                {/* Visual Summary Card 1: Payments */}
                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100 text-center p-3 hover-shadow transition" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/organization/payments')}>
                        <Card.Body>
                            <div className="display-4 mb-3">🛡️</div>
                            <h5 className="fw-bold">Escrow Control</h5>
                            <p className="small text-muted">Manage secure fund deposits for active worker contracts.</p>
                            <div className="text-primary fw-bold small mt-2">View Records →</div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Visual Summary Card 2: Applications */}
                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100 text-center p-3" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/organization/applications')}>
                        <Card.Body>
                            <div className="display-4 mb-3">📄</div>
                            <h5 className="fw-bold">Active Applications</h5>
                            <p className="small text-muted">Review incoming requests and shortlist skilled labor.</p>
                            <div className="text-primary fw-bold small mt-2">Manage Applications →</div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Visual Summary Card 3: Post Job */}
                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100 text-center p-3" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/organization/post-job')}>
                        <Card.Body>
                            <div className="display-4 mb-3">➕</div>
                            <h5 className="fw-bold">Hire Workers</h5>
                            <p className="small text-muted">Post new project requirements to the public labor feed.</p>
                            <div className="text-primary fw-bold small mt-2">Create New Post →</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrganizationDashboard;