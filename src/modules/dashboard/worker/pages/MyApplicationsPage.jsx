import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';
import WorkerNavbar from '../components/WorkerNavbar';
import WorkerFooter from '../components/WorkerFooter';

const MyApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyApps = async () => {
            try {
                // ✅ Calls @GetMapping("/my-status") in your JobApplicationController
                const res = await workerApi.getMyApplications();
                setApplications(res.data);
            } catch (err) {
                setError("Failed to load your applications.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyApps();
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
           
            <Container className="py-4 flex-grow-1">
                <h3 className="fw-bold mb-4">My Applications</h3>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div className="bg-white shadow-sm rounded p-3">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Application ID</th>
                                    <th>Job ID</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length > 0 ? applications.map(app => (
                                    <tr key={app.applicationId}>
                                        <td>#{app.applicationId}</td>
                                        <td>#{app.jobId}</td>
                                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                                        <td>
                                            <Badge bg={
                                                app.status === 'APPLIED' ? 'primary' : 
                                                app.status === 'SHORTLISTED' ? 'success' : 'danger'
                                            }>
                                                {app.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted">
                                            You haven't applied for any jobs yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Container>
            
        </div>
    );
};

export default MyApplicationsPage;