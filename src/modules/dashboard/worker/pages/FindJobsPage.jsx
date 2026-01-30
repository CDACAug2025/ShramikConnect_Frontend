import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Spinner } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const FindJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ district: 'Mumbai', category: '' });

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await workerApi.getJobFeed(filters.district, filters.category);
                // Filter for OPEN status found in your MySQL table
                setJobs(res.data.filter(j => j.status === 'OPEN'));
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchJobs();
    }, [filters]);

    const handleApply = async (jobId) => {
        try {
            await workerApi.applyToJob(jobId);
            alert("Applied successfully!");
        } catch (err) { alert("Already applied for this job."); }
    };

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between mb-4">
                <h3>Jobs in {filters.district}</h3>
                <Form.Select size="sm" className="w-25" onChange={(e) => setFilters({...filters, district: e.target.value})}>
                    <option value="Mumbai">Mumbai</option>
                    <option value="MUMBAI_CITY">Mumbai City</option>
                    <option value="PUNE">Pune</option>
                </Form.Select>
            </div>
            {loading ? <Spinner animation="border" /> : (
                <Row>
                    {jobs.map(job => (
                        <Col md={6} lg={4} key={job.jobId} className="mb-4">
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Badge bg="primary" className="mb-2 w-fit">{job.category}</Badge>
                                    <Card.Title className="fw-bold">{job.title}</Card.Title>
                                    <Card.Text className="small flex-grow-1">{job.description}</Card.Text>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <span className="text-success fw-bold">₹{job.budget}</span>
                                        <Button size="sm" onClick={() => handleApply(job.jobId)}>Apply Now</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default FindJobsPage;