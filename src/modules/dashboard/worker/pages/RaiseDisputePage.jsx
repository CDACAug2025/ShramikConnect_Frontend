import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const RaiseDisputePage = () => {
    // ✅ Initialize with empty strings to avoid "NaN" or undefined errors
    const [data, setData] = useState({ contractId: '', reason: '' });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ✅ Sends data to @PostMapping("/api/worker/disputes/raise")
            await workerApi.raiseDispute(data);
            setStatus({ type: 'success', msg: 'Dispute submitted successfully. Status: UNDER_REVIEW.' });
            setData({ contractId: '', reason: '' }); // Reset form
        } catch (err) {
            // Likely fails if you use Contract ID 1 (belongs to another user)
            setStatus({ type: 'danger', msg: 'Submission failed. Please verify the Contract ID belongs to you.' });
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm border-0 p-4">
                        <h3 className="fw-bold mb-2 text-danger">Raise a Dispute</h3>
                        <p className="text-muted small mb-4">
                            Report issues regarding payments or work terms for a specific contract.
                        </p>

                        {status.msg && (
                            <Alert variant={status.type} dismissible onClose={() => setStatus({type:'', msg:''})}>
                                {status.msg}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Contract ID</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter your Contract ID (e.g., 2)"
                                    // ✅ Use || '' to prevent the "Received NaN" console error
                                    value={data.contractId || ''}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        // ✅ Check for NaN before setting state
                                        setData({...data, contractId: isNaN(val) ? '' : val});
                                    }}
                                    required 
                                />
                                <Form.Text className="text-muted">
                                    Check your 'Active Jobs' for the correct ID.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-semibold">Describe the Issue</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={4} 
                                    placeholder="Provide detailed reasons for the supervisor..."
                                    value={data.reason}
                                    onChange={(e) => setData({...data, reason: e.target.value})}
                                    required 
                                />
                            </Form.Group>

                            <Button variant="danger" type="submit" className="w-100 fw-bold py-2 shadow-sm">
                                Submit Dispute
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RaiseDisputePage;