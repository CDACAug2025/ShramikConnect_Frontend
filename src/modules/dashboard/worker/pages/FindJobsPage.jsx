import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Spinner, Alert, InputGroup, Modal } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';
import WorkerNavbar from '../components/WorkerNavbar';
import WorkerFooter from '../components/WorkerFooter';

const FindJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [district, setDistrict] = useState('PUNE');

    // ✅ Modal States for Real-Time Confirmation
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, [district]);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await workerApi.getJobFeed(district);
            setJobs(res.data);
        } catch (err) {
            setError("Unable to sync with job feed. Verify backend is running.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Opens modal and populates it with the specific job's data
    const handleShowModal = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    // ✅ Final application submission after confirmation
    const confirmApply = async () => {
        setApplying(true);
        try {
            // ✅ Triggers @PostMapping("/apply/{jobId}") in your Backend
            await workerApi.applyToJob(selectedJob.job_id);
            alert("Application submitted successfully!");
            setShowModal(false);
        } catch (err) {
            alert("Error: " + (err.response?.data || "Already applied."));
        } finally {
            setApplying(false);
        }
    };

    const filteredJobs = jobs.filter(job => 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            
            
            <Container className="py-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark">Find Work in {district.replace('_', ' ')}</h2>
                    <p className="text-muted">Browse verified opportunities from your local community</p>
                    
                    <Row className="justify-content-center mt-4">
                        <Col md={8}>
                            <InputGroup className="shadow-sm border-0">
                                <Form.Control 
                                    placeholder="Search by job title (e.g. Carpenter, Plumber)..." 
                                    className="border-0 py-3 ps-4"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button variant="primary" className="px-4 fw-bold">Search Jobs</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
                    <h5 className="mb-0 fw-bold text-primary">{filteredJobs.length} Jobs Found</h5>
                    
                    <div className="d-flex align-items-center gap-2">
                        <label className="small fw-bold text-muted text-nowrap">Select District:</label>
                        <Form.Select 
                            size="sm"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            style={{ width: '200px' }}
                            className="border-0 bg-light fw-bold"
                        >
                            <option value="MUMBAI_CITY">Mumbai City</option>
                            <option value="MUMBAI_SUBURBAN">Mumbai Suburban</option>
                            <option value="PUNE">Pune</option>
                            <option value="THANE">Thane</option>
                            <option value="NAGPUR">Nagpur</option>
                            <option value="NASHIK">Nashik</option>
                            <option value="AURANGABAD">Aurangabad</option>
                        </Form.Select>
                    </div>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                {loading ? (
                    <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
                ) : (
                    <Row>
                        {filteredJobs.length > 0 ? filteredJobs.map(job => (
                            <Col md={6} lg={4} key={job.job_id} className="mb-4">
                                <Card className="border-0 shadow-sm h-100 transition-hover">
                                    <Card.Body className="p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between mb-3 align-items-start">
                                            <Badge bg="info" className="text-white px-2 py-1">{job.category}</Badge>
                                            <h5 className="text-success fw-bold mb-0">₹{job.budget?.toLocaleString('en-IN')}</h5>
                                        </div>
                                        <Card.Title className="fw-bold text-dark fs-5">{job.title}</Card.Title>
                                        <div className="text-muted small mb-2">📍 {job.location}</div>
                                        <div className="text-primary extra-small mb-3 fw-bold">
                                            <i className="bi bi-person-check me-1"></i>Client: {job.client_name}
                                        </div>
                                        
                                        <Card.Text className="small text-muted flex-grow-1">
                                            {job.description?.length > 100 ? job.description.substring(0, 100) + "..." : job.description}
                                        </Card.Text>
                                        
                                        <Button 
                                            variant="outline-primary" 
                                            className="mt-3 fw-bold rounded-pill"
                                            onClick={() => handleShowModal(job)}
                                        >
                                            View & Apply
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) : (
                            <Col className="text-center py-5">
                                <h4 className="text-muted">No open jobs found in this district.</h4>
                                <p className="small text-muted">Try checking a neighboring district like THANE or PUNE.</p>
                            </Col>
                        )}
                    </Row>
                )}
            </Container>

            {/* ✅ JOB APPLICATION CONFIRMATION MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="fw-bold">Job Application Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {selectedJob && (
                        <>
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h3 className="fw-bold text-dark mb-1">{selectedJob.title}</h3>
                                    <Badge bg="primary" className="px-3 py-2 uppercase shadow-sm">{selectedJob.category}</Badge>
                                </div>
                                <div className="text-end">
                                    <small className="text-muted d-block fw-bold">PROPOSED BUDGET</small>
                                    <h4 className="text-success fw-bold mb-0">₹{selectedJob.budget?.toLocaleString('en-IN')}</h4>
                                </div>
                            </div>

                            <Row className="mb-4 bg-light p-3 rounded mx-0 shadow-sm border">
                                <Col sm={6} className="border-end">
                                    <small className="fw-bold text-muted text-uppercase small">Hiring Client</small>
                                    <p className="mb-0 text-primary fw-bold fs-5">
                                        <i className="bi bi-patch-check-fill me-2"></i>
                                        {selectedJob.client_name}
                                    </p>
                                </Col>
                                <Col sm={6} className="ps-4">
                                    <small className="fw-bold text-muted text-uppercase small">Work Location</small>
                                    <p className="mb-0 fw-bold fs-5">
                                        <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                                        {selectedJob.location}, {selectedJob.district?.replace('_', ' ')}
                                    </p>
                                </Col>
                            </Row>

                            <h6 className="fw-bold mb-2 text-dark">Job Description</h6>
                            <p className="text-muted mb-4 p-3 border rounded bg-white" style={{ minHeight: '100px' }}>
                                {selectedJob.description}
                            </p>

                            <Alert variant="info" className="small border-0 shadow-sm">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                By clicking <strong>"Yes, Confirm Application"</strong>, your professional profile and contact details will be shared with <strong>{selectedJob.client_name}</strong> for review.
                            </Alert>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0 p-4 pt-0">
                    <Button variant="outline-secondary" className="px-4 fw-bold rounded-pill" onClick={() => setShowModal(false)}>
                        No, Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        className="px-5 fw-bold rounded-pill shadow" 
                        onClick={confirmApply} 
                        disabled={applying}
                    >
                        {applying ? <Spinner size="sm" className="me-2" /> : "Yes, Confirm Application"}
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </div>
    );
};

export default FindJobsPage;