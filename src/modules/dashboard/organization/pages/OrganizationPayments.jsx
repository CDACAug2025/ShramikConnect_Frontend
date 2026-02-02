import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../services/axiosInstance';
import { Container, Table, Badge, Button, Card, Spinner } from 'react-bootstrap';

const OrganizationPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyPayments = async () => {
        try {
            setLoading(true);
            // ✅ Path aligned with SecurityConfig: /api prefix handled by axiosInstance
            const res = await axiosInstance.get('/organization/payments'); 
            setPayments(res.data || []);
        } catch (err) {
            console.error("Database Sync Error:", err);
            if(err.response?.status === 403) alert("Access Denied: Please refresh your session.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMyPayments(); }, []);

    const handleFundNow = async (amount, contractId, escrowId) => {
        try {
            // 1. Create order
            const { data } = await axiosInstance.post('/payments/create-order', {
                amount: Number(amount),
                contractId: Number(contractId)
            });

            const options = {
                key: "rzp_test_SAWUs3cxm7J6XZ",
                amount: amount * 100,
                currency: "INR",
                name: "ShramikConnect",
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        // 2. ✅ VERIFICATION: Call specialized update endpoint
                        const verifyRes = await axiosInstance.post(`/organization/payments/verify-and-update/${escrowId}`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.status === 200) {
                            alert("Funds successfully secured in Escrow! 🛡️");
                            fetchMyPayments(); // ✅ Table badge now turns green 'SECURED'
                        }
                    } catch (verifyErr) {
                        console.error("Verification failed:", verifyErr);
                        alert("Payment success, but database update failed. Refreshing...");
                        fetchMyPayments();
                    }
                },
                theme: { color: "#0d6efd" }
            };
            new window.Razorpay(options).open();
        } catch (err) {
            alert("Could not initiate payment. Check server logs.");
        }
    };

    if (loading) return <Container className="p-5 text-center"><Spinner animation="border" variant="primary" /><p className="mt-3 fw-bold text-muted">Syncing Project Financials...</p></Container>;

    return (
        <Container fluid className="p-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Project Funding Oversight</h2>
                <Button variant="outline-primary" onClick={fetchMyPayments}>🔄 Sync Database</Button>
            </div>

            <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
                <Table hover responsive align="middle" className="mb-0">
                    <thead className="bg-white text-secondary small fw-bold border-bottom">
                        <tr>
                            <th className="ps-4">ASSIGNED WORKER</th>
                            <th className="text-center">AMOUNT</th>
                            <th className="text-center">STATUS</th>
                            <th className="text-end pe-4">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(txn => (
                            <tr key={txn.escrowId}>
                                <td className="ps-4 fw-bold">Ramesh Kumar <div className="small text-muted fw-normal">ID: #{txn.contractId}</div></td>
                                <td className="text-center fw-bold text-primary">₹{txn.amount.toLocaleString()}</td>
                                <td className="text-center">
                                    <Badge pill bg={txn.paymentStatus === 'ESCROW_HELD' ? 'success' : 'info'}>
                                        {txn.paymentStatus === 'ESCROW_HELD' ? '🛡️ SECURED' : 'PENDING'}
                                    </Badge>
                                </td>
                                <td className="text-end pe-4">
                                    {txn.paymentStatus === 'RELEASED' ? (
                                        <Button variant="primary" size="sm" onClick={() => handleFundNow(txn.amount, txn.contractId, txn.escrowId)}>Fund Now</Button>
                                    ) : <span className="text-success small fw-bold">✔ Verified</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default OrganizationPayments;