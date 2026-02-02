import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import axiosInstance from '../../../services/axiosInstance';

const PaymentsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/payments/all');
            setTransactions(res.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPayments(); }, []);

    // Summary Calculations
    const totalHeld = transactions.filter(t => t.paymentStatus === 'ESCROW_HELD').reduce((acc, curr) => acc + curr.amount, 0);
    const totalReleased = transactions.filter(t => t.paymentStatus === 'RELEASED').reduce((acc, curr) => acc + curr.amount, 0);

    const handlePayNow = async (amount, contractId, escrowId) => {
        try {
            const { data } = await axiosInstance.post('/payments/create-order', {
                amount: Number(amount),
                contractId: Number(contractId)
            });

            const options = {
                key: "rzp_test_SAWUs3cxm7J6XZ", 
                amount: amount * 100,
                currency: "INR",
                name: "ShramikConnect Admin",
                description: `Payment for Contract #${contractId}`,
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        const verifyRes = await axiosInstance.post(`/organization/payments/verify-and-update/${escrowId}`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.status === 200) {
                            fetchPayments();
                        }
                    } catch (verifyErr) {
                        alert("Database sync failed. Payment was captured but not recorded.");
                    }
                },
                theme: { color: "#facc15" } 
            };
            new window.Razorpay(options).open();
        } catch (err) {
            alert("Could not start payment. Check backend connection.");
        }
    };

    const handleRelease = async (contractId) => {
        if (!window.confirm("Confirm release of funds to worker? This action cannot be undone.")) return;
        try {
            await axiosInstance.post(`/payments/release/${contractId}`);
            fetchPayments();
        } catch (err) {
            alert("Release failed.");
        }
    };

    if (loading) return (
        <div className="p-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <Spinner animation="border" variant="warning" className="mb-2" />
            <div className="fw-bold text-muted">Loading Financial Data...</div>
        </div>
    );

    return (
        <div className="bg-light min-vh-100 py-4">
            <Container fluid className="px-lg-5">
                {/* 🛡️ Header & Summary Cards */}
                <div className="d-flex align-items-center mb-4">
                    <div className="bg-dark p-2 rounded-3 me-3">
                        <i className="bi bi-wallet2 text-warning fs-4"></i>
                    </div>
                    <div>
                        <h2 className="fw-bold text-dark mb-0">Financial Oversight</h2>
                        <p className="text-muted small mb-0">Monitor escrow deposits, release funds, and manage transactions.</p>
                    </div>
                </div>

                <Row className="mb-4 g-3">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                            <small className="text-muted fw-bold">TOTAL SECURED IN ESCROW</small>
                            <h3 className="fw-bold text-primary mb-0">₹{totalHeld.toLocaleString()}</h3>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                            <small className="text-muted fw-bold">TOTAL RELEASED TO WORKERS</small>
                            <h3 className="fw-bold text-success mb-0">₹{totalReleased.toLocaleString()}</h3>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 bg-dark text-white h-100">
                            <small className="text-warning fw-bold">ACTIVE TRANSACTIONS</small>
                            <h3 className="fw-bold mb-0">{transactions.length}</h3>
                        </Card>
                    </Col>
                </Row>

                {/* 📊 Transaction Table */}
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="table-responsive">
                        <Table hover align="middle" className="mb-0">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr className="text-secondary small fw-bold">
                                    <th className="ps-4 py-3">ORDER DETAILS</th>
                                    <th>CLIENT ➞ WORKER</th>
                                    <th>AMOUNT</th>
                                    <th>ESCROW STATUS</th>
                                    <th className="text-end pe-4">MANAGEMENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn) => (
                                    <tr key={txn.escrowId}>
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark small">{txn.razorpayOrderId || "ORD-REF-PENDING"}</div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                {txn.transactionDate ? new Date(txn.transactionDate).toLocaleDateString('en-IN') : 'Date Pending'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="fw-bold small">{txn.contract?.client?.fullName || "N/A"}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>Client</div>
                                                </div>
                                                <i className="bi bi-arrow-right text-warning mx-2"></i>
                                                <div>
                                                    <div className="fw-bold small">{txn.contract?.worker?.fullName || "N/A"}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>Worker</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="fw-bold">₹{txn.amount.toLocaleString()}</span></td>
                                        <td>
                                            {txn.paymentStatus === 'ESCROW_HELD' ? (
                                                <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">
                                                    HELD IN ESCROW
                                                </Badge>
                                            ) : (
                                                <Badge bg="success" className="rounded-pill px-3 py-2">
                                                    {txn.paymentStatus}
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="text-end pe-4">
                                            {txn.paymentStatus === 'RELEASED' && txn.transactionType === 'DEPOSIT' && (
                                                <Button 
                                                    onClick={() => handlePayNow(txn.amount, txn.contract?.contractId, txn.escrowId)} 
                                                    variant="warning" 
                                                    size="sm" 
                                                    className="fw-bold rounded-pill"
                                                >
                                                    Deposit
                                                </Button>
                                            )}
                                            {txn.paymentStatus === 'ESCROW_HELD' && (
                                                <Button 
                                                    onClick={() => handleRelease(txn.contract?.contractId)} 
                                                    variant="dark" 
                                                    size="sm" 
                                                    className="fw-bold rounded-pill"
                                                >
                                                    Release
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default PaymentsPage;