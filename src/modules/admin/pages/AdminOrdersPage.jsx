import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Card, Spinner, Alert } from 'react-bootstrap';
import axiosInstance from '@/services/axiosInstance';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ✅ Hits the endpoint that returns all worker transactions
        axiosInstance.get('/worker/orders/admin/all')
            .then(res => {
                setOrders(res.data);
                setError(null);
            })
            .catch(err => {
                console.error("Admin fetch error:", err);
                setError("Failed to fetch real-time order data from the server.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Container className="py-5 text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Syncing with database...</p>
        </Container>
    );

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">Worker Purchases & Logistics</h3>
                <Badge bg="primary" pill className="px-3 py-2">
                    Total Transactions: {orders.length}
                </Badge>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4 py-3">Worker Name</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Total Amount</th>
                            <th className="py-3">Status</th>
                            <th className="py-3 text-center">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map(order => (
                            <tr key={order.orderId}>
                                {/* ✅ Correctly accesses the Eager-loaded worker object */}
                                <td className="ps-4 fw-bold text-dark">
                                    {order.worker?.fullName || 'Unknown Worker'}
                                </td>
                                <td className="text-muted small">
                                    {order.worker?.email || 'N/A'}
                                </td>
                                <td className="fw-bold text-primary">
                                    ₹{order.totalAmount?.toLocaleString('en-IN')}
                                </td>
                                <td>
                                    <Badge 
                                        bg={order.status === 'PAID' ? 'success' : 'warning'}
                                        className="rounded-pill px-3 py-2"
                                    >
                                        {order.status || 'PENDING'}
                                    </Badge>
                                </td>
                                <td className="text-center small text-muted">
                                    {new Date(order.createdAt).toLocaleString('en-IN', {
                                        day: '2-digit', month: 'short', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">
                                    No worker orders found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default AdminOrdersPage;