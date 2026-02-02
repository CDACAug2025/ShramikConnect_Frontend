import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import axiosInstance from '@/services/axiosInstance';

const WorkerOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axiosInstance.get('/worker/orders/my-orders')
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    if (loading) return (
        <Container className="py-5 text-center">
            <Spinner animation="border" variant="warning" />
        </Container>
    );

    return (
        <Container className="py-5">
            <h2 className="fw-bold mb-4 text-center">My Equipment Orders</h2>
            
            <Table hover responsive className="shadow-sm bg-white rounded border-0">
                <thead className="bg-light">
                    <tr>
                        <th className="ps-4">ORDER ID</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId} className="align-middle">
                            <td className="ps-4">#{order.orderId}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="fw-bold text-primary">₹{order.totalAmount}</td>
                            <td>
                                <Badge bg={order.status === 'PAID' ? 'success' : 'warning'}>
                                    {order.status}
                                </Badge>
                            </td>
                            <td className="text-center">
                                <Button 
                                    variant="dark" 
                                    size="sm" 
                                    className="rounded-pill px-4"
                                    onClick={() => handleViewDetails(order)}
                                >
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="fw-bold">Order Summary - #{selectedOrder?.orderId}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <div className="bg-light p-3 rounded-4 mb-4">
                        <h6 className="text-muted text-uppercase small fw-bold mb-2">Shipping To:</h6>
                        <p className="mb-0 fw-bold">{selectedOrder?.shippingAddress}</p>
                        <p className="mb-0 text-muted">{selectedOrder?.city}, {selectedOrder?.zipCode}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                        <span className="fs-5 fw-bold">Total Paid</span>
                        <span className="fs-4 fw-bold text-success">₹{selectedOrder?.totalAmount}</span>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default WorkerOrdersPage;