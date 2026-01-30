// src/modules/dashboard/worker/pages/WorkerDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const WorkerDashboardPage = () => {
    const [stats, setStats] = useState({ fullName: '', kycStatus: 'NOT_SUBMITTED', appCount: 0, escrow: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        workerApi.getDashboardStats()
            .then(res => setStats({
                fullName: res.data.full_name,
                kycStatus: res.data.kyc_status || 'NOT_SUBMITTED',
                appCount: res.data.app_count,
                escrow: res.data.escrow_balance
            }))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4">Welcome, {stats.fullName}!</h2>
            <Row className="g-4 text-center">
                <Col md={4}>
                    <Card className="shadow-sm border-0 p-3">
                        <h6>KYC Status</h6>
                        <Badge bg={stats.kycStatus === 'PENDING' ? 'warning' : 'success'}>{stats.kycStatus}</Badge>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 p-3">
                        <h6>Active Applications</h6>
                        <h3 className="text-primary">{stats.appCount}</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 p-3">
                        <h6>Held in Escrow</h6>
                        <h3 className="text-success">₹{stats.escrow}</h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default WorkerDashboardPage;