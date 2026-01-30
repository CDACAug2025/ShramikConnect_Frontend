import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const WalletPage = () => {
    const [wallet, setWallet] = useState({ escrowBalance: 0, releasedBalance: 0, transactions: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const res = await workerApi.getWalletStats();
                setWallet(res.data);
            } catch (err) { console.error("Wallet fetch failed", err); }
            finally { setLoading(false); }
        };
        fetchWallet();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <Container className="py-4">
            <h3 className="fw-bold mb-4">My Wallet</h3>
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="border-0 shadow-sm bg-primary text-white p-4">
                        <h6 className="opacity-75">Held in Escrow</h6>
                        <h2 className="fw-bold">₹{wallet.escrowBalance.toLocaleString()}</h2>
                        <small>Amount will be released upon job completion.</small>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="border-0 shadow-sm bg-success text-white p-4">
                        <h6 className="opacity-75">Released Balance</h6>
                        <h2 className="fw-bold">₹{wallet.releasedBalance.toLocaleString()}</h2>
                        <small>Total amount available for withdrawal.</small>
                    </Card>
                </Col>
            </Row>

            <Card className="border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-3">Recent Transactions</h5>
                <Table responsive hover>
                    <thead className="table-light">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallet.transactions.length > 0 ? wallet.transactions.map((t, idx) => (
                            <tr key={idx}>
                                <td>{new Date(t.date).toLocaleDateString()}</td>
                                <td>{t.description}</td>
                                <td className="fw-bold">₹{t.amount.toLocaleString()}</td>
                                <td>
                                    <Badge bg={t.status === 'COMPLETED' ? 'success' : 'warning'}>
                                        {t.status === 'COMPLETED' ? 'RELEASED' : 'HELD'}
                                    </Badge>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="text-center">No transactions found.</td></tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default WalletPage;