import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useWorkerCart } from '../hooks/useWorkerCart';

const CheckoutPage = () => {
    const { cart, totalAmount, handleCheckout } = useWorkerCart();
    const [address, setAddress] = useState({ street: '', city: '', zip: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!address.street || !address.city || !address.zip) {
            alert("Please complete all shipping fields.");
            return;
        }
        handleCheckout(address);
    };

    return (
        <Container className="py-5">
            <Row>
                {/* Left: Shipping Form */}
                <Col lg={7}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <h4 className="fw-bold mb-4">Shipping Information</h4>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control 
                                    required 
                                    type="text" 
                                    placeholder="Enter full address"
                                    onChange={(e) => setAddress({...address, street: e.target.value})} 
                                />
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control 
                                            required 
                                            type="text" 
                                            onChange={(e) => setAddress({...address, city: e.target.value})} 
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>PIN Code</Form.Label>
                                        <Form.Control 
                                            required 
                                            type="text" 
                                            placeholder="6-digit code"
                                            onChange={(e) => setAddress({...address, zip: e.target.value})} 
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* Dynamically display the real-time total on the button */}
                            <Button type="submit" variant="warning" className="w-100 py-3 mt-3 fw-bold rounded-pill shadow">
                                CONFIRM & PAY ₹{totalAmount.toLocaleString()}
                            </Button>
                        </Form>
                    </Card>
                </Col>

                {/* Right: Order Review */}
                <Col lg={5}>
                    <Card className="border-0 shadow-lg p-4 rounded-4 bg-light">
                        <h5 className="fw-bold mb-3 text-muted">Order Review</h5>
                        <ListGroup variant="flush" className="bg-transparent mb-3">
                            {cart.map(item => (
                                <ListGroup.Item key={item.productId} className="bg-transparent px-0 d-flex justify-content-between border-0">
                                    <span>{item.name} (x{item.qty})</span>
                                    <span className="fw-bold">₹{item.qty * item.price}</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <div className="d-flex justify-content-between fs-4 fw-bold border-top pt-3 text-primary">
                            <span>Grand Total</span>
                            <span>₹{totalAmount.toLocaleString()}</span>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;