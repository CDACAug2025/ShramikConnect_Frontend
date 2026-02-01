// src/modules/dashboard/worker/pages/WorkerDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const WorkerDashboardPage = () => {
    const [stats, setStats] = useState({ fullName: '', applied: 0, shortlisted: 0, escrow: 0 });

    useEffect(() => {
        workerApi.getDashboardStats().then(res => setStats({
            fullName: res.data.full_name,
            applied: res.data.applied_count,
            shortlisted: res.data.shortlisted_count,
            escrow: res.data.escrow_balance
        }));
    }, []);

    return (
        <Container className="py-5">
            <h2 className="fw-bold mb-4">Welcome, {stats.fullName}!</h2>
            <Row className="g-4">
                {/* Real-time Escrow */}
                <Col md={6}>
                    <Card className="shadow-sm border-0 bg-success text-white p-3">
                        <Card.Body>
                            <h6>Held in Escrow</h6>
                            <h2 className="fw-bold">₹{stats.escrow.toLocaleString()}</h2>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Application Summary */}
                <Col md={6}>
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body>
                            <h6 className="text-muted text-uppercase small fw-bold mb-3">Application Status</h6>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                                    Total Applied
                                    <Badge bg="primary" pill>{stats.applied + stats.shortlisted}</Badge>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                                    Shortlisted 
                                    <Badge bg="warning" text="dark" pill>{stats.shortlisted}</Badge>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WorkerDashboardPage;