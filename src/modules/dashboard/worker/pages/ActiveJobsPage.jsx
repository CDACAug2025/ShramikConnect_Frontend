import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { workerApi } from '../services/workerDashboardApi';

const ActiveJobsPage = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                // ✅ Calls your updated /api/worker/contracts endpoint
                const res = await workerApi.getMyContracts();
                
                // ✅ Filters for ACTIVE or SIGNED statuses directly from your DB Enum
                const activeData = res.data.filter(c => 
                    c.status === 'ACTIVE' || c.status === 'SIGNED'
                );
                setContracts(activeData);
            } catch (err) {
                console.error("Failed to load real-time contracts:", err);
                setError("Unable to fetch active jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchContracts();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">My Active Jobs</h3>
                <Badge bg="info" className="p-2 px-3">Total Active: {contracts.length}</Badge>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <Table responsive hover className="mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="ps-4">Contract ID</th>
                            <th>Job Description</th>
                            <th>Agreed Amount</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.length > 0 ? (
                            contracts.map((c) => (
                                <tr key={c.contract_id} className="align-middle">
                                    <td className="ps-4 fw-semibold text-muted">#{c.contract_id}</td>
                                    <td>
                                        <div className="fw-bold text-dark">{c.contract_terms}</div>
                                        <small className="text-muted">ID: {c.job_job_id}</small>
                                    </td>
                                    <td>
                                        <span className="text-success fw-bold">₹{c.agreed_amount.toLocaleString()}</span>
                                    </td>
                                    <td>
                                        <Badge bg={c.status === 'ACTIVE' ? 'success' : 'primary'} className="text-uppercase">
                                            {c.status}
                                        </Badge>
                                    </td>
                                    <td className="text-center pe-4">
                                        {/* ✅ Links to your Module 6 Dispute page */}
                                        <Button 
                                            as={Link} 
                                            to="/worker/raise-dispute" 
                                            variant="outline-danger" 
                                            size="sm"
                                            className="fw-bold"
                                        >
                                            Report Issue
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">
                                    <p className="mb-0">No active or signed contracts found.</p>
                                    <small>Apply for jobs in the "Find Jobs" tab to start working.</small>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default ActiveJobsPage;