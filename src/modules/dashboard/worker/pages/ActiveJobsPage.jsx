import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const ActiveJobsPage = () => {
    const [activeJobs, setActiveJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ✅ NEW: State for Submission Modal
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

    // ✅ NEW: Handle Button Clicks
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="grow" variant="primary" />
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

                {error && <Alert variant="danger" className="shadow-sm border-0">{error}</Alert>}

                {activeJobs.length > 0 ? (
                    <Row className="g-4">
                        {activeJobs.map(job => (
                            <Col lg={6} key={job.contract_id}>
                                <Card className="shadow-sm border-0 h-100 rounded-4 overflow-hidden">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold text-dark mb-1">{job.title}</h4>
                                                <div className="text-muted small">
                                                    <i className="bi bi-calendar-event me-2"></i>
                                                    Started: {new Date(job.start_date).toLocaleDateString('en-IN')}
                                                </div>
                                            </div>
                                            <Badge bg="success" className="px-3 py-2">
                                                {job.status}
                                            </Badge>
                                        </div>

                                        <div className="bg-light border rounded-3 p-3 mb-4 d-flex justify-content-around text-center">
                                            <div>
                                                <small className="text-muted d-block fw-bold mb-1">AGREED PAY</small>
                                                <span className="fw-bold text-success fs-5">₹{job.agreed_amount?.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="vr mx-3"></div>
                                            <div>
                                                <small className="text-muted d-block fw-bold mb-1">DUE DATE</small>
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
                                            <ProgressBar now={65} variant="primary" style={{ height: '8px' }} className="rounded-pill" />
                                        </div>

                                        <div className="d-flex gap-2">
                                            {/* ✅ FIX: Attached handleOpenSubmit */}
                                            <Button 
                                                variant="primary" 
                                                className="w-100 fw-bold py-2 shadow-sm"
                                                onClick={() => handleOpenSubmit(job)}
                                            >
                                                Submit Deliverables
                                            </Button>
                                            <Button 
                                                href={`/contracts/terms/${job.contract_id}`} 
                                                variant="outline-dark" 
                                                className="w-100 fw-bold py-2"
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
                    /* ... Empty state remains same */
                    <Alert variant="info" className="text-center py-5 rounded-4 border-0">No active work found.</Alert>
                )}
            </Container>

            {/* ——————————————————————————————————————————————————————————————
                ✅ NEW: WORK SUBMISSION MODAL
            ———————————————————————————————————————————————————————————————— */}
            <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Submit Completed Work</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted small mb-4">Provide a brief note to the Client regarding your completed task.</p>
                    <Form.Group>
                        <Form.Label className="fw-bold small">Work Details / Completion Note</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={4} 
                            placeholder="Example: I have finished the plumbing work as per the agreed requirements."
                            onChange={(e) => setDeliveryNote(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="light" onClick={() => setShowSubmitModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleFinalSubmit} className="px-4 fw-bold">Send to Client</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ActiveJobsPage;