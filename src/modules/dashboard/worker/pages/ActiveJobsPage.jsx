import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const ActiveJobsPage = () => {
    const [activeJobs, setActiveJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ✅ State for Submission Modal
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [deliveryNote, setDeliveryNote] = useState("");

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const res = await workerApi.getActiveJobs();
                setActiveJobs(res.data || []);
            } catch (err) {
                setError("Access Denied: Please ensure your account is verified.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, []);

    const handleOpenSubmit = (job) => {
        setSelectedJob(job);
        setShowSubmitModal(true);
    };

    const handleFinalSubmit = async () => {
        try {
            // Placeholder for your actual submission API
            console.log(`Submitting for Job ID: ${selectedJob.contract_id}`, deliveryNote);
            setShowSubmitModal(false);
            alert("Work submitted successfully for Client review!");
        } catch (err) {
            alert("Failed to submit work.");
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '80vh' }}>
            <Spinner animation="border" variant="warning" />
        </div>
    );

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                {/* 🚀 Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Active Work Management</h2>
                        <p className="text-muted mb-0">Track your ongoing projects and milestone progress.</p>
                    </div>
                    <Badge bg="warning" text="dark" className="px-4 py-3 rounded-pill shadow-sm fs-6 mt-3 mt-md-0">
                        <i className="bi bi-tools me-2"></i>{activeJobs.length} Ongoing Projects
                    </Badge>
                </div>

                {error && <Alert variant="danger" className="rounded-4 border-0 shadow-sm mb-4">{error}</Alert>}

                {activeJobs.length > 0 ? (
                    <Row className="g-4">
                        {activeJobs.map(job => (
                            <Col lg={6} key={job.contract_id}>
                                <Card className="shadow-sm border-0 h-100 rounded-4 card-hover-effect">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div>
                                                <h4 className="fw-bold text-dark mb-1">{job.title}</h4>
                                                <div className="text-muted small">
                                                    <i className="bi bi-calendar3 me-2 text-primary"></i>
                                                    Started: {new Date(job.start_date).toLocaleDateString('en-IN')}
                                                </div>
                                            </div>
                                            <Badge bg="success" className="rounded-pill px-3 py-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                                                {job.status}
                                            </Badge>
                                        </div>

                                        {/* 💰 Financial Quick View */}
                                        <div className="p-3 bg-light rounded-4 border d-flex justify-content-around text-center mb-4">
                                            <div>
                                                <small className="text-muted d-block fw-bold mb-1 extra-small text-uppercase">Total Contract</small>
                                                <span className="fw-bold text-dark fs-5">₹{job.agreed_amount?.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="vr opacity-10"></div>
                                            <div>
                                                <small className="text-muted d-block fw-bold mb-1 extra-small text-uppercase">Next Milestone</small>
                                                <span className="fw-bold text-danger fs-5">
                                                    {new Date(job.end_date).toLocaleDateString('en-IN')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 📊 Progress Bar */}
                                        <div className="mb-4 px-1">
                                            <div className="d-flex justify-content-between small mb-2">
                                                <span className="fw-bold text-muted small">COMPLETION PROGRESS</span>
                                                <span className="fw-bold text-primary">65%</span>
                                            </div>
                                            <ProgressBar now={65} variant="warning" style={{ height: '8px' }} className="rounded-pill bg-secondary bg-opacity-10" />
                                        </div>

                                        <div className="d-flex gap-2">
                                            <Button 
                                                variant="dark" 
                                                className="w-100 fw-bold py-2 rounded-pill shadow-sm"
                                                onClick={() => handleOpenSubmit(job)}
                                            >
                                                Submit Work
                                            </Button>
                                            <Button 
                                                href={`/worker/contracts/${job.contract_id}`} 
                                                variant="outline-dark" 
                                                className="w-100 fw-bold py-2 rounded-pill"
                                            >
                                                View Terms
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5 bg-white rounded-5 shadow-sm border">
                        <i className="bi bi-journal-x display-1 text-muted opacity-25"></i>
                        <h4 className="text-muted mt-3">No active projects found.</h4>
                        <p className="small text-muted mb-4">Start applying to jobs to build your work history.</p>
                        <Button as="a" href="/worker/find-jobs" variant="warning" className="rounded-pill px-4 fw-bold">Browse Job Feed</Button>
                    </div>
                )}
            </Container>

            {/* ——————————————————————————————————————————————————————————————
                ✅ ELITE SUBMISSION MODAL
            ———————————————————————————————————————————————————————————————— */}
            <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)} centered className="border-0">
                <Modal.Body className="p-0 overflow-hidden rounded-4">
                    <div className="p-4 text-white" style={{ background: '#0f172a' }}>
                        <Modal.Title className="fw-bold">Deliver Project</Modal.Title>
                        <p className="mb-0 text-white-50 small">Finalize your work for Client review.</p>
                    </div>
                    <div className="p-4">
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold text-muted small text-uppercase">Completion Note</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={4} 
                                className="border-light bg-light rounded-4 p-3 shadow-none focus-yellow"
                                placeholder="Describe the work completed. Mention any specific details for the client..."
                                onChange={(e) => setDeliveryNote(e.target.value)}
                            />
                        </Form.Group>
                        <div className="bg-warning bg-opacity-10 p-3 rounded-4 d-flex align-items-center mb-2">
                            <i className="bi bi-shield-check-fill text-warning fs-4 me-3"></i>
                            <span className="small fw-bold">Funds will be released once the client approves your submission.</span>
                        </div>
                    </div>
                    <div className="p-4 pt-0 d-flex gap-2">
                        <Button variant="light" className="w-100 fw-bold rounded-pill py-2" onClick={() => setShowSubmitModal(false)}>
                            Wait, Back
                        </Button>
                        <Button variant="warning" onClick={handleFinalSubmit} className="w-100 fw-bold rounded-pill py-2 text-dark shadow">
                            Submit Deliverables
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <style>{`
                .card-hover-effect { transition: all 0.2s ease-in-out; }
                .card-hover-effect:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important; }
                .extra-small { font-size: 0.65rem; letter-spacing: 0.05em; }
                .focus-yellow:focus { border-color: #facc15 !important; box-shadow: 0 0 0 0.2rem rgba(250, 204, 21, 0.1) !important; }
            `}</style>
        </div>
    );
};

export default ActiveJobsPage;