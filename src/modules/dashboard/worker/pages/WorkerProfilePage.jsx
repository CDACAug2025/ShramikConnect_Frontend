import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';

const WorkerProfilePage = () => {
    const [file, setFile] = useState(null);

    const handleKycUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Select a file first");
        const formData = new FormData();
        formData.append('file', file);
        try {
            // ✅ Links to @PostMapping("/profile/{id}/upload-kyc")
            await workerApi.uploadKyc(formData);
            alert("KYC Document Uploaded Successfully!");
        } catch (err) {
            alert("Upload failed.");
        }
    };

    return (
        <Container className="py-4">
            <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                    <h4 className="fw-bold mb-3">KYC Verification</h4>
                    <Form onSubmit={handleKycUpload}>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Aadhaar / PAN Card</Form.Label>
                            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>
                        <Button type="submit" variant="success">Submit KYC</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default WorkerProfilePage;