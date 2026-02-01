import React, { useState, useEffect } from 'react';
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

    const handlePayNow = async (amount, contractId, escrowId) => {
        try {
            // 1. Create Order via backend
            const { data } = await axiosInstance.post('/payments/create-order', {
                amount: Number(amount),
                contractId: Number(contractId)
            });

            const options = {
                // ✅ FIXED: Using your real Key ID to solve 401 error
                key: "rzp_test_SAWUs3cxm7J6XZ", 
                amount: amount * 100,
                currency: "INR",
                name: "ShramikConnect Admin",
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        // 2. Verify payment
                        const verifyRes = await axiosInstance.post(`/organization/payments/verify-and-update/${escrowId}`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.status === 200) {
                            alert("Payment Successful! Funds Secured. 🛡️");
                            fetchPayments();
                        }
                    } catch (verifyErr) {
                        alert("Database sync failed. Please refresh.");
                    }
                },
                theme: { color: "#0d6efd" }
            };
            new window.Razorpay(options).open();
        } catch (err) {
            alert("Could not start payment. Check backend.");
        }
    };

    const handleRelease = async (contractId) => {
        if (!window.confirm("Confirm release of funds to worker?")) return;
        try {
            await axiosInstance.post(`/payments/release/${contractId}`);
            alert("Funds released successfully!");
            fetchPayments();
        } catch (err) {
            alert("Release failed.");
        }
    };

    if (loading) return <div className="p-5 text-center">🔄 Loading...</div>;

    return (
        <div className="container-fluid p-4">
            <h2 className="fw-bold mb-4">Financial Oversight</h2>
            <div className="card shadow-sm border-0 rounded-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-secondary small fw-bold">
                            <tr>
                                <th className="ps-4 py-3">Order ID & Date</th>
                                <th>Client ➞ Worker</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn) => (
                                <tr key={txn.escrowId}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-primary small">{txn.razorpayOrderId || "N/A"}</div>
                                        <small className="text-muted">{txn.transactionDate ? new Date(txn.transactionDate).toLocaleString() : 'N/A'}</small>
                                    </td>
                                    <td>
                                        <div className="fw-bold">{txn.contract?.client?.fullName || "N/A"}</div>
                                        <div className="text-muted small">➞ {txn.contract?.worker?.fullName || "N/A"}</div>
                                    </td>
                                    <td className="fw-bold">₹{txn.amount.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 py-2 ${txn.paymentStatus === 'ESCROW_HELD' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                            {txn.paymentStatus === 'ESCROW_HELD' ? '🛡️ SECURED' : txn.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        {txn.paymentStatus === 'RELEASED' && txn.transactionType === 'DEPOSIT' && (
                                            <button 
                                                onClick={() => handlePayNow(txn.amount, txn.contract?.contractId, txn.escrowId)} 
                                                className="btn btn-sm btn-primary fw-bold px-3"
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                        {txn.paymentStatus === 'ESCROW_HELD' && (
                                            <button onClick={() => handleRelease(txn.contract?.contractId)} className="btn btn-sm btn-success fw-bold px-3">Release</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;