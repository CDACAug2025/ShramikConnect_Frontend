import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const WorkerNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        // ✅ Prevent default link behavior
        e.preventDefault();
        
        // ✅ 1. Clear the JWT token from localStorage
        localStorage.removeItem('token');
        
        // ✅ 2. Optional: Clear other cached session data
        localStorage.removeItem('userEmail');

        // ✅ 3. Redirect to the public login page
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/worker/dashboard" className="fw-bold text-primary">
                    Shramik<span className="text-white">Connect</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/worker/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/worker/find-jobs">Find Jobs</Nav.Link>
                        <Nav.Link as={Link} to="/worker/my-applications">Applications</Nav.Link>
                        <Nav.Link as={Link} to="/worker/active-jobs">Active Jobs</Nav.Link>
                        <Nav.Link as={Link} to="/worker/wallet">Wallet</Nav.Link>
                        <Nav.Link as={Link} to="/worker/history">History</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Help & Support" id="support-nav">
                            <NavDropdown.Item as={Link} to="/worker/raise-dispute">
                                Raise Dispute
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#chat">Support Chat</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Account" id="account-nav" align="end">
                            <NavDropdown.Item as={Link} to="/worker/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/worker/skills">Professional Skills</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {/* ✅ Changed from href to onClick to trigger programmatic logout */}
                            <NavDropdown.Item 
                                onClick={handleLogout} 
                                className="text-danger" 
                                style={{ cursor: 'pointer' }}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default WorkerNavbar;