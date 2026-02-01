import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../services/axiosInstance';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';

const WalletPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkerPayments = async () => {
            try {
                // ✅ Path now matches the SecurityConfig authorized pattern
                const res = await axiosInstance.get('/api/worker/payments/my-history');
                setPayments(res.data || []);
            } catch (err) {
                console.error("Sync Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkerPayments();
    }, []);

    // 💰 Financial Logic
    const totalAvailable = payments
        .filter(p => p.paymentStatus === 'RELEASED')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const heldInEscrow = payments
        .filter(p => p.paymentStatus === 'ESCROW_HELD')
        .reduce((acc, curr) => acc + curr.amount, 0);

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h6 className="text-muted fw-bold">Connecting to Secure Vault...</h6>
        </div>
    );

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="fw-bold text-dark mb-0">Financial Portfolio</h2>
                    <Button variant="outline-primary" className="fw-bold px-4 border-2">Statement</Button>
                </div>

                {/* --- METRICS --- */}
                <Row className="g-4 mb-5">
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 p-2 text-white" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
                            <Card.Body>
                                <span className="small text-uppercase fw-bold opacity-75">Ready to Withdraw</span>
                                <h1 className="fw-black mb-0 mt-2">₹{totalAvailable.toLocaleString('en-IN')}</h1>
                                <Button variant="light" className="mt-4 fw-bold px-4 rounded-pill w-100 text-primary" disabled={totalAvailable <= 0}>
                                    Withdraw Funds
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 p-2 h-100 border-start border-5 border-warning">
                            <Card.Body>
                                <span className="small text-uppercase fw-bold text-muted">Secured in Escrow</span>
                                {/* ✅ Displays the ₹2,800 from Ajay's dashboard */}
                                <h1 className="fw-black text-dark mb-0 mt-2">₹{heldInEscrow.toLocaleString('en-IN')}</h1>
                                <p className="small text-muted mt-3 mb-0">Releases upon client work approval.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* --- TRANSACTIONS --- */}
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                    <Card.Header className="bg-white border-bottom py-3 fw-bold">Recent History</Card.Header>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light small fw-bold text-muted text-uppercase">
                                <tr>
                                    <th className="ps-4 py-3">Date</th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? payments.map(p => (
                                    <tr key={p.escrowId}>
                                        <td className="ps-4 text-muted small">{new Date(p.transactionDate).toLocaleDateString()}</td>
                                        <td>
                                            <Badge pill className={`px-3 py-2 ${p.paymentStatus === 'RELEASED' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                                {p.paymentStatus === 'RELEASED' ? '● CLEARED' : '● SECURED'}
                                            </Badge>
                                        </td>
                                        <td className="text-end pe-4 fw-bold">₹{p.amount.toLocaleString()}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="3" className="text-center py-5 text-muted">No records found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </Container>
            <style>{`.fw-black { font-weight: 900; }`}</style>
        </div>
    );
};

export default WalletPage;