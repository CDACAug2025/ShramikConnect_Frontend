// src/modules/dashboard/worker/pages/WorkerJobHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Spinner } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const WorkerJobHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // ✅ Fetch real contracts from the /worker/contracts endpoint
                const res = await workerApi.getMyContracts();
                setHistory(res.data);
            } catch (err) {
                console.error("Error loading real history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <Container className="py-4">
            <h3 className="fw-bold mb-4">Contract & Job History</h3>
            <div className="bg-white shadow-sm rounded p-3">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Contract ID</th>
                            <th>Job Description</th>
                            <th>Agreed Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length > 0 ? history.map(contract => (
                            <tr key={contract.contract_id}>
                                <td>#{contract.contract_id}</td>
                                <td>{contract.contract_terms}</td>
                                <td className="fw-bold text-success">₹{contract.agreed_amount}</td>
                                <td>
                                    {/* ✅ Displays SIGNED, ACTIVE, or COMPLETED from your DB */}
                                    <Badge bg={contract.status === 'COMPLETED' ? 'success' : 'primary'}>
                                        {contract.status}
                                    </Badge>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="text-center text-muted py-4">No real contracts found in your account.</td></tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default WorkerJobHistoryPage;