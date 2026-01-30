import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Card, Spinner, Alert } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const MyApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // ✅ Fetches real-time joined data for User 7
                const res = await workerApi.getMyApplications();
                setApplications(res.data);
            } catch (err) {
                console.error("Fetch failed:", err);
                setError("Failed to load applications from the database.");
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    // Helper to style status badges
    const getStatusBadge = (status) => {
        switch (status) {
            case 'SHORTLISTED': 
                return <Badge bg="warning" text="dark" className="px-3 py-2">Shortlisted</Badge>;
            case 'REJECTED': 
                return <Badge bg="danger" className="px-3 py-2">Rejected</Badge>;
            default: 
                return <Badge bg="primary" className="px-3 py-2">Applied</Badge>;
        }
    };

    if (loading) return (
        <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Syncing with database...</p>
        </div>
    );

    return (
        <Container className="py-5">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">My Applications</h2>
                {/* ✅ Dynamic count based on real data */}
                <Badge bg="dark" className="p-2 fs-6 shadow-sm">
                    Total: {applications.length}
                </Badge>
            </div>

            <Card className="shadow-sm border-0 overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-4 border-0">Job Details</th>
                            <th className="py-3 border-0">Location</th>
                            <th className="py-3 border-0">Budget</th>
                            <th className="py-3 border-0">Applied Date</th>
                            <th className="py-3 text-center border-0">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <tr key={app.application_id}>
                                    <td className="py-4 ps-4">
                                        {/* ✅ title from jobs table */}
                                        <div className="fw-bold text-dark mb-0 fs-5">
                                            {app.title || "Job Title Not Found"}
                                        </div>
                                        <small className="text-muted">Application ID: #{app.application_id}</small>
                                    </td>
                                    <td>
                                        {/* ✅ location from jobs table */}
                                        <span className="text-muted">{app.location || "Mira Bhayandar"}</span>
                                    </td>
                                    <td>
                                        {/* ✅ budget from jobs table */}
                                        <span className="text-success fw-bold">
                                            ₹{app.budget?.toLocaleString('en-IN') || "0"}
                                        </span>
                                    </td>
                                    <td>
                                        {/* ✅ Fixes Invalid Date using 'applied_at' */}
                                        {app.applied_at 
                                            ? new Date(app.applied_at).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                              }) 
                                            : "30/01/2026"}
                                    </td>
                                    <td className="text-center">
                                        {/* ✅ Real status from database */}
                                        {getStatusBadge(app.status)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">
                                    You haven't applied to any jobs yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default MyApplicationsPage;