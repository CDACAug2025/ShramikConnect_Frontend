import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Alert, ListGroup } from 'react-bootstrap';
import { workerApi } from '../services/workerDashboardApi';
import WorkerNavbar from '../components/WorkerNavbar';

const WorkerProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Full list of districts from your Enum
    const districts = ["MUMBAI_CITY", "MUMBAI_SUBURBAN", "THANE", "PALGHAR", "RAIGAD", "PUNE", "SATARA", "SOLAPUR", "KOLHAPUR", "SANGLI", "NASHIK", "AHMEDNAGAR", "DHULE", "JALGAON", "NANDURBAR", "AURANGABAD", "JALNA", "BEED", "OSMANABAD", "LATUR", "NANDED", "PARBHANI", "HINGOLI", "AKOLA", "AMRAVATI", "BULDHANA", "WASHIM", "YAVATMAL", "NAGPUR", "WARDHA", "BHANDARA", "GONDIA", "CHANDRAPUR", "GADCHIROLI", "RATNAGIRI", "SINDHUDURG"];
    
    const jobCategories = ["PLUMBING", "ELECTRICAL", "CONSTRUCTION", "CARPENTRY", "CLEANING", "PAINTING", "GARDENING", "LABOR", "OTHER"];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await workerApi.getProfile();
            setProfile(res.data);
            setFormData(res.data);
        } catch (err) {
            console.error("Profile Error:", err);
            // ✅ Handle 404 professionally
            setError("Worker details not found in the professional registry. Please update your profile to register.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await workerApi.updateProfile(formData);
            setProfile(formData);
            setIsEditing(false);
            alert("Professional profile synchronized successfully!");
        } catch (err) {
            alert("Sync failed. Check backend connectivity.");
        }
    };

    const handleDeactivate = async () => {
        if (window.confirm("Soft Delete: This will deactivate your account and hide your profile. Proceed?")) {
            try {
                await workerApi.deactivateAccount();
                localStorage.clear();
                window.location.href = "/login";
            } catch (err) {
                alert("Deactivation failed.");
            }
        }
    };

    // ✅ EARLY RETURN: Prevents "Cannot read properties of null" error
    if (loading) return (
        <div className="text-center py-5 vh-100 d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="grow" variant="primary" />
            <p className="mt-3 text-muted fw-bold">Synchronizing with Professional Database...</p>
        </div>
    );

    return (
        <div className="bg-light min-vh-100">
           
            <Container className="py-5">
                {/* ✅ Professional Error/Registration Alert */}
                {error && (
                    <Alert variant="info" className="mb-4 shadow-sm border-0 bg-white">
                        <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                        {error} <strong>Click "Update Profile" to begin registration.</strong>
                    </Alert>
                )}

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-4">
                            <div className="bg-dark p-4 text-white d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    {/* ✅ Optional Chaining (?.) prevents UI crashes */}
                                    <div className="bg-primary rounded-circle p-3 me-3 fw-bold fs-4">
                                        {profile?.full_name?.charAt(0) || "W"}
                                    </div>
                                    <div>
                                        <h3 className="fw-bold mb-0 text-white">{profile?.full_name || "New Worker"}</h3>
                                        <Badge bg={profile ? "success" : "warning"} className="mt-1 px-3 py-2 shadow-sm">
                                            {profile ? "VERIFIED WORKER" : "REGISTRATION PENDING"}
                                        </Badge>
                                    </div>
                                </div>
                                <Button 
                                    variant={isEditing ? "outline-light" : "primary"} 
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="fw-bold px-4 rounded-pill"
                                >
                                    {isEditing ? "Cancel" : "Update Profile"}
                                </Button>
                            </div>

                            <Card.Body className="p-4 bg-white">
                                <Form onSubmit={handleUpdate}>
                                    <Row>
                                        <Col md={6}>
                                            <h6 className="text-primary fw-bold text-uppercase mb-3 small">Account Identity</h6>
                                            <ListGroup variant="flush" className="mb-4">
                                                <ListGroup.Item className="px-0 py-2 border-0 bg-transparent">
                                                    <small className="text-muted d-block uppercase small fw-bold">Registered Email</small>
                                                    <span className="fw-bold text-dark">{profile?.email || "N/A"}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="px-0 py-2 border-0 bg-transparent">
                                                    <small className="text-muted d-block uppercase small fw-bold">Contact Number</small>
                                                    <span className="fw-bold text-dark">{profile?.phone || "N/A"}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                            <Button variant="outline-danger" size="sm" className="mt-2" onClick={handleDeactivate}>
                                                Deactivate Account
                                            </Button>
                                        </Col>
                                        
                                        <Col md={6} className="border-start ps-4">
                                            <h6 className="text-primary fw-bold text-uppercase mb-3 small">Professional Preferences</h6>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted fw-bold">Job Category</Form.Label>
                                                {isEditing ? (
                                                    <Form.Select 
                                                        value={formData.category} 
                                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                        className="border-primary shadow-sm"
                                                    >
                                                        <option value="">Select Category...</option>
                                                        {jobCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </Form.Select>
                                                ) : (
                                                    <Form.Control plaintext readOnly value={profile?.category || "Not Set"} className="fw-bold text-dark" />
                                                )}
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted fw-bold">Operating District</Form.Label>
                                                {isEditing ? (
                                                    <Form.Select 
                                                        value={formData.district} 
                                                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                                                        className="border-primary shadow-sm"
                                                    >
                                                        <option value="">Select District...</option>
                                                        {districts.map(d => <option key={d} value={d}>{d.replace('_', ' ')}</option>)}
                                                    </Form.Select>
                                                ) : (
                                                    <Form.Control plaintext readOnly value={profile?.district?.replace('_', ' ') || "Not Set"} className="fw-bold text-dark" />
                                                )}
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted fw-bold">Experience (Years)</Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    value={formData.experience_years} 
                                                    onChange={(e) => setFormData({...formData, experience_years: e.target.value})} 
                                                    readOnly={!isEditing} 
                                                    className={isEditing ? "border-primary shadow-sm" : "border-0 bg-light fw-bold"} 
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {isEditing && (
                                        <div className="text-end mt-4 pt-3 border-top">
                                            <Button type="submit" variant="success" className="px-5 fw-bold rounded-pill shadow-sm py-2">
                                                Save Professional Record
                                            </Button>
                                        </div>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WorkerProfilePage;