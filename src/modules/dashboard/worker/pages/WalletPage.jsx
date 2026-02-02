import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../services/axiosInstance';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';

const WalletPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkerPayments = async () => {
            try {
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
            <Spinner animation="border" variant="warning" className="mb-3" />
            <h6 className="text-muted fw-bold">Connecting to Secure Vault...</h6>
        </div>
    );

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                {/* 🚀 Header */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Financial Portfolio</h2>
                        <p className="text-muted small mb-0">Manage your earnings and track escrow security.</p>
                    </div>
                    <Button variant="dark" className="fw-bold px-4 rounded-pill shadow-sm">
                        <i className="bi bi-file-earmark-arrow-down me-2"></i>Statement
                    </Button>
                </div>

                {/* --- METRICS --- */}
                <Row className="g-4 mb-5">
                    {/* Main Balance Card */}
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden text-white h-100" 
                              style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="small text-uppercase fw-bold text-warning">Ready to Withdraw</span>
                                    <i className="bi bi-wallet2 fs-4 text-warning"></i>
                                </div>
                                <h1 className="fw-black mb-0 display-4">₹{totalAvailable.toLocaleString('en-IN')}</h1>
                                <p className="small opacity-50 mt-2">Verified earnings available for bank transfer.</p>
                                <Button 
                                    variant="warning" 
                                    className="mt-4 fw-bold px-4 rounded-pill w-100 text-dark border-0 shadow" 
                                    disabled={totalAvailable <= 0}
                                >
                                    Withdraw Funds
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Escrow Status Card */}
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-5 border-warning">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="small text-uppercase fw-bold text-muted">Secured in Escrow</span>
                                    <i className="bi bi-shield-lock-fill fs-4 text-warning"></i>
                                </div>
                                <h1 className="fw-black text-dark mb-0 display-4">₹{heldInEscrow.toLocaleString('en-IN')}</h1>
                                <div className="bg-warning bg-opacity-10 p-3 rounded-3 mt-4">
                                    <p className="small text-dark fw-bold mb-0">
                                        <i className="bi bi-info-circle-fill me-2"></i>
                                        These funds are locked by ShramikConnect and will release upon client approval.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* --- TRANSACTION HISTORY --- */}
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                    <Card.Header className="bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold mb-0 text-dark text-uppercase small">Recent Transaction History</h6>
                        <Badge bg="light" text="dark" className="border">Last 30 Days</Badge>
                    </Card.Header>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light small fw-bold text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>
                                <tr>
                                    <th className="ps-4 py-3">Reference & Date</th>
                                    <th>Security Status</th>
                                    <th className="text-end pe-4">Credit Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? payments.map(p => (
                                    <tr key={p.escrowId}>
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark small">REF-{p.escrowId}</div>
                                            <div className="text-muted extra-small">{new Date(p.transactionDate).toLocaleDateString('en-IN')}</div>
                                        </td>
                                        <td>
                                            <Badge pill className={`px-3 py-2 fw-bold ${p.paymentStatus === 'RELEASED' ? 'bg-success-subtle text-success border border-success' : 'bg-warning-subtle text-warning border border-warning'}`}>
                                                <i className={`bi bi-${p.paymentStatus === 'RELEASED' ? 'check-circle-fill' : 'clock-history'} me-2`}></i>
                                                {p.paymentStatus === 'RELEASED' ? 'CLEARED' : 'HELD IN ESCROW'}
                                            </Badge>
                                        </td>
                                        <td className="text-end pe-4 fw-bold text-dark fs-5">
                                            ₹{p.amount.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-5 text-muted">
                                            <i className="bi bi-folder-x fs-1 opacity-25 d-block mb-3"></i>
                                            No financial records found in your vault.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </Container>

            <style>{`
                .fw-black { font-weight: 900; }
                .extra-small { font-size: 0.7rem; }
                .table-hover tbody tr:hover { background-color: #f8fafc; transition: 0.2s; }
            `}</style>
        </div>
    );
};

export default WalletPage;