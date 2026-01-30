import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Spinner, Alert } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';
import WorkerNavbar from '../components/WorkerNavbar';

const ActiveJobsPage = () => {
    const [activeJobs, setActiveJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const res = await workerApi.getActiveJobs();
                setActiveJobs(res.data);
            } catch (err) {
                setError("Unable to connect to the contract database.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
        </div>
    );

    return (
        <div className="bg-light min-vh-100">
           
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2 className="fw-bold text-dark">Active Work Management</h2>
                        <p className="text-muted mb-0">Track your progress and secure your payments.</p>
                    </div>
                    <Badge bg="primary" className="px-3 py-2 shadow-sm">
                        {activeJobs.length} Ongoing Projects
                    </Badge>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                {activeJobs.length > 0 ? (
                    <Row className="g-4">
                        {activeJobs.map(job => (
                            <Col lg={6} key={job.contract_id}>
                                <Card className="shadow-sm border-0 h-100">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold text-dark mb-1">{job.title}</h4>
                                                <div className="text-muted small">
                                                    <i className="bi bi-calendar-event me-2"></i>
                                                    Started: {new Date(job.start_date).toLocaleDateString('en-IN')}
                                                </div>
                                            </div>
                                            <Badge bg="success" className="px-3 py-2 shadow-sm uppercase">
                                                {job.status}
                                            </Badge>
                                        </div>

                                        <div className="bg-white border rounded-3 p-3 mb-4 d-flex justify-content-around text-center">
                                            <div>
                                                <small className="text-muted d-block fw-bold small">AGREED PAY</small>
                                                <span className="fw-bold text-success fs-5">₹{job.agreed_amount?.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="vr mx-3"></div>
                                            <div>
                                                <small className="text-muted d-block fw-bold small">DUE DATE</small>
                                                <span className="fw-bold text-danger">
                                                    {new Date(job.end_date).toLocaleDateString('en-IN')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between small mb-2">
                                                <span className="fw-bold">Current Milestone: <span className="text-primary">In Progress</span></span>
                                                <span className="fw-bold">65%</span>
                                            </div>
                                            <ProgressBar now={65} variant="primary" animated style={{ height: '10px' }} className="rounded-pill" />
                                        </div>

                                        <div className="d-flex gap-2">
                                            <Button variant="primary" className="w-100 fw-bold py-2 shadow-sm">
                                                Submit Deliverables
                                            </Button>
                                            <Button variant="outline-dark" className="w-100 fw-bold py-2">
                                                View Terms
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Card className="text-center py-5 border-0 shadow-sm rounded-4">
                        <Card.Body>
                            <div className="display-4 mb-3 text-muted">📁</div>
                            <h4 className="text-muted">No Work Found in Your Portfolio</h4>
                            <p className="text-muted mb-4">You have {6} applications pending, but no signed contracts yet.</p>
                            <Button href="/worker/find-jobs" variant="primary" className="px-5 fw-bold rounded-pill">
                                Discover Jobs
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default ActiveJobsPage;