import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Spinner, Card, Button, Alert } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';
import WorkerNavbar from '../components/WorkerNavbar';
import WorkerFooter from '../components/WorkerFooter';

const WorkerJobHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // ✅ Now calls the fixed API method
                const res = await workerApi.getHistory(); 
                setHistory(res.data);
            } catch (err) {
                setError("Failed to sync work history. Ensure your backend is running.");
                console.error("History Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'COMPLETED': return <Badge bg="success" className="px-3 py-2">Completed</Badge>;
            case 'ACTIVE': return <Badge bg="primary" className="px-3 py-2">In Progress</Badge>;
            case 'CANCELLED': return <Badge bg="danger" className="px-3 py-2">Cancelled</Badge>;
            default: return <Badge bg="info" className="px-3 py-2 text-dark">{status}</Badge>;
        }
    };

    if (loading) return (
        <div className="text-center py-5 vh-100 d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="grow" variant="primary" />
            <p className="mt-3 text-muted">Retrieving your professional history...</p>
        </div>
    );

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
           
            <Container className="py-5 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold text-dark">Work & Contract History</h2>
                        <p className="text-muted mb-0">Track all your past assignments and earnings.</p>
                    </div>
                    {/* Professional Export Feature */}
                    <Button variant="outline-primary" className="fw-bold shadow-sm" onClick={() => window.print()}>
                        <i className="bi bi-printer me-2"></i>Export History
                    </Button>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Card className="shadow-sm border-0 overflow-hidden rounded-3">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th className="py-3 ps-4">Contract ID</th>
                                <th className="py-3">Job Assignment</th>
                                <th className="py-3 text-end">Agreed Amount</th>
                                <th className="py-3">Date Signed</th>
                                <th className="py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length > 0 ? history.map(contract => (
                                <tr key={contract.contract_id}>
                                    <td className="ps-4 fw-bold text-primary">#CNTR-{contract.contract_id}</td>
                                    <td>
                                        <div className="fw-bold text-dark">{contract.title}</div>
                                        <small className="text-muted">{contract.location}</small>
                                    </td>
                                    <td className="text-end fw-bold text-success">
                                        {/* India-specific formatting */}
                                        ₹{contract.agreed_amount?.toLocaleString('en-IN')}
                                    </td>
                                    <td>
                                        {contract.signed_at ? new Date(contract.signed_at).toLocaleDateString('en-IN') : 'Ongoing'}
                                    </td>
                                    <td className="text-center">
                                        {getStatusBadge(contract.status)}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <div className="fs-1 mb-3">📂</div>
                                        <h5>No work history found.</h5>
                                        <p>Completed jobs will appear here automatically.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
            </Container>
            
        </div>
    );
};

export default WorkerJobHistoryPage;