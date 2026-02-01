import React, { useState } from 'react';
import useUserManagement from '../hooks/useUserManagement';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const UsersPage = () => {
    const { users, loading, error, handleToggleStatus } = useUserManagement();
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const filteredUsers = (users || []).filter(user => {
        if (!user) return false;
        const term = searchTerm.toLowerCase();
        const roleName = typeof user.role === 'object' ? user.role?.roleName : user.role;
        return (
            (user.name?.toLowerCase() || "").includes(term) ||
            (user.email?.toLowerCase() || "").includes(term) ||
            (roleName?.toLowerCase() || "").includes(term)
        );
    });

    const getRoleStyles = (role) => {
        const roleStr = (typeof role === 'object' ? role?.roleName : role) || "USER";
        switch (roleStr.toUpperCase()) {
            case 'ADMIN': return { bg: '#4338ca', color: '#ffffff' }; 
            case 'ORGANIZATION': return { bg: '#c2410c', color: '#ffffff' }; 
            case 'WORKER': return { bg: '#15803d', color: '#ffffff' }; 
            case 'CLIENT': return { bg: '#0369a1', color: '#ffffff' }; 
            default: return { bg: '#64748b', color: '#ffffff' }; 
        }
    };

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid py-4 px-4" style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark mb-0">User Access Control</h2>
                <button className="btn btn-dark shadow-sm fw-bold px-4">Provision User</button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light border-bottom">
                            <tr className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
                                <th className="ps-4 py-3">Full Identity</th>
                                <th>Access Level</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user?.userId || user?.id || Math.random()}>
                                    <td className="ps-4 py-3">
                                        <div className="fw-bold text-dark">{user?.fullName || user?.name || "New User"}</div>
                                        <div className="text-muted small">{user?.email}</div>
                                    </td>
                                    <td>
                                        <span className="badge shadow-sm" style={{ backgroundColor: getRoleStyles(user?.role).bg, color: getRoleStyles(user?.role).color, padding: '8px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', minWidth: '110px' }}>
                                            {typeof user?.role === 'object' ? user.role?.roleName : (user?.role || "USER")}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 py-2 fw-bold ${user?.status === 'ACTIVE' ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'}`}>
                                            {user?.status === 'ACTIVE' ? '● ACTIVE' : '● BLOCKED'}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="btn-group shadow-sm border rounded-3">
                                            <button onClick={() => handleViewUser(user)} className="btn btn-white btn-sm fw-bold px-3 py-2">View</button>
                                            <button onClick={() => handleToggleStatus(user?.userId || user?.id, user?.status)} className={`btn btn-sm fw-bold px-3 py-2 ${user?.status === 'ACTIVE' ? 'text-danger' : 'text-success'}`}>{user?.status === 'ACTIVE' ? 'Suspend' : 'Activate'}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ——————————————————————————————————————————————————————————————
                ENHANCED USER DOSSIER MODAL (Real Data Integration)
            ———————————————————————————————————————————————————————————————— */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Body className="p-0 overflow-hidden rounded-4 shadow-lg">
                    {/* Professional Header */}
                    <div className="p-4 text-white d-flex align-items-center justify-content-between" style={{ background: '#0f172a' }}>
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center fw-bold shadow me-3" style={{ width: '65px', height: '65px', fontSize: '1.5rem' }}>
                                {(selectedUser?.fullName || selectedUser?.name)?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h4 className="fw-bold mb-0">{selectedUser?.fullName || selectedUser?.name}</h4>
                                <span className="text-white-50 small">{selectedUser?.email}</span>
                            </div>
                        </div>
                        <span className={`badge rounded-pill px-3 py-2 ${selectedUser?.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}`}>
                            {selectedUser?.status}
                        </span>
                    </div>

                    <div className="p-4 bg-white">
                        {/* Section 1: Core Identity */}
                        <h6 className="text-uppercase text-muted fw-bold small mb-3" style={{ letterSpacing: '1px' }}>System Identity</h6>
                        <Row className="mb-4 g-3">
                            <Col md={4}>
                                <div className="p-3 bg-light rounded-3 border">
                                    <label className="text-muted extra-small d-block mb-1">Internal UID</label>
                                    <span className="fw-bold">#USR-{selectedUser?.userId}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="p-3 bg-light rounded-3 border">
                                    <label className="text-muted extra-small d-block mb-1">Assigned Role</label>
                                    <span className="fw-bold text-primary">{typeof selectedUser?.role === 'object' ? selectedUser.role?.roleName : selectedUser?.role}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="p-3 bg-light rounded-3 border">
                                    <label className="text-muted extra-small d-block mb-1">Phone Contact</label>
                                    <span className="fw-bold">{selectedUser?.phoneNumber || "Not Provided"}</span>
                                </div>
                            </Col>
                        </Row>

                        {/* Section 2: Security & Status */}
                        <h6 className="text-uppercase text-muted fw-bold small mb-3" style={{ letterSpacing: '1px' }}>Compliance & Security</h6>
                        <div className="border rounded-4 p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <i className="bi bi-shield-check text-success me-2"></i>
                                    <span className="fw-medium">KYC Verification Status</span>
                                </div>
                                <span className={`badge ${selectedUser?.kycStatus === 'VERIFIED' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                    {selectedUser?.kycStatus || "PENDING"}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <i className="bi bi-clock-history text-muted me-2"></i>
                                    <span className="fw-medium">Account Created</span>
                                </div>
                                <span className="text-dark small fw-bold">
                                    {selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'Feb 01, 2026'}
                                </span>
                            </div>
                        </div>

                        {/* Section 3: Extra Real Data Fields */}
                        <h6 className="text-uppercase text-muted fw-bold small mb-3" style={{ letterSpacing: '1px' }}>Additional Metadata</h6>
                        <Row className="g-3">
                            <Col md={6}>
                                <div className="small border-start border-3 border-primary ps-3">
                                    <span className="text-muted d-block">MFA Security</span>
                                    <span className="fw-bold">{selectedUser?.mfaEnabled ? "Enabled" : "Disabled"}</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="small border-start border-3 border-info ps-3">
                                    <span className="text-muted d-block">Work Location</span>
                                    <span className="fw-bold">{selectedUser?.location || "National (Remote)"}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    
                    <div className="p-3 bg-light border-top d-flex justify-content-end">
                        <Button variant="outline-dark" className="fw-bold px-4 me-2 border-2" onClick={() => setShowModal(false)}>Close Dossier</Button>
                        <Button variant="danger" onClick={() => handleToggleStatus(selectedUser?.userId, selectedUser?.status)} className="fw-bold px-4 shadow-sm">
                            {selectedUser?.status === 'ACTIVE' ? 'Suspend User' : 'Activate User'}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UsersPage;