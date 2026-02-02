import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useWorkerProducts } from '../hooks/useWorkerProducts';
import { useWorkerCart } from '../hooks/useWorkerCart';
import { ShoppingBag, Trash2, ShieldCheck, Truck, Package } from 'lucide-react';

const WorkerStorePage = () => {
    const navigate = useNavigate();
    const { items, loading } = useWorkerProducts();
    const { cart, addToCart, totalAmount, removeFromCart } = useWorkerCart();

    if (loading) return (
        <Container className="py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="grow" variant="warning" size="lg" />
            <p className="mt-3 fw-bold text-muted">Curating your catalog...</p>
        </Container>
    );

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2 rounded-pill fw-bold">SHRAMIK DIRECT</Badge>
                        <h1 className="display-5 fw-bold text-dark mb-0">Professional Store</h1>
                        <p className="text-muted fs-5 mt-2">Premium safety gear delivered to your site.</p>
                    </div>
                    <div className="d-none d-md-flex gap-3">
                        <div className="text-end border-end pe-3">
                            <small className="text-muted d-block">Verified Safety</small>
                            <ShieldCheck className="text-success" />
                        </div>
                        <div className="text-end ps-2">
                            <small className="text-muted d-block">Fast Delivery</small>
                            <Truck className="text-primary" />
                        </div>
                    </div>
                </div>

                <Row className="g-4">
                    {/* Product Grid */}
                    <Col lg={8}>
                        <Row className="g-4">
                            {items.map(product => (
                                <Col md={6} xl={4} key={product.productId}>
                                    <Card className="h-100 border-0 shadow-sm hover-shadow transition-all rounded-4 overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <Card.Img 
                                                variant="top" 
                                                src={product.image || 'https://via.placeholder.com/400x220'} 
                                                style={{ height: '220px', objectFit: 'cover' }} 
                                                className="product-image transition-all"
                                            />
                                            {product.stock <= 0 && (
                                                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75">
                                                    <Badge bg="dark" className="px-3 py-2 fs-6">Sold Out</Badge>
                                                </div>
                                            )}
                                        </div>
                                        <Card.Body className="p-4 d-flex flex-column">
                                            <small className="text-warning fw-bold text-uppercase ls-wide" style={{ fontSize: '0.7rem' }}>{product.category}</small>
                                            <Card.Title className="h5 fw-bold text-dark mt-1">{product.name}</Card.Title>
                                            <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                                <div>
                                                    <small className="text-muted d-block">Price</small>
                                                    <span className="h4 fw-bold text-dark mb-0">₹{product.price}</span>
                                                </div>
                                                <Button 
                                                    variant={product.stock > 0 ? "warning" : "light"}
                                                    disabled={product.stock <= 0}
                                                    onClick={() => addToCart(product)}
                                                    className="rounded-circle p-3 shadow-sm"
                                                >
                                                    <ShoppingBag size={20} />
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Sidebar Cart */}
                    <Col lg={4}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden sticky-top" style={{ top: '30px' }}>
                            <Card.Header className="bg-dark text-white p-4 border-0 d-flex justify-content-between">
                                <h4 className="mb-0 fw-bold">My Cart</h4>
                                <Badge bg="warning" text="dark" pill className="px-3">{cart.length}</Badge>
                            </Card.Header>
                            <Card.Body className="p-0 max-vh-50 overflow-auto">
                                <ListGroup variant="flush">
                                    {cart.length === 0 ? (
                                        <div className="text-center py-5">
                                            <Package className="text-muted mb-3" size={48} />
                                            <p className="text-muted">Empty cart</p>
                                        </div>
                                    ) : cart.map(item => (
                                        <ListGroup.Item key={item.productId} className="p-4 border-bottom border-light">
                                            <div className="d-flex gap-3">
                                                <div className="flex-grow-1">
                                                    <h6 className="fw-bold mb-1">{item.name}</h6>
                                                    <small className="text-muted">{item.qty} x ₹{item.price}</small>
                                                </div>
                                                <div className="text-end">
                                                    <div className="fw-bold">₹{item.qty * item.price}</div>
                                                    <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(item.productId)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                            {cart.length > 0 && (
                                <Card.Footer className="bg-white p-4 border-0 shadow-sm">
                                    <div className="d-flex justify-content-between mb-4">
                                        <span className="text-muted h5">Total</span>
                                        <span className="h3 fw-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                    <Button variant="warning" className="w-100 py-3 fw-bold rounded-pill shadow" onClick={() => navigate('/worker/checkout')}>
                                        Checkout Now
                                    </Button>
                                </Card.Footer>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .hover-shadow:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
                .transition-all { transition: all 0.3s ease; }
                .product-image:hover { transform: scale(1.05); }
            `}</style>
        </div>
    );
};

export default WorkerStorePage;